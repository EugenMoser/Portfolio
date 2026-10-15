# eugen-moser.com

Meine Portfolio-Website. Gebaut mit dem Stack, den ich auch im Job einsetzen will.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS · Framer Motion

## Starten

```bash
pnpm install && pnpm dev
```

## Inhalte ändern

Alles in einer Datei: **`src/data/portfolio.js`**

Kein CMS, kein Headless-Backend, kein Overkill.

## Struktur

```
src/data/portfolio.js   ← hier werden Inhalte gepflegt
public/certificates/    ← PDFs der Zertifikate
public/Portfolio-Image.png
```

## Seiten

`/` · `/impressum` · `/datenschutz`

## Deployment

Die Seite läuft als Docker-Container (`Dockerfile`, Next.js `output: "standalone"`)
auf einem VPS mit Coolify unter `https://portfolio.eugen-moser.com`. Coolify baut das
Image aus dem Branch `main` und setzt die Umgebungsvariablen zur Laufzeit:

| Variable    | Inhalt                                                          |
| ----------- | --------------------------------------------------------------- |
| `SITE_URL`  | öffentliche URL; nur von diesem Origin nimmt `/api/contact` an  |
| `SMTP_HOST` | SMTP-Server des Postfachs (ALL-INKL: `w0….kasserver.com`)       |
| `SMTP_PORT` | optional, Standard `465` (SSL/TLS); jeder andere Port: STARTTLS |
| `SMTP_USER` | Postfach-Adresse, zugleich Absender (`formular@<domain>`)       |
| `SMTP_PASS` | Passwort des Postfachs                                          |

Lokal testen:

```bash
docker build -t portfolio:local .
docker run --rm -p 3000:3000 -e SITE_URL=http://localhost:3000 \
  -e SMTP_HOST= -e SMTP_USER= -e SMTP_PASS= portfolio:local
```
