import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronLeft, Mic, Crown } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import { useApp } from '../state/AppContext'

/**
 * Vocal Coach (Pro-gated) — selection → listening → processing → scored.
 * On completion dispatches ADD_SESSION and navigates to /save-results.
 * Refactor of the legacy VocalCoachWorkflow into a routed screen.
 */

const MODES = [
  { id: 'warmup', label: 'Warm-up', hint: 'Wake the voice up' },
  { id: 'pitch', label: 'Pitch Check', hint: 'Hit and hold a tone' },
  { id: 'stamina', label: 'Stamina', hint: 'Longer sustained breath' },
]

export default function VocalCoach() {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()
  const [phase, setPhase] = useState('select') // select | listen | processing
  const [mode, setMode] = useState(MODES[1])
  const [accuracy, setAccuracy] = useState(0.45)

  // Gate: if the user somehow lands here without Pro, bounce them to Go Pro
  useEffect(() => {
    if (!state.isPro) navigate('/go-pro', { replace: true })
  }, [state.isPro, navigate])

  // Listening animation — wobble the accuracy like a live signal
  useEffect(() => {
    if (phase !== 'listen') return
    let timer
    const tick = () => {
      setAccuracy((a) => {
        const target = 0.3 + Math.random() * 0.7
        return a + (target - a) * 0.12
      })
      timer = setTimeout(tick, 180)
    }
    tick()
    return () => clearTimeout(timer)
  }, [phase])

  // Processing → save session → save-results
  useEffect(() => {
    if (phase !== 'processing') return
    const t = setTimeout(() => {
      const score = 60 + Math.floor(Math.random() * 35) // 60-94
      dispatch({
        type: 'ADD_SESSION',
        session: {
          id: Date.now().toString(),
          type: 'vocal-coach',
          mode: mode.id,
          score,
          at: new Date().toISOString(),
        },
      })
      navigate('/save-results', { state: { score } })
    }, 1800)
    return () => clearTimeout(t)
  }, [phase, mode, dispatch, navigate])

  return (
    <div style={styles.wrap}>
      <StatusBar />
      <button
        onClick={() => (phase === 'select' ? navigate('/pro') : setPhase('select'))}
        style={styles.back}
        aria-label="back"
      >
        {phase === 'select' ? (
          <ArrowLeft size={14} color="#fff6ec" />
        ) : (
          <ChevronLeft size={14} color="#fff6ec" />
        )}
      </button>

      <div style={styles.proBadge}>
        <Crown size={10} color="#FFC14A" fill="#FFC14A" strokeWidth={0} />
        <span>PRO</span>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'select' && (
          <motion.div
            key="select"
            style={styles.pane}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div style={styles.title}>Vocal Coach</div>
            <div style={styles.subtitle}>Pick your session</div>

            <div style={styles.modes}>
              {MODES.map((m) => {
                const selected = m.id === mode.id
                return (
                  <motion.button
                    key={m.id}
                    onClick={() => setMode(m)}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      ...styles.modeBtn,
                      background: selected ? 'rgba(255,162,74,0.18)' : 'rgba(230,230,230,0.12)',
                      borderColor: selected ? '#FFA24A' : 'rgba(255,255,255,0.12)',
                      boxShadow: selected ? '0 0 16px rgba(255,162,74,0.4)' : 'none',
                    }}
                  >
                    <div style={styles.modeText}>
                      <div style={styles.modeLabel}>{m.label}</div>
                      <div style={styles.modeHint}>{m.hint}</div>
                    </div>
                    {selected && <div style={styles.modeDot} />}
                  </motion.button>
                )
              })}
            </div>

            <motion.button
              onClick={() => setPhase('listen')}
              style={styles.cta}
              whileTap={{ scale: 0.96 }}
            >
              Start {mode.label}
            </motion.button>
          </motion.div>
        )}

        {phase === 'listen' && (
          <motion.div
            key="listen"
            style={styles.pane}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div style={styles.title}>{mode.label}</div>
            <PitchRing accuracy={accuracy} />
            <div style={styles.feedback}>
              {accuracy > 0.8 ? 'Perfect' : accuracy > 0.55 ? 'Hold it' : accuracy > 0.3 ? 'A bit low' : 'A bit high'}
            </div>
            <motion.button
              onClick={() => setPhase('processing')}
              style={styles.cta}
              whileTap={{ scale: 0.96 }}
            >
              Finish session
            </motion.button>
          </motion.div>
        )}

        {phase === 'processing' && (
          <motion.div
            key="processing"
            style={styles.pane}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div style={styles.procTitle}>Analyzing</div>
            <motion.div
              style={styles.spinner}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
            />
            <div style={styles.procHint}>Scoring your {mode.label.toLowerCase()}…</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function PitchRing({ accuracy }) {
  const size = 108
  const stroke = 8
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const len = Math.max(0, Math.min(1, accuracy)) * circ

  return (
    <div style={{ position: 'relative', width: size, height: size, marginTop: 6, marginBottom: 8 }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="vc-amber" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFB87A" />
            <stop offset="100%" stopColor="#FF6A1A" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#vc-amber)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${len} ${circ}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ filter: 'drop-shadow(0 0 6px rgba(255,162,74,0.6))' }}
          animate={{ strokeDasharray: `${len} ${circ}` }}
          transition={{ type: 'spring', stiffness: 140, damping: 22 }}
        />
      </svg>
      <div style={ringCenter}>
        <motion.div
          animate={{ scale: 1 + accuracy * 0.05 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          style={pitchNum}
        >
          {Math.round(accuracy * 100)}
        </motion.div>
        <Mic size={10} color="rgba(255,246,236,0.5)" strokeWidth={2.3} />
      </div>
    </div>
  )
}

const ringCenter = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 3,
}
const pitchNum = {
  fontSize: 24,
  fontWeight: 600,
  color: '#fff6ec',
  textShadow: '0 0 12px rgba(255,162,74,0.5)',
}

const styles = {
  wrap: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(120% 80% at 50% 30%, #6B2A0E 0%, #2A0F05 65%, #120602 100%)',
    display: 'flex',
    flexDirection: 'column',
  },
  back: {
    position: 'absolute',
    top: 52,
    left: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    background: 'rgba(255,255,255,0.08)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 20,
  },
  proBadge: {
    position: 'absolute',
    top: 52,
    right: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    padding: '3px 8px',
    borderRadius: 999,
    background: 'rgba(255,193,74,0.15)',
    border: '1px solid rgba(255,193,74,0.5)',
    color: '#FFC14A',
    fontSize: 8,
    fontWeight: 700,
    letterSpacing: 1,
    zIndex: 20,
  },
  pane: {
    position: 'absolute',
    inset: 0,
    paddingTop: 52,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 600,
    color: '#fff6ec',
  },
  subtitle: {
    fontSize: 10,
    color: 'rgba(255,246,236,0.55)',
    marginTop: 2,
    marginBottom: 10,
  },
  modes: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    width: '100%',
  },
  modeBtn: {
    appearance: 'none',
    width: '100%',
    minHeight: 36,
    padding: '6px 10px',
    borderRadius: 10,
    border: '1px solid',
    color: '#fff6ec',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'left',
  },
  modeText: { display: 'flex', flexDirection: 'column' },
  modeLabel: { fontSize: 11, fontWeight: 600 },
  modeHint: { fontSize: 8, color: 'rgba(255,246,236,0.55)', marginTop: 1 },
  modeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    background: '#FFA24A',
    boxShadow: '0 0 8px #FFA24A',
  },
  cta: {
    width: '100%',
    height: 36,
    borderRadius: 10,
    appearance: 'none',
    border: '1px solid #FFA24A',
    background: 'linear-gradient(180deg, rgba(255,162,74,0.9), rgba(255,106,26,0.9))',
    color: '#fff6ec',
    fontSize: 12,
    fontWeight: 600,
    marginTop: 'auto',
    boxShadow: '0 0 18px rgba(255,162,74,0.4)',
    cursor: 'pointer',
  },
  feedback: {
    fontSize: 11,
    fontWeight: 500,
    color: '#FFB87A',
    textShadow: '0 0 8px rgba(255,184,122,0.4)',
    marginBottom: 8,
  },
  procTitle: {
    marginTop: 'auto',
    fontSize: 15,
    fontWeight: 500,
    color: '#fff6ec',
  },
  spinner: {
    marginTop: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    border: '3px solid rgba(255,162,74,0.2)',
    borderTopColor: '#FFA24A',
  },
  procHint: {
    marginTop: 10,
    fontSize: 10,
    color: 'rgba(255,246,236,0.55)',
    marginBottom: 'auto',
  },
}
