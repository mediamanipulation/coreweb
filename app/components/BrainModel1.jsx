"use client";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function BrainModel1(){
  const group = useRef();
  let gltf;
  try { gltf = useGLTF("/brain.glb"); }
  catch { gltf = null; }

  useEffect(()=>{
    if(!group.current) return;
    group.current.traverse((obj)=>{
      if(obj.isMesh){
        obj.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#7f8bff"),
          metalness: 0.2,
          roughness: 0.35,
          emissive: new THREE.Color("#4a5bff"),
          emissiveIntensity: 0.35
        });
      }
    });
  }, [gltf]);

  if(!gltf) return null;
  return (
    <group ref={group} scale={1.15} position={[0,-0.1,0]}>
      <primitive object={gltf.scene} />
      <primitive
        object={gltf.scene.clone()}
        onUpdate={(self)=>{
          self.traverse((obj)=>{
            if(obj.isMesh){
              obj.material = new THREE.MeshBasicMaterial({
                color:"#b7c0ff", wireframe:true, transparent:true, opacity:0.12
              });
            }
          });
        }}
      />
    </group>
  );
}
