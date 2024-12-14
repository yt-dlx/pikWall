// src/components/galaxy.tsx
"use client";
import * as THREE from "three";
import React, { useEffect, useRef } from "react";
interface GalaxyProps {
  isModalOpen: boolean;
}
const Galaxy: React.FC<GalaxyProps> = ({ isModalOpen }) => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 60;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 10, 30);
    scene.add(directionalLight);
    const createRadialGradientTexture = (innerColor: string, outerColor: string, size = 256) => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d")!;
      const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, innerColor);
      gradient.addColorStop(1, outerColor);
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      context.fill();
      return new THREE.CanvasTexture(canvas);
    };
    const starTexture = createRadialGradientTexture("rgba(255,255,255,1)", "rgba(255,255,255,0)");
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5, map: starTexture, transparent: true, blending: THREE.AdditiveBlending });
    const starVertices = [];
    for (let i = 0; i < 5000; i++) {
      const r = THREE.MathUtils.randFloat(50, 200);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    const asteroidCount = Math.floor(THREE.MathUtils.randFloat(15, 25));
    const asteroids: { mesh: THREE.Mesh; trail: THREE.Line; positions: THREE.Vector3[]; velocity: THREE.Vector3; rotationSpeed: THREE.Vector3 }[] = [];
    const trailLength = 50;
    const glowTexture = createRadialGradientTexture("rgba(137,180,250,0.5)", "rgba(137,180,250,0)", 512);
    for (let i = 0; i < asteroidCount; i++) {
      const asteroidGeo = new THREE.DodecahedronGeometry(3, 0);
      const posAttr = asteroidGeo.getAttribute("position") as THREE.BufferAttribute;
      for (let v = 0; v < posAttr.count; v++) {
        const x = posAttr.getX(v);
        const y = posAttr.getY(v);
        const z = posAttr.getZ(v);
        posAttr.setXYZ(v, x + THREE.MathUtils.randFloatSpread(1), y + THREE.MathUtils.randFloatSpread(1), z + THREE.MathUtils.randFloatSpread(1));
      }
      posAttr.needsUpdate = true;
      asteroidGeo.computeVertexNormals();
      const asteroidMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.7, metalness: 0.1 });
      const asteroidMesh = new THREE.Mesh(asteroidGeo, asteroidMat);
      asteroidMesh.position.set(THREE.MathUtils.randFloatSpread(100), THREE.MathUtils.randFloatSpread(100), 200 + Math.random() * 200);
      const velocity = new THREE.Vector3(THREE.MathUtils.randFloatSpread(0.1), THREE.MathUtils.randFloatSpread(0.1), -(0.5 + Math.random() * 0.5));
      const rotationSpeed = new THREE.Vector3(THREE.MathUtils.randFloat(-0.01, 0.01), THREE.MathUtils.randFloat(-0.01, 0.01), THREE.MathUtils.randFloat(-0.01, 0.01));
      const positions = Array.from({ length: trailLength }, () => asteroidMesh.position.clone());
      const trailGeometry = new THREE.BufferGeometry();
      const trailPositionArray = new Float32Array(trailLength * 3);
      const trailColorArray = new Float32Array(trailLength * 3);
      const headColor = new THREE.Color("#89b4fa");
      const tailColor = new THREE.Color("#000000");
      for (let j = 0; j < trailLength; j++) {
        const t = j / (trailLength - 1);
        const r = THREE.MathUtils.lerp(headColor.r, tailColor.r, t);
        const g = THREE.MathUtils.lerp(headColor.g, tailColor.g, t);
        const b = THREE.MathUtils.lerp(headColor.b, tailColor.b, t);
        trailColorArray[j * 3 + 0] = r;
        trailColorArray[j * 3 + 1] = g;
        trailColorArray[j * 3 + 2] = b;
      }
      trailGeometry.setAttribute("position", new THREE.BufferAttribute(trailPositionArray, 3));
      trailGeometry.setAttribute("color", new THREE.BufferAttribute(trailColorArray, 3));
      const trailMaterial = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.9 });
      const trailLine = new THREE.Line(trailGeometry, trailMaterial);
      const glowSpriteMaterial = new THREE.SpriteMaterial({ map: glowTexture, color: 0xffffff, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.5 });
      const glowSprite = new THREE.Sprite(glowSpriteMaterial);
      glowSprite.scale.set(6, 6, 1); // smaller glow
      asteroidMesh.add(glowSprite);
      scene.add(asteroidMesh);
      scene.add(trailLine);
      asteroids.push({ mesh: asteroidMesh, trail: trailLine, positions, velocity, rotationSpeed });
    }
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    let lastMouseMoveTime = Date.now();
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      lastMouseMoveTime = Date.now();
    };
    window.addEventListener("mousemove", onMouseMove);
    const animate = () => {
      requestAnimationFrame(animate);
      const now = Date.now();
      const timeSinceLastMove = now - lastMouseMoveTime;
      if (timeSinceLastMove > 1000) {
        stars.rotation.x += 0.0005;
        stars.rotation.y += 0.0005;
      } else {
        const normalizedX = mouse.x / window.innerWidth - 0.5;
        const normalizedY = mouse.y / window.innerHeight - 0.5;
        targetRotation.x = normalizedY * 0.5;
        targetRotation.y = normalizedX * 0.5;
        const lerpFactor = 0.05;
        stars.rotation.x += (targetRotation.x - stars.rotation.x) * lerpFactor;
        stars.rotation.y += (targetRotation.y - stars.rotation.y) * lerpFactor;
      }
      for (const asteroid of asteroids) {
        asteroid.mesh.position.add(asteroid.velocity);
        asteroid.mesh.rotation.x += asteroid.rotationSpeed.x;
        asteroid.mesh.rotation.y += asteroid.rotationSpeed.y;
        asteroid.mesh.rotation.z += asteroid.rotationSpeed.z;
        if (asteroid.mesh.position.z < -100) {
          asteroid.mesh.position.set(THREE.MathUtils.randFloatSpread(100), THREE.MathUtils.randFloatSpread(100), 200 + Math.random() * 200);
          asteroid.velocity.set(THREE.MathUtils.randFloatSpread(0.1), THREE.MathUtils.randFloatSpread(0.1), -(0.5 + Math.random() * 0.5));
        }
        asteroid.positions.pop();
        asteroid.positions.unshift(asteroid.mesh.position.clone());
        const posAttr = asteroid.trail.geometry.getAttribute("position") as THREE.BufferAttribute;
        asteroid.positions.forEach((p, idx) => {
          posAttr.setXYZ(idx, p.x, p.y, p.z);
        });
        posAttr.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };
    animate();
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      container.removeChild(renderer.domElement);
      starGeometry.dispose();
      starMaterial.dispose();
      asteroids.forEach((asteroid) => {
        asteroid.mesh.geometry.dispose();
        (asteroid.mesh.material as THREE.Material).dispose();
        asteroid.trail.geometry.dispose();
        (asteroid.trail.material as THREE.Material).dispose();
      });
    };
  }, [isModalOpen]);
  return <div id="three-canvas-container" ref={canvasRef}></div>;
};

export default Galaxy;
