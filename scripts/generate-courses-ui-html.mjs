import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function extractCssSection(css, startMarker, endMarker) {
  const start = css.indexOf(startMarker);
  const end = css.indexOf(endMarker, start);
  if (start === -1 || end === -1) {
    throw new Error(`Could not extract CSS between ${startMarker} and ${endMarker}`);
  }
  return css.slice(start, end).trim();
}

const coursesCss = fs.readFileSync(
  path.join(root, 'src/app/courses/courses.module.css'),
  'utf8',
);

const globalsCss = fs.readFileSync(path.join(root, 'src/app/globals.css'), 'utf8');
const headerCss = extractCssSection(globalsCss, '/* Header */', '/* Hero */');
const footerCss = extractCssSection(globalsCss, '/* Footer */', '/* Placeholder pages */');

const globalCss = `
:root {
  --bg: #FFFFFF;
  --bg-warm: #FAF9F7;
  --bg-section: #F5F3F0;
  --bg-accent-light: #FEF3EE;
  --text-primary: #1C1917;
  --text-secondary: #57534E;
  --text-muted: #A8A29E;
  --border: #E7E5E4;
  --border-warm: #D6CFC9;
  --accent: #D97757;
  --accent-hover: #C4673F;
  --accent-light: #FEF3EE;
  --dark: #1C1917;
  --page-gutter: 1rem;
}
@media (min-width: 768px) {
  :root { --page-gutter: 1.5rem; }
}
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text-primary);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow-x: clip;
  max-width: 100%;
  --header-offset: 0px;
}
body.mobile-nav-open { overflow: hidden; }
main.page { flex: 1; }
.container-max {
  max-width: 1080px;
  margin: 0 auto;
  width: 100%;
  padding-left: var(--page-gutter);
  padding-right: var(--page-gutter);
}
`;

const js = `(function () {
  var header = document.getElementById('site-header');
  var menuBtn = document.getElementById('header-menu-btn');
  var mobileNav = document.getElementById('header-mobile-nav');
  if (!header || !menuBtn || !mobileNav) return;

  function setMenuOpen(open) {
    header.classList.toggle('site-header--menu-open', open);
    mobileNav.classList.toggle('header-mobile-nav--open', open);
    document.body.classList.toggle('mobile-nav-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');
    menuBtn.innerHTML = open
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>';
  }

  menuBtn.addEventListener('click', function () {
    setMenuOpen(!header.classList.contains('site-header--menu-open'));
  });

  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setMenuOpen(false); });
  });
})();`;

const fragmentPath = path.join(__dirname, 'courses-ui-body.fragment.html');
const bodyFragment = fs.readFileSync(fragmentPath, 'utf8');

function buildHtml(logoPath) {
  const body = bodyFragment.replace('./logo.png', logoPath);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Free &amp; Recorded AI Courses — Approachable</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
${globalCss}
${headerCss}
${footerCss}
${coursesCss}
  </style>
</head>
<body>
${body}
  <script>${js}</script>
</body>
</html>
`;
}

const outputs = [
  { path: path.join(root, 'public/courses-ui.html'), logoPath: './logo.png' },
  { path: path.join(root, 'scripts/courses-ui.html'), logoPath: '../public/logo.png' },
];

for (const { path: outPath, logoPath } of outputs) {
  const html = buildHtml(logoPath);
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('Wrote', outPath, '(' + html.length + ' bytes)');
}
