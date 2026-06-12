# Kolleg:innen an Collab-UX verknüpfen

Kurzanleitung, damit das Team Inhalte lesen und im CDD-Workflow mitarbeiten kann — **nur über GitHub und das Repo**, ohne spezielle lokale Setups.

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

## 2. Repo einrichten

An die Kolleg:innen weitergeben:

```bash
git clone https://github.com/MarinasDeploy/Collab-UX.git
cd Collab-UX
npm install
npm run build
```

HTML ansehen: `public/index.html` im geklonten Repo im Browser öffnen.

---

## 3. Inhalte beitragen (CDD-Routine)

| Schritt | Aktion |
|---------|--------|
| 1 | `git pull` — neuesten Stand holen |
| 2 | Passende `.md` in `cdd/` bearbeiten |
| 3 | `npm run build` |
| 4 | `git add cdd/ public/index.html` |
| 5 | `git commit -m "CDD: Kurzbeschreibung"` |
| 6 | `git push` |

**Konflikte vermeiden:** Vor dem Schreiben immer `git pull`; bei Merge-Konflikten in Markdown meist beide Abschnitte behalten und doppelte Überschriften bereinigen.

---

## 4. Ohne Git auf dem Rechner — nur lesen

- **GitHub Web:** Dateien unter `cdd/` direkt im Browser lesen (mit Write-Recht auch bearbeiten)
- **Raw-Links:** für Chat-KIs z. B. `https://raw.githubusercontent.com/MarinasDeploy/Collab-UX/main/cdd/index.md`
- **GitHub Pages** (optional): statische Seite unter `https://marinasdeploy.github.io/Collab-UX/`

---

## 5. KI für Kolleg:innen (beliebiges Tool)

Wer mit KI-Unterstützung schreiben will:

1. Repo klonen oder Inhalte von GitHub laden
2. KI mit **Repo-Pfaden** initialisieren (siehe `docs/KI-KONTEXT.md`)
3. Beispiel: „Lies `cdd/index.md` und ergänze …“

Kein bestimmtes Tool vorausgesetzt — entscheidend ist, dass Kontext aus `cdd/*.md` kommt.

---

## 6. Verknüpfung mit App-Repos (z. B. RookieLaunch)

| Collab-UX | App-Repo |
|-----------|----------|
| UX-Kontext, Use Cases, News | Implementierung im Code |
| `cdd/nav/*.md`, `cdd/design.md` | `app/`, `components/`, `docs/` |

Übernahme einer UX-Entscheidung in die App: Issue im App-Repo anlegen und auf den relevanten Abschnitt in Collab-UX verlinken (Commit-URL oder Pfad im Repo).

---

*Stand: 2026-06-12*
