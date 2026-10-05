import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Project3DShowcase: A subtle Three.js canvas featuring a rotating geometric
 * wireframe project prism with floating node particles in Coffee Brown & Cream.
 * Reacts subtly to cursor movement without taxing system performance.
 */
export const Project3DShowcase = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 180;
    const height = currentMount.clientHeight || 140;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    currentMount.appendChild(renderer.domElement);

    // 2. Geometry: Nested Wireframe Project Core (Icosahedron + Octahedron)
    const outerGeo = new THREE.IcosahedronGeometry(1.2, 0);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0x4a2e1b, // Coffee Brown
      wireframe: true,
      transparent: true,
      opacity: 0.75
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerMesh);

    const innerGeo = new THREE.OctahedronGeometry(0.7, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xb8860b, // Warm Golden Amber
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // 3. Floating Project Nodes (Particles)
    const particleCount = 24;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 3.5;
      positions[i + 1] = (Math.random() - 0.5) * 3.5;
      positions[i + 2] = (Math.random() - 0.5) * 3.5;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x8b5a2b, // Warm Tan
      size: 0.08,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Mouse movement tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = currentMount.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / width) * 2 - 1;
      mouseY = -(y / height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 5. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      outerMesh.rotation.x += 0.005;
      outerMesh.rotation.y += 0.008;
      outerMesh.rotation.z = targetX * 0.4;

      innerMesh.rotation.x -= 0.008;
      innerMesh.rotation.y -= 0.01;

      particles.rotation.y += 0.002;
      particles.rotation.x = targetY * 0.3;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="project-3d-canvas-container"
      title="Interactive 3D Portfolio Geometry"
      aria-hidden="true"
    />
  );
};

export default Project3DShowcase;
