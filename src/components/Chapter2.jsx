import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const togetherPhotos = [9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]

const storyQuotes = [
  "Some memories were planned.",
  "Most of my favorites weren't.",
  "They simply happened with you.",
  "Every laugh. Every conversation. Every little moment.",
  "Became a memory worth keeping.",
  "As time passed, these moments became some of my favorites.",
  "Some people quietly become part of your most treasured memories.",
]

function StoryPhoto({ num, index, align = 'center' }) {
  const [ref, visible] = useScrollReveal(0.2)
  const isLeft = align === 'left'
  const isRight = align === 'right'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -60 : isRight ? 60 : 0, y: !isLeft && !isRight ? 40 : 0 }}
      animate={visible ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
      style={{
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <img
        src={`./assets/${num}.jpg`}
        alt={`Memory ${index + 1}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
        loading="lazy"
      />
      {/* Gold corner accent */}
      <div style={{
        position: 'absolute',
        top: 12,
        left: 12,
        width: 20,
        height: 20,
        borderTop: '1px solid rgba(201,169,110,0.5)',
        borderLeft: '1px solid rgba(201,169,110,0.5)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 12,
        right: 12,
        width: 20,
        height: 20,
        borderBottom: '1px solid rgba(201,169,110,0.5)',
        borderRight: '1px solid rgba(201,169,110,0.5)',
      }} />
    </motion.div>
  )
}

function StoryQuote({ text, delay = 0 }) {
  const [ref, visible] = useScrollReveal(0.4)

  return (
    <motion.p
      ref={ref}
      className="font-display"
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay }}
      style={{
        fontSize: 'clamp(1.4rem, 4vw, 2.8rem)',
        fontWeight: 300,
        fontStyle: 'italic',
        color: '#f5efe6',
        lineHeight: 1.35,
        textAlign: 'center',
        padding: '0 16px',
      }}
    >
      {text}
    </motion.p>
  )
}

function FloatingHeart({ style }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        fontSize: 16,
        pointerEvents: 'none',
        ...style,
      }}
      animate={{
        y: [0, -80, -160],
        opacity: [0.6, 0.4, 0],
        rotate: [-10, 10, -5],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: style.animDelay || 0,
        ease: 'easeOut',
      }}
    >
      ♥
    </motion.div>
  )
}

export default function Chapter2() {
  const [headerRef, headerVisible] = useScrollReveal(0.3)

  return (
    <section id="chapter-2" style={{ paddingBottom: 80 }}>
      {/* Chapter header */}
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div className="ambient-glow" style={{
          width: 600,
          height: 600,
          background: 'radial-gradient(circle, rgba(232,180,184,0.05) 0%, transparent 70%)',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }} />

        {/* Floating hearts */}
        <FloatingHeart style={{ left: '15%', bottom: '20%', color: 'rgba(201,169,110,0.3)', animDelay: 0 }} />
        <FloatingHeart style={{ right: '15%', bottom: '30%', color: 'rgba(232,180,184,0.3)', animDelay: 1.5 }} />
        <FloatingHeart style={{ left: '40%', bottom: '10%', color: 'rgba(201,169,110,0.2)', animDelay: 0.8 }} />

        <motion.div ref={headerRef}>
          <motion.p
            className="chapter-label"
            initial={{ opacity: 0, y: -20 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            style={{ textAlign: 'center', marginBottom: 24 }}
          >
            Chapter Two
          </motion.p>
          <motion.h2
            className="font-display"
            initial={{ opacity: 0, y: 40 }}
            animate={headerVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontSize: 'clamp(3rem, 10vw, 7rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#f5efe6',
              textAlign: 'center',
              lineHeight: 1,
              marginBottom: 16,
            }}
          >
            Our Story
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={headerVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.6 }}
            style={{
              height: 1,
              background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)',
              maxWidth: 200,
              margin: '0 auto',
            }}
          />
        </motion.div>
      </div>

      {/* First quotes */}
      <div style={{ padding: '40px 24px 60px', display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center' }}>
        <StoryQuote text={storyQuotes[0]} />
        <StoryQuote text={storyQuotes[1]} delay={0.1} />
        <StoryQuote text={storyQuotes[2]} delay={0.2} />
      </div>

      {/* Photo layout - cinematic grid */}
      <div style={{ padding: '0 16px', display: 'grid', gap: 8 }}>
        {/* Row 1: Full width */}
        <div style={{ height: '60vw', maxHeight: 400 }}>
          <StoryPhoto num={9} index={0} />
        </div>

        {/* Row 2: Two cols */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, height: '40vw', maxHeight: 280 }}>
          <StoryPhoto num={10} index={1} align="left" />
          <StoryPhoto num={11} index={2} align="right" />
        </div>
      </div>

      {/* Middle quote */}
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <StoryQuote text={storyQuotes[3]} />
      </div>

      {/* More photos */}
      <div style={{ padding: '0 16px', display: 'grid', gap: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8, height: '55vw', maxHeight: 380 }}>
          <StoryPhoto num={12} index={3} align="left" />
          <div style={{ display: 'grid', gap: 8 }}>
            <StoryPhoto num={13} index={4} align="right" />
            <StoryPhoto num={14} index={5} align="right" />
          </div>
        </div>
      </div>

      {/* Quote */}
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <StoryQuote text={storyQuotes[4]} />
      </div>

      {/* Photo strip */}
      <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, height: '45vw', maxHeight: 300 }}>
        {[16, 17, 18].map((num, i) => (
          <StoryPhoto key={num} num={num} index={i + 6} align={i === 0 ? 'left' : i === 2 ? 'right' : 'center'} />
        ))}
      </div>

      {/* Quote */}
      <div style={{ padding: '80px 24px', textAlign: 'center' }}>
        <StoryQuote text={storyQuotes[5]} />
      </div>

      {/* Feature photo */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ height: '75vw', maxHeight: 500, borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
          <StoryPhoto num={19} index={9} />
        </div>
      </div>

      {/* More photos grid */}
      <div style={{ padding: '8px 16px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }}>
        {[20, 21, 22, 23].map((num, i) => (
          <div key={num} style={{ height: '45vw', maxHeight: 280, borderRadius: 8, overflow: 'hidden' }}>
            <StoryPhoto num={num} index={i + 10} align={i % 2 === 0 ? 'left' : 'right'} />
          </div>
        ))}
      </div>

      {/* Final chapter 2 quote */}
      <div style={{ padding: '80px 24px 40px', textAlign: 'center' }}>
        <StoryQuote text={storyQuotes[6]} />
      </div>
    </section>
  )
}
