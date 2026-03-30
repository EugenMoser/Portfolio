# Spec: Finder Menu Click — Fenster öffnen/un-shaden

**Date:** 2026-03-30
**Branch:** feature/macos-desktop
**Status:** Approved

## Ziel

Der "Finder"-Text in der Menubar soll klickbar werden und das Finder-Fenster öffnen oder un-shaden, wenn es nicht sichtbar ist.

## Verhalten

| Zustand | Klick auf "Finder" |
|---|---|
| `windowOpen = false` | Fenster öffnen (`windowOpen = true`, `shaded = false`) |
| `windowOpen = true`, `shaded = true` | Un-shaden (`shaded = false`) |
| `windowOpen = true`, `shaded = false` | Nichts tun (Fenster bereits sichtbar) |

## Änderungen

### MacDesktop.tsx
- Neue Handler-Funktion `handleFinderClick`:
  ```ts
  function handleFinderClick() {
    if (!windowOpen) { setWindowOpen(true); setShaded(false); }
    else if (shaded) { setShaded(false); }
  }
  ```
- Neues Prop `onFinderClick={handleFinderClick}` an `<Menubar>` übergeben

### Menubar.tsx
- Props-Interface: `onFinderClick: () => void` hinzufügen
- Finder-Span: `onClick={onFinderClick}` + `cursor: "pointer"` wenn Aktion möglich (d.h. `!windowOpen || shaded`)
- `windowOpen` und `shaded` als neue Props für Cursor-Logik

## Out of Scope
- Icon-View / List-View Toggle (separates Backlog-Item)
- Finder-Dropdown-Menü
- Visuelles Hover-Feedback auf dem Finder-Label
