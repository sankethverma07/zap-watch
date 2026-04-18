import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Mic, Crown } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import { useApp } from '../state/AppContext'

function formatDate(iso) {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now - d
  const diffMin = Math.floor(diffMs / 60000)
  const diffH = Math.floor(diffMin / 60)
  const diffD = Math.floor(diffH / 24)
  if (diffMin < 1) return 'just now'
  if (diffMin < 60) return `${diffMin}m ago`
  if (diffH < 24) return `${diffH}h ago`
  if (diffD < 7) return `${diffD}d ago`
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export default function History() {
  const navigate = useNavigate()
  const { state } = useApp()
  const sessions = [...state.sessions].reverse()

  return (
    <div style={styles.wrap}>
      <StatusBar />
      <button onClick={() => navigate('/home')} style={styles.back} aria-label="back">
        <ArrowLeft size={14} color="#fff6ec" />
      </button>
      <div style={styles.title}>History</div>

      {sessions.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>📓</div>
          <div style={styles.emptyTitle}>No sessions yet</div>
          <div style={styles.emptySubtitle}>Your training history will show up here.</div>
        </div>
      ) : (
        <div style={styles.list}>
          {sessions.slice(0, 5).map((s, i) => (
            <motion.div
              key={s.id}
              style={styles.row}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div style={{ ...styles.iconWell, background: s.type === 'vocal-coach' ? '#FFC14A22' : '#FFA24A22', borderColor: s.type === 'vocal-coach' ? '#FFC14A55' : '#FFA24A55' }}>
                {s.type === 'vocal-coach' ? <Crown size={11} color="#FFC14A" strokeWidth={2.3} /> : <Mic size={11} color="#FFA24A" strokeWidth={2.3} />}
              </div>
              <div style={styles.rowMid}>
                <div style={styles.rowTitle}>{s.type === 'vocal-coach' ? 'Vocal Coach' : 'Training'}</div>
                <div style={styles.rowMeta}>{formatDate(s.at)}</div>
              </div>
              <div style={styles.score}>{s.score}</div>
            </motion.div>
          ))}
        </div>
      )}
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
    paddingBottom: 12,
    background:
      'radial-gradient(circle at 50% 30%, rgba(155,140,255,0.08), transparent 65%), #0a0a0c',
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
  },
  title: {
    fontSize: 15,
    fontWeight: 600,
    color: '#fff6ec',
    textAlign: 'center',
    marginBottom: 10,
  },
  empty: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    textAlign: 'center',
  },
  emptyIcon: { fontSize: 32, marginBottom: 6 },
  emptyTitle: { fontSize: 13, color: '#fff6ec', fontWeight: 500 },
  emptySubtitle: { fontSize: 10, color: 'rgba(255,246,236,0.5)', marginTop: 3, lineHeight: 1.4 },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    overflowY: 'auto',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    padding: '8px 10px',
    borderRadius: 12,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
  },
  iconWell: {
    width: 24,
    height: 24,
    borderRadius: 12,
    border: '1px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  rowMid: { flex: 1, minWidth: 0 },
  rowTitle: { fontSize: 11, fontWeight: 500, color: '#fff6ec' },
  rowMeta: { fontSize: 9, color: 'rgba(255,246,236,0.5)', marginTop: 1 },
  score: {
    fontSize: 14,
    fontWeight: 600,
    color: '#FFA24A',
  },
}
