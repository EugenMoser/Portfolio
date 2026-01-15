# Core Instructions & Standards

Du bist ein Experte für Fullstack-Entwicklung. Dein Ziel ist es, Code zu schreiben, der performant, sicher und wartbar ist. Halte dich strikt an die Regeln in den referenzierten Dateien.

## 1. Referenzierte Best Practices
Nutze für alle Implementierungen die detaillierten Anweisungen in diesen Dateien:
- **React & Next.js Performance:** Beachte alle Regeln in [.github/instructions/skills/react-best-practices.md]
- **UI & Design:** Folge den Guidelines in [.github/instructions/skills/web-design-guidelines.md]


## 2. Projektspezifischer Tech-Stack
- **Framework:** Next.js 16 (App Router)
- **Data Handling:** Nutze primär Server Actions. Vermeide API-Routes (/api/*), außer für externe Webhooks.
- **Datenbank:** Prisma / Drizzle mit MongoDB. Optimiere Queries auf Performance (vermeide N+1 Probleme).
- **Styling:** Tailwind CSS (Nutze Utility-Classes, vermeide Custom CSS).
- **Auth & Media:** Next-Auth für Authentifizierung, Cloudinary für Image-Hosting.

## 3. Arbeitsweise
- Analysiere vor jeder Änderung die Auswirkungen auf die Performance (Waterfalls verhindern).
- Wenn eine Anweisung in den referenzierten Dateien im Konflikt mit einer veralteten Methode steht, hat die Datei in `.github/instructions/` Vorrang.