import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Interactive 3D Developer Growth Orb (Three.js).
 * Renders an elegant geodesic particle sphere reflecting developer progress.
 * Subtle, responsive to mouse movement, uses Coffee Brown & Warm Cream palette.
 */
export const DeveloperGrowth3DOrb = ({ progressPercent = 78 }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const width = currentMount.clientWidth || 240;
    const height = currentMount.clientHeight || 200;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 2. Inner Icosahedron Core (Warm Cream / Coffee)
    const innerGeom = new THREE.IcosahedronGeometry(1.6, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xC78F5A,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const innerSphere = new THREE.Mesh(innerGeom, innerMat);
    scene.add(innerSphere);

    // 3. Orbiting Data Points (Particle Cloud)
    const particleCount = 120;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.1 + (Math.random() * 0.3);
      posArray[i] = r * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = r * Math.cos(phi);
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x8C5835,
      transparent: true,
      opacity: 0.8
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 4. Subtle Mouse Tracking
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / height - 0.5;
      targetRotationY = x * 1.5;
      targetRotationX = y * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 5. Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      innerSphere.rotation.y += 0.005;
      innerSphere.rotation.x += 0.002;
      particles.rotation.y -= 0.003;

      // Dampen to mouse
      innerSphere.rotation.x += (targetRotationX - innerSphere.rotation.x) * 0.05;
      innerSphere.rotation.y += (targetRotationY - innerSphere.rotation.y) * 0.05;

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
      renderer.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div className="growth-orb-card">
      <div className="orb-3d-canvas-wrap" ref={mountRef}></div>
      <div className="orb-meta">
        <span className="orb-badge">3D PROGRESS ORB</span>
        <h4 className="orb-title">Developer Velocity</h4>
        <p className="orb-desc">Interactive spatial visualization of skill and project momentum.</p>
      </div>
    </div>
  );
};
