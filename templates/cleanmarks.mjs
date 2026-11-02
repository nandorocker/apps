import { downloads } from './shell.mjs';

export function cleanmarks(config) {
  return `<main id="main" tabindex="-1" class="product-main">
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-copy"><h1 id="hero-title">A fresh start for your bookmarks.</h1>
  <p class="hero-description">Keep the good finds. Clear out the dead ends. Cleanmarks helps you give your browser’s bookmarks a little breathing room.</p>
   <div id="download" class="download-area"><p class="beta-note"><span aria-hidden="true">✦</span> Free beta. No account needed.</p><div class="browser-downloads">${downloads(config.apps.cleanmarks.browsers)}</div><p class="download-note">Firefox and Chrome first. Safari is on the list.<br>Store links will appear here as each version is ready.</p></div></div>
  <div class="demo" aria-labelledby="demo-title">
    <div class="demo-topline"><span class="demo-dots" aria-hidden="true"><i></i><i></i><i></i></span><span id="demo-title">A little spring cleaning</span><span class="demo-spark" aria-hidden="true">✦</span></div>
    <div class="bookmark-scene" aria-hidden="true">
      <div class="folder-back"><span>My good finds</span><span class="folder-face">◡</span></div>
      <div class="bookmark bookmark-good first"><span class="site-badge mint">✳</span><span>A very good recipe<small>Worth keeping</small></span><span class="keep-check">✓</span></div>
      <div class="bookmark bookmark-dead second"><span class="site-badge coral">?</span><span>That page from 2012<small>Likely dead · selected for cleanup</small></span><span>×</span></div>
      <div class="bookmark bookmark-good third"><span class="site-badge lavender">✿</span><span>Weekend inspiration<small>A keeper</small></span><span class="keep-check">✓</span></div>
      <div class="bookmark bookmark-dead fourth"><span class="site-badge cream">!</span><span>Where did this go?<small>Likely dead · selected for cleanup</small></span><span>×</span></div>
      <div class="celebration"><span>✓</span> Room for new favorites.</div>
    </div>
    <div class="demo-controls"><button type="button" id="tidy-button" hidden>Try a little tidy-up <span aria-hidden="true">✦</span></button><p id="demo-status" role="status" aria-live="polite" aria-atomic="true">Two keepers. Two dead ends. A fresh start waiting.</p></div>
    <p class="demo-caption">An illustrative demo, not your bookmarks. Selected dead ends move to Deleted Bookmarks.</p>
  </div>
</section>
<section id="how-it-works" class="feature-section" aria-labelledby="feature-title">
   <div class="feature-copy"><span class="little-bookmark" aria-hidden="true"><img src="./assets/bookmark.svg" alt="" width="32" height="40"></span><h2 id="feature-title">Less clutter.<br>More “glad I saved that.”</h2><p>You collected those links for a reason. Find out what still works, then decide what stays.</p>
  <div class="benefit"><h3>Start with one folder.</h3><p>Choose the bookmark folders you want to check. No need to tackle everything at once.</p></div>
   <div class="benefit"><h3>See what needs a second look.</h3><p>Spot broken links, pages that have moved, and sites that need another look. Automated checks can be wrong, so you make the call.</p></div>
  <div class="benefit"><h3>You choose. Then tidy.</h3><p>Review and select results before cleanup. By default, they move to a Deleted Bookmarks folder. Permanent deletion is optional.</p></div></div>
   <figure class="app-figure"><div class="screenshot-wrap"><img src="./assets/screenshot.png" alt="Cleanmarks browser extension showing a bookmark check and grouped results" width="380" height="640" loading="lazy"></div><figcaption>Actual Cleanmarks interface with example bookmarks.</figcaption></figure>
</section>
<section class="faq" aria-labelledby="faq-title"><h2 id="faq-title">A few things worth keeping in mind.</h2><div class="faq-questions">
<details><summary>Will it delete anything automatically?</summary><p>No. You review and select results before cleanup. The default moves selected bookmarks to a Deleted Bookmarks folder; permanent deletion is an option you choose.</p></details>
<details><summary>Where do my bookmarks go during a check?</summary><p>There’s no Cleanmarks account or backend. Checks contact the bookmarked sites directly to see how they respond. Those sites receive network requests, just as they do when a link is visited.</p></details>
<details><summary>Does “Likely dead” mean gone for good?</summary><p>Not always. A site might block automated requests, be temporarily unavailable, or need a login. Check anything important yourself before removing it.</p></details>
<details><summary>What do the result labels mean?</summary><p>Likely dead means a page reported it was missing. Needs review means the check wasn’t conclusive. Redirected means the link led somewhere else. You decide which bookmarks to keep.</p></details>
</div></section>
<aside class="author-box" aria-label="Meet the developer"><img src="../assets/nando-avatar.png" width="104" height="104" alt="Nando Rossi" loading="lazy"><div><h2>A little app, made by a real person.</h2><p>I’m <a href="https://nan.do">Nando Rossi</a>, the developer behind Cleanmarks. If you get stuck or have an idea, <a href="https://github.com/nandorocker/cleanmarks/issues">open an issue</a>. I’d love to hear how it fits your browsing.</p></div></aside>
</main>`;
}
