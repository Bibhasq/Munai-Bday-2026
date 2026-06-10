import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const letterParagraphs = [
  "You're working really hard and doing your best.",
  "Keep it up, Munai.",
  "I know you'll achieve all the dreams and goals you're striving for.",
  "I may not be the most romantic guy you're looking for in life, but I want you to know that I truly admire you.",
  "I admire your strength.",
  "I admire your dedication.",
  "I admire the way you keep moving forward no matter what.",
  "I'll always be cheering for you and wishing for your happiness, success and everything beautiful life has to offer.",
  "No matter where life takes us, I'll always wish the very best for you.",
  "Keep shining.",
  "Keep smiling.",
  "Keep becoming the person you're meant to be.",
]

function LetterLine({ text, index }) {
  const [ref, visible] = useScrollReveal(0.5)
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (visible && !started) {
      setStarted(true)
      let i = 0
      const delay = index * 80
      setTimeout(() => {
        const interval = setInterval(() => {
          i++
          setDisplayed(text.slice(0, i))
          if (i >= text.length) clearInterval(interval)
        }, 22)
        return () => clearInterval(interval)
      }, delay)
    }
  }, [visible, started, text, index])

  const isShort = text.length < 20
  const isSignature = text.includes("Keep shining") || text.includes("Keep smiling") || text.includes("Keep becoming")

  return (
    <motion.p
      ref={ref}
      className="font-handwritten"
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : {}}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      style={{
        fontSize: isShort ? 'clamp(1.3rem, 4vw, 2rem)' : 'clamp(1rem, 3.5vw, 1.5rem)',
        fontWeight: isSignature ? 600 : 400,
        color: isSignature ? '#c9a96e' : 'rgba(245,239,230,0.85)',
        lineHeight: 1.7,
        minHeight: '1.7em',
        textAlign: isShort || isSignature ? 'center' : 'left',
        marginBottom: isShort || isSignature ? 0 : '0.5em',
      }}
    >
      {displayed}
      {/* Cursor blink */}
      {displayed.length < text.length && visible && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ borderRight: '2px solid #c9a96e', marginLeft: 2 }}
        />
      )}
    </motion.p>
  )
}

export default function Chapter5() {
  const [headerRef, headerVisible] = useScrollReveal(0.3)

  return (
    <section id="chapter-5" style={{
      background: 'linear-gradient(to bottom, var(--deep), var(--warm-dark), var(--deep))',
      padding: '80px 0',
    }}>
      {/* Chapter header */}
      <div ref={headerRef} style={{ textAlign: 'center', padding: '0 24px 60px' }}>
        <motion.p
          className="chapter-label"
          initial={{ opacity: 0 }}
          animate={headerVisible ? { opacity: 1 } : {}}
        >
          Chapter Five
        </motion.p>
        <motion.h2
          className="font-display"
          initial={{ opacity: 0, y: 30 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#f5efe6',
            marginTop: 16,
          }}
        >
          A Letter
        </motion.h2>
      </div>

      {/* Letter paper */}
      <div style={{ padding: '0 20px', maxWidth: 640, margin: '0 auto' }}>
        <motion.div
          className="glass"
          style={{
            borderRadius: 16,
            padding: 'clamp(28px, 8vw, 56px)',
            position: 'relative',
            boxShadow: '0 40px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(201,169,110,0.1)',
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          {/* Decorative top */}
          <div style={{
            textAlign: 'center',
            marginBottom: 40,
            paddingBottom: 32,
            borderBottom: '1px solid rgba(201,169,110,0.15)',
          }}>
            <p
              className="font-handwritten"
              style={{
                fontSize: '1.1rem',
                color: 'rgba(201,169,110,0.6)',
                letterSpacing: '0.1em',
              }}
            >
              Dear Munai,
            </p>
          </div>

          {/* Letter lines */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {letterParagraphs.map((para, i) => (
              <LetterLine key={i} text={para} index={i} />
            ))}
          </div>

          {/* Signature */}
          <div style={{
            marginTop: 48,
            paddingTop: 32,
            borderTop: '1px solid rgba(201,169,110,0.15)',
            textAlign: 'right',
          }}>
            <motion.p
              className="font-handwritten"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 1 }}
              style={{
                fontSize: '1.4rem',
                color: '#c9a96e',
                marginBottom: 4,
              }}
            >
              With warmth,
            </motion.p>
            <motion.p
              className="font-handwritten"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 1 }}
              style={{
                fontSize: '2rem',
                fontWeight: 600,
                color: '#f5efe6',
              }}
            >
              Mendhak 🐸
            </motion.p>
          </div>

          {/* Subtle paper lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: `${15 + i * 11}%`,
                height: 1,
                background: 'rgba(201,169,110,0.04)',
                pointerEvents: 'none',
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
