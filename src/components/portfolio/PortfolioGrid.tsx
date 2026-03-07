import Image from "next/image";
import { Mail, MapPin, ExternalLink } from "lucide-react";

import { data } from "../../data/portfolio";

export function PortfolioGrid() {
  return (
    <div className="flex flex-col gap-20 max-w-3xl mx-auto px-8 py-12">
      {/* Hero */}
      <section id="hero" className="flex items-start gap-8">
        <Image
          src="/Portfolio-Image.png"
          alt="Eugen Moser"
          width={96}
          height={96}
          className="rounded-full flex-shrink-0 border border-neutral-800"
        />
        <div>
          <h1 className="text-3xl font-bold text-white">{data.hero.name}</h1>
          <p className="text-neutral-400 mt-1 text-base">{data.hero.title}</p>
          <p className="text-neutral-600 text-sm mt-0.5">{data.hero.subtitle}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-neutral-500">
            <a
              href={data.hero.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-neutral-200 transition-colors"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href={data.hero.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-neutral-200 transition-colors"
            >
              <LinkedinIcon className="h-3.5 w-3.5" />
              LinkedIn
            </a>
            <a
              href={`mailto:${data.hero.email}`}
              className="flex items-center gap-1.5 hover:text-neutral-200 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              {data.hero.email}
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              {data.hero.location}
            </span>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about-me">
        <SectionHeading>Über mich</SectionHeading>
        <p className="text-neutral-400 leading-relaxed whitespace-pre-line text-sm">
          {data.about}
        </p>
      </section>

      {/* Skills */}
      <section id="skills">
        <SectionHeading>Tech Stack</SectionHeading>
        <div className="flex flex-col gap-3">
          {data.skills.map((group) => (
            <div key={group.category} className="flex gap-4 items-start">
              <span className="text-neutral-600 text-xs w-28 flex-shrink-0 pt-1.5">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 rounded border border-neutral-800 bg-neutral-900 text-neutral-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience">
        <SectionHeading>Erfahrung</SectionHeading>
        <div className="flex flex-col">
          {data.experience.map((exp, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex flex-col items-center pt-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-600 flex-shrink-0" />
                {i < data.experience.length - 1 && (
                  <div className="w-px flex-1 bg-neutral-800 mt-2 mb-0" />
                )}
              </div>
              <div className="pb-10 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-neutral-100 text-sm">
                    {exp.position}
                  </h3>
                  <span className="text-xs text-neutral-600 flex-shrink-0">
                    {exp.period}
                  </span>
                </div>
                <span className="text-xs text-neutral-500">{exp.company}</span>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  {exp.description}
                </p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {exp.details.map((detail, j) => (
                    <li
                      key={j}
                      className="text-xs text-neutral-500 flex gap-2 leading-relaxed"
                    >
                      <span className="text-neutral-700 flex-shrink-0 mt-0.5">▸</span>
                      {detail}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {exp.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-neutral-800/80 text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <SectionHeading>Projekte</SectionHeading>
        <div className="flex flex-col gap-4">
          {data.projects.map(
            (
              project: {
                title: string;
                description: string;
                bullets: string[];
                tags: string[];
                period: string;
                link: string;
              },
              i: number
            ) => (
              <div
                key={i}
                className="border border-neutral-800 rounded-xl p-5 bg-neutral-900/30 hover:border-neutral-700 transition-colors"
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-semibold text-neutral-100 text-sm">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-neutral-700">{project.period}</span>
                    {project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-neutral-300 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-xs text-neutral-500 leading-relaxed mb-3">
                  {project.description}
                </p>
                <ul className="flex flex-col gap-1.5 mb-3">
                  {project.bullets.map((bullet: string, j: number) => (
                    <li key={j} className="text-xs text-neutral-500 flex gap-2 leading-relaxed">
                      <span className="text-neutral-700 flex-shrink-0 mt-0.5">▸</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications">
        <SectionHeading>Zertifikate</SectionHeading>
        <div className="flex flex-col gap-2">
          {data.certifications.map(
            (
              cert: { name: string; issuer: string; date: string; link: string },
              i: number
            ) => (
              <a
                key={i}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center border border-neutral-800/60 rounded-lg px-4 py-3 bg-neutral-900/20 hover:border-neutral-600 hover:bg-neutral-900/50 transition-colors group"
              >
                <div>
                  <span className="text-sm text-neutral-200 group-hover:text-white transition-colors">
                    {cert.name}
                  </span>
                  <span className="text-xs text-neutral-600 ml-2">· {cert.issuer}</span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-xs text-neutral-600">{cert.date}</span>
                  <ExternalLink className="h-3 w-3 text-neutral-700 group-hover:text-neutral-400 transition-colors" />
                </div>
              </a>
            )
          )}
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <SectionHeading>Kontakt</SectionHeading>
        <div className="flex flex-col gap-3">
          <a
            href={`mailto:${data.hero.email}`}
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            <Mail className="h-4 w-4" />
            {data.hero.email}
          </a>
          <a
            href={data.hero.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            <GithubIcon className="h-4 w-4" />
            github.com/eugen-moser
          </a>
          <a
            href={data.hero.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            <LinkedinIcon className="h-4 w-4" />
            linkedin.com/in/eugen-moser
          </a>
        </div>
      </section>
    </div>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest whitespace-nowrap">
        {children}
      </h2>
      <div className="h-px flex-1 bg-neutral-800" />
    </div>
  );
}
