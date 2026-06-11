"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { projects, type Project } from "@/lib/projects";

function useTilt() {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const glare = glareRef.current;

    if (!card || !glare) {
      return;
    }

    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;

    const resetTransform = () => {
      card.style.transition = "transform 0.4s ease-out";
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      glare.style.opacity = "0";
    };

    if (isTouchDevice) {
      const handleTouchStart = () => {
        card.style.transition = "transform 0.15s ease-out";
        card.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1.01, 1.01, 1.01)";
      };

      card.addEventListener("touchstart", handleTouchStart, { passive: true });
      card.addEventListener("touchend", resetTransform);
      card.addEventListener("touchcancel", resetTransform);

      return () => {
        card.removeEventListener("touchstart", handleTouchStart);
        card.removeEventListener("touchend", resetTransform);
        card.removeEventListener("touchcancel", resetTransform);
      };
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transition = "transform 0.15s ease-out";
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      glare.style.opacity = "1";
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(57,255,20,0.06) 0%, transparent 65%)`;
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", resetTransform);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", resetTransform);
    };
  }, []);

  return { cardRef, glareRef };
}

const listVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

function ProjectCard({ project }: { project: Project }) {
  const { cardRef, glareRef } = useTilt();

  return (
    <motion.div className="project-card-shell" variants={cardVariants}>
      <Link ref={cardRef} className="project-card" href={`/projects/${project.slug}`}>
        <div ref={glareRef} className="project-glare" />

        <div className="project-main">
          <p className="project-number">{project.id}</p>
          <h3>{project.name}</h3>
          <p className="project-description">{project.description}</p>
          <div className="project-stack">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            <span className="case-study-link">VIEW CASE STUDY -&gt;</span>
            {"liveLink" in project && project.liveLink && (
              <button
                className="case-study-link live-link-btn"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(project.liveLink as string, "_blank");
                }}
              >
                LIVE LINK -&gt;
              </button>
            )}
          </div>
        </div>

        <div className="project-meta">
          <span>{project.type}</span>
          <ArrowUpRight aria-hidden="true" size={28} strokeWidth={1.5} />
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-inner">
        <div className="projects-heading">
          <p className="section-label">03 / PROJECTS</p>
          <h2>SELECTED WORK</h2>
        </div>

        <motion.div
          className="projects-list"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>

      <style>{`
        .projects-section {
          position: relative;
          z-index: 1;
          padding: 120px 6%;
        }

        .projects-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .projects-heading {
          margin-bottom: 58px;
        }

        .section-label {
          margin: 0 0 16px;
          color: #39ff14;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.3em;
        }

        .projects-heading h2 {
          margin: 0;
          color: #ffffff;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: 0;
        }

        .projects-list {
          display: grid;
          gap: 2px;
          perspective: 1000px;
        }

        .project-card-shell {
          perspective: 1000px;
        }

        .project-card {
          position: relative;
          display: flex;
          justify-content: space-between;
          gap: 40px;
          overflow: hidden;
          padding: 40px 48px;
          border: 1px solid #141414;
          border-radius: 4px;
          background: #080808;
          color: inherit;
          text-decoration: none;
          transform-style: preserve-3d;
          will-change: transform;
          transition:
            transform 0.15s ease-out,
            background 200ms ease,
            border-color 200ms ease;
        }

        .project-glare {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0;
          pointer-events: none;
          transition: opacity 200ms ease;
        }

        .project-card::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: #39ff14;
          content: "";
          opacity: 0;
          transition: opacity 200ms ease;
        }

        .project-card:hover {
          border-color: #39ff14;
          background: #0a0a0a;
        }

        .project-card:hover::before {
          opacity: 1;
        }

        .project-main {
          min-width: 0;
        }

        .project-number {
          margin: 0 0 18px;
          color: #39ff14;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 11px;
          line-height: 1;
          letter-spacing: 0.2em;
        }

        .project-card h3 {
          margin: 0;
          color: #ffffff;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: clamp(22px, 3vw, 28px);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: 0;
        }

        .project-description {
          max-width: 600px;
          margin: 18px 0 0;
          color: #666666;
          font-family: var(--font-sans), sans-serif;
          font-size: 15px;
          line-height: 1.8;
        }

        .project-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 26px;
        }

        .project-stack span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 14px;
          border: 1px solid #1c1c1c;
          border-radius: 999px;
          background: #0d0d0d;
          color: #555555;
          font-family: var(--font-sans), sans-serif;
          font-size: 12px;
          line-height: 1.35;
        }

        .case-study-link {
          display: inline-flex;
          margin-top: 28px;
          color: #39ff14;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.2em;
          opacity: 0;
          transform: translateY(8px);
          transition:
            opacity 200ms ease,
            transform 200ms ease;
        }

        .live-link-btn {
          color: #ffffff;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        
        .live-link-btn:hover {
          text-decoration: underline;
        }

        .project-card:hover .case-study-link {
          opacity: 1;
          transform: translateY(0);
        }

        .project-meta {
          display: flex;
          min-width: 130px;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-between;
          color: #333333;
          transition: color 200ms ease;
        }

        .project-meta span {
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 10px;
          line-height: 1.4;
          letter-spacing: 0.18em;
          text-align: right;
          text-transform: uppercase;
        }

        .project-meta svg {
          transition:
            color 200ms ease,
            transform 200ms ease;
        }

        .project-card:hover .project-meta svg {
          color: #39ff14;
          transform: translate(4px, -4px);
        }

        @media (max-width: 760px) {
          .projects-section {
            padding: 96px 22px;
          }

          .projects-heading {
            margin-bottom: 42px;
          }

          .project-card {
            flex-direction: column;
            gap: 28px;
            padding: 30px 24px;
          }

          .project-meta {
            min-width: 0;
            flex-direction: row;
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
