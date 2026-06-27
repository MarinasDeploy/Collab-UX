/**
 * Holt RSS-Feeds zu UX & KI und schreibt Accordion-Einträge in
 * cdd/nav/04-ki-recherche-auto.md (zwischen AUTO-RESEARCH-Markern).
 * Bevorzugt deutsche Quellen (lang: "de" in research-feeds.json).
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
const MAX_DE_ITEMS = 10
const MAX_AGE_DAYS = 28

const KEYWORD_RE =
  /(?<![a-zA-ZäöüÄÖÜß])ki(?![a-zA-ZäöüÄÖÜß])|künstliche intelligenz|kuenstliche intelligenz|artificial intelligence|\bux\b|user experience|chatbot|usability|barrierefrei|openai|chatgpt|gemini|anthropic|claude|\bllm\b|generative|design thinking|prototyp/i

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
    ).slice(0, 320)
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
    ).slice(0, 320)
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

function textForKeywords(item) {
  return stripHtml(`${item.title} ${item.desc}`)
    .replace(/https?:\/\/\S+/gi, ' ')
    .replace(/\s+/g, ' ')
}

function matchesKeywords(item) {
  return KEYWORD_RE.test(textForKeywords(item))
}

function decodeXml(buffer, contentType) {
  let charset = 'utf-8'
  const ct = contentType || ''
  const ctMatch = ct.match(/charset=([^;\s]+)/i)
  if (ctMatch) charset = ctMatch[1].replace(/"/g, '')

  const head = Buffer.from(buffer).slice(0, 300).toString('latin1')
  const xmlMatch = head.match(/encoding=["']([^"']+)["']/i)
  if (xmlMatch) charset = xmlMatch[1]

  try {
    return new TextDecoder(charset.toLowerCase()).decode(buffer)
  } catch {
    return new TextDecoder('utf-8').decode(buffer)
  }
}

async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: { 'User-Agent': 'Collab-UX-Research/1.0' },
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const xml = decodeXml(
      await res.arrayBuffer(),
      res.headers.get('content-type')
    )
    let items = parseFeed(xml).map((item) => ({
      ...item,
      source: feed.name,
      lang: feed.lang || 'en',
    }))
    if (feed.keywordFilter) {
      items = items.filter(matchesKeywords)
    }
    return items
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
      const langTag = item.lang === 'de' ? 'DE' : 'EN'
      const summary = `${date} — ${item.title} (${item.source} · ${langTag})`
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

function pickItems(all, cutoff) {
  const fresh = all.filter(
    (item) => item.pubDate.getTime() >= cutoff || item.pubDate.getTime() === 0
  )

  const de = fresh.filter((i) => i.lang === 'de').sort((a, b) => b.pubDate - a.pubDate)
  const en = fresh.filter((i) => i.lang !== 'de').sort((a, b) => b.pubDate - a.pubDate)

  const picked = []
  const seen = new Set()

  function add(list, limit) {
    for (const item of list) {
      if (picked.length >= MAX_ITEMS) break
      if (picked.filter((p) => p.lang === 'de').length >= MAX_DE_ITEMS && item.lang === 'de')
        continue
      if (seen.has(item.link)) continue
      seen.add(item.link)
      picked.push(item)
      if (limit && picked.filter((p) => p.lang === item.lang).length >= limit) continue
    }
  }

  add(de, MAX_DE_ITEMS)
  add(en, MAX_ITEMS - picked.length)

  return picked.sort((a, b) => b.pubDate - a.pubDate).slice(0, MAX_ITEMS)
}

async function run() {
  const feeds = JSON.parse(fs.readFileSync(FEEDS, 'utf8'))
  const cutoff = Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000

  const all = []
  for (const feed of feeds) {
    const items = await fetchFeed(feed)
    all.push(...items)
  }

  const filtered = pickItems(all, cutoff)
  const deCount = filtered.filter((i) => i.lang === 'de').length

  const block = buildAccordionBlock(filtered)
  let md = fs.readFileSync(OUT_MD, 'utf8')
  md = md.replace(
    /Automatisch gesammelte Links[\s\S]*?ihr müsst nichts tun\./,
    'Automatisch gesammelte Links — **Schwerpunkt Deutsch** (heise, t3n, Golem, Netzpolitik, Basic Thinking). Wird wöchentlich per GitHub aktualisiert — ihr müsst nichts tun.'
  )
  md = spliceAutoBlock(md, block)
  fs.writeFileSync(OUT_MD, md, 'utf8')

  console.log(`✓ ${filtered.length} Einträge (${deCount} DE) → ${OUT_MD}`)
}

run().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
