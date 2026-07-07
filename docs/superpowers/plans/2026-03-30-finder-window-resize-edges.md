# FinderWindow Multi-Edge Resize Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** FinderWindow an allen 4 Kanten und 4 Ecken per Drag verstellbar machen — wie echtes macOS.

**Architecture:** Die bestehende `onResizePointerDown`-Funktion wird durch eine generische `startResize(direction)` Funktion ersetzt. Diese gibt einen `React.PointerEventHandler` zurück und nutzt eine Direction-String (`'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'`) um zu bestimmen welche Achsen sich ändern. Der einzelne SE-Handle-Div wird durch 8 positionierte Handle-Divs ersetzt.

**Tech Stack:** React, TypeScript, framer-motion (`useMotionValue`)

---

### Task 1: startResize-Funktion + 8 Handles

**Files:**
- Modify: `src/components/desktop/FinderWindow.tsx`

#### Kontext

Aktueller Stand in `src/components/desktop/FinderWindow.tsx`:
- Zeile 136: `const resizeStart = useRef<{ ex: number; ey: number; w: number; h: number } | null>(null);`
- Zeilen 138–157: `onResizePointerDown` Funktion (nur SE)
- Zeilen 284–290: Einzelner SE-Handle-Div am Ende des `motion.div`

---

- [ ] **Step 1: ResizeDirection-Typ + erweitertes resizeStart-Ref**

In `src/components/desktop/FinderWindow.tsx` direkt nach den Konstanten (nach `const MIN_HEIGHT = 300;`, ca. Zeile 15) einfügen:

```ts
type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
```

Dann das `resizeStart` Ref (Zeile ~136) von:
```ts
const resizeStart = useRef<{ ex: number; ey: number; w: number; h: number } | null>(null);
```
zu:
```ts
const resizeStart = useRef<{ ex: number; ey: number; w: number; h: number; px: number; py: number } | null>(null);
```

---

- [ ] **Step 2: onResizePointerDown durch startResize ersetzen**

Die gesamte `onResizePointerDown`-Funktion (Zeilen ~138–157) ersetzen durch:

```ts
function startResize(direction: ResizeDirection) {
  return (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (maximized || shaded) return;
    resizeStart.current = {
      ex: e.clientX, ey: e.clientY,
      w: size.width, h: size.height,
      px: x.get(), py: y.get(),
    };
    function onMove(ev: PointerEvent) {
      const start = resizeStart.current;
      if (!start) return;
      const dX = ev.clientX - start.ex;
      const dY = ev.clientY - start.ey;
      let newW = start.w;
      let newH = start.h;
      let newX = start.px;
      let newY = start.py;
      if (direction.includes('e')) newW = Math.max(MIN_WIDTH, start.w + dX);
      if (direction.includes('w')) {
        newW = Math.max(MIN_WIDTH, start.w - dX);
        newX = start.px + (start.w - newW);
      }
      if (direction.includes('s')) newH = Math.max(MIN_HEIGHT, start.h + dY);
      if (direction.includes('n')) {
        newH = Math.max(MIN_HEIGHT, start.h - dY);
        newY = start.py + (start.h - newH);
      }
      setSize({ width: newW, height: newH });
      if (direction.includes('w')) x.set(newX);
      if (direction.includes('n')) y.set(newY);
    }
    function onUp() {
      resizeStart.current = null;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    }
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };
}
```

---

- [ ] **Step 3: Einzelnen SE-Handle-Div durch 8 Handles ersetzen**

Den bestehenden Handle-Block am Ende des `motion.div` (Zeilen ~283–290):
```tsx
{/* Resize handle */}
{!shaded && !maximized && (
  <div
    onPointerDown={onResizePointerDown}
    className="absolute bottom-0 right-0"
    style={{ width: 16, height: 16, cursor: "se-resize", zIndex: 10 }}
  />
)}
```
ersetzen durch:
```tsx
{/* Resize handles — 4 corners + 4 edges */}
{!shaded && !maximized && (
  <>
    {/* Corners */}
    <div onPointerDown={startResize('nw')} className="absolute top-0 left-0" style={{ width: 12, height: 12, cursor: 'nw-resize', zIndex: 11 }} />
    <div onPointerDown={startResize('ne')} className="absolute top-0 right-0" style={{ width: 12, height: 12, cursor: 'ne-resize', zIndex: 11 }} />
    <div onPointerDown={startResize('se')} className="absolute bottom-0 right-0" style={{ width: 12, height: 12, cursor: 'se-resize', zIndex: 11 }} />
    <div onPointerDown={startResize('sw')} className="absolute bottom-0 left-0" style={{ width: 12, height: 12, cursor: 'sw-resize', zIndex: 11 }} />
    {/* Edges */}
    <div onPointerDown={startResize('n')} className="absolute top-0 left-3 right-3" style={{ height: 6, cursor: 'n-resize', zIndex: 10 }} />
    <div onPointerDown={startResize('s')} className="absolute bottom-0 left-3 right-3" style={{ height: 6, cursor: 's-resize', zIndex: 10 }} />
    <div onPointerDown={startResize('e')} className="absolute top-3 bottom-3 right-0" style={{ width: 6, cursor: 'e-resize', zIndex: 10 }} />
    <div onPointerDown={startResize('w')} className="absolute top-3 bottom-3 left-0" style={{ width: 6, cursor: 'w-resize', zIndex: 10 }} />
  </>
)}
```

---

- [ ] **Step 4: TypeScript-Check**

```bash
cd /Users/eugen/Project/Portfolio && pnpm tsc --noEmit
```

Erwartete Ausgabe: keine Fehler

---

- [ ] **Step 5: Manuell testen**

```bash
pnpm dev
```

Testen:
1. Rechte Kante ziehen → Fenster wird breiter/schmaler, Position links bleibt
2. Untere Kante ziehen → Fenster wird höher/flacher, Position oben bleibt
3. Linke Kante nach links ziehen → Fenster wird breiter UND bewegt sich nach links
4. Obere Kante nach oben ziehen → Fenster wird höher UND bewegt sich nach oben
5. Ecken (NW, NE, SW, SE) — beide Achsen gleichzeitig
6. Minimalgröße prüfen: nicht kleiner als 320×300 möglich
7. Shaded/Maximized: keine Handles sichtbar, kein Resize möglich

---

- [ ] **Step 6: Commit**

```bash
git add src/components/desktop/FinderWindow.tsx
git commit -m "feat: multi-edge resize for FinderWindow (all 4 edges + 4 corners)"
```
