"use client";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function BrainFallback({ count = 6500 }) {
  const pointsRef = useRef(null);

  function createPoints() {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const base = 0.62;
      const noise = Math.random() * 0.035;
      const r = base + noise;
      const theta = Math.acos(THREE.MathUtils.randFloatSpread(2));
      const phi = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const x = r * Math.sin(theta) * Math.cos(phi);
      const y = r * Math.cos(theta);
      const z = r * Math.sin(theta) * Math.sin(phi);
      positions.set([x, y, z], i * 3);
    }
    return positions;
  }

  const positions = useMemo(() => createPoints(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 0.6 + Math.sin(t * 0.8) * 0.08;
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0007;
      pointsRef.current.rotation.x += 0.00025;
      pointsRef.current.material.opacity = pulse;
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