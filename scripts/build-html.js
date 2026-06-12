/**
 * Collab-UX — Markdown (cdd/) → public/index.html
 * Nutzung: npm run build
 */

const fs = require('fs')
const path = require('path')
const { marked } = require('marked')

const ROOT = path.join(__dirname, '..')
const CDD = path.join(ROOT, 'cdd')
const OUT = path.join(ROOT, 'public', 'index.html')

const PAGES = [
  { id: 'start', file: 'index.md', label: 'Start', icon: '◉' },
  { id: 'neu', file: 'was-ist-neu.md', label: 'Was ist neu?', icon: '✦' },
  {
    id: 'ai-use-cases',
    file: 'nav/01-ai-in-applikationen-use-cases.md',
    label: 'AI Use Cases',
    icon: '◇',
  },
  {
    id: 'ux-prozess',
    file: 'nav/02-ux-prozess-beratung.md',
    label: 'UX Prozess',
    icon: '◎',
  },
  {
    id: 'news',
    file: 'nav/03-news-ux-ai.md',
    label: 'News UX & AI',
    icon: '◈',
  },
]

marked.setOptions({ gfm: true, breaks: false })

function readMd(relativePath) {
  const full = path.join(CDD, relativePath)
  if (!fs.existsSync(full)) {
    console.warn(`Warnung: fehlt ${relativePath}`)
    return `<p><em>Datei fehlt: ${relativePath}</em></p>`
  }
  return marked.parse(fs.readFileSync(full, 'utf8'))
}

function buildSections() {
  return PAGES.map(
    (p) => `
    <section class="page" id="page-${p.id}" data-page="${p.id}" hidden>
      <article class="prose">${readMd(p.file)}</article>
    </section>`
  ).join('\n')
}

function buildNav() {
  return PAGES.map(
    (p, i) =>
      `<button type="button" class="nav-btn${i === 0 ? ' active' : ''}" data-target="${p.id}" aria-current="${i === 0 ? 'page' : 'false'}">
        <span class="nav-icon" aria-hidden="true">${p.icon}</span>
        <span class="nav-label">${p.label}</span>
      </button>`
  ).join('\n')
}

function buildHtml() {
  const built = new Date().toISOString().slice(0, 16).replace('T', ' ')
  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Collab-UX — Context Driven Development</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap" rel="stylesheet"/>
<style>
:root{
  --bg:#f4f2ed;--surface:#fff;--text:#1c1917;--muted:#57534e;
  --accent:#2563eb;--accent-soft:#dbeafe;--border:#e7e5e4;
  --radius:12px;--shadow:0 1px 3px rgba(0,0,0,.06);
  --sidebar:260px;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',system-ui,sans-serif;background:var(--bg);color:var(--text);line-height:1.6;min-height:100vh}
.shell{display:grid;grid-template-columns:var(--sidebar) 1fr;min-height:100vh}
@media(max-width:768px){.shell{grid-template-columns:1fr}.sidebar{position:sticky;top:0;z-index:10;border-bottom:1px solid var(--border)}.nav{flex-direction:row!important;overflow-x:auto;padding:.5rem!important}.nav-btn{white-space:nowrap;flex-shrink:0}}
.sidebar{background:var(--surface);border-right:1px solid var(--border);padding:1.25rem 1rem;display:flex;flex-direction:column;gap:1rem}
.brand{padding:.25rem .5rem}
.brand h1{font-size:1.1rem;font-weight:700;letter-spacing:-.02em}
.brand p{font-size:.75rem;color:var(--muted);margin-top:.15rem}
.nav{display:flex;flex-direction:column;gap:4px}
.nav-btn{display:flex;align-items:center;gap:.5rem;width:100%;text-align:left;padding:.55rem .75rem;border:none;border-radius:8px;background:none;color:var(--muted);font:inherit;font-size:.875rem;cursor:pointer;transition:background .15s,color .15s}
.nav-btn:hover{background:var(--bg);color:var(--text)}
.nav-btn.active{background:var(--accent-soft);color:var(--accent);font-weight:600}
.nav-icon{font-size:.85rem;opacity:.8;width:1.1rem;text-align:center}
.footer-meta{margin-top:auto;padding:.5rem;font-size:.7rem;color:var(--muted);border-top:1px solid var(--border);line-height:1.45}
.main{padding:2rem 2.5rem;max-width:52rem}
.page[hidden]{display:none!important}
.prose h1{font-size:1.75rem;font-weight:700;margin-bottom:1rem;letter-spacing:-.02em}
.prose h2{font-size:1.2rem;font-weight:600;margin:1.75rem 0 .6rem;padding-bottom:.35rem;border-bottom:1px solid var(--border)}
.prose h3{font-size:1rem;font-weight:600;margin:1.25rem 0 .4rem}
.prose p,.prose ul,.prose ol{margin:.65rem 0}
.prose ul,.prose ol{padding-left:1.35rem}
.prose li{margin:.25rem 0}
.prose table{width:100%;border-collapse:collapse;font-size:.875rem;margin:1rem 0}
.prose th,.prose td{border:1px solid var(--border);padding:.45rem .65rem;text-align:left}
.prose th{background:var(--bg);font-weight:600}
.prose code{background:var(--bg);padding:.12rem .35rem;border-radius:4px;font-size:.85em}
.prose pre{background:#1c1917;color:#f5f5f4;padding:1rem;border-radius:var(--radius);overflow-x:auto;margin:1rem 0;font-size:.8rem}
.prose pre code{background:none;padding:0;color:inherit}
.prose a{color:var(--accent)}
.prose hr{border:none;border-top:1px solid var(--border);margin:1.5rem 0}
.prose blockquote{border-left:3px solid var(--accent);padding-left:1rem;color:var(--muted);margin:1rem 0}
.prose input[type=checkbox]{margin-right:.35rem;accent-color:var(--accent)}
</style>
</head>
<body>
<div class="shell">
  <aside class="sidebar">
    <div class="brand">
      <h1>Collab-UX</h1>
      <p>Context Driven Development</p>
    </div>
    <nav class="nav" aria-label="Hauptnavigation">
      ${buildNav()}
    </nav>
    <div class="footer-meta">
      Generiert: ${built}<br/>
      Quelle: <code>cdd/*.md</code> — Updates via <code>git pull</code> + <code>npm run build</code>
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
  function show(id){
    pages.forEach(function(p){p.hidden=p.dataset.page!==id;});
    buttons.forEach(function(b){
      var on=b.dataset.target===id;
      b.classList.toggle('active',on);
      b.setAttribute('aria-current',on?'page':'false');
    });
    history.replaceState(null,'','#'+id);
  }
  buttons.forEach(function(b){b.addEventListener('click',function(){show(b.dataset.target);});});
  var hash=location.hash.slice(1);
  var valid=['start','neu','ai-use-cases','ux-prozess','news'];
  show(valid.indexOf(hash)>=0?hash:'start');
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
