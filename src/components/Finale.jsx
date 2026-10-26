import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAME_FIRST, NAME_LAST, photos } from '../data.js'
import { Flower } from './Intro.jsx'

const HEARTS = ['💗', '💖', '🌸', '💕', '✨', '🤍']
let uid = 0

export default function Finale() {
  const [bursts, setBursts] = useState([])
  const [count, setCount] = useState(0)

  const burst = (e) => {
    const x = e.clientX
    const y = e.clientY
    const items = Array.from({ length: 14 }, () => ({
      id: uid++,
      x,
      y,
      dx: (Math.random() - 0.5) * 360,
      dy: -120 - Math.random() * 260,
      r: (Math.random() - 0.5) * 120,
      g: HEARTS[Math.floor(Math.random() * HEARTS.length)],
    }))
    setBursts((b) => [...b, ...items])
    setCount((c) => c + 1)
    setTimeout(() => setBursts((b) => b.filter((h) => !items.includes(h))), 1600)
  }

  return (
    <section className="finale">
      <div className="finale-bg" style={{ backgroundImage: `url(${photos[1].src})` }} aria-hidden />
      <motion.div
        className="finale-inner"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1 }}
      >
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
          <Flower size={90} />
        </motion.div>
        <h2 className="finale-name">
          {NAME_FIRST} <em>{NAME_LAST}</em>
        </h2>
        <p className="finale-line">you deserve all the beautiful things.</p>

        <motion.button
          className="love-btn"
          onClick={burst}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.9 }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ scale: { duration: 1.4, repeat: Infinity } }}
        >
          send smiles 🌸
        </motion.button>
        <p className="love-count">{count > 0 ? `${count} smile${count > 1 ? 's' : ''} sent your way` : 'tap it, as many times as you like'}</p>
      </motion.div>

      <footer className="footer">made with 💗</footer>

      <AnimatePresence>
        {bursts.map((h) => (
          <motion.span
            key={h.id}
            className="burst"
            style={{ left: h.x, top: h.y }}
            initial={{ x: 0, y: 0, scale: 0.4, opacity: 1, rotate: 0 }}
            animate={{ x: h.dx, y: h.dy, scale: 1.3, opacity: 0, rotate: h.r }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            {h.g}
          </motion.span>
        ))}
      </AnimatePresence>
    </section>
  )
}
