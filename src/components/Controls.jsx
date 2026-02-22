export default function Controls({ running, finished, toggle, reset, goFullscreen }) {
  return (
    <section className="flex flex-wrap items-center justify-center gap-4 py-4">
      {/* Start / Pause */}
      <button
        onClick={toggle}
        disabled={finished}
        className={`relative z-10 flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm md:text-base tracking-wider uppercase transition-all duration-300
          ${finished
            ? 'bg-white/5 text-white/30 cursor-not-allowed border border-white/10'
            : running
              ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/40 text-yellow-300'
              : 'bg-gradient-to-r from-neon-pink/20 to-neon-violet/20 border border-neon-pink/40 text-neon-pink'
          }`}
      >
        {running ? (
          <>
            {/* Pause Icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
            Pause
          </>
        ) : (
          <>
            {/* Play Icon */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Start
          </>
        )}
        <span className="text-[10px] text-white/30 ml-1">[Space]</span>
      </button>

      {/* Reset */}
      <button
        onClick={reset}
        className="relative z-10 flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm md:text-base tracking-wider uppercase
          bg-gradient-to-r from-neon-cyan/10 to-neon-blue/10 border border-neon-cyan/30 text-neon-cyan
          transition-all duration-300"
      >
        {/* Reset Icon */}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reset
        <span className="text-[10px] text-white/30 ml-1">[R]</span>
      </button>

      {/* Fullscreen */}
      <button
        onClick={goFullscreen}
        className="relative z-10 flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-sm md:text-base tracking-wider uppercase
          bg-gradient-to-r from-neon-violet/10 to-neon-purple/10 border border-neon-violet/30 text-neon-violet
          transition-all duration-300"
      >
        {/* Fullscreen Icon */}
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
        </svg>
        Fullscreen
        <span className="text-[10px] text-white/30 ml-1">[F]</span>
      </button>
    </section>
  )
}
