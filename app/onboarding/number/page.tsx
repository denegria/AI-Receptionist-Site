"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Search, Phone, CheckCircle2 } from "lucide-react";

interface TwilioNumber {
  phoneNumber: string;
  friendlyName: string;
  locality: string;
  region: string;
}

export default function NumberSelectionPage() {
  const { user } = useUser();
  const router = useRouter();
  const [areaCode, setAreaCode] = useState("");
  const [numbers, setNumbers] = useState<TwilioNumber[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [provisioning, setProvisioning] = useState(false);
  const [success, setSuccess] = useState(false);

  const searchNumbers = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/onboarding/search-numbers?areaCode=${areaCode}`);
      const data = await res.json();
      setNumbers(data.numbers || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchNumbers();
  }, []);

  const handleProvision = async () => {
    if (!selectedNumber || !user) return;

    setProvisioning(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/onboarding/provision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: user.id,
          businessName: user.fullName || "HVAC Business",
          phoneNumber: selectedNumber,
          plan: sessionStorage.getItem("onboarding_plan") || "basic",
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProvisioning(false);
    }
  };

  if (success) {
    return (
      <div className="text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">You're all set!</h1>
        <p className="text-white/60 text-lg">Your AI receptionist is ready. Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Choose your AI number</h1>
        <p className="text-white/60">This is the number your customers will call. You can also forward your existing business line to this number.</p>
      </div>

      <form onSubmit={searchNumbers} className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-5 h-5" />
        <input
          type="text"
          placeholder="Enter area code (e.g. 415)"
          value={areaCode}
          onChange={(e) => setAreaCode(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-all"
        >
          Search
        </button>
      </form>

      <div className="space-y-3 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="py-12 text-center text-white/40">Searching for numbers...</div>
        ) : numbers.length > 0 ? (
          numbers.map((n) => (
            <div
              key={n.phoneNumber}
              onClick={() => setSelectedNumber(n.phoneNumber)}
              className={`
                flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all
                ${selectedNumber === n.phoneNumber 
                  ? "border-blue-500 bg-blue-500/10" 
                  : "border-white/5 bg-white/5 hover:border-white/10"}
              `}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-bold text-lg">{n.friendlyName}</div>
                  <div className="text-xs text-white/40">{n.locality}, {n.region}</div>
                </div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedNumber === n.phoneNumber ? "border-blue-500 bg-blue-500" : "border-white/20"}`}>
                {selectedNumber === n.phoneNumber && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-white/40">No numbers found. Try another area code.</div>
        )}
      </div>

      <button
        disabled={!selectedNumber || provisioning}
        onClick={handleProvision}
        className={`
          w-full py-4 rounded-xl font-bold text-lg transition-all
          ${selectedNumber && !provisioning
            ? "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20" 
            : "bg-white/10 text-white/40 cursor-not-allowed"}
        `}
      >
        {provisioning ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Provisioning Account...
          </div>
        ) : "Complete Onboarding"}
      </button>
    </div>
  );
}
