import { data } from "@/data/portfolio";

export default function CertificatesSection() {
  return (
    <div className="p-6">
      <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-4">
        Certificates
      </h2>
      <div className="grid gap-3">
        {data.certifications.map((cert) => (
          <a
            key={cert.name}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-blue-50"
            style={{ background: "#f7f7f7", border: "1px solid #e0e0e0" }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{
                background: "linear-gradient(145deg, #6fa3e0, #4a7fc1)",
              }}
            >
              🏅
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-800 truncate">
                {cert.name}
              </p>
              <p className="text-[11px] text-gray-500">
                {cert.issuer} · {cert.date}
              </p>
            </div>
            <span className="text-[11px] text-blue-500 flex-shrink-0">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
