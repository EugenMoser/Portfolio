import { data } from "@/data/portfolio";

export default function AboutSection() {
  const { hero, about } = data;

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-start gap-4 mb-6">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
          style={{
            background: "linear-gradient(145deg, #6fa3e0, #4a7fc1)",
            boxShadow: "0 4px 12px rgba(74,127,193,0.4)",
          }}
        >
          👤
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">{hero.name}</h1>
          <p className="text-[13px] text-blue-600 font-medium">{hero.title}</p>
          <p className="text-[12px] text-gray-500">{hero.subtitle}</p>
          <p className="text-[12px] text-gray-500 mt-0.5">📍 {hero.location}</p>
        </div>
      </div>

      <div
        className="rounded-lg p-4 mb-4"
        style={{ background: "#f7f7f7", border: "1px solid #e0e0e0" }}
      >
        <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2">
          About
        </h2>
        {about.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-[13px] text-gray-700 leading-relaxed mb-2 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="flex gap-3">
        <a
          href={`mailto:${hero.email}`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-white transition-opacity hover:opacity-80"
          style={{ background: "linear-gradient(145deg, #6fa3e0, #4a7fc1)" }}
        >
          ✉️ E-Mail
        </a>
        <a
          href={hero.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          🐙 GitHub
        </a>
        <a
          href={hero.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          💼 LinkedIn
        </a>
      </div>
    </div>
  );
}
