"use client";

import { motion, type Variants, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Download } from "lucide-react";
import ResumeDownload from "./ResumeDownload";

const name = "DEVANSH SINGH";
const roles = [
  "Full Stack Developer",
  "Python & Data",
  "Problem Solver",
];

const contentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.8,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const nameVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function Hero() {
  const [displayedRole, setDisplayedRole] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const roleIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const pauseUntilRef = useRef(0);
  const tickRef = useRef(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const now = Date.now();

      if (now < pauseUntilRef.current) {
        return;
      }

      const currentRole = roles[roleIndexRef.current];

      if (!isDeletingRef.current) {
        tickRef.current += 15;

        if (tickRef.current < 30) {
          return;
        }

        tickRef.current = 0;
        charIndexRef.current += 1;
        setDisplayedRole(currentRole.slice(0, charIndexRef.current));

        if (charIndexRef.current === currentRole.length) {
          pauseUntilRef.current = now + 2000;
          isDeletingRef.current = true;
        }

        return;
      }

      charIndexRef.current -= 1;
      setDisplayedRole(currentRole.slice(0, charIndexRef.current));

      if (charIndexRef.current === 0) {
        isDeletingRef.current = false;
        roleIndexRef.current = (roleIndexRef.current + 1) % roles.length;
      }
    }, 15);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero-section">
      <motion.div
        className="hero-content"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-role-label" variants={itemVariants}>
          Full Stack Developer
        </motion.p>

        <motion.h1
          className="hero-name"
          variants={nameVariants}
          aria-label={name}
        >
          {name.split(" ").map((word, wordIndex, wordsArray) => (
            <span key={wordIndex} className="hero-word">
              {word.split("").map((letter, letterIndex) => (
                <motion.span
                  key={`${wordIndex}-${letterIndex}`}
                  className="hero-letter"
                  variants={letterVariants}
                  aria-hidden="true"
                >
                  {letter}
                </motion.span>
              ))}
              {wordIndex !== wordsArray.length - 1 && (
                <motion.span 
                  className="hero-letter hero-space"
                  variants={letterVariants} 
                  aria-hidden="true"
                >
                  &nbsp;
                </motion.span>
              )}
            </span>
          ))}
        </motion.h1>

        <motion.div className="typewriter" variants={itemVariants}>
          <span>{displayedRole}</span>
          <span className="type-cursor">|</span>
        </motion.div>

        <motion.div className="hero-actions" variants={itemVariants}>
          <a className="hero-button primary" href="#projects">
            VIEW PROJECTS
          </a>
          <button className="hero-button ghost" onClick={() => setIsModalOpen(true)} style={{ gap: '8px' }}>
            <Download size={14} />
            DOWNLOAD CV
          </button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && <ResumeDownload onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
        aria-hidden="true"
      >
        <span>SCROLL</span>
        <i />
      </motion.div>

      <style>{`
        .hero-section {
          position: relative;
          z-index: 1;
          display: flex;
          min-height: 100vh;
          align-items: center;
          background: transparent;
        }

        .hero-content {
          width: 100%;
          max-width: 1200px;
          padding: 0 6%;
        }

        .hero-role-label {
          margin: 0 0 18px;
          color: #555555;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 11px;
          line-height: 1;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }

        .hero-name {
          display: flex;
          max-width: 1040px;
          flex-wrap: wrap;
          margin: 0;
          color: #ffffff;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: clamp(52px, 9vw, 110px);
          font-weight: 700;
          line-height: 0.92;
          letter-spacing: 0;
        }

        .hero-word {
          display: inline-flex;
          flex-wrap: nowrap;
        }

        .hero-letter {
          display: inline-block;
        }

        .hero-space {
          width: 0.34em;
        }

        .typewriter {
          display: flex;
          min-height: 32px;
          align-items: center;
          margin-top: 24px;
          color: #39ff14;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: clamp(16px, 2.5vw, 22px);
          line-height: 1.3;
          letter-spacing: 0;
        }

        .type-cursor {
          display: inline-block;
          margin-left: 3px;
          animation: type-cursor-blink 1s infinite steps(1, end);
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 30px;
        }

        .hero-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 12px 28px;
          border-radius: 2px;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 11px;
          line-height: 1;
          letter-spacing: 0.16em;
          text-decoration: none;
          transition:
            border-color 180ms ease,
            background 180ms ease,
            color 180ms ease;
        }

        .hero-button.primary {
          border: 1px solid #39ff14;
          color: #39ff14;
        }

        .hero-button.primary:hover {
          background: #39ff14;
          color: #000000;
        }

        .hero-button.ghost {
          border: 1px solid #333333;
          color: #888888;
        }

        .hero-button.ghost:hover {
          border-color: #555555;
          color: #ffffff;
        }

        .scroll-indicator {
          position: absolute;
          right: clamp(22px, 4vw, 56px);
          bottom: 48px;
          display: grid;
          justify-items: center;
          gap: 44px;
          color: #333333;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.2em;
        }

        .scroll-indicator span {
          transform: rotate(90deg);
        }

        .scroll-indicator i {
          display: block;
          width: 1px;
          height: 40px;
          background: #333333;
          transform-origin: top;
          animation: scroll-line 1.4s infinite ease-in-out;
        }

        @keyframes type-cursor-blink {
          0%,
          49% {
            opacity: 0;
          }

          50%,
          100% {
            opacity: 1;
          }
        }

        @keyframes scroll-line {
          0% {
            transform: scaleY(0);
            opacity: 0.2;
          }

          45% {
            transform: scaleY(1);
            opacity: 1;
          }

          100% {
            transform: scaleY(0);
            opacity: 0.2;
          }
        }

        @media (max-width: 720px) {
          .hero-content {
            padding: 0 22px;
          }

          .hero-name {
            font-size: clamp(48px, 15vw, 76px);
          }

          .hero-actions {
            width: 100%;
          }

          .hero-button {
            flex: 1 1 180px;
          }

          .scroll-indicator {
            right: 18px;
            bottom: 34px;
          }
        }
      `}</style>
    </section>
  );
}
