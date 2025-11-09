"use client";

import { useRef, useEffect, useState } from "react";
import NeuralBrainCanvas from "./NeuralBrainCanvas";
import NeuralParticles from "./Particles";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const tiltRef = useRef(null);
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [listening, setListening] = useState(false);

  // fade-in
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) { setLoaded(true); return; }

    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power2.out", onStart: () => setLoaded(true) }
    );
  }, []);

  // pointer → wobble
  // useEffect(() => {
  //   const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  //   if (reduced) return;

  //   const move = (e) => {
  //     if (!containerRef.current || !tiltRef.current) return;
  //     const r = containerRef.current.getBoundingClientRect();
  //     const x = (e.clientX - r.left) / r.width - 0.5;
  //     const y = (e.clientY - r.top) / r.height - 0.5;
  //     tiltRef.current.style.transform =
  //       `perspective(1300px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;

  //     window.dispatchEvent(new CustomEvent("orbPointer", { detail: { x, y } }));
  //   };

  //   window.addEventListener("mousemove", move);
  //   return () => window.removeEventListener("mousemove", move);
  // }, []);

  // scroll scrub → orb scale
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=60%",
        scrub: 0.4,
      }
    });

    tl.to({}, {
      duration: 1,
      onUpdate: () => {
        const p = tl.progress();
        window.dispatchEvent(new CustomEvent("orbScroll", { detail: { progress: p } }));
      }
    });

    return () => tl.scrollTrigger?.kill();
  }, []);

  // CTA ripple
  const ripple = (e) => {
    const btn = e.currentTarget;
    const circle = document.createElement("span");
    const d = Math.max(btn.clientWidth, btn.clientHeight);
    circle.style.width = circle.style.height = `${d}px`;

    const rect = btn.getBoundingClientRect();
    circle.style.left = `${e.clientX - rect.left - d / 2}px`;
    circle.style.top = `${e.clientY - rect.top - d / 2}px`;

    circle.className = "ripple";
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);

    window.dispatchEvent(new CustomEvent("orbCommand", { detail: { cmd: "burst" } }));
  };

  return (
<section
  id="platform"   // ✅ match your navbar href
  ref={containerRef}
  className="relative h-screen flex items-center overflow-hidden px-4"
>

      {/* BACKGROUND PARTICLES */}
      <NeuralParticles />

      {/* ORB */}
      <NeuralBrainCanvas />

      {/* HERO TEXT */}
      <div
        ref={tiltRef}
        className="relative z-10 mx-auto container max-w-4xl"
      >
        <div ref={heroRef} className="p-2 md:p-4 text-center md:text-left transition-all duration-1000">
          
          <h1
            className="
              text-4xl md:text-6xl font-extrabold leading-tight
              bg-gradient-to-r from-indigo-200 via-white to-indigo-200
              bg-clip-text text-transparent
              animate-gradientShift
              glow-text
            "
          >
            Where AI Meets Human Intelligence
          </h1>

          <p className="mt-4 text-slate-300 text-base md:text-lg">
            Transforming adaptive cognition into real-world capability.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="btn-primary glow-orb relative overflow-hidden" onClick={ripple}>
              Get Started
            </button>
            <button className="btn-outline glow-orb relative overflow-hidden" onClick={ripple}>
              Learn More
            </button>
          </div>

        </div>
      </div>

      {/* subtle CSS embedded */}
      <style jsx>{`
        .glow-text {
          text-shadow:
            0 0 8px rgba(150, 180, 255, 0.35),
            0 0 16px rgba(120, 150, 255, 0.22);
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradientShift {
          background-size: 200% 200%;
          animation: gradientShift 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
