/**
 * Holt RSS-Feeds zu UX & KI und schreibt Accordion-Einträge in
 * cdd/nav/04-ki-recherche-auto.md (zwischen AUTO-RESEARCH-Markern).
 *
 * Nutzung: npm run research
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const FEEDS = path.join(ROOT, 'cdd', 'research-feeds.json')
const OUT_MD = path.join(ROOT, 'cdd', 'nav', '04-ki-recherche-auto.md')
const START = '<!-- AUTO-RESEARCH:START -->'
const END = '<!-- AUTO-RESEARCH:END -->'
const MAX_ITEMS = 12
const MAX_AGE_DAYS = 21

function stripHtml(text) {
  return (text || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function parseRssItems(xml) {
  const items = []
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || []
  for (const block of blocks) {
    const title = stripHtml(
      (block.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]
    )
    const link = stripHtml(
      (block.match(/<link[^>]*>([\s\S]*?)<\/link>/i) || [])[1]
    )
    const pubRaw =
      (block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i) || [])[1] ||
      (block.match(/<updated[^>]*>([\s\S]*?)<\/updated>/i) || [])[1]
    const desc = stripHtml(
      (block.match(/<description[^>]*>([\s\S]*?)<\/description>/i) || [])[1]
    ).slice(0, 280)
    if (!title || !link) continue
    const pubDate = pubRaw ? new Date(pubRaw.trim()) : new Date(0)
    items.push({ title, link, pubDate, desc })
  }
  return items
}

function parseAtomEntries(xml) {
  const items = []
  const blocks = xml.match(/<entry[\s\S]*?<\/entry>/gi) || []
  for (const block of blocks) {
    const title = stripHtml(
      (block.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]
    )
    const linkMatch =
      block.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i) ||
      block.match(/<link[^>]*>([\s\S]*?)<\/link>/i)
    const link = linkMatch ? stripHtml(linkMatch[1]) : ''
    const pubRaw =
      (block.match(/<published[^>]*>([\s\S]*?)<\/published>/i) || [])[1] ||
      (block.match(/<updated[^>]*>([\s\S]*?)<\/updated>/i) || [])[1]
    const desc = stripHtml(
      (block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/i) || [])[1] ||
        (block.match(/<content[^>]*>([\s\S]*?)<\/content>/i) || [])[1]
    ).slice(0, 280)
    if (!title || !link) continue
    const pubDate = pubRaw ? new Date(pubRaw.trim()) : new Date(0)
    items.push({ title, link, pubDate, desc })
  }
  return items
}

function parseFeed(xml) {
  if (/<entry[\s>]/i.test(xml)) return parseAtomEntries(xml)
  return parseRssItems(xml)
}

async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: { 'User-Agent': 'Collab-UX-Research/1.0' },
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const xml = await res.text()
    return parseFeed(xml).map((item) => ({ ...item, source: feed.name }))
  } catch (err) {
    console.warn(`Feed übersprungen (${feed.name}): ${err.message}`)
    return []
  }
}

function formatDate(d) {
  if (!d || Number.isNaN(d.getTime())) return '—'
  return d.toISOString().slice(0, 10)
}

function buildAccordionBlock(items) {
  if (!items.length) {
    return `<details class="accordion">
<summary>Keine neuen Einträge in den letzten ${MAX_AGE_DAYS} Tagen</summary>
<p>Beim nächsten Lauf wird erneut gesucht.</p>
</details>`
  }

  return items
    .map((item) => {
      const date = formatDate(item.pubDate)
      const summary = `${date} — ${item.title} (${item.source})`
      const body = item.desc
        ? `${item.desc}\n\nLink: ${item.link}`
        : `Link: ${item.link}`
      return `<details class="accordion">
<summary>${escapeForMd(summary)}</summary>
<p>${escapeForMd(body)}</p>
</details>`
    })
    .join('\n\n')
}

function escapeForMd(text) {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function spliceAutoBlock(md, block) {
  const startIdx = md.indexOf(START)
  const endIdx = md.indexOf(END)
  if (startIdx === -1 || endIdx === -1) {
    throw new Error('AUTO-RESEARCH-Marker in 04-ki-recherche-auto.md fehlen')
  }
  const before = md.slice(0, startIdx + START.length)
  const after = md.slice(endIdx)
  return `${before}\n${block}\n${after}`
}

async function run() {
  const feeds = JSON.parse(fs.readFileSync(FEEDS, 'utf8'))
  const cutoff = Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000

  const all = []
  for (const feed of feeds) {
    const items = await fetchFeed(feed)
    all.push(...items)
  }

  const seen = new Set()
  const filtered = all
    .filter((item) => item.pubDate.getTime() >= cutoff || item.pubDate.getTime() === 0)
    .sort((a, b) => b.pubDate - a.pubDate)
    .filter((item) => {
      if (seen.has(item.link)) return false
      seen.add(item.link)
      return true
    })
    .slice(0, MAX_ITEMS)

  const block = buildAccordionBlock(filtered)
  let md = fs.readFileSync(OUT_MD, 'utf8')
  md = spliceAutoBlock(md, block)
  fs.writeFileSync(OUT_MD, md, 'utf8')

  console.log(`✓ ${filtered.length} Einträge → ${OUT_MD}`)
}

run().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
