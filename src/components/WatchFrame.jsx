import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

/**
 * The canonical 198×242 ZAP watch canvas, scaled up for web legibility.
 * Every screen renders INSIDE this frame so the simulator feels like a real watch.
 */
export default function WatchFrame({ children }) {
  const location = useLocation()
  return (
    <div style={outerStyle}>
      <div style={bezelStyle}>
        <div style={innerStyle}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              style={screenStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

const SCALE = 1.8
const outerStyle = {
  width: 198 * SCALE,
  height: 242 * SCALE,
  position: 'relative',
  filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.6))',
}
const bezelStyle = {
  position: 'absolute',
  inset: 0,
  padding: 4,
  borderRadius: 48,
  background: 'linear-gradient(135deg, #2a2a2e, #0a0a0c 60%, #1e1e22)',
  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 0 3px rgba(255,255,255,0.03)',
}
const innerStyle = {
  position: 'absolute',
  inset: 4,
  borderRadius: 44,
  overflow: 'hidden',
  background: '#000',
}
const screenStyle = {
  position: 'absolute',
  inset: 0,
  color: '#fff',
}
