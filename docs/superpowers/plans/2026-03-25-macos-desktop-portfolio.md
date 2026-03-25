# macOS Aqua Desktop Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current scrolling portfolio with a fullscreen macOS Aqua/Tiger desktop simulation — a Finder window with sidebar navigation, a functional dock, and macOS Aqua visual styling.

**Architecture:** `MacDesktop` holds a single `activeSection` state and renders `Menubar` (top), a `FinderWindow` (center, contains `FinderSidebar` + `FinderContent`), and `Dock` (bottom). Clicking any sidebar item or dock icon updates `activeSection`, which `FinderContent` uses to swap section components via Framer Motion `AnimatePresence`. `layout.tsx` is stripped of `Navigation` and `Footer` so `MacDesktop` fills the full viewport.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v3, Framer Motion 12

---

## File Map

**Created:**
- `src/types/portfolio.ts` — TypeScript interfaces for all data shapes
- `src/data/portfolio.ts` — Typed copy of portfolio data (replaces portfolio.js)
- `src/components/desktop/MacDesktop.tsx` — Root wrapper, holds `activeSection` state
- `src/components/desktop/Menubar.tsx` — Top bar with Apple logo, menu labels, live clock
- `src/components/desktop/FinderWindow.tsx` — Window shell: titlebar + toolbar + sidebar/content + statusbar
- `src/components/desktop/FinderSidebar.tsx` — Left nav column with section entries
- `src/components/desktop/FinderContent.tsx` — AnimatePresence wrapper, renders active section
- `src/components/desktop/Dock.tsx` — Bottom icon bar with active-dot indicator
- `src/components/sections/AboutSection.tsx` — Hero + about text + links
- `src/components/sections/ProjectsSection.tsx` — Project cards
- `src/components/sections/SkillsSection.tsx` — Skills by category
- `src/components/sections/ExperienceSection.tsx` — Work history
- `src/components/sections/CertificatesSection.tsx` — Certification cards
- `src/components/sections/ContactSection.tsx` — Contact links + legal links

**Modified:**
- `src/app/layout.tsx` — Remove Navigation + Footer, simplify body
- `src/app/page.tsx` — Replace PortfolioGrid with MacDesktop
- `.gitignore` — Add `.superpowers/`

**Deleted:**
- `src/components/portfolio/PortfolioGrid.tsx` — Replaced by section components
- `src/data/portfolio.js` — Replaced by portfolio.ts

---

## Task 1: Create Branch + TypeScript Types

**Files:**
- Create: `src/types/portfolio.ts`

- [ ] **Step 1: Create the feature branch**

```bash
git checkout -b feature/macos-desktop
```

- [ ] **Step 2: Add `.superpowers/` to .gitignore**

Open `.gitignore` and add a line: `.superpowers/`

```bash
echo ".superpowers/" >> .gitignore
git add .gitignore
git commit -m "chore: ignore .superpowers brainstorm dir"
```

- [ ] **Step 3: Write `src/types/portfolio.ts`**

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

export type SectionId =
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'certificates'
  | 'contact';
```

- [ ] **Step 4: Create `src/data/portfolio.ts`**

Copy the content of `src/data/portfolio.js` verbatim, then add the import and type annotation at the top:

```ts
import type { PortfolioData } from '@/types/portfolio';

const data: PortfolioData = {
  // ... (paste all existing content from portfolio.js here unchanged)
};

export { data };
```

- [ ] **Step 5: Verify TypeScript compiles**

```bash
pnpm build
```

Expected: Build succeeds. If TypeScript errors appear, fix the type mismatch (likely a missing field in one of the data objects).

- [ ] **Step 6: Delete old JS file and commit**

```bash
rm src/data/portfolio.js
git add src/types/portfolio.ts src/data/portfolio.ts src/data/portfolio.js
git commit -m "feat: migrate portfolio data to TypeScript with typed interfaces"
```

---

## Task 2: Simplify layout.tsx

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace `layout.tsx` content**

```tsx
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Eugen Moser",
  description: "React, Next.js, TypeScript, Tailwind CSS Portfolio von Eugen Moser",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="overflow-hidden">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Verify the app still builds**

```bash
pnpm build
```

Expected: Build succeeds. The portfolio still renders (just without nav/footer now).

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat: strip Navigation and Footer from layout for fullscreen desktop"
```

---

## Task 3: MacDesktop Wrapper + SectionId State

**Files:**
- Create: `src/components/desktop/MacDesktop.tsx`

This is the root component. It holds state and wires everything together. We create the shell now; Menubar, FinderWindow, and Dock will be added in later tasks.

- [ ] **Step 1: Create `src/components/desktop/MacDesktop.tsx`**

```tsx
'use client';

import { useState } from 'react';
import type { SectionId } from '@/types/portfolio';

export function MacDesktop() {
  const [activeSection, setActiveSection] = useState<SectionId>('about');

  return (
    <div
      className="relative flex h-screen w-screen flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #1d5fb5 0%, #4a90d9 50%, #6ab0f0 100%)',
      }}
    >
      {/* Menubar — Task 4 */}
      <div className="h-7 w-full flex-shrink-0 bg-white/20 backdrop-blur-sm" />

      {/* Desktop area */}
      <div className="flex flex-1 items-center justify-center overflow-hidden p-4">
        {/* FinderWindow — Task 5 */}
        <div className="h-full w-full max-w-4xl rounded-xl bg-white/90 shadow-2xl">
          <p className="p-4 text-sm text-gray-500">
            Active: {activeSection}
          </p>
        </div>
      </div>

      {/* Dock — Task 7 */}
      <div className="flex h-20 flex-shrink-0 items-center justify-center" />
    </div>
  );
}
```

- [ ] **Step 2: Update `src/app/page.tsx`**

```tsx
import { MacDesktop } from "@/components/desktop/MacDesktop";

export default function Home() {
  return <MacDesktop />;
}
```

- [ ] **Step 3: Delete PortfolioGrid**

```bash
rm src/components/portfolio/PortfolioGrid.tsx
```

- [ ] **Step 4: Start dev server and check**

```bash
pnpm dev
```

Open `http://localhost:3000`. Expected: Blue gradient background fills screen, white box in center shows "Active: about". No console errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/desktop/MacDesktop.tsx src/app/page.tsx src/components/portfolio/PortfolioGrid.tsx
git commit -m "feat: add MacDesktop shell with activeSection state"
```

---

## Task 4: Menubar

**Files:**
- Create: `src/components/desktop/Menubar.tsx`

- [ ] **Step 1: Create `src/components/desktop/Menubar.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';

const MENU_ITEMS = ['Finder', 'Ablage', 'Bearbeiten', 'Darstellung', 'Gehe zu'];

export function Menubar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setTime(`${h}:${m}`);
    }
    updateTime();
    const id = setInterval(updateTime, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex h-7 w-full flex-shrink-0 items-center gap-4 px-3 text-xs text-white"
      style={{ background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(8px)' }}
      aria-hidden="true"
    >
      {/* Apple logo */}
      <span className="text-sm">🍎</span>

      {/* Menu items */}
      {MENU_ITEMS.map((item, i) => (
        <span key={item} className={i === 0 ? 'font-semibold' : 'opacity-90'}>
          {item}
        </span>
      ))}

      {/* Right side */}
      <div className="ml-auto flex items-center gap-3 opacity-90">
        <span>📶</span>
        <span>🔋</span>
        <span className="font-semibold">{time}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire into `MacDesktop.tsx`**

Replace the placeholder `<div className="h-7 ...">` with:

```tsx
import { Menubar } from './Menubar';
// ...
<Menubar />
```

- [ ] **Step 3: Check in browser**

Expected: Top bar shows `🍎 Finder Ablage Bearbeiten Darstellung Gehe zu` on left, `📶 🔋 HH:MM` on right. Clock shows current time.

- [ ] **Step 4: Commit**

```bash
git add src/components/desktop/Menubar.tsx src/components/desktop/MacDesktop.tsx
git commit -m "feat: add Menubar with live clock"
```

---

## Task 5: FinderWindow Shell

**Files:**
- Create: `src/components/desktop/FinderWindow.tsx`

The window shell contains the title bar, toolbar, and the bottom status bar. The inner body (sidebar + content) will be composed here but implemented in later tasks.

- [ ] **Step 1: Create `src/components/desktop/FinderWindow.tsx`**

```tsx
import type { SectionId } from '@/types/portfolio';

interface FinderWindowProps {
  activeSection: SectionId;
  onSelect: (id: SectionId) => void;
}

const SECTION_LABELS: Record<SectionId, string> = {
  about: 'React & Next.js Developer',
  projects: 'Fullstack & Enterprise',
  skills: 'Frontend · Backend · Tools',
  experience: 'seit 2022',
  certificates: 'Microsoft · Scrum · ITIL',
  contact: 'Isny im Allgäu',
};

export function FinderWindow({ activeSection, onSelect }: FinderWindowProps) {
  return (
    <div className="flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-xl shadow-2xl"
      style={{ border: '1px solid rgba(255,255,255,0.5)' }}>

      {/* Title Bar */}
      <div
        className="flex h-8 flex-shrink-0 items-center gap-2 px-3"
        style={{ background: 'linear-gradient(180deg, #ebebeb, #d0d0d0)', borderBottom: '1px solid #bbb' }}
      >
        {/* Traffic light buttons */}
        <button
          aria-hidden="true"
          tabIndex={-1}
          className="group h-3 w-3 rounded-full"
          style={{ background: '#ff5f57', border: '1px solid #e0443e' }}
        >
          <span className="hidden text-[8px] leading-none group-hover:block">×</span>
        </button>
        <button
          aria-hidden="true"
          tabIndex={-1}
          className="group h-3 w-3 rounded-full"
          style={{ background: '#ffbd2e', border: '1px solid #dea123' }}
        >
          <span className="hidden text-[8px] leading-none group-hover:block">−</span>
        </button>
        <button
          aria-hidden="true"
          tabIndex={-1}
          className="group h-3 w-3 rounded-full"
          style={{ background: '#28c940', border: '1px solid #1aab29' }}
        >
          <span className="hidden text-[8px] leading-none group-hover:block">+</span>
        </button>
        <span className="flex-1 text-center text-xs font-semibold text-neutral-500">
          Portfolio — Eugen Moser
        </span>
      </div>

      {/* Toolbar */}
      <div
        className="flex h-7 flex-shrink-0 items-center gap-2 px-3"
        style={{ background: 'linear-gradient(180deg, #e8e8e8, #d8d8d8)', borderBottom: '1px solid #c0c0c0' }}
        aria-hidden="true"
      >
        <button className="rounded px-2 py-0.5 text-xs" style={{ background: 'linear-gradient(180deg,#f0f0f0,#d8d8d8)', border: '1px solid #aaa' }}>◀</button>
        <button className="rounded px-2 py-0.5 text-xs" style={{ background: 'linear-gradient(180deg,#f0f0f0,#d8d8d8)', border: '1px solid #aaa' }}>▶</button>
        <div className="flex-1 rounded px-2 py-0.5 text-xs text-neutral-400" style={{ background: 'white', border: '1px solid #aaa' }}>
          eugen-moser.de
        </div>
      </div>

      {/* Sidebar + Content — placeholders for now */}
      <div className="flex flex-1 overflow-hidden">
        {/* FinderSidebar — Task 6 */}
        <div
          className="w-36 flex-shrink-0 md:w-36"
          style={{ background: 'linear-gradient(180deg, #e0e0e0, #d4d4d4)', borderRight: '1px solid #b8b8b8' }}
        >
          <p className="p-2 text-xs text-neutral-400">sidebar</p>
        </div>

        {/* FinderContent — Task 8 */}
        <main
          className="flex-1 overflow-y-auto bg-white"
          aria-live="polite"
        >
          <p className="p-4 text-xs text-neutral-400">content: {activeSection}</p>
        </main>
      </div>

      {/* Status Bar */}
      <div
        className="flex h-6 flex-shrink-0 items-center justify-between px-3 text-xs text-neutral-500"
        style={{ background: 'linear-gradient(180deg, #e0e0e0, #d0d0d0)', borderTop: '1px solid #bbb' }}
        aria-hidden="true"
      >
        <span id="finder-status-count" />
        <span id="finder-status-label">{SECTION_LABELS[activeSection]}</span>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire into `MacDesktop.tsx`**

Replace the placeholder finder div:

```tsx
import { FinderWindow } from './FinderWindow';
// ...
<FinderWindow activeSection={activeSection} onSelect={setActiveSection} />
```

Also remove the old placeholder `<div className="h-full w-full max-w-4xl ...">`.

- [ ] **Step 3: Check in browser**

Expected: Window with Aqua titlebar (three colored dots + "Portfolio — Eugen Moser"), toolbar with back/forward buttons, sidebar placeholder, content showing active section name, status bar at bottom.

- [ ] **Step 4: Commit**

```bash
git add src/components/desktop/FinderWindow.tsx src/components/desktop/MacDesktop.tsx
git commit -m "feat: add FinderWindow shell with titlebar, toolbar and status bar"
```

---

## Task 6: FinderSidebar

**Files:**
- Create: `src/components/desktop/FinderSidebar.tsx`

- [ ] **Step 1: Create `src/components/desktop/FinderSidebar.tsx`**

```tsx
'use client';

import type { SectionId } from '@/types/portfolio';

interface SidebarItem {
  id: SectionId;
  icon: string;
  label: string;
}

const ITEMS: SidebarItem[] = [
  { id: 'about',        icon: '👤', label: 'About'       },
  { id: 'projects',     icon: '💼', label: 'Projekte'    },
  { id: 'skills',       icon: '🛠', label: 'Skills'      },
  { id: 'experience',   icon: '📋', label: 'Erfahrung'   },
  { id: 'certificates', icon: '🎓', label: 'Zertifikate' },
  { id: 'contact',      icon: '📬', label: 'Kontakt'     },
];

interface FinderSidebarProps {
  activeSection: SectionId;
  onSelect: (id: SectionId) => void;
}

export function FinderSidebar({ activeSection, onSelect }: FinderSidebarProps) {
  return (
    <nav
      role="navigation"
      aria-label="Portfolio Navigation"
      className="flex w-12 flex-shrink-0 flex-col gap-0.5 p-1 md:w-36 md:p-2"
      style={{ background: 'linear-gradient(180deg, #e0e0e0, #d4d4d4)', borderRight: '1px solid #b8b8b8' }}
    >
      <p className="mb-1 hidden px-2 text-[9px] font-bold uppercase tracking-widest text-neutral-400 md:block">
        Portfolio
      </p>
      {ITEMS.map(({ id, icon, label }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            aria-current={isActive ? 'page' : undefined}
            className="flex w-full items-center gap-1.5 rounded px-1.5 py-1 text-left text-xs transition-colors md:gap-2 md:px-2 md:py-1.5"
            style={
              isActive
                ? {
                    background: 'linear-gradient(180deg, #4a90d9, #2a6cb5)',
                    color: 'white',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                  }
                : { color: '#333' }
            }
          >
            <span className="text-sm leading-none">{icon}</span>
            <span className="hidden md:inline">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 2: Wire into `FinderWindow.tsx`**

Replace the sidebar placeholder div:

```tsx
import { FinderSidebar } from './FinderSidebar';
// ...
<FinderSidebar activeSection={activeSection} onSelect={onSelect} />
```

Remove the old `<div className="w-36 ...">` placeholder.

- [ ] **Step 3: Check in browser**

Expected: Left sidebar shows emoji icons + labels (on desktop). Clicking each item should... do nothing yet (state change is wired but content doesn't react yet). Confirm no console errors.

On mobile (<768px): only emoji icons visible, no labels.

- [ ] **Step 4: Commit**

```bash
git add src/components/desktop/FinderSidebar.tsx src/components/desktop/FinderWindow.tsx
git commit -m "feat: add FinderSidebar with active state and mobile icon-only mode"
```

---

## Task 7: Dock

**Files:**
- Create: `src/components/desktop/Dock.tsx`

- [ ] **Step 1: Create `src/components/desktop/Dock.tsx`**

```tsx
'use client';

import { motion } from 'framer-motion';
import type { SectionId } from '@/types/portfolio';

interface DockItem {
  id: SectionId;
  icon: string;
  label: string;
}

const DOCK_ITEMS: DockItem[] = [
  { id: 'about',        icon: '👤', label: 'About'       },
  { id: 'projects',     icon: '💼', label: 'Projekte'    },
  { id: 'skills',       icon: '🛠', label: 'Skills'      },
  { id: 'experience',   icon: '📋', label: 'Erfahrung'   },
  { id: 'certificates', icon: '🎓', label: 'Zertifikate' },
  null, // divider
  { id: 'contact',      icon: '📬', label: 'Kontakt'     },
];

interface DockProps {
  activeSection: SectionId;
  onSelect: (id: SectionId) => void;
}

export function Dock({ activeSection, onSelect }: DockProps) {
  return (
    <div className="flex flex-shrink-0 items-end justify-center pb-3 pt-1">
      <div
        className="flex items-end gap-2 rounded-2xl px-4 py-2 md:gap-3"
        style={{
          background: 'rgba(255,255,255,0.22)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.4)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 16px rgba(0,0,0,0.3)',
        }}
      >
        {DOCK_ITEMS.map((item, i) => {
          if (!item) {
            return (
              <div
                key={`divider-${i}`}
                className="mx-1 h-8 w-px self-center opacity-40"
                style={{ background: 'rgba(255,255,255,0.5)' }}
              />
            );
          }
          const isActive = activeSection === item.id;
          return (
            <div key={item.id} className="flex flex-col items-center gap-0.5">
              <motion.button
                onClick={() => onSelect(item.id)}
                aria-label={`Öffne ${item.label}`}
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.15 }}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-xl leading-none md:h-11 md:w-11 md:text-2xl"
                style={{
                  background: isActive
                    ? 'rgba(255,255,255,0.25)'
                    : 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.35)',
                  filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.4))',
                }}
              >
                {item.icon}
              </motion.button>
              {/* Active dot */}
              <div
                className="h-1 w-1 rounded-full"
                style={{ background: isActive ? 'rgba(255,255,255,0.8)' : 'transparent' }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire into `MacDesktop.tsx`**

Replace the dock placeholder div:

```tsx
import { Dock } from './Dock';
// ...
<Dock activeSection={activeSection} onSelect={setActiveSection} />
```

- [ ] **Step 3: Check in browser**

Expected: Glass dock at bottom with emoji icons. Clicking icons changes `activeSection` state (visible in FinderWindow content area as `"content: projects"` etc.). Active icon has white dot below it. Hover causes slight scale-up.

- [ ] **Step 4: Commit**

```bash
git add src/components/desktop/Dock.tsx src/components/desktop/MacDesktop.tsx
git commit -m "feat: add functional Dock with active-dot indicator and hover animation"
```

---

## Task 8: Section Components

**Files:**
- Create: `src/components/sections/AboutSection.tsx`
- Create: `src/components/sections/ProjectsSection.tsx`
- Create: `src/components/sections/SkillsSection.tsx`
- Create: `src/components/sections/ExperienceSection.tsx`
- Create: `src/components/sections/CertificatesSection.tsx`
- Create: `src/components/sections/ContactSection.tsx`

All section components are plain Server Components (no `'use client'`). They import data directly from `@/data/portfolio`.

- [ ] **Step 1: Create `src/components/sections/AboutSection.tsx`**

```tsx
import Image from 'next/image';
import { data } from '@/data/portfolio';

export function AboutSection() {
  return (
    <div className="p-5">
      {/* Hero row */}
      <div className="mb-5 flex items-start gap-4">
        <Image
          src="/Portfolio-Image.png"
          alt={data.hero.name}
          width={80}
          height={80}
          className="flex-shrink-0 rounded-full shadow-md"
          style={{ border: '2px solid #d0d0d0' }}
        />
        <div>
          <h1 className="text-xl font-bold text-neutral-800">{data.hero.name}</h1>
          <p className="mt-0.5 text-sm text-neutral-500">{data.hero.title}</p>
          <p className="text-xs text-neutral-400">{data.hero.subtitle}</p>
          <p className="mt-1 text-xs text-neutral-400">📍 {data.hero.location}</p>
        </div>
      </div>

      {/* About text */}
      <div
        className="mb-5 border-t border-neutral-200 pt-4 text-xs leading-relaxed text-neutral-600"
        style={{ whiteSpace: 'pre-line' }}
      >
        {data.about}
      </div>

      {/* Links */}
      <div className="flex flex-wrap gap-2">
        {[
          { href: data.hero.github, label: 'GitHub', target: '_blank' },
          { href: data.hero.linkedin, label: 'LinkedIn', target: '_blank' },
          { href: `mailto:${data.hero.email}`, label: data.hero.email, target: undefined },
        ].map(({ href, label, target }) => (
          <a
            key={label}
            href={href}
            target={target}
            rel={target ? 'noopener noreferrer' : undefined}
            className="rounded px-3 py-1 text-xs font-medium text-white transition-opacity hover:opacity-80"
            style={{
              background: 'linear-gradient(180deg, #4a90d9, #2a6cb5)',
              border: '1px solid #1a5c9a',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/sections/ProjectsSection.tsx`**

```tsx
import { ExternalLink } from 'lucide-react';
import { data } from '@/data/portfolio';

export function ProjectsSection() {
  return (
    <div className="flex flex-col gap-3 p-5">
      {data.projects.map((project, i) => (
        <div
          key={i}
          className="rounded-lg border border-neutral-200 bg-neutral-50 p-4"
        >
          <div className="mb-1 flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-neutral-800">{project.title}</h3>
            <div className="flex flex-shrink-0 items-center gap-2">
              <span className="text-xs text-neutral-400">{project.period}</span>
              {project.link && project.link !== '#' && (
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  className="text-neutral-400 transition-colors hover:text-neutral-700">
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
          <p className="mb-2 text-xs leading-relaxed text-neutral-500">{project.description}</p>
          <ul className="mb-2 flex flex-col gap-1">
            {project.bullets.map((bullet, j) => (
              <li key={j} className="flex gap-1.5 text-xs text-neutral-500">
                <span className="mt-0.5 flex-shrink-0 text-neutral-400">▸</span>
                {bullet}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded bg-neutral-200 px-2 py-0.5 text-xs text-neutral-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/components/sections/SkillsSection.tsx`**

```tsx
import { data } from '@/data/portfolio';

export function SkillsSection() {
  return (
    <div className="flex flex-col gap-4 p-5">
      {data.skills.map((group) => (
        <div key={group.category}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
            {group.category}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {group.items.map((skill) => (
              <span
                key={skill}
                className="rounded border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-700 shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Create `src/components/sections/ExperienceSection.tsx`**

```tsx
import { data } from '@/data/portfolio';

export function ExperienceSection() {
  return (
    <div className="flex flex-col gap-5 p-5">
      {data.experience.map((job, i) => (
        <div key={i} className="border-b border-neutral-200 pb-5 last:border-0 last:pb-0">
          <div className="mb-1 flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-neutral-800">{job.position}</h3>
              <p className="text-xs text-neutral-500">{job.company}</p>
            </div>
            <span className="flex-shrink-0 text-xs text-neutral-400">{job.period}</span>
          </div>
          <p className="mb-2 text-xs leading-relaxed text-neutral-500">{job.description}</p>
          <ul className="mb-2 flex flex-col gap-1">
            {job.details.map((detail, j) => (
              <li key={j} className="flex gap-1.5 text-xs text-neutral-500">
                <span className="mt-0.5 flex-shrink-0 text-neutral-400">▸</span>
                {detail}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1">
            {job.tags.map((tag) => (
              <span key={tag} className="rounded bg-neutral-100 px-2 py-0.5 text-xs text-neutral-500">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Create `src/components/sections/CertificatesSection.tsx`**

```tsx
import { ExternalLink } from 'lucide-react';
import { data } from '@/data/portfolio';

export function CertificatesSection() {
  return (
    <div className="flex flex-col gap-2 p-5">
      {data.certifications.map((cert, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3"
        >
          <div>
            <p className="text-sm font-medium text-neutral-700">{cert.name}</p>
            <p className="text-xs text-neutral-400">{cert.issuer} · {cert.date}</p>
          </div>
          {cert.link ? (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 flex-shrink-0 text-neutral-400 transition-colors hover:text-neutral-700"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 6: Create `src/components/sections/ContactSection.tsx`**

```tsx
import { Mail } from 'lucide-react';
import { data } from '@/data/portfolio';

export function ContactSection() {
  return (
    <div className="p-5">
      <div className="flex flex-col gap-3">
        <a
          href={`mailto:${data.hero.email}`}
          className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600 transition-colors hover:border-neutral-300 hover:text-neutral-800"
        >
          <Mail className="h-4 w-4 flex-shrink-0" />
          {data.hero.email}
        </a>
        <a
          href={data.hero.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600 transition-colors hover:border-neutral-300 hover:text-neutral-800"
        >
          <span className="text-base">🐙</span>
          github.com/EugenMoser
        </a>
        <a
          href={data.hero.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-600 transition-colors hover:border-neutral-300 hover:text-neutral-800"
        >
          <span className="text-base">💼</span>
          linkedin.com/in/eugen-moser
        </a>
      </div>

      {/* Legal links */}
      <div className="mt-8 flex gap-4 text-xs text-neutral-400">
        <a href="/impressum" className="hover:text-neutral-600">Impressum</a>
        <a href="/datenschutz" className="hover:text-neutral-600">Datenschutz</a>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Commit all sections**

```bash
git add src/components/sections/
git commit -m "feat: add all six section components (About, Projects, Skills, Experience, Certificates, Contact)"
```

---

## Task 9: FinderContent with AnimatePresence

**Files:**
- Create: `src/components/desktop/FinderContent.tsx`

- [ ] **Step 1: Create `src/components/desktop/FinderContent.tsx`**

```tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import type { SectionId } from '@/types/portfolio';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { CertificatesSection } from '@/components/sections/CertificatesSection';
import { ContactSection } from '@/components/sections/ContactSection';

function renderSection(id: SectionId) {
  switch (id) {
    case 'about':        return <AboutSection />;
    case 'projects':     return <ProjectsSection />;
    case 'skills':       return <SkillsSection />;
    case 'experience':   return <ExperienceSection />;
    case 'certificates': return <CertificatesSection />;
    case 'contact':      return <ContactSection />;
  }
}

interface FinderContentProps {
  activeSection: SectionId;
}

export function FinderContent({ activeSection }: FinderContentProps) {
  const mainRef = useRef<HTMLElement>(null);

  return (
    <main
      ref={mainRef}
      tabIndex={-1}
      className="flex-1 overflow-y-auto bg-white focus:outline-none"
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onAnimationComplete={(definition) => {
            // Focus only when enter animation completes (definition === "animate")
            if (definition === 'animate') mainRef.current?.focus();
          }}
        >
          {renderSection(activeSection)}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
```

- [ ] **Step 2: Wire into `FinderWindow.tsx`**

Replace the `<main>` placeholder:

```tsx
import { FinderContent } from './FinderContent';
// ...
<FinderContent activeSection={activeSection} />
```

- [ ] **Step 3: Check in browser**

Expected: Clicking dock icons or sidebar entries switches content with a smooth fade+slide animation. All 6 sections render their data correctly. Status bar label updates.

- [ ] **Step 4: Verify no build errors**

```bash
pnpm build
```

Expected: Build succeeds with no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/desktop/FinderContent.tsx src/components/desktop/FinderWindow.tsx
git commit -m "feat: add FinderContent with AnimatePresence section transitions"
```

---

## Task 10: Dynamic Status Bar Counts

**Files:**
- Modify: `src/components/desktop/FinderWindow.tsx`

- [ ] **Step 1: Add status bar count logic to `FinderWindow.tsx`**

Import data and add a count map:

```tsx
import { data } from '@/data/portfolio';

const STATUS_COUNTS: Partial<Record<SectionId, string>> = {
  projects:     `${data.projects.length} Projekte`,
  skills:       `${data.skills.length} Kategorien`,
  experience:   `${data.experience.length} Stationen`,
  certificates: `${data.certifications.length} Zertifikate`,
};
```

Update the status bar JSX to use it:

```tsx
<span>{STATUS_COUNTS[activeSection] ?? ''}</span>
<span>{SECTION_LABELS[activeSection]}</span>
```

- [ ] **Step 2: Check in browser**

Clicking each section: status bar left side should show counts (e.g., "6 Projekte", "5 Kategorien") or be empty for About and Kontakt. Right side shows the label.

- [ ] **Step 3: Commit**

```bash
git add src/components/desktop/FinderWindow.tsx
git commit -m "feat: add dynamic status bar counts per section"
```

---

## Task 11: Final Polish + Production Build

- [ ] **Step 1: Run the dev server for a full manual review**

```bash
pnpm dev
```

Check each section:
- [ ] About: photo, name, title, location, about text, 3 link buttons
- [ ] Projekte: 6 project cards with bullets, tags, external links
- [ ] Skills: 5 categories with skill badges
- [ ] Erfahrung: 3 work entries with details and tags
- [ ] Zertifikate: 4 certificates with PDF links
- [ ] Kontakt: 3 links + Impressum/Datenschutz
- [ ] Dock: active dot moves when switching sections
- [ ] Sidebar: active item highlighted in blue
- [ ] Animations: smooth fade+slide between sections
- [ ] Menubar clock: shows current time

- [ ] **Step 2: Mobile check**

Resize browser to <768px:
- [ ] Sidebar shows only emoji icons (no labels)
- [ ] Dock icons are slightly smaller
- [ ] Menubar shows only 🍎 + time

- [ ] **Step 3: Production build**

```bash
pnpm build
```

Expected: Build succeeds, no TypeScript errors, no ESLint errors.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete macOS Aqua desktop portfolio redesign"
```

---

## Done

The portfolio now looks and feels like a macOS Tiger/Aqua desktop. All content is accessible via the Finder window sidebar and the dock. The implementation is complete on branch `feature/macos-desktop` — ready for review and merge to `main`.
