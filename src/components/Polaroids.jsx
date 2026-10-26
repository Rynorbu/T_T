import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { photos } from '../data.js'

const picks = [12, 15, 10, 13, 19, 16, 11, 20]

export default function Polaroids() {
  const area = useRef(null)
  const [top, setTop] = useState(picks.length - 1)
  const [z, setZ] = useState(() => picks.map((_, i) => i))

  const bringToFront = (i) => {
    setZ((prev) => {
      const next = [...prev]
      next[i] = Math.max(...prev) + 1
      return next
    })
    setTop(i)
  }

  return (
    <section className="polaroids">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="kicker">a pile of memories</p>
        <h2>Pick one up</h2>
        <p className="hint">drag the photos around — there's more underneath ✨</p>
      </motion.div>

      <div className="pile" ref={area}>
        {picks.map((n, i) => {
          const ph = photos[n - 1]
          const rot = ((i * 37) % 24) - 12
          const off = ((i * 53) % 120) - 60
          return (
            <motion.figure
              key={n}
              className={`polaroid ${top === i ? 'active' : ''}`}
              drag
              dragConstraints={area}
              dragElastic={0.2}
              onPointerDown={() => bringToFront(i)}
              style={{ zIndex: z[i] }}
              initial={{ opacity: 0, y: 120, rotate: 0 }}
              whileInView={{ opacity: 1, y: off * 0.3, x: off, rotate: rot }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.12, type: 'spring', stiffness: 70, damping: 14 }}
              whileHover={{ scale: 1.04 }}
              whileDrag={{ scale: 1.1, rotate: 0, boxShadow: '0 30px 60px rgba(90,30,60,.35)' }}
            >
              <img src={ph.src} alt={ph.caption} draggable={false} />
              <figcaption>{ph.caption}</figcaption>
            </motion.figure>
          )
        })}
      </div>
    </section>
  )
}
