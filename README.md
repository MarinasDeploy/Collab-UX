# Collab-UX

Gemeinsamer **Context Driven Development (CDD)**-Raum für UX-Themen, AI-Use-Cases und Prozess-Beratung — geteilt über GitHub (`MarinasDeploy/Collab-UX`).

## Schnellstart

```bash
git clone https://github.com/MarinasDeploy/Collab-UX.git
cd Collab-UX
npm install
npm run build
```

Die lesbare Seite liegt danach unter `public/index.html` (lokal im Browser öffnen oder per GitHub Pages bereitstellen).

## Inhalt pflegen

| Pfad | Zweck |
|------|--------|
| `cdd/index.md` | Einstieg: Aufbau, Workflow, Rollen |
| `cdd/was-ist-neu.md` | Session „Was ist neu passiert?“ (Changelog) |
| `cdd/nav/*.md` | Inhalte je Navigationspunkt |

Nach Änderungen:

```bash
npm run build
git add cdd/ public/index.html
git commit -m "CDD: …"
git push
```

Kolleg:innen holen Updates mit `git pull` und öffnen erneut `public/index.html`.

## Cursor / KI-Agent

Siehe `docs/CURSOR-ZUGRIFF.md` und `docs/KOLLEGEN-EINBINDEN.md`.
