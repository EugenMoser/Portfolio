import { data } from "@/data/portfolio";

export default function ProjectsSection() {
  return (
    <div className="p-6">
      <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-4">
        Projects
      </h2>
      <div className="grid gap-3">
        {data.projects.map((project) => (
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
                <li key={i} className="text-[11px] text-gray-600 flex gap-1.5">
                  <span className="text-blue-400 flex-shrink-0 mt-0.5">▸</span>
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
          </div>
        ))}
      </div>
    </div>
  );
}
