'use client';

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

const MSM_COLORS = ["#153E9F", "#4169E1", "#60A5FA", "#1E40AF"];

interface ActiveCell {
  key: string;
  row: number;
  col: number;
  color: string;
  id: number;
}

const COLS = 20;
const ROWS = 12;

export function GridHoverBg() {
  const [activeCells, setActiveCells] = useState<ActiveCell[]>([]);
  const lastCellRef = useRef<string>("");
  const counterRef = useRef<number>(0);

  const handleComplete = useCallback((id: number) => {
    setActiveCells((prev) => prev.filter((c) => c.id !== id));
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const col = Math.min(COLS - 1, Math.max(0, Math.floor((e.clientX / w) * COLS)));
      const row = Math.min(ROWS - 1, Math.max(0, Math.floor((e.clientY / h) * ROWS)));
      const cellKey = `${row}-${col}`;

      if (lastCellRef.current === cellKey) return;
      lastCellRef.current = cellKey;

      const id = ++counterRef.current;
      const color = MSM_COLORS[(row + col) % MSM_COLORS.length]!;

      setActiveCells((prev) => {
        const trimmed = prev.length > 28 ? prev.slice(prev.length - 28) : prev;
        return [...trimmed, { key: cellKey, row, col, color, id }];
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Subtle static grid lines */}
      <div
        className="grid size-full"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: COLS * ROWS }).map((_, idx) => (
          <div key={idx} className="border-[0.5px] border-[#153E9F]/[0.04]" />
        ))}
      </div>

      {/* Blurred mouse-reactive MSM color boxes */}
      <div
        className="absolute inset-0 grid size-full blur-[10px]"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
        }}
      >
        <AnimatePresence>
          {activeCells.map((cell) => (
            <motion.div
              key={cell.id}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: [0, 0.42, 0.25, 0], scale: [0.75, 1, 1.12, 1.2] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              onAnimationComplete={() => handleComplete(cell.id)}
              style={{
                gridColumnStart: cell.col + 1,
                gridRowStart: cell.row + 1,
                backgroundColor: cell.color,
                borderRadius: 6,
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
