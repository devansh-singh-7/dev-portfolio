"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) {
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

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
        className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}
      >
        <a className="logo" href="#home" aria-label="DS home">
          DS<span className="cursor">_</span>
        </a>

        <div className="desktop-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={`nav-link ${
                activeSection === item.href.slice(1) ? "active" : ""
              }`}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          className={`menu-button ${isMenuOpen ? "open" : ""}`}
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <motion.div
              className="mobile-links"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 18, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              aria-label="Mobile navigation"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  className={`nav-link mobile-link ${
                    activeSection === item.href.slice(1) ? "active" : ""
                  }`}
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 100;
          display: flex;
          width: 100%;
          height: 72px;
          align-items: center;
          justify-content: space-between;
          padding: 0 clamp(20px, 5vw, 72px);
          border-bottom: 1px solid transparent;
          background: transparent;
          color: #ffffff;
          font-family: var(--font-mono), "Space Mono", monospace;
          transition:
            background 220ms ease,
            border-color 220ms ease,
            backdrop-filter 220ms ease;
        }

        .navbar-scrolled {
          border-bottom-color: #1a1a1a;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(12px);
        }

        .logo {
          position: relative;
          z-index: 102;
          color: #ffffff;
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: 0.12em;
          text-decoration: none;
        }

        .cursor {
          display: inline-block;
          margin-left: 2px;
          color: #39ff14;
          animation: cursor-blink 1s infinite steps(1, end);
        }

        .desktop-links {
          display: flex;
          align-items: center;
          gap: clamp(18px, 2.8vw, 34px);
        }

        .nav-link {
          position: relative;
          display: inline-flex;
          width: fit-content;
          padding: 8px 0;
          color: #555555;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 11px;
          line-height: 1;
          letter-spacing: 0.15em;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 180ms ease;
        }

        .nav-link::after {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: #39ff14;
          content: "";
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 180ms ease;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #39ff14;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
        }

        .menu-button {
          position: relative;
          z-index: 102;
          display: none;
          width: 42px;
          height: 42px;
          place-items: center;
          border: 0;
          background: transparent;
          cursor: pointer;
        }

        .menu-button span {
          position: absolute;
          width: 22px;
          height: 1px;
          background: #ffffff;
          transition:
            transform 180ms ease,
            opacity 180ms ease;
        }

        .menu-button span:nth-child(1) {
          transform: translateY(-7px);
        }

        .menu-button span:nth-child(3) {
          transform: translateY(7px);
        }

        .menu-button.open span:nth-child(1) {
          transform: rotate(45deg);
        }

        .menu-button.open span:nth-child(2) {
          opacity: 0;
        }

        .menu-button.open span:nth-child(3) {
          transform: rotate(-45deg);
        }

        .mobile-overlay {
          position: fixed;
          inset: 0;
          z-index: 99;
          display: grid;
          place-items: center;
          background: rgba(0, 0, 0, 0.94);
          backdrop-filter: blur(12px);
        }

        .mobile-links {
          display: grid;
          justify-items: center;
          gap: 26px;
        }

        .mobile-link {
          font-size: 15px;
          letter-spacing: 0.22em;
        }

        @keyframes cursor-blink {
          0%,
          49% {
            opacity: 0;
          }

          50%,
          100% {
            opacity: 1;
          }
        }

        @media (max-width: 760px) {
          .navbar {
            height: 64px;
            padding: 0 20px;
          }

          .desktop-links {
            display: none;
          }

          .menu-button {
            display: grid;
          }
        }
      `}</style>
    </>
  );
}
