"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BASE_COCKTAILS,
  CUSTOMISATION_GROUPS,
  type BaseCocktail,
} from "@/lib/cocktails";

type Step = "select" | "customise" | "confirm" | "done";

export default function Home() {
  const [step, setStep] = useState<Step>("select");
  const [selected, setSelected] = useState<BaseCocktail | null>(null);
  const [customisations, setCustomisations] = useState<
    Record<string, string[]>
  >({});
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSelectBase(cocktail: BaseCocktail) {
    setSelected(cocktail);
    // reset customisations with sensible defaults
    const defaults: Record<string, string[]> = {};
    CUSTOMISATION_GROUPS.forEach((g) => {
      if (g.id === "ice") defaults[g.id] = ["regular-ice"];
      else if (g.id === "grenadine") defaults[g.id] = ["no-grenadine"];
      else defaults[g.id] = [];
    });
    setCustomisations(defaults);
    setStep("customise");
  }

  function toggleOption(groupId: string, optionId: string, type: "multi" | "single") {
    setCustomisations((prev) => {
      const current = prev[groupId] ?? [];
      if (type === "single") {
        return { ...prev, [groupId]: [optionId] };
      }
      if (current.includes(optionId)) {
        return { ...prev, [groupId]: current.filter((x) => x !== optionId) };
      }
      return { ...prev, [groupId]: [...current, optionId] };
    });
  }

  async function handleSubmit() {
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          baseCocktail: selected!.id,
          customisations,
        }),
      });
      if (!res.ok) throw new Error("Failed to place order");
      const order = await res.json();
      setOrderId(order.id);
      setStep("done");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setStep("select");
    setSelected(null);
    setCustomisations({});
    setName("");
    setOrderId(null);
    setError(null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-purple-900 to-indigo-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={handleReset} className="flex items-center gap-2 cursor-pointer">
            <span className="text-2xl">🍹</span>
            <span className="text-white font-bold text-xl tracking-tight">
              Cocktail Bar
            </span>
          </button>
          <Link
            href="/orders"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full transition"
          >
            <span>📋</span> Kitchen View
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Step: Select Base */}
        {step === "select" && (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-white mb-3">
                Welcome to the Bar! 🍸
              </h1>
              <p className="text-purple-200 text-lg">
                Choose your base cocktail to get started
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BASE_COCKTAILS.map((cocktail) => (
                <button
                  key={cocktail.id}
                  onClick={() => handleSelectBase(cocktail)}
                  className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer border border-white/10 hover:border-white/30 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 text-left"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={cocktail.imageUrl}
                      alt={cocktail.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${cocktail.colour} opacity-60`}
                    />
                    <div className="absolute top-3 right-3 text-3xl">
                      {cocktail.emoji}
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 backdrop-blur-sm">
                    <h2 className="text-white font-bold text-lg">
                      {cocktail.name}
                    </h2>
                    <p className="text-purple-200 text-sm mt-1">
                      {cocktail.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Customise */}
        {step === "customise" && selected && (
          <div>
            <button
              onClick={() => setStep("select")}
              className="flex items-center gap-2 text-purple-300 hover:text-white mb-6 transition cursor-pointer"
            >
              ← Back to cocktails
            </button>
            <div className="flex items-center gap-4 mb-8">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={selected.imageUrl}
                  alt={selected.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {selected.emoji} {selected.name}
                </h1>
                <p className="text-purple-200">{selected.description}</p>
              </div>
            </div>

            <div className="space-y-8">
              {CUSTOMISATION_GROUPS.map((group) => (
                <div
                  key={group.id}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-white font-semibold text-lg mb-4">
                    {group.label}
                    {group.type === "multi" && (
                      <span className="ml-2 text-xs text-purple-300 font-normal">
                        (pick any)
                      </span>
                    )}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {group.options.map((option) => {
                      const active = (customisations[group.id] ?? []).includes(
                        option.id
                      );
                      return (
                        <button
                          key={option.id}
                          onClick={() =>
                            toggleOption(group.id, option.id, group.type)
                          }
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition cursor-pointer ${
                            active
                              ? "bg-white text-purple-900 border-white"
                              : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                          }`}
                        >
                          {option.emoji && (
                            <span className="text-base">{option.emoji}</span>
                          )}
                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <label className="block text-white font-semibold text-lg mb-3">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-lg"
              />
            </div>

            {error && (
              <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
            )}

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setStep("confirm")}
                className="flex-1 bg-purple-500 hover:bg-purple-400 text-white font-bold py-4 rounded-2xl text-lg transition cursor-pointer"
              >
                Review Order 👀
              </button>
            </div>
          </div>
        )}

        {/* Step: Confirm */}
        {step === "confirm" && selected && (
          <div>
            <button
              onClick={() => setStep("customise")}
              className="flex items-center gap-2 text-purple-300 hover:text-white mb-6 transition cursor-pointer"
            >
              ← Edit order
            </button>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Order Summary 🧾
              </h2>

              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={selected.imageUrl}
                    alt={selected.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-purple-300 text-sm">Base Cocktail</p>
                  <p className="text-white font-bold text-xl">
                    {selected.emoji} {selected.name}
                  </p>
                </div>
              </div>

              {CUSTOMISATION_GROUPS.map((group) => {
                const picks = customisations[group.id] ?? [];
                const labels = picks.map(
                  (pid) =>
                    group.options.find((o) => o.id === pid)?.label ?? pid
                );
                if (labels.length === 0) return null;
                return (
                  <div key={group.id} className="mb-4">
                    <p className="text-purple-300 text-sm">{group.label}</p>
                    <p className="text-white font-medium">
                      {labels.join(", ")}
                    </p>
                  </div>
                );
              })}

              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-purple-300 text-sm">Order for</p>
                <p className="text-white font-bold text-xl">
                  {name || <span className="text-red-400">No name!</span>}
                </p>
              </div>

              {error && (
                <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="mt-8 w-full bg-green-500 hover:bg-green-400 disabled:opacity-50 text-white font-bold py-4 rounded-2xl text-lg transition cursor-pointer"
              >
                {submitting ? "Placing order..." : "Place Order 🚀"}
              </button>
            </div>
          </div>
        )}

        {/* Step: Done */}
        {step === "done" && (
          <div className="text-center py-16">
            <div className="text-7xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-white mb-3">
              Order Placed!
            </h2>
            <p className="text-purple-200 text-lg mb-2">
              Your cocktail is being made, <strong>{name}</strong>!
            </p>
            <p className="text-purple-400 text-sm mb-10">
              Order #{orderId?.slice(0, 8)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleReset}
                className="bg-purple-500 hover:bg-purple-400 text-white font-bold px-8 py-3 rounded-2xl text-lg transition cursor-pointer"
              >
                Order Another 🍹
              </button>
              <Link
                href="/orders"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3 rounded-2xl text-lg transition"
              >
                View All Orders 📋
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
