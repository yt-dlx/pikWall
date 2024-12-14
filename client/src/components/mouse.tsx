/* src/components/Mouse.tsx */
"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { SRGBColorSpace, ACESFilmicToneMapping } from "three";

const Mouse: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spaceshipRef = useRef<THREE.Object3D | null>(null);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();

    // Environment Map
    const envLoader = new THREE.CubeTextureLoader();
    const envMap = envLoader.load(["/env/px.jpg", "/env/nx.jpg", "/env/py.jpg", "/env/ny.jpg", "/env/pz.jpg", "/env/nz.jpg"]);
    scene.environment = envMap;
    scene.background = envMap; // Optional

    // Camera Setup (Orthographic for HUD-like behavior)
    const camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 1, 1000);
    camera.position.z = 10;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    container.appendChild(renderer.domElement);

    // Lighting Setup
    // Hemisphere Light: Ambient light from sky and ground
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    hemisphereLight.position.set(0, 20, 0);
    scene.add(hemisphereLight);

    // Ambient Light: Overall light
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    // Directional Light: Acts like the sun
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 10, 30);
    scene.add(directionalLight);

    // Load Spaceship Model
    const loader = new GLTFLoader();
    loader.load(
      "/models/scene.gltf",
      (gltf: GLTF) => {
        const spaceship = gltf.scene;
        spaceship.scale.set(20, 20, 20); // Adjust scale as needed

        // Traverse the model to adjust materials if necessary
        spaceship.traverse((obj: THREE.Object3D) => {
          if ((obj as THREE.Mesh).isMesh) {
            const mesh = obj as THREE.Mesh;
            // Ensure materials receive lighting correctly
            if (mesh.material && "envMapIntensity" in mesh.material) {
              (mesh.material as THREE.MeshStandardMaterial).envMapIntensity = 1;
            }
            // Optionally, set materials to double-sided for testing
            // mesh.material.side = THREE.DoubleSide;
          }
        });

        spaceshipRef.current = spaceship;
        scene.add(spaceship);
      },
      undefined,
      (error: ErrorEvent) => {
        console.error("Error loading spaceship model:", error);
      }
    );

    // Mouse Movement Handler
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX - window.innerWidth / 2;
      mouse.current.y = -(event.clientY - window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Window Resize Handler
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.left = window.innerWidth / -2;
      camera.right = window.innerWidth / 2;
      camera.top = window.innerHeight / 2;
      camera.bottom = window.innerHeight / -2;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (spaceshipRef.current) {
        // Smoothly interpolate spaceship position towards the mouse position
        spaceshipRef.current.position.x += (mouse.current.x - spaceshipRef.current.position.x) * 0.1;
        spaceshipRef.current.position.y += (mouse.current.y - spaceshipRef.current.position.y) * 0.1;

        // Rotate spaceship to face the direction of movement
        spaceshipRef.current.rotation.z = Math.atan2(mouse.current.y - spaceshipRef.current.position.y, mouse.current.x - spaceshipRef.current.position.x) + Math.PI / 2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on Unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <div ref={containerRef} className="fixed top-0 left-0 pointer-events-none z-50"></div>;
};

export default Mouse;
