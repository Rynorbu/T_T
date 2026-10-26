import { useRef } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { NAME_FIRST, NAME_LAST, NAME_TIBETAN, photos } from '../data.js'

const letters = (word, delay) =>
  word.split('').map((ch, i) => (
    <motion.span
      key={i}
      className="hero-letter"
      initial={{ opacity: 0, y: 80, rotate: 8 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay: delay + i * 0.07, type: 'spring', stiffness: 90, damping: 14 }}
    >
      {ch}
    </motion.span>
  ))

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-40%'])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // gentle 3D tilt that follows the pointer
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 100, damping: 15 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 15 })
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }

  return (
    <section ref={ref} className="hero" onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0) }}>
      <motion.div className="hero-text" style={{ y: textY, opacity: fade }}>
        <motion.p className="kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          a little world, made for
        </motion.p>
        <h1 className="hero-name">
          <span className="hero-word">{letters(NAME_FIRST, 0.5)}</span>
          <span className="hero-word italic">{letters(NAME_LAST, 0.9)}</span>
        </h1>
        <motion.p
          className="tibetan"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {NAME_TIBETAN}
        </motion.p>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.8 }}
        >
          the girl who makes cosmos fields jealous 🌸
        </motion.p>
      </motion.div>

      <motion.div className="hero-visual" style={{ y: imgY, rotateX: rx, rotateY: ry }}>
        <motion.div
          className="arch"
          initial={{ clipPath: 'inset(100% 0 0 0 round 999px 999px 24px 24px)' }}
          animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 24px 24px)' }}
          transition={{ delay: 0.4, duration: 1.4, ease: [0.7, 0, 0.2, 1] }}
        >
          <motion.img
            src={photos[0].src}
            alt="Yeshi in a cosmos field"
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 2.2, ease: 'easeOut' }}
          />
        </motion.div>
        <motion.img
          className="hero-float one"
          src={photos[3].src}
          alt=""
          initial={{ opacity: 0, x: 40, rotate: 12 }}
          animate={{ opacity: 1, x: 0, rotate: 6 }}
          transition={{ delay: 1.6, type: 'spring', stiffness: 60 }}
        />
        <motion.img
          className="hero-float two"
          src={photos[9].src}
          alt=""
          initial={{ opacity: 0, x: -40, rotate: -14 }}
          animate={{ opacity: 1, x: 0, rotate: -7 }}
          transition={{ delay: 1.9, type: 'spring', stiffness: 60 }}
        />
        <span className="hero-badge">✿ forever lovely ✿</span>
      </motion.div>

      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
      >
        <span>scroll</span>
        <span className="scroll-line" />
      </motion.div>
    </section>
  )
}
