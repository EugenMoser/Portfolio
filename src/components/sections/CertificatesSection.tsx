"use client";

import { data } from "@/data/portfolio";
import { useDesktop } from "@/contexts/DesktopContext";

export default function CertificatesSection() {
  const desktop = useDesktop();

  return (
    <div className="p-6">
      <h2 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-4">
        Certificates
      </h2>
      <div className="grid gap-3">
        {data.certifications.map((cert) => {
          const handleClick = desktop
            ? (e: React.MouseEvent) => {
                e.preventDefault();
                desktop.onOpenCert(cert.link, cert.name);
              }
            : undefined;

          return (
            <a
              key={cert.name}
              href={cert.link}
              target={desktop ? undefined : "_blank"}
              rel="noopener noreferrer"
              onClick={handleClick}
              className="flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-blue-50 cursor-pointer"
              style={{ background: "#f7f7f7", border: "1px solid #e0e0e0" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: "linear-gradient(145deg, #6fa3e0, #4a7fc1)" }}
              >
                🏅
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-gray-800 truncate">{cert.name}</p>
                <p className="text-[11px] text-gray-500">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
              <span className="text-[11px] text-blue-500 flex-shrink-0">
                {desktop ? "↗ Öffnen" : "↗"}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
