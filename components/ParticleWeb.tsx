"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
};

type PointerPosition = {
  x: number;
  y: number;
};

const getParticleCount = () => (window.innerWidth < 768 ? 30 : 90);
const PARTICLE_LINK_DISTANCE = 130;
const POINTER_LINK_DISTANCE = 150;

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const createParticle = (width: number, height: number): Particle => ({
  x: randomBetween(0, width),
  y: randomBetween(0, height),
  vx: randomBetween(-0.35, 0.35),
  vy: randomBetween(-0.35, 0.35),
  radius: randomBetween(1.5, 2.5),
  opacity: randomBetween(0.4, 0.8),
});

export default function ParticleWeb() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef<PointerPosition | null>(null);
  const idleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return;
    }

    const scatterParticles = (width: number, height: number) => {
      const particleCount = getParticleCount();
      particlesRef.current = Array.from({ length: particleCount }, () =>
        createParticle(width, height),
      );
    };

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scatterParticles(width, height);
    };

    const resetIdleTimer = () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }

      idleTimerRef.current = window.setTimeout(() => {
        pointerRef.current = null;
      }, 3000);
    };

    const updatePointer = (x: number, y: number) => {
      pointerRef.current = { x, y };
      resetIdleTimer();
    };

    const handleMouseMove = (event: MouseEvent) => {
      updatePointer(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];

      if (touch) {
        updatePointer(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      pointerRef.current = null;

      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    const updateParticle = (particle: Particle, width: number, height: number) => {
      const pointer = pointerRef.current;

      if (pointer) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);

        if (distance > 0 && distance < POINTER_LINK_DISTANCE) {
          const force = (1 - distance / POINTER_LINK_DISTANCE) * 0.018;
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
        }
      }

      particle.x += particle.vx;
      particle.y += particle.vy;

      particle.vx *= 0.995;
      particle.vy *= 0.995;

      if (particle.x - particle.radius < 0) {
        particle.x = particle.radius;
        particle.vx = Math.abs(particle.vx);
      } else if (particle.x + particle.radius > width) {
        particle.x = width - particle.radius;
        particle.vx = -Math.abs(particle.vx);
      }

      if (particle.y - particle.radius < 0) {
        particle.y = particle.radius;
        particle.vy = Math.abs(particle.vy);
      } else if (particle.y + particle.radius > height) {
        particle.y = height - particle.radius;
        particle.vy = -Math.abs(particle.vy);
      }
    };

    const drawParticleLinks = (particles: Particle[]) => {
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const first = particles[i];
          const second = particles[j];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);

          if (distance < PARTICLE_LINK_DISTANCE) {
            const opacity = (1 - distance / PARTICLE_LINK_DISTANCE) * 0.25;

            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(first.x, first.y);
            ctx.lineTo(second.x, second.y);
            ctx.stroke();
          }
        }
      }
    };

    const drawPointerLinks = (particles: Particle[]) => {
      const pointer = pointerRef.current;

      if (!pointer) {
        return;
      }

      for (const particle of particles) {
        const distance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);

        if (distance < POINTER_LINK_DISTANCE) {
          const opacity = (1 - distance / POINTER_LINK_DISTANCE) * 0.35;

          ctx.strokeStyle = `rgba(57, 255, 20, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
      }
    };

    const drawParticles = (particles: Particle[]) => {
      ctx.fillStyle = "#ffffff";

      for (const particle of particles) {
        ctx.globalAlpha = particle.opacity;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const particles = particlesRef.current;

      ctx.clearRect(0, 0, width, height);

      for (const particle of particles) {
        updateParticle(particle, width, height);
      }

      drawParticleLinks(particles);
      drawPointerLinks(particles);
      drawParticles(particles);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animationFrameRef.current = requestAnimationFrame(animate);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }

      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
