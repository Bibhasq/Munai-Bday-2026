import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

function FinalParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.4,
      dy: -Math.random() * 0.5 - 0.2,
      opacity: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? '201,169,110' : '232,180,184',
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.dx
        p.y += p.dy
        p.pulse += 0.015

        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width }
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color},${alpha})`
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}

export default function FinalScene() {
  const [ref, visible] = useScrollReveal(0.2)
  const [showFrog, setShowFrog] = useState(false)

  useEffect(() => {
    if (visible) {
      setTimeout(() => setShowFrog(true), 2000)
    }
  }, [visible])

  return (
    <section
      id="final"
      style={{
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '80px 24px',
      }}
    >
      <FinalParticles />

      {/* Deep ambient glow */}
      <div style={{
        position: 'absolute',
        width: '80vw',
        height: '80vw',
        maxWidth: 700,
        maxHeight: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 60%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />

      <div ref={ref} style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        {/* Heart */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={visible ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', marginBottom: 40 }}
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'inline-block' }}
          >
            ❤️
          </motion.span>
        </motion.div>

        {/* Happy Birthday */}
        <motion.p
          className="font-display"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 0.7, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 1.2 }}
          style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#c9a96e',
            letterSpacing: '0.1em',
            marginBottom: 12,
          }}
        >
          Happy Birthday
        </motion.p>

        <motion.h1
          className="font-display"
          initial={{ opacity: 0, y: 40 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          style={{
            fontSize: 'clamp(4rem, 16vw, 10rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            background: 'linear-gradient(135deg, #f5efe6 0%, #c9a96e 40%, #e8b4b8 70%, #c9a96e 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1,
            marginBottom: 40,
            letterSpacing: '0.02em',
          }}
        >
          Munai
        </motion.h1>

        {/* Frog emoji */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={showFrog ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginBottom: 48 }}
        >
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'inline-block' }}
          >
            🐸
          </motion.span>
        </motion.div>

        {/* From */}
        <motion.p
          className="font-display"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 0.5 } : {}}
          transition={{ delay: 1.5, duration: 1.2 }}
          style={{
            fontStyle: 'italic',
            fontSize: 'clamp(1.2rem, 3.5vw, 1.8rem)',
            color: '#f5efe6',
            marginBottom: 8,
          }}
        >
          from Mendhak
        </motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={visible ? { scaleX: 1 } : {}}
          transition={{ delay: 2, duration: 1.2 }}
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)',
            maxWidth: 200,
            margin: '32px auto',
          }}
        />

        {/* Final line */}
        <motion.p
          className="font-display"
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 0.65, y: 0 } : {}}
          transition={{ delay: 2.2, duration: 1.2 }}
          style={{
            fontStyle: 'italic',
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#c9a96e',
            lineHeight: 1.6,
            maxWidth: 400,
            margin: '0 auto',
          }}
        >
          "Thank you for being part of my favorite memories."
        </motion.p>
      </div>

      {/* Floating hearts final */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: `${10 + i * 16}%`,
            bottom: '10%',
            fontSize: `${12 + (i % 3) * 6}px`,
            color: i % 2 === 0 ? 'rgba(201,169,110,0.4)' : 'rgba(232,180,184,0.3)',
            pointerEvents: 'none',
          }}
          animate={{
            y: [0, -150, -300],
            opacity: [0.5, 0.3, 0],
            rotate: [0, 10, -5],
          }}
          transition={{
            duration: 5 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: 'easeOut',
          }}
        >
          ♥
        </motion.div>
      ))}

      {/* Fade to black at very bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
        background: 'linear-gradient(to bottom, transparent, #000)',
        pointerEvents: 'none',
      }} />
    </section>
  )
}
