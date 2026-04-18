import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft } from "lucide-react";

/**
 * ZAP — Vocal Coach workflow
 *
 * Screens (fluid Framer Motion transitions between them):
 *   1. Selection     → Bento grid: Warm-up / Pitch Check / Stamina (amber selected-state)
 *   2. Coaching      → Pitch Ring (SVG circle, stroke length = accuracy) + live feedback
 *   3. Processing    → "Analyzing your session.." (matches "Payment processing.." style)
 *   4. Done          → "Done!" with bounce scale-in
 *
 * Styling tokens come straight from the Figma inspection:
 *   - Apple Pay–style button: radius 10, fill rgba(230,230,230,0.19), Roboto Medium
 *   - Spark subtext: 13px Roboto Medium
 *   - Payment processing: 17.77px Roboto Medium
 *   - Done! headline: 25px Roboto Medium
 */

// ─── ZAP tokens ──────────────────────────────────────────────────────────────
const ZAP = {
  bg: "radial-gradient(120% 80% at 50% 30%, #6B2A0E 0%, #2A0F05 65%, #120602 100%)",
  amber: "#FFA24A",        // primary brand amber (ZAP glow)
  amberSoft: "#FFB87A",
  amberDeep: "#FF6A1A",
  glass: "rgba(230,230,230,0.19)",
  glassHi: "rgba(255,255,255,0.28)",
  stroke: "rgba(255,200,150,0.35)",
  text: "#FFF6EC",
  textDim: "rgba(255,246,236,0.6)",
};

const BTN_HEIGHT = 40;       // matches the pill-ish buttons in category/payment frames
const BTN_RADIUS = 10;       // matches Apple Pay corner radius
const FONT = "Roboto, ui-sans-serif, system-ui, -apple-system";

// Shared transitions
const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
};

const SCREENS = ["select", "coach", "processing", "done"];

// ─── App Shell (mimics the watch canvas) ────────────────────────────────────
export default function VocalCoachWorkflow() {
  const [screen, setScreen] = useState("select");
  const [mode, setMode] = useState("Pitch Check");

  // Auto-advance processing → done (mimics the payment frame's AFTER_TIMEOUT)
  useEffect(() => {
    if (screen !== "processing") return;
    const t = setTimeout(() => setScreen("done"), 2200);
    return () => clearTimeout(t);
  }, [screen]);

  // Auto-reset after done (optional demo loop)
  useEffect(() => {
    if (screen !== "done") return;
    const t = setTimeout(() => setScreen("select"), 2200);
    return () => clearTimeout(t);
  }, [screen]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#000",
        fontFamily: FONT,
      }}
    >
      {/* Watch-sized canvas — 198×242 matches the Figma frames */}
      <div
        style={{
          position: "relative",
          width: 396,
          height: 484,
          borderRadius: 48,
          overflow: "hidden",
          background: ZAP.bg,
          color: ZAP.text,
          boxShadow:
            `0 0 80px 0 ${ZAP.amber}22, inset 0 0 1px ${ZAP.glassHi}`,
          padding: 24,
          boxSizing: "border-box",
        }}
      >
        <StatusBar screen={screen} onBack={() => setScreen("select")} />

        <AnimatePresence mode="wait">
          {screen === "select" && (
            <SelectionScreen
              key="select"
              mode={mode}
              setMode={setMode}
              onStart={() => setScreen("coach")}
            />
          )}
          {screen === "coach" && (
            <CoachingScreen
              key="coach"
              mode={mode}
              onFinish={() => setScreen("processing")}
            />
          )}
          {screen === "processing" && <ProcessingScreen key="proc" />}
          {screen === "done" && <DoneScreen key="done" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Status bar (back chevron + time) ───────────────────────────────────────
function StatusBar({ screen, onBack }) {
  const canBack = screen === "coach";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
      }}
    >
      {canBack ? (
        <button
          onClick={onBack}
          style={{
            all: "unset",
            display: "flex",
            alignItems: "center",
            gap: 2,
            cursor: "pointer",
            color: ZAP.text,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <ChevronLeft size={16} /> Back
        </button>
      ) : (
        <span />
      )}
      <span style={{ fontSize: 14, color: ZAP.textDim }}>1:45</span>
    </div>
  );
}

// ─── 1. Selection Screen (Bento grid) ───────────────────────────────────────
const MODES = ["Warm-up", "Pitch Check", "Stamina"];

function SelectionScreen({ mode, setMode, onStart }) {
  return (
    <motion.div {...fade} style={{ display: "grid", gap: 14 }}>
      <h2
        style={{
          margin: 0,
          fontSize: 26,
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: "-0.01em",
        }}
      >
        Vocal <br /> Coach
      </h2>
      <p
        // matches "Spark your conversation." — 13px Roboto Medium
        style={{ margin: 0, fontSize: 13, fontWeight: 500, color: ZAP.textDim }}
      >
        Pick your session.
      </p>

      {/* Bento grid: 1-col of 3 cards that echo the Apple Pay button geometry */}
      <div style={{ display: "grid", gap: 10, marginTop: 4 }}>
        {MODES.map((m) => (
          <BentoPill
            key={m}
            label={m}
            selected={mode === m}
            onClick={() => setMode(m)}
          />
        ))}
      </div>

      {/* Start button — same height + radius as payment buttons */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={onStart}
        style={{
          marginTop: 6,
          height: BTN_HEIGHT,
          borderRadius: BTN_RADIUS,
          border: `1px solid ${ZAP.amber}`,
          background: `linear-gradient(180deg, ${ZAP.amber}cc, ${ZAP.amberDeep}cc)`,
          color: ZAP.text,
          fontFamily: FONT,
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: `0 0 18px ${ZAP.amber}66, inset 0 0 8px ${ZAP.amberSoft}55`,
        }}
      >
        Start {mode}
      </motion.button>
    </motion.div>
  );
}

function BentoPill({ label, selected, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      animate={{
        // Amber glow appears only when selected — matches the "Vocal Coach" highlight in category frame
        boxShadow: selected
          ? `0 0 22px ${ZAP.amber}66, inset 0 0 10px ${ZAP.amberSoft}55`
          : `0 0 0px ${ZAP.amber}00`,
        borderColor: selected ? ZAP.amber : "rgba(255,255,255,0.12)",
        backgroundColor: selected ? "rgba(255,162,74,0.18)" : ZAP.glass,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{
        height: BTN_HEIGHT,
        borderRadius: BTN_RADIUS,
        border: "1px solid",
        backdropFilter: "blur(10px) saturate(140%)",
        WebkitBackdropFilter: "blur(10px) saturate(140%)",
        color: ZAP.text,
        fontFamily: FONT,
        fontSize: 14,
        fontWeight: 500,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 14px",
      }}
    >
      <span>{label}</span>
      <AnimatePresence>
        {selected && (
          <motion.span
            key="dot"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            style={{
              width: 8,
              height: 8,
              borderRadius: "9999px",
              background: ZAP.amber,
              boxShadow: `0 0 10px ${ZAP.amber}`,
            }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// ─── 2. Active Coaching Screen (Pitch Ring) ─────────────────────────────────
function CoachingScreen({ mode, onFinish }) {
  // Simulated pitch accuracy — drives the ring stroke length + feedback text
  const [accuracy, setAccuracy] = useState(0.4);
  useEffect(() => {
    let raf;
    const tick = () => {
      // pink-noise-ish wobble between 0.15 and 1
      setAccuracy((a) => {
        const target = 0.2 + Math.random() * 0.8;
        return a + (target - a) * 0.08;
      });
      raf = setTimeout(tick, 180);
    };
    tick();
    return () => clearTimeout(raf);
  }, []);

  const feedback =
    accuracy > 0.8 ? "Perfect" : accuracy > 0.5 ? "Hold it" : accuracy > 0.3 ? "Too Low" : "Too High";
  const feedbackColor =
    accuracy > 0.8 ? ZAP.amber : accuracy > 0.5 ? ZAP.amberSoft : ZAP.textDim;

  return (
    <motion.div {...fade} style={{ display: "grid", gap: 14 }}>
      {/* Bento card — same radius + glass as Apple Pay */}
      <div
        style={{
          borderRadius: BTN_RADIUS * 2,
          background: ZAP.glass,
          border: `1px solid rgba(255,255,255,0.10)`,
          backdropFilter: "blur(14px) saturate(140%)",
          WebkitBackdropFilter: "blur(14px) saturate(140%)",
          padding: 20,
          display: "grid",
          placeItems: "center",
          gap: 12,
          position: "relative",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: ZAP.textDim }}>
          {mode}
        </p>

        <PitchRing accuracy={accuracy} />

        {/* Live feedback text — matches Spark subtext weight/size (13px Medium) */}
        <AnimatePresence mode="wait">
          <motion.p
            key={feedback}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 500,
              color: feedbackColor,
              textShadow: `0 0 10px ${feedbackColor}55`,
            }}
          >
            {feedback}
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={onFinish}
        style={{
          height: BTN_HEIGHT,
          borderRadius: BTN_RADIUS,
          border: `1px solid ${ZAP.amber}`,
          background: `linear-gradient(180deg, ${ZAP.amber}cc, ${ZAP.amberDeep}cc)`,
          color: ZAP.text,
          fontFamily: FONT,
          fontSize: 15,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: `0 0 18px ${ZAP.amber}66, inset 0 0 8px ${ZAP.amberSoft}55`,
        }}
      >
        Finish session
      </motion.button>
    </motion.div>
  );
}

// Pitch Ring: SVG circle whose stroke-dasharray is driven by accuracy.
// Amber box-shadow-style glow is done with an SVG <filter> for fidelity.
function PitchRing({ accuracy }) {
  const size = 170;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const len = Math.max(0, Math.min(1, accuracy)) * circ;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ display: "block" }}>
        <defs>
          <filter id="amberBloom" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 1  0 0 0 0 0.64  0 0 0 0 0.29  0 0 0 1 0"
            />
          </filter>
          <linearGradient id="amberGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={ZAP.amberSoft} />
            <stop offset="100%" stopColor={ZAP.amberDeep} />
          </linearGradient>
        </defs>

        {/* base track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />

        {/* glowing pitch arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#amberGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${len} ${circ}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ filter: `drop-shadow(0 0 8px ${ZAP.amber}) drop-shadow(0 0 16px ${ZAP.amberDeep}66)` }}
          animate={{ strokeDasharray: `${len} ${circ}` }}
          transition={{ type: "spring", stiffness: 140, damping: 22 }}
        />
      </svg>

      {/* center readout */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
        }}
      >
        <motion.span
          animate={{ scale: 1 + accuracy * 0.04 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          style={{
            fontSize: 34,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            textShadow: `0 0 14px ${ZAP.amber}88`,
          }}
        >
          {Math.round(accuracy * 100)}
        </motion.span>
      </div>
    </div>
  );
}

// ─── 3. Processing Screen (matches "Payment processing..") ──────────────────
function ProcessingScreen() {
  return (
    <motion.div
      {...fade}
      style={{
        display: "grid",
        placeItems: "center",
        gap: 16,
        paddingTop: 80,
      }}
    >
      <Spinner />
      <motion.p
        // same 17.77px Roboto Medium white treatment as the Figma Payment processing text
        style={{
          margin: 0,
          fontSize: 17.77,
          fontWeight: 500,
          color: ZAP.text,
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        Analyzing your session..
      </motion.p>
    </motion.div>
  );
}

function Spinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      style={{
        width: 54,
        height: 54,
        borderRadius: "9999px",
        border: `3px solid ${ZAP.amber}22`,
        borderTopColor: ZAP.amber,
        boxShadow: `0 0 18px ${ZAP.amber}55`,
      }}
    />
  );
}

// ─── 4. Done! Screen (bounce-in check, matches Done! style) ─────────────────
function DoneScreen() {
  return (
    <motion.div
      {...fade}
      style={{
        display: "grid",
        placeItems: "center",
        gap: 18,
        paddingTop: 70,
      }}
    >
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 1.15, 0.95, 1], opacity: 1 }}
        transition={{ duration: 0.7, times: [0, 0.45, 0.75, 1], ease: "easeOut" }}
        style={{
          width: 72,
          height: 72,
          borderRadius: "9999px",
          display: "grid",
          placeItems: "center",
          background: `linear-gradient(180deg, ${ZAP.amber}, ${ZAP.amberDeep})`,
          boxShadow: `0 0 24px ${ZAP.amber}99, inset 0 0 14px ${ZAP.amberSoft}99`,
          color: "#2A0F05",
        }}
      >
        <Check size={36} strokeWidth={3} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        // 25px Roboto Medium white — matches the Figma "Done!" text
        style={{ margin: 0, fontSize: 25, fontWeight: 500, color: ZAP.text }}
      >
        Done!
      </motion.h2>
    </motion.div>
  );
}
