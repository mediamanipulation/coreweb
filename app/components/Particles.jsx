"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function NeuralParticles() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(q.matches);
    set(); q.addEventListener?.("change", set);
    return () => q.removeEventListener?.("change", set);
  }, []);

  const particlesInit = useCallback(async (engine) => { await loadFull(engine); }, []);

  const options = useMemo(() => ({
    fullScreen: { enable: false },
    background: { color: "transparent" },
    fpsLimit: reduced ? 30 : 60,
    particles: {
      number: { value: reduced ? 80 : 140, density: { enable: true, area: 900 } },
      size: { value: 4 },
      color: { value: "#8ca8ff" },
      opacity: { value: 0.35 },
      links: {
        enable: true, distance: 140, color: "#8ca8ff",
        opacity: 0.22, width: 1
      },
      move: { enable: true, speed: reduced ? 0.2 : 0.4, random: false, straight: false }
    },
    interactivity: {
      events: {
        onHover: { enable: !reduced, mode: ["attract"] },
        onClick: { enable: false }
      },
      modes: {
        attract: { distance: 180, duration: 0.2, speed: 1 }
      }
    },
    detectRetina: true
  }), [reduced]);

  return (
    <Particles id="tsparticles" init={particlesInit} options={options}
      className="absolute inset-0 -z-20 w-full h-full" />
  );
}
