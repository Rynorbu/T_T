import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { chapters, photos } from '../data.js'

function Chapter({ chapter, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [120, -120])
  const y2 = useTransform(scrollYProgress, [0, 1], [40, -200])
  const y3 = useTransform(scrollYProgress, [0, 1], [200, -60])
  const numX = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const flip = index % 2 === 1
  const [a, b, c] = chapter.photos.map((n) => photos[n - 1])

  return (
    <section ref={ref} className={`chapter ${flip ? 'flip' : ''}`}>
      <motion.span className="chapter-num" style={{ x: numX }} aria-hidden>
        {chapter.num}
      </motion.span>

      <motion.div
        className="chapter-text"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <p className="kicker">chapter {chapter.num}</p>
        <h2>{chapter.title}</h2>
        <p>{chapter.text}</p>
      </motion.div>

      <div className="chapter-collage">
        <motion.figure className="cc main" style={{ y: y1 }} whileHover={{ scale: 1.03, rotate: 0 }}>
          <img src={a.src} alt={a.caption} loading="lazy" />
          <figcaption>{a.caption}</figcaption>
        </motion.figure>
        <motion.figure className="cc side-a" style={{ y: y2 }} whileHover={{ scale: 1.06, rotate: 0, zIndex: 5 }}>
          <img src={b.src} alt={b.caption} loading="lazy" />
        </motion.figure>
        <motion.figure className="cc side-b" style={{ y: y3 }} whileHover={{ scale: 1.06, rotate: 0, zIndex: 5 }}>
          <img src={c.src} alt={c.caption} loading="lazy" />
        </motion.figure>
      </div>
    </section>
  )
}

export default function Chapters() {
  return (
    <div className="chapters">
      {chapters.map((c, i) => (
        <Chapter key={c.num} chapter={c} index={i} />
      ))}
    </div>
  )
}
