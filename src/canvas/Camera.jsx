import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei'

const Camera = () => {
  const ref = useRef();
  const { gl } = useThree();

  useEffect(() => {
    if (ref.current) {
      gl.camera = ref.current; // manually set the camera
    }
  }, []);

  return <PerspectiveCamera ref={ref} fov={50} aspect={window.innerWidth / window.innerHeight} near={0.1} far={500} position={[10, 20, 70]} />;
};

export default Camera;