# Collab-UX — Context Driven Development

Willkommen in der gemeinsamen Wissensbasis für **UX**, **AI in Applikationen** und **Prozess-Beratung**. Dieses Repo ist bewusst schlank: Inhalte leben in Markdown, die lesbare Oberfläche wird daraus gebaut.

---

## Worum es geht

| Ziel | Beschreibung |
|------|----------------|
| **Bündeln** | UX-Inputs, Use Cases und News an einem Ort statt in verstreuten Chats |
| **Versionieren** | Git als Historie — wer hat wann was ergänzt? |
| **CDD** | Kontext für Menschen *und* KI strukturiert im Repo bereitstellen |
| **Lesbar** | `npm run build` → `public/index.html` zum Ansehen und Teilen |

---

## Aufbau

```
Collab-UX/
├── cdd/
│   ├── index.md              ← diese Datei (Einstieg)
│   ├── was-ist-neu.md        ← Session „Was ist neu passiert?“
│   ├── persona.md            ← Zielgruppe UXler (CDD-Kontext)
│   ├── design.md             ← Design-Tokens & Muster (aus CDD-Dokument)
│   └── nav/
│       ├── 01-ai-in-applikationen-use-cases.md
│       ├── 02-ux-prozess-beratung.md
│       └── 03-news-ux-ai.md
├── scripts/build-html.js     ← Markdown → HTML
├── public/index.html         ← generiert (nicht von Hand editieren)
└── docs/                     ← Zusammenarbeit & KI-Kontext (repo-basiert)
```

---

## Navigationspunkte

1. **[AI in Applikationen — Use Cases](nav/01-ai-in-applikationen-use-cases.md)** — konkrete Einsatzszenarien, Patterns, Grenzen
2. **[UX Prozess-Beratung](nav/02-ux-prozess-beratung.md)** — Workshops, Reviews, Checklisten, Entscheidungsvorlagen
3. **[News zu UX und AI](nav/03-news-ux-ai.md)** — Kuratierte Links, Trends, interne Learnings

**Kontext-Dateien:**

- **[Persona](persona.md)** — Zielgruppe UXler (Designer, Research, Lead)
- **[Design](design.md)** — Farben, Typo, Komponenten aus dem CDD-Dokument

Zusätzlich: **[Was ist neu passiert?](was-ist-neu.md)** — laufendes Changelog für die Team-Session.

---

## CDD-Workflow (kurz)

1. **Thema wählen** — passenden Navigationspunkt in `cdd/nav/` öffnen oder anlegen
2. **Ergänzen** — Abschnitt hinzufügen, Datum und Autor:in notieren
3. **Changelog** — in `cdd/was-ist-neu.md` kurz vermerken, was neu ist
4. **Bauen & pushen** — `npm run build`, commit, push
5. **Abholen** — Kolleg:innen `git pull`, bei Bedarf `npm run build`, `public/index.html` öffnen

### Konventionen für neue Inhalte

- Überschrift `##` pro thematischem Block
- Am Blockende: `*Stand: YYYY-MM-DD — Name/Kürzel*`
- Offene Fragen unter `### Offen` sammeln
- Große Entscheidungen unter `### Entscheidung` mit Kurzbegründung

---

## Bezug zu App-Repos

Collab-UX ist **unabhängig** vom App-Code (z. B. `MarinasDeploy/RookieLaunch`). UX-Erkenntnisse können in App-Repos per Issue oder `docs/` übernommen werden — hier bleibt der **kollaborative UX-Kontext** zentral. Verknüpfung immer über **Repo-URLs und Pfade**, nicht über private Rechnerordner.

---

*Stand: 2026-06-12 — Initial-Setup*
