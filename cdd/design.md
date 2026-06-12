# Design — Collab-UX / CDD Visual System

Design-Spezifikation für Collab-UX und CDD-Dokumentation. Abgeleitet aus `CDD_Workflow-grosseTeams-KI.html` (conet Context Driven Development).

**Owner:** UX/UI Designer · **Aktualisierung:** bei jeder Design-Änderung · **Pflicht für:** HTML-Build, künftige UI-Erweiterungen

---

## 1. Zweck (CDD)

| Aspekt | Regel |
|--------|--------|
| **Rolle** | UX/UI definiert Tokens und Muster **vor** Implementierung |
| **Figma** | Eingang, nicht Endpunkt — Entscheidungen landen in `.md`, nicht nur in Figma |
| **KI** | Coding- und UX-Agenten laden `design.md` als Kontext |
| **Abweichungen** | Nie still — dokumentieren oder mit UX klären |

---

## 2. Design-Tokens (CSS-Variablen)

Aus dem CDD-Dokument (`:root`):

| Token | Wert | Verwendung |
|-------|------|------------|
| `--violet` | `#9B6FDF` | Primär, Akzente, aktive Navigation, Buttons hover |
| `--violet-light` | `#EBE2F9` | Hintergründe Sidebar/Topbar, Callouts, Role-Cards |
| `--dark` | `#3E2C59` | Überschriften, Logo-Text, Hero-Hintergrund, Tabellen-Header |
| `--yellow` | `#FFFC2E` | Akzentlinien, Highlights, Sticky-Labels |
| `--yellow-light` | `#FFFEC0` | Warn-Callouts, Contributor-Badges |
| `--black` | `#000000` | Fließtext, Nav-Cluster-Header |
| `--white` | `#FFFFFF` | Karten, Main-Background |
| `--gray` | `#4A4A4A` | Sekundärtext, Beschreibungen |
| `--gray-light` | `#F5F5F5` | Tabellen-Zebra, Resp-Boxen |
| `--gray-mid` | `#CCCCCC` | Borders, Read-Badges |
| `--border` | `#E0DCF0` | Trennlinien Sidebar, Tabellen |

### Zusätzliche Festwerte (CDD-UI)

| Element | Wert |
|---------|------|
| Topbar-Hintergrund | `#EBE2F9` |
| Topbar-Border | `#D0C8E8` |
| Sidebar-Hintergrund | `#FAFAFA` |
| Callout info (alt.) | `#F5F2FF` + Border-left `#9B6FDF` 3–4px |
| Code-Block-Hintergrund | `#1a1a2e` |
| Logo-Gradient | `#9B6FDF` → `#3E2C59` |

---

## 3. Typografie

| Stufe | Font | Größe | Gewicht | Farbe |
|-------|------|-------|---------|-------|
| **Body** | Arial, Helvetica, sans-serif | 14px | 400 | `--black` |
| **Zeilenhöhe** | — | 1.7 | — | — |
| **Topbar-Logo** | Arial | 15px | 700 | `#3E2C59` |
| **Hero-Titel** | Arial | 26px | 700 | `--white` |
| **Section Title (h2)** | Arial | 20px | 700 | `--dark` |
| **Sub-Title (h3)** | Arial | 15px | 700 | `--black` |
| **Nav-Cluster** | Arial | 11px | 700 | uppercase, letter-spacing `.1em` |
| **Nav-Item** | Arial | 13px | 400 / 700 active | `#3E2C59` |
| **Code / Prompts** | Courier New, monospace | 12px | — | `#d4d4d4` auf `#1a1a2e` |

### Code-Syntax-Farben (MD-Blöcke)

| Klasse | Farbe |
|--------|-------|
| Kommentar | `#6A9955` |
| Überschrift | `#9B6FDF` |
| Key | `#9CDCFE` |
| Value | `#FFFEC0` |
| Label | `#FFFC2E` |

---

## 4. Layout

| Token | Wert |
|-------|------|
| `--sidebar-w` | `280px` |
| `--topbar-h` | `56px` |
| Main max-width | `880px` |
| Main padding | `40px 56px 80px` (Desktop) |
| Hero padding | `36px 40px` |
| Hero border-radius | `12px` |
| Hero accent | `border-left: 6px solid var(--yellow)` |

### Breakpoints

| Name | Breite | Verhalten |
|------|--------|-----------|
| **Mobile** | `max-width: 768px` | Sidebar ausklappbar, Main full-width, reduzierte Paddings |

Standard-Breakpoints (SPEC-Referenz CDD): `sm=640` / `md=768` / `lg=1024`

---

## 5. Komponenten-Muster

### Topbar

- Fixiert, Höhe 56px, Hintergrund `#EBE2F9`
- Logo: conet-SVG + Trennlinie + „ContextDriven Development“

### Sidebar-Navigation

- Nav-Item: `padding 7px 20px 7px 28px`, `border-left 3px transparent`
- Hover/Active: Hintergrund `#EBE2F9`, Border `#9B6FDF`, ggf. `font-weight: 700`
- Cluster-Punkt: 6×6px, `#9B6FDF`

### Hero-Banner

- Hintergrund `--dark`, gelber linker Rand
- Label: 11px uppercase, `--yellow`
- Subtext: `#C8BFEF`

### Callouts

| Variante | Hintergrund |
|----------|-------------|
| info | `--violet-light` oder `#F5F2FF` |
| warning | `--yellow-light` |
| success | `--violet-light` |

Kein Border-Radius (CDD: `border-radius: 0` bei Callouts/Role-Cards).

### Badges

| Badge | Stil |
|-------|------|
| owner | `--violet-light` bg, `--dark` text, border `--violet` |
| contrib | `--yellow-light` bg, `#7A7000` text |
| reads | `--gray-light` bg, `--gray` text |

Padding: `2px 9px`, 11px, font-weight 700.

### Tabellen (`.matrix`)

- Header: `--dark` bg, `--white` text
- Zellen: border-bottom `--border`, gerade Zeilen `--gray-light`

### Steps (nummeriert)

- Kreis 30×30px, `--violet` bg, weiße Zahl

### Quick-Links

- Hover: `--violet-light` bg, border `--violet`, leichter `translateY(-1px)`

---

## 6. Section Titles

```css
h2.section-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--dark);
  border-bottom: 3px solid var(--yellow);
  scroll-margin-top: calc(var(--topbar-h) + 20px);
}
```

---

## 7. Barrierefreiheit (CDD-Vorgabe)

- Ziel: **WCAG 2.1 AA**
- Kontrastverhältnisse bei `--violet` auf `--white` und `--yellow` auf `--dark` prüfen
- Fokus-States bei interaktiven Elementen nicht weglassen
- Semantische Überschriften-Hierarchie in generiertem HTML

---

## 8. Komponenten-Bibliothek (Projekt)

| Bereich | Vorgabe |
|---------|---------|
| **HTML-Output Collab-UX** | `scripts/build-html.js` — bei Token-Änderung Build neu ausführen |
| **App-Produkte** | je Projekt (z. B. shadcn/ui, Tailwind) — hier nur CDD-Doc-UI |
| **Präfix** | Dokumentations-UI: keine App-Komponenten-Präfixe; Apps: z. B. `AppButton` |

---

## 9. Was aus Figma ins Repo muss

1. Design-Tokens (Farben, Abstände) → diese `design.md`
2. Komponenten-Namen und Zustände → `design.md` oder Nav-Punkt
3. Frame-Links mit Kontext → jeweiliger Feature-/Flow-Eintrag
4. BF-Kontrast-Werte → Accessibility-Abschnitt

---

## 10. Design-System-Kurzreferenz (KI)

```
Primärfarbe:     #9B6FDF (--violet)
Sekundär/Dunkel: #3E2C59 (--dark)
Akzent:          #FFFC2E (--yellow)
Schrift:         Arial, Helvetica, sans-serif · 14px body
Komponenten:     siehe Abschnitt 5
```

**Session-Start (UX/UI):** „Design-System aus design.md geladen. Was prüfen oder erweitern wir?“

---

## 11. Changelog Design

| Datum | Änderung |
|-------|----------|
| 2026-06-12 | Initial-Extraktion aus CDD_Workflow-grosseTeams-KI.html |

---

*Stand: 2026-06-12 — Quelle: CDD_Workflow-grosseTeams-KI.html (conet CDD)*
