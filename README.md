# Collab-UX

Gemeinsamer **Context Driven Development (CDD)**-Raum für UX-Themen, AI-Use-Cases und Prozess-Beratung — geteilt über GitHub (`MarinasDeploy/Collab-UX`).

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

| Pfad | Zweck |
|------|--------|
| `cdd/index.md` | Einstieg: Aufbau, Workflow, Rollen |
| `cdd/persona.md` | Zielgruppe UXler (CDD-Kontext) |
| `cdd/design.md` | Design-Tokens und UI-Muster |
| `cdd/was-ist-neu.md` | Session „Was ist neu passiert?“ (Changelog) |
| `cdd/nav/*.md` | Inhalte je Navigationspunkt |

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
