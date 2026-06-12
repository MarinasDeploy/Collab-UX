# Anleitung für Kolleg:innen

Kurzüberblick: GitHub verbinden, Notizen **nur über KI** pflegen (beliebiges Tool).

<details class="accordion">
<summary>1. GitHub — Einladung &amp; Klonen</summary>
<p>1. Einladung zu <strong>MarinasDeploy/Collab-UX</strong> per E-Mail annehmen (Rolle: Write).
2. Repo klonen und einmal einrichten:

git clone https://github.com/MarinasDeploy/Collab-UX.git
cd Collab-UX
npm install
npm run build

3. HTML ansehen: public/index.html im Browser öffnen.
4. Repo-Ordner in deiner KI-Umgebung öffnen (IDE, Agent, o. Ä.).</p>
</details>

<details class="accordion">
<summary>2. Welche .md-Dateien die KI bearbeitet</summary>
<p><strong>In der HTML sichtbar (Notizbuch):</strong>
· cdd/nav/01-ai-in-applikationen-use-cases.md
· cdd/nav/02-ux-prozess-beratung.md
· cdd/nav/03-news-ux-ai.md

<strong>Optional im Repo (nicht in der HTML-Nav):</strong>
· cdd/was-ist-neu.md · cdd/index.md

<strong>Nicht von Hand editieren:</strong> public/index.html — die KI führt npm run build aus.</p>
</details>

<details class="accordion">
<summary>3. KI-Prompt — Einstieg (tool-neutral)</summary>
<p>Lies im geklonten Repo MarinasDeploy/Collab-UX die Datei cdd/index.md und cdd/nav/00-anleitung-kollegen.md.
Ich arbeite an Collab-UX. Antworte auf Deutsch.
Welche Datei unter cdd/nav/ ist für [Thema] zuständig?</p>
</details>

<details class="accordion">
<summary>4. KI-Prompt — Notiz hinzufügen (komplett)</summary>
<p>Im Repo Collab-UX:
1. git pull
2. In [cdd/nav/01-… | 02-… | 03-…] einen neuen Accordion-Eintrag ergänzen (details/summary/p) — Format wie die bestehenden Einträge.
   Überschrift: […]
   Inhalt: […]
   Nur meinen Text verwenden, nichts erfinden.
3. npm run build
4. git add cdd/nav/ public/index.html
5. git commit -m "CDD: [Kurzbeschreibung]"
6. git push

Führe die Schritte aus oder gib mir die genauen Befehle.</p>
</details>

<details class="accordion">
<summary>5. KI-Prompt — News / Impulse</summary>
<p>Im Repo Collab-UX:
1. git pull
2. cdd/nav/03-news-ux-ai.md öffnen — neuen Accordion-Eintrag mit Datum und Initialen, Format wie bestehende Einträge.
   Inhalt: […]
3. npm run build, commit, push wie in der Anleitung.

Führe alles aus.</p>
</details>

<details class="accordion">
<summary>6. KI-Prompt — Stand holen</summary>
<p>git pull im Repo Collab-UX, npm run build, sag mir was sich in cdd/nav/ seit dem letzten Mal geändert hat.</p>
</details>
