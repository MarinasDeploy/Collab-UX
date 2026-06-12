# Anleitung für Kolleg:innen

Kurzüberblick: GitHub verbinden, Notizen pflegen, mit **beliebiger KI** arbeiten.

<details class="accordion">
<summary>1. GitHub — Einladung &amp; Klonen</summary>
<p>1. Einladung zu <strong>MarinasDeploy/Collab-UX</strong> per E-Mail annehmen (Rolle: Write).
2. Repo klonen:

git clone https://github.com/MarinasDeploy/Collab-UX.git
cd Collab-UX
npm install
npm run build

3. HTML ansehen: public/index.html im Browser öffnen.
4. Vor jedem Schreiben: git pull</p>
</details>

<details class="accordion">
<summary>2. Welche .md-Dateien du bearbeitest</summary>
<p><strong>In der HTML sichtbar (Notizbuch):</strong>
· cdd/nav/01-ai-in-applikationen-use-cases.md
· cdd/nav/02-ux-prozess-beratung.md
· cdd/nav/03-news-ux-ai.md

<strong>Optional im Repo (nicht in der HTML-Nav):</strong>
· cdd/was-ist-neu.md — Changelog
· cdd/index.md — Repo-Hilfe

<strong>Nicht von Hand editieren:</strong> public/index.html (wird gebaut)</p>
</details>

<details class="accordion">
<summary>3. Neue Notiz hinzufügen (Accordion)</summary>
<p>In der passenden Datei unter cdd/nav/ einfügen:

&lt;details class="accordion"&gt;
&lt;summary&gt;Deine Überschrift&lt;/summary&gt;
&lt;p&gt;Dein Inhalt&lt;/p&gt;
&lt;/details&gt;

Dann: npm run build</p>
</details>

<details class="accordion">
<summary>4. Speichern &amp; pushen</summary>
<p>git pull
npm run build
git add cdd/nav/ public/index.html
git commit -m "CDD: Kurzbeschreibung der Änderung"
git push</p>
</details>

<details class="accordion">
<summary>5. KI-Prompt — Einstieg (tool-neutral)</summary>
<p>Lies im geklonten Repo MarinasDeploy/Collab-UX die Datei cdd/index.md.
Ich arbeite an Collab-UX. Antworte auf Deutsch.
Welche Datei unter cdd/nav/ ist für [Thema] zuständig?</p>
</details>

<details class="accordion">
<summary>6. KI-Prompt — Notiz ergänzen</summary>
<p>Öffne [cdd/nav/01-ai-in-applikationen-use-cases.md | 02-… | 03-…].
Füge einen neuen Accordion-Eintrag hinzu (details/summary/p).
Überschrift: […]
Inhalt: […]
Nur meinen Text verwenden, nichts erfinden.
Danach npm run build ausführen.</p>
</details>

<details class="accordion">
<summary>7. KI-Prompt — News / Impulse</summary>
<p>Öffne cdd/nav/03-news-ux-ai.md.
Füge einen Accordion-Eintrag mit Datum und Initialen hinzu.
Format wie die bestehenden Einträge.
Danach npm run build und git commit vorschlagen.</p>
</details>

<details class="accordion">
<summary>8. Ohne lokales Git — nur GitHub Web</summary>
<p>Datei auf GitHub öffnen → Stift-Icon (Edit) → Accordion-Block einfügen → Commit.
Hinweis: public/index.html braucht lokal npm run build — oder Kolleg:in baut nach.</p>
</details>
