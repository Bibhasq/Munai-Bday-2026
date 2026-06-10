import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicPlayer({ audioRef }) {
  const [playing, setPlaying] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }

    audio.addEventListener('timeupdate', updateProgress)
    return () => audio.removeEventListener('timeupdate', updateProgress)
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
    } else {
      audio.play()
    }
    setPlaying(!playing)
  }

  const seek = (e) => {
    const audio = audioRef.current
    if (!audio) return
    const rect = e.currentTarget.getBoundingClientRect()
    const pct = (e.clientX - rect.left) / rect.width
    audio.currentTime = pct * audio.duration
  }

  return (
    <div className="music-player">
      <motion.div
        className="glass"
        style={{
          borderRadius: 50,
          padding: expanded ? '14px 20px' : '12px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          minWidth: expanded ? 220 : 'auto',
          transition: 'min-width 0.4s ease',
        }}
        layout
      >
        {/* Bars animation */}
        <motion.div
          onClick={toggle}
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 3,
            height: 20,
            cursor: 'none',
            flexShrink: 0,
          }}
          onHoverStart={() => setExpanded(true)}
          onHoverEnd={() => setExpanded(false)}
        >
          {[0.6, 1, 0.7, 0.9, 0.5].map((h, i) => (
            <motion.div
              key={i}
              style={{
                width: 3,
                background: '#c9a96e',
                borderRadius: 2,
                originY: 1,
              }}
              animate={playing ? {
                scaleY: [h, h * 0.3, h * 1.2, h * 0.5, h],
              } : { scaleY: 0.2 }}
              transition={{
                duration: 0.8 + i * 0.1,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.08,
              }}
              initial={{ height: 20 }}
            />
          ))}
        </motion.div>

        {/* Song info + progress */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              <p style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 300,
                color: '#c9a96e',
                letterSpacing: '0.1em',
                marginBottom: 6,
              }}>
                Qayde Se • Papon
              </p>
              {/* Progress bar */}
              <div
                onClick={seek}
                style={{
                  width: 140,
                  height: 2,
                  background: 'rgba(201,169,110,0.2)',
                  borderRadius: 2,
                  cursor: 'none',
                  position: 'relative',
                }}
              >
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: '#c9a96e',
                  borderRadius: 2,
                  transition: 'width 0.3s linear',
                }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play/pause */}
        <motion.button
          onClick={toggle}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(245,239,230,0.6)',
            cursor: 'none',
            fontSize: 14,
            lineHeight: 1,
            padding: 0,
            flexShrink: 0,
          }}
          whileHover={{ color: '#f5efe6', scale: 1.2 }}
        >
          {playing ? '⏸' : '▶'}
        </motion.button>
      </motion.div>
    </div>
  )
}
