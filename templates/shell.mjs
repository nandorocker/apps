export const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

export function validateConfig(config) {
  if (typeof config.customDomainEnabled !== 'boolean') throw new Error('customDomainEnabled must be true or false');
  const origin = new URL(config.origin);
  if (origin.protocol !== 'https:' || origin.origin !== config.origin) throw new Error('origin must be an HTTPS origin without a trailing slash or path');
  const browsers = config.apps?.cleanmarks?.browsers;
  for (const name of ['firefox', 'chrome', 'safari']) {
    const value = browsers?.[name];
    if (value === null) continue;
    if (typeof value !== 'string' || !value.trim()) throw new Error(`${name}: use null or an HTTPS store URL`);
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error(`${name}: store URL must be HTTPS without credentials`);
  }
}

export function downloads(browsers) {
  return Object.entries({ firefox: 'Firefox', chrome: 'Chrome', safari: 'Safari' }).map(([key, name]) => browsers[key]
    ? `<a class="browser-button" href="${escape(browsers[key])}"><span class="browser-symbol" aria-hidden="true">${name[0]}</span><span>${name}<small>Get the free beta</small></span></a>`
    : `<button class="browser-button" type="button" disabled><span class="browser-symbol" aria-hidden="true">${name[0]}</span><span>${name}<small>${key === 'safari' ? 'Planned' : 'Coming soon'}</small></span></button>`).join('');
}

export function shell({ title, description, path, body, config, product = false }) {
  const canonical = `${config.origin}${path}`;
  const root = product ? '../' : './';
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(title)}</title><meta name="description" content="${escape(description)}">
<meta name="author" content="Nando Rossi"><meta name="theme-color" content="#fdfdfb">
<link rel="canonical" href="${canonical}"><meta property="og:url" content="${canonical}">
<meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:type" content="website">
<meta property="og:image" content="${config.origin}/cleanmarks/assets/icon128.png"><meta property="og:image:alt" content="Cleanmarks bookmark icon"><meta name="twitter:card" content="summary">
<link rel="icon" href="${root}cleanmarks/assets/icon128.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700;750;800;850;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${root}assets/shell.css">${product ? '<link rel="stylesheet" href="./cleanmarks.css"><script src="./demo.js" defer></script>' : ''}
</head><body>
<a class="skip-link" href="#main">Skip to content</a>
<header class="site-nav"><a class="brand" href="./">${product ? '<img src="./assets/icon128.png" alt="" width="34" height="34">Cleanmarks' : 'nan.do <span class="brand-sub">apps</span>'}</a><nav aria-label="Main navigation">${product ? '<a class="nav-detail" href="#how-it-works">How it works</a><a class="nav-detail" href="https://github.com/nandorocker/cleanmarks">GitHub</a><a class="nav-pill" href="#download">Download</a>' : '<a href="https://nan.do">About Nando</a><a class="nav-pill" href="./cleanmarks/">Cleanmarks</a>'}</nav></header>
${body}
<footer class="site-footer"><nav class="footer-links" aria-label="Footer"><a href="${root}">All apps</a><a href="${root}cleanmarks/">Cleanmarks</a><a href="${root}cleanmarks/#download">Download</a><a href="https://github.com/nandorocker/cleanmarks/issues">Feedback &amp; ideas</a><a href="https://github.com/nandorocker/cleanmarks">GitHub</a></nav><div class="footer-credit">Made by <a href="https://nan.do">Nando Rossi</a> <span>© 2026</span></div><div class="footer-support"><span>Find this useful?</span><a class="coffee-link" href="https://buymeacoffee.com/nandorossi">Buy me a coffee</a></div></footer>
</body></html>`;
}
