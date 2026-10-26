import { useEffect, useRef } from 'react'

// Falling cosmos petals drawn on a fixed canvas behind everything.
const COLORS = ['#f7a8c8', '#f283b4', '#fbd3e3', '#ffffff', '#e8679f']

export default function Petals() {
  const ref = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w, h, raf
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = canvas.width = window.innerWidth * dpr
      h = canvas.height = window.innerHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    const count = window.innerWidth < 640 ? 18 : 34
    const make = (initial) => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : -20 * dpr,
      size: (6 + Math.random() * 8) * dpr,
      speed: (0.4 + Math.random() * 0.9) * dpr,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.01 + Math.random() * 0.02,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    })
    const petals = Array.from({ length: count }, () => make(true))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of petals) {
        p.y += p.speed
        p.sway += p.swaySpeed
        p.x += Math.sin(p.sway) * 0.8 * dpr
        p.rot += p.rotSpeed
        if (p.y > h + 20 * dpr) Object.assign(p, make(false))

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.scale(1, Math.abs(Math.cos(p.sway)) * 0.6 + 0.4) // fake 3D flutter
        ctx.beginPath()
        ctx.moveTo(0, -p.size)
        ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.6, p.size * 0.6, p.size * 0.6, 0, p.size)
        ctx.bezierCurveTo(-p.size * 0.6, p.size * 0.6, -p.size * 0.8, -p.size * 0.6, 0, -p.size)
        ctx.fillStyle = p.color
        ctx.globalAlpha = 0.75
        ctx.fill()
        ctx.restore()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="petals" aria-hidden />
}
