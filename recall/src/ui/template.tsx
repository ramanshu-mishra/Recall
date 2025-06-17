import { useMemo } from "react";
import { motion } from "motion/react";

function getRandomColor() {
  const colors = [
    "#FFD166", "#06D6A0", "#EF476F", "#118AB2", "#FFB5E8",
    "#B28DFF", "#FFABAB", "#F6F7D7", "#A0E7E5", "#FFAEBC"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomBalls(num = 30) {
  return Array.from({ length: num }).map((_, i) => {
    const size = Math.random() * 60 + 30; // 30px to 90px
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const color = getRandomColor();
    const opacity = Math.random() * 0.3 + 0.5; // 0.5 to 0.8
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          top: `${top}%`,
          left: `${left}%`,
          width: size,
          height: size,
          background: color,
          borderRadius: "50%",
          opacity,
          filter: "blur(1px)",
          boxShadow: `0 2px 12px 0 ${color}80`,
          border: "3px solid #fff6",
          zIndex: 0,
        }}
      />
    );
  });
}

export function Landing({ children }: { children: React.ReactNode }) {
  const balls = useMemo(() => getRandomBalls(30), []);
  return (
    <motion.div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "#FFE0AE",
      }}
      className="overflow-hidden"
    >
      {/* Balls background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        {balls}
      </div>
      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </motion.div>
  );
}