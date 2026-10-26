import { useEffect, useRef } from 'react'

// Little sparkles that follow the mouse (desktop only).
const GLYPHS = ['✦', '♡', '✧', '·']

export default function CursorTrail() {
  const layer = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let last = 0
    const onMove = (e) => {
      const now = performance.now()
      if (now - last < 45) return
      last = now
      const el = document.createElement('span')
      el.className = 'spark'
      el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
      el.style.setProperty('--dx', `${(Math.random() - 0.5) * 40}px`)
      layer.current.appendChild(el)
      setTimeout(() => el.remove(), 900)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return <div ref={layer} className="spark-layer" aria-hidden />
}
