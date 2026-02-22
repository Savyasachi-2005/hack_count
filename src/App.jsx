import ParticleBackground from './components/ParticleBackground'
import Timer from './components/Timer'
import useTimer from './hooks/useTimer'
import sheLogo from './assets/she.png'
import sitLogo from './assets/sit.png'
import sigmaLogo from './assets/sigma.png'

export default function App() {
  const {
    hrs, mins, secs,
    running, finished, locked,
    progress,
  } = useTimer()

  return (
    <div className="relative h-screen flex flex-col items-center overflow-hidden">
      {/* Animated Background */}
      <ParticleBackground />

      {/* ── Corner Logos ── */}
      <img src={sitLogo} alt="SIT" className="absolute top-4 left-3 md:top-6 md:left-4 w-20 h-20 md:w-24 md:h-24 object-contain z-20 brightness-0 invert opacity-40" />
      <img src={sigmaLogo} alt="Team Sigma" className="absolute top-6 right-6 md:top-0 md:right-4 w-28 h-24 md:w-36 md:h-36 object-contain z-20 opacity-40" />

      {/* ── Header ── */}
      <header className="relative z-10 w-full flex flex-col items-center pt-6 md:pt-8 pb-2 flex-shrink-0">
        <div className="flex items-center gap-4 mb-2">
          <img src={sheLogo} alt="SHE INNOVATES" className="w-10 h-10 md:w-14 md:h-14 rounded-lg object-contain opacity-80" />
          <div>
            <h1 className="text-2xl md:text-4xl font-light tracking-[0.2em] uppercase text-white/80">
              SHE INNOVATES
            </h1>
          </div>
        </div>
        <p className="text-[9px] md:text-[10px] text-white/25 tracking-[0.35em] uppercase font-light">
          12-Hour Internal Hackathon &bull; Empowering Women in Tech
        </p>
        <div className="w-32 h-px mt-3 bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </header>

      {/* ── Main: Timer ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full px-4 min-h-0">
        <Timer
          hrs={hrs}
          mins={mins}
          secs={secs}
          finished={finished}
          progress={progress}
          running={running}
          locked={locked}
        />
      </main>

      {/* Lock indicator */}
      {locked && (
        <div className="fixed bottom-4 right-4 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/3 border border-white/5 text-white/20 text-[10px] tracking-wider uppercase select-none">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Locked
        </div>
      )}
    </div>
  )
}
