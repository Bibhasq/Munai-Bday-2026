import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import ParticleCanvas from './components/ParticleCanvas'
import MusicPlayer from './components/MusicPlayer'
import Chapter1 from './components/Chapter1'
import Chapter2 from './components/Chapter2'
import Chapter3 from './components/Chapter3'
import Chapter4 from './components/Chapter4'
import Chapter5 from './components/Chapter5'
import FinalScene from './components/FinalScene'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [started, setStarted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 3200)
    return () => clearTimeout(timer)
  }, [])

  const handleStart = () => {
    setStarted(true)
    if (audioRef.current) {
      audioRef.current.play().catch(() => {})
    }
  }

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence>
        {!started && (
          <LoadingScreen
            loaded={loaded}
            onStart={handleStart}
          />
        )}
      </AnimatePresence>

      {started && (
        <>
          <ParticleCanvas />
          <audio ref={audioRef} src="./assets/song.mp3" loop preload="auto" />
          <MusicPlayer audioRef={audioRef} />
          
          <main>
            <Chapter1 />
            <Chapter2 />
            <Chapter3 />
            <Chapter4 />
            <Chapter5 />
            <FinalScene />
          </main>
        </>
      )}
    </>
  )
}
