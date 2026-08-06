import fs from 'node:fs';
import path from 'node:path';

const collections = { orte: 'orte', sehenswuerdigkeiten: 'sehenswuerdigkeiten', genuss: 'genuss', restaurants: 'restaurants', unterkuenfte: 'hotels' };
const root = path.resolve('src/content');
const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function readTargets() {
  const targets = new Map();
  for (const [collection, route] of Object.entries(collections)) {
    for (const file of fs.readdirSync(path.join(root, collection)).filter((name) => name.endsWith('.md'))) {
      const content = fs.readFileSync(path.join(root, collection, file), 'utf8');
      const title = content.match(/^title:\s*["']?(.+?)["']?\s*$/m)?.[1];
      const slug = content.match(/^slug:\s*([\w-]+)\s*$/m)?.[1];
      const aliases = content.match(/^aliases:\s*\[([^\]]*)\]/m)?.[1]?.split(',').map((alias) => alias.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean) ?? [];
      if (!title || !slug) continue;
      for (const label of [title, ...aliases]) {
        const key = label.toLocaleLowerCase('de-CH');
        const existing = targets.get(key);
        if (existing && existing.slug !== slug) throw new Error(`Alias-Konflikt: ${label}`);
        targets.set(key, { label, slug, route });
      }
    }
  }
  return [...targets.values()].sort((a, b) => b.label.length - a.label.length);
}

const targets = readTargets();
const matcher = new RegExp(`(^|[^\\p{L}\\p{N}])(${targets.map((target) => escape(target.label)).join('|')})(?=$|[^\\p{L}\\p{N}])`, 'giu');
const blocked = new Set(['a', 'code', 'pre', 'script', 'style', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

function walk(node, parentTag, linked, currentPath) {
  if (!node || typeof node !== 'object') return;
  const tag = node.tagName || parentTag;
  if (node.type === 'text' && !blocked.has(parentTag)) {
    const source = node.value; const parts = []; let last = 0; matcher.lastIndex = 0;
    for (let match; (match = matcher.exec(source));) {
      const prefix = match[1]; const label = match[2];
      const target = targets.find((candidate) => candidate.label.toLocaleLowerCase('de-CH') === label.toLocaleLowerCase('de-CH'));
      const start = match.index + prefix.length;
      if (!target || currentPath.includes(`/${target.slug}.md`) || linked.has(target.slug)) continue;
      if (start > last) parts.push({ type: 'text', value: source.slice(last, start) });
      parts.push({ type: 'element', tagName: 'a', properties: { href: `/reisen/georgien/${target.route}/${target.slug}/` }, children: [{ type: 'text', value: label }] });
      linked.add(target.slug); last = start + label.length;
    }
    if (parts.length) { if (last < source.length) parts.push({ type: 'text', value: source.slice(last) }); return parts; }
    return undefined;
  }
  if (!Array.isArray(node.children) || blocked.has(tag)) return;
  const localLinked = ['p', 'li'].includes(tag) ? new Set() : linked;
  const next = [];
  for (const child of node.children) { const replacement = walk(child, tag, localLinked, currentPath); if (Array.isArray(replacement)) next.push(...replacement); else next.push(child); }
  node.children = next;
}

export default function autoLink() { return (tree, file) => walk(tree, '', new Set(), file.path ?? ''); }
