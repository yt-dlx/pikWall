"use client";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import { extend } from "@react-three/fiber";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial, shaderMaterial } from "@react-three/drei";

const AsteroidMaterial = shaderMaterial(
  {
    time: 0,
    color: new THREE.Color(0xfabd2f),
  },
  `
  uniform float time;
  attribute float size;
  varying vec3 vColor;
  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (30.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
  `,
  `
  uniform float time;
  varying vec3 vColor;
  void main() {
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 3.0);
    vec3 color = vColor * vec3(strength);
    gl_FragColor = vec4(color, strength);
  }
  `
);

extend({ AsteroidMaterial });

export default function StarField({ speed = 0.5 }) {
  const starsRef = useRef<THREE.Points>(null);
  const asteroidsRef = useRef<THREE.Points>(null);
  const starCount = 5000;
  const asteroidCount = 50;

  const [starPositions, asteroidPositions, asteroidSizes] = useMemo(() => {
    const starPositions = new Float32Array(starCount * 3);
    const asteroidPositions = new Float32Array(asteroidCount * 3);
    const asteroidSizes = new Float32Array(asteroidCount);

    for (let i = 0; i < starCount * 3; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.5 + Math.random() * 0.5;
      starPositions[i] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i + 2] = r * Math.cos(phi);
    }

    for (let i = 0; i < asteroidCount; i++) {
      asteroidPositions[i * 3] = (Math.random() - 0.5) * 3;
      asteroidPositions[i * 3 + 1] = (Math.random() - 0.5) * 3;
      asteroidPositions[i * 3 + 2] = (Math.random() - 0.5) * 3;
      asteroidSizes[i] = Math.random() * 0.03 + 0.01;
    }

    return [starPositions, asteroidPositions, asteroidSizes];
  }, [starCount, asteroidCount]);

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.x -= (delta / 10) * speed;
      starsRef.current.rotation.y -= (delta / 15) * speed;
    }
    if (asteroidsRef.current) {
      asteroidsRef.current.rotation.x -= (delta / 5) * speed;
      asteroidsRef.current.rotation.y -= (delta / 7) * speed;
      const material = asteroidsRef.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value += delta;
    }
  });

  return (
    <>
      {/* @ts-expect-error JSX element not recognized */}
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={starsRef} positions={starPositions} stride={3} frustumCulled={false}>
          <PointMaterial transparent color="#ffffff" size={0.002} sizeAttenuation={true} depthWrite={false} />
        </Points>
        <Points ref={asteroidsRef} positions={asteroidPositions} stride={3} frustumCulled={false}>
          {/* @ts-expect-error JSX element not recognized */}
          <AsteroidMaterial transparent depthWrite={false} />
          {/* @ts-expect-error JSX element not recognized */}
          <bufferAttribute attachObject={["attributes", "size"]} array={asteroidSizes} itemSize={1} />
        </Points>
        {/* @ts-expect-error JSX element not recognized */}
      </group>
    </>
  );
}
