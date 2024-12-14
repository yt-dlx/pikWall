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
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    const createCircleTexture = () => {
      const size = 256;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d")!;
      const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      context.fill();
      return new THREE.CanvasTexture(canvas);
    };
    const starTexture = createCircleTexture();
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      map: starTexture,
      transparent: true,
      blending: THREE.AdditiveBlending
    });
    const starVertices = [];
    for (let i = 0; i < 7500; i++) {
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
    camera.position.z = 100;
    const animate = () => {
      requestAnimationFrame(animate);
      const speedMultiplier = isModalOpen ? 3 : 1;
      stars.rotation.x += 0.0005 * speedMultiplier;
      stars.rotation.y += 0.0005 * speedMultiplier;
      camera.position.x = Math.sin(Date.now() * 0.0005) * 5;
      camera.position.y = Math.cos(Date.now() * 0.0005) * 5;
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
      container.removeChild(renderer.domElement);
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, [isModalOpen]);
  return <div id="three-canvas-container" ref={canvasRef}></div>;
};

export default Galaxy;
