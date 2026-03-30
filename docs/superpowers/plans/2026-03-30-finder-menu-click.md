# Finder Menu Click Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finder-Label in der Menubar klickbar machen — öffnet das Finder-Fenster wenn geschlossen, un-shadet wenn shaded.

**Architecture:** `handleFinderClick` in MacDesktop kapselt die State-Logik und wird als Prop an Menubar übergeben. Menubar bekommt außerdem `shaded` um den Cursor korrekt zu setzen.

**Tech Stack:** React, Next.js, TypeScript

---

### Task 1: Menubar — Prop-Interface + Finder-Span

**Files:**
- Modify: `src/components/desktop/Menubar.tsx:82-92` (Props-Interface)
- Modify: `src/components/desktop/Menubar.tsx:187` (Finder-Span)

- [ ] **Step 1: Props-Interface erweitern**

In `src/components/desktop/Menubar.tsx` das Interface von:
```ts
interface Props {
  onNavigate: (id: SectionId) => void;
  windowOpen: boolean;
  onOpenWindow: () => void;
  onCloseWindow: () => void;
  onMinimize: () => void;
  onSpotlight: () => void;
  onOpenLegal: (type: "impressum" | "datenschutz") => void;
}
```
zu:
```ts
interface Props {
  onNavigate: (id: SectionId) => void;
  windowOpen: boolean;
  shaded: boolean;
  onOpenWindow: () => void;
  onCloseWindow: () => void;
  onMinimize: () => void;
  onSpotlight: () => void;
  onOpenLegal: (type: "impressum" | "datenschutz") => void;
  onFinderClick: () => void;
}
```

- [ ] **Step 2: Neuen Props destrukturieren**

Funktionssignatur von:
```ts
export default function Menubar({ onNavigate, windowOpen, onOpenWindow, onCloseWindow, onMinimize, onSpotlight, onOpenLegal }: Props) {
```
zu:
```ts
export default function Menubar({ onNavigate, windowOpen, shaded, onOpenWindow, onCloseWindow, onMinimize, onSpotlight, onOpenLegal, onFinderClick }: Props) {
```

- [ ] **Step 3: Finder-Span klickbar machen**

Zeile ~187 in `src/components/desktop/Menubar.tsx` von:
```tsx
<span style={{ ...menuLabelStyle, fontWeight: 700 }}>Finder</span>
```
zu:
```tsx
<span
  style={{ ...menuLabelStyle, fontWeight: 700, cursor: (!windowOpen || shaded) ? "pointer" : "default" }}
  onClick={onFinderClick}
>
  Finder
</span>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/desktop/Menubar.tsx
git commit -m "feat: add onFinderClick prop to Menubar"
```

---

### Task 2: MacDesktop — Handler + Prop übergeben

**Files:**
- Modify: `src/components/desktop/MacDesktop.tsx:43-54` (navigate-Funktion, neuer Handler)
- Modify: `src/components/desktop/MacDesktop.tsx:89-97` (Menubar JSX)

- [ ] **Step 1: handleFinderClick-Funktion hinzufügen**

In `src/components/desktop/MacDesktop.tsx` nach der `goForward`-Funktion (nach Zeile ~62) einfügen:
```ts
function handleFinderClick() {
  if (!windowOpen) { setWindowOpen(true); setShaded(false); }
  else if (shaded) { setShaded(false); }
}
```

- [ ] **Step 2: Menubar-JSX aktualisieren**

Das `<Menubar>`-Element von:
```tsx
<Menubar
  onNavigate={navigate}
  windowOpen={windowOpen}
  onOpenWindow={() => { setWindowOpen(true); setShaded(false); }}
  onCloseWindow={() => setWindowOpen(false)}
  onMinimize={() => setShaded((s) => !s)}
  onSpotlight={() => setSpotlightOpen(true)}
  onOpenLegal={setLegalWindow}
/>
```
zu:
```tsx
<Menubar
  onNavigate={navigate}
  windowOpen={windowOpen}
  shaded={shaded}
  onOpenWindow={() => { setWindowOpen(true); setShaded(false); }}
  onCloseWindow={() => setWindowOpen(false)}
  onMinimize={() => setShaded((s) => !s)}
  onSpotlight={() => setSpotlightOpen(true)}
  onOpenLegal={setLegalWindow}
  onFinderClick={handleFinderClick}
/>
```

- [ ] **Step 3: Manuell testen**

```bash
pnpm dev
```

Testen:
1. Finder-Fenster schließen (Window → Close Window) → Finder-Label klicken → Fenster öffnet sich
2. Fenster shaden (⌘M) → Finder-Label klicken → Fenster un-shadet
3. Fenster offen + sichtbar → Finder-Label klicken → nichts passiert, kein Fehler

- [ ] **Step 4: Commit**

```bash
git add src/components/desktop/MacDesktop.tsx
git commit -m "feat: Finder menu label opens/unshades FinderWindow on click"
```
