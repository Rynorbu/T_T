import { traits } from '../data.js'

export default function Marquee() {
  const row = [...traits, ...traits]
  return (
    <div className="marquee" aria-label={traits.join(', ')}>
      <div className="marquee-track">
        {row.map((t, i) => (
          <span key={i} className="marquee-item">
            {t} <span className="marquee-dot">✿</span>
          </span>
        ))}
      </div>
    </div>
  )
}
