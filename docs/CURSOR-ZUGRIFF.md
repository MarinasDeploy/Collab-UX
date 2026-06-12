# Cursor-Zugriff auf Collab-UX

So kannst du (und der KI-Agent in Cursor) auf `MarinasDeploy/Collab-UX` arbeiten.

---

## Option A — Eigenes Cursor-Fenster (empfohlen)

1. Repo klonen (falls noch nicht geschehen):
   ```bash
   git clone https://github.com/MarinasDeploy/Collab-UX.git
   ```
2. In Cursor: **File → Open Folder** → `Collab-UX` wählen
3. Im Chat z. B.:
   > „Lies `cdd/index.md` und ergänze in `cdd/nav/01-ai-in-applikationen-use-cases.md` einen Use Case für …“

Der Agent hat dann vollen Zugriff auf alle Dateien im Repo.

---

## Option B — Multi-Root (Collab-UX + RookieLaunch parallel)

1. Collab-UX neben `skillschatz` klonen (z. B. `C:\Collab-UX`)
2. Cursor: **File → Add Folder to Workspace** → `Collab-UX` hinzufügen
3. Im Chat explizit Pfade nennen: `C:\Collab-UX\cdd\…`

So kann ein Agent UX-Kontext aus Collab-UX und App-Code aus RookieLaunch zusammen nutzen.

---

## Option C — Von skillschatz aus verweisen

Wenn du nur im RookieLaunch-Workspace bleibst, kann der Agent **nur** auf Dateien zugreifen, die im geöffneten Workspace liegen. Dann entweder:

- Collab-UX als zweiten Ordner hinzufügen (Option B), oder
- Inhalte per `git submodule` unter `docs/collab-ux/` einbinden (fortgeschritten)

---

## GitHub CLI (`gh`) — optional

Auf diesem Rechner ist `gh` derzeit **nicht installiert**. Für PRs, Issues und Collaborator-Verwaltung:

1. [GitHub CLI installieren](https://cli.github.com/)
2. `gh auth login`
3. Danach z. B. `gh repo view MarinasDeploy/Collab-UX`

Bis dahin: Collaborators über die GitHub-Weboberfläche einladen (siehe `KOLLEGEN-EINBINDEN.md`).

---

## Typischer Agent-Workflow

```text
1. cdd/nav/<thema>.md bearbeiten
2. cdd/was-ist-neu.md Changelog ergänzen
3. npm run build
4. git commit + push
```

**Hinweis für Agenten:** `public/index.html` nicht von Hand editieren — immer `npm run build` ausführen.

---

*Stand: 2026-06-12*
