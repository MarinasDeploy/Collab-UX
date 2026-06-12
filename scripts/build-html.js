/**
 * Collab-UX — Markdown (cdd/nav/) → public/index.html
 * HTML: nur 3 UX/KI-Themen · Styles: cdd/design.md
 * Repo-Kontext (persona, design, index): nicht in der HTML-Navigation
 */

const fs = require('fs')
const path = require('path')
const { marked } = require('marked')

const ROOT = path.join(__dirname, '..')
const CDD = path.join(ROOT, 'cdd')
const OUT = path.join(ROOT, 'public', 'index.html')

const TOPIC_PAGES = [
  {
    id: 'ai-use-cases',
    file: 'nav/01-ai-in-applikationen-use-cases.md',
    label: 'AI in Applikationen — Use Cases',
  },
  {
    id: 'ux-prozess',
    file: 'nav/02-ux-prozess-beratung.md',
    label: 'UX Prozess-Beratung',
  },
  {
    id: 'news',
    file: 'nav/03-news-ux-ai.md',
    label: 'News zu UX und AI',
  },
]

const GUIDE_PAGE = {
  id: 'anleitung',
  file: 'nav/00-anleitung-kollegen.md',
  label: 'Anleitung Kolleg:in',
}

const PAGES = [...TOPIC_PAGES, GUIDE_PAGE]

marked.setOptions({ gfm: true, breaks: false })

function readMdRaw(relativePath) {
  const full = path.join(CDD, relativePath)
  if (!fs.existsSync(full)) {
    console.warn(`Warnung: fehlt ${relativePath}`)
    return ''
  }
  return fs.readFileSync(full, 'utf8')
}

function readPageMarkdown(page) {
  const main = readMdRaw(page.file)
  if (!main) {
    return `<p><em>Datei fehlt: ${page.file}</em></p>`
  }
  return marked.parse(main)
}

function buildSections() {
  return PAGES.map(
    (p) => `
    <section class="page" id="page-${p.id}" data-page="${p.id}" hidden>
      <article class="prose">${readPageMarkdown(p)}</article>
    </section>`
  ).join('\n')
}

function buildNav() {
  const topics = TOPIC_PAGES.map((p, i) =>
    `<button type="button" class="nav-btn${i === 0 ? ' active' : ''}" data-target="${p.id}" aria-current="${i === 0 ? 'page' : 'false'}">${p.label}</button>`
  ).join('\n')
  const guide = `<button type="button" class="nav-btn nav-guide" data-target="${GUIDE_PAGE.id}" aria-current="false">${GUIDE_PAGE.label}</button>`
  return `
    <div class="nav-label">Themen</div>
    <div class="nav-items">${topics}</div>
    <div class="nav-label nav-label-guide">Übergabe</div>
    <div class="nav-items">${guide}</div>`
}

function buildStyles() {
  return `
:root{
  --violet:#9B6FDF;
  --violet-light:#EBE2F9;
  --dark:#3E2C59;
  --yellow:#FFFC2E;
  --yellow-light:#FFFEC0;
  --black:#000000;
  --white:#FFFFFF;
  --gray:#4A4A4A;
  --gray-light:#F5F5F5;
  --gray-mid:#CCCCCC;
  --border:#E0DCF0;
  --sidebar-w:280px;
  --topbar-h:56px;
  --callout-info:#F5F2FF;
  --code-bg:#1a1a2e;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{
  font-family:Arial,Helvetica,sans-serif;
  font-size:14px;
  line-height:1.7;
  color:var(--black);
  background:var(--white);
  min-height:100vh;
}
.topbar{
  position:fixed;top:0;left:0;right:0;
  height:var(--topbar-h);
  background:var(--violet-light);
  border-bottom:1px solid #D0C8E8;
  display:flex;align-items:center;
  padding:0 24px 0 calc(var(--sidebar-w) + 24px);
  z-index:100;gap:12px;
}
.topbar-brand{display:flex;align-items:center;gap:10px}
.topbar-mark{
  width:28px;height:28px;border-radius:4px;
  background:linear-gradient(180deg,var(--violet) 0%,var(--dark) 100%);
  flex-shrink:0;
}
.topbar h1{font-size:15px;font-weight:700;color:var(--dark);letter-spacing:.02em}
.topbar p{font-size:11px;color:var(--gray);margin:0}
.burger{
  display:none;background:none;border:none;cursor:pointer;
  padding:6px;flex-direction:column;gap:4px;margin-right:4px;
}
.burger span{display:block;width:22px;height:2px;background:var(--dark);border-radius:2px}
.shell{display:flex;padding-top:var(--topbar-h);min-height:100vh}
.sidebar{
  width:var(--sidebar-w);
  min-height:calc(100vh - var(--topbar-h));
  background:#FAFAFA;
  border-right:1px solid var(--border);
  position:fixed;top:var(--topbar-h);left:0;bottom:0;
  overflow-y:auto;padding:16px 0 32px;
  z-index:90;transition:transform .25s ease;
}
.nav-label{
  padding:10px 20px 8px;
  font-size:11px;font-weight:700;
  text-transform:uppercase;letter-spacing:.1em;
  color:var(--black);
}
.nav-items{display:flex;flex-direction:column}
.nav-btn{
  display:block;width:100%;text-align:left;
  padding:7px 20px 7px 28px;
  font:inherit;font-size:13px;font-weight:400;
  color:var(--dark);
  background:none;border:none;border-left:3px solid transparent;
  cursor:pointer;transition:background .15s,border-color .15s;
  line-height:1.35;
}
.nav-btn:hover{background:var(--violet-light);border-left-color:var(--violet)}
.nav-btn.active{background:var(--violet-light);border-left-color:var(--violet);font-weight:700}
.nav-btn:focus-visible{outline:2px solid var(--violet);outline-offset:-2px}
.nav-label-guide{margin-top:14px;padding-top:14px;border-top:1px solid var(--border);color:var(--gray)}
.nav-btn.nav-guide{font-size:12px;color:var(--gray);padding-left:24px}
.nav-btn.nav-guide:hover,.nav-btn.nav-guide.active{color:var(--dark)}
.footer-meta{
  margin:16px 20px 0;padding-top:12px;
  font-size:11px;color:var(--gray);
  border-top:1px solid var(--border);line-height:1.5;
}
.footer-meta code{font-size:10px;background:var(--gray-light);padding:1px 4px}
.main{
  margin-left:var(--sidebar-w);flex:1;
  padding:40px 56px 80px;
  max-width:880px;
  background:var(--white);
}
.page[hidden]{display:none!important}
.prose h1{font-size:20px;font-weight:700;color:var(--dark);margin-bottom:14px;line-height:1.3}
.prose h2{
  font-size:20px;font-weight:700;color:var(--dark);
  margin:32px 0 14px;padding-bottom:10px;
  border-bottom:3px solid var(--yellow);
}
.prose h3{font-size:15px;font-weight:700;color:var(--black);margin:22px 0 8px}
.prose h4{font-size:13px;font-weight:700;margin:16px 0 6px}
.prose p,.prose ul,.prose ol{margin:0 0 14px;color:var(--black)}
.prose ul,.prose ol{padding-left:1.35rem}
.prose li{margin:0 0 4px}
.prose table{width:100%;border-collapse:collapse;font-size:13px;margin:16px 0}
.prose th{
  background:var(--dark);color:var(--white);font-weight:700;
  padding:10px 12px;text-align:left;border:1px solid var(--border);
}
.prose td{padding:9px 12px;border:1px solid var(--border);vertical-align:top}
.prose tr:nth-child(even) td{background:var(--gray-light)}
.prose code{
  font-family:'Courier New',monospace;
  background:var(--gray-light);padding:2px 6px;font-size:12px;
}
.prose pre{
  background:var(--code-bg);color:#d4d4d4;
  padding:20px 24px;margin:14px 0 24px;
  overflow-x:auto;font-family:'Courier New',monospace;font-size:12px;line-height:1.7;
}
.prose pre code{background:none;padding:0;color:inherit}
.prose a{color:var(--violet);text-decoration:underline}
.prose a:hover{color:var(--dark)}
.prose a:focus-visible{outline:2px solid var(--violet);outline-offset:2px}
.prose hr{border:none;border-top:1px solid var(--border);margin:24px 0}
.prose blockquote{
  background:var(--callout-info);
  border-left:4px solid var(--violet);
  padding:14px 18px;margin:18px 0;color:var(--gray);
}
.prose input[type=checkbox]{margin-right:6px;accent-color:var(--violet);width:auto}
.prose em{color:var(--gray)}
.prose details.accordion{
  border:1px solid var(--border);
  margin:0 0 8px;
  background:var(--white);
}
.prose details.accordion summary{
  display:flex;align-items:center;gap:10px;
  padding:12px 16px;
  font-size:14px;font-weight:700;color:var(--dark);
  cursor:pointer;list-style:none;
  user-select:none;
}
.prose details.accordion summary::-webkit-details-marker{display:none}
.prose details.accordion summary::before{
  content:'+';
  flex-shrink:0;
  width:22px;height:22px;
  display:flex;align-items:center;justify-content:center;
  font-size:16px;font-weight:700;line-height:1;
  color:var(--dark);
  border:1px solid var(--violet);
  background:var(--violet-light);
}
.prose details.accordion[open] summary::before{content:'−'}
.prose details.accordion summary:hover{background:var(--violet-light)}
.prose details.accordion .accordion-body,
.prose details.accordion>p{
  padding:0 16px 14px 48px;
  margin:0;
  font-size:14px;color:var(--black);
  white-space:pre-wrap;
}
.prose details.accordion[open] summary{
  border-bottom:1px solid var(--border);
  margin-bottom:0;
}
@media(max-width:768px){
  .topbar{padding:0 16px}
  .burger{display:flex}
  .sidebar{transform:translateX(-100%)}
  .sidebar.open{transform:translateX(0)}
  .main{margin-left:0;padding:24px 20px 60px;max-width:none}
  .nav-btn{font-size:12px;padding-left:20px}
}`
}

function buildHtml() {
  const built = new Date().toISOString().slice(0, 16).replace('T', ' ')
  const pageIds = PAGES.map((p) => `'${p.id}'`).join(',')
  const defaultPage = PAGES[0].id
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Collab-UX — KI &amp; UX</title>
<style>${buildStyles()}</style>
</head>
<body>
<header class="topbar">
  <button class="burger" type="button" onclick="toggleSidebar()" aria-label="Navigation öffnen">
    <span></span><span></span><span></span>
  </button>
  <div class="topbar-brand">
    <div class="topbar-mark" aria-hidden="true"></div>
    <div>
      <h1>Collab-UX</h1>
      <p>KI &amp; UX — Use Cases · Prozess · News</p>
    </div>
  </div>
</header>
<div class="shell">
  <aside class="sidebar" id="sidebar">
    <nav aria-label="Hauptnavigation">
      ${buildNav()}
    </nav>
    <div class="footer-meta">
      Generiert: ${built}<br/>
      Updates: <code>git pull</code> + <code>npm run build</code>
    </div>
  </aside>
  <main class="main">
    ${buildSections()}
  </main>
</div>
<script>
(function(){
  var buttons=document.querySelectorAll('.nav-btn');
  var pages=document.querySelectorAll('.page');
  var sidebar=document.getElementById('sidebar');
  var defaultPage='${defaultPage}';
  function show(id){
    pages.forEach(function(p){p.hidden=p.dataset.page!==id;});
    buttons.forEach(function(b){
      var on=b.dataset.target===id;
      b.classList.toggle('active',on);
      b.setAttribute('aria-current',on?'page':'false');
    });
    history.replaceState(null,'','#'+id);
    sidebar.classList.remove('open');
    window.scrollTo(0,0);
  }
  buttons.forEach(function(b){b.addEventListener('click',function(){show(b.dataset.target);});});
  window.toggleSidebar=function(){sidebar.classList.toggle('open');};
  var valid=[${pageIds}];
  var hash=location.hash.slice(1);
  show(valid.indexOf(hash)>=0?hash:defaultPage);
})();
</script>
</body>
</html>`
}

function run() {
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, buildHtml(), 'utf8')
  console.log(`✓ ${OUT}`)
}

const watch = process.argv.includes('--watch')
run()

if (watch) {
  console.log('Watch-Modus — Änderungen in cdd/ werden neu gebaut …')
  fs.watch(CDD, { recursive: true }, () => {
    try {
      run()
    } catch (e) {
      console.error(e.message)
    }
  })
}
