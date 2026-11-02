import { mkdir, readFile, writeFile, cp, rm, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { shell, validateConfig } from '../templates/shell.mjs';
import { cleanmarks } from '../templates/cleanmarks.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const config = JSON.parse(await readFile(path.join(root, 'site.config.json'), 'utf8'));
validateConfig(config);
const dist = path.join(root, 'docs');
await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, 'cleanmarks'), { recursive: true });
for (const directory of ['assets', 'cleanmarks']) {
  try {
    await access(path.join(root, directory));
    await cp(path.join(root, directory), path.join(dist, directory), { recursive: true });
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    console.warn(`Assets not supplied yet: ${directory}`);
  }
}
const body = `<main id="main" tabindex="-1" class="apps-main"><h1>Little apps.<br>A little less friction.</h1><p class="apps-intro">Useful things for everyday life, made by <a href="https://nan.do">Nando Rossi</a>.</p><a class="app-listing" href="./cleanmarks/"><img src="./cleanmarks/assets/icon128.png" width="88" height="88" alt=""><div><h2>Cleanmarks</h2><p>A fresh start for your browser’s bookmarks.</p></div><span aria-hidden="true">↗</span></a></main>`;
await writeFile(path.join(dist, 'index.html'), shell({ title: 'Apps by Nando Rossi', description: 'Little apps for everyday life, made by Nando Rossi. Meet Cleanmarks, a fresh start for your bookmarks.', path: '/', body, config }));
await writeFile(path.join(dist, 'cleanmarks/index.html'), shell({ title: 'Cleanmarks — A fresh start for your bookmarks', description: 'Keep the good finds. Review dead ends and tidy your browser bookmarks with Cleanmarks. Free beta, no account needed.', path: '/cleanmarks/', body: cleanmarks(config), config, product: true }));
if (config.customDomainEnabled) await writeFile(path.join(dist, 'CNAME'), new URL(config.origin).hostname + '\n');
await writeFile(path.join(dist, '.nojekyll'), '');
console.log('Built root and Cleanmarks pages in docs/');
