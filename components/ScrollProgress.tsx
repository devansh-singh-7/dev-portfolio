"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const fillRef = useRef<HTMLDivElement | null>(null);
  const scrollPercentRef = useRef(0);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent =
        scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

      scrollPercentRef.current = scrollPercent;

      if (fillRef.current) {
        fillRef.current.style.height = `${Math.min(100, Math.max(0, scrollPercent))}%`;
      }
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useEffect(() => {
    const sectionElements = sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => section !== null);

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside className="scroll-progress" aria-label="Scroll progress">
      <div className="progress-track" aria-hidden="true">
        <div ref={fillRef} className="progress-fill" />
      </div>

      <div className="section-dots">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`section-dot ${activeSection === section.id ? "active" : ""}`}
            type="button"
            aria-label={`Scroll to ${section.label}`}
            onClick={() => scrollToSection(section.id)}
          >
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      <style>{`
        .scroll-progress {
          position: fixed;
          top: 0;
          right: 0;
          z-index: 50;
          width: 3px;
          height: 100vh;
        }

        .progress-track {
          position: absolute;
          inset: 0;
          width: 3px;
          background: rgba(255, 255, 255, 0.04);
        }

        .progress-fill {
          width: 100%;
          height: 0%;
          background: #39ff14;
          box-shadow:
            0 0 8px #39ff14,
            0 0 16px rgba(57, 255, 20, 0.3);
          transition: height 0.1s ease-out;
        }

        .section-dots {
          position: fixed;
          top: 50%;
          right: 12px;
          display: flex;
          flex-direction: column;
          gap: clamp(28px, 7vh, 58px);
          transform: translateY(-50%);
        }

        .section-dot {
          position: relative;
          width: 6px;
          height: 6px;
          padding: 0;
          border: 1px solid #333333;
          border-radius: 50%;
          background: #1c1c1c;
          cursor: pointer;
          transition:
            background 180ms ease,
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .section-dot.active {
          border-color: #39ff14;
          background: #39ff14;
          box-shadow: 0 0 6px #39ff14;
        }

        .section-dot span {
          position: absolute;
          top: 50%;
          right: 16px;
          opacity: 0;
          pointer-events: none;
          padding: 4px 8px;
          border: 1px solid #1c1c1c;
          border-radius: 2px;
          background: #0d0d0d;
          color: #888888;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 10px;
          line-height: 1;
          white-space: nowrap;
          transform: translate(4px, -50%);
          transition:
            opacity 180ms ease,
            transform 180ms ease;
        }

        .section-dot:hover span {
          opacity: 1;
          transform: translate(0, -50%);
        }

        @media (max-width: 767px) {
          .scroll-progress {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
}
