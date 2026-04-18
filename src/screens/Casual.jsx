import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Mic, Coffee, Users, MessageCircle, Sparkles } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import { useApp } from '../state/AppContext'

/**
 * Start Training — carousel of casual conversation categories.
 * Picking one records a session and bounces to /save-results.
 */
const CATEGORIES = [
  { id: 'smalltalk', label: 'Small Talk', icon: Coffee, hint: 'Light, everyday chat' },
  { id: 'groups', label: 'Group Talk', icon: Users, hint: 'Speaking up in a group' },
  { id: 'opinions', label: 'Opinions', icon: MessageCircle, hint: 'Share what you think' },
  { id: 'storytime', label: 'Story Time', icon: Sparkles, hint: 'Tell a quick story' },
]

export default function Casual() {
  const navigate = useNavigate()
  const { dispatch } = useApp()
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('select') // select | recording | scoring

  const category = CATEGORIES[index]

  function start() {
    setPhase('recording')
    // Simulate recording → scoring → save
    setTimeout(() => setPhase('scoring'), 1600)
    setTimeout(() => {
      const score = 55 + Math.floor(Math.random() * 35) // 55-89
      dispatch({
        type: 'ADD_SESSION',
        session: {
          id: Date.now().toString(),
          type: 'casual',
          category: category.id,
          score,
          at: new Date().toISOString(),
        },
      })
      navigate('/save-results', { state: { score } })
    }, 2800)
  }

  return (
    <div style={styles.wrap}>
      <StatusBar />
      <button onClick={() => navigate('/home')} style={styles.back} aria-label="back">
        <ArrowLeft size={14} color="#fff6ec" />
      </button>

      <AnimatePresence mode="wait">
        {phase === 'select' && (
          <motion.div
            key="select"
            style={styles.pane}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div style={styles.title}>Training</div>
            <div style={styles.subtitle}>Pick a category</div>

            <div style={styles.carousel}>
              {CATEGORIES.map((c, i) => {
                const offset = i - index
                const isActive = offset === 0
                return (
                  <motion.button
                    key={c.id}
                    onClick={() => setIndex(i)}
                    style={{
                      ...styles.card,
                      zIndex: 10 - Math.abs(offset),
                    }}
                    animate={{
                      y: offset * 48,
                      scale: isActive ? 1 : 0.82,
                      opacity: Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.35,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                    whileTap={{ scale: isActive ? 0.96 : 0.8 }}
                  >
                    <div
                      style={{
                        ...styles.cardIcon,
                        background: isActive ? '#FFA24A22' : 'rgba(255,255,255,0.05)',
                        borderColor: isActive ? '#FFA24A66' : 'rgba(255,255,255,0.1)',
                      }}
                    >
                      <c.icon size={14} color={isActive ? '#FFA24A' : '#fff6ec99'} strokeWidth={2.3} />
                    </div>
                    <div style={styles.cardText}>
                      <div style={styles.cardLabel}>{c.label}</div>
                      {isActive && <div style={styles.cardHint}>{c.hint}</div>}
                    </div>
                  </motion.button>
                )
              })}
            </div>

            <div style={styles.dots}>
              {CATEGORIES.map((_, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.dot,
                    background: i === index ? '#FFA24A' : 'rgba(255,255,255,0.18)',
                    width: i === index ? 14 : 5,
                  }}
                />
              ))}
            </div>

            <motion.button
              onClick={start}
              style={styles.cta}
              whileTap={{ scale: 0.96 }}
            >
              <Mic size={12} color="#1a0f06" strokeWidth={2.4} />
              Start {category.label}
            </motion.button>
          </motion.div>
        )}

        {phase === 'recording' && (
          <motion.div
            key="recording"
            style={styles.pane}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={styles.pulseOuter}
              animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            <motion.div
              style={styles.micWell}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              <Mic size={22} color="#fff" strokeWidth={2.3} />
            </motion.div>
            <div style={styles.listenLabel}>Listening…</div>
            <div style={styles.listenHint}>{category.label}</div>
          </motion.div>
        )}

        {phase === 'scoring' && (
          <motion.div
            key="scoring"
            style={styles.pane}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              style={styles.spinnerTrack}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
            />
            <div style={styles.listenLabel}>Scoring…</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const styles = {
  wrap: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at 50% 30%, rgba(255,162,74,0.14), transparent 60%), #0a0a0c',
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
  pane: {
    position: 'absolute',
    inset: 0,
    paddingTop: 48,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 10,
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
    color: 'rgba(255,246,236,0.5)',
    marginTop: 2,
    marginBottom: 10,
  },
  carousel: {
    position: 'relative',
    width: '100%',
    height: 160,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: '85%',
    height: 44,
    borderRadius: 12,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '0 10px',
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    cursor: 'pointer',
    appearance: 'none',
    color: '#fff6ec',
    textAlign: 'left',
  },
  cardIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardText: { flex: 1, minWidth: 0 },
  cardLabel: { fontSize: 11, fontWeight: 600 },
  cardHint: { fontSize: 8, color: 'rgba(255,246,236,0.5)', marginTop: 1 },
  dots: {
    display: 'flex',
    gap: 4,
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 10,
  },
  dot: {
    height: 5,
    borderRadius: 3,
    transition: 'width 0.25s',
  },
  cta: {
    width: '100%',
    height: 36,
    borderRadius: 10,
    appearance: 'none',
    border: 'none',
    background: 'linear-gradient(180deg, #FFC14A, #FF8A3C)',
    color: '#1a0f06',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 0.2,
    marginTop: 'auto',
    boxShadow: '0 8px 22px rgba(255, 138, 60, 0.35)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  pulseOuter: {
    position: 'absolute',
    top: '40%',
    width: 120,
    height: 120,
    borderRadius: 60,
    background: 'radial-gradient(circle, rgba(255,162,74,0.5), transparent 70%)',
    transform: 'translateY(-50%)',
  },
  micWell: {
    position: 'relative',
    marginTop: 'auto',
    marginBottom: 6,
    width: 62,
    height: 62,
    borderRadius: 31,
    background: 'linear-gradient(180deg, #FFC14A, #FF6A1A)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 30px rgba(255, 106, 26, 0.55)',
  },
  listenLabel: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: 600,
    color: '#fff6ec',
  },
  listenHint: {
    fontSize: 10,
    color: 'rgba(255,246,236,0.5)',
    marginTop: 2,
    marginBottom: 'auto',
  },
  spinnerTrack: {
    marginTop: 'auto',
    width: 42,
    height: 42,
    borderRadius: 21,
    border: '3px solid rgba(255,162,74,0.2)',
    borderTopColor: '#FFA24A',
    marginBottom: 10,
  },
}
