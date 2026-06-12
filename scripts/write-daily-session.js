/**
 * Schreibt cdd/sessions/YYYY-MM-DD.md mit allen Änderungen des Tages (Europe/Berlin).
 * Nutzung: npm run session
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const ROOT = path.join(__dirname, '..')
const SESSIONS_DIR = path.join(ROOT, 'cdd', 'sessions')
const TZ = 'Europe/Berlin'

function berlinDateString(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(date)
}

function berlinDateTimeString(date = new Date()) {
  return new Intl.DateTimeFormat('de-DE', {
    timeZone: TZ,
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date)
}

function addDays(dateStr, days) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const utc = new Date(Date.UTC(y, m - 1, d + days))
  return utc.toISOString().slice(0, 10)
}

function git(cmd) {
  return execSync(cmd, {
    cwd: ROOT,
    encoding: 'utf8',
    env: { ...process.env, TZ },
  }).trim()
}

function getCommits(date) {
  const until = addDays(date, 1)
  const raw = git(
    `git log --since="${date} 00:00:00" --until="${until} 00:00:00" --pretty=format:"%h|%s|%an|%ci" --reverse`
  )
  if (!raw) return []
  return raw.split('\n').map((line) => {
    const [hash, subject, author, committedAt] = line.split('|')
    return { hash, subject, author, committedAt }
  })
}

function getChangedFiles(date) {
  const until = addDays(date, 1)
  const raw = git(
    `git log --since="${date} 00:00:00" --until="${until} 00:00:00" --name-only --pretty=format:`
  )
  if (!raw) return []
  return [...new Set(raw.split('\n').map((f) => f.trim()).filter(Boolean))].sort()
}

function groupFiles(files) {
  const nav = files.filter((f) => f.startsWith('cdd/nav/'))
  const sessions = files.filter((f) => f.startsWith('cdd/sessions/'))
  const other = files.filter(
    (f) => !f.startsWith('cdd/nav/') && !f.startsWith('cdd/sessions/')
  )
  return { nav, sessions, other }
}

function buildMarkdown(date, commits, files) {
  const generated = berlinDateTimeString()
  const { nav, sessions, other } = groupFiles(files)

  const lines = [
    `# Session ${date}`,
    '',
    `*Automatisch generiert am ${generated} (Europe/Berlin).*`,
    '',
    '---',
    '',
  ]

  if (!commits.length) {
    lines.push('## Änderungen', '', 'Keine Commits an diesem Tag.', '')
    return lines.join('\n')
  }

  lines.push('## Commits', '')
  for (const c of commits) {
    lines.push(`- \`${c.hash}\` — ${c.subject} (*${c.author}*)`)
  }
  lines.push('')

  lines.push('## Geänderte Dateien', '')
  if (nav.length) {
    lines.push('### Navigations-Inhalte (`cdd/nav/`)', '')
    nav.forEach((f) => lines.push(`- \`${f}\``))
    lines.push('')
  }
  if (sessions.length) {
    lines.push('### Sessions', '')
    sessions.forEach((f) => lines.push(`- \`${f}\``))
    lines.push('')
  }
  if (other.length) {
    lines.push('### Sonstiges', '')
    other.forEach((f) => lines.push(`- \`${f}\``))
    lines.push('')
  }

  lines.push('---', '', `*Stand: ${date} — auto-session*`, '')
  return lines.join('\n')
}

function run() {
  const date = process.env.SESSION_DATE || berlinDateString()
  const commits = getCommits(date)
  const files = getChangedFiles(date)
  const md = buildMarkdown(date, commits, files)

  fs.mkdirSync(SESSIONS_DIR, { recursive: true })
  const out = path.join(SESSIONS_DIR, `${date}.md`)
  fs.writeFileSync(out, md, 'utf8')
  console.log(`✓ Session ${date} → ${out} (${commits.length} Commit(s))`)
}

run()
