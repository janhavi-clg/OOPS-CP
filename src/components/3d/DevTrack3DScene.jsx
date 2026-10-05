import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Fallback3D } from '../common/Fallback3D';

/**
 * Interactive 3D Visual for DevTrack Hero & Login scenes.
 * Adheres strictly to the Coffee Brown + Warm Cream identity.
 * Features:
 * - Central faceted geometric core with warm espresso & caramel specular reflection
 * - Double gyroscopic orbital trajectory rings
 * - Orbiting developer micro-nodes (data cubes)
 * - Shimmering cream/amber ambient particle constellation
 * - Velvety mouse tracking (horizontal rotation + vertical tilt)
 * - Graceful WebGL fallback detection
 */
export const DevTrack3DScene = ({ className = '', interactive = true, size = 'default' }) => {
  const mountRef = useRef(null);
  const [webGLError, setWebGLError] = useState(false);

  useEffect(() => {
    // 1. WebGL Feature Detection
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGL()) {
      setWebGLError(true);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // 2. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = false;
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to CSS 3D:', err);
      setWebGLError(true);
      return;
    }

    // 3. Lighting (Warm Coffee Ambient + Espresso Key Lights)
    const ambientLight = new THREE.AmbientLight(0xf5efe6, 1.2); // Warm cream ambient
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.4); // Crisp warm highlight
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xb58164, 1.8); // Caramel fill
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xd4a98f, 2.0, 15);
    rimLight.position.set(0, -5, -4);
    scene.add(rimLight);

    // 4. Main Scene Master Group
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 4a. Core Icosahedron Sculpture (Coffee Brown Aesthetic)
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x2f1b12,           // Deep Coffee Brown
      emissive: 0x1a0f0a,        // Dark Espresso
      roughness: 0.28,
      metalness: 0.45,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
      wireframe: false,
      flatShading: true
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    masterGroup.add(coreMesh);

    // 4b. Inner Crystalline Wireframe
    const innerWireGeometry = new THREE.IcosahedronGeometry(1.2, 0);
    const innerWireMaterial = new THREE.MeshBasicMaterial({
      color: 0xb87a4b,           // Warm Caramel Wireframe
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const innerMesh = new THREE.Mesh(innerWireGeometry, innerWireMaterial);
    masterGroup.add(innerMesh);

    // 4c. Gyroscopic Orbital Trajectory Rings
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x936046,           // Hazelnut Tan
      metalness: 0.6,
      roughness: 0.35,
      side: THREE.DoubleSide
    });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.03, 16, 100), ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    masterGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.025, 16, 100), ringMaterial);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 4;
    masterGroup.add(ring2);

    // 4d. Orbiting Satellite Tech Cubes (Representing Developer Modules/Code)
    const cubeGeo = new THREE.BoxGeometry(0.24, 0.24, 0.24);
    const cubeMat = new THREE.MeshStandardMaterial({
      color: 0x5c3827,
      roughness: 0.3,
      metalness: 0.5
    });

    const satellites = [];
    const satelliteCount = 5;
    for (let i = 0; i < satelliteCount; i++) {
      const sat = new THREE.Mesh(cubeGeo, cubeMat);
      const angle = (i / satelliteCount) * Math.PI * 2;
      const radius = 2.4;
      sat.position.set(Math.cos(angle) * radius, (Math.sin(i * 1.5) * 0.4), Math.sin(angle) * radius);
      masterGroup.add(sat);
      satellites.push({
        mesh: sat,
        angle: angle,
        speed: 0.008 + i * 0.003,
        radius: radius,
        yOffset: (i - 2) * 0.3
      });
    }

    // 4e. Ambient Floating Particles (Warm Cream & Amber Stardust)
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const warmPalette = [
      new THREE.Color(0xfaf7f2), // Warm Cream
      new THREE.Color(0xb87a4b), // Caramel
      new THREE.Color(0xd4a98f), // Latte foam
      new THREE.Color(0x744833)  // Warm coffee
    ];

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.6 + Math.random() * 3.2;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const col = warmPalette[Math.floor(Math.random() * warmPalette.length)];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.NormalBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    masterGroup.add(particles);

    // 5. Mouse Interaction & Inertial Damping
    const mouse = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0
    };

    const handleMouseMove = (event) => {
      if (!interactive) return;
      // Coordinates normalized between -1.0 and 1.0
      const rect = container.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;

      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Responsive Resize Handling
    const handleResize = () => {
      if (!container || !renderer) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 7. Animation Loop
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth lerp damping for mouse tracking
      mouse.currentX += (mouse.targetX - mouse.currentX) * 0.045;
      mouse.currentY += (mouse.targetY - mouse.currentY) * 0.045;

      // Master rotation composed of base drift + user mouse response
      masterGroup.rotation.y = elapsedTime * 0.22 + mouse.currentX * 0.65;
      masterGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1 - mouse.currentY * 0.45;
      masterGroup.rotation.z = mouse.currentX * 0.15;

      // Subtle vertical floating oscillation
      masterGroup.position.y = Math.sin(elapsedTime * 1.1) * 0.12;

      // Internal counter-rotations
      coreMesh.rotation.y += 0.005;
      coreMesh.rotation.x += 0.003;
      innerMesh.rotation.y -= 0.008;

      ring1.rotation.z += 0.006;
      ring2.rotation.y += 0.007;

      // Animate orbiting satellites
      satellites.forEach((sat) => {
        sat.angle += sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
        sat.mesh.position.y = sat.yOffset + Math.sin(elapsedTime * 2 + sat.angle) * 0.15;
        sat.mesh.rotation.x += 0.02;
        sat.mesh.rotation.y += 0.02;
      });

      // Shimmer particles
      particles.rotation.y -= 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      // Dispose Three.js resources
      coreGeometry.dispose();
      coreMaterial.dispose();
      innerWireGeometry.dispose();
      innerWireMaterial.dispose();
      cubeGeo.dispose();
      cubeMat.dispose();
      ringMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();

      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, [interactive]);

  if (webGLError) {
    return <Fallback3D />;
  }

  return (
    <div
      ref={mountRef}
      className={`devtrack-3d-container ${className} size-${size}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto'
      }}
      aria-label="Interactive 3D DevTrack geometric core"
    />
  );
};
