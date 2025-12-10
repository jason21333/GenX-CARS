"use client";

import { useMemo, useState } from "react";

type PriceCalculatorProps = {
  basePrice?: number;
  inviteRate?: number;
  hourlyRate?: number;
};

export function PriceCalculator({
  basePrice = 500,
  inviteRate = 5,
  hourlyRate = 120
}: PriceCalculatorProps) {
  const [invites, setInvites] = useState(50);
  const [duration, setDuration] = useState(4);

  const { subtotal, inviteCost, durationCost } = useMemo(() => {
    const inviteCostCalc = invites * inviteRate;
    const durationCostCalc = duration * hourlyRate;
    const subtotalCalc = basePrice + inviteCostCalc + durationCostCalc;
    return { subtotal: subtotalCalc, inviteCost: inviteCostCalc, durationCost: durationCostCalc };
  }, [basePrice, hourlyRate, inviteRate, invites, duration]);

  return (
    <section className="glass gradient-border rounded-3xl p-6 lg:p-8">
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Pricing</p>
          <h2 className="text-2xl font-semibold">Event Price Calculator</h2>
          <p className="text-slate-400 mt-2">
            Adjust number of invites and event duration to estimate your package.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
            <span className="text-sm text-slate-300">Number of Invites</span>
            <input
              type="number"
              min={0}
              value={invites}
              onChange={(e) => setInvites(Number(e.target.value) || 0)}
              className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-accent focus:outline-none"
            />
            <span className="text-xs text-slate-400">${inviteRate.toFixed(2)} per invite</span>
          </label>

          <label className="flex flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
            <span className="text-sm text-slate-300">Duration of Event (hours)</span>
            <input
              type="number"
              min={0}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value) || 0)}
              className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-white focus:border-accent focus:outline-none"
            />
            <span className="text-xs text-slate-400">${hourlyRate.toFixed(2)} per hour</span>
          </label>
        </div>

        <div className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
          <div className="flex justify-between text-slate-300">
            <span>Base package</span>
            <span>${basePrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Invite cost</span>
            <span>${inviteCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Duration cost</span>
            <span>${durationCost.toFixed(2)}</span>
          </div>
          <div className="border-t border-slate-800 pt-3 flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

