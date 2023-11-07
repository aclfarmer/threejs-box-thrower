import { useRef, useEffect, useState } from 'react';
import { useBox } from '@react-three/cannon';
import { useThree } from '@react-three/fiber';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { Vector3 } from 'three';

function Box({ setIsDragging, boxColor }) {
    //cannon.js
    ////when using Cannon, to prevent the box from phasing through the floor, you will need to make its POSITION HALF of its size and set the args in the [ref] array constanant with the size of the box.
    //if you want it to fall and hit the ground, you can set the position to anything higher than half its size.
      const meshRef = useRef();
      const [ref, api] = useBox(() => ({ mass: 1, position: [0, 8, 0], args: [16, 16, 16] }));
      const [color, setColor] = useState(boxColor);
    
      const { camera, gl: { domElement } } = useThree();
  
      //set camera to look diagonal at the box
      useEffect(() => {
        camera.position.set(70, 70, 70);
        camera.lookAt(0, 0, 0);
      }, [camera]);
  
      useEffect(() => {
        const controls = new DragControls([meshRef.current], camera, domElement);
        controls.transformGroup = true;
        
        let lastMousePosition = null;
        let mouseSpeed = new Vector3();
  
        controls.addEventListener('dragstart', (event) => {
          api.velocity.set(0, 0, 0); // stop any current movement
          api.angularVelocity.set(0, 0, 0); // stop any current rotation
          api.mass.set(0); // temporarily disable physics
          lastMousePosition = event.object.position.clone();
          setIsDragging(true);
        });  
  
        controls.addEventListener('drag', (event) => {
          if (lastMousePosition) {
                mouseSpeed.subVectors(event.object.position, lastMousePosition);
          }
          lastMousePosition = event.object.position.clone();
          api.position.set(event.object.position.x, event.object.position.y, event.object.position.z); // update the position of the box
        });
  
        const SCALE_FACTOR = 100; // adjust this value to increase the velocity speed of the box/item being launched
  
        controls.addEventListener('dragend', (event) => {
          api.mass.set(1); // re-enable physics
          setIsDragging(false);
          if (mouseSpeed) {
            api.velocity.set(...mouseSpeed.clone().multiplyScalar(SCALE_FACTOR).toArray());
          }
        });
        
        return () => controls.dispose();
      }, [camera, domElement, api]);
  
  
      return (
          <mesh 
          ref={mesh => {
            ref.current = mesh;
            meshRef.current = mesh;
          }}
            onClick={() => {
              //api.velocity.set(0, 2, 0);
              console.log('Box clicked at: ' + new Date().toLocaleString());
            }}
            onPointerOver={() => setColor('orange')}
            onPointerOut={() => setColor(boxColor)}
            visible 
            castShadow 
            receiveShadow 
            rotation={[Math.PI / 2, 0, 0]}
          >
              <boxGeometry  attach="geometry" args={[16, 16, 16]}/>
              <meshStandardMaterial attach="material" color={color} />
          </mesh>
      );
  }

  
export default Box;