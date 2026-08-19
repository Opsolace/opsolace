"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";

const satellites = [[-1.75, 0.55, 0.15], [1.7, -0.55, -0.15], [0.55, 1.65, -0.25], [-0.65, -1.6, 0.2], [1.15, 1.15, 0.35], [-1.25, -0.9, -0.4]] as const;
const particles = [[-2.3, 1.8, -0.5], [2.2, 1.4, -0.7], [2.25, -1.5, 0.4], [-2.1, -1.7, 0.2], [0.2, 2.25, -0.6], [0.1, -2.2, -0.5], [2.5, 0.2, -0.8], [-2.5, 0.1, -0.5]] as const;

function SystemSculpture() {
  const orbitGroup = useRef<Group>(null);
  const core = useRef<Mesh>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(mediaQuery.matches);
    updateMotion();
    mediaQuery.addEventListener("change", updateMotion);
    return () => mediaQuery.removeEventListener("change", updateMotion);
  }, []);

  useFrame((state, delta) => {
    if (!reducedMotion && orbitGroup.current) {
      orbitGroup.current.rotation.y += delta * 0.14;
      orbitGroup.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.22) * 0.06;
    }
    if (core.current && !reducedMotion) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.3) * 0.045;
      core.current.scale.setScalar(pulse);
    }
  });

  return <group ref={orbitGroup} rotation={[0.22, -0.35, -0.15]}>{[0, 1, 2].map((index) => <mesh key={index} rotation={[index * 0.65, index * 0.45, index * 0.35]}><torusGeometry args={[1.95 + index * 0.16, 0.008, 8, 96]} /><meshBasicMaterial color={index === 1 ? "#23a875" : "#1f2949"} transparent opacity={index === 1 ? 0.65 : 0.18} /></mesh>)}{satellites.map(([x, y, z], index) => <group key={`${x}-${y}`} position={[x, y, z]}><mesh><sphereGeometry args={[index % 2 === 0 ? 0.11 : 0.075, 16, 16]} /><meshStandardMaterial color={index % 2 === 0 ? "#1f2949" : "#23a875"} emissive={index % 2 === 0 ? "#1f2949" : "#23a875"} emissiveIntensity={0.35} roughness={0.35} /></mesh><mesh scale={1.8}><sphereGeometry args={[index % 2 === 0 ? 0.11 : 0.075, 12, 12]} /><meshBasicMaterial color="#23a875" transparent opacity={0.09} /></mesh></group>)}{satellites.map(([x, y, z], index) => <line key={`link-${index}`}><bufferGeometry attach="geometry" setFromPoints={[new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)]} /><lineBasicMaterial attach="material" color="#23a875" transparent opacity={0.28} /></line>)}<mesh ref={core} position={[0, 0, 0]}><icosahedronGeometry args={[0.42, 1]} /><meshStandardMaterial color="#23a875" emissive="#23a875" emissiveIntensity={0.6} metalness={0.15} roughness={0.25} /></mesh><mesh rotation={[0.4, 0.2, 0.1]}><icosahedronGeometry args={[0.58, 1]} /><meshBasicMaterial color="#23a875" wireframe transparent opacity={0.5} /></mesh>{particles.map(([x, y, z]) => <mesh key={`${x}-${y}-${z}`} position={[x, y, z]}><sphereGeometry args={[0.025, 8, 8]} /><meshBasicMaterial color="#23a875" transparent opacity={0.65} /></mesh>)}</group>;
}

export function HeroScene() {
  return <div className="pointer-events-none absolute inset-0" aria-hidden="true"><Canvas camera={{ position: [0, 0, 6.5], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}><ambientLight intensity={1.5} /><pointLight position={[2, 3, 4]} intensity={6} color="#dff4e9" /><pointLight position={[-3, -2, 2]} intensity={2} color="#23a875" /><SystemSculpture /></Canvas></div>;
}