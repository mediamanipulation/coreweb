"use client";
import { useState } from "react";

export default function NavBar(){
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 header-glass">
      <div className="container h-16 flex items-center justify-between">
        <div className="font-bold tracking-wider">COREFLEXAI</div>
        <button className="md:hidden text-xl" onClick={()=>setOpen(!open)}>☰</button>
        <nav className={`md:flex gap-6 ${open ? "flex flex-col absolute left-0 right-0 top-16 p-4 bg-slate-900/95" : "hidden"} md:static`}>
          <a href="#platform" className="text-slate-300 hover:text-white">Platform</a>
          <a href="#solutions" className="text-slate-300 hover:text-white">Solutions</a>
          <a href="#research" className="text-slate-300 hover:text-white">Research</a>
          <a href="#contact" className="text-slate-300 hover:text-white">Contact</a>
        </nav>
      </div>
    </header>
  );
}
