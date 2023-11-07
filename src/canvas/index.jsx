import React, { useState } from 'react';
//init
import { Canvas } from '@react-three/fiber';
//OrbitControls is a component that allows us to control the camera with the mouse
//useTexture is a hook that allows us to load textures onto the box
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

//cannon controls the physics of the objects
import { Physics } from '@react-three/cannon';

//custom camera settings import
import Camera from './Camera';

//3D Items
import Box from './Box';
import Ground from './Ground';
import Wall from './Wall';
import Roof from './Roof';

const CanvasModel = () => {
  const [isDragging, setIsDragging] = useState(false);

  //customise the amount of boxes available by using a button to add more boxes in 
  const [boxes, setBoxes] = useState([0]); // initialize with one box
  const addBox = () => {
    if (boxes.length < 10) {
      setBoxes(prevBoxes => [...prevBoxes, prevBoxes.length]); // add a new box to the array
    }
  };

  const removeBox = () => {
    if (boxes.length > 0) {
      setBoxes(prevBoxes => prevBoxes.slice(0, -1)); // remove the last box from the array
    }
  };

  return (
    <>
      <div className='py-1 rounded-lg my-2' style={{backgroundColor:'#99bee9'}}>
        <button onClick={addBox}>Add Box</button> <button onClick={removeBox}>Remove Box</button> <p style={{}}>Box Count: {boxes.length}</p>
      </div>
      <Canvas shadows style={{height:'600px'}}>
          {/* lights can be ambient, directional, spotlight, horizonal */ }
        <pointLight position={[-30, 49, 30]} color="white" intensity={10000}  castShadow />

        {/* this is your camera, its set as the default */ }
        <Camera position={[70,70,70]}/> 
        <OrbitControls enabled={!isDragging} />
          <Physics>
            {boxes.map((box, index) => (
              <Box key={index} setIsDragging={setIsDragging} boxColor={'red'} /> // render a Box component for each item in the array
            ))}

            <Ground size={100}/>
            <Wall width={100} height={50} side={'west'}/>
            <Wall width={100} height={50} side={'east'}/>
            <Wall width={100} height={50} side={'north'}/>
            <Wall width={100} height={50} side={'south'}/>
            <Roof size={100}/>

          </Physics>
      </Canvas>
    </>
  );
}

export default CanvasModel