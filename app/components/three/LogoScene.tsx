"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import logoImg from "@/app/img/logo.png";

const ORANGE = "#f47920";
const BLUE = "#1b4fd1";
const INK = "#14141a";

/** Logo aspect ratio (1687 x 600). */
const LOGO_W = 2.9;
const LOGO_H = (LOGO_W * 600) / 1687;

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

/** White glossy card with the real logo printed on its face. */
function LogoCard() {
  const logoTex = useMemo(() => {
    const tex = new THREE.TextureLoader().load(logoImg.src);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  const cardGeo = useMemo(
    () =>
      new THREE.ExtrudeGeometry(roundedRect(3.5, 1.95, 0.24), {
        depth: 0.1,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 8,
        curveSegments: 32,
      }),
    [],
  );

  return (
    <group>
      <mesh geometry={cardGeo}>
        <meshPhysicalMaterial color="#ffffff" roughness={0.4} clearcoat={1} clearcoatRoughness={0.15} />
      </mesh>
      <mesh position={[0, 0, 0.175]}>
        <planeGeometry args={[LOGO_W, LOGO_H]} />
        <meshStandardMaterial map={logoTex} transparent roughness={0.6} />
      </mesh>
    </group>
  );
}

const SHAPES = [
  { pos: [-2.1, 1.25, 0.5], color: ORANGE, geo: "octa", size: 0.26 },
  { pos: [2.2, 1.0, -0.2], color: BLUE, geo: "ico", size: 0.2 },
  { pos: [2.0, -1.25, 0.6], color: INK, geo: "box", size: 0.22 },
  { pos: [-2.0, -1.1, -0.3], color: BLUE, geo: "octa", size: 0.16 },
  { pos: [0.3, -1.75, 0.9], color: ORANGE, geo: "ico", size: 0.14 },
] as const;

function Shape({ pos, color, geo, size, phase }: (typeof SHAPES)[number] & { phase: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.4;
    ref.current.rotation.y += delta * 0.55;
    ref.current.position.y = pos[1] + Math.sin(state.clock.elapsedTime * 0.9 + phase) * 0.12;
  });

  const geometry =
    geo === "octa" ? (
      <octahedronGeometry args={[size, 0]} />
    ) : geo === "ico" ? (
      <icosahedronGeometry args={[size, 0]} />
    ) : (
      <boxGeometry args={[size * 1.4, size * 1.4, size * 1.4]} />
    );

  return (
    <mesh ref={ref} position={[pos[0], pos[1], pos[2]]}>
      {geometry}
      <meshStandardMaterial color={color} metalness={0.45} roughness={0.28} />
    </mesh>
  );
}

function Scene() {
  const root = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const reduceMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useFrame((state, delta) => {
    const motion = reduceMotion ? 0 : 1;
    if (root.current) {
      // Ease the whole logo card toward the pointer for a subtle 3D tilt.
      root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, state.pointer.x * 0.3, 0.06);
      root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -state.pointer.y * 0.2, 0.06);
      root.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.06 * motion;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.18 * motion;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.12 * motion;
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <pointLight position={[-3, -2, 3]} color={ORANGE} intensity={18} distance={10} />
      <pointLight position={[3, -2, 3]} color={BLUE} intensity={18} distance={10} />

      <group ref={root}>
        <LogoCard />
      </group>

      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0.2, 0]}>
        <torusGeometry args={[2.7, 0.025, 16, 220]} />
        <meshStandardMaterial color={ORANGE} metalness={0.6} roughness={0.25} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 3.2, -0.4, 0.3]}>
        <torusGeometry args={[3.1, 0.018, 16, 220]} />
        <meshStandardMaterial color={BLUE} metalness={0.6} roughness={0.25} />
      </mesh>

      {SHAPES.map((s, i) => (
        <Shape key={i} {...s} phase={i * 1.3} />
      ))}
    </>
  );
}

/** Three.js hero scene: the Genix logo on a 3D card, orbited by brand-colour rings and floating solids. */
export default function LogoScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7.5], fov: 38 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
