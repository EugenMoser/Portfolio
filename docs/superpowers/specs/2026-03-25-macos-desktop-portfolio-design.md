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
- Dock: halbtransparentes Glas-Rechteck, Icon-Dot für aktive App, leichtes Bounce-Hover-Effekt
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
│   │ [◀][▶]   [🔍 eugen-moser.de          ] │   │  ← Finder Toolbar
│   ├──────────┬──────────────────────────── │   │
│   │ PORTFOLIO│                             │   │
│   │ 👤 About │   <Aktiver Inhalt>          │   │  ← Sidebar + Content
│   │ 💼 Proj. │                             │   │
│   │ 🛠 Skills│                             │   │
│   │ 📋 Erf.  │                             │   │
│   │ 🎓 Zert. │                             │   │
│   │ 📬 Kont. │                             │   │
│   ├──────────┴──────────────────────────── │   │
│   │  6 Einträge          React Developer   │   │  ← Status Bar
│   └─────────────────────────────────────────┘   │
│                                                 │
│        [ 👤 ]  [ 💼 ]  [ 🛠 ]  |  [ 📬 ]       │  ← Dock
└─────────────────────────────────────────────────┘
```

---

## Sektionen & Dock-Icons

| Dock-Icon | Sidebar-Label | Inhalt |
|-----------|---------------|--------|
| 👤 | About | Name, Titel, Location, About-Text, GitHub/LinkedIn/E-Mail Links |
| 💼 | Projekte | Projekt-Karten mit Titel, Beschreibung, Tags, Bullets, Link |
| 🛠 | Skills | Skills gruppiert nach Kategorien (Frontend, Backend, DB, Tools, Methodik) |
| 📋 | Erfahrung | Berufliche Stationen mit Periode, Position, Firma, Details |
| 🎓 | Zertifikate | Zertifikat-Karten mit Name, Aussteller, Datum, PDF-Link |
| 📬 | Kontakt | E-Mail, GitHub, LinkedIn als klickbare Aqua-Buttons |

**Startsektion:** About (beim ersten Laden aktiv)

---

## Interaktivität

### Dock
- Klick auf Dock-Icon → wechselt aktive Sektion im Finder-Fenster
- Aktive Sektion: weißer Dot-Indikator unter dem Icon
- Hover: leichter Scale-up-Effekt (Framer Motion)

### Sidebar
- Klick auf Sidebar-Eintrag → gleiche Funktion wie Dock-Klick
- Aktiver Eintrag: blauer Aqua-Gradient-Button-Stil

### Fenster-Buttons (Titlebar)
- Rot (●): dekorativer Hover-Effekt (kein Schließen)
- Gelb (●): dekorativer Hover-Effekt
- Grün (●): dekorativer Hover-Effekt (optional: Vollbild-CSS-Toggle)

### Content-Übergänge
- Framer Motion `AnimatePresence` + `motion.div`
- Fade + leichter Y-Slide beim Sektionswechsel

---

## Komponenten-Architektur

```
src/
  app/
    page.tsx                    ← ersetzt PortfolioGrid durch MacDesktop
  components/
    desktop/
      MacDesktop.tsx            ← Wrapper: Menubar + Desktop-BG + Finder + Dock
      Menubar.tsx               ← obere Leiste mit Apple-Logo, Menüs, Uhr
      FinderWindow.tsx          ← Fenster-Shell (Titlebar + Toolbar + Body + StatusBar)
      FinderSidebar.tsx         ← linke Navigation mit Sektion-Einträgen
      FinderContent.tsx         ← rechter Inhaltsbereich, rendert aktive Sektion
      Dock.tsx                  ← untere Icon-Leiste mit Dot-Indikator
    sections/
      AboutSection.tsx
      ProjectsSection.tsx
      SkillsSection.tsx
      ExperienceSection.tsx
      CertificatesSection.tsx
      ContactSection.tsx
```

**State-Management:** React `useState` in `MacDesktop.tsx`, aktive Sektion wird als Prop nach unten weitergegeben. Kein externer Store nötig.

---

## Mobile-Verhalten

- Unter `md` (768px): Finder-Fenster füllt Viewport
- Sidebar: kollabiert zu Icon-only-Leiste (nur Emojis, kein Text)
- Dock: bleibt sichtbar, Icons kleiner
- Menubar: vereinfacht (nur Apple + Uhr)

---

## Nicht im Scope

- Draggable/resizable Fenster
- Mehrere gleichzeitig offene Fenster
- Echtes Schließen/Minimieren
- Desktop-Icons auf dem Wallpaper (außer dekorativ)
- Dark Mode

---

## Datenbasis

Alle Inhalte kommen aus dem bestehenden `src/data/portfolio.js` — keine Datenmigration nötig.
