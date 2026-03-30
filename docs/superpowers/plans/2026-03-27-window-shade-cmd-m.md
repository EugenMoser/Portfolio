# Window Shade / ⌘M Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire up Window Shade (titlebar-only rollup) so it's triggerable via yellow traffic light, Menubar → Window → Minimize, and ⌘M keyboard shortcut.

**Architecture:** Lift `shaded` state from `FinderWindow` local state to `MacDesktop`, pass it down as props to `FinderWindow` and `Menubar`. Add `onMinimize` + `windowOpen` to `useKeyboardShortcuts` for ⌘M support.

**Tech Stack:** React useState, TypeScript, Next.js App Router

---

## Files

- Modify: `src/hooks/useKeyboardShortcuts.ts`
- Modify: `src/components/desktop/FinderWindow.tsx`
- Modify: `src/components/desktop/Menubar.tsx`
- Modify: `src/components/desktop/MacDesktop.tsx`

---

### Task 1: useKeyboardShortcuts — add ⌘M

**Files:**
- Modify: `src/hooks/useKeyboardShortcuts.ts`

- [ ] **Step 1: Update the Options interface and hook signature**

Replace the entire file with:

```ts
import { useEffect } from "react";
import type { SectionId } from "@/types/portfolio";

const SECTION_KEYS: Record<string, SectionId> = {
  "1": "about",
  "2": "projects",
  "3": "skills",
  "4": "experience",
  "5": "certificates",
  "6": "contact",
};

interface Options {
  onNavigate: (id: SectionId) => void;
  onBack: () => void;
  onForward: () => void;
  onSpotlight: () => void;
  onMinimize: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  windowOpen: boolean;
}

export function useKeyboardShortcuts({
  onNavigate,
  onBack,
  onForward,
  onSpotlight,
  onMinimize,
  canGoBack,
  canGoForward,
  windowOpen,
}: Options) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMeta = e.metaKey || e.ctrlKey;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (isMeta && e.key === " ") {
        e.preventDefault();
        onSpotlight();
        return;
      }

      if (isMeta && e.key === "m") {
        e.preventDefault();
        if (windowOpen) onMinimize();
        return;
      }

      if (isMeta && SECTION_KEYS[e.key]) {
        e.preventDefault();
        onNavigate(SECTION_KEYS[e.key]);
        return;
      }

      if (isMeta && (e.key === "[" || e.key === "ArrowLeft")) {
        e.preventDefault();
        if (canGoBack) onBack();
        return;
      }

      if (isMeta && (e.key === "]" || e.key === "ArrowRight")) {
        e.preventDefault();
        if (canGoForward) onForward();
        return;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNavigate, onBack, onForward, onSpotlight, onMinimize, canGoBack, canGoForward, windowOpen]);
}
```

- [ ] **Step 2: Verify TypeScript — build**

```bash
cd /Users/eugen/Project/Portfolio && pnpm build 2>&1 | tail -20
```

Expected: Build fails with type errors in `MacDesktop.tsx` (missing `onMinimize` + `windowOpen` props) — that's expected, we fix in Task 4.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useKeyboardShortcuts.ts
git commit -m "feat: add ⌘M support to useKeyboardShortcuts"
```

---

### Task 2: FinderWindow — accept shaded as prop

**Files:**
- Modify: `src/components/desktop/FinderWindow.tsx`

- [ ] **Step 1: Update Props interface and remove local shaded state**

Replace the `Props` interface (currently lines 35–43):

```ts
interface Props {
  activeSection: SectionId;
  onSelect: (id: SectionId) => void;
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
  onClose: () => void;
  shaded: boolean;
  onToggleShade: () => void;
}
```

- [ ] **Step 2: Update the function signature**

Replace the function signature (currently line 74–78):

```ts
export default function FinderWindow({
  activeSection, onSelect,
  canGoBack, canGoForward, onBack, onForward,
  onClose,
  shaded, onToggleShade,
}: Props) {
```

- [ ] **Step 3: Remove the local shaded state and toggleShade function**

Delete these lines (currently ~83 and ~113–116):

```ts
const [shaded, setShaded] = useState(false);
```

```ts
function toggleShade() {
  if (maximized) setMaximized(false);
  setShaded((s) => !s);
}
```

- [ ] **Step 4: Update toggleMaximize — unshade via prop when maximizing**

The original `toggleMaximize` called `setShaded(false)` when maximizing. Now `shaded` lives in the parent, so call `onToggleShade()` conditionally. Replace `toggleMaximize` (currently ~118–136) with:

```ts
function toggleMaximize() {
  if (maximized) {
    setSize(savedSize.current);
    x.set(savedPos.current.x);
    y.set(savedPos.current.y);
    setMaximized(false);
  } else {
    savedSize.current = { ...size };
    savedPos.current = { x: x.get(), y: y.get() };
    setSize({
      width: window.innerWidth - PADDING * 2,
      height: window.innerHeight - MENUBAR_H - DOCK_H - PADDING * 2,
    });
    x.set(0);
    y.set(0);
    setMaximized(true);
    if (shaded) onToggleShade(); // unshade when maximizing
  }
}
```

- [ ] **Step 5: Update yellow traffic light to call onToggleShade**

The yellow TrafficLight `onClick` currently calls `toggleShade`. Update it (in the JSX, ~line 205):

```tsx
<TrafficLight bg="#ffbd2e" border="#dea123" symbol="−" onClick={onToggleShade} />
```

- [ ] **Step 6: Commit**

```bash
git add src/components/desktop/FinderWindow.tsx
git commit -m "refactor: lift shaded state out of FinderWindow to props"
```

---

### Task 3: Menubar — add onMinimize prop

**Files:**
- Modify: `src/components/desktop/Menubar.tsx`

- [ ] **Step 1: Add onMinimize to Props interface**

Replace the `Props` interface (currently lines 82–89):

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

- [ ] **Step 2: Update function signature**

Replace the function signature (currently line 91):

```ts
export default function Menubar({ onNavigate, windowOpen, onOpenWindow, onCloseWindow, onMinimize, onSpotlight, onOpenLegal }: Props) {
```

- [ ] **Step 3: Wire up Minimize menu item**

Find the Window menu Minimize item (currently ~line 220):

```ts
{ label: "Minimize", shortcut: "⌘M", disabled: !windowOpen, onClick: () => { closeMenu(); } },
```

Replace with:

```ts
{ label: "Minimize", shortcut: "⌘M", disabled: !windowOpen, onClick: () => { onMinimize(); closeMenu(); } },
```

- [ ] **Step 4: Commit**

```bash
git add src/components/desktop/Menubar.tsx
git commit -m "feat: wire up Minimize menu item to onMinimize prop"
```

---

### Task 4: MacDesktop — add shaded state and wire everything together

**Files:**
- Modify: `src/components/desktop/MacDesktop.tsx`

- [ ] **Step 1: Add shaded state**

After the existing state declarations (after line 36 `const [legalWindow, ...]`), add:

```ts
const [shaded, setShaded] = useState(false);
```

- [ ] **Step 2: Reset shaded when window opens**

The `navigate()` function calls `setWindowOpen(true)` when `!windowOpen`. Update it to also reset shaded:

```ts
function navigate(id: SectionId) {
  if (id === activeSection) {
    if (!windowOpen) { setWindowOpen(true); setShaded(false); }
    return;
  }
  const newHistory = history.slice(0, historyIndex + 1);
  setHistory([...newHistory, id]);
  setHistoryIndex(newHistory.length);
  if (!windowOpen) { setWindowOpen(true); setShaded(false); }
}
```

Also update `onOpenWindow` handler in the Menubar and Dock props to reset shaded:

```ts
onOpenWindow={() => { setWindowOpen(true); setShaded(false); }}
```

(There are two places: `Menubar` and `Dock` — update both.)

- [ ] **Step 3: Update useKeyboardShortcuts call**

```ts
useKeyboardShortcuts({
  onNavigate: navigate,
  onBack: goBack,
  onForward: goForward,
  onSpotlight: () => setSpotlightOpen(true),
  onMinimize: () => setShaded((s) => !s),
  canGoBack,
  canGoForward,
  windowOpen,
});
```

- [ ] **Step 4: Update Menubar props**

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

- [ ] **Step 5: Update FinderWindow props**

```tsx
<FinderWindow
  key="finder"
  activeSection={activeSection}
  onSelect={navigate}
  canGoBack={canGoBack}
  canGoForward={canGoForward}
  onBack={goBack}
  onForward={goForward}
  onClose={() => setWindowOpen(false)}
  shaded={shaded}
  onToggleShade={() => setShaded((s) => !s)}
/>
```

- [ ] **Step 6: Verify build passes**

```bash
cd /Users/eugen/Project/Portfolio && pnpm build 2>&1 | tail -20
```

Expected: `✓ Compiled successfully` with no type errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/desktop/MacDesktop.tsx
git commit -m "feat: lift shaded state to MacDesktop, wire ⌘M + Menubar Minimize"
```

---

## Manual Test Checklist

After build passes, run `pnpm dev` and verify:

- [ ] Yellow traffic light button → window shades to titlebar only
- [ ] Click yellow again → window unshades
- [ ] Menubar → Window → Minimize → window shades
- [ ] Menubar → Window → Minimize is disabled when window is closed
- [ ] ⌘M → window shades / unshades
- [ ] ⌘M has no effect when window is closed (close via ⌘W first)
- [ ] Navigate to new section while shaded → window unshades
- [ ] Reopen window via Dock while shaded → window opens unshaded
