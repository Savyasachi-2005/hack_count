export default function Timer({ hrs, mins, secs, finished, progress, running, locked }) {
  const R1 = 240  // outer ring (total progress)
  const R3 = 208  // middle ring (minutes)
  const R4 = 192  // inner ring (seconds)
  
  const C1 = 2 * Math.PI * R1
  const C3 = 2 * Math.PI * R3
  const C4 = 2 * Math.PI * R4
  
  // Calculate smooth progress for each time unit
  const totalSeconds = 12 * 60 * 60
  const currentSeconds = parseInt(hrs) * 3600 + parseInt(mins) * 60 + parseInt(secs)
  const totalProgress = (currentSeconds / totalSeconds) * 100
  
  const minsProgress = (parseInt(mins) / 60) * 100
  const secsProgress = (parseInt(secs) / 60) * 100

  // Create tick marks for segments
  const segments = 60
  const tickAngles = Array.from({ length: segments }, (_, i) => i * (360 / segments))

  return (
    <section className="flex items-center justify-center gap-6 md:gap-12 lg:gap-20 w-full">
      {/* Left Card: Start Time */}
      <div className="hidden md:flex flex-col items-center justify-center text-center min-w-[100px] opacity-90">
        <svg className="w-4 h-4 text-white/15 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-[8px] uppercase tracking-[0.3em] text-white/20 mb-1 font-light">Start Time</span>
        <span className="text-sm md:text-base font-light text-white/40 tracking-wide">8:00 AM</span>
      </div>

      {/* Timer Container - Responsive */}
      <div className="relative flex-shrink-0 w-[85vw] max-w-[560px] aspect-square flex items-center justify-center">
        {/* SVG Ring System */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
          <defs>
            {/* Gradients */}
            <linearGradient id="totalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="minsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.65" />
            </linearGradient>
            <linearGradient id="secsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
            </linearGradient>
            
            {/* Glow filters */}
            <filter id="ringGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Tick marks - outer segments */}
          {tickAngles.map((angle, i) => {
            const isMainTick = i % 5 === 0
            const isQuarterTick = i % 15 === 0
            const r = isQuarterTick ? R1 + 12 : isMainTick ? R1 + 8 : R1 + 5
            const rInner = R1 + 2
            const x1 = 250 + rInner * Math.cos((angle - 90) * Math.PI / 180)
            const y1 = 250 + rInner * Math.sin((angle - 90) * Math.PI / 180)
            const x2 = 250 + r * Math.cos((angle - 90) * Math.PI / 180)
            const y2 = 250 + r * Math.sin((angle - 90) * Math.PI / 180)
            
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={isQuarterTick ? "rgba(255,255,255,0.25)" : isMainTick ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)"}
                strokeWidth={isQuarterTick ? "2" : isMainTick ? "1.5" : "1"}
              />
            )
          })}

          {/* Background rings */}
          <circle cx="250" cy="250" r={R1} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
          <circle cx="250" cy="250" r={R3} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
          <circle cx="250" cy="250" r={R4} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />

          {/* Total Progress Ring (Outer) - smooth continuous */}
          <circle
            cx="250" cy="250" r={R1}
            fill="none"
            stroke="url(#totalGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={C1}
            strokeDashoffset={C1 * (1 - totalProgress / 100)}
            className={`transition-all ease-linear ${running ? 'duration-1000' : 'duration-500'}`}
            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
            filter="url(#ringGlow)"
          />

          {/* Minutes Ring */}
          <circle
            cx="250" cy="250" r={R3}
            fill="none"
            stroke="url(#minsGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={C3}
            strokeDashoffset={C3 * (1 - minsProgress / 100)}
            className={`transition-all duration-1000 ease-out ${running ? 'animate-pulse' : ''}`}
            style={{ 
              transform: 'rotate(-90deg)', 
              transformOrigin: 'center',
              animationDuration: '2.5s'
            }}
            filter="url(#ringGlow)"
          />

          {/* Seconds Ring (Inner) - fastest animation */}
          <circle
            cx="250" cy="250" r={R4}
            fill="none"
            stroke="url(#secsGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={C4}
            strokeDashoffset={C4 * (1 - secsProgress / 100)}
            className={`transition-all ease-linear ${running ? 'duration-1000 animate-pulse' : 'duration-500'}`}
            style={{ 
              transform: 'rotate(-90deg)', 
              transformOrigin: 'center',
              animationDuration: '1s'
            }}
            filter="url(#strongGlow)"
            key={secs}
          />

          {/* Progress tick indicator dot */}
          {running && progress > 0 && (
            <>
              {/* Minutes dot */}
              <circle
                cx={250 + R3 * Math.cos(((minsProgress * 3.6) - 90) * Math.PI / 180)}
                cy={250 + R3 * Math.sin(((minsProgress * 3.6) - 90) * Math.PI / 180)}
                r="4"
                fill="#818cf8"
                className="animate-pulse"
                style={{ animationDuration: '1.5s' }}
              />
              {/* Seconds dot */}
              <circle
                cx={250 + R4 * Math.cos(((secsProgress * 3.6) - 90) * Math.PI / 180)}
                cy={250 + R4 * Math.sin(((secsProgress * 3.6) - 90) * Math.PI / 180)}
                r="5"
                fill="#60a5fa"
                className="animate-pulse"
                filter="url(#strongGlow)"
                style={{ animationDuration: '1s' }}
              />
            </>
          )}
        </svg>

        {/* Animated radial glow behind timer */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div 
            className={`w-[65%] h-[65%] rounded-full bg-gradient-radial from-purple-500/12 via-indigo-500/6 to-transparent blur-3xl ${running ? 'animate-pulse' : ''}`}
            style={{ animationDuration: '2s' }}
          />
        </div>

        {/* Timer Digits - Absolutely Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          {finished && (
            <div className="text-emerald-300 text-[10px] md:text-xs font-light tracking-[0.5em] uppercase mb-3 opacity-80 animate-pulse">
              Complete
            </div>
          )}
          
          <div
            className={`font-light whitespace-nowrap select-none ${
              finished ? 'text-emerald-300' : 'text-white'
            }`}
            style={{ 
              fontSize: 'clamp(1.75rem, 5.5vw, 4.25rem)',
              letterSpacing: '0.2em',
              textShadow: running 
                ? '0 0 35px rgba(139, 92, 246, 0.3), 0 0 70px rgba(139, 92, 246, 0.2), 0 0 100px rgba(139, 92, 246, 0.1)' 
                : '0 0 25px rgba(139, 92, 246, 0.2)',
              transition: 'text-shadow 0.3s ease'
            }}
          >
            <span 
              className="inline-block min-w-[1.3em] text-center transition-all duration-500 ease-out"
              style={{ 
                transform: running ? 'translateY(0)' : 'translateY(2px)',
                opacity: running ? 1 : 0.95
              }}
            >
              {hrs}
            </span>
            <span className={`mx-2 md:mx-3 text-white/30 ${running ? 'animate-pulse' : ''}`} style={{ animationDuration: '2s' }}>:</span>
            <span 
              className="inline-block min-w-[1.3em] text-center transition-all duration-500 ease-out"
              style={{ 
                transform: running ? 'translateY(0)' : 'translateY(2px)',
                opacity: running ? 1 : 0.95
              }}
            >
              {mins}
            </span>
            <span className={`mx-2 md:mx-3 text-white/30 ${running ? 'animate-pulse' : ''}`} style={{ animationDuration: '2s' }}>:</span>
            <span 
              className="inline-block min-w-[1.3em] text-center transition-all duration-300 ease-out"
              key={secs}
              style={{ 
                animation: running ? 'secondTick 0.35s ease-out' : 'none'
              }}
            >
              {secs}
            </span>
          </div>
          
          {finished && (
            <div className="text-emerald-300/50 text-[9px] tracking-[0.35em] uppercase mt-3 font-light">
              Hackathon Complete
            </div>
          )}
        </div>
      </div>

      {/* Right Card: Organised By */}
      <div className="hidden md:flex flex-col items-center justify-center text-center min-w-[100px] opacity-90">
        <svg className="w-4 h-4 text-white/15 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span className="text-[8px] uppercase tracking-[0.3em] text-white/20 mb-1 font-light">Organised By</span>
        <span className="text-sm md:text-base font-light text-white/40 tracking-wide">Team Sigma</span>
      </div>
    </section>
  )
}
