# Collab-UX

Gemeinsame **KI- & UX-Wissensbasis** — drei Themen, die im CDD-Workflow laufend erweitert werden. Geteilt über GitHub (`MarinasDeploy/Collab-UX`).

Alles läuft **über das Repo**: klonen, Markdown pflegen, optional HTML bauen. Keine tool- oder rechner-spezifischen Pfade nötig.

## Schnellstart

```bash
git clone https://github.com/MarinasDeploy/Collab-UX.git
cd Collab-UX
npm install
npm run build
```

Die lesbare Seite liegt unter `public/index.html` (nach dem Build im Browser öffnen oder später per GitHub Pages bereitstellen).

## Inhalt pflegen

**HTML-Navigation (3 Themen):**

| Pfad | Thema |
|------|--------|
| `cdd/nav/01-ai-in-applikationen-use-cases.md` | AI in Applikationen — Use Cases |
| `cdd/nav/02-ux-prozess-beratung.md` | UX Prozess-Beratung |
| `cdd/nav/03-news-ux-ai.md` | News zu UX und AI |

**Repo-Kontext (nicht in der HTML-Nav):** `cdd/index.md`, `cdd/persona.md`, `cdd/design.md`, `cdd/was-ist-neu.md` (Changelog erscheint in der HTML unter News)

Nach Änderungen:

```bash
npm run build
git add cdd/ public/index.html
git commit -m "CDD: …"
git push
```

Kolleg:innen holen Updates mit `git pull` und bauen bei Bedarf erneut.

## KI-Nutzung (tool-neutral)

Markdown-Dateien unter `cdd/` sind der Kontext für **jede** KI — IDE, Chat oder Agent. Siehe `docs/KI-KONTEXT.md` und `docs/KOLLEGEN-EINBINDEN.md`.
