# KI-Kontext — Collab-UX über das Repo

Collab-UX ist **repo-zentriert**: Menschen und KI arbeiten mit denselben Markdown-Dateien unter `cdd/`. Es gibt keine privaten Pfade oder tool-spezifische Setups — nur **klonen, lesen, ändern, pushen**.

---

## Grundprinzip

| Schritt | Aktion |
|---------|--------|
| 1 | Repo klonen oder `git pull` |
| 2 | Relevante `.md` unter `cdd/` als Kontext nutzen |
| 3 | Änderungen committen und pushen |
| 4 | Optional: `npm run build` für `public/index.html` |

Die KI bezieht sich **immer auf Repo-Pfade** (z. B. `cdd/persona.md`, `cdd/design.md`) — nicht auf Rechner-spezifische Ordner.

---

## Repo einbinden (beliebiges KI-Tool)

Funktioniert mit IDE-Assistenten, Chat-KIs, CI-Agenten oder anderen Tools — solange sie Dateien aus dem geklonten Repo lesen können.

```bash
git clone https://github.com/MarinasDeploy/Collab-UX.git
cd Collab-UX
```

**Workspace öffnen:** Das geklonte Repo als Projektordner in der IDE oder im KI-Tool wählen (Name des Ordners ist egal).

**Beispiel-Prompt (tool-neutral):**

```text
Lies cdd/index.md, cdd/persona.md und cdd/design.md aus diesem Repo.
Ergänze in cdd/nav/01-ai-in-applikationen-use-cases.md einen Use Case für …
Halte die CDD-Konventionen aus cdd/index.md ein.
```

---

## Empfohlene Kontext-Dateien je Aufgabe

| Aufgabe | Dateien laden |
|---------|----------------|
| **Allgemein / Einstieg** | `cdd/index.md` |
| **UX-Zielgruppe** | `cdd/persona.md` |
| **Design / Tokens** | `cdd/design.md` |
| **Changelog / Session** | `cdd/was-ist-neu.md` |
| **Thema vertiefen** | passende Datei unter `cdd/nav/` |

---

## Ohne lokale Installation

- **GitHub Web:** Markdown unter `cdd/` direkt im Browser lesen und (mit Write-Recht) bearbeiten
- **Raw-URLs:** z. B. `https://raw.githubusercontent.com/MarinasDeploy/Collab-UX/main/cdd/index.md` in Chat-KIs einfügen
- **HTML:** gebaute `public/index.html` aus dem Repo — nach `git pull` im Browser öffnen

---

## Typischer Workflow mit KI

```text
1. git pull
2. KI mit Repo-Pfaden initialisieren (siehe Tabelle oben)
3. cdd/nav/<thema>.md oder cdd/was-ist-neu.md bearbeiten
4. npm run build
5. git add cdd/ public/index.html
6. git commit -m "CDD: …"
7. git push
```

**Regel:** `public/index.html` nicht von Hand editieren — immer `npm run build` ausführen.

---

## Zwei Repos parallel (UX + App-Code)

Wenn neben Collab-UX ein App-Repo genutzt wird:

1. Beide Repos **separat klonen** (jeweils eigener Ordner — beliebiger Name)
2. In der KI-Session **beide Repo-Pfade** nennen, z. B. `Collab-UX/cdd/design.md` und `RookieLaunch/docs/…`
3. UX-Entscheidungen in Collab-UX versionieren; Umsetzung im App-Repo

Alternative: Collab-UX als **Git-Submodule** im App-Repo unter `docs/collab-ux/` (fortgeschritten).

---

*Stand: 2026-06-12*
