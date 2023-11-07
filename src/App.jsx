import { useEffect } from 'react'
import './App.css'
import Canvas from './canvas';

import Home from './pages/Home';

function App() {
  //app uses three @react-three/fiber @react-three/drei @react-three/cannon (for 3d)
  //maath (for math)
  //valtio (for state management) 
  //framer-motion (for animations) 
  //tailwindcss postcss autoprefixer (for styling)
  return (
    <div className='md:container md:mx-auto rounded-lg p-8' style={{width:'1000px', height:'790px', backgroundColor:'#fff' }}>
        <header className="App-header">
          <div className="text-3xl font-bold underline" >React-Three Cannon and Fiber Physics Thrower</div>
        </header>
      <div >
        <Home />
        <Canvas />
      </div>
    </div>
  )
}

export default App
