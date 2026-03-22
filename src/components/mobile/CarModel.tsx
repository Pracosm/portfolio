"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useRef, Suspense, useEffect, useMemo } from "react";
import { Box3, Vector3, DoubleSide } from "three";
import type { Group, Mesh, MeshStandardMaterial } from "three";

function Model({ src }: { src: string }) {
  const gltf = useLoader(GLTFLoader, src, (loader) => {
    const draco = new DRACOLoader();
    draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
    loader.setDRACOLoader(draco);
  });

  const groupRef = useRef<Group>(null);

  const { scene: clonedScene, scaleFactor } = useMemo(() => {
    const scene = gltf.scene.clone(true);
    scene.position.set(0, 0, 0);
    scene.scale.set(1, 1, 1);
    scene.rotation.set(0, 0, 0);
    // Fix see-through / clipping: make all materials double-sided
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        const mat = mesh.material as MeshStandardMaterial;
        if (mat) {
          mat.side = DoubleSide;
          mat.depthWrite = true;
          mat.transparent = false;
        }
      }
    });
    scene.updateMatrixWorld(true);
    const box = new Box3().setFromObject(scene);
    const center = new Vector3();
    const size = new Vector3();
    box.getCenter(center);
    box.getSize(size);
    scene.position.set(-center.x, -center.y, -center.z);
    const maxDim = Math.max(size.x, size.y, size.z);
    return { scene, scaleFactor: maxDim > 0 ? 1.3 / maxDim : 1 };
  }, [gltf.scene]);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = 0;
      // Scale on the outer group so it doesn't shift the center
      groupRef.current.scale.setScalar(scaleFactor);
    }
  }, [scaleFactor]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
}

export function CarModel({ src = "/fairlady-z.glb" }: { src?: string }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [2.5, 1.2, 2.5], fov: 45, near: 0.01, far: 100 }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-3, 2, -2]} intensity={0.5} />
        <Suspense fallback={null}>
          <Model src={src} />
        </Suspense>
      </Canvas>
    </div>
  );
}
