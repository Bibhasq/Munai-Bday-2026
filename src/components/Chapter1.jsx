import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const soloPhotos = [1, 2, 3, 4, 5, 6, 7, 8]

const quotes = [
  { text: "Your smile brings light to ordinary days.", sub: null },
  { text: "Your strength inspires.", sub: "Your dedication motivates." },
  { text: "You're working really hard and doing your best.", sub: null },
  { text: "Keep it up, Munai.", sub: "I know you'll achieve all the dreams\nand goals you're striving for." },
]

function QuoteReveal({ quote, sub, delay = 0 }) {
  const [ref, visible] = useScrollReveal(0.3)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1], delay }}
      style={{ textAlign: 'center', padding: '0 24px' }}
    >
      <p
        className="font-display"
        style={{
          fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: '#f5efe6',
          lineHeight: 1.25,
          marginBottom: sub ? 16 : 0,
        }}
      >
        {quote}
      </p>
      {sub && (
        <p
          className="font-display"
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 2rem)',
            fontWeight: 300,
            color: '#c9a96e',
            lineHeight: 1.4,
            opacity: 0.85,
            whiteSpace: 'pre-line',
          }}
        >
          {sub}
        </p>
      )}
    </motion.div>
  )
}

function HeroPhoto({ num, isFirst }) {
  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Image */}
      <motion.img
        src={`./assets/${num}.jpg`}
        alt={`Munai ${num}`}
        className="ken-burns"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
        }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,6,8,0.3) 0%, rgba(10,6,8,0.1) 40%, rgba(10,6,8,0.6) 100%)',
      }} />

      {/* Top cinematic bar */}
      <div className="cinematic-bar" style={{ top: 0 }} />
      {/* Bottom cinematic bar */}
      <div className="cinematic-bar" style={{ bottom: 0 }} />

      {/* Photo number */}
      <div style={{
        position: 'absolute',
        bottom: 80,
        right: 40,
        fontFamily: 'Jost, sans-serif',
        fontWeight: 200,
        fontSize: '0.65rem',
        letterSpacing: '0.3em',
        color: 'rgba(201,169,110,0.5)',
      }}>
        {String(num).padStart(2, '0')} / 08
      </div>
    </div>
  )
}

function PhotoGrid() {
  const [ref, visible] = useScrollReveal(0.1)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={visible ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 3,
        padding: '0 3px',
      }}
    >
      {[3, 4, 5, 6].map((num, i) => (
        <motion.div
          key={num}
          className="img-depth"
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: i * 0.15 }}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 4,
            aspectRatio: '3/4',
          }}
        >
          <img
            src={`./assets/${num}.jpg`}
            alt={`Munai ${num}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
            loading="lazy"
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 60%, rgba(10,6,8,0.7))',
          }} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function Chapter1() {
  const [titleRef, titleVisible] = useScrollReveal(0.3)

  return (
    <section id="chapter-1">
      {/* Cinematic hero opener */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <motion.img
          src="./assets/1.jpg"
          alt="Munai"
          className="ken-burns"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: 'easeOut' }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,6,8,0.5) 0%, rgba(10,6,8,0.1) 30%, rgba(10,6,8,0.8) 100%)',
        }} />

        {/* Chapter label */}
        <div style={{ position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <motion.p
            className="chapter-label"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Chapter One
          </motion.p>
        </div>

        {/* Chapter title */}
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          width: '90%',
        }}>
          <motion.h2
            className="font-display"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
            style={{
              fontSize: 'clamp(3rem, 12vw, 8rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              background: 'linear-gradient(135deg, #f5efe6, #c9a96e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.04em',
              lineHeight: 1,
            }}
          >
            Munai
          </motion.h2>
          <motion.p
            className="chapter-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5, duration: 1 }}
            style={{ marginTop: 16 }}
          >
            a celebration of you
          </motion.p>
        </div>

        {/* Scroll cue */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div style={{
            width: 1,
            height: 40,
            background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.6))',
          }} />
        </motion.div>
      </div>

      {/* Quote 1 */}
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        position: 'relative',
      }}>
        <div className="ambient-glow" style={{
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }} />
        <QuoteReveal quote={quotes[0].text} />
      </div>

      {/* Full screen photo 2 */}
      <HeroPhoto num={2} />

      {/* Quote 2 */}
      <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        <QuoteReveal quote={quotes[1].text} sub={quotes[1].sub} />
      </div>

      {/* Photo grid */}
      <div style={{ padding: '0 0 3px 0' }}>
        <PhotoGrid />
      </div>

      {/* Quote 3 */}
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        <QuoteReveal quote={quotes[2].text} />
      </div>

      {/* Full screen photo 7 */}
      <HeroPhoto num={7} />

      {/* Quote 4 */}
      <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        <QuoteReveal quote={quotes[3].text} sub={quotes[3].sub} />
      </div>

      {/* Photo 8 */}
      <HeroPhoto num={8} />
    </section>
  )
}
