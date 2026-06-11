"use client";

import { Mail } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const headingLineOne = "LET'S BUILD";
const headingLineTwo = "SOMETHING.";

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const lineVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

const renderLetters = (text: string) =>
  text.split("").map((letter, index) => (
    <motion.span
      key={`${letter}-${index}`}
      className={letter === " " ? "contact-letter contact-space" : "contact-letter"}
      variants={letterVariants}
      aria-hidden="true"
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  ));

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.27-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18A10.91 10.91 0 0 1 12 6.04c.98 0 1.95.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.42-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.79.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
      />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.36 8h4.28v15H.36V8Zm7.12 0h4.1v2.05h.06c.57-1.08 1.97-2.22 4.05-2.22 4.33 0 5.13 2.85 5.13 6.56V23h-4.28v-7.63c0-1.82-.03-4.16-2.54-4.16-2.54 0-2.93 1.98-2.93 4.03V23H7.48V8Z"
      />
    </svg>
  );
}

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="contact-section">
      <motion.div
        className="contact-inner"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.p className="section-label" variants={fadeUpVariants}>
          05 / CONTACT
        </motion.p>

        <h2 className="contact-heading" aria-label="Let's build something.">
          <motion.span className="heading-line" variants={lineVariants}>
            {renderLetters(headingLineOne)}
          </motion.span>
          <motion.span className="heading-line underlined-line" variants={lineVariants}>
            {renderLetters(headingLineTwo)}
            <motion.svg
              className="neon-underline"
              viewBox="0 0 520 34"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                d="M5 20 C115 7 206 31 314 17 C396 6 464 12 515 21"
                fill="none"
                stroke="#39ff14"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.75, ease: "easeOut" }}
              />
            </motion.svg>
          </motion.span>
        </h2>

        <motion.p className="contact-copy" variants={fadeUpVariants}>
          Open to full-time roles, freelance projects & collaborations.
        </motion.p>

        <motion.div className="contact-links" variants={fadeUpVariants}>
          <a href="mailto:singh.devansh1806@gmail.com">
            <Mail size={16} aria-hidden="true" />
            <span>Email</span>
          </a>
          <a
            href="https://github.com/devansh-singh-7"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubMark />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/devansh-singh-b592231a9/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInMark />
            <span>LinkedIn</span>
          </a>
        </motion.div>

        <motion.a
          className="email-cta"
          href="mailto:singh.devansh1806@gmail.com"
          variants={fadeUpVariants}
        >
          SEND AN EMAIL →
        </motion.a>

        <motion.footer className="contact-footer" variants={fadeUpVariants}>
          {year}
        </motion.footer>
      </motion.div>

      <style>{`
        .contact-section {
          position: relative;
          z-index: 1;
          padding: 120px 6%;
        }

        .contact-inner {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .section-label {
          margin: 0 0 28px;
          color: #39ff14;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.3em;
        }

        .contact-heading {
          margin: 0;
          color: #ffffff;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: clamp(48px, 8vw, 100px);
          font-weight: 700;
          line-height: 0.9;
          letter-spacing: 0;
        }

        .heading-line {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }

        .underlined-line {
          position: relative;
          width: fit-content;
          margin: 0 auto;
          padding-bottom: 18px;
        }

        .contact-letter {
          display: inline-block;
        }

        .contact-space {
          width: 0.34em;
        }

        .neon-underline {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -8px;
          width: 100%;
          height: 28px;
          overflow: visible;
        }

        .contact-copy {
          max-width: 620px;
          margin: 36px auto 0;
          color: #555555;
          font-family: var(--font-sans), sans-serif;
          font-size: 16px;
          line-height: 1.7;
        }

        .contact-links {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 22px 48px;
          margin-top: 40px;
        }

        .contact-links a {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #888888;
          font-family: var(--font-sans), sans-serif;
          font-size: 14px;
          line-height: 1;
          text-decoration: none;
          transition: color 180ms ease;
        }

        .contact-links svg {
          color: #39ff14;
        }

        .contact-links a:hover {
          color: #ffffff;
        }

        .email-cta {
          display: flex;
          width: 100%;
          max-width: 320px;
          align-items: center;
          justify-content: center;
          margin: 48px auto 0;
          padding: 18px 32px;
          border: 1px solid #39ff14;
          border-radius: 2px;
          background: transparent;
          color: #39ff14;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 12px;
          line-height: 1;
          letter-spacing: 0.2em;
          text-decoration: none;
          transition:
            background 180ms ease,
            color 180ms ease;
        }

        .email-cta:hover {
          background: #39ff14;
          color: #000000;
        }

        .contact-footer {
          margin-top: 80px;
          color: #333333;
          font-family: var(--font-sans), sans-serif;
          font-size: 12px;
          line-height: 1.6;
        }

        @media (max-width: 720px) {
          .contact-section {
            padding: 96px 22px;
          }

          .contact-heading {
            font-size: clamp(44px, 13vw, 70px);
          }

          .contact-copy {
            margin-top: 30px;
          }
        }
      `}</style>
    </section>
  );
}
