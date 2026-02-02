export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col">
      <header className="p-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">A</div>
            <span className="font-bold text-xl tracking-tight">Antigravity AI</span>
          </div>
          <div className="flex gap-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs">1</span>
              Plan
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs">2</span>
              Payment
            </div>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs">3</span>
              Number
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-6">
        {children}
      </main>
    </div>
  );
}
