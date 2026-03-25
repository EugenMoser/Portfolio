import { data } from "@/data/portfolio";

export default function ContactSection() {
  const { hero } = data;

  return (
    <div className="p-6 max-w-lg">
      <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-4">
        Contact
      </h2>

      <div className="space-y-2 mb-6">
        <a
          href={`mailto:${hero.email}`}
          className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-blue-50"
          style={{ background: "#f7f7f7", border: "1px solid #e0e0e0" }}
        >
          <span className="text-xl">✉️</span>
          <div>
            <p className="text-[11px] text-gray-500 font-medium">E-Mail</p>
            <p className="text-[13px] text-blue-600">{hero.email}</p>
          </div>
        </a>

        <a
          href={hero.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-blue-50"
          style={{ background: "#f7f7f7", border: "1px solid #e0e0e0" }}
        >
          <span className="text-xl">🐙</span>
          <div>
            <p className="text-[11px] text-gray-500 font-medium">GitHub</p>
            <p className="text-[13px] text-blue-600">{hero.github.replace("https://", "")}</p>
          </div>
        </a>

        <a
          href={hero.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-blue-50"
          style={{ background: "#f7f7f7", border: "1px solid #e0e0e0" }}
        >
          <span className="text-xl">💼</span>
          <div>
            <p className="text-[11px] text-gray-500 font-medium">LinkedIn</p>
            <p className="text-[13px] text-blue-600">{hero.linkedin.replace("https://", "")}</p>
          </div>
        </a>

        <div
          className="flex items-center gap-3 rounded-lg p-3"
          style={{ background: "#f7f7f7", border: "1px solid #e0e0e0" }}
        >
          <span className="text-xl">📍</span>
          <div>
            <p className="text-[11px] text-gray-500 font-medium">Standort</p>
            <p className="text-[13px] text-gray-700">{hero.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
