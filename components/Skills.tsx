"use client";

import { motion, type Variants } from "framer-motion";

const skills = {
  Languages: ["JavaScript", "Python", "SQL"],
  Frontend: ["React.js", "Next.js", "Tailwind CSS"],
  Backend: ["Node.js", "REST APIs"],
  Databases: ["MySQL", "MongoDB", "Firebase"],
  "Data & Analytics": [
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "Data Cleaning",
    "Web Scraping",
  ],
  "Tools & Platforms": ["Git", "GitHub", "Vercel", "Hostinger"],
};

const categoryVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
    },
  },
};

const pillVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-inner">
        <div className="skills-heading">
          <p className="section-label">02 / EXPERTISE</p>
          <h2>TECHNICAL SKILLS</h2>
        </div>

        <div className="skills-grid">
          <div className="skills-list">
            {Object.entries(skills).map(([category, items]) => (
              <motion.div
                key={category}
                className="skill-category"
                variants={categoryVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <h3>{category}</h3>
                <div className="skill-pills">
                  {items.map((skill) => (
                    <motion.span
                      key={skill}
                      className="skill-pill"
                      variants={pillVariants}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .skills-section {
          position: relative;
          z-index: 1;
          padding: 120px 6%;
        }

        .skills-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .skills-heading {
          margin-bottom: 70px;
        }

        .section-label {
          margin: 0 0 16px;
          color: #39ff14;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.3em;
        }

        .skills-heading h2 {
          margin: 0;
          color: #ffffff;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: 0;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(48px, 8vw, 120px);
          align-items: start;
        }

        .skills-list {
          display: grid;
        }

        .skill-category {
          padding: 0 0 28px;
          border-bottom: 1px solid #111111;
          margin-bottom: 28px;
        }

        .skill-category h3 {
          margin: 0 0 10px;
          color: #39ff14;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 10px;
          font-weight: 400;
          line-height: 1;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        .skill-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .skill-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 14px;
          border: 1px solid #1c1c1c;
          border-radius: 999px;
          background: #0d0d0d;
          color: #aaaaaa;
          font-family: var(--font-sans), sans-serif;
          font-size: 13px;
          line-height: 1.35;
          transition:
            border-color 200ms ease,
            color 200ms ease;
        }

        .skill-pill:hover {
          border-color: #39ff14;
          color: #39ff14;
        }

        @media (max-width: 820px) {
          .skills-section {
            padding: 96px 22px;
          }

          .skills-heading {
            margin-bottom: 44px;
          }

          .skills-grid {
            grid-template-columns: 1fr;
            gap: 42px;
          }
        }
      `}</style>
    </section>
  );
}
