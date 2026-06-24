@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=Inter:wght@400;500;600&display=swap');
/* ============================================================
   ΔιάΝους 极简系统 —— 独立版 enhance.css
   黑白灰 + 衬线大标题 + 账本式留白。配合 minimal-standalone.js 使用。
   JS 会给 <body> 加上 .luliy-minimal 类，所有样式据此生效。
   ============================================================ */

/* 基础重置 + 全局变量兜底 */
:root {
  --luliy-glass-hue: 250;   /* 极简里基本不用，给个兜底值防止 hsla 报错 */
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: 'Inter', -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

/* ============================================================
   组件基础样式 —— 极简配色版（黑白灰，无赛博色彩）
   Archives / Chronicle / Bookshelf / Lightbox
   ============================================================ */

/* ── Archives ───────────────────────────────── */
.luliy-archives { max-width: 800px; margin: 0 auto; padding: 8px 0 60px; }
.luliy-arch-loading, .luliy-arch-empty {
  padding: 40px 0; text-align: center; color: #8c8c8c; font-size: 14px;
}
.luliy-arch-error { color: #c0392b; padding: 20px 0; }
.luliy-arch-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  flex-wrap: wrap; gap: 12px; margin-bottom: 28px;
}
.luliy-arch-title {
  font-size: 32px; font-weight: 800; letter-spacing: 2px;
  font-family: 'Noto Serif SC', Georgia, serif;
  color: #1c1c1e; margin: 0;
}
.luliy-arch-tabbar { display: flex; align-items: center; gap: 10px; margin-top: 4px; }
.luliy-arch-tab {
  background: none; border: none; cursor: pointer; padding: 4px 2px;
  font-size: 14px; font-weight: 600; color: #8c8c8c; position: relative;
  letter-spacing: 0.5px; transition: color 0.15s;
}
.luliy-arch-tab:hover { color: #3a3a3a; }
.luliy-arch-tab.is-active { color: #1c1c1e; }
.luliy-arch-tab.is-active::after {
  content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
  height: 1.5px; background: #1c1c1e;
}
.luliy-arch-tabsep { width: 1px; height: 14px; background: #c8c8c8; }
.luliy-arch-year {
  font-size: 28px; font-weight: 700; font-style: italic;
  font-family: 'Noto Serif SC', Georgia, serif;
  color: #1c1c1e; margin: 52px 0 16px;
}
.luliy-arch-year:first-child { margin-top: 8px; }
.luliy-arch-row {
  display: flex; align-items: baseline; gap: 20px;
  padding: 7px 8px; border-radius: 4px; text-decoration: none;
  cursor: pointer; transition: background 0.12s;
}
.luliy-arch-row:hover { background: rgba(28,28,30,0.05); }
.luliy-arch-date {
  flex: 0 0 98px; font-size: 13px; color: #8c8c8c;
  font-variant-numeric: tabular-nums; white-space: nowrap;
}
.luliy-arch-name {
  flex: 1; font-size: 15px; color: #1c1c1e; font-weight: 400;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.luliy-arch-pagination {
  display: flex; align-items: center; justify-content: center;
  gap: 12px; margin-top: 44px; font-size: 13px;
}
.luliy-arch-pgbtn {
  background: none; border: 1px solid #3a3a3a; color: #1c1c1e;
  padding: 5px 16px; border-radius: 3px; cursor: pointer; font-size: 13px;
  transition: background 0.15s;
}
.luliy-arch-pgbtn:hover:not(:disabled) { background: #1c1c1e; color: #f0ece2; }
.luliy-arch-pgbtn:disabled { opacity: 0.3; cursor: default; }
.luliy-arch-pginfo { color: #8c8c8c; font-variant-numeric: tabular-nums; }
body.luliy-hide-pagination .paginator { display: none !important; }

/* ── Chronicle ──────────────────────────────── */
.luliy-chronicle { max-width: 1100px; margin: 0 auto; padding: 8px 0 60px; }
.luliy-chron-loading { padding: 40px 0; text-align: center; color: #8c8c8c; font-size: 14px; }
.luliy-chron-error  { padding: 20px 0; color: #c0392b; }
.luliy-chron-empty  { padding: 24px 16px; color: #8c8c8c; font-style: italic; }
.luliy-chron-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  flex-wrap: wrap; gap: 16px; margin-bottom: 24px;
}
.luliy-chron-title {
  font-size: 32px; font-weight: 800; letter-spacing: 2px;
  font-family: 'Noto Serif SC', Georgia, serif; color: #1c1c1e; margin: 0;
}
.luliy-chron-years { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.luliy-chron-year-tab {
  background: none; border: none; cursor: pointer; padding: 4px 2px;
  font-size: 15px; font-weight: 700; color: #8c8c8c; position: relative;
  transition: color 0.15s;
}
.luliy-chron-year-tab:hover { color: #3a3a3a; }
.luliy-chron-year-tab.is-active { color: #1c1c1e; }
.luliy-chron-year-tab.is-active::after {
  content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
  height: 1.5px; background: #1c1c1e;
}
.luliy-chron-cats { display: flex; gap: 20px; margin: 12px 0 20px; }
.luliy-chron-cat-tab {
  background: none; border: none; cursor: pointer; padding: 4px 2px;
  font-size: 14px; font-weight: 600; color: #8c8c8c; position: relative;
  transition: color 0.15s;
}
.luliy-chron-cat-tab:hover { color: #3a3a3a; }
.luliy-chron-cat-tab.is-active { color: #1c1c1e; }
.luliy-chron-cat-tab.is-active::after {
  content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
  height: 1.5px; background: #1c1c1e;
}
.luliy-chron-body { margin-top: 12px; }
.luliy-chron-scroll-x { overflow-x: auto; -webkit-overflow-scrolling: touch; width: 100%; }
.luliy-chron-tablewrap { min-width: 580px; }
.luliy-chron-table { width: 100%; border-collapse: collapse; font-size: 14px; background: transparent; }
.luliy-chron-table th, .luliy-chron-table td {
  border: 1px solid #3a3a3a; padding: 10px 14px;
  text-align: left; vertical-align: top; color: #1c1c1e;
  background: transparent;
}
.luliy-chron-table th { font-weight: 700; }
.luliy-chron-month-cell {
  font-weight: 700; white-space: nowrap; min-width: 52px;
  text-align: center; vertical-align: middle;
  border-right: 1px solid #3a3a3a;
}
.luliy-chron-table a { color: #1c1c1e; text-decoration: underline; }

/* 海报墙 */
.luliy-chron-posters { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
@media (max-width: 900px) { .luliy-chron-posters { grid-template-columns: repeat(2,1fr); } }
.luliy-poster-item {
  position: relative; display: block; overflow: hidden; border-radius: 4px;
  aspect-ratio: 2/3; border: 1px solid #3a3a3a; background: #e8e4d8;
  cursor: pointer; padding: 0; -webkit-appearance: none; appearance: none;
}
.luliy-poster-img { width: 100%; height: 100%; background-size: cover; background-position: center; }
.luliy-poster-title {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(to top, rgba(28,28,30,0.7), transparent);
  color: #fff; font-size: 11px; padding: 8px 6px 5px; text-align: center;
}
.luliy-poster-item:hover .luliy-poster-title { opacity: 1; }

/* Lightbox */
#luliy-lb {
  position: fixed; inset: 0; z-index: 200000;
  display: flex; align-items: center; justify-content: center;
  opacity: 0; visibility: hidden; transition: opacity 0.25s, visibility 0.25s;
}
#luliy-lb.is-open { opacity: 1; visibility: visible; }
body.luliy-lb-open { overflow: hidden; }
.luliy-lb-bg {
  position: absolute; inset: 0; background: rgba(28,28,30,0.88);
  -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
}
.luliy-lb-img-wrap {
  position: relative; z-index: 1; display: flex; flex-direction: column;
  align-items: center; max-width: min(90vw,520px); max-height: 90vh;
}
.luliy-lb-img {
  display: block; max-width: 100%; max-height: calc(90vh - 80px);
  object-fit: contain; border-radius: 4px; box-shadow: 0 8px 40px rgba(0,0,0,0.5);
}
.luliy-lb-cap { margin-top: 12px; font-size: 13px; color: #e8e4d8; text-align: center; }
.luliy-lb-link {
  display: inline-block; margin-top: 8px; font-size: 12px;
  color: #c8c4b4; text-decoration: none; opacity: 0.85;
}
.luliy-lb-link:hover { opacity: 1; text-decoration: underline; }
.luliy-lb-prev, .luliy-lb-next {
  position: absolute; z-index: 2; top: 50%; transform: translateY(-50%);
  width: 44px; height: 44px; border-radius: 50%; border: none; cursor: pointer;
  background: rgba(255,255,255,0.15); color: #fff; font-size: 24px;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s;
}
.luliy-lb-prev { left: 16px; }
.luliy-lb-next { right: 16px; }
.luliy-lb-prev:hover, .luliy-lb-next:hover { background: rgba(255,255,255,0.3); }
.luliy-lb-prev:disabled, .luliy-lb-next:disabled { opacity: 0.2; cursor: default; }
.luliy-lb-close {
  position: absolute; z-index: 2; top: 16px; right: 16px;
  width: 34px; height: 34px; border-radius: 50%; border: none; cursor: pointer;
  background: rgba(255,255,255,0.15); color: #fff; font-size: 16px;
  display: flex; align-items: center; justify-content: center;
}
.luliy-lb-close:hover { background: rgba(255,255,255,0.3); }
@media (max-width: 640px) {
  .luliy-lb-prev { left: 4px; width: 36px; height: 36px; font-size: 18px; }
  .luliy-lb-next { right: 4px; width: 36px; height: 36px; font-size: 18px; }
}

/* ── Bookshelf ──────────────────────────────── */
.luliy-bookshelf { max-width: 1080px; margin: 0 auto; padding: 8px 0 60px; }
.luliy-book-loading, .luliy-book-error { padding: 40px 0; text-align: center; color: #8c8c8c; }
.luliy-book-error { color: #c0392b; }
.luliy-book-header { text-align: left; margin-bottom: 28px; }
.luliy-book-title {
  font-size: 32px; font-weight: 800; font-family: 'Noto Serif SC', Georgia, serif;
  color: #1c1c1e; margin: 0 0 6px;
}
.luliy-book-sub { color: #8c8c8c; font-size: 13px; margin: 0; }
.luliy-bookcase { display: flex; flex-direction: column; gap: 40px; }
.luliy-shelf { position: relative; }
.luliy-shelf-plaque {
  font-size: 18px; font-weight: 700; font-style: italic;
  font-family: 'Noto Serif SC', Georgia, serif;
  color: #1c1c1e; margin: 0 0 10px; display: inline-flex; align-items: baseline; gap: 6px;
}
.luliy-shelf-count { font-style: normal; font-size: 12px; color: #8c8c8c; font-weight: 500; }
.luliy-shelf-row {
  display: flex; flex-wrap: wrap; align-items: flex-end;
  gap: 7px; padding: 0 0 12px; min-height: 50px;
}
.luliy-shelf-empty { color: #8c8c8c; font-size: 13px; font-style: italic; padding: 14px 0; }
.luliy-shelf-board { height: 1px; background: #3a3a3a; opacity: 0.5; margin: 0; }
.luliy-spine {
  display: flex; align-items: center; justify-content: center; text-decoration: none;
  color: #1c1c1e; border-radius: 2px; cursor: pointer; position: relative; padding: 10px 0;
  transform: rotate(var(--tilt, 0deg));
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  box-shadow: inset 0 0 0 1px #3a3a3a;
}
.luliy-spine:hover, .luliy-spine:focus-visible {
  transform: translateY(-10px) rotate(0deg);
  box-shadow: inset 0 0 0 1px #1c1c1e, 0 8px 16px rgba(0,0,0,0.12);
  outline: none;
}
.luliy-spine-title {
  writing-mode: vertical-rl; text-orientation: mixed;
  font-family: 'Noto Serif SC', Georgia, serif; font-weight: 700; font-size: 14px;
  letter-spacing: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  max-height: 100%; color: #1c1c1e;
}
.luliy-spine-tip {
  position: absolute; bottom: 100%; left: 50%; transform: translate(-50%, 6px);
  min-width: 110px; max-width: 190px;
  background: #f0ece2; border: 1px solid #3a3a3a; color: #1c1c1e;
  border-radius: 4px; padding: 7px 10px; writing-mode: horizontal-tb;
  opacity: 0; pointer-events: none; margin-bottom: 6px; z-index: 5;
  transition: opacity 0.15s ease, transform 0.15s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
.luliy-spine:hover .luliy-spine-tip, .luliy-spine:focus-visible .luliy-spine-tip {
  opacity: 1; transform: translate(-50%, 0);
}
.luliy-spine-tip strong { display: block; font-size: 13px; margin-bottom: 2px; color: #1c1c1e; }
.luliy-spine-note { display: block; font-size: 11px; color: #8c8c8c; }
.luliy-reading-zone {
  margin-left: auto; display: flex; flex-direction: column;
  align-items: center; gap: 6px; padding-bottom: 4px;
}
.luliy-reading-label { font-size: 10px; letter-spacing: 2px; color: #8c8c8c; font-weight: 700; }
.luliy-reading-stack { position: relative; width: 88px; height: 50px; }
.luliy-flat-book {
  position: absolute; left: 0; width: 88px; height: 16px; border-radius: 2px;
  text-decoration: none; display: flex; align-items: center; padding-left: 8px;
  font-family: 'Noto Serif SC', Georgia, serif; font-size: 9px; color: #f0ece2;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2); transition: transform 0.15s ease;
}
.luliy-flat-book:hover { transform: translateX(3px); }
.luliy-flat-book.is-top { transform: rotate(-5deg); }

/* ── 文章页 ─────────────────────────────────── */
body.luliy-min-article #content {
  max-width: 1100px; margin: 0 auto; padding: 0 48px 120px;
}
body.luliy-min-article #postBody {
  max-width: 680px; margin: 0; font-size: 16px; line-height: 1.9; color: #1c1c1e;
}
body.luliy-min-article #postBody h1 {
  font-family: 'Noto Serif SC', Georgia, serif; font-weight: 700; font-size: 34px;
  color: #1c1c1e; letter-spacing: 1px; margin: 18px 0 8px; line-height: 1.3;
}
body.luliy-min-article #postBody h2 {
  font-weight: 700; font-size: 19px; color: #1c1c1e; margin: 44px 0 12px;
}
body.luliy-min-article #postBody h2::before { content: '# '; color: #8c8c8c; }
body.luliy-min-article #postBody h3 {
  font-weight: 600; font-size: 16px; color: #1c1c1e; margin: 28px 0 8px;
}
body.luliy-min-article #postBody p { margin: 0 0 24px; color: #3a3a3a; }
body.luliy-min-article #postBody a { color: #1c1c1e; text-decoration: underline; text-underline-offset: 3px; }
body.luliy-min-article #postBody strong, body.luliy-min-article #postBody b { color: #1c1c1e; font-weight: 700; }
body.luliy-min-article #postBody blockquote {
  margin: 20px 0; padding-left: 16px; border-left: 2px solid #3a3a3a;
  color: #3a3a3a; background: transparent;
}
body.luliy-min-article #postBody pre, body.luliy-min-article #postBody code {
  background: rgba(28,28,30,0.05); color: #1c1c1e; border: none; border-radius: 3px;
}
body.luliy-min-article #postBody pre { padding: 12px 16px; overflow-x: auto; }
body.luliy-min-article #postBody img { max-width: 100%; border-radius: 2px; }
body.luliy-min-article #postBody table { border-collapse: collapse; width: 100%; }
body.luliy-min-article #postBody table th,
body.luliy-min-article #postBody table td {
  border: 1px solid #3a3a3a; padding: 8px 12px; color: #1c1c1e; text-align: left;
}
.luliy-readmeta, #luliy-readmeta {
  font-size: 13px; color: #8c8c8c; margin-bottom: 32px; font-variant-numeric: tabular-nums;
}

/* 目录 */
#luliy-min-toc {
  position: fixed; top: 110px; right: max(40px, calc((100vw - 1100px) / 2 + 48px));
  width: 200px; max-height: 70vh; overflow-y: auto;
  font-size: 13px; line-height: 1.7; z-index: 60;
}
#luliy-min-toc a { display: block; color: #8c8c8c; text-decoration: none; transition: color 0.15s; }
#luliy-min-toc a:hover { color: #1c1c1e; }
#luliy-min-toc .luliy-min-toc-h1 { color: #3a3a3a; font-weight: 600; margin-top: 10px; }
#luliy-min-toc .luliy-min-toc-h2 { padding-left: 14px; }
#luliy-min-toc .luliy-min-toc-h3 { padding-left: 28px; font-size: 12px; }

/* ── 手机端 ─────────────────────────────────── */
@media (max-width: 1080px) { #luliy-min-toc { display: none; } }
@media (max-width: 720px) {
  body.luliy-min-article #content { padding: 0 20px 80px; }
  .luliy-archives, .luliy-chronicle, .luliy-bookshelf { padding: 8px 20px 60px; }
}
@media (max-width: 640px) {
  /* Chronicle 手机端卡片化 */
  .luliy-chron-scroll-x { overflow-x: visible; }
  .luliy-chron-tablewrap { min-width: 0; }
  .luliy-chron-table, .luliy-chron-table thead,
  .luliy-chron-table tbody, .luliy-chron-table tr,
  .luliy-chron-table th, .luliy-chron-table td { display: block; width: 100% !important; box-sizing: border-box; }
  .luliy-chron-table thead { display: none !important; }
  .luliy-chron-table tbody tr {
    margin-bottom: 10px; border: 1px solid #3a3a3a; border-radius: 4px; overflow: hidden;
  }
  .luliy-chron-table td {
    display: flex !important; align-items: baseline; gap: 8px;
    padding: 7px 12px; border: none !important;
    border-bottom: 1px solid rgba(58,58,58,0.2) !important;
  }
  .luliy-chron-table td:last-child { border-bottom: none !important; }
  .luliy-chron-table td:not(.luliy-chron-month-cell)::before {
    content: attr(data-label); flex: 0 0 3.5em;
    font-size: 11px; font-weight: 700; color: #8c8c8c; white-space: nowrap;
  }
  .luliy-chron-table .luliy-chron-month-cell {
    justify-content: center !important; font-weight: 800; font-size: 13px;
    background: rgba(28,28,30,0.04) !important;
    border-bottom: 1px solid rgba(58,58,58,0.3) !important;
  }
  .luliy-chron-posters { grid-template-columns: repeat(2,1fr) !important; }
}


/* ════════════════════════════════════════════════════════════
   极简系统 Minimal System
   黑白灰 + 衬线大标题 + 账本式留白。配色/字体/留白/组件/布局
   严格按规范。只在 body.luliy-minimal 下生效，绝不影响赛博系统。
   ════════════════════════════════════════════════════════════ */
body.luliy-minimal {
  /* —— 配色 —— */
  --min-bg: rgb(230, 225, 212);
  --min-title: #1c1c1e;       /* 标题：近黑炭灰 */
  --min-text: #3a3a3a;        /* 正文：深灰，不用纯黑 */
  --min-muted: #8c8c8c;       /* 次要：中灰（日期/字数/未激活tab） */
  --min-line: #3a3a3a;        /* 硬边框线：深灰近黑 */
  --min-serif: 'Noto Serif SC', 'Songti SC', Georgia, 'Times New Roman', serif;
  --min-sans: 'Inter', -apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif;

  background: var(--min-bg) !important;
  color: var(--min-text);
  font-family: var(--min-sans);
  zoom: 1 !important;
}
/* 极简系统下：彻底隐藏所有赛博系统的元素（保险，即使没初始化） */
body.luliy-minimal #luliy-cyber-canvas,
body.luliy-minimal #luliy-sakura-canvas,
body.luliy-minimal #luliy-splash,
body.luliy-minimal #luliy-brand,
body.luliy-minimal #luliy-subtitle,
body.luliy-minimal #luliy-issues-link,
body.luliy-minimal #luliy-to-minimal,
body.luliy-minimal #luliy-ham-btn,
body.luliy-minimal #luliy-drawer,
body.luliy-minimal #luliy-drawer-scrim,
body.luliy-minimal #luliy-aplayer,
body.luliy-minimal #luliy-ap-fab,
body.luliy-minimal #luliy-ctrl-panel,
body.luliy-minimal #luliy-ctrl-fab,
body.luliy-minimal .luliy-cats,
body.luliy-minimal #header,
body.luliy-minimal #footer {
  display: none !important;
}
body.luliy-minimal #content { background: transparent !important; }

/* —— 顶部导航：Home / Archives / Chronicle / About —— */
#luliy-min-nav {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  padding: 28px 48px 0;
  font-family: var(--min-sans);
  font-size: 14px;
  letter-spacing: 0.5px;
  color: var(--min-muted);
}
#luliy-min-nav a {
  color: var(--min-title);
  text-decoration: none;
  transition: opacity 0.15s;
}
#luliy-min-nav a:hover { opacity: 0.55; }
.luliy-min-nav-sep { margin: 0 10px; color: var(--min-muted); }

/* —— 系统切换按钮（极简 → 赛博） —— */
#luliy-system-toggle {
  position: fixed; top: 22px; right: 28px; z-index: 100;
  width: 34px; height: 34px; border-radius: 50%;
  border: 1px solid var(--min-line);
  background: transparent; color: var(--min-title);
  font-size: 15px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s, color 0.15s;
}
#luliy-system-toggle:hover { background: var(--min-title); color: var(--min-bg); }

/* —— 赛博系统里「切到极简」的按钮（放沉思者图标旁） —— */
#luliy-to-minimal {
  position: fixed; top: 14px; z-index: 10002;
  width: 30px; height: 44px;
  background: transparent; border: none; cursor: pointer;
  color: #fff; font-size: 18px;
  display: inline-flex; align-items: center; justify-content: center;
  opacity: 0.7;
  filter: drop-shadow(0 0 6px rgba(110,199,255,0.6));
  transition: opacity 0.2s, transform 0.2s;
}
#luliy-to-minimal:hover { opacity: 1; transform: scale(1.15); }

/* ════════ 主页：楼梯图 + 隐形热区 ════════ */
#luliy-min-home {
  position: fixed; inset: 0;
  background: var(--min-bg);
  display: flex; align-items: center; justify-content: center;
  z-index: 50;
}
.luliy-min-home-stage {
  position: relative;
  width: 100%; max-width: 1400px;
  margin: 0 auto;
}
.luliy-min-home-img {
  display: block; width: 100%; height: auto;
  user-select: none; -webkit-user-drag: none;
}
.luliy-min-hot {
  position: absolute;
  display: block;
  cursor: pointer;
  /* 透明热区；hover 时极淡描边提示可点击 */
  border-radius: 4px;
  transition: background 0.2s, box-shadow 0.2s;
}
.luliy-min-hot:hover {
  background: rgba(28,28,30,0.04);
  box-shadow: inset 0 0 0 1px rgba(28,28,30,0.18);
}

/* ════════ 普通文章 / about：极简排版 ════════ */
body.luliy-min-article #content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 48px 120px;
}
body.luliy-min-article #postBody {
  max-width: 680px;          /* 正文主列偏左、不居中 */
  margin: 0;
  margin-right: auto;
  font-family: var(--min-sans);
  font-size: 16px;
  line-height: 1.9;
  color: var(--min-text);
}
/* 文章标题：衬线、全站最大 */
body.luliy-min-article #postBody h1 {
  font-family: var(--min-serif);
  font-weight: 700;
  font-size: 34px;
  color: var(--min-title);
  letter-spacing: 1px;
  margin: 18px 0 8px;
  line-height: 1.3;
}
/* 二级小标题：无衬线加粗 + # 前缀 */
body.luliy-min-article #postBody h2 {
  font-family: var(--min-sans);
  font-weight: 700;
  font-size: 19px;
  color: var(--min-title);
  margin: 48px 0 14px;
}
body.luliy-min-article #postBody h2::before { content: '# '; color: var(--min-muted); }
body.luliy-min-article #postBody h3 {
  font-family: var(--min-sans);
  font-weight: 600; font-size: 16px; color: var(--min-title);
  margin: 32px 0 10px;
}
body.luliy-min-article #postBody p {
  margin: 0 0 26px;          /* 段落间留白明显大于行内行距 */
  color: var(--min-text);
}
body.luliy-min-article #postBody a { color: var(--min-title); text-decoration: underline; text-underline-offset: 3px; }
body.luliy-min-article #postBody img { max-width: 100%; border-radius: 2px; }
/* 文章 meta（日期/字数）：最小、浅灰、等宽数字感 */
body.luliy-min-article #postBody .luliy-readmeta,
body.luliy-min-article .luliy-readmeta {
  font-family: var(--min-sans);
  font-variant-numeric: tabular-nums;
  font-size: 13px; color: var(--min-muted) !important;
  margin-bottom: 40px;
}

/* —— 右侧悬浮目录（漂浮在留白区，不占主列） —— */
#luliy-min-toc {
  position: fixed;
  top: 120px; right: max(40px, calc((100vw - 1100px) / 2 + 48px));
  width: 220px; max-height: 70vh; overflow-y: auto;
  font-family: var(--min-sans); font-size: 13px; line-height: 1.7;
  z-index: 40;
}
#luliy-min-toc a { display: block; color: var(--min-muted); text-decoration: none; transition: color 0.15s; }
#luliy-min-toc a:hover { color: var(--min-title); }
#luliy-min-toc .luliy-min-toc-h1 { color: var(--min-text); font-weight: 600; margin-top: 10px; }
#luliy-min-toc .luliy-min-toc-h2 { padding-left: 14px; }
#luliy-min-toc .luliy-min-toc-h3 { padding-left: 28px; font-size: 12px; }
@media (max-width: 1080px) {
  #luliy-min-toc { display: none; }   /* 窄屏不显示边注目录 */
  body.luliy-min-article #content { padding: 0 24px 80px; }
}

/* ════════ Archives / Chronicle / Book 的极简皮肤 ════════
   复用现有结构，只覆盖颜色/字体/边框，做成黑白灰账本风。 */
body.luliy-minimal .luliy-archives,
body.luliy-minimal .luliy-chronicle,
body.luliy-minimal .luliy-bookshelf {
  max-width: 1100px; margin: 0 auto; padding: 8px 48px 80px;
}
/* 年份/分组大标题：衬线斜体数字感 */
body.luliy-minimal .luliy-arch-title,
body.luliy-minimal .luliy-chron-title,
body.luliy-minimal .luliy-book-title,
body.luliy-minimal .luliy-arch-year {
  font-family: var(--min-serif) !important;
  font-weight: 700 !important; font-style: italic;
  color: var(--min-title) !important;
  text-shadow: none !important;
}
body.luliy-minimal .luliy-arch-title,
body.luliy-minimal .luliy-chron-title,
body.luliy-minimal .luliy-book-title { font-size: 32px !important; font-style: normal; }
body.luliy-minimal .luliy-arch-year {
  font-size: 28px !important; margin: 56px 0 14px !important;   /* 年份间大留白 */
}
/* Tab：纯文字，激活态仅下划线 */
body.luliy-minimal .luliy-arch-tab,
body.luliy-minimal .luliy-chron-year-tab,
body.luliy-minimal .luliy-chron-cat-tab {
  background: none !important; color: var(--min-muted) !important;
  text-shadow: none !important; font-family: var(--min-sans) !important;
  border-radius: 0 !important;
}
body.luliy-minimal .luliy-arch-tab.is-active,
body.luliy-minimal .luliy-chron-year-tab.is-active,
body.luliy-minimal .luliy-chron-cat-tab.is-active {
  color: var(--min-title) !important;
}
body.luliy-minimal .luliy-arch-tab.is-active::after,
body.luliy-minimal .luliy-chron-year-tab.is-active::after,
body.luliy-minimal .luliy-chron-cat-tab.is-active::after {
  background: var(--min-title) !important; box-shadow: none !important;
}
body.luliy-minimal .luliy-arch-tabsep { background: var(--min-muted) !important; }
/* 归档列表：无卡片无分割线，靠两栏对齐 + 行距 */
body.luliy-minimal .luliy-arch-row { background: none !important; }
body.luliy-minimal .luliy-arch-row:hover { background: rgba(28,28,30,0.04) !important; transform: none !important; }
body.luliy-minimal .luliy-arch-date { color: var(--min-muted) !important; font-variant-numeric: tabular-nums; }
body.luliy-minimal .luliy-arch-name { color: var(--min-title) !important; }
body.luliy-minimal .luliy-arch-row:hover .luliy-arch-date,
body.luliy-minimal .luliy-arch-row:hover .luliy-arch-name { color: var(--min-title) !important; }
body.luliy-minimal .luliy-arch-header,
body.luliy-minimal .luliy-chron-header { border-bottom: none !important; }
/* 分页 */
body.luliy-minimal .luliy-arch-pgbtn {
  background: none !important; border: 1px solid var(--min-line) !important;
  color: var(--min-title) !important; box-shadow: none !important;
}
body.luliy-minimal .luliy-arch-pgbtn:hover:not(:disabled) {
  background: var(--min-title) !important; color: var(--min-bg) !important;
}
body.luliy-minimal .luliy-arch-pginfo { color: var(--min-muted) !important; font-variant-numeric: tabular-nums; }

/* 编年史表格：全站唯一硬边框组件，1px 直角网格，无底色无斑马纹 */
body.luliy-minimal .luliy-chron-table { background: transparent !important; }
body.luliy-minimal .luliy-chron-table th,
body.luliy-minimal .luliy-chron-table td {
  border: 1px solid var(--min-line) !important;
  color: var(--min-text) !important;
  background: transparent !important;
}
body.luliy-minimal .luliy-chron-table th {
  font-weight: 700 !important; color: var(--min-title) !important;
  background: transparent !important;
}
body.luliy-minimal .luliy-chron-month-cell {
  border-right: 1px solid var(--min-line) !important;
  color: var(--min-title) !important; font-weight: 700 !important;
}
body.luliy-minimal .luliy-chron-table a { color: var(--min-title) !important; text-decoration: underline; }
/* 海报墙：去霓虹，简单灰边框 */
body.luliy-minimal .luliy-poster-item {
  background: rgba(28,28,30,0.04) !important; border: 1px solid var(--min-line) !important;
}
body.luliy-minimal .luliy-poster-title { background: linear-gradient(to top, rgba(28,28,30,0.8), transparent) !important; }

/* 书架：去木质/霓虹，做成极简层架 */
body.luliy-minimal .luliy-bookcase {
  background: transparent !important; border: none !important;
  box-shadow: none !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
  gap: 40px !important;
}
body.luliy-minimal .luliy-shelf-plaque {
  background: none !important; color: var(--min-title) !important;
  box-shadow: none !important; font-family: var(--min-serif) !important;
  font-style: italic; font-size: 18px !important; padding-left: 0 !important; margin-left: 0 !important;
}
body.luliy-minimal .luliy-shelf-count { color: var(--min-muted) !important; }
body.luliy-minimal .luliy-shelf-board {
  background: var(--min-line) !important; opacity: 1 !important; height: 1px !important; box-shadow: none !important;
}
body.luliy-minimal .luliy-spine {
  background: rgba(28,28,30,0.06) !important;
  color: var(--min-title) !important;
  box-shadow: inset 0 0 0 1px var(--min-line) !important;
}
body.luliy-minimal .luliy-spine:hover {
  box-shadow: inset 0 0 0 1px var(--min-line), 0 8px 16px rgba(0,0,0,0.12) !important;
}
body.luliy-minimal .luliy-spine-title { color: var(--min-title) !important; text-shadow: none !important; }
body.luliy-minimal .luliy-spine-tip {
  background: var(--min-bg) !important; border: 1px solid var(--min-line) !important; color: var(--min-text) !important;
}
body.luliy-minimal .luliy-spine-note { color: var(--min-muted) !important; }
body.luliy-minimal .luliy-flat-book { color: var(--min-title) !important; background: rgba(28,28,30,0.08) !important; }
body.luliy-minimal .luliy-reading-label { color: var(--min-muted) !important; }
body.luliy-minimal .luliy-book-sub,
body.luliy-minimal .luliy-shelf-empty { color: var(--min-muted) !important; }

@media (max-width: 720px) {
  #luliy-min-nav { padding: 20px 20px 0; }
  body.luliy-minimal .luliy-archives,
  body.luliy-minimal .luliy-chronicle,
  body.luliy-minimal .luliy-bookshelf { padding: 8px 20px 60px; }
}

/* ── 极简系统：强制压过赛博系统的文章面板/标题装饰/文字色 ── */
body.luliy-minimal #postBody,
body.luliy-min-article #postBody {
  background: transparent !important;
  box-shadow: none !important;
  border: none !important;
  backdrop-filter: none !important; -webkit-backdrop-filter: none !important;
}
body.luliy-min-article #postBody h1,
body.luliy-min-article #postBody h2,
body.luliy-min-article #postBody h3 {
  color: #1c1c1e !important;
  border: none !important;
  border-left: none !important;
  padding-left: 0 !important;
  background: none !important;
  -webkit-text-fill-color: #1c1c1e !important;
  text-shadow: none !important;
}
body.luliy-min-article #postBody h1 {
  font-family: 'Noto Serif SC', Georgia, serif !important;
  -webkit-text-fill-color: #1c1c1e !important;
}
body.luliy-min-article #postBody p,
body.luliy-min-article #postBody li {
  color: #3a3a3a !important;
  -webkit-text-fill-color: #3a3a3a !important;
}
/* 去掉赛博系统给 h2 加的竖条/色块装饰 */
body.luliy-min-article #postBody h2::after,
body.luliy-min-article #postBody h2::marker { content: none !important; }

/* ════════════════════════════════════════════════════════════
   极简系统 v2 总清洗 —— 彻底压掉所有泄漏的赛博样式
   规则：背景全屏 RGB(230,225,212)、文字纯黑/灰、表格无底色、
   md 装饰色全清、面板透明、目录在右。优先级用 html/body 双重限定。
   ════════════════════════════════════════════════════════════ */

/* —— 1. 背景全屏铺满（html + body + 所有容器都强制纯色） —— */
html:has(body.luliy-minimal),
html:has(body.luliy-minimal) body.luliy-minimal {
  background: rgb(230,225,212) !important;
  background-image: none !important;
}
body.luliy-minimal,
body.luliy-minimal #content,
body.luliy-minimal .markdown-body,
body.luliy-minimal #postBody,
body.luliy-minimal .SideNav,
body.luliy-minimal main,
body.luliy-minimal article {
  background: transparent !important;
  background-image: none !important;
  box-shadow: none !important;
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
}
/* body 本体保留底色（作为全屏背景） */
body.luliy-minimal { background: rgb(230,225,212) !important; }

/* —— 2. 所有文字强制黑/灰，清除一切发光、渐变、彩色 —— */
body.luliy-minimal #postBody,
body.luliy-minimal #postBody *,
body.luliy-minimal .luliy-archives *,
body.luliy-minimal .luliy-chronicle *,
body.luliy-minimal .luliy-bookshelf * {
  text-shadow: none !important;
}
/* md 正文里所有元素：统一深灰，标题近黑 */
body.luliy-min-article #postBody,
body.luliy-min-article #postBody p,
body.luliy-min-article #postBody li,
body.luliy-min-article #postBody span,
body.luliy-min-article #postBody td,
body.luliy-min-article #postBody div,
body.luliy-min-article #postBody strong,
body.luliy-min-article #postBody em,
body.luliy-min-article #postBody blockquote {
  color: #1c1c1e !important;
  -webkit-text-fill-color: #1c1c1e !important;
  background: transparent !important;
}
body.luliy-min-article #postBody h1,
body.luliy-min-article #postBody h2,
body.luliy-min-article #postBody h3,
body.luliy-min-article #postBody h4 {
  color: #1c1c1e !important;
  -webkit-text-fill-color: #1c1c1e !important;
}
/* md 链接：黑色带下划线 */
body.luliy-min-article #postBody a {
  color: #1c1c1e !important;
  -webkit-text-fill-color: #1c1c1e !important;
  text-decoration: underline !important;
}
/* md 里的 blockquote / 代码块 / 高亮：去掉所有底色和彩边，变成极简 */
body.luliy-min-article #postBody blockquote {
  background: transparent !important;
  border: none !important;
  border-left: 2px solid #3a3a3a !important;
  padding-left: 16px !important;
  margin-left: 0 !important;
}
body.luliy-min-article #postBody pre,
body.luliy-min-article #postBody code {
  background: rgba(28,28,30,0.05) !important;
  color: #1c1c1e !important;
  -webkit-text-fill-color: #1c1c1e !important;
  border: none !important;
  box-shadow: none !important;
}
body.luliy-min-article #postBody pre * {
  color: #1c1c1e !important;
  -webkit-text-fill-color: #1c1c1e !important;
  text-shadow: none !important;
  background: transparent !important;
}

/* —— 3. 编年史表格：全屏背景下无底色、纯黑细线网格、文字纯黑 —— */
body.luliy-minimal .luliy-chron-table,
body.luliy-minimal .luliy-chron-table thead,
body.luliy-minimal .luliy-chron-table tbody,
body.luliy-minimal .luliy-chron-table tr {
  background: transparent !important;
}
body.luliy-minimal .luliy-chron-table th,
body.luliy-minimal .luliy-chron-table td,
body.luliy-minimal .luliy-chron-month-cell {
  background: transparent !important;
  color: #1c1c1e !important;
  -webkit-text-fill-color: #1c1c1e !important;
  border: 1px solid #3a3a3a !important;
  text-shadow: none !important;
}
body.luliy-minimal .luliy-chron-table th { font-weight: 700 !important; }
body.luliy-minimal .luliy-chron-table a {
  color: #1c1c1e !important; -webkit-text-fill-color: #1c1c1e !important;
  text-decoration: underline !important;
}
/* 表格外层那个圆角玻璃容器也去掉 */
body.luliy-minimal .luliy-chron-tablewrap,
body.luliy-minimal .luliy-chron-scroll-x {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

/* —— 4. 归档列表：文字纯黑/灰，无底色，激活行不要色块 —— */
body.luliy-minimal .luliy-arch-row,
body.luliy-minimal .luliy-arch-row * {
  background: transparent !important;
  text-shadow: none !important;
}
body.luliy-minimal .luliy-arch-name { color: #1c1c1e !important; -webkit-text-fill-color:#1c1c1e !important; }
body.luliy-minimal .luliy-arch-date { color: #8c8c8c !important; -webkit-text-fill-color:#8c8c8c !important; }
body.luliy-minimal .luliy-arch-row:hover { background: rgba(28,28,30,0.05) !important; }
/* 标题 Chronicle/Archives：去掉粉色渐变和下划线发光，改纯黑衬线 */
body.luliy-minimal .luliy-arch-title,
body.luliy-minimal .luliy-chron-title,
body.luliy-minimal .luliy-book-title {
  color: #1c1c1e !important;
  -webkit-text-fill-color: #1c1c1e !important;
  background: none !important;
  text-shadow: none !important;
  border-bottom: none !important;
}
/* 标题下面那条粉色装饰线删除 */
body.luliy-minimal .luliy-arch-title::after,
body.luliy-minimal .luliy-chron-title::after,
body.luliy-minimal .luliy-book-title::after { display: none !important; }

/* —— 5. Tab 文字（事件/书影音/海报墙、年份、Weekly|Other）：灰→黑，激活仅下划线 —— */
body.luliy-minimal .luliy-arch-tab,
body.luliy-minimal .luliy-chron-cat-tab,
body.luliy-minimal .luliy-chron-year-tab {
  color: #8c8c8c !important; -webkit-text-fill-color: #8c8c8c !important;
  text-shadow: none !important; background: none !important;
}
body.luliy-minimal .luliy-arch-tab.is-active,
body.luliy-minimal .luliy-chron-cat-tab.is-active,
body.luliy-minimal .luliy-chron-year-tab.is-active {
  color: #1c1c1e !important; -webkit-text-fill-color: #1c1c1e !important;
}
body.luliy-minimal .luliy-arch-tab.is-active::after,
body.luliy-minimal .luliy-chron-cat-tab.is-active::after,
body.luliy-minimal .luliy-chron-year-tab.is-active::after {
  background: #1c1c1e !important; box-shadow: none !important;
}

/* —— 6. 目录固定在右侧（之前可能被覆盖），切换按钮左边留给主页导航 —— */
#luliy-min-toc {
  position: fixed !important;
  top: 110px !important;
  right: 40px !important;
  left: auto !important;
  width: 200px !important;
  text-align: left;
  z-index: 60 !important;
}
#luliy-min-toc a { color: #8c8c8c !important; -webkit-text-fill-color:#8c8c8c !important; }
#luliy-min-toc a:hover,
#luliy-min-toc .luliy-min-toc-h1 { color: #1c1c1e !important; -webkit-text-fill-color:#1c1c1e !important; }

/* —— 7. 主页：背景全屏 + 图片居中 + 顶部文字导航（切换按钮左边） —— */
#luliy-min-home {
  position: fixed !important; inset: 0 !important;
  background: rgb(230,225,212) !important;
  display: flex !important; align-items: center !important; justify-content: center !important;
  z-index: 50 !important;
}
#luliy-min-home-nav {
  position: fixed; top: 24px; right: 76px; z-index: 120;
  font-family: var(--min-sans); font-size: 14px; letter-spacing: 0.5px;
  color: #8c8c8c;
}
#luliy-min-home-nav a { color: #1c1c1e; text-decoration: none; }
#luliy-min-home-nav a:hover { opacity: 0.55; }
#luliy-min-home-nav .luliy-min-nav-sep { margin: 0 8px; color: #8c8c8c; }

/* —— 8. 切换按钮：极简风、放右上角 —— */
#luliy-system-toggle {
  background: transparent !important;
  border: 1px solid #3a3a3a !important;
  color: #1c1c1e !important;
}
#luliy-system-toggle:hover { background: #1c1c1e !important; color: rgb(230,225,212) !important; }

@media (max-width: 1080px) {
  #luliy-min-toc { display: none !important; }
}
@media (max-width: 720px) {
  #luliy-min-home-nav { right: 64px; font-size: 12px; }
  #luliy-min-home-nav .luliy-min-nav-sep { margin: 0 5px; }
}

/* —— v2 补丁：标题/表头颜色 + 表格外框，更强覆盖 —— */
body.luliy-minimal .luliy-chron-title,
body.luliy-minimal .luliy-arch-title,
body.luliy-minimal .luliy-book-title {
  color: #1c1c1e !important;
  -webkit-text-fill-color: #1c1c1e !important;
  background: none !important; background-clip: border-box !important;
  -webkit-background-clip: border-box !important;
  font-family: 'Noto Serif SC', Georgia, serif !important;
  font-style: normal !important;
}
/* 表头文字纯黑（去青色） */
body.luliy-minimal .luliy-chron-table th,
body.luliy-minimal .luliy-chron-table thead th,
body.luliy-minimal .luliy-chron-table thead td {
  color: #1c1c1e !important;
  -webkit-text-fill-color: #1c1c1e !important;
}
/* 表格内容文字纯黑（去淡蓝） */
body.luliy-minimal .luliy-chron-table tbody td,
body.luliy-minimal .luliy-chron-table tbody th,
body.luliy-minimal .luliy-chron-month-cell {
  color: #1c1c1e !important;
  -webkit-text-fill-color: #1c1c1e !important;
}
/* 表格最外层容器：去圆角去描边去阴影 */
body.luliy-minimal .luliy-chron-tablewrap,
body.luliy-minimal .luliy-chron-scroll-x,
body.luliy-minimal .luliy-chronicle .luliy-chron-body {
  border: none !important; border-radius: 0 !important;
  box-shadow: none !important; background: transparent !important;
  outline: none !important;
}
/* 表格本身直角无圆角 */
body.luliy-minimal .luliy-chron-table { border-radius: 0 !important; overflow: visible !important; }

/* ════════ v3 最终覆盖：用 [data-color-mode] 前缀提足优先级 ════════
   赛博的泄漏规则多是 [data-color-mode="dark"] body:not([data-luliy-theme]) #xxx，
   优先级很高。极简覆盖必须同等或更高，这里统一加 [data-color-mode] 前缀。 */

/* 文章面板：彻底透明（压掉 :not([data-luliy-theme]) #postBody 的深色面板） */
[data-color-mode] body.luliy-minimal #postBody,
[data-color-mode] body.luliy-minimal .markdown-body,
[data-color-mode] body.luliy-minimal #content {
  background: transparent !important;
  background-image: none !important;
  border: none !important;
  box-shadow: none !important;
  -webkit-backdrop-filter: none !important;
  backdrop-filter: none !important;
}

/* Chronicle/Archives/Book 标题：纯黑衬线（压掉粉色渐变） */
[data-color-mode] body.luliy-minimal .luliy-chron-title,
[data-color-mode] body.luliy-minimal .luliy-arch-title,
[data-color-mode] body.luliy-minimal .luliy-book-title {
  color: #1c1c1e !important;
  -webkit-text-fill-color: #1c1c1e !important;
  background: none !important;
  -webkit-background-clip: border-box !important;
  background-clip: border-box !important;
  font-family: 'Noto Serif SC', Georgia, serif !important;
  text-shadow: none !important;
}

/* 表头 + 表格内容：纯黑（压掉青色/淡蓝） */
[data-color-mode] body.luliy-minimal .luliy-chron-table th,
[data-color-mode] body.luliy-minimal .luliy-chron-table td,
[data-color-mode] body.luliy-minimal .luliy-chron-month-cell,
[data-color-mode] body.luliy-minimal .luliy-chron-table tbody td,
[data-color-mode] body.luliy-minimal .luliy-chron-table thead th {
  color: #1c1c1e !important;
  -webkit-text-fill-color: #1c1c1e !important;
  background: transparent !important;
  border: 1px solid #3a3a3a !important;
  text-shadow: none !important;
}

/* 归档列表文字 */
[data-color-mode] body.luliy-minimal .luliy-arch-name { color:#1c1c1e !important; -webkit-text-fill-color:#1c1c1e !important; }
[data-color-mode] body.luliy-minimal .luliy-arch-date { color:#8c8c8c !important; -webkit-text-fill-color:#8c8c8c !important; }

/* Tab 文字 */
[data-color-mode] body.luliy-minimal .luliy-arch-tab,
[data-color-mode] body.luliy-minimal .luliy-chron-cat-tab,
[data-color-mode] body.luliy-minimal .luliy-chron-year-tab { color:#8c8c8c !important; -webkit-text-fill-color:#8c8c8c !important; }
[data-color-mode] body.luliy-minimal .luliy-arch-tab.is-active,
[data-color-mode] body.luliy-minimal .luliy-chron-cat-tab.is-active,
[data-color-mode] body.luliy-minimal .luliy-chron-year-tab.is-active { color:#1c1c1e !important; -webkit-text-fill-color:#1c1c1e !important; }

/* ════════ v4 终极方案：极简模式下重定义所有主题色变量为黑/灰 ════════
   赛博的标题/表头/链接大量用 var(--th-accent) var(--th-h1) 等，
   与其逐个覆盖，不如直接把这些变量在极简模式下全设成黑灰，
   所有引用它们的地方自动变成极简配色。这是最干净的根治。 */
[data-color-mode] body.luliy-minimal,
body.luliy-minimal {
  --th-accent: #1c1c1e !important;
  --th-accent-soft: rgba(28,28,30,0.08) !important;
  --th-accent-hover: rgba(28,28,30,0.15) !important;
  --th-h1: #1c1c1e !important;
  --th-h2: #1c1c1e !important;
  --th-h3: #1c1c1e !important;
  --th-h4: #1c1c1e !important;
  --th-strong: #1c1c1e !important;
  --th-h1-border: none !important;
  --th-h2-bl: none !important;
  --th-h2-bg: transparent !important;
  --luliy-glass-opacity: 0 !important;
}

/* ════════ v5 暴力覆盖：html 前缀拉满特异性，强制标题/表头黑色 ════════ */
html body.luliy-minimal .luliy-chron-title,
html body.luliy-minimal .luliy-arch-title,
html body.luliy-minimal .luliy-book-title,
html body.luliy-minimal .luliy-chron-table th,
html body.luliy-minimal .luliy-chron-table thead th,
html body.luliy-minimal .luliy-chron-table td,
html body.luliy-minimal .luliy-chron-month-cell,
html body.luliy-minimal .luliy-arch-year {
  color: #1c1c1e !important;
  -webkit-text-fill-color: #1c1c1e !important;
  text-fill-color: #1c1c1e !important;
  background: transparent !important;
  background-image: none !important;
  -webkit-background-clip: border-box !important;
  background-clip: border-box !important;
  text-shadow: none !important;
}
html body.luliy-minimal .luliy-chron-title,
html body.luliy-minimal .luliy-arch-title,
html body.luliy-minimal .luliy-book-title,
html body.luliy-minimal .luliy-arch-year {
  font-family: 'Noto Serif SC', Georgia, serif !important;
}
