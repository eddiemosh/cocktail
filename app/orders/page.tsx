"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { BASE_COCKTAILS, BASE_MOCKTAILS, CUSTOMISATION_GROUPS } from "@/lib/cocktails";
import type { Order } from "@/lib/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">(
    "pending"
  );

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  async function markCompleted(id: string) {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "completed" }),
    });
    await fetchOrders();
  }

  const filtered = orders.filter(
    (o) => filter === "all" || o.status === filter
  );
  const pendingCount = orders.filter((o) => o.status === "pending").length;

  function getBase(id: string) {
    return BASE_COCKTAILS.find((b) => b.id === id) ?? BASE_MOCKTAILS.find((b) => b.id === id);
  }

  function getCustomLabel(groupId: string, optionId: string) {
    const group = CUSTOMISATION_GROUPS.find((g) => g.id === groupId);
    return group?.options.find((o) => o.id === optionId)?.label ?? optionId;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📋</span>
            <div>
              <h1 className="text-white font-bold text-xl leading-tight">
                Kitchen View
              </h1>
              {pendingCount > 0 && (
                <p className="text-yellow-400 text-xs font-medium">
                  {pendingCount} order{pendingCount !== 1 ? "s" : ""} pending
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="text-white/60 hover:text-white transition text-sm cursor-pointer"
              title="Refresh"
            >
              🔄
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium px-4 py-2 rounded-full transition"
            >
              <span>🍹</span> New Order
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-8">
          {(["pending", "completed", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition cursor-pointer ${
                filter === f
                  ? "bg-white text-gray-900"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {f}
              {f === "pending" && pendingCount > 0 && (
                <span className="ml-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-white/50">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">
              {filter === "pending" ? "✅" : "📭"}
            </div>
            <p className="text-white/60 text-lg">
              {filter === "pending"
                ? "No pending orders — all caught up!"
                : "No orders yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered
              .slice()
              .reverse()
              .map((order) => {
                const base = getBase(order.baseCocktail);
                return (
                  <div
                    key={order.id}
                    className={`rounded-2xl border p-5 transition ${
                      order.status === "pending"
                        ? "bg-white/5 border-yellow-500/30"
                        : "bg-white/3 border-white/10 opacity-60"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {base && (
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={base.imageUrl}
                            alt={base.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-white font-bold text-lg truncate">
                            {order.name}
                          </p>
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                              order.status === "pending"
                                ? "bg-yellow-400/20 text-yellow-300"
                                : "bg-green-400/20 text-green-300"
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-purple-300 text-sm font-medium mt-0.5">
                          {base?.emoji} {base?.name ?? order.baseCocktail}
                        </p>
                      </div>
                    </div>

                    {/* Customisations */}
                    <div className="mt-4 space-y-1">
                      {Object.entries(order.customisations).map(
                        ([groupId, picks]) => {
                          if (!picks || picks.length === 0) return null;
                          const group = CUSTOMISATION_GROUPS.find(
                            (g) => g.id === groupId
                          );
                          return (
                            <div key={groupId} className="flex gap-2 text-sm">
                              <span className="text-white/40 w-24 flex-shrink-0">
                                {group?.label}:
                              </span>
                              <span className="text-white/80">
                                {picks
                                  .map((p) => getCustomLabel(groupId, p))
                                  .join(", ")}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-white/30 text-xs">
                        {new Date(order.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        {" · "}#{order.id.slice(0, 8)}
                      </p>
                      {order.status === "pending" && (
                        <button
                          onClick={() => markCompleted(order.id)}
                          className="bg-green-500 hover:bg-green-400 text-white text-sm font-semibold px-4 py-1.5 rounded-full transition cursor-pointer"
                        >
                          ✓ Done
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </main>
    </div>
  );
}
