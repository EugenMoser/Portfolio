# Spec: FinderWindow Multi-Edge Resize

**Date:** 2026-03-30
**Status:** Approved

## Ziel

Das FinderWindow soll an allen 4 Kanten und allen 4 Ecken per Drag verstellbar sein (wie echtes macOS). Aktuell gibt es nur einen Resize-Handle unten-rechts.

## Verhalten

- Resize von **Rechts/Unten**: nur `size` ändert sich, Fensterposition bleibt
- Resize von **Links/Oben**: `size` UND `x`/`y` ändern sich gleichzeitig (Fenster bewegt sich mit)
- Resize disabled wenn `maximized || shaded` (wie bisher)
- Mindestgröße: `MIN_WIDTH = 320`, `MIN_HEIGHT = 300` (wie bisher)

## Architektur

### `resizeStart.current` — erweitert

```ts
{ ex: number; ey: number; w: number; h: number; px: number; py: number }
// px, py = Fensterposition (x.get(), y.get()) beim Start des Resize
```

### `startResize(direction)` — ersetzt `onResizePointerDown`

Direction: `'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw'`

Logik pro `pointermove`:
```
dX = ev.clientX - startEx
dY = ev.clientY - startEy

// Breite (Osten):   newW = max(MIN_W, startW + dX)
// Breite (Westen):  newW = max(MIN_W, startW - dX)
//                   newX = startPx + (startW - newW)
// Höhe (Süden):     newH = max(MIN_H, startH + dY)
// Höhe (Norden):    newH = max(MIN_H, startH - dY)
//                   newY = startPy + (startH - newH)
```

Jede Direction setzt nur die relevanten Achsen:
- `e`: newW → setSize
- `w`: newW → setSize, newX → x.set()
- `s`: newH → setSize
- `n`: newH → setSize, newY → y.set()
- `se`: newW + newH → setSize
- `sw`: newW + newH → setSize, newX → x.set()
- `ne`: newW + newH → setSize, newY → y.set()
- `nw`: newW + newH → setSize, newX + newY → x.set() + y.set()

### 8 Handle-Divs

Alle absolut positioniert auf dem `motion.div`, `zIndex: 10`, transparent, disabled wenn `maximized || shaded`:

| Direction | Tailwind-Position | Größe | Cursor |
|-----------|------------------|-------|--------|
| `nw` | `top-0 left-0` | 12×12px | `nw-resize` |
| `n` | `top-0 left-3 right-3` | h=6px, full width | `n-resize` |
| `ne` | `top-0 right-0` | 12×12px | `ne-resize` |
| `e` | `top-3 bottom-3 right-0` | w=6px, full height | `e-resize` |
| `se` | `bottom-0 right-0` | 12×12px | `se-resize` |
| `s` | `bottom-0 left-3 right-3` | h=6px, full width | `s-resize` |
| `sw` | `bottom-0 left-0` | 12×12px | `sw-resize` |
| `w` | `top-3 bottom-3 left-0` | w=6px, full height | `w-resize` |

Ecken überlappen die Kanten (Corners haben höheren z-index oder werden nach den Edges gerendert).

## Änderungen

**Datei:** `src/components/desktop/FinderWindow.tsx`

1. `resizeStart.current` Typ erweitern um `px: number; py: number`
2. `onResizePointerDown` → `startResize(direction: ResizeDirection)` umbenennen/ersetzen
3. Einzelnen SE-Handle-Div durch 8 Handle-Divs ersetzen

## Out of Scope

- Resize-Animation/Smoothing
- Viewport-Clamp beim Resize (nur beim Browser-Resize wie bisher)
- Touch-Support
