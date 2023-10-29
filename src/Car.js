import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
export function Car(){
    const gltf=useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL+ "models/car/scene.gltf"
    );

    useEffect(()=>{
        gltf.scene.scale.set(0.005,0.005,0.005);
        gltf.scene.position.set(0,-0.035,0);
        //what evere the material our texture or color is given to object we have to use it
        gltf.scene.traverse((object)=>{
            if(object instanceof Mesh){
                object.castShadow = true;
                object.receiveShadow=true;
                object.material.envMapIntensity=20;
            }
        })
    },[gltf]);

    useFrame((state, delta) => {
        let t = state.clock.getElapsedTime();
    
        let group = gltf.scene.children[0].children[0].children[0];
        group.children[0].rotation.x = t * 2;
        group.children[2].rotation.x = t * 2;
        group.children[4].rotation.x = t * 2;
        group.children[6].rotation.x = t * 2;
      });

    return (
        <primitive object={gltf.scene} />
    )
}