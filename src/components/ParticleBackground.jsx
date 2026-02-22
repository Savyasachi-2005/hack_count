import { useMemo } from 'react'

export default function ParticleBackground() {
  const particles = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 20,
      duration: Math.random() * 15 + 15,
      opacity: Math.random() * 0.08 + 0.02,
      color: ['#a78bfa', '#818cf8', '#60a5fa', '#c084fc'][Math.floor(Math.random() * 4)],
    }))
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-bg opacity-15" />

      {/* Floating Particles */}
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: p.opacity,
            animation: `particle ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}

      {/* Subtle radial glow (top) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.3), transparent 70%)',
        }}
      />

      {/* Subtle radial glow (bottom) */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-8"
        style={{
          background: 'radial-gradient(ellipse, rgba(96,165,250,0.2), transparent 70%)',
        }}
      />
    </div>
  )
}
