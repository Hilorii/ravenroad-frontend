import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const MotorModel = () => {
    const { scene } = useGLTF('/motor.glb'); // Załaduj model motoru
    const pointsRef = useRef();

    // Przekształć geometrię modelu w cząsteczki
    useEffect(() => {
        const vertices = [];
        scene.traverse((child) => {
            if (child.isMesh) {
                const positions = child.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    vertices.push(positions[i], positions[i + 1], positions[i + 2]);
                }
            }
        });

        const particles = new THREE.BufferGeometry();
        particles.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices), 3));
        pointsRef.current.geometry = particles;
    }, [scene]);

    useFrame(() => {
        if (pointsRef.current) {
            pointsRef.current.rotation.z += 0.005; // Obrót wokół osi Z
        }
    });

    return (
        <points ref={pointsRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <PointMaterial color="white" size={0.05} transparent />
        </points>
    );
};

const Motor = () => {
    return (
        <div style={{ width: '60vw', height: '30vw', margin: '0 auto' }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 30 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={0.5} />
                <MotorModel />
            </Canvas>
        </div>
    );
};

export default Motor;