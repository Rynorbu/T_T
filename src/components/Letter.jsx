import { motion } from 'framer-motion'
import { letter, photos, signature } from '../data.js'

export default function Letter() {
  return (
    <section className="letter-wrap">
      <motion.div
        className="letter"
        initial={{ opacity: 0, y: 80, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.img
          className="letter-photo"
          src={photos[13].src}
          alt=""
          initial={{ rotate: 18, scale: 0.6, opacity: 0 }}
          whileInView={{ rotate: 8, scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 70 }}
        />
        <span className="tape" aria-hidden />
        {letter.map((line, i) => (
          <motion.p
            key={i}
            className={i === 0 ? 'letter-greet' : ''}
            initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: 0.2 + i * 0.25, duration: 0.8 }}
          >
            {line}
          </motion.p>
        ))}
        <motion.p
          className="signature"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + letter.length * 0.25, duration: 1 }}
        >
          {signature}
        </motion.p>
      </motion.div>
    </section>
  )
}
