import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import CaseStudyWrapper from "@/components/CaseStudyWrapper";
import { getProject, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="case-page">
      <CaseStudyWrapper>
        <Link className="back-link" href="/#projects">
          <ArrowLeft size={14} aria-hidden="true" />
          BACK TO PROJECTS
        </Link>

        <section className="case-hero">
          <p className="project-number">{project.id}</p>
          <h1>{project.name}</h1>
          <p className="tagline">{project.tagline}</p>

          <div className="meta-row">
            <div className="stack-tags">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <span>{project.duration}</span>
            <span>{project.role}</span>
            <span className={`status-badge ${project.status === "Live" ? "live" : ""}`}>
              {project.status === "Live" && <i />}
              {project.status.toUpperCase()}
            </span>
          </div>
        </section>

        <div className="divider" />

        <section className="summary-grid">
          <article>
            <h2>PROBLEM</h2>
            <p>{project.problem}</p>
          </article>
          <article>
            <h2>APPROACH</h2>
            <p>{project.approach}</p>
          </article>
          <article>
            <h2>RESULTS</h2>
            <p>{project.results.join(" ")}</p>
          </article>
        </section>

        <section className="decision-section">
          <h2>TECHNICAL DECISIONS</h2>
          <div className="decision-list">
            {project.techDecisions.map((item) => (
              <article key={item.decision} className="decision-card">
                <h3>{item.decision}</h3>
                <p>{item.reason}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="outcomes-section">
          <h2>OUTCOMES</h2>
          <div className="outcomes-list">
            {project.results.map((result) => (
              <p key={result}>{result}</p>
            ))}
          </div>
        </section>

        <nav className="bottom-nav" aria-label="Project navigation">
          <Link href={`/projects/${previousProject.slug}`}>
            <ArrowLeft size={14} aria-hidden="true" />
            <span>PREVIOUS PROJECT</span>
          </Link>
          <Link href={`/projects/${nextProject.slug}`}>
            <span>NEXT PROJECT</span>
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </nav>
      </CaseStudyWrapper>

      <style>{`
        .case-page {
          min-height: 100vh;
          padding: 36px 6% 96px;
          background: #000000;
          color: #ffffff;
        }

        .case-page > div {
          max-width: 1200px;
          margin: 0 auto;
        }

        .back-link,
        .bottom-nav a {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #555555;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 10px;
          line-height: 1;
          letter-spacing: 0.18em;
          text-decoration: none;
          transition: color 180ms ease;
        }

        .back-link:hover,
        .bottom-nav a:hover {
          color: #39ff14;
        }

        .case-hero {
          padding: 104px 0 72px;
        }

        .project-number {
          margin: 0 0 22px;
          color: #39ff14;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 11px;
          line-height: 1;
          letter-spacing: 0.3em;
        }

        .case-hero h1 {
          max-width: 980px;
          margin: 0;
          color: #ffffff;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: clamp(40px, 7vw, 80px);
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: 0;
        }

        .tagline {
          margin: 24px 0 0;
          color: #666666;
          font-family: var(--font-sans), sans-serif;
          font-size: 18px;
          font-style: italic;
          line-height: 1.6;
        }

        .meta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-top: 34px;
          color: #666666;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 11px;
          line-height: 1;
          letter-spacing: 0.08em;
        }

        .stack-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .stack-tags span,
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 12px;
          border: 1px solid #1c1c1c;
          border-radius: 999px;
          background: #0d0d0d;
          color: #888888;
        }

        .status-badge.live {
          color: #39ff14;
        }

        .status-badge i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #39ff14;
          box-shadow: 0 0 8px #39ff14;
          animation: live-pulse 1s infinite ease-in-out;
        }

        .divider {
          width: 100%;
          height: 1px;
          background: #111111;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(28px, 5vw, 64px);
          padding: 72px 0;
        }

        .summary-grid h2 {
          margin: 0 0 16px;
          color: #39ff14;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: 10px;
          font-weight: 400;
          line-height: 1;
          letter-spacing: 0.25em;
        }

        .summary-grid p {
          margin: 0;
          color: #888888;
          font-family: var(--font-sans), sans-serif;
          font-size: 15px;
          line-height: 1.8;
        }

        .decision-section,
        .outcomes-section {
          padding: 36px 0;
        }

        .decision-section > h2,
        .outcomes-section > h2 {
          margin: 0 0 28px;
          color: #ffffff;
          font-family: var(--font-mono), "Space Mono", monospace;
          font-size: clamp(24px, 3vw, 34px);
          line-height: 1.1;
          letter-spacing: 0;
        }

        .decision-list {
          display: grid;
          gap: 14px;
        }

        .decision-card {
          padding: 24px 28px;
          border: 1px solid #141414;
          border-radius: 4px;
          background: #0d0d0d;
        }

        .decision-card h3 {
          margin: 0 0 10px;
          color: #ffffff;
          font-family: var(--font-sans), sans-serif;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.4;
        }

        .decision-card p {
          position: relative;
          margin: 0;
          padding-left: 22px;
          color: #666666;
          font-family: var(--font-sans), sans-serif;
          font-size: 14px;
          line-height: 1.8;
        }

        .decision-card p::before {
          position: absolute;
          left: 0;
          color: #39ff14;
          content: "->";
        }

        .outcomes-list {
          display: grid;
          gap: 18px;
        }

        .outcomes-list p {
          margin: 0;
          padding-left: 20px;
          border-left: 2px solid #39ff14;
          color: #ffffff;
          font-family: var(--font-sans), sans-serif;
          font-size: 16px;
          line-height: 1.7;
        }

        .bottom-nav {
          display: flex;
          justify-content: space-between;
          gap: 24px;
          margin-top: 72px;
          padding-top: 28px;
          border-top: 1px solid #111111;
        }

        @keyframes live-pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(0.86);
          }

          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 820px) {
          .case-page {
            padding: 28px 22px 72px;
          }

          .case-hero {
            padding: 72px 0 52px;
          }

          .summary-grid {
            grid-template-columns: 1fr;
            padding: 52px 0;
          }

          .bottom-nav {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </main>
  );
}
