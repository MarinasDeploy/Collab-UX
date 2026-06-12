# Collab-UX — Repo-Einstieg (nicht in der HTML-Navigation)

Diese Datei ist der **Einstieg für Menschen und KI im Repo**. Die öffentliche HTML-Seite zeigt nur die drei UX/KI-Themen — nicht dieses Dokument.

---

## HTML-Oberfläche (3 Navigationspunkte)

| # | Datei | Thema |
|---|--------|--------|
| 1 | `cdd/nav/01-ai-in-applikationen-use-cases.md` | AI in Applikationen — Use Cases |
| 2 | `cdd/nav/02-ux-prozess-beratung.md` | UX Prozess-Beratung |
| 3 | `cdd/nav/03-news-ux-ai.md` | News zu UX und AI |

Auf der **News**-Seite in der HTML wird zusätzlich `cdd/was-ist-neu.md` eingebunden („Was ist neu passiert?“).

---

## Repo-Struktur

```
Collab-UX/
├── cdd/
│   ├── index.md              ← diese Datei (Repo/CDD-Hilfe)
│   ├── was-ist-neu.md        ← Changelog · erscheint in HTML unter News
│   ├── persona.md            ← KI-Kontext Zielgruppe (nur Repo)
│   ├── design.md             ← Design-Tokens für HTML-Build (nur Repo)
│   └── nav/                  ← die 3 HTML-Themen
├── scripts/build-html.js
├── public/index.html         ← generiert
└── docs/                     ← Zusammenarbeit & KI-Kontext
```

---

## CDD-Workflow (kurz)

1. **Thema wählen** — eine der drei Dateien unter `cdd/nav/`
2. **Ergänzen** — Abschnitt hinzufügen, Datum und Autor:in notieren
3. **Changelog** — in `cdd/was-ist-neu.md` vermerken (sichtbar unter News in der HTML)
4. **Bauen & pushen** — `npm run build`, commit, push
5. **Abholen** — Kolleg:in `git pull`, bei Bedarf `npm run build`

### Konventionen

- Überschrift `##` pro thematischem Block
- Am Blockende: `*Stand: YYYY-MM-DD — Name/Kürzel*`
- Offene Fragen unter `### Offen`
- Entscheidungen unter `### Entscheidung` mit Kurzbegründung

---

## Bezug zu App-Repos

UX-Erkenntnisse aus den Nav-Punkten können in App-Repos per Issue übernommen werden. Verknüpfung über **Repo-URLs und Pfade**.

---

*Stand: 2026-06-12*
