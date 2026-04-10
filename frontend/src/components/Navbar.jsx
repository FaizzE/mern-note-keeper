import React from "react";
import { Link } from "react-router-dom";
import { StickyNote, Plus, Search, Command, Bell } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#16113A]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* LOGO: Always visible */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-sky-500/50 transition-colors">
            <StickyNote className="size-5 text-sky-400" />
          </div>
          {/* Hide text on very small screens if it gets cramped, but keeping per your request */}
          <h1 className="text-lg font-bold tracking-tight text-white font-mono block">
            Note<span className="text-sky-400">Taking</span>
          </h1>
        </Link>

        {/* SEARCH BAR: Hidden on mobile, shows from 'md' (768px) upwards */}
        <div className="hidden md:flex flex-1 max-w-md relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500 group-focus-within:text-sky-400 transition-colors" />
          <input
            type="text"
            placeholder="Search notes..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-12 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500/50 focus:bg-white/10 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] font-bold text-slate-500">
            <Command size={10} />
            <span>K</span>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* BELL & PROFILE: Hidden on mobile, shows from 'sm' (640px) upwards */}
          <div className="hidden sm:flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
              <Bell size={20} />
            </button>
            <div className="h-6 w-[1px] bg-white/10" />
            <div className="size-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 border border-white/20 cursor-pointer" />
          </div>

          {/* CREATE BUTTON: Always visible */}
          <Link
            to="/create"
            className="group flex items-center gap-2 bg-white hover:bg-slate-100 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 active:scale-95 shadow-lg shadow-black/20">
            <Plus
              size={18}
              strokeWidth={3}
              className="text-[#16113A] group-hover:rotate-90 transition-transform duration-300"
            />
            <span className="text-[#16113A] font-bold text-sm">
              {/* On very small mobile, we can just show the plus if needed, but keeping full text */}
              New Note
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
