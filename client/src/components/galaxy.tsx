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
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const createCircleTexture = () => {
      const size = 256;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d")!;
      context.beginPath();
      context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      context.fillStyle = "white";
      context.fill();
      return new THREE.CanvasTexture(canvas);
    };

    const starTexture = createCircleTexture();

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
      map: starTexture,
      transparent: true
    });

    const starVertices = [];
    for (let i = 0; i < 5000; i++) {
      const x = THREE.MathUtils.randFloatSpread(200);
      const y = THREE.MathUtils.randFloatSpread(200);
      const z = THREE.MathUtils.randFloatSpread(200);
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshStandardMaterial({
      color: 0xadd8e6, // Nordic light blue
      emissive: 0xa1c4fd, // Cool white-blue glow
      emissiveIntensity: 2
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    const haloGeometry = new THREE.SphereGeometry(6, 32, 32);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xa1c4fd,
      transparent: true,
      opacity: 0.3
    });
    const sunHalo = new THREE.Mesh(haloGeometry, haloMaterial);
    scene.add(sunHalo);

    let sunScaleDirection = 1;
    const animateSun = () => {
      const scaleSpeed = 0.005;
      sun.scale.x += scaleSpeed * sunScaleDirection;
      sun.scale.y += scaleSpeed * sunScaleDirection;
      sun.scale.z += scaleSpeed * sunScaleDirection;
      if (sun.scale.x > 1.1 || sun.scale.x < 0.9) {
        sunScaleDirection *= -1;
      }
      sunHalo.scale.copy(sun.scale);
    };

    const textureLoader = new THREE.TextureLoader();
    const cloudTexture = textureLoader.load("/cloud-texture.png");
    const cloudMaterial = new THREE.SpriteMaterial({
      map: cloudTexture,
      color: 0xffffff,
      transparent: true,
      opacity: 0.3
    });

    const createCloud = (position: THREE.Vector3, scale: number): THREE.Sprite => {
      const sprite = new THREE.Sprite(cloudMaterial);
      sprite.position.set(position.x, position.y, position.z);
      sprite.scale.set(scale, scale, scale);
      return sprite;
    };

    const clouds: THREE.Sprite[] = [];

    for (let i = 0; i < 10; i++) {
      const x = THREE.MathUtils.randFloatSpread(200);
      const y = THREE.MathUtils.randFloatSpread(200);
      const z = THREE.MathUtils.randFloatSpread(200);
      const scale = THREE.MathUtils.randFloat(10, 20);
      const cloud = createCloud(new THREE.Vector3(x, y, z), scale);
      clouds.push(cloud);
      scene.add(cloud);
    }

    const asteroidGeometry = new THREE.BufferGeometry();
    const asteroidMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 1.5,
      transparent: true
    });

    const asteroidVertices = [];
    for (let i = 0; i < 50; i++) {
      const x = THREE.MathUtils.randFloatSpread(200);
      const y = THREE.MathUtils.randFloatSpread(200);
      const z = THREE.MathUtils.randFloatSpread(200);
      asteroidVertices.push(x, y, z);
    }
    asteroidGeometry.setAttribute("position", new THREE.Float32BufferAttribute(asteroidVertices, 3));
    const asteroids = new THREE.Points(asteroidGeometry, asteroidMaterial);
    scene.add(asteroids);

    const asteroidSpeed = 0.1;

    const moveAsteroids = () => {
      const positions = asteroidGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += asteroidSpeed * (Math.random() - 0.5);
        positions[i + 1] += asteroidSpeed * (Math.random() - 0.5);
        positions[i + 2] += asteroidSpeed * (Math.random() - 0.5);
      }
      asteroidGeometry.attributes.position.needsUpdate = true;
    };

    camera.position.z = 50;

    const animate = () => {
      requestAnimationFrame(animate);
      const speedMultiplier = isModalOpen ? 5 : 1.5;
      stars.rotation.x += 0.001 * speedMultiplier;
      stars.rotation.y += 0.001 * speedMultiplier;
      clouds.forEach((cloud) => {
        cloud.rotation.z += 0.0002 * speedMultiplier;
      });
      animateSun();
      moveAsteroids();
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
    };
  }, [isModalOpen]);

  return <div id="three-canvas-container" ref={canvasRef}></div>;
};

export default Galaxy;
