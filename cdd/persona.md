# Persona — Zielgruppe Collab-UX

Diese Datei beschreibt **wen** Collab-UX adressiert: UX-Profis im CDD-Workflow. Sie ist Kontext für KI-Sessions, Reviews und neue Inhalte in den Navigationspunkten.

**Owner:** UX Lead · **Aktualisierung:** bei Rollen- oder Teamänderungen

---

## Primäre Zielgruppe

UXler, die UX-Wissen, AI-Use-Cases und Prozess-Beratung **gemeinsam versionieren** — nicht in Chats, Figma-Alleen oder Einzel-Dokumenten.

| Merkmal | Beschreibung |
|---------|----------------|
| **Rollen** | UX/UI Designer, UX Researcher, ggf. UX Lead / Service Designer |
| **Kontext** | Produktteams mit KI-gestützter Entwicklung (Cursor, Figma AI, Claude/ChatGPT) |
| **Bedarf** | Ein Ort für Personas, Design-Entscheidungen, Flows und UX-News — lesbar für Mensch und Agent |
| **Sprache** | Deutsch (Fachtexte, Checklisten, Entscheidungen) |

---

## Persona 1: UX/UI Designer „Samira“

**Rolle:** UX/UI Designerin in einem cross-funktionalen Team  
**Erfahrung:** 4–8 Jahre, stark in Figma, erste Erfahrung mit KI-Tools

### Ziele

- Design-System und Tokens zentral pflegen (`design.md`)
- Figma-Entscheidungen für Dev und KI **sichtbar** machen (kein Figma-Silo)
- UX-Prozess-Beratung und Checklisten für Reviews nutzen
- AI-Use-Cases für UI-Copy, Varianten und Specs erkunden

### Frustrationen (heute)

- „In Figma steht alles — aber niemand außerhalb sieht es.“
- Jede KI-Session startet ohne Kontext neu
- Design-Änderungen gehen in Slack unter

### Verhalten in Collab-UX

- Pflegt `design.md` bei Token- oder Komponentenänderungen
- Trägt Use Cases unter **AI in Applikationen** ein
- Nutzt **UX Prozess-Beratung** für Review-Sessions
- Liest `was-ist-neu.md` zu Wochenbeginn

### KI-Kontext (CDD)

**Immer laden:** `persona.md` · `design.md` · `was-ist-neu.md` · relevante `nav/*.md`  
**Nach Figma-Session:** Entscheidung in Nav-Punkt oder Changelog dokumentieren

---

## Persona 2: UX Researcher „Jonas“

**Rolle:** UX Researcher, Discovery und Validierung  
**Erfahrung:** 3–6 Jahre, Interviews, Usability-Tests, Synthese

### Ziele

- Research-Erkenntnisse strukturiert teilen
- Personas und Pain Points als Grundlage für Design und KI-Inhalte
- News zu UX/AI kuratieren und für das Team einordnen

### Frustrationen (heute)

- Findings landen in Präsentationen, nicht im Dev-Kontext
- Personas veralten ohne dass es jemand merkt
- KI generiert Texte ohne Nutzerbezug

### Verhalten in Collab-UX

- Ergänzt Persona-Abschnitte und Journey-Hinweise hier in `persona.md`
- Pflegt **News zu UX und AI**
- Formuliert Research-Inputs für **UX Prozess-Beratung** (Checklisten, Workshop-Formate)

### KI-Kontext (CDD)

**Immer laden:** `persona.md` · `was-ist-neu.md`  
**Bei Research-Zyklus:** Persona-Block aktualisieren, Changelog-Eintrag

---

## Persona 3: UX Lead „Marina“

**Rolle:** Koordination UX-Spur im CDD-Workflow  
**Erfahrung:** Team-Lead, Governance, Schnittstelle zu PO/Tech

### Ziele

- Collab-UX als **Single Source of Truth** für UX-Kontext etablieren
- Kolleg:innen einbinden (Git, Reviews, CDD-Sessions)
- Priorisieren: welche Nav-Punkte wann befüllt werden

### Frustrationen (heute)

- UX-Arbeit nicht versioniert, schwer nachvollziehbar
- Unklar, welche .md-Datei für welche Rolle gilt

### Verhalten in Collab-UX

- Pflegt `index.md` und `was-ist-neu.md`
- Moderiert CDD-Sessions (siehe **UX Prozess-Beratung**)
- Verknüpft Erkenntnisse mit App-Repos (z. B. RookieLaunch-Issues)

---

## Sekundäre Leser (Read-Only)

| Rolle | Nutzen |
|-------|--------|
| **Frontend Dev** | `design.md` als Implementierungsgrundlage |
| **PO / PM** | Personas, Prioritäten aus UX-Prozess |
| **KI-Agent (Cursor)** | Vollständiger CDD-Kontext ohne mündliche Übergabe |

---

## Tonalität & Qualitätskriterien

Aus dem CDD-Workflow für UX-Sessions:

- Entscheidungen **immer mit Persona-Bezug** prüfen: „Würde Samira/Jonas’ Nutzer:in das verstehen?“
- Fehlende UI-Zustände benennen: Loading, Error, Empty, Success
- Barrierefreiheit (WCAG 2.1 AA) aktiv einfordern
- Kein Design- oder Copy-Feedback ohne Referenz auf Persona oder `design.md`

---

## Endnutzer-Personas (Produkt)

Endnutzer-Personas einzelner Produkte (z. B. RookieLaunch Eltern/Rookie) gehören **pro Produkt** in die jeweilige App-Doku oder ein verlinktes `spec-personas.md`.  
Collab-UX `persona.md` = **Zielgruppe der UX-Kollaboration**, nicht die App-Nutzer:innen.

### Vorlage für verlinkte Produkt-Persona

```markdown
### [Name] — [Produkt]
- Kontext: …
- Hauptziel: …
- Hauptfrustration: …
- Link: [Repo/Pfad]
```

---

*Stand: 2026-06-12 — abgeleitet aus CDD_Workflow-grosseTeams-KI (Rollen UX Research & UX/UI)*
