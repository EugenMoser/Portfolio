import type { ReactNode } from "react";
import { data } from "@/data/portfolio";
import type { Url } from "@/types/portfolio";

function ExternalLink({
  href,
  srHint,
  children,
}: {
  href: Url;
  srHint: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block py-1 text-[11px] font-medium hover:underline focus-visible:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f5f9e]"
      style={{ color: "#2f5f9e" }}
    >
      {children} <span aria-hidden="true">↗</span>
      <span className="sr-only">{srHint}</span>
    </a>
  );
}

export default function ProjectsSection() {
  return (
    <div className="p-6">
      <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-4">
        Projects
      </h2>
      <div className="grid gap-3">
        {data.projects.map((project) => {
          const { live, repoUrl } = project;
          const hasLinks = live !== undefined || repoUrl !== undefined;

          return (
            <div
              key={project.title}
              className="rounded-lg p-4"
              style={{ background: "#f7f7f7", border: "1px solid #e0e0e0" }}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-[13px] font-semibold text-gray-800 leading-tight">
                  {project.title}
                </h3>
                <span className="text-[10px] text-gray-400 whitespace-nowrap flex-shrink-0">
                  {project.period}
                </span>
              </div>
              <p className="text-[12px] text-gray-600 mb-2 leading-relaxed">
                {project.description}
              </p>
              <ul className="mb-2 space-y-0.5">
                {project.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="text-[11px] text-gray-600 flex gap-1.5"
                  >
                    <span className="text-blue-400 flex-shrink-0 mt-0.5">
                      ▸
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                    style={{
                      background: "rgba(74,127,193,0.1)",
                      color: "#4a7fc1",
                      border: "1px solid rgba(74,127,193,0.2)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {hasLinks && (
                <div className="mt-1 flex flex-wrap items-center gap-x-3">
                  {typeof live === "string" && (
                    <ExternalLink href={live} srHint="(öffnet in neuem Tab)">
                      Live ansehen
                    </ExternalLink>
                  )}
                  {Array.isArray(live) && (
                    <span className="inline-flex flex-wrap items-center gap-x-3">
                      <span className="py-1 text-[11px] font-medium text-gray-600">
                        Live:
                      </span>
                      {live.map((entry) => (
                        <ExternalLink
                          key={entry.href}
                          href={entry.href}
                          srHint="(Live-Demo, öffnet in neuem Tab)"
                        >
                          {entry.label}
                        </ExternalLink>
                      ))}
                    </span>
                  )}
                  {repoUrl !== undefined && (
                    <ExternalLink href={repoUrl} srHint="(öffnet in neuem Tab)">
                      Code
                    </ExternalLink>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
