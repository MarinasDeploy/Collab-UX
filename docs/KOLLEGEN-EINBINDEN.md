# Kolleg:innen an Collab-UX verknüpfen

Kurzanleitung, damit das Team Inhalte lesen und im CDD-Workflow mitarbeiten kann.

---

## 1. Zugriff auf GitHub (MarinasDeploy)

### Einzelperson einladen (kleines Team)

1. Öffne: https://github.com/MarinasDeploy/Collab-UX/settings/access
2. **Add people** (oder **Invite collaborator**)
3. GitHub-Username oder E-Mail der Person eingeben
4. Rolle wählen:
   - **Write** — Inhalte pflegen, pushen (für UX-Kolleg:innen üblich)
   - **Read** — nur lesen und klonen
   - **Maintain** — zusätzlich Settings (nur für Verantwortliche)

Die Person erhält eine E-Mail und muss die Einladung annehmen.

### Organisation MarinasDeploy

Falls Kolleg:innen noch **kein** GitHub-Konto haben:

1. Kostenloses Konto auf https://github.com/signup anlegen
2. Einladung annehmen
3. Optional: zur Org **MarinasDeploy** hinzufügen (Org-Owner unter *People*)

---

## 2. Repo lokal einrichten

An die Kolleg:innen weitergeben:

```bash
git clone https://github.com/MarinasDeploy/Collab-UX.git
cd Collab-UX
npm install
npm run build
```

HTML ansehen: `public/index.html` im Browser öffnen (Doppelklick oder „Open with Live Server“ in VS Code/Cursor).

---

## 3. Inhalte beitragen (CDD-Routine)

| Schritt | Aktion |
|---------|--------|
| 1 | `git pull` — neuesten Stand holen |
| 2 | Passende `.md` in `cdd/nav/` oder `cdd/was-ist-neu.md` bearbeiten |
| 3 | `npm run build` |
| 4 | `git add cdd/ public/index.html` |
| 5 | `git commit -m "CDD: Kurzbeschreibung"` |
| 6 | `git push` |

**Konflikte vermeiden:** Vor dem Schreiben immer `git pull`; bei Merge-Konflikten in Markdown meist beide Abschnitte behalten und doppelte Überschriften bereinigen.

---

## 4. Ohne Git — nur lesen

Alternativen, wenn jemand nicht committen soll:

- **GitHub Web:** Dateien unter `cdd/` direkt im Browser lesen (weniger komfortabel)
- **HTML-Export:** Verantwortliche baut regelmäßig und teilt `public/index.html` per Teams/Slack (nicht ideal, aber möglich)
- **GitHub Pages** (später): statische Seite unter `https://marinasdeploy.github.io/Collab-UX/` — einmal einrichten, dann reicht Link + `git pull` für Maintainer

---

## 5. Cursor für Kolleg:innen

Wer mit KI-Unterstützung schreiben will:

1. [Cursor](https://cursor.com) installieren
2. Repo öffnen (siehe `docs/CURSOR-ZUGRIFF.md`)
3. Regel optional: „Antworte auf Deutsch; halte CDD-Konventionen aus `cdd/index.md` ein“

---

## 6. Verknüpfung mit RookieLaunch (App-Code)

| Collab-UX | RookieLaunch (`skillschatz`) |
|-----------|------------------------------|
| UX-Kontext, Use Cases, News | Implementierung in Next.js |
| `cdd/nav/*.md` | `app/`, `components/`, `docs/` |

Übernahme einer UX-Entscheidung in die App: Issue in RookieLaunch anlegen und auf den relevanten Abschnitt in Collab-UX verlinken (Commit-URL oder Pfad).

---

*Stand: 2026-06-12*
