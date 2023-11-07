import { usePlane } from '@react-three/cannon';
import { useTexture } from '@react-three/drei';

function Roof({ size }) {
    const groundTextureProps = useTexture({
        map: './texture/stone_albedo.jpg',
        displacementMap: './texture/stone_displacement.jpg',
        normalMap: './texture/stone_normals.jpg',
        roughnessMap: './texture/stone_roughness.jpg',
    });

    const [ref] = usePlane(() => ({ rotation: [Math.PI / 2, 0, 0], position: [0, 50, 0], args:[size, size]  }));

    return (
      <mesh ref={ref}>
        <planeGeometry attach="geometry" args={[size, size]} />
        <meshStandardMaterial {...groundTextureProps} attach="material" color="white" transparent />
      </mesh>
    );
  }

export default Roof;