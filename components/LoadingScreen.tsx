"use client";

import { useEffect, useRef } from "react";

type LoadingScreenProps = {
  onComplete: () => void;
};

type HexCoord = {
  col: number;
  row: number;
};

type HexParticle = {
  targetX: number;
  targetY: number;
  x: number;
  y: number;
  radius: number;
  alpha: number;
  delay: number;
  scatterVx: number;
  scatterVy: number;
  scattered: boolean;
};

type LoaderState = {
  startTime: number;
  phase: "fly" | "hold" | "scatter";
  completed: boolean;
  hexes: HexParticle[];
  adjacency: Array<[number, number]>;
  centerX: number;
  centerY: number;
  hexRadius: number;
  pulseIndex: number;
  pulseStart: number;
};

const ACCENT = "#39FF14";
const FILL = "#0d0d0d";
const STROKE = ACCENT;
const FLY_DURATION = 2200;
const HOLD_END = 3000;
const TOTAL_DURATION = 4000;

const dCoords: HexCoord[] = [
  ...[0, 1, 2, 3].map((col) => ({ col, row: 0 })),
  { col: 0, row: 1 },
  { col: 4, row: 1 },
  { col: 0, row: 2 },
  { col: 5, row: 2 },
  { col: 0, row: 3 },
  { col: 5, row: 3 },
  { col: 0, row: 4 },
  { col: 5, row: 4 },
  { col: 0, row: 5 },
  { col: 4, row: 5 },
  ...[0, 1, 2, 3].map((col) => ({ col, row: 6 })),
];

const sCoords: HexCoord[] = [
  ...[7, 8, 9, 10, 11].map((col) => ({ col, row: 0 })),
  { col: 7, row: 1 },
  { col: 7, row: 2 },
  ...[7, 8, 9, 10, 11].map((col) => ({ col, row: 3 })),
  { col: 11, row: 4 },
  { col: 11, row: 5 },
  ...[7, 8, 9, 10, 11].map((col) => ({ col, row: 6 })),
];

const pattern = [...dCoords, ...sCoords];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const getOutsideStart = (width: number, height: number) => {
  const edge = Math.floor(Math.random() * 4);
  const margin = 120;

  if (edge === 0) {
    return { x: randomBetween(0, width), y: -margin };
  }

  if (edge === 1) {
    return { x: width + margin, y: randomBetween(0, height) };
  }

  if (edge === 2) {
    return { x: randomBetween(0, width), y: height + margin };
  }

  return { x: -margin, y: randomBetween(0, height) };
};

const hexPoint = (cx: number, cy: number, radius: number, index: number) => {
  const angle = (Math.PI / 3) * index;

  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius,
  };
};

const drawHexPath = (
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
) => {
  const first = hexPoint(cx, cy, radius, 0);

  ctx.beginPath();
  ctx.moveTo(first.x, first.y);

  for (let i = 1; i < 6; i += 1) {
    const point = hexPoint(cx, cy, radius, i);
    ctx.lineTo(point.x, point.y);
  }

  ctx.closePath();
};

const drawHex = (
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  fillColor: string,
  strokeColor: string,
  alpha: number,
) => {
  ctx.save();
  ctx.globalAlpha = alpha;
  drawHexPath(ctx, cx, cy, radius);
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1;
  ctx.globalAlpha = alpha * 0.8;
  ctx.stroke();

  ctx.globalAlpha = alpha;
  drawHexPath(ctx, cx - radius * 0.12, cy - radius * 0.12, radius * 0.6);
  ctx.strokeStyle = "rgba(255,255,255,0.06)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.restore();
};

const drawSpacedText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  spacing: number,
) => {
  const chars = text.split("");
  const width =
    chars.reduce((total, char) => total + ctx.measureText(char).width, 0) +
    spacing * Math.max(0, chars.length - 1);
  let currentX = x - width / 2;

  for (const char of chars) {
    ctx.fillText(char, currentX, y);
    currentX += ctx.measureText(char).width + spacing;
  }
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const stateRef = useRef<LoaderState | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return;
    }

    const buildState = (startTime: number): LoaderState => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const hexRadius = width < 768 ? 13 : 18;
      const rawPoints = pattern.map(({ col, row }) => ({
        x: col * (hexRadius * 1.75),
        y: row * (hexRadius * 1.52) + (col % 2 === 1 ? hexRadius * 0.76 : 0),
      }));
      const minX = Math.min(...rawPoints.map((point) => point.x));
      const maxX = Math.max(...rawPoints.map((point) => point.x));
      const minY = Math.min(...rawPoints.map((point) => point.y));
      const maxY = Math.max(...rawPoints.map((point) => point.y));
      const centerX = width / 2;
      const centerY = height / 2 - hexRadius;
      const offsetX = centerX - (minX + maxX) / 2;
      const offsetY = centerY - (minY + maxY) / 2;
      const targets = rawPoints.map((point) => ({
        x: point.x + offsetX,
        y: point.y + offsetY,
      }));
      const adjacency: Array<[number, number]> = [];

      for (let i = 0; i < targets.length; i += 1) {
        for (let j = i + 1; j < targets.length; j += 1) {
          const distance = Math.hypot(
            targets[i].x - targets[j].x,
            targets[i].y - targets[j].y,
          );

          if (distance < hexRadius * 2.1) {
            adjacency.push([i, j]);
          }
        }
      }

      return {
        startTime,
        phase: "fly",
        completed: false,
        hexRadius,
        centerX,
        centerY,
        pulseIndex: 0,
        pulseStart: startTime,
        adjacency,
        hexes: targets.map((target) => {
          const start = getOutsideStart(width, height);

          return {
            targetX: target.x,
            targetY: target.y,
            x: start.x,
            y: start.y,
            radius: hexRadius,
            alpha: 0,
            delay: randomBetween(0, 800),
            scatterVx: 0,
            scatterVy: 0,
            scattered: false,
          };
        }),
      };
    };

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      const existingStart = stateRef.current?.startTime ?? performance.now();

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stateRef.current = buildState(existingStart);
    };

    const drawCircuitLines = (
      state: LoaderState,
      alpha: number,
      onlySnapped: boolean,
    ) => {
      ctx.save();
      ctx.strokeStyle = `rgba(57,255,20,${alpha})`;
      ctx.lineWidth = onlySnapped ? 0.6 : 0.8;

      for (const [firstIndex, secondIndex] of state.adjacency) {
        const first = state.hexes[firstIndex];
        const second = state.hexes[secondIndex];

        if (onlySnapped) {
          const firstDistance = Math.hypot(first.x - first.targetX, first.y - first.targetY);
          const secondDistance = Math.hypot(
            second.x - second.targetX,
            second.y - second.targetY,
          );

          if (firstDistance >= 3 || secondDistance >= 3) {
            continue;
          }
        }

        ctx.beginPath();
        ctx.moveTo(first.x, first.y);
        ctx.lineTo(second.x, second.y);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawTravelingDot = (state: LoaderState, elapsed: number) => {
      if (state.adjacency.length === 0) {
        return;
      }

      const pathDuration = 850;
      const pathElapsed = Math.max(0, elapsed - FLY_DURATION);
      const rawProgress = (pathElapsed % pathDuration) / pathDuration;
      const pairIndex =
        Math.floor(pathElapsed / pathDuration) % state.adjacency.length;
      const [firstIndex, secondIndex] = state.adjacency[pairIndex];
      const first = state.hexes[firstIndex];
      const second = state.hexes[secondIndex];

      ctx.save();

      for (let i = 4; i >= 0; i -= 1) {
        const progress = clamp(rawProgress - i * 0.07, 0, 1);
        const x = first.targetX + (second.targetX - first.targetX) * progress;
        const y = first.targetY + (second.targetY - first.targetY) * progress;

        ctx.globalAlpha = (5 - i) * 0.035;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(
        first.targetX + (second.targetX - first.targetX) * rawProgress,
        first.targetY + (second.targetY - first.targetY) * rawProgress,
        2,
        0,
        Math.PI * 2,
      );
      ctx.fill();
      ctx.restore();
    };

    const drawLoadingText = (state: LoaderState, elapsed: number) => {
      const textY = state.centerY + 120;
      const scatterFade = elapsed >= HOLD_END ? clamp(1 - (elapsed - HOLD_END) / 800, 0, 1) : 1;
      const dots = ".".repeat((Math.floor(elapsed / 320) % 3) + 1);
      const text =
        elapsed < FLY_DURATION ? `INITIALIZING${dots}` : elapsed < HOLD_END ? "SYSTEMS READY" : "SYSTEMS READY";

      ctx.save();
      ctx.font = '11px var(--font-mono), "Space Mono", monospace';
      ctx.textBaseline = "middle";
      ctx.fillStyle =
        elapsed < FLY_DURATION
          ? `rgba(57,255,20,${0.72 * scatterFade})`
          : `rgba(57,255,20,${scatterFade})`;
      drawSpacedText(ctx, text, state.centerX, textY, 4.4);
      ctx.restore();
    };

    const animate = (now: number) => {
      const state = stateRef.current;
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (!state) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = now - state.startTime;
      ctx.clearRect(0, 0, width, height);

      if (elapsed >= TOTAL_DURATION && !state.completed) {
        state.completed = true;
        onCompleteRef.current();
        return;
      }

      if (elapsed >= HOLD_END) {
        state.phase = "scatter";
      } else if (elapsed >= FLY_DURATION) {
        state.phase = "hold";
      }

      if (state.phase === "fly") {
        let allArrived = true;

        for (const hex of state.hexes) {
          if (elapsed >= hex.delay) {
            hex.x += (hex.targetX - hex.x) * 0.08;
            hex.y += (hex.targetY - hex.y) * 0.08;
          }

          const distance = Math.hypot(hex.targetX - hex.x, hex.targetY - hex.y);
          hex.alpha = clamp((60 - distance) / 60 + 0.3, 0, 1);

          if (distance >= 3) {
            allArrived = false;
          }
        }

        drawCircuitLines(state, 0.08, true);

        if (allArrived) {
          state.phase = "hold";
        }
      }

      if (state.phase === "hold") {
        if (now - state.pulseStart > 400) {
          state.pulseStart = now;
          state.pulseIndex = Math.floor(Math.random() * state.hexes.length);
        }

        for (const hex of state.hexes) {
          hex.x = hex.targetX;
          hex.y = hex.targetY;
          hex.alpha = 1;
        }

        drawCircuitLines(state, 0.15, false);
        drawTravelingDot(state, elapsed);
      }

      if (state.phase === "scatter") {
        const scatterElapsed = elapsed - HOLD_END;
        const fade = clamp(1 - scatterElapsed / 800, 0, 1);

        for (const hex of state.hexes) {
          if (!hex.scattered) {
            const angle = Math.atan2(hex.targetY - state.centerY, hex.targetX - state.centerX);
            const speed = randomBetween(8, 18);

            hex.scatterVx = Math.cos(angle) * speed + randomBetween(-2, 2);
            hex.scatterVy = Math.sin(angle) * speed + randomBetween(-2, 2);
            hex.scattered = true;
          }

          hex.x += hex.scatterVx;
          hex.y += hex.scatterVy;
          hex.alpha = fade;
        }
      }

      for (let i = 0; i < state.hexes.length; i += 1) {
        const hex = state.hexes[i];
        const pulseProgress = clamp(1 - (now - state.pulseStart) / 400, 0, 1);
        const isPulsing = state.phase === "hold" && i === state.pulseIndex;

        drawHex(
          ctx,
          hex.x,
          hex.y,
          hex.radius,
          isPulsing ? "#1a2e00" : FILL,
          STROKE,
          clamp(hex.alpha + (isPulsing ? pulseProgress * 0.25 : 0), 0, 1),
        );
      }

      drawLoadingText(state, elapsed);

      frameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    frameRef.current = requestAnimationFrame(animate);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div
      aria-label="Loading"
      role="status"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000000",
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          display: "block",
          width: "100vw",
          height: "100vh",
        }}
      />
    </div>
  );
}
