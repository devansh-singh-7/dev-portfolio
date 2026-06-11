"use client";

import { motion, type Variants } from "framer-motion";

const experience = [
  {
    company: "Indian Penpals' League",
    role: "Freelance Full Stack Developer",
    period: "Nov 2025 - Feb 2026",
    points: [
      "Re-architected legacy NGO website to Next.js, improving SEO by 60%",
      "Led full project lifecycle: requirements, UI redesign, development, deployment",
      "Implemented Git-based CI/CD workflows",
    ],
  },
  {
    company: "Vidyarthi Mitra",
    role: "Python Dev & Data Analyst Intern",
    period: "Aug 2025 - Sep 2025",
    points: [
      "Built Python scraping pipelines with BeautifulSoup, cutting data collection time by 60%",
      "Designed structured data outputs for seamless backend analytics workflows",
    ],
  },
];

const education = [
  {
    degree: "B.Sc. Information Technology",
    institution: "JaiHind College",
    period: "2023-2026",
    grade: "CGPA 8.94",
  },
  {
    degree: "High School",
    institution: "RPS Public School",
    period: "2021-2023",
    grade: "83.8%",
  },
];

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="experience-inner">
        <div className="experience-heading">
          <p className="section-label">04 / EXPERIENCE</p>
          <h2>EXPERIENCE</h2>
        </div>

        <div className="timeline-grid">
          <div className="timeline-column">
            <h3 className="column-title">WORK</h3>
            <motion.div
              className="timeline-list"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {experience.map((item) => (
                <motion.article
                  key={`${item.company}-${item.period}`}
                  className="timeline-item"
                  variants={itemVariants}
                >
                  <span className="timeline-dot" />
                  <p className="timeline-period">{item.period}</p>
                  <h4>{item.company}</h4>
                  <p className="timeline-subtitle">{item.role}</p>
                  <ul className="timeline-points">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </motion.div>
          </div>

          <div className="timeline-column education-column">
            <h3 className="column-title">EDUCATION</h3>
            <motion.div
              className="timeline-list"
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {education.map((item) => (
                <motion.article
                  key={`${item.institution}-${item.period}`}
                  className="timeline-item"
                  variants={itemVariants}
                >
                  <span className="timeline-dot" />
                  <p className="timeline-period">{item.period}</p>
                  <h4>{item.institution}</h4>
                  <p className="timeline-subtitle">{item.degree}</p>
                  <span className="grade-badge">{item.grade}</span>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .experience-section {
          position: relative;
          z-index: 1;
          padding: 120px 6%;
        }

        .experience-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .experience-heading {
          margin-bottom: 62px;
        }

        .section-label {
          margin: 0 0 16px;
          color: #39ff14;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.3em;
        }

        .experience-heading h2 {
          margin: 0;
          color: #ffffff;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: 0;
        }

        .timeline-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .timeline-column {
          padding-right: clamp(36px, 5vw, 72px);
        }

        .education-column {
          border-left: 1px solid #111111;
          padding-right: 0;
          padding-left: clamp(36px, 5vw, 72px);
        }

        .column-title {
          margin: 0 0 34px;
          color: #39ff14;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 13px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.25em;
          text-shadow: 0 0 14px rgba(57, 255, 20, 0.25);
        }

        .timeline-list {
          position: relative;
          display: grid;
          gap: 46px;
        }

        .timeline-list::before {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 1px;
          width: 1px;
          background: #1c1c1c;
          content: "";
        }

        .timeline-item {
          position: relative;
          padding-left: 28px;
        }

        .timeline-dot {
          position: absolute;
          top: 5px;
          left: 0;
          width: 4px;
          height: 4px;
          background: #39ff14;
        }

        .timeline-period {
          margin: 0 0 12px;
          color: #39ff14;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.18em;
        }

        .timeline-item h4 {
          margin: 0;
          color: #ffffff;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.4;
          letter-spacing: 0;
        }

        .timeline-subtitle {
          margin: 6px 0 0;
          color: #888888;
          font-family: var(--font-sans), sans-serif;
          font-size: 14px;
          font-style: italic;
          line-height: 1.5;
        }

        .timeline-points {
          display: grid;
          gap: 8px;
          margin: 18px 0 0;
          padding: 0;
          list-style: none;
        }

        .timeline-points li {
          position: relative;
          padding-left: 22px;
          color: #555555;
          font-family: var(--font-sans), sans-serif;
          font-size: 14px;
          line-height: 1.7;
        }

        .timeline-points li::before {
          position: absolute;
          left: 0;
          color: #333333;
          content: "→";
        }

        .grade-badge {
          display: inline-flex;
          margin-top: 18px;
          padding: 6px 12px;
          border: 1px solid #1c1c1c;
          border-radius: 999px;
          background: #0d0d0d;
          color: #39ff14;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 11px;
          line-height: 1;
          letter-spacing: 0.08em;
        }

        @media (max-width: 820px) {
          .experience-section {
            padding: 96px 22px;
          }

          .experience-heading {
            margin-bottom: 44px;
          }

          .timeline-grid {
            grid-template-columns: 1fr;
            gap: 70px;
          }

          .timeline-column,
          .education-column {
            border-left: 0;
            padding-right: 0;
            padding-left: 0;
          }
        }
      `}</style>
    </section>
  );
}
