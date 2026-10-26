import { useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Intro from './components/Intro.jsx'
import Petals from './components/Petals.jsx'
import CursorTrail from './components/CursorTrail.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Chapters from './components/Chapters.jsx'
import Polaroids from './components/Polaroids.jsx'
import Gallery from './components/Gallery.jsx'
import Reasons from './components/Reasons.jsx'
import Letter from './components/Letter.jsx'
import Finale from './components/Finale.jsx'

export default function App() {
  const [opened, setOpened] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <>
      <Petals />
      <CursorTrail />
      <AnimatePresence>{!opened && <Intro onOpen={() => setOpened(true)} />}</AnimatePresence>

      {opened && (
        <>
          <motion.div className="progress" style={{ scaleX: progress }} />
          <main>
            <Hero />
            <Marquee />
            <Chapters />
            <Polaroids />
            <Gallery />
            <Reasons />
            <Letter />
            <Finale />
          </main>
        </>
      )}
    </>
  )
}
