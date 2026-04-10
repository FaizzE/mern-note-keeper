import { ZapIcon, Clock, ShieldAlert } from "lucide-react";

const RateLimitedUi = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="relative overflow-hidden bg-[#1D1B4B]/40 border border-white/10 rounded-2xl shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />

        <div className="flex flex-col md:flex-row items-center p-8 md:p-12 gap-8">
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-sky-500/20 blur-2xl rounded-full animate-pulse" />
            <div className="relative size-20 bg-[#16113A] border border-sky-500/30 rounded-2xl flex items-center justify-center">
              <ZapIcon
                className="size-10 text-sky-400 animate-bounce"
                style={{ animationDuration: "3s" }}
              />
              <ShieldAlert className="absolute -bottom-1 -right-1 size-5 text-white" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-sky-500/80">
                <Clock size={12} />
                <span>Cooling Down</span>
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Rate Limit Reached
              </h3>
            </div>

            <div className="space-y-3">
              <p className="text-slate-300 leading-relaxed">
                Your request frequency has exceeded the safety threshold. Our
                systems are currently cooling down to ensure stability.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="text-xs font-medium text-slate-400">
                  Resuming operations in a few moments...
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border-t border-white/5 px-8 py-3 flex justify-between items-center">
          <span className="text-[10px] font-mono text-slate-500 uppercase">
            Status: 429_TOO_MANY_REQUESTS
          </span>
          <div className="flex gap-1">
            <div className="size-1 rounded-full bg-slate-600" />
            <div className="size-1 rounded-full bg-slate-600" />
            <div className="size-1 rounded-full bg-sky-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUi;
