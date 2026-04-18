import React from 'react'
import VocalCoachWorkflow from './components/VocalCoachWorkflow.jsx'
import SquishyMicButton from './components/SquishyMicButton.jsx'

export default function App() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>ZAP — Watch Prototype</h1>
        <p style={styles.subtitle}>
          Live React preview of the two hero flows shipped in the Figma file.
        </p>
      </header>

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.badge}>01</span>
          <div>
            <h2 style={styles.sectionTitle}>Vocal Coach</h2>
            <p style={styles.sectionCopy}>
              Listening → Coaching → Processing → Results → Done. The full 7-second walkthrough.
            </p>
          </div>
        </div>
        <div style={styles.stage}>
          <VocalCoachWorkflow />
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHeader}>
          <span style={styles.badge}>02</span>
          <div>
            <h2 style={styles.sectionTitle}>Squishy Mic Button</h2>
            <p style={styles.sectionCopy}>
              Press-and-hold interaction with the amber glow + 1.15 → 0.95 → 1.0 bounce.
            </p>
          </div>
        </div>
        <div style={styles.stage}>
          <SquishyMicButton />
        </div>
      </section>

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
    padding: '48px 24px 80px',
    background:
      'radial-gradient(circle at 20% 0%, rgba(255,162,74,0.08), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,106,26,0.06), transparent 50%), #0a0a0a',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 56,
  },
  header: {
    textAlign: 'center',
    maxWidth: 640,
  },
  title: {
    fontSize: 42,
    fontWeight: 600,
    letterSpacing: -0.5,
    color: '#fff6ec',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 246, 236, 0.55)',
    lineHeight: 1.5,
  },
  section: {
    width: '100%',
    maxWidth: 720,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 8,
    background: 'rgba(255, 162, 74, 0.18)',
    border: '1px solid #FFA24A',
    color: '#FFA24A',
    fontSize: 13,
    fontWeight: 600,
    flexShrink: 0,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 500,
    color: '#fff6ec',
    marginBottom: 4,
  },
  sectionCopy: {
    fontSize: 14,
    color: 'rgba(255, 246, 236, 0.5)',
    lineHeight: 1.5,
  },
  stage: {
    width: '100%',
    padding: '40px 24px',
    borderRadius: 24,
    background:
      'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    marginTop: 24,
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
    fontSize: 13,
    color: 'rgba(255, 246, 236, 0.3)',
  },
}
