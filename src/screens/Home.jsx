import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mic, User, History, Crown } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import { useApp } from '../state/AppContext'

export default function Home() {
  const navigate = useNavigate()
  const { state } = useApp()

  const tiles = [
    { label: 'Start Training', icon: Mic, accent: '#FFA24A', to: '/casual' },
    { label: 'View Profile', icon: User, accent: '#5AA8FF', to: '/profile' },
    { label: 'View History', icon: History, accent: '#9B8CFF', to: '/history' },
    state.isPro
      ? { label: 'Pro Unlocked', icon: Crown, accent: '#FFC14A', to: '/pro' }
      : { label: 'Go Pro', icon: Crown, accent: '#FF6A1A', to: '/go-pro' },
  ]

  return (
    <div style={styles.wrap}>
      <StatusBar />
      <div style={styles.header}>
        <div style={styles.greeting}>Hi, Sanketh</div>
        <div style={styles.subtitle}>What would you like to work on?</div>
      </div>
      <div style={styles.grid}>
        {tiles.map((t, i) => (
          <motion.button
            key={t.label}
            onClick={() => navigate(t.to)}
            style={{ ...styles.tile, borderColor: `${t.accent}55` }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.05 }}
          >
            <div style={{ ...styles.iconWell, background: `${t.accent}26`, borderColor: `${t.accent}66` }}>
              <t.icon size={14} color={t.accent} strokeWidth={2.2} />
            </div>
            <span style={styles.tileLabel}>{t.label}</span>
          </motion.button>
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
    background:
      'radial-gradient(circle at 50% 0%, rgba(255,162,74,0.12), transparent 60%), #0a0a0c',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    marginBottom: 14,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 600,
    color: '#fff6ec',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 11,
    color: 'rgba(255, 246, 236, 0.55)',
    marginTop: 3,
  },
  grid: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
    paddingBottom: 18,
  },
  tile: {
    appearance: 'none',
    borderRadius: 14,
    padding: '10px 10px',
    background: 'rgba(255,255,255,0.045)',
    border: '1px solid',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 6,
    minHeight: 62,
    color: '#fff6ec',
    textAlign: 'left',
  },
  iconWell: {
    width: 24,
    height: 24,
    borderRadius: 12,
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileLabel: {
    fontSize: 11,
    fontWeight: 500,
    lineHeight: 1.2,
  },
}
