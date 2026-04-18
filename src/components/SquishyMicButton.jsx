import { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Square } from "lucide-react";

/**
 * ZAP — Squishy Glassmorphic Mic Button
 *
 * Interaction model:
 *  - whileTap: scale → 1.15, spring (mass:1, stiffness:300, damping:15)
 *  - whileTap: amber inner glow + outer bloom intensity +30%
 *  - onRelease: overshoot to 0.95 → settle 1.0 (handled by the spring exit)
 *  - Glassmorphism (backdrop-blur + low-opacity stroke) is preserved through the entire scale
 *  - Mic icon scales proportionally because it's a child of the scaling parent
 */

// Amber palette pulled from the ZAP UI
const AMBER = {
  glow: "#FFB07A",        // warm bloom hex
  glowStrong: "#FF8A3C",  // pressed bloom
  inner: "#FFCFA0",       // ambient internal halo
  innerStrong: "#FFE0B8", // pressed internal halo
  rim: "rgba(255, 200, 150, 0.55)",
};

// Spring configs — the "squish" feel comes from these numbers
const PRESS_SPRING = { type: "spring", mass: 1, stiffness: 300, damping: 15 };
const RELEASE_SPRING = { type: "spring", mass: 1, stiffness: 420, damping: 12 }; // looser damping → overshoot

function SquishyButton({ icon: Icon, ariaLabel, onTap, variant = "mic" }) {
  const [pressed, setPressed] = useState(false);

  // Bloom + inner glow strings — toggled by `pressed`
  const bloomColor = variant === "stop" ? AMBER.glowStrong : AMBER.glow;
  const ambient = `
    0 0 18px 2px ${bloomColor}44,
    0 0 36px 6px ${bloomColor}22,
    inset 0 0 14px 2px ${AMBER.inner}30
  `;
  const pressedShadow = `
    0 0 28px 6px ${bloomColor}77,
    0 0 56px 14px ${bloomColor}44,
    inset 0 0 22px 4px ${AMBER.innerStrong}55
  `;

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      // Initial visual state
      initial={{ scale: 1, boxShadow: ambient }}
      // While pressed: 1.15x squish + intensified bloom
      whileTap={{
        scale: 1.15,
        boxShadow: pressedShadow,
        transition: PRESS_SPRING,
      }}
      // Release: bounce back via spring with overshoot keyframes (1.15 → 0.95 → 1.0)
      animate={
        pressed
          ? { scale: 1.15, boxShadow: pressedShadow }
          : { scale: [1.15, 0.95, 1], boxShadow: ambient }
      }
      transition={pressed ? PRESS_SPRING : RELEASE_SPRING}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => {
        setPressed(false);
        onTap?.();
      }}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      style={{
        // Glassmorphism — preserved across the whole scale because it lives on the same element
        WebkitBackdropFilter: "blur(14px) saturate(140%)",
        backdropFilter: "blur(14px) saturate(140%)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)",
        border: `1px solid ${AMBER.rim}`,
        borderRadius: "9999px",
        width: 88,
        height: 88,
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        // willChange tells the compositor to keep this on its own layer (smoother)
        willChange: "transform, box-shadow",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Icon scales with parent automatically. Color picks up amber tint when pressed. */}
      <motion.span
        animate={{ color: pressed ? "#FFFFFF" : "#FFF6EC" }}
        transition={{ duration: 0.15 }}
        style={{ display: "grid", placeItems: "center" }}
      >
        <Icon size={34} strokeWidth={2.2} />
      </motion.span>
    </motion.button>
  );
}

export default function SquishyMicDemo() {
  return (
    <div
      style={{
        // ZAP-style warm radial backdrop so you can see the bloom against context
        minHeight: "100vh",
        background:
          "radial-gradient(120% 80% at 50% 30%, #6B2A0E 0%, #2A0F05 65%, #120602 100%)",
        display: "grid",
        placeItems: "center",
        gap: 48,
        gridAutoFlow: "column",
        fontFamily: "ui-sans-serif, system-ui, -apple-system",
        color: "#FFE9D2",
      }}
    >
      {/* Ambient pulse halo behind the button — a separate layer so its glow doesn't clip */}
      <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
        <motion.div
          aria-hidden
          animate={{ opacity: [0.55, 0.8, 0.55] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "9999px",
            background:
              `radial-gradient(circle, ${AMBER.glow}55 0%, ${AMBER.glow}22 40%, transparent 70%)`,
            filter: "blur(8px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.75 }}>Tap to record</p>
          <SquishyButton icon={Mic} ariaLabel="Record voice prompt" />
        </div>
      </div>

      {/* Stop / confirm variant — stronger bloom for the "active recording" state */}
      <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
        <motion.div
          aria-hidden
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.06, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "9999px",
            background:
              `radial-gradient(circle, ${AMBER.glowStrong}66 0%, ${AMBER.glowStrong}22 40%, transparent 70%)`,
            filter: "blur(10px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.75 }}>Recording — tap to stop</p>
          <SquishyButton icon={Square} ariaLabel="Stop recording" variant="stop" />
        </div>
      </div>
    </div>
  );
}
