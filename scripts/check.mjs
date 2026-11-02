import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { downloads, validateConfig } from '../templates/shell.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'docs');
const config = JSON.parse(await readFile(path.join(root, 'site.config.json'), 'utf8'));
validateConfig(config);
const htmlFiles = ['index.html', 'cleanmarks/index.html'];
let references = 0;
const missing = new Set();
for (const file of htmlFiles) {
  const html = await readFile(path.join(dist, file), 'utf8');
  assert.match(html, /<html lang="en">/);
  assert.match(html, /name="viewport"/);
  assert.match(html, /class="skip-link" href="#main"/);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${file}: exactly one h1`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${file}: unique IDs`);
  for (const [, attr, value] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
    assert.notEqual(value, '#', `${file}: no dummy links`);
    if (value.startsWith('https://')) { new URL(value); continue; }
    assert.ok(value.startsWith('./') || value.startsWith('../') || value.startsWith('#'), `${file}: unexpected ${attr} ${value}`);
    const resolved = new URL(value, `https://local.test/${file}`);
    const pathname = resolved.pathname;
    const hash = resolved.hash.slice(1);
    const target = pathname.endsWith('/') ? `${pathname}index.html` : pathname;
    const targetPath = path.join(dist, target);
    let exists = true;
    await access(targetPath).catch(() => { exists = false; missing.add(value); });
    if (hash && exists) {
      const targetHtml = await readFile(targetPath, 'utf8');
      assert.ok(targetHtml.includes(`id="${hash}"`), `${file}: missing fragment ${value}`);
    }
    references++;
  }
  assert.ok(html.includes(`href="${config.origin}/${file === 'index.html' ? '' : 'cleanmarks/'}"`), 'canonical URL');
}
const product = await readFile(path.join(dist, 'cleanmarks/index.html'), 'utf8');
for (const phrase of ['A fresh start for your bookmarks.', 'Actual Cleanmarks interface with example bookmarks.', 'Likely dead', 'Needs review', 'Redirected', 'Deleted Bookmarks', 'Permanent deletion', 'contact the bookmarked sites directly', 'illustrative demo, not your bookmarks', 'aria-live="polite"']) assert.ok(product.includes(phrase), `Missing required content: ${phrase}`);
const configuredCount = Object.values(config.apps.cleanmarks.browsers).filter(Boolean).length;
assert.equal((product.match(/type="button" disabled/g) || []).length, 3 - configuredCount);
for (const url of Object.values(config.apps.cleanmarks.browsers).filter(Boolean)) assert.ok(product.includes(`href="${url.replaceAll('&', '&amp;')}"`));
const enabled = downloads({ firefox: 'https://example.com/firefox?x=1&y=2', chrome: null, safari: null });
assert.match(enabled, /<a class="browser-button" href="https:\/\/example.com\/firefox\?x=1&amp;y=2"/);
assert.equal((enabled.match(/disabled/g) || []).length, 2);
for (const invalid of ['http://example.com', 'javascript:alert(1)', '', 'https://user:pass@example.com']) assert.throws(() => validateConfig({ ...config, apps: { cleanmarks: { browsers: { firefox: invalid, chrome: null, safari: null } } } }));
const css = await readFile(path.join(dist, 'cleanmarks/cleanmarks.css'), 'utf8');
assert.match(css, /prefers-reduced-motion:\s*reduce/);
const js = await readFile(path.join(dist, 'cleanmarks/demo.js'), 'utf8');
assert.doesNotMatch(js, /fetch\(|XMLHttpRequest|setInterval/);
if (config.customDomainEnabled) assert.equal((await readFile(path.join(dist, 'CNAME'), 'utf8')).trim(), new URL(config.origin).hostname);
else await assert.rejects(access(path.join(dist, 'CNAME')));
await access(path.join(dist, '.nojekyll'));
assert.equal(missing.size, 0, `Missing local targets: ${[...missing].join(', ')}. Supply assets, rebuild, then rerun check.`);
console.log(`Checks passed: two pages, ${references} local references, product copy, metadata, download states, config validation, demo constraints and Pages files.`);
