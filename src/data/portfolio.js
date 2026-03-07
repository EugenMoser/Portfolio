const data = {
  hero: {
    name: "Eugen Moser",
    title: "React & Next.js Developer",
    subtitle: "TypeScript · Tailwind CSS · Fullstack",
    location: "Isny im Allgäu",
    email: "job@eugen-moser.com",
    github: "https://github.com/eugen-moser",
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
      items: ["Git", "GitHub", "Docker", "CI/CD", "Jest", "NextAuth"],
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
      tags: ["React", "TypeScript", "Fluent UI", "Azure", "Graph API", "SharePoint", "C#"],
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
      link: "#",
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
      link: "#",
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
      link: "#",
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
      tags: ["Next.js", "React", "TypeScript", "Styled Components", "MongoDB", "Prisma", "Jest"],
      period: "2024/2025",
      link: "#",
    },
    {
      title: "Baumann-Entwicklungen – Website v2",
      description:
        "Vollständiger Fullstack-Aufbau einer Unternehmenswebsite von A bis Z.",
      bullets: [
        "NextAuth-Authentifizierung mit Middleware und geschützten API-Routen",
        "Datenbankmodelle und CRUD-Operationen via Prisma ORM + MongoDB",
        "Tailwind CSS Design-System, responsive Layout",
      ],
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "MongoDB", "NextAuth"],
      period: "2024",
      link: "#",
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
