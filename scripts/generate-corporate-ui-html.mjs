import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

let corpCss = fs.readFileSync(
  path.join(root, 'src/app/corporate-training/corporate-training.module.css'),
  'utf8',
);

corpCss = corpCss
  .replace(
    /\.page :global\(h1\),\s*\n\.page :global\(h2\),\s*\n\.page :global\(h3\),\s*\n\.page :global\(h4\)/,
    '.page h1,\n.page h2,\n.page h3,\n.page h4',
  )
  .replace(/\.page :global\(p\)/g, '.page p')
  .replace(/\.page :global\(a\)/g, '.page a');

const globalCss = `
:root {
  --bg: #FFFFFF;
  --text-primary: #1C1917;
  --text-secondary: #57534E;
  --text-muted: #A8A29E;
  --border: #E7E5E4;
  --accent: #D97757;
  --accent-hover: #C4673F;
  --dark: #1C1917;
}
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
* { box-sizing: border-box; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text-primary);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
.container-max { max-width: 1080px; margin: 0 auto; }
.site-header {
  border-bottom: 1px solid var(--border);
  background: var(--bg);
  position: sticky;
  top: 0;
  z-index: 90;
  overflow-x: hidden;
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 14px 24px;
  max-width: 1080px;
  margin: 0 auto;
}
.logo-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: var(--text-primary);
  flex-shrink: 0;
}
.logo-wrap img {
  width: 43px;
  height: 43px;
  border-radius: 8px;
  display: block;
  flex-shrink: 0;
}
.logo-name { font-weight: 700; font-size: 16px; }
.logo-sub { font-size: 11px; color: var(--text-muted); }
.header-cta {
  background: var(--accent);
  color: white;
  padding: 9px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
  text-decoration: none;
  transition: background 0.15s;
}
.header-cta:hover { background: var(--accent-hover); }
.header-cta-corporate { background: #E2A23D; color: #1A1208; }
.header-cta-corporate:hover { background: #C8892A; color: #fff; }
@media (max-width: 640px) {
  .header-inner { gap: 10px; padding: 12px 16px; }
  .logo-wrap { min-width: 0; flex: 1; flex-shrink: 1; }
  .logo-sub { display: none; }
  .header-cta { padding: 8px 14px; font-size: 13px; }
}
.site-footer {
  background: var(--dark);
  color: #A8A29E;
  padding: 28px 24px;
}
.footer-inner {
  max-width: 1080px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.site-footer a { color: #78716C; font-size: 13px; text-decoration: none; }
.site-footer a:hover { color: white; }
.page {
  --font-fraunces: 'Fraunces', Georgia, serif;
  --font-ibm-mono: 'IBM Plex Mono', monospace;
}
`;

const js = `(function () {
  document.querySelectorAll('.faqQ').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faqItem');
      var panel = item.querySelector('.faqA');
      var inner = item.querySelector('.faqAInner');
      var isOpen = item.classList.contains('faqItemOpen');
      document.querySelectorAll('.faqItem.faqItemOpen').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('faqItemOpen');
          openItem.querySelector('.faqA').style.maxHeight = '0px';
          openItem.querySelector('.faqQ').setAttribute('aria-expanded', 'false');
        }
      });
      if (isOpen) {
        item.classList.remove('faqItemOpen');
        panel.style.maxHeight = '0px';
        btn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('faqItemOpen');
        panel.style.maxHeight = inner.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  var targets = document.querySelectorAll('.reveal:not(.revealIn)');
  targets.forEach(function (el) { el.classList.add('revealPending'); });
  function reveal(el) {
    el.classList.add('revealIn');
    el.classList.remove('revealPending');
  }
  if (!('IntersectionObserver' in window)) {
    targets.forEach(reveal);
    return;
  }
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach(function (el) { observer.observe(el); });
})();`;

const body = fs.readFileSync(path.join(__dirname, 'corporate-ui-body.html'), 'utf8');

const out = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Approachable for Teams — Private AI Training for Your Organization</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
${globalCss}
${corpCss}
  </style>
</head>
<body>
${body}
  <script>${js}</script>
</body>
</html>
`;

const outPath = path.join(root, 'public/corporate-training-ui.html');
fs.writeFileSync(outPath, out, 'utf8');
console.log('Wrote', outPath, '(' + out.length + ' bytes)');
