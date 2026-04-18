import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Flame, TrendingUp } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import { useApp } from '../state/AppContext'

export default function Profile() {
  const navigate = useNavigate()
  const { state } = useApp()
  const { proficiency, baseline, streak } = state.profile
  const improvement = proficiency - baseline
  const improvementLabel = (improvement >= 0 ? '+' : '') + improvement + '%'

  const RING = 76
  const STROKE = 6
  const radius = (RING - STROKE) / 2
  const circ = 2 * Math.PI * radius
  const dash = (proficiency / 100) * circ

  return (
    <div style={styles.wrap}>
      <StatusBar />
      <button onClick={() => navigate('/home')} style={styles.back} aria-label="back">
        <ArrowLeft size={14} color="#fff6ec" />
      </button>
      <div style={styles.title}>Profile</div>

      <div style={styles.ringWrap}>
        <svg width={RING} height={RING} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={RING / 2} cy={RING / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={STROKE} />
          <motion.circle
            cx={RING / 2}
            cy={RING / 2}
            r={radius}
            fill="none"
            stroke="#FFA24A"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - dash }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          />
        </svg>
        <div style={styles.ringCenter}>
          <div style={styles.proficiencyNum}>{proficiency}</div>
          <div style={styles.proficiencyLabel}>PROFICIENCY</div>
        </div>
      </div>

      <div style={styles.stats}>
        <div style={styles.stat}>
          <TrendingUp size={11} color="#6BD49D" strokeWidth={2.5} />
          <span style={styles.statValue}>{improvementLabel}</span>
          <span style={styles.statLabel}>growth</span>
        </div>
        <div style={styles.statDivider} />
        <div style={styles.stat}>
          <Flame size={11} color="#FFA24A" strokeWidth={2.5} />
          <span style={styles.statValue}>{streak}d</span>
          <span style={styles.statLabel}>streak</span>
        </div>
        <div style={styles.statDivider} />
        <div style={styles.stat}>
          <span style={styles.statValue}>{state.sessions.length}</span>
          <span style={styles.statLabel}>sessions</span>
        </div>
      </div>

      <div style={styles.badgeRow}>
        {['🏅', '🔥', state.isPro ? '👑' : '✨'].map((b, i) => (
          <motion.div
            key={i}
            style={styles.badge}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 200 }}
          >
            {b}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  wrap: {
    position: 'absolute',
    inset: 0,
    paddingTop: 48,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 14,
    background:
      'radial-gradient(circle at 50% 30%, rgba(90,168,255,0.1), transparent 65%), #0a0a0c',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  },
  title: {
    fontSize: 15,
    fontWeight: 600,
    color: '#fff6ec',
    marginBottom: 12,
  },
  ringWrap: {
    position: 'relative',
    width: 76,
    height: 76,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  ringCenter: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  proficiencyNum: {
    fontSize: 22,
    fontWeight: 600,
    color: '#fff6ec',
    lineHeight: 1,
  },
  proficiencyLabel: {
    fontSize: 7,
    letterSpacing: 1.2,
    color: 'rgba(255,246,236,0.55)',
    marginTop: 2,
    fontWeight: 500,
  },
  stats: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 10px',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 14,
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
  },
  statValue: {
    fontSize: 12,
    fontWeight: 600,
    color: '#fff6ec',
  },
  statLabel: {
    fontSize: 8,
    color: 'rgba(255,246,236,0.5)',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  statDivider: {
    width: 1,
    height: 22,
    background: 'rgba(255,255,255,0.07)',
  },
  badgeRow: {
    display: 'flex',
    gap: 8,
    marginTop: 'auto',
  },
  badge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
  },
}
