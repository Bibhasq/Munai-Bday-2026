import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LoadingScreen({ loaded, onStart }) {
  const [showStart, setShowStart] = useState(false)

  useEffect(() => {
    if (loaded) {
      setTimeout(() => setShowStart(true), 600)
    }
  }, [loaded])

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {/* Ambient glow */}
      <div
        className="ambient-glow"
        style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <motion.div
        className="text-center"
        style={{ position: 'relative', zIndex: 2 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {/* Pre-loading state */}
        <AnimatePresence mode="wait">
          {!loaded ? (
            <motion.div
              key="loading"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p
                className="chapter-label mb-6"
                style={{ letterSpacing: '0.5em' }}
              >
                preparing something special
              </motion.p>

              {/* Elegant loader line */}
              <div style={{
                width: 200,
                height: 1,
                background: 'rgba(201,169,110,0.2)',
                margin: '0 auto',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, bottom: 0,
                    background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)',
                    width: '60%',
                  }}
                  animate={{ x: ['-60%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ready"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Heart */}
              <motion.div
                style={{ fontSize: 48, marginBottom: 24 }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                ❤️
              </motion.div>

              <h1
                className="font-display"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 300,
                  color: '#f5efe6',
                  lineHeight: 1.1,
                  marginBottom: 8,
                  letterSpacing: '0.02em',
                }}
              >
                Happy Birthday
              </h1>
              <h1
                className="font-display"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 6.5rem)',
                  fontWeight: 500,
                  background: 'linear-gradient(135deg, #c9a96e, #e8b4b8, #c9a96e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1.1,
                  marginBottom: 48,
                  letterSpacing: '0.02em',
                }}
              >
                Munai
              </h1>

              <AnimatePresence>
                {showStart && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    onClick={onStart}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(201,169,110,0.5)',
                      color: '#c9a96e',
                      padding: '14px 48px',
                      fontFamily: 'Jost, sans-serif',
                      fontWeight: 300,
                      fontSize: '0.8rem',
                      letterSpacing: '0.35em',
                      textTransform: 'uppercase',
                      cursor: 'none',
                      transition: 'all 0.4s ease',
                      borderRadius: 2,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    whileHover={{
                      borderColor: 'rgba(201,169,110,0.9)',
                      backgroundColor: 'rgba(201,169,110,0.05)',
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Begin the Story
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.5, duration: 1 }}
                style={{
                  marginTop: 20,
                  fontFamily: 'Jost, sans-serif',
                  fontWeight: 200,
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: '#c9a96e',
                }}
              >
                turn on sound for the best experience
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
