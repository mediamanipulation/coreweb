"use client";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function BrainFallback({ count = 6500, glowRef }) {
  const pointsRef = useRef(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const base = 0.62, noise = Math.random() * 0.035;
      const r = base + noise;
      const theta = Math.acos(THREE.MathUtils.randFloatSpread(2));
      const phi = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.cos(theta);
      const z = r * Math.sin(theta) * Math.sin(phi);
      arr.set([x, y, z], i * 3);
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
  const t = clock.getElapsedTime();

  // Smooth sine pulse between ~0.45–0.65
  const pulse = 0.55 + Math.sin(t * 0.6) * 0.10;

  if (pointsRef.current) {

    // ⏳ Extremely slow rotation
    pointsRef.current.rotation.y += 0.000005;
    pointsRef.current.rotation.x += 0.000002;

    // ✅ Pulse opacity
    const mat = pointsRef.current.material;
    if (mat) {
      mat.opacity = pulse;      // <-- core pulsing line
    }
  }
});

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.013}
        color="#A8B5FF"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}
