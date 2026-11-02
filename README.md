# nan.do apps

A small, dependency-free static site. Cleanmarks has its own art direction, with shared Nunito Sans typography, navigation and footer for future apps.

## Build and check

Use Node 24 or later. No packages need installing.

```sh
npm run build
npm run check
```

Serve `docs/` to preview. For example, if Python is available: `python3 -m http.server 8080 --directory docs`. Open `/cleanmarks/` for the product page. Relative asset and navigation paths also support GitHub's repository-subpath URL before the custom domain is connected.

The build replaces only `docs/`, copying `assets/` and `cleanmarks/`. This generated folder is committed for GitHub Pages; edit source files, then rebuild. Included assets:

- `assets/nando-avatar.png`
- `cleanmarks/assets/icon128.png`
- `cleanmarks/assets/bookmark.svg`
- `cleanmarks/assets/screenshot.png` (actual 380 × 640 interface, captured at 2× with fictional `.example` bookmark data)

The icon and screenshot use Cleanmarks source at `ff76b946ce424349124fec324eac00f5967d7888`. The screenshot was rendered with the app's `renderApp` function and sidebar styles, showing two likely-dead links, one result needing review and one redirect. The avatar is reused from `https://ocp.nan.do/nando-avatar.png`.

The build tolerates missing assets while copy is in progress; checks intentionally fail for missing local references. Checks also verify fragments, canonical URLs, required copy, disabled/enabled downloads, rejected unsafe configuration, reduced-motion CSS and Pages files. They are static assertions, not a substitute for visual/browser accessibility testing. Test at 320px and desktop, with keyboard navigation, JavaScript disabled, reduced motion, and the demo’s cleanup/replay states.

## Download links

Edit `site.config.json`. Each browser value is `null` until its release is available. Null renders a native disabled button with a visible Coming soon / Planned label. An HTTPS URL renders a normal download anchor at build time, without JavaScript:

```json
"firefox": "https://addons.mozilla.org/firefox/addon/your-published-listing/"
```

Use the actual published listing, not that example. Rebuild after changes. Configuring a URL enables its download; update the short launch-order note in `templates/cleanmarks.mjs` once all browsers ship. `origin` must be a full HTTPS origin without a path or trailing slash; it controls canonicals, social metadata and CNAME.

## Future apps

- Add a small body template in `templates/` and invoke `shell()` in `scripts/build.mjs`.
- Keep reusable navigation/footer and base typography in `templates/shell.mjs` and `assets/shell.css`.
- Put each app’s specific CSS, progressive enhancement and supplied images under its slug directory. Product pages do not need client-side rendering.
- Add the app to the root listing and static checks. Do not copy Cleanmarks’ illustration or palette to every app.

The cleanup vignette uses example links only. It never reads browser bookmarks or makes network calls. All product content and download states work without JavaScript; only the demo action is progressively revealed. Animation runs only on interaction, respects reduced motion, and can be replayed.

## GitHub Pages

Pages publishes the committed `docs/` folder from `main`, with no custom Actions workflow or extra workflow-token permission. Run `npm run build` and `npm run check`, commit source and generated files together, then push `main` to deploy.

In repository Settings → Pages, choose **Deploy from a branch**, `main`, `/docs`. The custom domain is `apps.nan.do`, with Cleanmarks at `https://apps.nan.do/cleanmarks/`. GitHub's default URL redirects to the custom domain.

Domain configuration:

1. Add a DNS-only Cloudflare CNAME: `apps` → `nandorocker.github.io`. Do not change the apex or other app records.
2. Set `customDomainEnabled` to `true` in `site.config.json`, rebuild/check, commit and push. This adds `docs/CNAME` containing `apps.nan.do`.
3. Confirm the custom domain in GitHub Pages settings and enable **Enforce HTTPS** after its certificate is issued.

`customDomainEnabled` is true, keeping `docs/CNAME` in generated output. Canonical and social metadata target `origin`, `https://apps.nan.do`. `.nojekyll` is always included. To return to the default Pages URL, disable this flag, rebuild and publish, and clear the custom domain in Pages settings before removing its exact DNS record. Never put credentials or infrastructure notes in this public repository.
