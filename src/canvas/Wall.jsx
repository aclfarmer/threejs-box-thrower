import { usePlane } from '@react-three/cannon';
import { useTexture } from '@react-three/drei';

function Wall({ width, height, side }) {
  const groundTextureProps = useTexture({
    map: './texture/wood_albedo.jpg',
    displacementMap: './texture/wood_displacement.jpg',
    normalMap: './texture/wood_normals.jpg',
    roughnessMap: './texture/wood_roughness.jpg',
  });

  let position, rotation;
  switch (side) {
    case 'west':
      position = [-width / 2, height / 2, 0];
      rotation = [0, Math.PI / 2, 0];
      break;
    case 'east':
      position = [width / 2, height / 2, 0];
      rotation = [0, -Math.PI / 2, 0];
      break;
    case 'north':
      position = [0, height / 2, -width / 2]; 
      rotation = [0, 0, 0];
      break;
      case 'south':
        position = [0, height / 2, width / 2]; 
        rotation = [0, Math.PI, 0];
        break;
    default:
      position = [0, 0, 0];
      rotation = [0, 0, 0];
      break;
  }

  const [ref] = usePlane(() => ({ rotation, position, args: [width, height] }));

  return (
    <mesh ref={ref}>
      <planeGeometry attach="geometry" args={[width, height]} />
      <meshStandardMaterial {...groundTextureProps} attach="material" color="white" transparent />
    </mesh>
  );
}

export default Wall;