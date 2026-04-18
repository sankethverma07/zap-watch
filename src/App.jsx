import { Routes, Route, Navigate } from 'react-router-dom'
import WatchFrame from './components/WatchFrame.jsx'
import Splash from './screens/Splash.jsx'
import Home from './screens/Home.jsx'
import Casual from './screens/Casual.jsx'
import Profile from './screens/Profile.jsx'
import History from './screens/History.jsx'
import GoPro from './screens/GoPro.jsx'
import Payment from './screens/Payment.jsx'
import Pro from './screens/Pro.jsx'
import VocalCoach from './screens/VocalCoach.jsx'
import SaveResults from './screens/SaveResults.jsx'

/**
 * The whole ZAP watch experience lives inside a single WatchFrame.
 * react-router swaps the inner screen based on path; AnimatePresence in
 * WatchFrame cross-fades between them.
 */
export default function App() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.titleRow}>
          <span style={styles.dot} />
          <h1 style={styles.title}>ZAP — Watch Prototype</h1>
        </div>
        <p style={styles.subtitle}>
          Live React build of the Figma flows. Tap around — your sessions, profile and Pro state persist locally.
        </p>
      </header>

      <div style={styles.stage}>
        <WatchFrame>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/home" element={<Home />} />
            <Route path="/casual" element={<Casual />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="/go-pro" element={<GoPro />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/pro" element={<Pro />} />
            <Route path="/vocal-coach" element={<VocalCoach />} />
            <Route path="/save-results" element={<SaveResults />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </WatchFrame>
      </div>

      <footer style={styles.footer}>
        <span>Built from Figma file U2wgsC4FY4U3fcAqdNztIC</span>
        <span>·</span>
        <span>React + Vite + Framer Motion</span>
      </footer>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    width: '100%',
    padding: '40px 24px 60px',
    background:
      'radial-gradient(circle at 20% 0%, rgba(255,162,74,0.08), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,106,26,0.06), transparent 50%), #0a0a0a',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 32,
    boxSizing: 'border-box',
  },
  header: {
    textAlign: 'center',
    maxWidth: 540,
  },
  titleRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    background: '#FFA24A',
    boxShadow: '0 0 12px #FFA24A',
  },
  title: {
    fontSize: 28,
    fontWeight: 600,
    letterSpacing: -0.5,
    color: '#fff6ec',
    margin: 0,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 246, 236, 0.55)',
    lineHeight: 1.5,
    margin: 0,
  },
  stage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0',
  },
  footer: {
    marginTop: 'auto',
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    fontSize: 12,
    color: 'rgba(255, 246, 236, 0.3)',
  },
}
