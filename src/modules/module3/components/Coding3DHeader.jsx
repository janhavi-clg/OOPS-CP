import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Lightweight, aesthetic 3D header decoration for Module 3 in Coffee Brown + Gold.
 * Floating compiler/code cube with subtle wireframe rotation.
 * Guarantees zero memory leaks with strict cleanup on unmount.
 */
export const Coding3DHeader = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = 120;
    const height = 120;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.0;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Coffee Brown outer wireframe cube
    const geoCube = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const matCube = new THREE.MeshStandardMaterial({
      color: 0x5c3827, // Coffee Brown
      wireframe: true,
      roughness: 0.3,
      metalness: 0.3
    });
    const meshCube = new THREE.Mesh(geoCube, matCube);
    scene.add(meshCube);

    // Warm Gold inner diamond / octahedron
    const geoOcta = new THREE.OctahedronGeometry(0.85, 0);
    const matOcta = new THREE.MeshStandardMaterial({
      color: 0xb87a4b, // Warm Amber/Gold
      roughness: 0.4,
      metalness: 0.6
    });
    const meshOcta = new THREE.Mesh(geoOcta, matOcta);
    scene.add(meshOcta);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xe8d5be, 2.2, 10);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      meshCube.rotation.x += 0.009;
      meshCube.rotation.y += 0.012;
      meshOcta.rotation.x -= 0.012;
      meshOcta.rotation.y -= 0.009;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      geoCube.dispose();
      matCube.dispose();
      geoOcta.dispose();
      matOcta.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="coding-3d-canvas-box"
      title="Interactive 3D Developer Activity Cube"
    />
  );
};
