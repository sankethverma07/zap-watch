import { User } from 'lucide-react'

/**
 * The watch status bar at y=0–45: user icon left, time right.
 * Matches the ZAP design-guidelines spec.
 */
export default function StatusBar({ time = '1:45' }) {
  return (
    <div style={styles.bar}>
      <div style={styles.userIcon}>
        <User size={12} strokeWidth={2.5} color="#fff6ec" />
      </div>
      <span style={styles.time}>{time}</span>
    </div>
  )
}

const styles = {
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 45 * 1.8,
    padding: '0 14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    pointerEvents: 'none',
  },
  userIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    background: 'rgba(255,255,255,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 14,
    fontWeight: 500,
    color: '#fff6ec',
    letterSpacing: 0.2,
  },
}
