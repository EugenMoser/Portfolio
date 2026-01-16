const strings = {
  sectionTitle: {
    aboutMe: "Über mich",
    certifications: "Zertifikate",
    contact: "Kontakt",
    education: "Bildung",
    resume: "Lebenslauf",
  },

  aboutMeText: `React / Next.js Webentwickler mit Fokus auf skalierbare, saubere und wartbare Fullstack-Lösungen. Ich entwickle Anwendungen nicht „featuregetrieben“, sondern problemgetrieben: klare Anforderungen, saubere Architektur, messbarer Mehrwert.

  Mein technischer Schwerpunkt liegt auf React, Next.js (App Router), TypeScript und modernen Fullstack-Architekturen mit Server Actions, Authentifizierung, Datenbanken (MongoDB / SQL via Prisma) und sauberem State-Management. Ich lege hohen Wert auf Codequalität, Performance, Security und langfristige Wartbarkeit – kein Schnellschuss-Code, der in sechs Monaten Probleme macht.

  Was mich von vielen Entwicklern unterscheidet:
  Ich verbinde unternehmerisches Denken mit technischer Präzision. Durch meine frühere Laufbahn im kaufmännischen Umfeld verstehe ich Prozesse, Abhängigkeiten und Stakeholder – und übersetze Business-Anforderungen effizient in stabile Software. Ich denke in Systemen, nicht in Komponenten.

  Beruflich habe ich in Enterprise-Umgebungen mit tausenden Nutzern gearbeitet (SharePoint / SPFx), APIs erweitert, Legacy-Code stabilisiert und moderne React-Frontends aufgebaut. Gleichzeitig entwickle ich eigenständig moderne Next.js-Fullstack-Projekte, setze Authentifizierung, Datenmodelle, CI-nahe Workflows und saubere Projektstrukturen um.`,

  resume: {
    experienceTitle: "Praktische Erfahrung",
    experience: [
      {
        period: `2023 - heute`,
        position: `Junior Developer (Schwerpunkt Microsoft SharePoint)`,
        company: `CONET Technologies Holding GmbH`,
        details: [
          "Entwicklung von SharePoint-Lösungen mit Framework SPFx",
          "Einsatz von Power Automate und Power Apps",
        ],
      },
      {
        period: `2022 – 2022`,
        position: `Trainee Web Development`,
        company: `neue fische – School and Pool für Digital Talent`,
        details: [
          "Intensiv-Coding-Bootcamp in Vollzeit",
          "540 Stunden Programmierpraxis mit Eigenentwicklung einer Web App als Abschlussarbeit",
          "Angewandte Technologien und Tools: HTML5, CSS3, JavaScript, React, Next.js, Node.js, npm, Storybook, MongoDB, Git, GitHub",
        ],
      },
      {
        period: `2021 – 2022`,
        position: `Chassis-Disponent`,
        company: `Dethleffs GmbH & Co. KG`,
        details: [
          "Ermittlung des Bedarfs an Chassis",
          "Bestellung der Chassis beim Hersteller",
          "Chassis-Eingangsbuchung",
        ],
      },
      {
        period: `2021 – 2021`,
        position: `Kaufmännischer Angestellter im Controlling`,
        company: `Walter Seitz GmbH & Co. KG`,
        details: [
          "Aufbereitung von Kennzahlen für die Geschäfts- und Vertriebsleitung",
          "Auswertungen für den Bereich Vertrieb und After-Sales",
          "Entwicklung neuer Auswertungen in Excel",
          "Monatliche Auswertung und Analyse des Betriebsergebnisses",
        ],
      },
      {
        period: `2006 – 2020`,
        position: `Verkaufsabwicklung / Automobilkaufmann`,
        company: `Weber + Seitz GmbH`,
        details: [
          "Externe und interne Koordination und Organisation im Vertrieb",
          "Auftrags- und Rechnungserstellung für Fahrzeuge und Zubehör",
          "Abwicklung von Finanzierungs- und Leasingverträgen",
          "Verwaltung der Stammdaten und Fahrzeugdaten",
          "Inserieren von Fahrzeugen auf diversen Online-Plattformen",
          "Beauftragung und Organisation externer Dienstleister (Fotografen, Gutachter, Fahrzeugaufbereiter, Fahrzeugbekleber)",
        ],
      },
    ],
    continuingEducationTitle: "Weiterbildung",
    continuingEducation: [
      {
        period: `2010 – 2013`,
        position: `Geprüfter Wirtschaftsfachwirt (Bachelor Professional of Business)`,
        company: `IHK Schwaben`,
        details: [
          "Betriebswirtschaftslehre",
          "Volkswirtschaftslehre",
          "Recht (BGB, HGB, Wettbewerbsrecht, Arbeitsrecht)",
          "Betriebliches Rechnungswesen, Investition, Finanzierung und Controlling",
          "Führung und Zusammenarbeit im Unternehmen",
          "Betriebliches Management",
          "Marketing und Vertrieb",
          "Logistik",
          "Steuer",
        ],
      },
      {
        period: `Oktober 2013`,
        position: `Ausbildung der Ausbilder (AdA)`,
        company: `IHK Schwaben`,
        details: [
          "Nachweis zur Vermittlung der berufs- und arbeitspädagogischen Fertigkeiten, Kenntnisse und Fähigkeiten nach dem Berufsbildungsgesetz",
        ],
      },
    ],
    vocationalEducationTitle: "Berufsausbildung",
    vocationalEducation: [
      {
        period: `2003 – 2006`,
        position: `Automobilkaufmann`,
        company: `Humpisschule Ravensburg, Kaufmännische Berufsschule`,
        details: [],
      },
    ],

    communityServiceTitle: "Zivieldienst",
    communityService: [
      {
        period: `2002 – 2003`,
        position: `Krankentransport`,
        company: `KAP in Wangen`,
        details: ["Ausbildung zum Rettungsdiensthelfer"],
      },
    ],
    graduationTitle: "Schulabschluss",
    graduation: [
      {
        period: `2000 – 2002`,
        position: `Fachabitur / Fachhochschulreife und Staatlich geprüfter Wirtschaftsassistent`,
        company: `Berufliches Schulzentrum Wangen, Berufskolleg Wirtschaftsinformatik`,
        details: [],
      },
    ],
  },
  certifications: [
    {
      name: `ITIL® 4 Foundation (PeopleCert)`,
      link: `https://www.linkedin.com/in/eugen-moser/details/certifications/1714120003654/single-media-viewer/?profileId=ACoAACviTdMBMDUILrpUMpI-0E_J4J6x82fs4CY`,
    },
    {
      name: `Professional Scrum Master I (Scrum.org)`,
      link: `https://www.credly.com/badges/209b3aa3-700c-44f4-b2fa-baf525ab6569/public_url`,
    },
    {
      name: `Microsoft 365 Certified: Fundamentials (Microsoft)`,
      link: `https://www.linkedin.com/in/eugen-moser/details/certifications/1707384542261/single-media-viewer/?profileId=ACoAACviTdMBMDUILrpUMpI-0E_J4J6x82fs4CY`,
    },
  ],
  education: [
    {
      name: `IT-Bootcamp (neuefische)`,
      link: `https://www.linkedin.com/in/eugen-moser/details/certifications/1720299471327/single-media-viewer/?profileId=ACoAACviTdMBMDUILrpUMpI-0E_J4J6x82fs4CY`,
    },
    {
      name: `Bachelor Professional of Business (IHK Schwaben)`,
      link: `https://www.linkedin.com/in/eugen-moser/details/certifications/1720299399582/single-media-viewer/?profileId=ACoAACviTdMBMDUILrpUMpI-0E_J4J6x82fs4CY`,
    },
    {
      name: `Ausbildung der Ausbilder (IHK Schwaben)`,
      link: `https://www.linkedin.com/in/eugen-moser/details/certifications/1720299352602/single-media-viewer/?profileId=ACoAACviTdMBMDUILrpUMpI-0E_J4J6x82fs4CY`,
    },
  ],
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "MongoDB",
    "Git",
    "SharePoint",
    "Power Automate",
    "SPFx",
    "Docker",
  ],
  projects: [
    {
      title: "Portfolio Website",
      description:
        "Ein modernes, performantes Portfolio mit Next.js 16, Tailwind CSS und Bento-Grid Layout.",
      tags: ["Next.js", "React", "Tailwind"],
      link: "#",
    },
    {
      title: "Abschlussarbeit Web App",
      description:
        "Individuelle Entwicklung einer Web Applikation im Rahmen des Coding Bootcamps.",
      tags: ["React", "MongoDB", "Node.js"],
      link: "#",
    },
  ],
};
export { strings };
