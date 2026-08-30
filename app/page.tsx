"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BASE_COCKTAILS,
  BASE_MOCKTAILS,
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
    if (!selected) {
      setError("Please choose a cocktail first");
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
          baseCocktail: selected.id,
          customisations,
        }),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(payload?.error ?? "Failed to place order");
      }
      if (!payload?.id) throw new Error("The order could not be confirmed");
      const order = payload;
      setOrderId(order.id);
      setStep("done");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong. Please try again."
      );
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
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={handleReset} className="flex items-center gap-2 cursor-pointer">
            <span className="text-2xl">🍹</span>
            <span className="text-slate-900 font-bold text-xl tracking-tight">
              Cocktail Bar
            </span>
          </button>
          <Link
            href="/orders"
            className="flex items-center gap-2 border border-stone-300 bg-white hover:bg-stone-100 text-slate-700 text-sm font-medium px-4 py-2 rounded-lg transition"
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
              <h1 className="text-4xl font-bold text-slate-900 mb-3">
                Welcome to the Bar! 🍸
              </h1>
              <p className="text-slate-500 text-lg">
                Choose your drink to get started
              </p>
            </div>

            {/* Cocktails Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                🍹 Cocktails
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {BASE_COCKTAILS.map((cocktail) => (
                  <button
                    key={cocktail.id}
                    onClick={() => handleSelectBase(cocktail)}
                    className="group relative overflow-hidden rounded-xl shadow-sm cursor-pointer border border-stone-200 bg-white hover:border-amber-400 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 text-left"
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
                        className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"
                      />
                      <div className="absolute top-3 right-3 text-3xl">
                        {cocktail.emoji}
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h2 className="text-slate-900 font-bold text-lg">
                        {cocktail.name}
                      </h2>
                      <p className="text-slate-500 text-sm mt-1">
                        {cocktail.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mocktails Section */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                🌿 Mocktails
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {BASE_MOCKTAILS.map((mocktail) => (
                  <button
                    key={mocktail.id}
                    onClick={() => handleSelectBase(mocktail)}
                    className="group relative overflow-hidden rounded-xl shadow-sm cursor-pointer border border-stone-200 bg-white hover:border-amber-400 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 text-left"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={mocktail.imageUrl}
                        alt={mocktail.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"
                      />
                      <div className="absolute top-3 right-3 text-3xl">
                        {mocktail.emoji}
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <h2 className="text-slate-900 font-bold text-lg">
                        {mocktail.name}
                      </h2>
                      <p className="text-slate-500 text-sm mt-1">
                        {mocktail.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step: Customise */}
        {step === "customise" && selected && (
          <div>
            <button
              onClick={() => setStep("select")}
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 transition cursor-pointer"
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
                <h1 className="text-3xl font-bold text-slate-900">
                  {selected.emoji} {selected.name}
                </h1>
                <p className="text-slate-500">{selected.description}</p>
              </div>
            </div>

            <div className="space-y-8">
              {CUSTOMISATION_GROUPS.map((group) => (
                <div
                  key={group.id}
                  className="bg-white rounded-xl p-6 border border-stone-200 shadow-sm"
                >
                  <h3 className="text-slate-900 font-semibold text-lg mb-4">
                    {group.label}
                    {(group.id === "flavours" || group.id === "garnish") && (
                      <span className="ml-2 text-xs text-amber-600 font-normal bg-amber-50 px-2 py-1 rounded-full inline-block">
                        Optional
                      </span>
                    )}
                    {group.type === "multi" && group.id !== "flavours" && group.id !== "garnish" && (
                      <span className="ml-2 text-xs text-slate-400 font-normal">
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
                              ? "bg-amber-400 text-slate-950 border-amber-400"
                              : "bg-white text-slate-700 border-stone-300 hover:bg-stone-50"
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

            <div className="mt-8 bg-white rounded-xl p-6 border border-stone-200 shadow-sm">
              <label className="block text-slate-900 font-semibold text-lg mb-3">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name..."
                className="w-full bg-white border border-stone-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-lg"
              />
            </div>

            {error && (
              <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
            )}

            <div className="mt-6 flex gap-4">
              <button
                onClick={() => setStep("confirm")}
                className="flex-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold py-4 rounded-lg text-lg transition cursor-pointer"
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
              className="flex items-center gap-2 text-slate-500 hover:text-slate-900 mb-6 transition cursor-pointer"
            >
              ← Edit order
            </button>
            <div className="bg-white rounded-xl p-8 border border-stone-200 shadow-sm max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Order Summary 🧾
              </h2>

                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-stone-200">
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
                  <p className="text-slate-500 text-sm">Base Cocktail</p>
                  <p className="text-slate-900 font-bold text-xl">
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
                    <p className="text-slate-500 text-sm">{group.label}</p>
                    <p className="text-slate-900 font-medium">
                      {labels.join(", ")}
                    </p>
                  </div>
                );
              })}

              <div className="mt-6 pt-6 border-t border-stone-200">
                <p className="text-slate-500 text-sm">Order for</p>
                <p className="text-slate-900 font-bold text-xl">
                  {name || <span className="text-red-400">No name!</span>}
                </p>
              </div>

              {error && (
                <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="mt-8 w-full bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-bold py-4 rounded-lg text-lg transition cursor-pointer"
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
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Order Placed!
            </h2>
            <p className="text-slate-600 text-lg mb-2">
              Your cocktail is being made, <strong>{name}</strong>!
            </p>
            <p className="text-slate-500 text-sm mb-10">
              Order #{orderId?.slice(0, 8)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleReset}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-3 rounded-lg text-lg transition cursor-pointer"
              >
                Order Another 🍹
              </button>
              <Link
                href="/orders"
                className="border border-stone-300 bg-white hover:bg-stone-100 text-slate-700 font-bold px-8 py-3 rounded-lg text-lg transition"
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
