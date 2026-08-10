import fs from 'node:fs';
import path from 'node:path';

const collections = { orte: 'orte', sehenswuerdigkeiten: 'sehenswuerdigkeiten', genuss: 'genuss', restaurants: 'restaurants', unterkuenfte: 'hotels' };
const root = path.resolve('src/content');
const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const field = (content, name) => content.match(new RegExp(`^${name}:\\s*["']?(.+?)["']?\\s*$`, 'm'))?.[1];
const markdownFiles = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  if (entry.isDirectory()) return markdownFiles(full);
  return /\.mdx?$/.test(entry.name) ? [full] : [];
});

const tripRoutes = new Map(markdownFiles(path.join(root, 'reisen')).map((file) => {
  const content = fs.readFileSync(file, 'utf8');
  return [field(content, 'slug'), field(content, 'routeSlug')];
}));

function readTargets() {
  const targets = new Map();
  for (const [collection, route] of Object.entries(collections)) {
    for (const file of markdownFiles(path.join(root, collection))) {
      const content = fs.readFileSync(file, 'utf8');
      const title = field(content, 'title');
      const slug = field(content, 'slug');
      const trip = field(content, 'trip');
      const aliases = content.match(/^aliases:\s*\[([^\]]*)\]/m)?.[1]?.split(',').map((alias) => alias.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean) ?? [];
      const routeSlug = tripRoutes.get(trip);
      if (!title || !slug || !trip || !routeSlug) continue;
      for (const label of [title, ...aliases]) {
        const key = `${trip}\u0000${label.toLocaleLowerCase('de-CH')}`;
        const existing = targets.get(key);
        if (existing && existing.slug !== slug) throw new Error(`Alias-Konflikt in ${trip}: ${label}`);
        targets.set(key, { label, slug, route, trip, routeSlug });
      }
    }
  }
  return [...targets.values()].sort((a, b) => b.label.length - a.label.length);
}

const targets = readTargets();
const matcher = new RegExp(`(^|[^\\p{L}\\p{N}])(${[...new Set(targets.map((target) => escape(target.label)))].join('|')})(?=$|[^\\p{L}\\p{N}])`, 'giu');
const blocked = new Set(['a', 'code', 'pre', 'script', 'style', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
const currentTrip = (file) => fs.existsSync(file) ? field(fs.readFileSync(file, 'utf8'), 'trip') : undefined;

function walk(node, parentTag, linked, currentPath, trip) {
  if (!node || typeof node !== 'object') return;
  const tag = node.tagName || parentTag;
  if (node.type === 'text' && !blocked.has(parentTag)) {
    const source = node.value; const parts = []; let last = 0; matcher.lastIndex = 0;
    for (let match; (match = matcher.exec(source));) {
      const prefix = match[1]; const label = match[2];
      const target = targets.find((candidate) => candidate.trip === trip && candidate.label.toLocaleLowerCase('de-CH') === label.toLocaleLowerCase('de-CH'));
      const start = match.index + prefix.length;
      if (!target || currentPath.includes(`/${target.slug}.md`) || linked.has(target.slug)) continue;
      if (start > last) parts.push({ type: 'text', value: source.slice(last, start) });
      parts.push({ type: 'element', tagName: 'a', properties: { href: `/reisen/${target.routeSlug}/${target.route}/${target.slug}/` }, children: [{ type: 'text', value: label }] });
      linked.add(target.slug); last = start + label.length;
    }
    if (parts.length) { if (last < source.length) parts.push({ type: 'text', value: source.slice(last) }); return parts; }
    return undefined;
  }
  if (!Array.isArray(node.children) || blocked.has(tag)) return;
  const localLinked = ['p', 'li'].includes(tag) ? new Set() : linked;
  const next = [];
  for (const child of node.children) { const replacement = walk(child, tag, localLinked, currentPath, trip); if (Array.isArray(replacement)) next.push(...replacement); else next.push(child); }
  node.children = next;
}

export default function autoLink() { return (tree, file) => walk(tree, '', new Set(), file.path ?? '', currentTrip(file.path ?? '')); }
