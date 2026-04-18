import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Save } from 'lucide-react'
import StatusBar from '../components/StatusBar'

/**
 * Toast confirmation that the session was saved to localStorage.
 * Auto-advances back to /home after ~1.4s.
 */
export default function SaveResults() {
  const navigate = useNavigate()
  const location = useLocation()
  const score = location.state?.score ?? null

  useEffect(() => {
    const t = setTimeout(() => navigate('/home', { replace: true }), 1400)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div style={styles.wrap}>
      <StatusBar />
      <motion.div
        style={styles.badge}
        initial={{ scale: 0, rotate: -8 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 240, damping: 14 }}
      >
        <Save size={22} color="#fff" strokeWidth={2.4} />
      </motion.div>

      <motion.div
        style={styles.title}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        Results saved
      </motion.div>

      {score != null && (
        <motion.div
          style={styles.scorePill}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          Score · <span style={styles.scoreNum}>{score}</span>
        </motion.div>
      )}

      <motion.div
        style={styles.subtitle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 0.35 }}
      >
        Synced to your profile
      </motion.div>
    </div>
  )
}

const styles = {
  wrap: {
    position: 'absolute',
    inset: 0,
    paddingTop: 52,
    background:
      'radial-gradient(circle at 50% 35%, rgba(107,212,157,0.18), transparent 65%), #0a0a0c',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    background: 'linear-gradient(180deg, #6BD49D, #3EAE78)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 24px rgba(62, 174, 120, 0.45)',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    color: '#fff6ec',
    letterSpacing: -0.2,
  },
  scorePill: {
    fontSize: 10,
    fontWeight: 500,
    color: '#fff6ec',
    padding: '4px 10px',
    borderRadius: 999,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  scoreNum: {
    color: '#FFA24A',
    fontWeight: 700,
    marginLeft: 3,
  },
  subtitle: {
    fontSize: 10,
    color: 'rgba(255,246,236,0.55)',
    marginTop: 2,
  },
}
