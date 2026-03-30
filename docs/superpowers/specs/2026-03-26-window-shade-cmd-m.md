# Window Shade / ⌘M — Design Spec

**Date:** 2026-03-26
**Branch:** feature/macos-desktop

## Goal

Wire up the existing Window Shade (rollup) functionality so it can be triggered from three places:
1. Yellow traffic light button (already works via local state)
2. Menubar → Window → "Minimize" menu item (currently a no-op)
3. Keyboard shortcut ⌘M (not yet implemented)

## Current State

`shaded` state and `toggleShade()` live inside `FinderWindow` as local state. `Menubar` and `useKeyboardShortcuts` cannot reach them.

## Approach: Lift State to MacDesktop

Move `shaded` to `MacDesktop` and pass it down as props. Follows the existing `windowOpen` pattern.

## State Changes

**MacDesktop**
- Add `const [shaded, setShaded] = useState(false)`
- Reset `shaded` to `false` whenever the window is re-opened (`setWindowOpen(true)` calls and `navigate()` when `!windowOpen`)

## Prop Changes

**FinderWindow**
- Remove internal `shaded` state and `toggleShade()`
- Add props: `shaded: boolean`, `onToggleShade: () => void`
- Yellow traffic light calls `onToggleShade` (unchanged externally)

**Menubar**
- Add prop: `onMinimize: () => void`
- Window menu "Minimize" item: `onClick: () => { onMinimize(); closeMenu(); }`
- Remains `disabled` when `!windowOpen` (unchanged)

**useKeyboardShortcuts**
- Add options: `onMinimize: () => void`, `windowOpen: boolean`
- `⌘M` handler: fires `onMinimize()` only when `windowOpen === true`
- Blocked when focus is in `INPUT` or `TEXTAREA` (existing guard applies)

## Behavior

| Trigger | Effect |
|---|---|
| Yellow traffic light | Toggle shade (titlebar only ↔ full window) |
| Menubar Window → Minimize | Same toggle |
| ⌘M | Same toggle, no-op if window closed |
| Navigate / reopen window | `shaded` resets to `false` |

## Files Affected

- `src/components/desktop/MacDesktop.tsx`
- `src/components/desktop/FinderWindow.tsx`
- `src/components/desktop/Menubar.tsx`
- `src/hooks/useKeyboardShortcuts.ts`
