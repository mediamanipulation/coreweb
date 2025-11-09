"use client";
import { useRef, useEffect } from "react";
import NeuralBrainCanvas from "./NeuralBrainCanvas";

export default function Hero() {
  const tiltRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const s = window.scrollY * 0.002;
      if (tiltRef.current) {
        tiltRef.current.style.transform = 
          `perspective(1300px) rotateX(${s * -4}deg) rotateY(${s * 4}deg)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <NeuralBrainCanvas />
      <div ref={tiltRef} className="relative z-10 mx-auto container max-w-2xl px-6">
        <div className="backdrop-blur-sm bg-slate-900/15 p-8 rounded-xl border border-white/10">
          <h1 className="text-4xl md:text-6xl font-bold">
            Where AI Meets Human Intelligence
          </h1>
          <p className="mt-4 text-primary/80">
            Transforming adaptive cognition into real-world capability.
          </p>
          <div className="mt-6 flex gap-4">
            <a className="btn-primary glow-orb" href="#start">Get Started</a>
            <a className="btn-outline glow-orb" href="#learn">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  );
}