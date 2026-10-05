import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Lightweight, aesthetic 3D header decoration in Coffee Brown + Warm Cream.
 * Uses requestAnimationFrame and unmount cleanup to guarantee zero memory leaks.
 */
export const Skill3DHeader = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = 120;
    const height = 120;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Warm Coffee-Cream Dodecahedron & Octahedron
    const geoOuter = new THREE.IcosahedronGeometry(1.4, 0);
    const matOuter = new THREE.MeshStandardMaterial({
      color: 0x5c3827, // Coffee Brown
      wireframe: true,
      roughness: 0.3,
      metalness: 0.2
    });
    const meshOuter = new THREE.Mesh(geoOuter, matOuter);
    scene.add(meshOuter);

    const geoInner = new THREE.OctahedronGeometry(0.8, 0);
    const matInner = new THREE.MeshStandardMaterial({
      color: 0xb87a4b, // Warm Amber/Gold
      roughness: 0.4,
      metalness: 0.6
    });
    const meshInner = new THREE.Mesh(geoInner, matInner);
    scene.add(meshInner);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xe8d5be, 2, 10);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      meshOuter.rotation.x += 0.008;
      meshOuter.rotation.y += 0.012;
      meshInner.rotation.x -= 0.012;
      meshInner.rotation.y -= 0.008;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      geoOuter.dispose();
      matOuter.dispose();
      geoInner.dispose();
      matInner.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="skill-3d-canvas-box"
      title="Interactive 3D Skill Geometric Sphere"
    />
  );
};
