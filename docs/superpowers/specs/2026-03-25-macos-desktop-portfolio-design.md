# macOS Aqua Desktop Portfolio — Design Spec

**Date:** 2026-03-25
**Branch:** `feature/macos-desktop`
**Status:** Approved

---

## Overview

Redesign des Portfolios als vollständige macOS Aqua/Tiger Desktop-Simulation (2001–2007 Ära). Der erste und einzige Viewport sieht aus wie ein echter macOS-Desktop: Menubar oben, Finder-Fenster in der Mitte, Dock unten. Der gesamte Portfolio-Inhalt ist innerhalb des Finder-Fensters navigierbar.

---

## Aesthetic

**macOS Aqua / Tiger (2001–2007)**

- Hintergrund: Blauer Aqua-Gradient (`#1d5fb5` → `#4a90d9` → `#6ab0f0`)
- Menubar: halbtransparent, weißlich, mit Backdrop-Blur
- Fenster-Titlebar: Pinstripe-Grau-Gradient, Aqua-Ampel-Buttons (rot/gelb/grün mit Glanz)
- Sidebar: hellgrau (`#e0e0e0`), aktiver Eintrag als blauer Gradient-Button
- Buttons: Aqua-Gel-Stil mit Glanzlicht oben
- Dock: halbtransparentes Glas-Rechteck, Icon-Dot für aktive App, leichter Scale-Hover-Effekt
- Typografie: System-Font-Stack (`-apple-system`, `BlinkMacSystemFont`, `"Lucida Grande"`)

---

## Layout-Struktur

```
┌─────────────────────────────────────────────────┐
│  🍎  Finder  Ablage  Bearbeiten  Darstellung ...  │  ← Menubar (fixed, full width)
├─────────────────────────────────────────────────┤
│                                                 │
│   ┌─────────────────────────────────────────┐   │
│   │ ● ● ●   Portfolio — Eugen Moser         │   │  ← Finder Titlebar
│   ├───────────────────────────────────────  │   │
│   │ [◀][▶]   [🔍 eugen-moser.de          ] │   │  ← Finder Toolbar (dekorativ)
│   ├──────────┬──────────────────────────── │   │
│   │ PORTFOLIO│                             │   │
│   │ 👤 About │   <Aktiver Inhalt>          │   │  ← Sidebar + Content (nur Content scrollt)
│   │ 💼 Proj. │                             │   │
│   │ 🛠 Skills│                             │   │
│   │ 📋 Erf.  │                             │   │
│   │ 🎓 Zert. │                             │   │
│   │ 📬 Kont. │                             │   │
│   ├──────────┴──────────────────────────── │   │
│   │  <Anzahl> Einträge    <Sektions-Label> │   │  ← Status Bar (dynamisch)
│   └─────────────────────────────────────────┘   │
│                                                 │
│        [ 👤 ]  [ 💼 ]  [ 🛠 ]  |  [ 📬 ]       │  ← Dock
└─────────────────────────────────────────────────┘
```

---

## Sektionen & Dock-Icons

| Dock-Icon | Sidebar-Label | Inhalt | Status-Bar Anzahl | Status-Bar Label |
|-----------|---------------|--------|-------------------|-----------------|
| 👤 | About | Foto + Name + Titel + Location + About-Text + Links | `""` (leer) | `data.hero.title` |
| 💼 | Projekte | Projekt-Karten (Titel, Beschreibung, Bullets, Tags, Link) | `` `${data.projects.length} Projekte` `` | `"Fullstack & Enterprise"` |
| 🛠 | Skills | Skills gruppiert nach Kategorien | `` `${data.skills.length} Kategorien` `` | `"Frontend · Backend · Tools"` |
| 📋 | Erfahrung | Berufliche Stationen (Periode, Position, Firma, Details, Tags) | `` `${data.experience.length} Stationen` `` | `"seit 2022"` |
| 🎓 | Zertifikate | Zertifikat-Karten (Name, Aussteller, Datum, PDF-Link) | `` `${data.certifications.length} Zertifikate` `` | `"Microsoft · Scrum · ITIL"` |
| 📬 | Kontakt | E-Mail, GitHub, LinkedIn als Aqua-Buttons | `""` (leer) | `data.hero.location` |

**Statusbar-Counts** werden dynamisch berechnet (nicht hardcodiert), sodass sie automatisch korrekt bleiben wenn Daten geändert werden.

**`Certification.link`:** Der Wert ist in allen bestehenden Einträgen gesetzt. Falls kein Link vorhanden (`link` ist leer), wird der PDF-Link-Button in `CertificatesSection` ausgeblendet (`link ? <a>...</a> : null`).

**Startsektion beim ersten Laden:** About

---

## AboutSection — Datenzusammensetzung

`AboutSection` bezieht Daten aus **beiden** Portfolio-Datenquellen:
- `data.hero` → Name, Titel, Subtitle, Location, E-Mail, GitHub, LinkedIn
- `data.about` → Fließtext (mehrzeiliger String)

Das Profilfoto (`/Portfolio-Image.png`) aus der aktuellen `PortfolioGrid`-Implementierung wird **übernommen** und oben links im About-Bereich angezeigt (rund, ~80px, Aqua-Schatten).

Layout der About-Sektion:
```
[ Foto 80px ]  Eugen Moser
               React & Next.js Developer
               TypeScript · Tailwind · Fullstack
               📍 Isny im Allgäu
─────────────────────────────────────────
  About-Text (mehrzeilig, scrollbar)
─────────────────────────────────────────
  [GitHub]  [LinkedIn]  [E-Mail]   ← Aqua-Gel-Buttons
```

---

## Interaktivität

### Dock
- Klick auf Dock-Icon → wechselt aktive Sektion in `MacDesktop` State
- Aktive Sektion: weißer Dot-Indikator (4px Kreis) unter dem Icon
- Hover: `scale(1.15)` via Framer Motion `whileHover`, `duration: 0.15`
- Kein Bounce-Effekt (zu aufwändig für v1)

### Sidebar
- Klick auf Sidebar-Eintrag → gleiche State-Änderung wie Dock-Klick
- Aktiver Eintrag: blauer Aqua-Gradient-Button (`#4a90d9` → `#2a6cb5`)
- Inaktive Einträge: transparenter Hintergrund, `#333` Text

### Fenster-Buttons (Titlebar)
- Rot (●): Hover zeigt `×`-Symbol, kein Funktionseffekt
- Gelb (●): Hover zeigt `−`-Symbol, kein Funktionseffekt
- Grün (●): Hover zeigt `+`-Symbol, kein Funktionseffekt
- **Kein Vollbild-Toggle** — alle drei Buttons sind rein dekorativ

### Content-Übergänge
- `AnimatePresence mode="wait"` — aktive Sektion wird **unmounted** beim Wechsel, neue Sektion **mounted**
- Exit-Animation: `opacity: 0`, `y: -8`, `duration: 0.15`, `ease: "easeIn"`
- Enter-Animation: `opacity: 0 → 1`, `y: 8 → 0`, `duration: 0.2`, `ease: "easeOut"`

### Content-Scroll
- Das Finder-Fenster hat eine fixe Höhe: `calc(100vh - 28px - 80px - 32px)` (28px Menubar, 80px Dock-Bereich inkl. Padding, 32px Desktop-Padding oben/unten)
- **Nur der Content-Bereich** (`FinderContent`) scrollt: `overflow-y: auto`, `flex: 1`, `min-height: 0`
- Titlebar (32px), Toolbar (28px), Sidebar und StatusBar (22px) bleiben fest
- Das Finder-Fenster selbst hat `display: flex; flex-direction: column; height: 100%`

---

## Menubar

`Menubar.tsx` zeigt:
- 🍎 Apple-Logo (links, dekorativ)
- Menü-Labels: `Finder`, `Ablage`, `Bearbeiten`, `Darstellung`, `Gehe zu` (alle dekorativ, kein Dropdown)
- Uhr rechts: Format `HH:MM` (24h), live-aktualisiert mit `setInterval` alle 60 Sekunden
- SSR-Hydration: Uhr rendert initial `""` (leerer String), nach Mount mit `useEffect` gesetzt — verhindert Hydration-Mismatch
- Weitere Dekorationen rechts: `📶` (WLAN-Symbol), `🔋` (Akku-Symbol), beide statisch

---

## TypeScript — Datei-Migration

`src/data/portfolio.js` wird zu `src/data/portfolio.ts` migriert. Folgende Interfaces werden in `src/types/portfolio.ts` definiert (ersetzt/erweitert `customTypes.ts`):

```ts
export interface Hero {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  period: string;
  position: string;
  company: string;
  description: string;
  details: string[];
  tags: string[];
}

export interface Project {
  title: string;
  description: string;
  bullets: string[];
  tags: string[];
  period: string;
  link?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface PortfolioData {
  hero: Hero;
  about: string;
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
}
```

---

## Komponenten-Architektur

```
src/
  app/
    page.tsx                    ← ersetzt <PortfolioGrid> durch <MacDesktop>; Footer entfällt
  data/
    portfolio.ts                ← Migration von .js zu .ts mit PortfolioData-Export
  types/
    portfolio.ts                ← Interfaces (siehe oben)
  components/
    desktop/
      MacDesktop.tsx            ← Haupt-Wrapper; hält useState<SectionId>; gibt activeSection + setActiveSection an Dock, Sidebar, Content weiter
      Menubar.tsx               ← Dekorative Menübar mit Live-Uhr (useEffect für SSR-Safety)
      FinderWindow.tsx          ← Fenster-Shell: Titlebar + Toolbar + (Sidebar | Content) + StatusBar
      FinderSidebar.tsx         ← Navigationsleiste; Props: activeSection, onSelect
      FinderContent.tsx         ← AnimatePresence + switch(activeSection) → rendert Section-Komponente
      Dock.tsx                  ← Icon-Leiste; Props: activeSection, onSelect
    sections/
      AboutSection.tsx          ← data.hero + data.about + Profilfoto
      ProjectsSection.tsx       ← data.projects
      SkillsSection.tsx         ← data.skills
      ExperienceSection.tsx     ← data.experience
      CertificatesSection.tsx   ← data.certifications
      ContactSection.tsx        ← data.hero (email, github, linkedin)
```

**State-Flow:**
```
MacDesktop (useState: activeSection)
  ├── Menubar (keine Section-Props)
  ├── FinderWindow
  │     ├── FinderSidebar (activeSection, onSelect)
  │     └── FinderContent (activeSection)
  └── Dock (activeSection, onSelect)
```

**SectionId-Typ:**
```ts
export type SectionId = 'about' | 'projects' | 'skills' | 'experience' | 'certificates' | 'contact';
```

**`"use client"` Direktiven** (zwingend für App Router):
- `MacDesktop.tsx` — `"use client"` (useState)
- `Menubar.tsx` — `"use client"` (useEffect für Live-Uhr)
- `Dock.tsx` — `"use client"` (onClick-Handler, Framer Motion)
- `FinderSidebar.tsx` — `"use client"` (onClick-Handler)
- `FinderContent.tsx` — `"use client"` (AnimatePresence, Framer Motion)
- Alle `sections/*.tsx` — können Server Components bleiben (reine Darstellung, keine Hooks)

**`AnimatePresence` Key:**
```tsx
// FinderContent.tsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeSection}   // ← zwingend, triggert Exit/Enter-Zyklus
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
  >
    {renderSection(activeSection)}
  </motion.div>
</AnimatePresence>
```

**Daten-Export aus `portfolio.ts`:**
Named Export bleibt identisch: `export { data }` — alle bestehenden Imports bleiben kompatibel. `PortfolioGrid.tsx` wird im Zuge dieser Änderung gelöscht (ersetzt durch die neuen Section-Komponenten).

---

## layout.tsx — Änderungen

Das aktuelle `layout.tsx` rendert global `<Navigation>` und `<Footer>` um alle `children`. Dies kollidiert mit dem Fullscreen-Desktop-Design. `layout.tsx` wird wie folgt angepasst:

- `<Navigation>` Import + Verwendung **entfernt**
- `<Footer>` Import + Verwendung **entfernt**
- `<body>` bekommt nur `className="overflow-hidden"` — kein flex-Layout mehr nötig
- `children` wird direkt ohne Wrapper gerendert
- `MacDesktop` bringt sein eigenes Layout (Menubar + Window + Dock) komplett mit

Der bestehende `Footer`-Import in `page.tsx` **entfällt ebenfalls**. Impressum- und Datenschutz-Links werden in `ContactSection.tsx` als kleine Text-Links eingebaut.

---

## Accessibility (a11y)

- `FinderSidebar`: `<nav role="navigation" aria-label="Portfolio Navigation">`
- Sidebar-Einträge: `<button aria-current={isActive ? 'page' : undefined}>` — im normalen Tab-Flow
- `FinderContent`: `<main aria-live="polite">` — Screen-Reader kündigt Sektionswechsel an
- Dock-Icons: `<button aria-label="Öffne Projekte">` etc. — im normalen Tab-Flow
- Titlebar-Buttons (rot/gelb/grün): `aria-hidden="true" tabIndex={-1}` — dekorativ, kein Tastatur-Fokus
- Menubar-Links (Ablage etc.): `aria-hidden="true"` — rein dekorativ
- Fokus-Management: beim Sektionswechsel erhält `<main>` `focus()` via `useRef` und `tabIndex={-1}`
- Kein Skip-to-Content-Link nötig — die gesamte Seite ist der Content

---

## Mobile-Verhalten

**Breakpoint: `md` = 768px**

| Element | Desktop (≥768px) | Mobile (<768px) |
|---------|------------------|-----------------|
| Menubar | Vollständig | Nur 🍎 + Uhr |
| FinderWindow | Zentriert, max-width ~900px | Füllt Viewport (keine Margins) |
| Sidebar | `w-36` (144px), Text + Emoji | `w-12` (48px), nur Emoji — Labels via `<span class="hidden md:inline">` |
| Content | Volle Breite | Volle Breite, mehr Padding |
| Dock | 44px Icons | 36px Icons |

**Sidebar Mobile-Rendering:**
```tsx
<button>
  <span>{icon}</span>                          {/* immer sichtbar */}
  <span className="hidden md:inline">{label}</span>  {/* nur ab md */}
</button>
```

Kein Toggle-Button für Sidebar auf Mobile — automatische Größenreduktion via Tailwind-Breakpoints. Minimale unterstützte Breite: 320px.

---

## Nicht im Scope

- Draggable/resizable Fenster
- Mehrere gleichzeitig offene Fenster
- Echtes Schließen/Minimieren (Buttons dekorativ)
- Desktop-Icons auf dem Wallpaper
- Dark Mode
- Animierter Dock-Bounce (Magnification)

---

## Datenbasis

Alle Inhalte kommen aus `src/data/portfolio.ts` (migriert von `.js`) — keine inhaltliche Datenmigration, nur Typ-Annotation.
