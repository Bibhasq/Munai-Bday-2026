import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const emotionalPhotos = [24, 25, 26, 27, 28, 29, 30, 31, 32]

const lines = [
  { text: "Life keeps changing.", delay: 0 },
  { text: "People grow.", delay: 0.15 },
  { text: "Paths change.", delay: 0.3 },
  { text: "But some people always remain special.", delay: 0.45, gold: true },
  { text: "Thank you for being one of the most\nbeautiful chapters of my life.", delay: 0.6 },
  { text: "No matter where life takes us,\nI'll always wish the very best for you.", delay: 0.75, gold: true },
]

function EmotionalLine({ text, delay, gold }) {
  const [ref, visible] = useScrollReveal(0.4)

  return (
    <motion.p
      ref={ref}
      className="font-display"
      initial={{ opacity: 0, y: 40 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.4, ease: [0.23, 1, 0.32, 1], delay }}
      style={{
        fontSize: 'clamp(1.5rem, 5vw, 3rem)',
        fontWeight: 300,
        fontStyle: 'italic',
        color: gold ? '#c9a96e' : 'rgba(245,239,230,0.85)',
        lineHeight: 1.4,
        textAlign: 'center',
        padding: '0 20px',
        whiteSpace: 'pre-line',
      }}
    >
      {text}
    </motion.p>
  )
}

function DarkPhoto({ num, index }) {
  const [ref, visible] = useScrollReveal(0.15)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={visible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
      style={{
        position: 'relative',
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <img
        src={`./assets/${num}.jpg`}
        alt={`Memory ${index}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.75) saturate(0.8)',
        }}
        loading="lazy"
      />
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,6,8,0.2), rgba(10,6,8,0.5))',
      }} />
    </motion.div>
  )
}

export default function Chapter3() {
  const [headerRef, headerVisible] = useScrollReveal(0.3)

  return (
    <section id="chapter-3" style={{ background: 'var(--warm-dark)' }}>
      {/* Header */}
      <div style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Very subtle background */}
        <div className="ambient-glow" style={{
          width: 500,
          height: 500,
          background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 70%)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }} />

        <motion.div ref={headerRef} style={{ textAlign: 'center' }}>
          <motion.p
            className="chapter-label"
            initial={{ opacity: 0 }}
            animate={headerVisible ? { opacity: 0.6 } : {}}
            transition={{ duration: 1 }}
            style={{ marginBottom: 32 }}
          >
            Chapter Three
          </motion.p>

          {/* Decorative lines */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2 }}
            style={{
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)',
              maxWidth: 120,
              margin: '0 auto 24px',
            }}
          />

          <motion.h2
            className="font-display"
            initial={{ opacity: 0, y: 40 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontSize: 'clamp(2rem, 8vw, 5.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#f5efe6',
              letterSpacing: '0.03em',
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            Always Special
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.5 }}
            style={{
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)',
              maxWidth: 120,
              margin: '0 auto',
            }}
          />
        </motion.div>
      </div>

      {/* First photo - full width */}
      <div style={{ height: '80vw', maxHeight: 550, margin: '0 16px', borderRadius: 8, overflow: 'hidden' }}>
        <DarkPhoto num={24} index={1} />
      </div>

      {/* Lines 1-3 */}
      <div style={{
        padding: '80px 24px 60px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        alignItems: 'center',
      }}>
        {lines.slice(0, 3).map((line, i) => (
          <EmotionalLine key={i} {...line} />
        ))}
      </div>

      {/* Two photos side by side */}
      <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, height: '50vw', maxHeight: 350 }}>
        <DarkPhoto num={25} index={2} />
        <DarkPhoto num={26} index={3} />
      </div>

      {/* Line 4 */}
      <div style={{ padding: '80px 24px 60px', textAlign: 'center' }}>
        <EmotionalLine {...lines[3]} />
      </div>

      {/* Feature photo */}
      <div style={{ height: '90vw', maxHeight: 600, margin: '0 16px', borderRadius: 8, overflow: 'hidden' }}>
        <DarkPhoto num={27} index={4} />
      </div>

      {/* Lines 5-6 */}
      <div style={{
        padding: '80px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 48,
        alignItems: 'center',
      }}>
        {lines.slice(4).map((line, i) => (
          <EmotionalLine key={i} {...line} />
        ))}
      </div>

      {/* Photo strip - remaining */}
      <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, height: '40vw', maxHeight: 260 }}>
        {[28, 29, 30].map((num, i) => (
          <DarkPhoto key={num} num={num} index={i + 5} />
        ))}
      </div>

      <div style={{ padding: '8px 16px 0', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 8, height: '45vw', maxHeight: 300 }}>
        <DarkPhoto num={31} index={8} />
        <DarkPhoto num={32} index={9} />
      </div>

      {/* Closing spacer */}
      <div style={{ height: 80 }} />
    </section>
  )
}
