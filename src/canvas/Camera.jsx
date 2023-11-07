import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei'

const Camera = ({position}) => { 
  const { camera } = useThree();
  const ref = useRef();

  useEffect(() => {
    camera.position.set(...position); // Set the camera position
  }, [camera]);

  return ( 
    <PerspectiveCamera ref={ref} fov={50} aspect={window.innerWidth / window.innerHeight} near={0.1} far={500} position={[position]} />
  )
};

export default Camera;