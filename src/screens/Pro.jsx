import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Crown, Mic } from 'lucide-react'
import StatusBar from '../components/StatusBar'

export default function Pro() {
  const navigate = useNavigate()
  return (
    <div style={styles.wrap}>
      <StatusBar />
      <button onClick={() => navigate('/home')} style={styles.back} aria-label="back">
        <ArrowLeft size={14} color="#fff6ec" />
      </button>

      <motion.div
        style={styles.crownBadge}
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 12 }}
      >
        <Crown size={14} color="#FFC14A" fill="#FFC14A" strokeWidth={0} />
        <span>PRO</span>
      </motion.div>

      <div style={styles.title}>Pro Version</div>
      <div style={styles.subtitle}>Unlocked features</div>

      <motion.button
        style={styles.vcButton}
        onClick={() => navigate('/vocal-coach')}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div style={styles.vcIcon}>
          <Mic size={14} color="#FFA24A" strokeWidth={2.3} />
        </div>
        <div style={styles.vcText}>
          <div style={styles.vcTitle}>Vocal Coach</div>
          <div style={styles.vcSub}>Listening → Results</div>
        </div>
      </motion.button>

      <div style={styles.lockedHint}>More pro features coming soon.</div>
    </div>
  )
}

const styles = {
  wrap: {
    position: 'absolute',
    inset: 0,
    paddingTop: 52,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 12,
    background:
      'radial-gradient(circle at 50% 20%, rgba(255,193,74,0.14), transparent 60%), #0a0a0c',
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
  crownBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '5px 11px',
    borderRadius: 999,
    background: 'rgba(255,193,74,0.15)',
    border: '1px solid rgba(255,193,74,0.5)',
    color: '#FFC14A',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: '#fff6ec',
    letterSpacing: -0.2,
  },
  subtitle: {
    fontSize: 10,
    color: 'rgba(255,246,236,0.55)',
    marginBottom: 14,
  },
  vcButton: {
    appearance: 'none',
    width: '100%',
    padding: '11px 12px',
    borderRadius: 14,
    background: 'rgba(255,162,74,0.1)',
    border: '1px solid rgba(255,162,74,0.5)',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer',
    textAlign: 'left',
    boxShadow: '0 6px 18px rgba(255, 138, 60, 0.2)',
  },
  vcIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    background: 'rgba(255,162,74,0.2)',
    border: '1px solid rgba(255,162,74,0.55)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  vcText: { display: 'flex', flexDirection: 'column', gap: 1 },
  vcTitle: { fontSize: 12, fontWeight: 600, color: '#fff6ec' },
  vcSub: { fontSize: 9, color: 'rgba(255,246,236,0.55)' },
  lockedHint: {
    marginTop: 'auto',
    fontSize: 9,
    color: 'rgba(255,246,236,0.35)',
    textAlign: 'center',
  },
}
