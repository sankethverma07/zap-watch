import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Apple, CreditCard, Check } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import { useApp } from '../state/AppContext'

/**
 * 7-frame payment gateway matching Figma frames 27 → 16 → 17 → 18 → 19 → 20 → 28.
 * Frame 27: payment method select (Apple Pay / Use Credits)
 * Frames 16-20: "Payment processing.." with animated ellipsis
 * Frame 28: Done!
 */
export default function Payment() {
  const navigate = useNavigate()
  const { dispatch } = useApp()
  const [step, setStep] = useState('select')
  const [dots, setDots] = useState(1)

  // Animate the processing ellipsis through 5 stages (matching load frames 16-20)
  useEffect(() => {
    if (step !== 'processing') return
    let i = 0
    const interval = setInterval(() => {
      i++
      setDots(((i) % 5) + 1)
    }, 320)
    const done = setTimeout(() => {
      clearInterval(interval)
      setStep('success')
    }, 1800)
    return () => {
      clearInterval(interval)
      clearTimeout(done)
    }
  }, [step])

  useEffect(() => {
    if (step !== 'success') return
    dispatch({ type: 'SET_PRO' })
    const t = setTimeout(() => navigate('/pro', { replace: true }), 1400)
    return () => clearTimeout(t)
  }, [step, dispatch, navigate])

  return (
    <div style={styles.wrap}>
      <StatusBar />

      <AnimatePresence mode="wait">
        {step === 'select' && (
          <motion.div key="select" style={styles.pane} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={styles.label}>Payment method:</div>
            <motion.button
              style={styles.methodBtn}
              whileTap={{ scale: 0.96 }}
              onClick={() => setStep('processing')}
            >
              <Apple size={14} color="#fff6ec" strokeWidth={2.2} />
              <span>Apple Pay</span>
            </motion.button>
            <motion.button
              style={styles.methodBtn}
              whileTap={{ scale: 0.96 }}
              onClick={() => setStep('processing')}
            >
              <CreditCard size={13} color="#fff6ec" strokeWidth={2.2} />
              <span>Use Credits</span>
            </motion.button>
          </motion.div>
        )}

        {step === 'processing' && (
          <motion.div key="processing" style={styles.pane} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div style={styles.procHeader}>Please wait</div>
            <div style={styles.procBody}>
              Payment processing
              <span style={styles.procDots}>{'.'.repeat(dots)}</span>
            </div>
            <div style={styles.procSpinner}>
              <motion.div
                style={styles.procSpinnerArc}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div key="success" style={styles.pane} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <motion.div
              style={styles.checkBadge}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 14 }}
            >
              <Check size={24} color="#fff" strokeWidth={3} />
            </motion.div>
            <div style={styles.doneText}>Done!</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const styles = {
  wrap: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at 50% 50%, rgba(255,162,74,0.1), transparent 70%), #0a0a0c',
    display: 'flex',
    flexDirection: 'column',
  },
  pane: {
    position: 'absolute',
    inset: 0,
    paddingTop: 52,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 14,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 11,
    color: 'rgba(255,246,236,0.7)',
    marginBottom: 6,
  },
  methodBtn: {
    appearance: 'none',
    width: '100%',
    height: 40,
    borderRadius: 10,
    background: 'rgba(230,230,230,0.19)',
    border: '1px solid rgba(255,255,255,0.14)',
    color: '#fff6ec',
    fontSize: 12,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    cursor: 'pointer',
  },
  procHeader: {
    fontSize: 17.77,
    fontWeight: 500,
    color: '#fff6ec',
  },
  procBody: {
    fontSize: 17.77,
    fontWeight: 500,
    color: '#fff6ec',
    display: 'flex',
    alignItems: 'baseline',
  },
  procDots: {
    display: 'inline-block',
    width: 20,
    textAlign: 'left',
  },
  procSpinner: {
    marginTop: 12,
    width: 38,
    height: 38,
    position: 'relative',
  },
  procSpinnerArc: {
    position: 'absolute',
    inset: 0,
    borderRadius: 19,
    border: '3px solid rgba(255,162,74,0.2)',
    borderTopColor: '#FFA24A',
  },
  checkBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    background: 'linear-gradient(180deg, #6BD49D, #3EAE78)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 26px rgba(62, 174, 120, 0.45)',
  },
  doneText: {
    fontSize: 25,
    fontWeight: 500,
    color: '#fff',
  },
}
