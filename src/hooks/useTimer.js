import { useState, useEffect, useCallback, useRef } from 'react'

const TOTAL_SECONDS = 12 * 60 * 60 // 12 hours
const LS_KEY = 'she-innovates-timer'

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function saveState(remaining, running, locked, startedAt) {
  localStorage.setItem(
    LS_KEY,
    JSON.stringify({ remaining, running, locked, startedAt })
  )
}

export default function useTimer() {
  const saved = useRef(loadState())

  const [remaining, setRemaining] = useState(() => {
    const s = saved.current
    if (!s) return TOTAL_SECONDS
    if (s.running && s.startedAt) {
      const elapsed = Math.floor((Date.now() - s.startedAt) / 1000)
      return Math.max(0, s.remaining - elapsed)
    }
    return s.remaining
  })

  const [running, setRunning] = useState(() => {
    const s = saved.current
    return s ? s.running : false
  })

  // Lock toggled manually with L key
  const [locked, setLocked] = useState(() => {
    const s = saved.current
    return s ? !!s.locked : false
  })

  const [finished, setFinished] = useState(remaining <= 0)

  // ── Tick ──
  useEffect(() => {
    if (!running || finished) return
    const id = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          setRunning(false)
          setFinished(true)
          setLocked(false)
          saveState(0, false, false, null)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [running, finished])

  // ── Persist ──
  useEffect(() => {
    if (running) {
      saveState(remaining, true, locked, Date.now())
    } else {
      saveState(remaining, false, locked, null)
    }
  }, [remaining, running, locked])

  // ── Controls ──
  const toggle = useCallback(() => {
    if (finished || locked) return
    setRunning(r => !r)
  }, [finished, locked])

  const reset = useCallback(() => {
    if (locked) return
    setRunning(false)
    setFinished(false)
    setLocked(false)
    setRemaining(TOTAL_SECONDS)
    saveState(TOTAL_SECONDS, false, false, null)
  }, [locked])

  const toggleLock = useCallback(() => {
    setLocked(l => !l)
  }, [])

  const goFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }, [])

  // ── Keyboard Shortcuts ──
  useEffect(() => {
    function handler(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      // Fullscreen always works
      if (e.code === 'KeyF') {
        goFullscreen()
        return
      }
      // L toggles lock
      if (e.code === 'KeyL') {
        toggleLock()
        return
      }
      // All other keys blocked when locked
      if (locked) return
      if (e.code === 'Space') {
        e.preventDefault()
        toggle()
      } else if (e.code === 'KeyR') {
        reset()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggle, reset, goFullscreen, toggleLock, locked])

  // ── Format ──
  const hrs = String(Math.floor(remaining / 3600)).padStart(2, '0')
  const mins = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0')
  const secs = String(remaining % 60).padStart(2, '0')

  // ── Progress Percentage ──
  const progress = ((TOTAL_SECONDS - remaining) / TOTAL_SECONDS) * 100

  return {
    remaining,
    running,
    finished,
    locked,
    toggle,
    reset,
    toggleLock,
    goFullscreen,
    hrs,
    mins,
    secs,
    progress,
  }
}
