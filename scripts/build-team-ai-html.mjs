import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outPath = path.join(root, 'public/team-ai-training-ui.html');
const currentHtml = fs.readFileSync(outPath, 'utf8');

const bodyMatch = currentHtml.match(/<body>[\s\S]*<\/html>/);
if (!bodyMatch) throw new Error('Could not extract body from HTML');

const bodyHtml = bodyMatch[0];

let pageCss = fs.readFileSync(
  path.join(root, 'src/app/team-ai-training/team-ai-training.module.css'),
  'utf8'
);
const modalCss = fs.readFileSync(
  path.join(root, 'src/components/corporate-training/enquiry-modal.module.css'),
  'utf8'
);
let formCss = fs.readFileSync(
  path.join(root, 'src/components/corporate-training/inquiry-form.module.css'),
  'utf8'
);

pageCss = pageCss
  .replace(/\.container\b/g, '.wrap')
  .replace(/\.logo\b/g, '.companyLogo')
  .replace(/\.quote\b/g, '.testimonialQuote');

formCss = formCss
  .replace(/^\.btn /gm, '.formRoot .btn ')
  .replace(/^\.btnAccent/gm, '.formRoot .btnAccent')
  .replace(/^\.btnGhost/gm, '.formRoot .btnGhost')
  .replace(/^\.btn:focus/gm, '.formRoot .btn:focus')
  .replace(/^\.btnAccent:/gm, '.formRoot .btnAccent:')
  .replace(/^\.btnGhost:/gm, '.formRoot .btnGhost:');

const footerCss = `
.site-footer {
  background: #1C1917;
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
`;

const extraCss = `
.hidden { display: none !important; }
.howBonusGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 16px; }
@media (max-width: 900px) { #team-ai-training-ui .howBonusGrid { grid-template-columns: 1fr; } }
#team-ai-training-ui .statNumber .accentStar { color: var(--accent); }
#team-ai-training-ui button.btn,
#team-ai-training-ui a.btn { font-family: inherit; line-height: 1.2; }
`;

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

function parseAndTransform(css, mapSelector) {
  css = stripComments(css);
  let result = '';
  let i = 0;

  while (i < css.length) {
    while (css[i] && /\s/.test(css[i])) i += 1;
    if (i >= css.length) break;

    if (css[i] === '@') {
      const braceIdx = css.indexOf('{', i);
      const prelude = css.slice(i, braceIdx + 1);
      let depth = 0;
      let j = braceIdx;
      for (; j < css.length; j += 1) {
        if (css[j] === '{') depth += 1;
        else if (css[j] === '}') {
          depth -= 1;
          if (depth === 0) {
            j += 1;
            break;
          }
        }
      }
      const inner = css.slice(braceIdx + 1, j - 1);
      if (prelude.startsWith('@media') || prelude.startsWith('@supports')) {
        result += prelude + parseAndTransform(inner, mapSelector) + '}';
      } else {
        result += css.slice(i, j);
      }
      i = j;
      continue;
    }

    const braceIdx = css.indexOf('{', i);
    if (braceIdx === -1) break;
    const selectors = css.slice(i, braceIdx).trim();
    let depth = 0;
    let j = braceIdx;
    for (; j < css.length; j += 1) {
      if (css[j] === '{') depth += 1;
      else if (css[j] === '}') {
        depth -= 1;
        if (depth === 0) {
          j += 1;
          break;
        }
      }
    }
    const ruleBody = css.slice(braceIdx + 1, j - 1);
    if (selectors) {
      const scoped = selectors
        .split(',')
        .map((sel) => mapSelector(sel.trim()))
        .join(', ');
      result += `${scoped}{${ruleBody}}`;
    }
    i = j;
  }

  return result;
}

function scopePageCss(css) {
  return parseAndTransform(css, (s) => {
    if (!s) return s;
    if (s === '.page') return '#team-ai-training-ui';
    if (s.startsWith('.page ')) return `#team-ai-training-ui ${s.slice(6)}`;
    if (s.startsWith('.page.')) return `#team-ai-training-ui${s.slice(5)}`;
    if (s.startsWith('#team-ai-training-ui')) return s;
    return `#team-ai-training-ui ${s}`;
  });
}

function scopeOverlayCss(css) {
  return parseAndTransform(css, (s) => {
    if (!s) return s;
    if (s === '.overlay') return '#enquiry-overlay';
    if (s.startsWith('#enquiry-overlay')) return s;
    if (s.startsWith('.')) return `#enquiry-overlay ${s}`;
    return `#enquiry-overlay ${s}`;
  });
}

const baseCss = `
html {
  scroll-behavior: smooth;
  font-size: 16px;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
* { box-sizing: border-box; }
body {
  margin: 0;
  font-size: 16px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
`;

const isolationCss = `
#team-ai-training-ui {
  font-size: 16px;
  line-height: 1.55;
  width: 100%;
}
#team-ai-training-ui .wrap {
  width: calc(100% - 64px);
  max-width: 1180px;
  margin-left: auto;
  margin-right: auto;
}
#team-ai-training-ui .nav {
  display: block;
  width: 100%;
}
#team-ai-training-ui .nav > .wrap {
  height: 100%;
  display: flex;
  align-items: center;
}
#team-ai-training-ui .navLinks,
#team-ai-training-ui .navLinks a {
  font-size: 12px !important;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}
#team-ai-training-ui .companyLogo {
  font-size: 16px !important;
  font-weight: 700;
}
#team-ai-training-ui .testimonialQuote {
  font-size: 20px !important;
  line-height: 1.42;
}
#team-ai-training-ui .btn {
  font-size: 14px !important;
}
@media (max-width: 900px) {
  #team-ai-training-ui .wrap { width: calc(100% - 40px); }
}
@media (max-width: 560px) {
  #team-ai-training-ui .wrap { width: calc(100% - 28px); }
}
`;

const scopedPageCss = scopePageCss(pageCss);
const scopedModalCss = scopeOverlayCss(modalCss);
const scopedFormCss = scopeOverlayCss(formCss);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>Approachable — Practical AI Implementation for Teams</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
${baseCss}
${extraCss}
${scopedPageCss}
${scopedModalCss}
${scopedFormCss}
${footerCss}
${isolationCss}
  </style>
</head>
${bodyHtml}
`;

fs.writeFileSync(outPath, html);
console.log('Rebuilt', outPath);
