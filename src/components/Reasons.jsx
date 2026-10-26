import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { reasons } from '../data.js'

export default function Reasons() {
  const [flipped, setFlipped] = useState(() => new Set())
  const all = flipped.size === reasons.length

  const toggle = (i) =>
    setFlipped((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })

  return (
    <section className="reasons">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="kicker">tap each card</p>
        <h2>Why She's Special</h2>
        <p className="hint">{flipped.size} of {reasons.length} opened</p>
      </motion.div>

      <div className="cards">
        {reasons.map((r, i) => (
          <motion.button
            key={i}
            className="card"
            onClick={() => toggle(i)}
            initial={{ opacity: 0, y: 50, rotate: (i % 3) - 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: (i % 3) * 0.12, duration: 0.6 }}
            aria-pressed={flipped.has(i)}
          >
            <motion.div
              className="card-inner"
              animate={{ rotateY: flipped.has(i) ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 14 }}
            >
              <div className="card-face front">
                <span className="card-n">#{i + 1}</span>
                <span className="card-seal">♡</span>
                <span className="card-tap">tap to open</span>
              </div>
              <div className="card-face back">
                <span className="card-icon">{r.icon}</span>
                <p>{r.text}</p>
              </div>
            </motion.div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {all && (
          <motion.p
            className="all-open"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            …and a thousand more reasons that don't fit on a card 💗
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  )
}
