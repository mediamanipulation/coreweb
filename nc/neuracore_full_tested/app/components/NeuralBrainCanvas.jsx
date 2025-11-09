"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import BrainFallback from "./BrainFallback";

export default function NeuralBrainCanvas() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full">
      <Canvas camera={{ position: [0, 0, 2.3], fov: 40 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <BrainFallback />
          <EffectComposer>
            <Bloom intensity={1.15} luminanceThreshold={0.1} luminanceSmoothing={0.85} mipmapBlur />
          </EffectComposer>
          <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
        </Suspense>
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,146,255,0.18),transparent_70%)] mix-blend-screen" />
    </div>
  );
}