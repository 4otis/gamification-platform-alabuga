import React, { useRef, useEffect, useMemo } from "react";

export default function ChaoticPixelsBackground({
  pixelSize = 6,
  color = "#00aaff",
  speed = 800,
  intensity = 0.12,
  className = "",
}) {
  const canvasRef = useRef(null);
  const cellsRef = useRef([]);
  const animRef = useRef(null);

  const colorPicker = useMemo(() => {
    if (Array.isArray(color)) {
      return (i) => color[i % color.length];
    }
    return () => color;
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;

    function resize() {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / pixelSize);
      rows = Math.ceil(height / pixelSize);

      const totalCells = cols * rows;
      if (cellsRef.current.length !== totalCells) {
        cellsRef.current = Array.from({ length: totalCells }, () => ({ alpha: 0, target: 0 }));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      const dt = 16; // фиксированное приближение ~60fps
      const lambda = dt / Math.max(1, speed);
      const spawnProbability = intensity * 0.05;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const cell = cellsRef.current[idx];

          if (Math.random() < spawnProbability) {
            cell.target = 1;
          } else if (cell.target === 1 && Math.random() < 0.01) {
            cell.target = 0;
          }

          cell.alpha += (cell.target - cell.alpha) * lambda;
          if (cell.alpha < 0.01) cell.alpha = 0;
          if (cell.alpha > 0.99) cell.alpha = 1;

          if (cell.alpha > 0) {
            ctx.globalAlpha = cell.alpha;
            ctx.fillStyle = colorPicker(idx);
            ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize, pixelSize);
          }
        }
      }

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [pixelSize, speed, intensity, colorPicker]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      aria-hidden={true}
      style={{position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0, // Вот ключевое изменение
        }}
    />
  );
}
