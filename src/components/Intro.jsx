import { motion } from 'framer-motion'
import { NAME_FIRST, NAME_LAST } from '../data.js'

export default function Intro({ onOpen }) {
  return (
    <motion.div
      className="intro"
      exit={{ clipPath: 'circle(0% at 50% 50%)', transition: { duration: 1.1, ease: [0.7, 0, 0.3, 1] } }}
      initial={{ clipPath: 'circle(150% at 50% 50%)' }}
    >
      <motion.div
        className="intro-flower"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 60, damping: 12, delay: 0.2 }}
      >
        <Flower />
      </motion.div>

      <motion.p
        className="intro-kicker"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        something special, made only for
      </motion.p>

      <motion.h1
        className="intro-name"
        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 1.1, duration: 1 }}
      >
        {NAME_FIRST} {NAME_LAST}
      </motion.h1>

      <motion.button
        className="intro-btn"
        onClick={onOpen}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>open it</span>
        <span className="intro-heart">♡</span>
      </motion.button>
    </motion.div>
  )
}

export function Flower({ size = 120 }) {
  const petals = Array.from({ length: 8 })
  return (
    <svg width={size} height={size} viewBox="-50 -50 100 100" className="flower-svg" aria-hidden>
      {petals.map((_, i) => (
        <ellipse
          key={i}
          cx="0"
          cy="-24"
          rx="11"
          ry="24"
          transform={`rotate(${i * 45})`}
          fill={i % 2 ? 'var(--pink)' : 'var(--pink-soft)'}
          opacity="0.92"
        />
      ))}
      <circle r="9" fill="var(--gold)" />
      <circle r="4" fill="#e9a23b" />
    </svg>
  )
}
