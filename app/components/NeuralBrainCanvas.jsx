"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import BrainFallback from "./BrainFallback";
import * as THREE from "three";

function HaloRings() {
  const g1 = useRef(), g2 = useRef();
  useFrame((_, dt) => {
    if (g1.current) g1.current.rotation.z += dt * 0.25;
    if (g2.current) g2.current.rotation.z -= dt * 0.18;
  });
  return (
    <group>
      <mesh ref={g1} rotation={[Math.PI/2, 0, 0]}>
        <ringGeometry args={[0.85, 0.86, 256]} />
        <meshBasicMaterial color="#8aa0ff" transparent opacity={0.25} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={g2} rotation={[Math.PI/2, 0, Math.PI/3]}>
        <ringGeometry args={[0.92, 0.93, 256]} />
        <meshBasicMaterial color="#bcd0ff" transparent opacity={0.18} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function OrbController() {
  const group = useRef();
  const [paused, setPaused] = useState(false);
  const glow = useRef(1);

  useFrame((_, dt) => {
    if (!group.current || paused) return;
    group.current.rotation.y += dt * 0.2;
  });

  useEffect(() => {
    const onCmd = (e) => {
      const { cmd } = e.detail || {};
      if (cmd === "freeze") setPaused(true);
      if (cmd === "resume") setPaused(false);
      if (cmd === "brighten") glow.current = 1.6;
      if (cmd === "dim") glow.current = 0.7;
      if (cmd === "burst") {
        glow.current = 2.0;
        setTimeout(() => (glow.current = 1.2), 500);
      }
    };
    const onScroll = (e) => {
      const p = e.detail?.progress ?? 0;
      if (group.current) {
        group.current.scale.setScalar(1 + p * 0.08);
        group.current.position.y = -p * 0.08;
      }
    };
    const onPointer = (e) => {
      const x = e.detail?.x ?? 0, y = e.detail?.y ?? 0;
      if (group.current) {
        group.current.rotation.x = y * 0.8;
        group.current.rotation.z = x * 0.8;
      }
    };

    window.addEventListener("orbCommand", onCmd);
    window.addEventListener("orbScroll", onScroll);
    window.addEventListener("orbPointer", onPointer);
    return () => {
      window.removeEventListener("orbCommand", onCmd);
      window.removeEventListener("orbScroll", onScroll);
      window.removeEventListener("orbPointer", onPointer);
    };
  }, []);

  // pass glow intensity down via context-like prop
  return <group ref={group}><BrainFallback glowRef={glow} /><HaloRings /></group>;
}

export default function NeuralBrainCanvas() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full">
      <Canvas camera={{ position: [0, 0, 2.3], fov: 40 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.25} />
          <directionalLight position={[3,4,5]} intensity={1.2} />
          <OrbController />
          <EffectComposer>
            <Bloom intensity={1.15} luminanceThreshold={0.1} luminanceSmoothing={0.85} mipmapBlur />
          </EffectComposer>
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
        </Suspense>
      </Canvas>
      {/* subtle rim light backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,146,255,0.18),transparent_70%)] mix-blend-screen" />
    </div>
  );
}
