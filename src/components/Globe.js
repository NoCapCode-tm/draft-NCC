import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

/* =======================
   BASE GLOBE SHADER
======================= */

const vertexShader = `
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  vViewDir = normalize(-mvPos.xyz);
  gl_Position = projectionMatrix * mvPos;
}
`;

const fragmentShader = `
uniform vec3 ocean;
uniform vec3 glow;

varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  float view = dot(vNormal, vViewDir);

  // ===== BASE COLOR =====
  vec3 color = ocean;

  // ===== CENTER FOCUS (20% radius) =====
  // view ≈ 1.0 at center, 0.0 at edges
  float centerMask = smoothstep(0.75, 1.8, view);
  vec3 centerLift = ocean * 0.85 * centerMask;


  // ===== RIM GLOW (edges only) =====
  float rim = pow(1.0 - view, 4.0);
  vec3 rimGlow = glow * rim * 0.9;

  // ===== FINAL COLOR =====
  color += centerLift;
  color += rimGlow;

  gl_FragColor = vec4(color, 1.0);
}
`;



/* =======================
   BASE GLOBE (DARK + GLOW)
======================= */

function BaseGlobe() {
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.6, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          ocean: { value: new THREE.Color("#090616") }, // dark inside
          glow: { value: new THREE.Color("#5692ba") },  // rim glow
        }}
      />
    </mesh>
  );
}

/* =======================
   DOTS OVERLAY (LAND ONLY)
======================= */

function GlobeDots() {
  const ref = useRef();

  const dots = new THREE.TextureLoader().load("/earth-dots.png");
  dots.flipY = false;
  dots.minFilter = THREE.LinearFilter;
  dots.magFilter = THREE.LinearFilter;

  useFrame(() => {
    ref.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.62, 128, 128]} />
      <meshBasicMaterial
        color="#1961a0"
        alphaMap={dots}
        transparent
        opacity={0.95}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
    
  );
}


/* =======================
   SCENE COMPOSITION
======================= */

function GlobeScene() {
  return (
    <>
      <BaseGlobe />
      <GlobeDots />
    </>
  );
}

/* =======================
   EXPORT COMPONENT
======================= */

export default function Globe() {
  return (
    <div style={{ width: 600, height: 600 }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <GlobeScene />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.6}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  );
}
