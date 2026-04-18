import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

/**
 * Flow 1: start loading → load 1-5 → end loading → Home.
 * Recreates the Figma loading chain as a single animated React screen.
 */
export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/home', { replace: true }), 2400)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div style={styles.wrap}>
      <motion.div
        style={styles.glow}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.2, 1], opacity: [0, 0.8, 0.5] }}
        transition={{ duration: 1.8, times: [0, 0.5, 1] }}
      />

      <motion.div
        style={styles.logoRing}
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.55, ease: [0.2, 0.9, 0.3, 1.2] }}
      >
        <Zap size={48} color="#FFA24A" fill="#FFA24A" strokeWidth={0} />
      </motion.div>

      <motion.div
        style={styles.brand}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.35 }}
      >
        ZAP
      </motion.div>

      <motion.div
        style={styles.tagline}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        Spark your conversation.
      </motion.div>

      <div style={styles.dots}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            style={styles.dot}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}

const styles = {
  wrap: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    background:
      'radial-gradient(circle at 50% 45%, rgba(255,162,74,0.3), transparent 65%), #0a0a0c',
  },
  glow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    background:
      'radial-gradient(circle, rgba(255,162,74,0.55), rgba(255,106,26,0.2) 40%, transparent 70%)',
    filter: 'blur(8px)',
  },
  logoRing: {
    position: 'relative',
    width: 72,
    height: 72,
    borderRadius: 36,
    background: 'rgba(255, 162, 74, 0.12)',
    border: '1.5px solid rgba(255, 162, 74, 0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  brand: {
    position: 'relative',
    fontSize: 28,
    fontWeight: 600,
    letterSpacing: 4,
    color: '#fff6ec',
  },
  tagline: {
    position: 'relative',
    fontSize: 13,
    fontWeight: 500,
    color: '#fff6ec',
  },
  dots: {
    position: 'absolute',
    bottom: 42,
    display: 'flex',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    background: '#FFA24A',
  },
}
