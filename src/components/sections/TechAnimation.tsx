"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function ParticleBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0.8);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 1. Particle Field - Reduced count for a cleaner, less cluttered look
    const particlesCount = 3500; 
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      const r = 12 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      posArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i * 3 + 2] = r * Math.cos(phi);
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01, // Slightly smaller
      color: '#1E293B', // Match new slate navy
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const particlesMesh = new Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // 2. Floating Geometries - Reduced to 20 for a more minimalist feel
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.IcosahedronGeometry(0.3, 0),
      new THREE.TorusGeometry(0.2, 0.05, 16, 100),
      new THREE.OctahedronGeometry(0.25, 0)
    ];

    for (let i = 0; i < 20; i++) {
      const material = new THREE.MeshPhongMaterial({
        color: '#1E293B',
        wireframe: true,
        transparent: true,
        opacity: 0.15
      });
      const shape = new THREE.Mesh(geometries[i % 3], material);
      shape.position.set(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 20
      );
      shape.userData = {
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        floatSpeed: 0.0003 + Math.random() * 0.0007,
        offset: Math.random() * Math.PI * 2
      };
      scene.add(shape);
      shapes.push(shape);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.2);
    sunLight.position.set(-15, 15, 10);
    scene.add(sunLight);

    camera.position.z = 14; // Move camera back slightly for more space

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.0002;
      particlesMesh.rotation.x += 0.0001;

      particlesMesh.position.x += (mouseX * 1.2 - particlesMesh.position.x) * 0.02;
      particlesMesh.position.y += (-mouseY * 1.2 - particlesMesh.position.y) * 0.02;

      shapes.forEach((shape, i) => {
        shape.rotation.x += shape.userData.rotationSpeed;
        shape.rotation.y += shape.userData.rotationSpeed;
        shape.position.y += Math.sin(Date.now() * shape.userData.floatSpeed + shape.userData.offset) * 0.005;
        shape.position.x += Math.cos(Date.now() * shape.userData.floatSpeed * 0.5 + shape.userData.offset) * 0.005;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-1000" 
      style={{ opacity }}
    />
  );
}

// Utility to fix THREE.Points reference if needed in some environments
class Points extends THREE.Points {}
