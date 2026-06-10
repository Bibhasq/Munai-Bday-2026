import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

function VideoCard({ src, num, label }) {
  const videoRef = useRef(null)
  const [cardRef, cardVisible] = useScrollReveal(0.3)
  const [fullscreen, setFullscreen] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (cardVisible) {
      video.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      video.pause()
      setPlaying(false)
    }
  }, [cardVisible])

  const handleFullscreen = () => {
    const video = videoRef.current
    if (!video) return
    if (video.requestFullscreen) video.requestFullscreen()
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen()
  }

  return (
    <motion.div
      ref={cardRef}
      className="glass video-card"
      initial={{ opacity: 0, y: 60 }}
      animate={cardVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1] }}
      style={{
        position: 'relative',
        boxShadow: cardVisible ? '0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(201,169,110,0.05)' : 'none',
        transition: 'box-shadow 0.8s ease',
      }}
    >
      {/* Gold frame accents */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner => {
        const [v, h] = corner.split('-')
        return (
          <div
            key={corner}
            style={{
              position: 'absolute',
              [v]: 16,
              [h]: 16,
              width: 24,
              height: 24,
              borderTop: v === 'top' ? '1px solid rgba(201,169,110,0.5)' : 'none',
              borderBottom: v === 'bottom' ? '1px solid rgba(201,169,110,0.5)' : 'none',
              borderLeft: h === 'left' ? '1px solid rgba(201,169,110,0.5)' : 'none',
              borderRight: h === 'right' ? '1px solid rgba(201,169,110,0.5)' : 'none',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />
        )
      })}

      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        style={{
          width: '100%',
          display: 'block',
          borderRadius: 14,
        }}
      />

      {/* Overlay controls */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '40px 20px 20px',
        background: 'linear-gradient(to top, rgba(10,6,8,0.7), transparent)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderRadius: '0 0 14px 14px',
      }}>
        <div>
          <p className="chapter-label" style={{ marginBottom: 4 }}>Special Memory</p>
          <p
            className="font-display"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.2rem',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#f5efe6',
            }}
          >
            {label}
          </p>
        </div>
        <motion.button
          onClick={handleFullscreen}
          style={{
            background: 'rgba(201,169,110,0.15)',
            border: '1px solid rgba(201,169,110,0.3)',
            borderRadius: 6,
            color: '#c9a96e',
            padding: '8px 16px',
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.65rem',
            letterSpacing: '0.2em',
            cursor: 'none',
          }}
          whileHover={{
            background: 'rgba(201,169,110,0.25)',
            borderColor: 'rgba(201,169,110,0.6)',
          }}
        >
          FULLSCREEN
        </motion.button>
      </div>
    </motion.div>
  )
}

export default function Chapter4() {
  const [headerRef, headerVisible] = useScrollReveal(0.3)

  return (
    <section id="chapter-4" style={{ padding: '80px 0', background: 'var(--deep)' }}>
      {/* Header */}
      <motion.div
        ref={headerRef}
        style={{ textAlign: 'center', padding: '0 24px 60px' }}
      >
        <motion.p
          className="chapter-label"
          initial={{ opacity: 0 }}
          animate={headerVisible ? { opacity: 1 } : {}}
          style={{ marginBottom: 20 }}
        >
          Chapter Four
        </motion.p>
        <motion.h2
          className="font-display"
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#f5efe6',
            marginBottom: 16,
          }}
        >
          Special Memories
        </motion.h2>
        <motion.p
          className="font-display"
          initial={{ opacity: 0 }}
          animate={headerVisible ? { opacity: 0.5 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            fontStyle: 'italic',
            fontSize: '1.1rem',
            color: '#c9a96e',
          }}
        >
          moments worth reliving
        </motion.p>
      </motion.div>

      {/* Videos */}
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <VideoCard
          src="./assets/33.mp4"
          num={33}
          label="Memory One"
        />
        <VideoCard
          src="./assets/34.mp4"
          num={34}
          label="Memory Two"
        />
      </div>

      {/* Bottom spacing */}
      <div style={{ height: 60 }} />
    </section>
  )
}
