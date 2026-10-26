import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { photos } from '../data.js'

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'kira', label: 'In Kira' },
  { id: 'travel', label: 'Adventures' },
  { id: 'moods', label: 'Moods' },
]

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [open, setOpen] = useState(null) // index into `shown`
  const shown = photos.filter((p) => filter === 'all' || p.tag === filter)

  return (
    <section className="gallery">
      <motion.div
        className="section-head"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="kicker">the album</p>
        <h2>Every Little Moment</h2>
      </motion.div>

      <div className="filters" role="tablist">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={filter === f.id}
            className={`filter ${filter === f.id ? 'on' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {filter === f.id && <motion.span layoutId="filter-pill" className="filter-pill" />}
            <span className="filter-label">{f.label}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid">
        <AnimatePresence mode="popLayout">
          {shown.map((ph, i) => (
            <motion.button
              layout
              key={ph.src}
              className="tile"
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              whileHover={{ y: -6 }}
            >
              <img src={ph.src} alt={ph.caption} loading="lazy" />
              <span className="tile-cap">{ph.caption}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {open !== null && <Lightbox items={shown} index={open} setIndex={setOpen} />}
      </AnimatePresence>
    </section>
  )
}

function Lightbox({ items, index, setIndex }) {
  const [dir, setDir] = useState(0)
  const go = useCallback(
    (d) => {
      setDir(d)
      setIndex((i) => (i + d + items.length) % items.length)
    },
    [items.length, setIndex]
  )
  const close = useCallback(() => setIndex(null), [setIndex])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [go, close])

  const ph = items[index]

  return (
    <motion.div
      className="lightbox"
      onClick={close}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="lb-close" onClick={close} aria-label="Close">✕</button>
      <button className="lb-nav prev" onClick={(e) => { e.stopPropagation(); go(-1) }} aria-label="Previous">‹</button>
      <button className="lb-nav next" onClick={(e) => { e.stopPropagation(); go(1) }} aria-label="Next">›</button>

      <AnimatePresence mode="wait" custom={dir}>
        <motion.figure
          key={ph.src}
          className="lb-figure"
          onClick={(e) => e.stopPropagation()}
          custom={dir}
          initial={{ opacity: 0, x: dir * 80, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: dir * -80, scale: 0.95 }}
          transition={{ duration: 0.35 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={(_, info) => {
            if (info.offset.x < -80) go(1)
            else if (info.offset.x > 80) go(-1)
          }}
        >
          <img src={ph.src} alt={ph.caption} draggable={false} />
          <figcaption>
            {ph.caption}
            <span className="lb-count">{index + 1} / {items.length}</span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </motion.div>
  )
}
