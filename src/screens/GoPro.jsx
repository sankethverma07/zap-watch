import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Crown, Check } from 'lucide-react'
import StatusBar from '../components/StatusBar'

export default function GoPro() {
  const navigate = useNavigate()
  const perks = [
    'Vocal Coach workflow',
    'Unlimited training sessions',
    'Advanced analytics',
  ]

  return (
    <div style={styles.wrap}>
      <StatusBar />
      <button onClick={() => navigate('/home')} style={styles.back} aria-label="back">
        <ArrowLeft size={14} color="#fff6ec" />
      </button>

      <motion.div
        style={styles.crown}
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 12 }}
      >
        <Crown size={28} color="#FFC14A" fill="#FFC14A" strokeWidth={0} />
      </motion.div>

      <div style={styles.title}>ZAP Pro</div>
      <div style={styles.subtitle}>Level up your conversation</div>

      <div style={styles.perks}>
        {perks.map((p, i) => (
          <motion.div
            key={p}
            style={styles.perkRow}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
          >
            <Check size={10} color="#FFC14A" strokeWidth={3} />
            <span>{p}</span>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={() => navigate('/payment')}
        style={styles.cta}
        whileTap={{ scale: 0.96 }}
      >
        Upgrade — $4.99/mo
      </motion.button>
    </div>
  )
}

const styles = {
  wrap: {
    position: 'absolute',
    inset: 0,
    paddingTop: 56,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 12,
    background:
      'radial-gradient(circle at 50% 20%, rgba(255,193,74,0.18), transparent 60%), linear-gradient(160deg, #1a0f06 0%, #0a0a0c 55%)',
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
  crown: {
    width: 48,
    height: 48,
    borderRadius: 24,
    background: 'rgba(255, 193, 74, 0.15)',
    border: '1px solid rgba(255, 193, 74, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 19,
    fontWeight: 600,
    color: '#fff6ec',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 10,
    color: 'rgba(255,246,236,0.55)',
    marginTop: 2,
    marginBottom: 12,
  },
  perks: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    alignSelf: 'stretch',
    padding: '10px 12px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12,
    marginBottom: 14,
  },
  perkRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 10,
    color: '#fff6ec',
    fontWeight: 500,
  },
  cta: {
    width: '100%',
    height: 38,
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
  },
}
