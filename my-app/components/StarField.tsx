"use client";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

export default function StarField({ speed = 0.5 }) {
  const ref = useRef<THREE.Points>(null);
  const starCount = 5000;

  const [positions] = useMemo(() => {
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.5 + Math.random() * 0.5;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    return [positions];
  }, [starCount]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= (delta / 10) * speed;
      ref.current.rotation.y -= (delta / 15) * speed;
    }
  });

  return (
    <>
      {/* @ts-expect-error: skip */}
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
          <PointMaterial transparent color="#ffffff" size={0.002} sizeAttenuation={true} depthWrite={false} />
        </Points>
        {/* @ts-expect-error: skip */}
      </group>
    </>
  );
}
