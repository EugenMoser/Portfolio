import type { PortfolioData } from "@/types/portfolio";

const data: PortfolioData = {
  hero: {
    name: "Eugen Moser",
    title: "React & Next.js Developer",
    subtitle: "TypeScript · Tailwind CSS · Fullstack",
    location: "Isny im Allgäu",
    email: "job@eugen-moser.com",
    github: "https://github.com/eugenmoser",
    linkedin: "https://linkedin.com/in/eugen-moser",
  },

  about: `React / Next.js Webentwickler mit Fokus auf skalierbare, saubere und wartbare Fullstack-Lösungen. Ich entwickle Anwendungen problemgetrieben: klare Anforderungen, saubere Architektur, messbarer Mehrwert.

Mein technischer Schwerpunkt liegt auf React, Next.js (App Router), TypeScript und modernen Fullstack-Architekturen – Server Actions, Authentifizierung, Datenbankanbindung via Prisma und sauberem State-Management. Ich lege hohen Wert auf Codequalität, Performance und langfristige Wartbarkeit.

Was mich unterscheidet: Ich verbinde unternehmerisches Denken mit technischer Präzision. Durch meine frühere kaufmännische Laufbahn verstehe ich Prozesse, Stakeholder und Business-Anforderungen – und übersetze sie effizient in stabile Software.`,

  skills: [
    {
      category: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
        "Fluent UI",
        "SCSS",
        "Styled Components",
      ],
    },
    {
      category: "Backend & Cloud",
      items: [
        "Node.js",
        "C# / .NET",
        "Azure",
        "Azure DevOps",
        "Power Automate",
        "Microsoft Graph API",
        "REST API",
        "PowerShell",
      ],
    },
    {
      category: "Datenbank",
      items: ["MongoDB", "Microsoft SQL", "MySQL", "Prisma ORM"],
    },
    {
      category: "Tools",
      items: [
        "Git",
        "GitHub",
        "GitHub Actions",
        "Docker",
        "CI/CD",
        "Jest",
        "NextAuth",
      ],
    },
    {
      category: "Methodik",
      items: ["Scrum (PSM I)", "Kanban", "Agile", "Unit-Tests"],
    },
  ],

  experience: [
    {
      period: "02/2023 – heute",
      position: "React Softwareentwickler / Web Developer",
      company: "Conet Deutschland GmbH",
      description:
        "Entwicklung und Weiterentwicklung moderner Unternehmensanwendungen mit React, TypeScript und dem Microsoft-Ökosystem (M365, Azure). Agile Scrum-Teams, direkter Kundenkontakt, von der Anforderungsanalyse bis zum Deployment.",
      details: [
        "SharePoint-Ressourcenbuchungs-App – Kalenderintegration (react-big-calendar), Verfügbarkeitsprüfung, dynamische Formularlogik, Power Automate · TypeScript, React, Fluent UI",
        "@-Mentioning-Feature inkl. Regex-Parsing & Live-Vorschläge aus Active Directory via Microsoft Graph API",
        "Microsoft Teams App (Tabs & Bots) für Benachrichtigungen und Deep-Linking",
        "Analyse & Bugfix kritischer C#-API-Fehler + Microsoft SQL Server Performance-Optimierungen",
        "Zwei HR-Formularsysteme: wiederverwendbare Komponenten, Drag-and-Drop, kontextbezogene Validierung, Service-Schicht, PowerShell-Deployment",
        "Vue.js → React/TypeScript Migration inkl. WCAG-Barrierefreiheit, Mehrsprachigkeit & CI/CD via Azure DevOps",
      ],
      tags: [
        "React",
        "TypeScript",
        "Fluent UI",
        "Azure",
        "Graph API",
        "SharePoint",
        "C#",
      ],
    },
    {
      period: "05/2024 – 05/2025",
      position: "Elternzeit & Fullstack-Projektstudium",
      company: "Eigenverantwortliches Lernen",
      description:
        "Eigenständige Vertiefung moderner Fullstack-Technologien durch reale Projekte außerhalb des Berufsalltags.",
      details: [
        "Next.js Fullstack-Projekt: Server Actions, REST API-Design, MongoDB-Integration (Prisma ORM), NextAuth-Authentifizierung",
        "Unit-Tests mit Jest, Middleware, API-Routen, saubere Projektstruktur",
      ],
      tags: ["Next.js", "TypeScript", "MongoDB", "Prisma", "NextAuth", "Jest"],
    },
    {
      period: "09/2022 – 12/2022",
      position: "Web Developer – IT-Bootcamp",
      company: "neuefische GmbH",
      description:
        "540h Intensivausbildung in modernen Webtechnologien. Abschlussprojekt: eigenständige Fullstack Web-App.",
      details: [
        "HTML, CSS, JavaScript, React, Next.js, Node.js, MongoDB, Jest, Git/GitHub",
      ],
      tags: ["React", "Next.js", "Node.js", "MongoDB"],
    },
  ],

  projects: [
    {
      title: "Ressourcenbuchungssystem – Belgische Regierung",
      description:
        "Maßgeschneidertes Intranet-Reservierungssystem für Besprechungsräume, Fahrzeuge und Präsentationstechnik – vollständig im Microsoft-365-Ökosystem ohne Drittanbieter.",
      bullets: [
        "Service-Architektur in TypeScript mit separaten Services für Räume, Fahrzeuge, Geräte, Nutzer & Berechtigungen",
        "Kalenderkomponente (react-big-calendar) mit Monats-, Wochen-, Tages- und Agenda-Ansicht",
        "Rollenbasiertes Berechtigungskonzept mit konfigurierbarer Aktionskontrolle und dynamischer Laufzeitprüfung",
        "Parsing wiederkehrender Ereignisse aus SharePoint-XML-Rekurrenzregeln inkl. Ausnahmen",
        "Verfügbarkeitsprüfung, Bugfixing und Refactoring für langfristige Wartbarkeit",
      ],
      tags: ["React", "TypeScript", "SPFx", "Fluent UI", "PnP.js", "REST API"],
      period: "2023 – heute",
    },
    {
      title: "HR Onboarding Form Customizer",
      description:
        "Eigenverantwortlich entwickelter SharePoint Form Customizer für das digitale Mitarbeiter-Onboarding – von der Konzeption bis zum Deployment.",
      bullets: [
        "Vollständige Formulararchitektur inkl. dynamischer Abfrage von SharePoint-Listenfeldern",
        "Wiederverwendbare Eingabekomponenten: Text, ComboBox, RichText, Mehrfachauswahl",
        "Drag-and-Drop-Sortierung von Einträgen, kontextbezogene Fehleranzeigen, Lade-Indikatoren",
        "Service-Schicht für saubere Trennung von Geschäftslogik und UI",
        "PowerShell-Deployment-Skript zur automatischen Verknüpfung via PnP",
      ],
      tags: ["React", "TypeScript", "SPFx", "Fluent UI", "PnP PowerShell"],
      period: "2025",
    },
    {
      title: "Enterprise Collaboration & Notification System",
      description:
        "Firmeninterne Kommunikationslösung für kontextbezogene Diskussionen auf SharePoint-Seiten mit intelligenter Benachrichtigungslogik in Microsoft Teams.",
      bullets: [
        "@-Mention-Feature mit Regex-Parsing und Live-Benutzervorschlägen aus dem Active Directory via Graph API",
        "Microsoft Teams App (Tabs & Bots) für Benachrichtigungen und Deep-Linking auf Inhalte",
        "UI-Modernisierung mit Fluent UI für natives M365 Look & Feel",
        "CI/CD-Management und Versionsmanagement via Azure DevOps",
      ],
      tags: ["React", "TypeScript", "SPFx", "Graph API", "Azure", "Fluent UI"],
      period: "2023 – heute",
    },
    {
      title: "Baumann – Produktkatalog mit Admin-Bereich und KI-Textassistent",
      description:
        "Neuaufbau des Produktkatalogs eines Spritzguss-Herstellers für die Caravan-Branche (rund 126 Produktgruppen, 283 Artikel) als Next.js- und Supabase-App. Die Vorschau läuft mit dem importierten Originalkatalog, mit Einwilligung des Kunden, und ist nicht indexiert.",
      bullets: [
        "Öffentlicher Katalog mit Kategorie- und Produktseiten, Varianten, Farben und daraus abgeleiteten Bestellnummern. Suche nach Name und Artikelnummer, ProductGroup-JSON-LD, ISR.",
        "Admin-Bereich (shadcn/ui) für Produkte, Artikel, Kategorien, Farben, Materialien und Bilder. Änderungen sind ohne Redeploy live.",
        "KI-Textassistent: Er schlägt Produktbeschreibung und SEO-Texte aus den Strukturdaten vor, zuerst über ein freies Modell bei OpenRouter (Vercel AI SDK), als Fallback über Claude Haiku (Anthropic SDK). Ein Mensch prüft und übernimmt sie, KI-Felder bleiben gekennzeichnet, Rate-Limit und Kostendeckel sind eingebaut.",
        "Selbst gehostetes Supabase (PostgreSQL, Auth, Storage) mit RLS auf jeder Tabelle. Der Admin ist dreifach geschützt (Proxy, serverseitige Rollenprüfung, RLS). Schreibvorgänge über mehrere Tabellen laufen als SQL-Funktion in einer Transaktion.",
        "Über 130 Vitest-Dateien, Playwright-E2E-Tests mit axe-Prüfung, pgTAP-Tests für die Datenbank. CI läuft auf jedem Pull Request. Ein Push auf main spielt die Migrationen ein, deployt auf Coolify und prüft danach per Smoke-Check.",
        "KI-gestützt entwickelt mit Claude Code: Spec mit Anforderungs-IDs, Tests zuerst, Code- und Security-Review durch Agenten, Merge durch mich (26 Pull Requests).",
      ],
      tags: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
        "Supabase",
        "PostgreSQL",
        "Zod",
        "Vercel AI SDK",
        "Vitest",
        "Playwright",
        "GitHub Actions",
      ],
      period: "10/2026 – heute",
      live: "https://baumann.eugen-moser.com",
      repoUrl: "https://github.com/EugenMoser/baumann-project",
    },
    {
      title: "Branchen-Demos – Websites für erfundene Betriebe",
      description:
        "Demo-Websites für erfundene Betriebe, als Arbeitsprobe für Kunden. Handwerk, Gastgeber, Physio und Reise laufen in einer Next.js-App. Handwerk und Physio sind seit November 2026 live, Gastgeber und Reise folgen.",
      bullets: [
        "Eine Next.js-App für vier Branchen: je Branche eine Route Group mit eigenem Root-Layout. Der Proxy schreibt die Subdomain auf die Route um, eslint-plugin-boundaries erzwingt die Importgrenzen.",
        "Handwerk: 3D-Dachaufbau mit Three.js und React Three Fiber, gesteuert über den Scroll, mit PBR-Materialien und Nachbearbeitung (Ambient Occlusion, Bloom, SMAA).",
        "Physio: 3D-Körperkarte, bei der die Kamera zur gewählten Region fährt, und Online-Terminbuchung (Zustand) mit Kalenderdatei zum Termin.",
        "Beide 3D-Szenen nutzen einen gemeinsamen Kern: eigene Bildratenüberwachung mit drei Qualitätsstufen, Standbild bei reduzierter Bewegung, ohne WebGL, bei Save-Data, wenig Speicher und Kontextverlust.",
        "Datenschutz von Anfang an: keine Cookies, keine Anfragen an Dritte, Fonts und Texturen selbst gehostet. Formulare laufen als Server Actions mit Zod und Honeypot.",
        "TypeScript strict, über 1.000 Unit-Tests (Vitest), Playwright-E2E- und Screenshot-Tests, Pre-Commit-Hook mit gitleaks, ESLint, Typecheck und Tests.",
        "Docker (Next standalone) auf Coolify mit Auto-Deploy aus main. Entwickelt mit Claude Code: Spec und Plan je Feature, Review vor jedem Merge.",
      ],
      tags: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Three.js",
        "React Three Fiber",
        "Zod",
        "Zustand",
        "Vitest",
        "Playwright",
        "Docker",
        "Coolify",
      ],
      period: "10/2026 – heute",
      live: [
        { label: "Handwerk", href: "https://handwerk-demo.eugen-moser.com" },
        { label: "Physio", href: "https://physio-demo.eugen-moser.com" },
      ],
    },
    {
      title: "Bazam – Regionaler Marktplatz",
      description:
        "Eigenentwicklung eines regionalen Online-Marktplatzes als Next.js Fullstack App.",
      bullets: [
        "Next.js App Router mit Server Actions und REST API-Design",
        "MongoDB-Integration via Prisma ORM, NextAuth-Authentifizierung",
        "Unit-Tests mit Jest, saubere Projektstruktur und Middleware",
      ],
      tags: [
        "Next.js",
        "React",
        "TypeScript",
        "Styled Components",
        "MongoDB",
        "Prisma",
        "Jest",
      ],
      period: "2024/2025",
      live: "https://bazam.vercel.app",
    },
  ],

  certifications: [
    {
      name: "Microsoft Certified: Azure Fundamentals",
      issuer: "Microsoft",
      date: "Juli 2025",
      link: "/certificates/Certification_AZ-900-Microsoft-Conet.pdf",
    },
    {
      name: "Professional Scrum Master I (PSM I)",
      issuer: "Scrum.org",
      date: "März 2024",
      link: "/certificates/Certification_Professional-Scrum-Master-I-Scrum.org.pdf",
    },
    {
      name: "ITIL 4 Foundation Certificate",
      issuer: "PeopleCert / AXELOS",
      date: "April 2024",
      link: "/certificates/Certification_ITIL4-Foundation-PeopleCert.pdf",
    },
    {
      name: "Microsoft 365 Certified: Fundamentals",
      issuer: "Microsoft",
      date: "Februar 2024",
      link: "/certificates/Certification_MS-900-Microsoft.pdf",
    },
  ],
};

export { data };
