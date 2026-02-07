'use client';

import React, { useMemo, useState } from 'react';

type Inputs = {
  monthlyCalls: number;
  missedPercentage: number;
  bookingRate: number;
  avgTicket: number;
  grossMargin: number;
};

function fmtMoney(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.round(n));
}

export default function MissedCallCalculatorClient() {
  const [inputs, setInputs] = useState<Inputs>({
    monthlyCalls: 200,
    missedPercentage: 25,
    bookingRate: 60,
    avgTicket: 800,
    grossMargin: 45,
  });

  const results = useMemo(() => {
    const missedCalls = inputs.monthlyCalls * (inputs.missedPercentage / 100);
    const bookedJobsLost = missedCalls * (inputs.bookingRate / 100);
    const monthlyRevenueLost = bookedJobsLost * inputs.avgTicket;
    const monthlyProfitLost = monthlyRevenueLost * (inputs.grossMargin / 100);

    const recoveryRates = [0.25, 0.5, 0.75] as const;
    const recovered = recoveryRates.map((r) => ({
      r,
      revenue: monthlyRevenueLost * r,
      profit: monthlyProfitLost * r,
    }));

    return {
      missedCalls,
      bookedJobsLost,
      monthlyRevenueLost,
      monthlyProfitLost,
      recovered,
    };
  }, [inputs]);

  const onNum = (key: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const val = raw === '' ? 0 : Number(raw);
    setInputs((p) => ({ ...p, [key]: Number.isFinite(val) ? val : p[key] }));
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-10">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-900">
          Missed Call Revenue Loss Calculator
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl">
          Plug in your numbers. See your estimated monthly revenue lost and profit left on the table.
        </p>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/40 p-6">
            <h2 className="text-sm font-extrabold tracking-widest text-slate-500 uppercase">Inputs</h2>

            <div className="mt-6 space-y-4">
              <Field label="Monthly call volume" hint="Total inbound calls per month">
                <input className={inputCls} type="number" min={0} step={10} value={inputs.monthlyCalls} onChange={onNum('monthlyCalls')} />
              </Field>

              <Field label="Missed call %" hint="Calls not answered live (voicemail, abandoned, hold)">
                <input className={inputCls} type="number" min={0} max={100} step={1} value={inputs.missedPercentage} onChange={onNum('missedPercentage')} />
              </Field>

              <Field label="Booking rate %" hint="Answered calls that become scheduled jobs">
                <input className={inputCls} type="number" min={0} max={100} step={1} value={inputs.bookingRate} onChange={onNum('bookingRate')} />
              </Field>

              <Field label="Average ticket ($)" hint="Average invoice value">
                <input className={inputCls} type="number" min={0} step={25} value={inputs.avgTicket} onChange={onNum('avgTicket')} />
              </Field>

              <Field label="Gross margin %" hint="So we show profit, not just revenue">
                <input className={inputCls} type="number" min={0} max={100} step={1} value={inputs.grossMargin} onChange={onNum('grossMargin')} />
              </Field>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-900 p-6 text-white">
              <h2 className="text-sm font-extrabold tracking-widest text-slate-300 uppercase">Estimated loss</h2>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Stat label="Monthly revenue lost" value={fmtMoney(results.monthlyRevenueLost)} />
                <Stat label="Monthly profit lost" value={fmtMoney(results.monthlyProfitLost)} />
              </div>
              <p className="mt-4 text-xs text-slate-300">
                Directional estimate based on your inputs. Adjust assumptions to match reality.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-6">
              <h2 className="text-sm font-extrabold tracking-widest text-slate-500 uppercase">Recovery scenarios (no guarantees)</h2>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {results.recovered.map((s) => (
                  <div key={s.r} className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                    <div className="text-xs font-bold text-slate-500">{Math.round(s.r * 100)}%</div>
                    <div className="mt-2 text-lg font-black text-slate-900">{fmtMoney(s.revenue)}</div>
                    <div className="text-xs text-slate-600">Revenue recovered / mo</div>
                    <div className="mt-2 text-sm font-bold text-emerald-700">{fmtMoney(s.profit)}</div>
                    <div className="text-xs text-slate-600">Profit recovered / mo</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 p-6">
              <h2 className="text-sm font-extrabold tracking-widest text-slate-500 uppercase">Quick read</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                <li>
                  Missed calls/month: <b>{Math.round(results.missedCalls).toLocaleString()}</b>
                </li>
                <li>
                  Booked jobs lost/month: <b>{Math.round(results.bookedJobsLost).toLocaleString()}</b>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-10">
        <div className="mx-auto max-w-5xl px-6 text-sm text-slate-500">
          Built for HVAC, plumbing, electrical, and other service businesses where speed matters.
        </div>
      </footer>
    </main>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-semibold text-slate-800">{label}</label>
      </div>
      {children}
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <div className="text-xs text-slate-300 font-semibold">{label}</div>
      <div className="mt-2 text-2xl font-black">{value}</div>
    </div>
  );
}

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500';
