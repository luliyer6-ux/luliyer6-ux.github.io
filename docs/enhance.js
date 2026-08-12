/* enhance.js - Luliy Blog v10
   Modules:
   00  Homepage Hero (first-visit full-screen, animation sequence)
   01  localStorage init
   02  Progress bar
   03  Dynamic title
   04  Uptime counter
   05  Dark-mode ripple (from click origin)
   06  Static background (particles removed)
   07  Web Audio SFX
   08  Click sparks
   09  Hero cluster (avatar + name + clock)
   10  Hero banner (homepage scroll-fold)
   11  Tag page search toolbar
   12  Image lightbox
   13  Floating toolbar + unified sink (6 themes) + reading prefs + music + extras
   14  Home card rebuild (grid/list toggle + year grouping + skeleton)
   15  macOS code block strip (+ line numbers)
   16  Sakura — heart petals (sakuraPlus, image-based)
   17  ArticleTOC scroll-spy + reading progress ring (back-to-top)
   18  Mobile nav hamburger + dropdown
   19  Favorites page front-end lock (progressive reveal)
   20  Homepage bottom gallery banner (grid + custom images)
   21  Post page init (series nav + scroll memory + in-page search)
   22  Index page init (archive: timeline + calendar)
   23  Tag cloud page
   24  In-page article search overlay
   25  Mouse trail (theme cursor) + fireflies
   26  View Transitions (cross-page fade)
   27  Main entry
*/
(function (root) {
  'use strict';

  /* ════════════════════════════════════════════════════════
     SITE OPTIONS — edit these to customise
  ════════════════════════════════════════════════════════ */
  var LULIY_OPTS = {
    /* Homepage bottom gallery: 1 image = banner, 2+ = grid. */
    galleryImages: [
      '/static/img/banner.svg'
    ],
    galleryText: '\u6211\u5c06\u65e0\u9650\u8fdb\u6b65',

    /* ★ Site identity */
    siteName: '\u0394\u03b9\u03ac\u039d\u03bf\u03c5\u03c2',   /* ΔιάΝους — shown top-left, in drawer, etc. */
    /* 副标题，来自用户上传的赛博朋克粒子页面，只在首页 brand 下方显示 */
    siteSubtitle: '\u0391\u03bc\u03c6\u03b9\u03c3\u03b2\u03ae\u03c4\u03b7\u03c3\u03b5. \u039a\u03b1\u03c4\u03b1\u03bd\u03cc\u03b7\u03c3\u03b5. \u0394\u03b7\u03bc\u03b9\u03bf\u03cd\u03c1\u03b3\u03b7\u03c3\u03b5.',

    /* ★ Loading splash image (shown briefly while the site loads) */
    /* ★ Loading splash：不再用图片，文字内容取自 siteName */
    splashMaxMs: 1500,   /* 显示这么久后自动淡出 */

    /* Homepage full-screen Hero (scroll down to enter). No text now —
       just the welcome image + a scroll-down hint. */
    heroImage: '/static/img/banner.svg',
    heroTitle: '',
    heroSubtitle: '',
    heroHint: '\u2193',
    heroBadge: '',

    /* ★ Homepage category cards — 6 张，2 行 3 列。
       Each links to tag.html#<label> which shows only that category's posts.
       label MUST match the GitHub issue label name exactly. */
    categoryCards: [
      {
        label: 'Study',
        title: 'STUDY',
        kicker: '\u5b66\u4e60',          /* 学习 */
        desc: '\u77e5\u8bc6\u3001\u7b14\u8bb0\u4e0e\u6280\u672f\u63a2\u7d22\u3002',  /* 知识、笔记与技术探索。 */
        image: 'https://free.picui.cn/free/2026/06/26/6a3e9742e60fe.png'
      },
      {
        label: 'Journal',
        title: 'JOURNAL',
        kicker: '\u65e5\u5fd7',          /* 日志 */
        desc: '\u751f\u6d3b\u3001\u8bb0\u5f55\u4e0e\u70b9\u6ef4\u3002',          /* 生活、记录与点滴。 */
        image: 'https://free.picui.cn/free/2026/06/26/6a3e97394d005.png'
      },
      {
        label: 'Musings',
        title: 'MUSINGS',
        kicker: '\u968f\u7b14',          /* 随笔 */
        desc: '\u601d\u8003\u3001\u611f\u609f\u4e0e\u5076\u5f97\u3002',            /* 思考、感悟与偶得。 */
        image: 'https://free.picui.cn/free/2026/06/26/6a3e973669742.png'
      },
      {
        label: 'Guidebook',
        title: 'GUIDEBOOK',
        kicker: '\u6307\u5357',          /* 指南 */
        desc: '\u672c\u7ad9\u4f7f\u7528\u4e0e\u914d\u7f6e\u6307\u5357\u3002',      /* 本站使用与配置指南。 */
        image: 'https://free.picui.cn/free/2026/06/26/6a3e9736185b3.png'
      },
      {
        label: 'Library',
        title: 'LIBRARY',
        kicker: '\u85cf\u4e66',          /* 藏书 */
        desc: '\u4e66\u7c4d\u4e0e\u8d44\u6599\u6536\u85cf\u3002',                /* 书籍与资料收藏。 */
        image: 'https://free.picui.cn/free/2026/06/26/6a3e9733e7821.png'
      },
      {
        label: 'AI',
        title: 'AI',
        kicker: '\u4eba\u5de5\u667a\u80fd',  /* 人工智能 */
        desc: '\u6a21\u578b\u3001\u5de5\u5177\u4e0e\u5b9e\u8df5\u8bb0\u5f55\u3002',  /* 模型、工具与实践记录。 */
        image: 'https://free.picui.cn/free/2026/06/26/6a3e973303cdc.png'
      }
    ],
    /* "more" button under the cards → archive page */
    categoryMoreHref: 'archive.html',

    /* APlayer mini player (top-left, all pages, autoplay, default folded) */
    aplayer: {
      name:   'echos',
      artist: 'Luliy',
      url:    'https://raw.githubusercontent.com/luliyer6-ux/luliyer6-ux.github.io/refs/heads/main/static/echos.mp3',
      cover:  'https://free.picui.cn/free/2026/06/26/6a3e9742e60fe.png'
    },

    /* Favorites page lock — SHA-256 of the password (121383). */
    favoritesHash: 'c9c9ed97be82f3ed62e9d127e4df48397549f81ba53a07f5639b68987552ce21',
    favoritesPathMatch: /favorites/i,

    homeUrl: '/'
  };

  /* ---- Utilities ------------------------------------------ */
  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---- Safe localStorage wrappers ---------------------------
     localStorage.setItem/getItem can throw (Safari private mode,
     quota exceeded, storage disabled by the user/browser policy,
     etc). Previously ~30 call sites called localStorage directly
     with no try/catch — if one threw inside a click/slider handler
     (not inside an init function wrapped by safe()), that handler
     would silently stop working with no visible error. All
     localStorage access now goes through these two so a storage
     failure never breaks a feature — it just no-ops / falls back
     to null, matching the existing "missing key" behaviour. */
  function _lsGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function _lsSet(key, val) {
    try { window.localStorage.setItem(key, val); return true; } catch (e) { return false; }
  }

  /* ---- Shared resize dispatcher ------------------------------
     There were 7 separate `window.addEventListener('resize', ...)`
     calls scattered across modules (nav positioning, sakura canvas
     sizing, hero-scroll measurement, etc). `resize` fires many times
     per second during a manual window drag, so all 7 handlers were
     each running independently on every tick — real layout-thrash
     risk. Modules now register via _luliyOnResize(fn) instead of
     adding their own listener; there is exactly one native listener,
     and all registered callbacks run together, batched to one
     requestAnimationFrame per resize tick. */
  var _resizeCallbacks = [];
  var _resizeRAF = null;
  function _luliyOnResize(fn) {
    _resizeCallbacks.push(fn);
  }
  window.addEventListener('resize', function () {
    if (_resizeRAF) return;
    _resizeRAF = requestAnimationFrame(function () {
      _resizeRAF = null;
      for (var i = 0; i < _resizeCallbacks.length; i++) {
        try { _resizeCallbacks[i](); } catch (e) {}
      }
    });
  }, { passive: true });

  /* zoom 坐标校正（见下）——供所有用鼠标坐标做 fixed 定位的效果使用 */

  /* ★ 需求②：点击效果全局跟鼠标——zoom 坐标校正。
     页面设了 html{zoom:1.1}，导致 event.clientX/Y 和 fixed 元素定位之间
     存在 1.1 倍偏差（越往右偏得越多，典型线性偏移）。
     所有用鼠标坐标做 fixed 定位的地方（点击炸开、鼠标拖尾等）
     都应先调用 zoomPos(clientX, clientY) 获取校正后坐标。 */
  function getZoomFactor() {
    try {
      /* 读取 html 元素实际的 zoom 值（CSS zoom 不反映在 devicePixelRatio 里） */
      var z = parseFloat(
        window.getComputedStyle(document.documentElement).zoom || '1'
      );
      return isFinite(z) && z > 0 ? z : 1;
    } catch (e) { return 1; }
  }
  function zoomPos(cx, cy) {
    var z = getZoomFactor();
    return { x: cx / z, y: cy / z };
  }

  function isIndexPage() {
    return location.pathname === '/' ||
      location.pathname === '/index.html' ||
      location.pathname === '';
  }

  /* Resolve + directly set the colour mode (no page jump, instant). */
  function _luliyResolveMode() {
    var m = document.documentElement.getAttribute('data-color-mode') || 'light';
    if (m === 'auto') {
      m = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? 'dark' : 'light';
    }
    return m;
  }
  function _luliySetMode(mode) {
    var htmlEl = document.documentElement;
    if (_luliyResolveMode() === mode) return;
    /* Directly flip the attribute + Gmeek's storage key — no reload. */
    htmlEl.setAttribute('data-color-mode', mode);
    try { _lsSet('meek_theme', mode); } catch (e) {}
    /* Keep Gmeek's own <body> class in sync if it uses one. */
    try {
      document.body.setAttribute('data-color-mode', mode);
    } catch (e) {}
    if (root._luliyThemeRipple) root._luliyThemeRipple(
      window.innerWidth / 2, window.innerHeight / 2);
  }
  function _luliyToggleMode() {
    _luliySetMode(_luliyResolveMode() === 'dark' ? 'light' : 'dark');
  }
  root._luliySetMode = _luliySetMode;
  root._luliyToggleMode = _luliyToggleMode;
  root._luliyResolveMode = _luliyResolveMode;
  function isArchivePage() {
    /* ★ 精确匹配 archive.html，不用宽松的 includes('archive')——
       否则 URL 里凑巧含 archive 的普通文章会被误判成归档页。 */
    return /(^|\/)archive(\.html)?$/i.test(location.pathname);
  }
  function fetchPosts() {
    function norm(data) {
      if (Array.isArray(data)) return data;
      if (data && typeof data === 'object') {
        var colorDict = data.labelColorDict || {};
        return Object.keys(data)
          .filter(function (k) { return k !== 'labelColorDict'; })
          .map(function (k) {
            var p = data[k] || {};
            if (typeof p === 'string') p = { postTitle: p };
            var rawLabels = p.labels || p.tags || [];
            /* Multi-level pinning: 'pinned' = level 1; 'pinned-2', 'pinned-3'
               sort higher. Lower number = higher position. */
            var pinLevel = 0;
            rawLabels.forEach(function (lbl) {
              var m = /^pinned(?:-(\d+))?$/.exec(lbl);
              if (m) pinLevel = Math.max(pinLevel, m[1] ? parseInt(m[1], 10) : 1);
            });
            var labels = rawLabels.map(function (lbl) {
              return {
                name: lbl,
                color: (colorDict[lbl] || '0969da').replace(/^#/, '')
              };
            });
            return {
              title: p.postTitle || p.title || p.name || k,
              link:  p.postUrl  || p.link  || p.url  || ('post/' + k + '.html'),
              created: p.createdDate || p.created || p.date || '',
              labels: labels,
              pinned: pinLevel > 0,
              pinLevel: pinLevel
            };
          });
      }
      return [];
    }
    var tryUrls = [location.origin + '/postList.json', '/postList.json'];
    function tryNext(urls) {
      if (!urls.length) return Promise.resolve([]);
      return fetch(urls[0], { cache: 'no-store' })
        .then(function (r) { if (!r.ok) throw 0; return r.json(); })
        .catch(function () { return tryNext(urls.slice(1)); });
    }
    return tryNext(tryUrls).then(norm);
  }

  /* Relative time: 今天 / 3天前 / 2个月前 / 1年前 */
  function relativeTime(dateStr) {
    if (!dateStr) return '';
    var t = new Date(String(dateStr).slice(0, 10).replace(/-/g, '/')).getTime();
    if (isNaN(t)) return '';
    var d = Date.now() - t;
    if (d < 0) return '';
    var days = Math.floor(d / 86400000);
    if (days === 0) return '\u4eca\u5929';
    if (days < 30) return days + '\u5929\u524d';
    if (days < 365) return Math.floor(days / 30) + '\u4e2a\u6708\u524d';
    return Math.floor(days / 365) + '\u5e74\u524d';
  }

  /* ---- 00  Welcome splash (animation sequence) ------------- */
  /* ---- 00  Homepage Hero (full-screen, scroll to enter) --- */
  /* ---- APlayer — draggable mini ball, dark sync, add URL ─────── */
  function initAPlayer() {
    if (document.getElementById('luliy-aplayer')) return;
    var cfg = LULIY_OPTS.aplayer;
    if (!cfg || !cfg.url) return;

    var AKEY = 'luliy-aplayer-state';
    var APOS = 'luliy-aplayer-pos';
    var ALIST = 'luliy-aplayer-list';

    /* Drag state */
    var dragging = false, _dx = 0, _dy = 0, _ox = 0, _oy = 0;

    /* Position: restored from localStorage or default top-left */
    function loadPos() {
      try { return JSON.parse(_lsGet(APOS) || 'null'); } catch(e){ return null; }
    }
    function savePos(x, y) {
      try { _lsSet(APOS, JSON.stringify({x:x, y:y})); } catch(e){}
    }

    /* Track list (default + user-added) */
    function loadTracks() {
      /* ★ 默认曲库：在这里维护「出厂曲目」，用户可在播放器里再增删 */
      var base = [
        { name: cfg.name||'echos', artist: cfg.artist||'Luliy', url: cfg.url, cover: cfg.cover||'' }
      ];
      try {
        var extra = JSON.parse(_lsGet(ALIST) || '[]');
        if (Array.isArray(extra)) return base.concat(extra);
      } catch(e) {}
      return base;
    }
    function saveTracks(extraList) {
      try { _lsSet(ALIST, JSON.stringify(extraList)); } catch(e) {}
    }

    /* Wrapper that takes full position control */
    var wrap = document.createElement('div');
    wrap.id = 'luliy-aplayer';
    var pos = loadPos();
    /* ★ 默认停靠：右上角（避开左上角的 ☰「更多」按钮）；完整播放器较宽，靠右更合适 */
    var defX = (window.innerWidth > 768) ? (window.innerWidth - 340) : 12;
    var defY = 70;
    wrap.style.left = (pos ? pos.x : Math.max(8, defX)) + 'px';
    wrap.style.top  = (pos ? pos.y : defY) + 'px';
    document.body.appendChild(wrap);

    /* ── Drag logic (mouse + touch) ──────────────────────── */
    function onDragStart(ex, ey) {
      dragging = true;
      _ox = parseInt(wrap.style.left) || 16;
      _oy = parseInt(wrap.style.top)  || 76;
      _dx = ex - _ox; _dy = ey - _oy;
      wrap.classList.add('is-dragging');
    }
    function onDragMove(ex, ey) {
      if (!dragging) return;
      var nx = Math.max(0, Math.min(window.innerWidth  - wrap.offsetWidth,  ex - _dx));
      var ny = Math.max(0, Math.min(window.innerHeight - wrap.offsetHeight, ey - _dy));
      wrap.style.left = nx + 'px';
      wrap.style.top  = ny + 'px';
    }
    function onDragEnd() {
      if (!dragging) return;
      dragging = false;
      wrap.classList.remove('is-dragging');
      /* ★ 边缘吸附：松手后自动吸到最近的左/右/顶部边缘 */
      var W = window.innerWidth, H = window.innerHeight;
      var w = wrap.offsetWidth, h = wrap.offsetHeight;
      var x = parseInt(wrap.style.left) || 0;
      var y = parseInt(wrap.style.top)  || 0;
      var MARGIN = 10;
      var distLeft = x, distRight = W - (x + w), distTop = y;
      /* 取最近的边吸附（左/右/顶三选一） */
      var minD = Math.min(distLeft, distRight, distTop);
      if (minD === distTop) {
        y = MARGIN;
        /* ★ 与左上角 ☰ 错开：若吸顶后会盖住 ☰（左上 ~56px 区域），则右移让位 */
        var ham = document.getElementById('luliy-ham-btn');
        var hamVisible = ham && getComputedStyle(ham).display !== 'none';
        if (hamVisible && x < 64) x = 64;
      } else if (minD === distLeft) {
        x = MARGIN;
        /* 吸左时若顶部太高会和 ☰ 竖直重叠，则下移让位 */
        if (y < 60) {
          var ham2 = document.getElementById('luliy-ham-btn');
          if (ham2 && getComputedStyle(ham2).display !== 'none') y = 64;
        }
      } else {
        x = W - w - MARGIN;
      }
      x = Math.max(MARGIN, Math.min(W - w - MARGIN, x));
      y = Math.max(MARGIN, Math.min(H - h - MARGIN, y));
      wrap.style.transition = 'left 0.25s cubic-bezier(.2,.8,.3,1), top 0.25s cubic-bezier(.2,.8,.3,1)';
      wrap.style.left = x + 'px';
      wrap.style.top  = y + 'px';
      setTimeout(function () { wrap.style.transition = ''; }, 300);
      savePos(x, y);
      /* ★ 同步圆形按钮：收起后会出现在播放器最后停留的位置 */
      var apFabEl = document.getElementById('luliy-ap-fab');
      if (apFabEl) { apFabEl.style.left = x + 'px'; apFabEl.style.top = y + 'px'; }
    }
    wrap.addEventListener('mousedown', function(e) {
      if (e.target.closest('input,button,a,.aplayer-controller,.aplayer-list')) return;
      e.preventDefault(); var p = zoomPos(e.clientX, e.clientY); onDragStart(p.x, p.y);
    });
    document.addEventListener('mousemove', function(e) { var p = zoomPos(e.clientX, e.clientY); onDragMove(p.x, p.y); });
    document.addEventListener('mouseup',   onDragEnd);
    wrap.addEventListener('touchstart', function(e) {
      if (e.target.closest('input,button,a,.aplayer-controller,.aplayer-list')) return;
      var t = e.touches[0]; var p = zoomPos(t.clientX, t.clientY); onDragStart(p.x, p.y);
    }, { passive: true });
    document.addEventListener('touchmove', function(e) {
      if (!dragging) return;
      /* 正在拖拽播放器面板时阻止页面跟着滚动（需要 passive:false 才能 preventDefault） */
      if (e.cancelable) e.preventDefault();
      var t = e.touches[0]; var p = zoomPos(t.clientX, t.clientY); onDragMove(p.x, p.y);
    }, { passive: false });
    document.addEventListener('touchend', onDragEnd, { passive: true });

    function boot() {
      if (!window.APlayer) return;
      try {
        var tracks = loadTracks();
        var saved = null;
        try { saved = JSON.parse(_lsGet(AKEY) || 'null'); } catch(e){}
        var isDark = document.documentElement.getAttribute('data-color-mode') === 'dark';

        var ap = new window.APlayer({
          container: wrap,
          /* ★ 恢复原生完整样式：非 mini，显示进度条/音量/播放列表 */
          fixed: false, mini: false,
          autoplay: true,
          theme: isDark ? '#1c1530' : '#ffffff',
          preload: 'auto', volume: 0.6,
          listFolded: false,      /* 默认展开播放列表 */
          listMaxHeight: '160px',
          order: 'random',        /* ★ 随机播放 */
          loop: 'all',
          audio: tracks
        });
        root._luliyAPlayer = ap;
        root._luliyAPlayerReload = function() {
          try { ap.list.clear(); loadTracks().forEach(function(t){ ap.list.add(t); }); } catch(e){}
        };

        /* ── Cross-page resume ────────────────────────────── */
        var au = ap.audio;
        function persist() {
          try { _lsSet(AKEY, JSON.stringify({
            pos: au && au.currentTime || 0,
            playing: au ? !au.paused : false, t: Date.now()
          })); } catch(e){}
        }
        if (saved && saved.pos > 0 && au) {
          var seekOnce = function() {
            try { if (saved.pos < au.duration) au.currentTime = saved.pos; } catch(e){}
            au && au.removeEventListener('loadedmetadata', seekOnce);
          };
          if (au.readyState >= 1) seekOnce();
          else au.addEventListener('loadedmetadata', seekOnce);
        }
        if (au) {
          au.addEventListener('timeupdate', function() {
            var now = Date.now();
            if (!au._ls || now - au._ls > 3000) { au._ls = now; persist(); }
          });
          au.addEventListener('pause', persist);
          au.addEventListener('play', persist);
        }
        window.addEventListener('pagehide', persist);
        window.addEventListener('beforeunload', persist);

        var shouldPlay = !saved || saved.playing !== false;
        if (shouldPlay) {
          var p = ap.play && ap.play();
          if (p && p.catch) p.catch(function() {
            var once = function() { try { ap.play(); } catch(e){} };
            document.addEventListener('click', once, { once: true });
            document.addEventListener('touchstart', once, { once: true, passive: true });
          });
        } else { try { ap.pause(); } catch(e){} }

        /* ── 工具栏：添曲 / 删曲 / 随机 ───────────────────────── */
        if (!wrap.querySelector('.luliy-ap-tools')) {
          var tools = document.createElement('div');
          tools.className = 'luliy-ap-tools';

          /* ① 添加音乐 */
          var addBtn = document.createElement('button');
          addBtn.type = 'button'; addBtn.className = 'luliy-ap-tool luliy-ap-add';
          addBtn.textContent = '+'; addBtn.title = '添加音乐直链';
          addBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var url = window.prompt('输入音乐直链 URL（mp3/m4a 等）：');
            if (!url) return;
            url = url.trim(); if (!url) return;
            var name = window.prompt('歌曲名称（可选）：') || '自定义';
            try {
              var list = JSON.parse(_lsGet(ALIST) || '[]');
              if (!Array.isArray(list)) list = [];
              var track = { name: name, artist: 'Luliy', url: url, cover: cfg.cover || '' };
              list.push(track);
              saveTracks(list);
              ap.list.add(track);
              ap.list.switch(ap.list.audios.length - 1);
              ap.play();
            } catch(err) { try { console.warn('[luliy] add track failed', err); } catch(e2){} }
          });

          /* ② 删除当前曲目（默认曲库前两首不可删） */
          var BASE_COUNT = 2;
          var delBtn = document.createElement('button');
          delBtn.type = 'button'; delBtn.className = 'luliy-ap-tool luliy-ap-del';
          delBtn.textContent = '−'; delBtn.title = '删除当前曲目';
          delBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            try {
              var idx = ap.list.index;
              if (idx < BASE_COUNT) { window.alert('默认曲目不可删除'); return; }
              ap.list.remove(idx);
              var list = JSON.parse(_lsGet(ALIST) || '[]');
              var extraIdx = idx - BASE_COUNT;
              if (extraIdx >= 0 && extraIdx < list.length) {
                list.splice(extraIdx, 1);
                saveTracks(list);
              }
            } catch(err) {}
          });

          /* ③ 随机/顺序切换 */
          var shuffleBtn = document.createElement('button');
          shuffleBtn.type = 'button'; shuffleBtn.className = 'luliy-ap-tool luliy-ap-shuffle';
          shuffleBtn.title = '随机播放';
          shuffleBtn.innerHTML = '&#x1F500;';   /* 🔀 */
          var _shuffle = false;
          shuffleBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            _shuffle = !_shuffle;
            shuffleBtn.style.opacity = _shuffle ? '1' : '0.45';
            shuffleBtn.title = _shuffle ? '已开启随机' : '随机播放';
            /* APlayer 没有直接的 shuffle API，用 setMode 模拟 */
            try {
              if (ap.mode !== undefined) ap.setMode(_shuffle ? 'random' : 'list');
            } catch(err) {}
          });
          shuffleBtn.style.opacity = '0.45';

          tools.appendChild(addBtn);
          tools.appendChild(delBtn);
          tools.appendChild(shuffleBtn);
          wrap.appendChild(tools);
        }

        /* ── 键盘快捷键（仅播放器展开时生效，避免和全局冲突）── */
        document.addEventListener('keydown', function(e) {
          if (!apOpen) return;           /* 播放器收起时不响应 */
          if (e.target && e.target.tagName && ['INPUT','TEXTAREA','SELECT'].indexOf(e.target.tagName) !== -1) return;
          try {
            if (e.code === 'Space' || e.keyCode === 32) { e.preventDefault(); ap.toggle(); }
            if (e.code === 'ArrowRight' || e.keyCode === 39) ap.skipForward();
            if (e.code === 'ArrowLeft'  || e.keyCode === 37) ap.skipBack();
          } catch(err) {}
        });

        /* ── ★ 圆形折叠按钮（参照目录 #luliy-toc-fab 的交互方式）：
           默认收起成一个圆形按钮，点击展开成完整播放器（拖拽/歌词全都还在），
           再点一次按钮、点击外部空白处或按 Esc 都能收起回圆形。
           音频本身不受展开/收起影响，收起时依旧在后台播放。 */
        if (!document.getElementById('luliy-ap-fab')) {
          var apFab = document.createElement('button');
          apFab.id = 'luliy-ap-fab';
          apFab.type = 'button';
          apFab.setAttribute('aria-label', '\u97f3\u4e50\u64ad\u653e\u5668');
          apFab.textContent = '\u266A';   /* ♪ */
          apFab.classList.add('is-visible');

          /* ★ 圆形按钮也能拖动，并且和展开后的播放器位置双向同步：
             拖按钮 → 下次点开播放器会出现在按钮当前位置；
             拖播放器（原有逻辑）→ 收起后按钮也会出现在播放器最后停留的位置。
             两者共用同一份位置存储（APOS），只是各自的默认初始值不同。 */
          var fabPos = loadPos();
          var fabDefX = window.innerWidth - 22 - 44;
          var fabDefY = window.innerHeight - 268 - 44;
          apFab.style.left = (fabPos ? fabPos.x : fabDefX) + 'px';
          apFab.style.top  = (fabPos ? fabPos.y : fabDefY) + 'px';

          var fabDragging = false, _fdx = 0, _fdy = 0;
          function onFabDragStart(ex, ey) {
            fabDragging = true;
            var ox = parseInt(apFab.style.left) || 0;
            var oy = parseInt(apFab.style.top)  || 0;
            _fdx = ex - ox; _fdy = ey - oy;
            apFab.classList.add('is-dragging');
          }
          function onFabDragMove(ex, ey) {
            if (!fabDragging) return;
            var nx = Math.max(0, Math.min(window.innerWidth  - apFab.offsetWidth,  ex - _fdx));
            var ny = Math.max(0, Math.min(window.innerHeight - apFab.offsetHeight, ey - _fdy));
            apFab.style.left = nx + 'px';
            apFab.style.top  = ny + 'px';
          }
          function onFabDragEnd() {
            if (!fabDragging) return;
            fabDragging = false;
            apFab.classList.remove('is-dragging');
            var x = parseInt(apFab.style.left) || 0;
            var y = parseInt(apFab.style.top)  || 0;
            /* 同步给播放器：下次展开就出现在这里 */
            wrap.style.left = x + 'px';
            wrap.style.top  = y + 'px';
            savePos(x, y);
          }
          var _fabMoved = false;
          apFab.addEventListener('mousedown', function (e) {
            e.preventDefault();
            _fabMoved = false;
            var p = zoomPos(e.clientX, e.clientY);
            onFabDragStart(p.x, p.y);
          });
          document.addEventListener('mousemove', function (e) {
            if (!fabDragging) return;
            _fabMoved = true;
            var p = zoomPos(e.clientX, e.clientY);
            onFabDragMove(p.x, p.y);
          });
          document.addEventListener('mouseup', onFabDragEnd);
          apFab.addEventListener('touchstart', function (e) {
            _fabMoved = false;
            var t = e.touches[0];
            var p = zoomPos(t.clientX, t.clientY);
            onFabDragStart(p.x, p.y);
          }, { passive: true });
          document.addEventListener('touchmove', function (e) {
            if (!fabDragging) return;
            /* 正在拖拽悬浮按钮时阻止页面跟着滚动 */
            if (e.cancelable) e.preventDefault();
            _fabMoved = true;
            var t = e.touches[0];
            var p = zoomPos(t.clientX, t.clientY);
            onFabDragMove(p.x, p.y);
          }, { passive: false });
          document.addEventListener('touchend', onFabDragEnd);

          var APOPEN = 'luliy-aplayer-open';
          var apOpen = false;
          function setApOpen(v) {
            apOpen = v;
            wrap.classList.toggle('is-open', apOpen);
            apFab.classList.toggle('is-active', apOpen);
            /* ★ 修复播放器展开后和圆形按钮重叠的问题：两者共用同一个
               坐标点（展开时"从按钮位置长出来"），player 展开后体积
               比按钮大得多，按钮原地不隐藏的话会糊在展开后面板的
               左上角。展开时把按钮隐藏，收起后再让它重新出现。 */
            apFab.classList.toggle('is-hidden-while-open', apOpen);
            try { _lsSet(APOPEN, apOpen ? '1' : '0'); } catch (e) {}
          }
          apFab.addEventListener('click', function (e) {
            e.stopPropagation();
            if (_fabMoved) { _fabMoved = false; return; }   /* 刚拖动完不算点击，避免拖完误触展开 */
            setApOpen(!apOpen);
            playSfx('click');
          });
          document.addEventListener('click', function (e) {
            if (!apOpen) return;
            if (e.target === apFab || apFab.contains(e.target)) return;
            if (wrap.contains(e.target)) return;
            setApOpen(false);
          });
          document.addEventListener('keydown', function (e) {
            if (apOpen && (e.key === 'Escape' || e.keyCode === 27)) { setApOpen(false); playSfx('click'); }
          });
          document.body.appendChild(apFab);

          /* 默认收起；只有用户上次主动展开过才恢复展开状态 */
          var wasOpen = false;
          try { wasOpen = _lsGet(APOPEN) === '1'; } catch (e) {}
          setApOpen(wasOpen);
        }

      } catch(e) { console.warn('[luliy] APlayer failed', e); }
    }

    if (window.APlayer) { boot(); return; }
    var sc = document.createElement('script');
    sc.src = 'https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js';
    sc.onload = boot;
    document.head.appendChild(sc);
  }

  /* ---- 00 欢迎页（Hero）已删除 --------------------------
     原因：会反复出现"第一次显示、之后又不出现"的不一致问题，
     用户决定彻底去掉。主页现在打开即直接显示六张分类卡片。
     加载动画（#luliy-splash，居中荧光 ΔιάΝους 文字）是另一个独立
     功能，与欢迎页无关，予以保留。 */


  /* ---- 00b  Homepage category cards (Rockstar-style, 3 across) ----
     Three big cards (Study / Journal / Musings). Each links to
     tag.html#<label>, which we restyle into a 3-column grid showing only
     that category's posts. A "more →" button under them goes to archive. */
  function initCategoryCards() {
    /* Only on the homepage, only once, only if there's something to show */
    if (!isIndexPage()) return;
    if (document.getElementById('luliy-cats')) return;
    var items = LULIY_OPTS.categoryCards;
    if (!items || !items.length) return;

    /* ★ 标记首页 body：CSS 据此隐藏 Gmeek 原生的副标题与文章列表，
       只留下面这六张分类卡片，并让它们在视口里垂直居中。 */
    document.body.classList.add('luliy-home');

    var section = document.createElement('section');
    section.id = 'luliy-cats-wrap';

    var grid = document.createElement('div');
    grid.id = 'luliy-cats';

    items.forEach(function (it) {
      var card = document.createElement('a');
      card.className = 'luliy-cat-card';
      /* tag.html uses #<label> to filter; encode in case of spaces */
      card.href = 'tag.html#' + encodeURIComponent(it.label || '');
      /* ★ 图片改用 CSS 变量传给 ::before 伪元素（见 enhance.css），
         这样图片能在悬停时独立缩放/加滤镜，不会带着文字一起变形。
         渐变遮罩也挪到了 ::after 里统一处理，这里不用再拼了。 */
      card.style.setProperty('--cat-img', 'url("' + it.image + '")');

      var kicker = document.createElement('span');
      kicker.className = 'luliy-cat-kicker';
      kicker.textContent = it.kicker || '';

      var title = document.createElement('h3');
      title.className = 'luliy-cat-title';
      title.textContent = it.title || it.label || '';

      var desc = document.createElement('p');
      desc.className = 'luliy-cat-desc';
      desc.textContent = it.desc || '';

      card.appendChild(kicker);
      card.appendChild(title);
      card.appendChild(desc);
      grid.appendChild(card);
    });

    section.appendChild(grid);

    /* "more →" button, bottom-right, → archive */
    var moreRow = document.createElement('div');
    moreRow.id = 'luliy-cats-more-row';
    var more = document.createElement('a');
    more.id = 'luliy-cats-more';
    more.href = LULIY_OPTS.categoryMoreHref || 'archive.html';
    more.innerHTML = 'more <span aria-hidden="true">\u2192</span>';
    moreRow.appendChild(more);
    section.appendChild(moreRow);

    /* Insert right before #content (hero 已删除，不需要再判断它) */
    var content = document.getElementById('content');
    if (content && content.parentNode) {
      content.parentNode.insertBefore(section, content);
    } else {
      document.body.appendChild(section);
    }
  }

  /* ---- 01  localStorage init ------------------------------ */
  function initLocalStorage() {
    var defs = {
      'luliy-sfx':       (('ontouchstart' in window) || window.innerWidth < 768) ? '0' : '1',
      /* ★ 手机端（触屏或窄屏）默认关闭所有不影响阅读的动态效果——
         赛博粒子背景、樱花飘落，纯净阅读；桌面端保持开启。
         用户依然可以在设置里手动重新打开，这里只是改默认值。 */
      'luliy-sakura':    (('ontouchstart' in window) || window.innerWidth < 768) ? '0' : '1',
      'luliy-cyber':     (('ontouchstart' in window) || window.innerWidth < 768) ? '0' : '1',
      'luliy-cyber-speed': '1',      /* 0.2 ~ 3 */
      'luliy-cyber-dir':   'converge', /* converge | diverge | free */
      'luliy-cyber-style': 'classic',  /* classic | city */
      'luliy-glass-blur':    '22',     /* px，0~50 */
      'luliy-glass-opacity': '0.5',    /* 0~1 */
      'luliy-glass-hue':     '250',    /* 0~360 */
      'luliy-cat-w':        '1700',    /* 主页卡片宽度 px，900~2000，★默认再加宽 */
      'luliy-cat-h':         '338',    /* 主页卡片高度 px，220~500 */
      'luliy-article-opacity': '0.5',  /* 文章正文面板独立不透明度，0.1~0.95 */
      'luliy-fontsize':  '18',
      'luliy-sans':      '0',
      'luliy-cardview':  'grid',   /* grid | list */
      'luliy-reduce':    '0',      /* reduce motion override */
      'luliy-pbwidth':   '400'     /* postBody width delta px (default = 最大) */
    };
    Object.keys(defs).forEach(function (k) {
      if (_lsGet(k) === null) _lsSet(k, defs[k]);
    });
  }

  /* ---- Shared rAF-throttled scroll listener ---------------
     Many features react to scroll; funnel them through one
     requestAnimationFrame tick instead of N raw handlers.       */
  var _scrollFns = [], _scrollRAF = false;
  function onScrollRAF(fn) {
    _scrollFns.push(fn);
    if (_scrollFns.length === 1) {
      window.addEventListener('scroll', function () {
        if (_scrollRAF) return;
        _scrollRAF = true;
        requestAnimationFrame(function () {
          _scrollRAF = false;
          for (var i = 0; i < _scrollFns.length; i++) {
            try { _scrollFns[i](); } catch (e) {}
          }
        });
      }, { passive: true });
    }
    fn();   /* run once immediately for initial state */
  }

  /* ---- 02  Progress bar ----------------------------------- */
  function initProgressBar() {
    var bar = document.createElement('div');
    bar.id = 'luliy-progress-bar';
    document.body.appendChild(bar);
    onScrollRAF(function () {
      var st = window.scrollY || document.documentElement.scrollTop;
      var dh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      bar.style.width = (dh > 0 ? Math.round(st / dh * 100) : 0) + '%';
    });
  }

  /* ---- 03  Dynamic title ---------------------------------- */
  function initDynamicTitle() {
    var ori = document.title, t;
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        clearTimeout(t);
        document.title = '\uD83D\uDC40 \u522b\u8d70\u554a\uff0c\u6211\u8fd8\u5728\u8fdb\u6b65\uff01';
      } else {
        document.title = '\u2728 \u6b22\u8fce\u56de\u6765\uff01 ' + ori;
        t = setTimeout(function () { document.title = ori; }, 2000);
      }
    });
  }

  /* ---- 04  Uptime counter --------------------------------- */
  function initUptime() {
    var el = document.getElementById('luliy-uptime');
    if (!el) {
      el = document.createElement('div');
      el.id = 'luliy-uptime';
      document.body.appendChild(el);
    }
    var start = new Date('2026/05/30 00:00:00').getTime();
    function upd() {
      var d = Date.now() - start;
      if (d < 0) {
        el.innerHTML = '\uD83D\uDE80 \u535a\u5ba2\u5373\u5c06\u4e0a\u7ebf\uff0c\u656c\u8bf7\u671f\u5f85...';
        return;
      }
      el.innerHTML = '\uD83C\uDF31 \u672c\u7ad9\u5df2\u966a\u4f34\u4f60\u65e0\u9650\u8fdb\u6b65\uff1a' +
        Math.floor(d / 86400000) + '\u5929 ' +
        Math.floor((d % 86400000) / 3600000) + '\u5c0f\u65f6 ' +
        Math.floor((d % 3600000) / 60000) + '\u5206 ' +
        '<span style="color:#ff4444;font-weight:bold">' +
        Math.floor((d % 60000) / 1000) + '</span>\u79d2';
    }
    upd(); setInterval(upd, 1000);
  }

  /* ---- 05  Dark-mode theme ripple (from click origin) ----- */
  function initThemeRipple() {
    function ripple(ox, oy) {
      playSfx('theme');
      var old = document.getElementById('luliy-theme-ripple');
      if (old) old.remove();
      /* Use click coordinates as the ripple center; fall back to screen center */
      var cx = (typeof ox === 'number') ? ox : window.innerWidth / 2;
      var cy = (typeof oy === 'number') ? oy : window.innerHeight / 2;
      /* Max radius = distance to the farthest corner */
      var dx = Math.max(cx, window.innerWidth - cx);
      var dy = Math.max(cy, window.innerHeight - cy);
      var maxR = Math.sqrt(dx * dx + dy * dy) * 1.05;
      var isDark = document.documentElement.getAttribute('data-color-mode') === 'dark';
      var el = document.createElement('div');
      el.id = 'luliy-theme-ripple';
      el.style.cssText =
        'position:fixed;top:' + cy + 'px;left:' + cx + 'px;width:0;height:0;' +
        'border-radius:50%;background:' +
        (isDark ? 'rgba(10,20,40,0.96)' : 'rgba(255,255,255,0.96)') +
        ';pointer-events:none;z-index:99998;transform:translate(-50%,-50%) scale(0);' +
        'transition:transform 0.65s cubic-bezier(.4,0,.2,1),opacity 0.65s ease;';
      document.body.appendChild(el);
      el.getBoundingClientRect();
      el.style.width = el.style.height = (maxR * 2) + 'px';
      el.style.transform = 'translate(-50%,-50%) scale(1)';
      el.style.opacity = '0';
      setTimeout(function () { el.remove(); }, 700);
    }
    root._luliyThemeRipple = ripple;
    document.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (b && (b.innerHTML.includes('Moon') || b.innerHTML.includes('Sun') ||
        (b.title && /dark|light|theme|\u4e3b\u9898/i.test(b.title)))) {
        var p = zoomPos(e.clientX, e.clientY); ripple(p.x, p.y);
      }
    });
    setTimeout(function () {
      document.querySelectorAll('.title-right .circle').forEach(function (el) {
        if (el._luliyRipple) return;
        el._luliyRipple = true;
        el.addEventListener('click', function (e) { var p = zoomPos(e.clientX, e.clientY); ripple(p.x, p.y); });
      });
    }, 800);
  }

  /* ---- 06  Static background (particles removed) ---------- */
  /* 清理：原 initParticles() 是个从未被任何地方调用的空函数，已删除。
     动态主题粒子/流星模块（initThemeParticles）也已整体删除，
     全站背景统一为纯色 #00020c，仅保留樱花花瓣与点击火花两个特效。 */

  /* ---- 07  Web Audio SFX ---------------------------------- */
  var _actx = null;
  function getACtx() {
    if (!_actx) try { _actx = new (root.AudioContext || root.webkitAudioContext)(); } catch (e) {}
    return _actx;
  }
  function playSfx(type) {
    if (_lsGet('luliy-sfx') === '0') return;
    var ctx = getACtx(); if (!ctx) return;
    try {
      if (type === 'click') {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'square';
        o.frequency.setValueAtTime(900, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
        g.gain.setValueAtTime(0.04, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
        o.start(); o.stop(ctx.currentTime + 0.06);
      } else if (type === 'sci') {
        var o2 = ctx.createOscillator(), g2 = ctx.createGain();
        o2.connect(g2); g2.connect(ctx.destination);
        o2.type = 'sine';
        o2.frequency.setValueAtTime(440, ctx.currentTime);
        o2.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
        o2.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.22);
        g2.gain.setValueAtTime(0.06, ctx.currentTime);
        g2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
        o2.start(); o2.stop(ctx.currentTime + 0.25);
      } else if (type === 'theme') {
        [0, 0.08, 0.16].forEach(function (delay, idx) {
          var ot = ctx.createOscillator(), gt = ctx.createGain();
          ot.connect(gt); gt.connect(ctx.destination);
          ot.type = 'sine';
          ot.frequency.setValueAtTime([523, 659, 784][idx], ctx.currentTime + delay);
          gt.gain.setValueAtTime(0.05, ctx.currentTime + delay);
          gt.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + 0.18);
          ot.start(ctx.currentTime + delay);
          ot.stop(ctx.currentTime + delay + 0.18);
        });
      }
    } catch (e) {}
  }
  root._luliySfx = playSfx;

  function initSfxEvents() {
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (t.tagName === 'BUTTON' || t.tagName === 'A' || t.classList.contains('Label') ||
        t.closest('button') || t.closest('a')) playSfx('click');
    }, true);
  }

  /* ---- 08 旧的点击火花效果已删除 -----------------------------
     原 initClickSparks()（彩色圆点炸开+扩散环）被新的赛博朋克粒子
     系统（initCyberParticles，见下方）取代——点击爆炸/扩散环/故障文字
     这三个效果现在内建在那个 canvas 动画系统里。 */

  /* ════════════════════════════════════════════════════════
     08b  Cyberpunk particles — 全站背景粒子系统
     改编自用户上传的独立 HTML（赛博朋克粒子页）。原版逻辑保留：
     背景粒子向标题汇聚 + 连线 + 鼠标拖尾 + 点击爆炸/扩散环/故障文字
     + 极光色块 + 城市剪影。这里做的改动：
       · 汇聚目标从"屏幕顶部居中的独立标题"改成本站左上角 #luliy-brand
         的实际位置——不再新建一个标题，避免出现两个博客名字；
       · 加入开关 / 速度 / 方向三个设置项（存 localStorage，设置面板里调）；
       · 尊重"减弱动态效果"，开启时直接不渲染；
       · 与樱花花瓣（initSakura）各自独立、互不影响，z-index 更低，
         确保樱花飘在它前面、正文飘在更前面，层次不乱。
  ════════════════════════════════════════════════════════ */
  /* ---- 06b  Cyberpunk particles / city skyline / mouse trail / click
     sparks — REMOVED (2026-08): this was a full-viewport <canvas> redrawn
     every animation frame (background particles + parallax city buildings
     + mouse-trail particles + click-spark bursts), which was the main
     source of the "太卡了" jank, especially on lower-end / mobile devices.
     Left as permanent no-ops (rather than deleted outright) so any stray
     caller (old localStorage toggle, etc.) fails silently instead of
     throwing. */
  function stopCyberParticles() {}
  function initCyberParticles() {}
  root._luliyInitCyberParticles = initCyberParticles;
  root._luliyStopCyberParticles = stopCyberParticles;



  /* ---- 09  Navbar — rebuilt: avatar+name centred, time top-left, icons spread */
  /* 黑洞特效已删除（副标题改为导航切换按钮）。_bhActive 保留为常量，
     供 View Transitions 判断使用（永远 false，不再拦截）。 */
  var _bhActive = false;

  function initHeroCluster() {
    function tryBuild() {
      var header = document.getElementById('header'); if (!header) return false;
      if (document.getElementById('luliy-nav-rebuilt')) return true;

      /* Wait briefly for Gmeek to render nav links */
      var trProbe = header.querySelector('.title-right, [class*="title-right"]');
      var probeCount = trProbe ? trProbe.querySelectorAll('a, button, .circle').length
                               : header.querySelectorAll('a, button, .circle').length;
      if (probeCount === 0 && (tryBuild._waits || 0) < 8) {
        tryBuild._waits = (tryBuild._waits || 0) + 1;
        return false;
      }

      header.setAttribute('data-luliy-nav', '1');

      /* ── Collect nav links BEFORE hiding anything ───────── */
      var tr = header.querySelector('.title-right, [class*="title-right"]');
      var rawLinks = [];
      if (tr) rawLinks = Array.from(tr.querySelectorAll('a, button, .circle'));
      if (rawLinks.length === 0) {
        rawLinks = Array.from(header.querySelectorAll('a, button, .circle'));
      }

      /* Hide every existing child (links captured above) */
      Array.from(header.children).forEach(function (el) {
        var id = el.id || '';
        if (id === 'luliy-toolbar' || id === 'luliy-nav-rebuilt' || id === 'luliy-nav-ham') return;
        el.style.display = 'none';
      });

      /* Filter: drop RSS + about (about lives behind avatar) + circle */
      var circleBtn = null;
      var links = rawLinks.filter(function (a) {
        var id = a.id || '';
        if (id === 'luliy-nav-avatar-link' || id === 'luliy-nav-blogname') return false;
        var href = a.getAttribute('href') || '';
        if (/rss\.xml$|atom\.xml$|\/rss$|\/feed/.test(href)) return false;
        if (/\/about(\.html)?$|^about(\.html)?$/.test(href)) return false;
        if (a.classList && a.classList.contains('circle')) { circleBtn = a; return false; }
        return true;
      });
      /* Stash metadata for the mobile drawer + quick bar */
      root._luliyNavLinks = links.map(function (a) {
        return {
          href: a.getAttribute('href') || '',
          absHref: a.href || '',
          label: a.getAttribute('title') || (a.textContent || '').trim(),
          target: a.getAttribute('target') || '',
          html: a.innerHTML
        };
      });

      /* ════════ Build the new hero card (design-image layout) ════════ */
      var shell = document.createElement('div');
      shell.id = 'luliy-nav-rebuilt';

      /* ── LEFT: avatar + name + divider + time/date ───────── */
      var leftZone = document.createElement('div');
      leftZone.id = 'luliy-hero-left';

      var avatarLink = document.createElement('a');
      avatarLink.href = '/about'; avatarLink.id = 'luliy-nav-avatar-link';
      avatarLink.setAttribute('aria-label', '\u5173\u4e8e');
      var avatarImg = document.createElement('img');
      avatarImg.src = 'https://avatars.githubusercontent.com/u/177055996?u=cb497e1edb10d059b285288c93ff32dab53af1c3&v=4&size=64';
      avatarImg.id = 'luliy-nav-avatar'; avatarImg.alt = 'Luliy';
      avatarLink.appendChild(avatarImg);

      var blogName = document.createElement('a');
      blogName.href = '/'; blogName.id = 'luliy-nav-blogname';
      blogName.textContent = 'Luliy';

      var divider = document.createElement('span');
      divider.id = 'luliy-hero-divider';

      /* Time + date block (live Beijing time, UTC+8) */
      var timeBlock = document.createElement('div');
      timeBlock.id = 'luliy-hero-timeblock';
      var timeRow = document.createElement('div');
      timeRow.id = 'luliy-hero-time';
      var clockIcon = document.createElement('span');
      clockIcon.id = 'luliy-hero-clock';
      clockIcon.innerHTML = '<svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8" cy="8" r="6.4"/><path d="M8 4.4V8l2.6 1.6" stroke-linecap="round"/></svg>';
      var timeText = document.createElement('span');
      timeText.id = 'luliy-hero-time-text';
      timeRow.appendChild(clockIcon); timeRow.appendChild(timeText);
      var dateText = document.createElement('div');
      dateText.id = 'luliy-hero-date';
      timeBlock.appendChild(timeRow); timeBlock.appendChild(dateText);

      var WEEK = ['\u65e5','\u4e00','\u4e8c','\u4e09','\u56db','\u4e94','\u516d'];
      function updTime() {
        /* Beijing time = UTC+8 regardless of viewer's timezone */
        var now = new Date();
        var bj = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (8 * 3600000));
        var hh = String(bj.getHours()).padStart(2, '0');
        var mm = String(bj.getMinutes()).padStart(2, '0');
        var ss = String(bj.getSeconds()).padStart(2, '0');
        timeText.textContent = hh + ':' + mm + ':' + ss;
        dateText.textContent =
          bj.getFullYear() + ' / ' +
          String(bj.getMonth() + 1).padStart(2, '0') + ' / ' +
          String(bj.getDate()).padStart(2, '0') + '\u3000\u5468' + WEEK[bj.getDay()];
      }
      updTime(); setInterval(updTime, 1000);

      leftZone.appendChild(avatarLink);
      leftZone.appendChild(blogName);
      leftZone.appendChild(divider);
      leftZone.appendChild(timeBlock);

      /* ── CENTRE-BOTTOM: link capsule bar ─────────────────── */
      var capsule = document.createElement('div');
      capsule.id = 'luliy-hero-capsule';
      links.forEach(function (a, i) {
        if (i > 0) {
          var sep = document.createElement('span');
          sep.className = 'luliy-hero-cap-sep';
          capsule.appendChild(sep);
        }
        var c = a.cloneNode(true);
        c.classList.add('luliy-hero-cap-link');
        c.removeAttribute('id');
        c.style.display = ''; c.style.visibility = '';
        var lbl = a.getAttribute('title') || (a.textContent || '').trim();
        if (lbl) {
          c.setAttribute('aria-label', lbl);
          /* ★ 补 title：纯图标模式（窄屏文字隐藏）下，鼠标悬停仍能看到
             原生 tooltip 提示文字是什么，不靠 aria-label（那个只对屏
             幕阅读器生效，鼠标悬停不会显示）。 */
          c.setAttribute('title', lbl);
          var span = document.createElement('span');
          span.className = 'luliy-hero-cap-txt';
          span.textContent = lbl;
          c.appendChild(span);
        }
        capsule.appendChild(c);
      });

      /* 链接溢出处理改为纯 CSS 响应式降级（窄屏只显示图标，见 CSS
         section 38），不再用 JS 检测溢出/挪到下拉菜单，没有"测量
         时机不对"这类问题。 */
      var rightZone = document.createElement('div');
      rightZone.id = 'luliy-hero-right';
      /* the #luliy-toolbar pill is relocated here after it's built */
      root._luliyHeroRightSlot = rightZone;

      /* ── Native day/night circle: tuck beside the name ───── */
      if (circleBtn) {
        circleBtn.id = 'luliy-nav-circle';
        circleBtn.classList.add('luliy-hero-circle');
        circleBtn.style.display = ''; circleBtn.style.visibility = '';
        leftZone.appendChild(circleBtn);
      }

      /* ── subTitle：副标题 = 导航模式切换按钮（A套hero / B套抽屉） ───
         ★ 需求：点击副标题在「桌面hero导航」和「抽屉导航」之间切换；
            原黑洞特效已删除。切换逻辑由 root._luliyToggleNavMode 实现。 */
      var subTitleEl = document.createElement('span');
      subTitleEl.id = 'luliy-hero-subtitle';
      subTitleEl.textContent = LULIY_OPTS.heroSubtitle || '\u6211\u5c06\u65e0\u9650\u8fdb\u6b65';
      subTitleEl.title = '\u70b9\u51fb\u5207\u6362\u5bfc\u822a\u6837\u5f0f\uff08\u62bd\u5c49 / \u9876\u90e8\uff09';  /* 点击切换导航样式（抽屉/顶部） */
      subTitleEl.style.cursor = 'pointer';
      subTitleEl.addEventListener('click', function () {
        if (root._luliyToggleNavMode) root._luliyToggleNavMode();
      });

      /* 移动端链接行 mobRow 已删除（导航统一由左滑抽屉承担）。
         subTitleEl（副标题=导航切换按钮）直接放入 hero。 */
      shell.appendChild(leftZone);
      shell.appendChild(subTitleEl);
      shell.appendChild(capsule);
      shell.appendChild(rightZone);
      header.insertBefore(shell, header.firstChild);

      /* Self-heal: capsule empty but links exist → rebuild from title-right */
      if (capsule.querySelectorAll('.luliy-hero-cap-link').length === 0) {
        var late = header.querySelector('.title-right, [class*="title-right"]');
        if (late) {
          Array.from(late.querySelectorAll('a')).filter(function (a) {
            var href = a.getAttribute('href') || '';
            if (/rss\.xml$|\/rss$|\/feed/.test(href)) return false;
            if (/\/about(\.html)?$|^about(\.html)?$/.test(href)) return false;
            return true;
          }).forEach(function (a, i) {
            if (i > 0) {
              var sep = document.createElement('span');
              sep.className = 'luliy-hero-cap-sep'; capsule.appendChild(sep);
            }
            var c = a.cloneNode(true);
            c.classList.add('luliy-hero-cap-link'); c.removeAttribute('id');
            c.style.display = ''; c.style.visibility = '';
            var lbl = a.getAttribute('title') || (a.textContent || '').trim();
            if (lbl) {
              c.setAttribute('title', lbl);   /* 纯图标模式下悬停可见提示 */
              var s = document.createElement('span'); s.className = 'luliy-hero-cap-txt'; s.textContent = lbl; c.appendChild(s);
            }
            capsule.appendChild(c);
          });
        }
      }

      /* Relocate the toolbar pill into the hero right slot, if ready */
      relocatePill();

      return true;
    }

    /* Move the existing #luliy-toolbar pill into the hero right slot */
    function relocatePill() {
      var slot = root._luliyHeroRightSlot;
      var pill = document.getElementById('luliy-toolbar');
      if (slot && pill && pill.parentElement !== slot) {
        slot.appendChild(pill);
      }
    }
    root._luliyRelocatePill = relocatePill;

    /* Scroll-fade: hero card fades to transparent on scroll so it never
       covers page content; reappears (fully opaque) when the mouse moves
       to the top region of the viewport. */
    function initHeroScrollFade() {
      var shell = document.getElementById('luliy-nav-rebuilt');
      var header = document.getElementById('header');
      if (!shell) return;
      /* Header is always fully transparent — only the hero card carries
         the glass background, and it fades out completely on scroll. */
      if (header) header.style.background = 'transparent';

      var nearTop = false;        /* 鼠标是否在视口顶部热区 */
      var zoneBottom = 110;       /* 顶部热区下边界(px)，按卡片高度动态测量 */

      /* opacity 不影响布局，卡片几何与滚动无关，故只在构建/缩放时测一次。
         热区 = 卡片底边 + 16px 缓冲，最少 90px，确保整张卡片都在热区内。 */
      function measureZone() {
        var r = shell.getBoundingClientRect();
        zoneBottom = Math.max(90, r.bottom + 16);
      }
      measureZone();
      _luliyOnResize(measureZone);

      function scrollOpacity() {
        var sy = window.scrollY || window.pageYOffset || 0;
        return 1 - Math.min(1, sy / 140);   /* 下拉越多越透明，>140px 全透明 */
      }
      function render() {
        /* ★ 透明度开关：若用户关闭了导航透明度功能，始终保持完全不透明 */
        var shell = document.getElementById('luliy-nav-rebuilt');
        var fadeOff = shell && shell._luliyFadeEnabled === false;
        var op = (nearTop || fadeOff) ? 1 : scrollOpacity();
        shell.style.opacity = String(op);
        /* 透明时放行点击穿透（不挡下方内容）；不透明时恢复可点 */
        shell.style.pointerEvents = (op <= 0.02) ? 'none' : '';
      }

      /* ★ 需求：下拉后导航栏变透明；鼠标移到网页顶部区域 → 透明度变回、
         完全不透明。用文档级 mousemove + 廉价的 clientY 比较（不触发布局），
         且仅在状态变化时写样式，开销极小。关键：即便卡片已 pointer-events
         :none（收不到自身悬停事件），靠顶部热区检测也能可靠唤回。 */
      document.addEventListener('mousemove', function (e) {
        var inZone = e.clientY <= zoneBottom;
        if (inZone !== nearTop) { nearTop = inZone; render(); }
      }, { passive: true });

      onScrollRAF(render);
      render();
    }

    if (!tryBuild()) {
      var tries = 0;
      var iv = setInterval(function () {
        if (tryBuild() || ++tries > 30) {
          clearInterval(iv);
          initHeroScrollFade();
          /* ★ bug修复：hero 构建成功（_luliyNavLinks 已就位）后，立即显式
             触发一次抽屉快捷链接填充，不再单纯依赖抽屉自己的轮询去“偶遇”
             这个时机——两边各自重试容易在时序上错过，直接调用最可靠。 */
          if (root._luliyFillDrawerQuick) root._luliyFillDrawerQuick();
        }
      }, 200);
    } else {
      initHeroScrollFade();
      if (root._luliyFillDrawerQuick) root._luliyFillDrawerQuick();
    }
    /* In case the pill / nav links are ready after the hero, retry a few times */
    var pn = 0;
    var piv = setInterval(function () {
      if (root._luliyRelocatePill) root._luliyRelocatePill();
      var pillDone = document.getElementById('luliy-toolbar') &&
          document.getElementById('luliy-toolbar').parentElement &&
          document.getElementById('luliy-toolbar').parentElement.id === 'luliy-hero-right';
      if (pillDone) clearInterval(piv);
      if (++pn > 40) clearInterval(piv);
    }, 200);
  }

  /* ---- 10  Hero banner (homepage, scroll-fold) ------------ */

  /* ---- 11  Tag page search toolbar ----------------------- */
  function initTagEnhance() {
    if (!/tag\.html?$|\/tag\/?$/i.test(location.pathname)) return;
    var tries = 0;
    function wire() {
      var tl = document.getElementById('taglabel');
      if (!tl) { if (tries++ < 30) setTimeout(wire, 200); return; }
      if (document.getElementById('tag-enhance-toolbar')) return;
      var tb = document.createElement('div');
      tb.id = 'tag-enhance-toolbar';
      tb.style.cssText = 'display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap';
      tb.innerHTML =
        '<input style="padding:6px 14px;border:1px solid rgba(130,80,223,0.3);border-radius:20px;' +
        'outline:none;font-size:13px;width:200px;" type="search" ' +
        'placeholder="\u7b5b\u9009\u6807\u7b7e..." autocomplete="off">' +
        '<span style="font-size:12px;color:#888"></span>';
      tl.parentNode.insertBefore(tb, tl);
      var inp = tb.querySelector('input'), cnt = tb.querySelector('span');
      function apply() {
        var q = inp.value.trim().toLowerCase(), vis = 0;
        var all = Array.from(tl.querySelectorAll('.Label'));
        all.forEach(function (l) {
          var ok = !q || l.textContent.trim().toLowerCase().includes(q);
          l.style.display = ok ? 'inline-flex' : 'none';
          if (ok) vis++;
        });
        cnt.textContent = vis + ' / ' + all.length + ' \u4e2a\u6807\u7b7e';
      }
      inp.addEventListener('input', apply);
      new MutationObserver(apply).observe(tl, { childList: true, subtree: true });
      setTimeout(apply, 100);
    }
    wire();
  }

  /* ---- 12  Image lightbox --------------------------------- */
  function initLightbox() {
    if (document.getElementById('luliy-lightbox')) return;
    var lb = document.createElement('div');
    lb.id = 'luliy-lightbox';
    lb.innerHTML = '<button id="luliy-lightbox-close" aria-label="\u5173\u95ed">\u2715</button><img alt="">';
    document.body.appendChild(lb);
    var lbImg = lb.querySelector('img');
    var lbClose = lb.querySelector('#luliy-lightbox-close');
    function open(src, alt) {
      lbImg.src = src; lbImg.alt = alt || '';
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lb.classList.remove('is-open');
      document.body.style.overflow = '';
      setTimeout(function () { lbImg.src = ''; }, 300);
    }
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target === lbClose) close(); });
    lbClose.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lb.classList.contains('is-open')) close();
    });
    document.addEventListener('click', function (e) {
      var img = e.target.closest('#postBody img');
      if (!img) return;
      e.preventDefault();
      open(img.src, img.alt);
    });
    root._luliyLightboxOpen = open;
  }


  /* ---- Reading preferences (font size + font style) -------- */
  function applyReadingPrefs() {
    var pbody = document.getElementById('postBody');
    if (!pbody) return;
    var px = parseInt(_lsGet('luliy-fontsize') || '18', 10) || 18;
    px = Math.min(24, Math.max(14, px));
    pbody.style.setProperty('font-size', px + 'px', 'important');
    /* Font mode: '0'=default(楷体), '1'=黑体, '2'=苍耳今楷 */
    var fm = _lsGet('luliy-sans') || '0';
    document.body.classList.toggle('luliy-sans',   fm === '1');
    document.body.classList.toggle('luliy-canger', fm === '2');
  }
  root._luliyApplyReadingPrefs = applyReadingPrefs;

  /* ---- Reading-panel width (CSS variable) --------------------
     背景图/模糊功能已删除。仅保留阅读宽度控制，默认拉到最大(400)。 */
  function applyPbWidth() {
    /* 默认最大宽度 400；用户若手动调过则用其值 */
    var raw = _lsGet('luliy-pbwidth');
    var d = (raw === null) ? 400 : (parseInt(raw, 10) || 0);
    d = Math.min(400, Math.max(0, d));   /* 0..400px extra width, each side */
    document.documentElement.style.setProperty('--luliy-pb-extra', d + 'px');
  }
  root._luliyApplyPbWidth = applyPbWidth;

  /* ---- 液态玻璃三个可调参数：模糊 / 透明度 / 色调 -------------
     写入 CSS 变量 --luliy-glass-blur / -opacity / -hue，
     .luliy-card、文章面板、标签云容器都读这三个变量。 */
  function applyGlassVars() {
    var blur = parseFloat(_lsGet('luliy-glass-blur'));
    if (isNaN(blur)) blur = 22;
    blur = Math.min(50, Math.max(0, blur));

    var op = parseFloat(_lsGet('luliy-glass-opacity'));
    if (isNaN(op)) op = 0.5;
    op = Math.min(0.95, Math.max(0.1, op));

    var hue = parseFloat(_lsGet('luliy-glass-hue'));
    if (isNaN(hue)) hue = 250;
    hue = ((hue % 360) + 360) % 360;

    var artOp = parseFloat(_lsGet('luliy-article-opacity'));
    if (isNaN(artOp)) artOp = 0.5;
    artOp = Math.min(0.95, Math.max(0.1, artOp));

    var root2 = document.documentElement.style;
    root2.setProperty('--luliy-glass-blur', blur + 'px');
    root2.setProperty('--luliy-glass-opacity', String(op));
    root2.setProperty('--luliy-glass-hue', String(hue));
    root2.setProperty('--luliy-article-opacity', String(artOp));
  }
  root._luliyApplyGlassVars = applyGlassVars;

  /* ---- 主页卡片宽 / 高（可调节） -------------------------- */
  function applyCatSize() {
    var w = parseFloat(_lsGet('luliy-cat-w'));
    if (isNaN(w)) w = 1700;
    w = Math.min(2000, Math.max(900, w));

    var h = parseFloat(_lsGet('luliy-cat-h'));
    if (isNaN(h)) h = 338;
    h = Math.min(500, Math.max(220, h));

    var root2 = document.documentElement.style;
    root2.setProperty('--luliy-cat-w', w + 'px');
    root2.setProperty('--luliy-cat-h', h + 'px');
  }
  root._luliyApplyCatSize = applyCatSize;

  /* ---- 13  Floating toolbar + unified sink (6 themes) ----- */

  /* ── 6 Sinks / Themes ───────────────────────────────────── */
  /* ★ 恢复多主题手动选择系统：赛博朋克为新增的默认主题，
     原有 6 套主题全部加回来，用户可在抽屉「主题」分区里手动选择。
     不再跟随深浅模式自动切换——选哪个主题由用户决定，
     但每个主题内部仍各自适配白天/夜间两种配色（见上面 --th-* 变量）。 */
  var SINKS = [
    {
      id: 'cyberpunk',
      label: '\u8d5b\u535a\u670b\u514b\uff08\u9ed8\u8ba4\uff09',
      dot:   '#ff2bd6',
      theme: 'cyberpunk',
      cardPalette: ['#00e5ff', '#ff2bd6', '#7b2fbe', '#6ec7ff'],
      desc:  '\u9713\u8679\u90fd\u5e02\uff0c\u6545\u969c\u7f8e\u5b66'
    },
    {
      id: 'default',
      label: '\u9ed8\u8ba4',
      dot:   '#8250df',
      theme: 'default',
      cardPalette: ['#8250df', '#0969da', '#ff6b9d', '#f0b429'],
      desc:  '\u7ecf\u5178\u7d2b\u8c03\uff0c\u6e29\u548c\u6613\u8bfb'
    },
    {
      id: 'sakura',
      label: '\u6a31\u82b1\u5c11\u5973',
      dot:   '#e05c8a',
      theme: 'sakura',
      cardPalette: ['#e05c8a', '#f9a8c9', '#c94070', '#ffb7c5'],
      desc:  '\u6a31\u82b1\u7c89\u8c03\uff0c\u67d4\u8f6f\u7518\u7f8e'
    },
    {
      id: 'your-name',
      label: '\u4f60\u7684\u540d\u5b57',
      dot:   '#4a9de0',
      theme: 'your-name',
      cardPalette: ['#1a59a4', '#4a9de0', '#f4a738', '#60b8ff'],
      desc:  '\u5929\u7a7a\u84dd\u8c03\uff0c\u9ec4\u91d1\u5f67\u661f'
    },
    {
      id: 'space',
      label: '\u592a\u7a7a\u65c5\u884c',
      dot:   '#00e5ff',
      theme: 'space',
      cardPalette: ['#00e5ff', '#4a9de0', '#7b2fbe', '#0d2149'],
      desc:  '\u6df1\u591c\u661f\u6d77\uff0c\u5b87\u5b99\u65c5\u8005'
    },
    {
      id: 'sunset',
      label: '\u65e5\u843d\u9ec4\u660f',
      dot:   '#d9930d',
      theme: 'sunset',
      cardPalette: ['#f0b429', '#ffd98a', '#e8821e', '#d9930d'],
      desc:  '\u66ed\u8272\u516c\u8def\uff0c\u6696\u91d1\u6982\u660f'
    },
    {
      id: 'mono',
      label: '\u6781\u7b80\u9ed1\u767d',
      dot:   '#222222',
      theme: 'mono',
      cardPalette: ['#222222', '#555555', '#888888', '#bbbbbb'],
      desc:  '\u9ed1\u767d\u7070\uff0c\u7eaf\u51c0\u514b\u5236'
    }
  ];

  function applySink(id) {
    var s = null;
    for (var i = 0; i < SINKS.length; i++) { if (SINKS[i].id === id) { s = SINKS[i]; break; } }
    if (!s) s = SINKS[0];   /* 找不到就回退到默认（赛博朋克） */
    _lsSet('luliy-sink', s.id);
    document.body.setAttribute('data-luliy-theme', s.theme);
    document.documentElement.style.setProperty('--card-c1', s.cardPalette[0]);
    document.documentElement.style.setProperty('--card-c2', s.cardPalette[1]);
    document.documentElement.style.setProperty('--card-c3', s.cardPalette[2]);
    document.documentElement.style.setProperty('--card-c4', s.cardPalette[3]);
  }
  /* 暴露给抽屉系统复用 */
  root._luliyApplySink = applySink;
  root._luliySINKS = SINKS;

  /* ════════════════════════════════════════════════════════
     18d  左滑抽屉导航 + 双导航模式切换  ★全新
     - ☰「更多」按钮固定左上角，点击从左滑出抽屉
     - 抽屉顶部：头像 + 博客名 + 时钟 + 时间 + 日期 + 导航模式切换按钮
     - 折叠分区：快捷访问(singlePage+exlink) / 主题(6个) / 设置(复用浮动面板内容)
     - 双导航模式：A=桌面 hero 导航栏；B=抽屉。副标题 / 抽屉顶部按钮切换
       · 桌面默认 A，手机(≤768)默认 B；全端可互相切换；状态存 localStorage
  ════════════════════════════════════════════════════════ */
  var NAV_MODE_KEY = 'luliy-nav-mode';   /* 'hero' | 'drawer' */

  /* 当前生效的导航模式。
     ★ 大改后：全站锁定「抽屉导航」，不再提供顶部 hero 导航。
     （切换逻辑代码保留，但 getNavMode 恒定返回 'drawer'，
     这样顶部导航那一套永远不会显示，又不破坏原有结构。
     若日后想恢复双模式，把下面这行删掉、解开注释即可。） */
  function getNavMode() {
    return 'drawer';
    /* var saved = _lsGet(NAV_MODE_KEY);
    if (saved === 'hero' || saved === 'drawer') return saved;
    return (window.innerWidth <= 768) ? 'drawer' : 'hero'; */
  }

  /* 应用导航模式：切换 body class，由 CSS 控制 hero / ☰ 的显隐 */
  function applyNavMode(mode) {
    document.body.classList.toggle('luliy-nav-hero',   mode === 'hero');
    document.body.classList.toggle('luliy-nav-drawer', mode === 'drawer');
  }

  function initDrawerNav() {
    if (document.getElementById('luliy-ham-btn')) return;

    /* ── ☰「更多」按钮（固定左上角，全端可见，由 CSS 控制何时显示）── */
    var ham = document.createElement('button');
    ham.id = 'luliy-ham-btn';
    ham.type = 'button';
    ham.setAttribute('aria-label', '\u6253\u5f00\u83dc\u5355');   /* 打开菜单 */
    ham.innerHTML = '<span></span><span></span><span></span>';

    /* ── 遮罩 ── */
    var backdrop = document.createElement('div');
    backdrop.id = 'luliy-drawer-mask';

    /* ── 抽屉本体 ── */
    var drawer = document.createElement('aside');
    drawer.id = 'luliy-drawer';
    drawer.setAttribute('aria-hidden', 'true');

    /* —— 顶部信息区 —— */
    var head = document.createElement('div');
    head.id = 'luliy-drawer-head';
    var avatarSrc = 'https://avatars.githubusercontent.com/u/177055996?u=cb497e1edb10d059b285288c93ff32dab53af1c3&v=4&size=64';
    var _brandName = (LULIY_OPTS && LULIY_OPTS.siteName) || '\u0394\u03b9\u03ac\u039d\u03bf\u03c5\u03c2';
    head.innerHTML =
      '<button type="button" id="luliy-drawer-close" aria-label="\u5173\u95ed\u83dc\u5355">\u2715</button>' +
      '<a class="ldh-avatar" href="/about" aria-label="\u5173\u4e8e"><img src="' + avatarSrc + '" alt="avatar"></a>' +
      '<a class="ldh-name" href="/">' + esc(_brandName) + '</a>' +
      '<div class="ldh-accent"></div>' +
      '<div class="ldh-time"><span class="ldh-clock">' +
        '<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8" cy="8" r="6.4"/><path d="M8 4.4V8l2.6 1.6" stroke-linecap="round"/></svg>' +
      '</span><b class="ldh-time-text">--:--:--</b></div>' +
      '<div class="ldh-date">----/--/--</div>';
    drawer.appendChild(head);

    /* 抽屉内时钟（北京时间，与 hero 一致） */
    var WEEK = ['\u65e5','\u4e00','\u4e8c','\u4e09','\u56db','\u4e94','\u516d'];
    var dTimeEl = head.querySelector('.ldh-time-text');
    var dDateEl = head.querySelector('.ldh-date');
    function updDrawerTime() {
      var now = new Date();
      var bj = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (8 * 3600000));
      var p2 = function (n) { return String(n).padStart(2, '0'); };
      dTimeEl.textContent = p2(bj.getHours()) + ':' + p2(bj.getMinutes()) + ':' + p2(bj.getSeconds());
      dDateEl.textContent = bj.getFullYear() + ' / ' + p2(bj.getMonth() + 1) + ' / ' + p2(bj.getDate()) +
        '\u3000\u5468' + WEEK[bj.getDay()];
    }
    updDrawerTime(); setInterval(updDrawerTime, 1000);

    /* —— 导航模式切换按钮（B 套里的切换入口）—— */
    var modeBtn = document.createElement('button');
    modeBtn.type = 'button';
    modeBtn.id = 'luliy-drawer-modebtn';
    function refreshModeBtn() {
      var m = getNavMode();
      /* 当前抽屉模式 → 提示切到桌面顶部导航；反之提示切到抽屉 */
      modeBtn.innerHTML = (m === 'drawer')
        ? '\u5207\u6362\u5230\u9876\u90e8\u5bfc\u822a'   /* 切换到顶部导航 */
        : '\u5207\u6362\u5230\u62bd\u5c49\u5bfc\u822a';  /* 切换到抽屉导航 */
    }
    refreshModeBtn();
    modeBtn.addEventListener('click', function () {
      if (root._luliyToggleNavMode) root._luliyToggleNavMode();
      refreshModeBtn();
    });

    /* ★ 顶部日夜切换按钮（图标随当前模式切换） */
    var dnBtn = document.createElement('button');
    dnBtn.type = 'button';
    dnBtn.id = 'luliy-drawer-dnbtn';
    dnBtn.setAttribute('aria-label', '\u5207\u6362\u65e5\u591c\u6a21\u5f0f');   /* 切换日夜模式 */
    var SVG_MOON = '<svg viewBox="0 0 16 16" width="17" height="17" fill="currentColor"><path d="M9.598 1.591a.749.749 0 0 1 .785-.175 7.001 7.001 0 1 1-8.967 8.967.75.75 0 0 1 .961-.96 5.5 5.5 0 0 0 7.046-7.046.75.75 0 0 1 .175-.786Zm1.616 1.945a7 7 0 0 1-7.678 7.678 5.499 5.499 0 1 0 7.678-7.678Z"/></svg>';
    var SVG_SUN  = '<svg viewBox="0 0 16 16" width="17" height="17" fill="currentColor"><path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-1.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm5.657-8.157a.75.75 0 0 1 0 1.061l-1.061 1.06a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.06-1.061a.75.75 0 0 1 1.06 0Zm-9.193 9.193a.75.75 0 0 1 0 1.06l-1.06 1.061a.75.75 0 1 1-1.061-1.06l1.06-1.061a.75.75 0 0 1 1.061 0ZM8 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0ZM3 8a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 3 8Zm13 0a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 16 8ZM8 13a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 13Zm3.536-2.464a.75.75 0 0 1 1.06 0l1.061 1.06a.75.75 0 0 1-1.06 1.061l-1.061-1.06a.75.75 0 0 1 0-1.061Zm-7.193-7.193a.75.75 0 0 1 1.06 0l1.061 1.06A.751.751 0 0 1 5.404 5.46L4.343 4.4a.75.75 0 0 1 0-1.057Z"/></svg>';
    function refreshDnBtn() {
      var dark = (root._luliyResolveMode ? root._luliyResolveMode() : 'light') === 'dark';
      dnBtn.innerHTML = dark ? SVG_SUN : SVG_MOON;   /* 暗色显示太阳(切回亮)，亮色显示月亮 */
      dnBtn.title = dark ? '\u5207\u5230\u767d\u5929' : '\u5207\u5230\u591c\u95f4';
    }
    refreshDnBtn();
    dnBtn.addEventListener('click', function () {
      var cur = root._luliyResolveMode ? root._luliyResolveMode() : 'light';
      if (root._luliySetMode) root._luliySetMode(cur === 'dark' ? 'light' : 'dark');
      refreshDnBtn();
      if (playSfx) playSfx('theme');
    });

    /* 切换按钮 + 日夜按钮 并排一行 */
    var btnRow = document.createElement('div');
    btnRow.className = 'ldh-btn-row';
    btnRow.appendChild(modeBtn);
    btnRow.appendChild(dnBtn);
    head.appendChild(btnRow);

    /* —— 可折叠分区工厂 —— */
    function mkSection(title, defaultOpen) {
      var sec = document.createElement('div');
      sec.className = 'luliy-drawer-section' + (defaultOpen ? ' is-open' : '');
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'lds-header';
      btn.innerHTML = '<span>' + esc(title) + '</span><span class="lds-arrow">\u203a</span>';
      var body = document.createElement('div');
      body.className = 'lds-body';
      btn.addEventListener('click', function () {
        sec.classList.toggle('is-open');
        if (playSfx) playSfx('click');
      });
      sec.appendChild(btn); sec.appendChild(body);
      sec._body = body;
      return sec;
    }

    /* —— 快捷链接：直接平铺（无折叠），从 .title-right 实时读取 ——
       ★ 修复：不再依赖 _luliyNavLinks 缓存（抽屉模式下 hero 不构建，缓存为空）。
       直接扫 .title-right 的 <a>，排除 about(走头像)/RSS/主题圆钮。
       显示：gallery book favorites archive stock link music 等。 */
    var quickWrap = document.createElement('nav');
    quickWrap.id = 'luliy-drawer-quick';
    quickWrap.setAttribute('aria-label', '\u5feb\u6377\u8bbf\u95ee');
    drawer.appendChild(quickWrap);

    function readNavAnchors() {
      var scope = document.querySelector('.title-right, [class*="title-right"]') ||
                  document.getElementById('header');
      if (!scope) return [];
      var out = [], seen = {};
      Array.prototype.forEach.call(scope.querySelectorAll('a[href]'), function (a) {
        var id = a.id || '';
        if (id === 'luliy-nav-avatar-link' || id === 'luliy-nav-blogname') return;
        if (a.closest('#luliy-hero-capsule, #luliy-drawer')) return;
        if (a.classList && (a.classList.contains('luliy-hero-cap-link') || a.classList.contains('circle'))) return;
        var href = a.getAttribute('href') || '';
        if (!href || href.charAt(0) === '#') return;
        if (/rss\.xml$|atom\.xml$|\/rss$|\/feed/i.test(href)) return;        /* 排除 RSS */
        if (/\/about(\.html)?$|^about(\.html)?$/i.test(href)) return;        /* about 只走头像 */
        var key = (a.href || href).toLowerCase();
        if (seen[key]) return; seen[key] = 1;
        var external = a.target === '_blank';
        try { if (new URL(a.href, location.href).origin !== location.origin) external = true; } catch (e) {}
        var label = (a.getAttribute('title') || a.getAttribute('aria-label') || (a.textContent || '').trim());
        if (!label) {
          try {
            var u = new URL(a.href, location.href);
            label = external ? u.hostname.replace(/^www\./, '')
              : (u.pathname.replace(/^\//, '').replace(/\.html?$/, '').replace(/\/$/, '') || '\u94fe\u63a5');
          } catch (e) { label = '\u94fe\u63a5'; }
        }
        /* ★ 用链接内 <path> 的 id 反查 Gmeek 已填好的 d 属性，
           自己构建纯净的 SVG 图标（不含 Gmeek 加的箭头装饰）。
           如果 path 数据为空（Gmeek 还没填），icon 留空，
           fillQuick 会有 retry 机制，稍后再重试一次。 */
        var pathEl = a.querySelector('path[id]');
        var iconSvg = '';
        if (pathEl) {
          var pd = pathEl.getAttribute('d') || '';
          if (pd) {
            iconSvg = '<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">' +
              '<path fill-rule="evenodd" d="' + pd.replace(/"/g, '&quot;') + '"></path></svg>';
          }
        }
        out.push({ href: a.href || href, target: a.getAttribute('target') || (external ? '_blank' : ''),
                   label: label, icon: iconSvg, external: external });
      });
      return out;
    }

    function fillQuick() {
      var items = readNavAnchors();
      /* 兜底①：.title-right 还没渲染（或读取失败）时用 _luliyNavLinks 缓存救场 */
      if (!items.length && root._luliyNavLinks && root._luliyNavLinks.length) {
        items = root._luliyNavLinks.filter(function (m) {
          var h = (m.href || m.absHref || '');
          return h && !/\/about(\.html)?$|^about(\.html)?$/i.test(h) && !/rss|feed|atom/i.test(h);
        }).map(function (m) {
          return { href: m.absHref || m.href, target: m.target || '', label: m.label || '\u94fe\u63a5',
                   icon: '', external: m.target === '_blank' };
        });
      }
      /* ★ 兜底②（bug修复）：上面两条都失败时，直接读 hero capsule 里
         已克隆好的链接——capsule 在抽屉模式下只是 display:none，元素
         本身始终在 DOM 里，且其内容已被证明渲染正确（截图里桌面 hero
         能正常显示这些链接），是最可靠的最后一层数据源。 */
      if (!items.length) {
        var capLinks = document.querySelectorAll('#luliy-hero-capsule .luliy-hero-cap-link');
        if (capLinks.length) {
          items = Array.prototype.map.call(capLinks, function (a) {
            var svg = a.querySelector('svg');
            var txt = a.querySelector('.luliy-hero-cap-txt');
            return {
              href: a.href || a.getAttribute('href') || '',
              target: a.getAttribute('target') || '',
              label: (txt ? txt.textContent : a.textContent || '').trim() || a.getAttribute('aria-label') || '\u94fe\u63a5',
              icon: '',   /* ★ 不带箭头等 SVG 图标 */
              external: a.getAttribute('target') === '_blank'
            };
          }).filter(function (it) { return it.href; });
        }
      }
      if (!items.length) return false;
      quickWrap.innerHTML = '';
      items.forEach(function (it) {
        var a = document.createElement('a');
        a.className = 'lds-link' + (it.external ? ' is-ext' : '');
        a.href = it.href;
        if (it.target) a.target = it.target;
        if (it.external) a.rel = 'noopener';
        a.setAttribute('aria-label', it.label);
        a.innerHTML =
          '<span class="lds-link-ico">' + (it.icon || '<span class="lds-link-dot"></span>') + '</span>' +
          '<span class="lds-link-txt">' + esc(it.label) + '</span>';
        quickWrap.appendChild(a);
      });
      return true;
    }
    if (!fillQuick()) {
      var qn = 0, qiv = setInterval(function () {
        if (fillQuick() || ++qn > 30) clearInterval(qiv);
      }, 200);
    }
    root._luliyFillDrawerQuick = fillQuick;

    /* —— 分区②：主题（7 个，含新增「赛博朋克」默认主题）—— */
    var secTheme = mkSection('\u4e3b\u9898', false);   /* 主题 */
    drawer.appendChild(secTheme);
    var sinks = root._luliySINKS || [];
    var grid = document.createElement('div');
    grid.className = 'lds-theme-grid';
    var curSink = _lsGet('luliy-sink') || 'cyberpunk';
    sinks.forEach(function (s) {
      var cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'luliy-drawer-theme-cell' + (s.id === curSink ? ' is-active' : '');
      cell.setAttribute('data-sink', s.id);
      cell.innerHTML =
        '<span class="ldt-dot" style="background:' + s.dot + '"></span>' +
        '<span class="ldt-name">' + esc(s.label) + '</span>';
      cell.addEventListener('click', function () {
        if (root._luliyApplySink) root._luliyApplySink(s.id);
        if (playSfx) playSfx('theme');
      });
      grid.appendChild(cell);
    });
    secTheme._body.appendChild(grid);

    /* —— 分区③：设置（复用浮动控制面板内容）——
       做法：点击「设置」时，把 #luliy-ctrl-panel 整个 DOM 移动进抽屉，
       关闭分区 / 关闭抽屉时不还原（面板按钮逻辑不受影响，因为是同一 DOM）。
       由于浮动面板里「主题预览卡」与本抽屉「主题分区」重复，移动后隐藏其预览。 */
    var secSettings = mkSection('\u8bbe\u7f6e', false);   /* 设置 */
    drawer.appendChild(secSettings);
    var settingsHost = document.createElement('div');
    settingsHost.className = 'lds-settings-host';
    secSettings._body.appendChild(settingsHost);
    var panelMoved = false;
    function ensurePanelInDrawer() {
      var panel = document.getElementById('luliy-ctrl-panel');
      if (panel && settingsHost && panel.parentElement !== settingsHost) {
        settingsHost.appendChild(panel);
        panel.classList.add('in-drawer');
        panelMoved = true;
      }
    }
    /* 切回 hero 模式时，把面板搬回右下角浮动工具条 */
    function restorePanelToFloat() {
      var panel = document.getElementById('luliy-ctrl-panel');
      var bar = document.getElementById('luliy-toolbar');
      if (panel && bar && panel.parentElement !== bar) {
        panel.classList.remove('in-drawer');
        panel.style.position = '';
        panel.style.display = '';
        bar.appendChild(panel);
        panelMoved = false;
      }
    }
    root._luliyRestorePanelToFloat = restorePanelToFloat;
    /* 展开「设置」时把面板搬进来 */
    secSettings.querySelector('.lds-header').addEventListener('click', function () {
      setTimeout(ensurePanelInDrawer, 0);
    });

    /* ── 开合控制 ── */
    function openDrawer() {
      ensurePanelInDrawer();
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      ham.classList.add('is-open');
      document.body.classList.add('luliy-drawer-open');
      document.body.style.overflow = 'hidden';   /* 锁背景滚动 */
      refreshModeBtn();
    }
    function closeDrawer() {
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      ham.classList.remove('is-open');
      document.body.classList.remove('luliy-drawer-open');
      document.body.style.overflow = '';
    }
    function toggleDrawer() {
      if (drawer.classList.contains('is-open')) closeDrawer();
      else openDrawer();
    }
    ham.addEventListener('click', toggleDrawer);
    backdrop.addEventListener('click', closeDrawer);
    var closeBtn = head.querySelector('#luliy-drawer-close');
    if (closeBtn) closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      closeDrawer();
      playSfx('click');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
    });
    /* 点抽屉里的链接后自动关闭 */
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('.lds-link')) closeDrawer();
    });
    root._luliyOpenDrawer = openDrawer;
    root._luliyCloseDrawer = closeDrawer;

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);
    document.body.appendChild(ham);

    /* ★ 左上角博客名 ΔιάΝους，固定在汉堡按钮右侧，全站可见。
       ★ 样式套用自用户上传的新版粒子页面：「恒星核心」发光效果——
       白色核心 + 多层粉/紫/青光晕模拟星光，结尾字符带十字星芒。
       位置依然在左边（原文件里是居中的，这里只取它的视觉样式，
       不取它的定位）。 */
    if (!document.getElementById('luliy-brand')) {
      var brand = document.createElement('a');
      brand.id = 'luliy-brand';
      brand.href = '/';
      var _brandText = (LULIY_OPTS && LULIY_OPTS.siteName) || '\u0394\u03b9\u03ac\u039d\u03bf\u03c5\u03c2';
      var _bodyChars = _brandText.slice(0, -1);
      var _lastChar = _brandText.slice(-1);
      brand.appendChild(document.createTextNode(_bodyChars));
      var _flare = document.createElement('span');
      _flare.className = 'flare-anchor';
      _flare.textContent = _lastChar;
      brand.appendChild(_flare);
      brand.setAttribute('aria-label', _brandText + ' \u2014 \u8fd4\u56de\u4e3b\u9875');
      document.body.appendChild(brand);
    }
    /* ★ 博客名右边的小图标：Q 版「沉思者」雕塑侧身剪影，
       点击跳转到 GitHub issues（也就是后台写文章的地方）。
       背景透明，发光样式和左边的博客名保持一致。 */
    if (!document.getElementById('luliy-issues-link')) {
      var thinkerLink = document.createElement('a');
      thinkerLink.id = 'luliy-issues-link';
      thinkerLink.href = 'https://github.com/luliyer6-ux/luliyer6-ux.github.io/issues';
      thinkerLink.target = '_blank';
      thinkerLink.rel = 'noopener noreferrer';
      thinkerLink.setAttribute('aria-label', '\u524d\u5f80 GitHub Issues');
      thinkerLink.title = '\u524d\u5f80 GitHub Issues';
      thinkerLink.innerHTML =
        '<svg viewBox="0 0 60 60" width="22" height="22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
        '<rect x="12" y="52" width="36" height="6" rx="1"/>' +
        '<path d="M30 52 L30 44 Q30 38 34 35 L38 35 Q38 41 36 44 L36 52 Z" opacity="0.55"/>' +
        '<path d="M16 52 L16 42 Q16 38 20 37 L25 39 Q24 43 22 44 L22 52 Z"/>' +
        '<path d="M19 38 Q18 33 22 31 L33 31 Q35 33 34 36 L23 38 Q21 39 19 38 Z"/>' +
        '<path d="M24 32 Q21 26 22 19 Q23 13 29 11 L34 12 Q36 16 35 21 L33 31 Q28 33 24 32 Z"/>' +
        '<path d="M24 16 Q19 18 18 24 Q17 28 20 30 L23 30 Q21 27 22 23 Q23 19 27 17 Z"/>' +
        '<path d="M18 25 Q15 21 16 16 Q17 12 22 11 L25 14 Q21 15 20 19 Q19 22 21 25 Z"/>' +
        '<ellipse cx="28" cy="9" rx="6.5" ry="7"/>' +
        '<path d="M33 8 Q35.5 9 34.5 11.5 Q33 12 32 10.5 Z"/>' +
        '</svg>';
      document.body.appendChild(thinkerLink);
      /* 动态测量博客名实际宽度，把图标精确定位在它右边——
         不写死间距，名字长短变化（比如以后改成别的站名）也不会错位。 */
      function positionThinkerIcon() {
        var b = document.getElementById('luliy-brand');
        if (!b || !thinkerLink) return;
        var r = b.getBoundingClientRect();
        thinkerLink.style.left = (r.right + 10) + 'px';
      }
      positionThinkerIcon();
      _luliyOnResize(positionThinkerIcon);
      /* 字体加载完成后宽度可能变化，再校正一次 */
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(positionThinkerIcon).catch(function () {});
      }

      /* ★ 切换到极简系统的按钮：放在沉思者图标右边 */
      if (!document.getElementById('luliy-to-minimal')) {
        var toMin = document.createElement('button');
        toMin.id = 'luliy-to-minimal';
        toMin.type = 'button';
        toMin.title = '\u5207\u6362\u5230\u7b80\u6d01\u7cfb\u7edf';   /* 切换到简洁系统 */
        toMin.textContent = '\u25C7';   /* ◇ 空心菱形，区别于极简里的实心 ◈ */
        toMin.addEventListener('click', function () {
          if (root._luliySetSystem) root._luliySetSystem('minimal');
        });
        document.body.appendChild(toMin);
        function positionToMin() {
          var t = document.getElementById('luliy-issues-link');
          if (!t) return;
          var r = t.getBoundingClientRect();
          toMin.style.left = (r.right + 8) + 'px';
        }
        positionToMin();
        _luliyOnResize(positionToMin);
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(positionToMin).catch(function () {});
        }
      }
    }
    /* ★ 副标题：只在首页显示（文章页等其它页面顶部已经比较拥挤，
       不重复放）。位置紧贴在 ΔιάΝους 正下方。 */
    if (isIndexPage() && LULIY_OPTS.siteSubtitle && !document.getElementById('luliy-subtitle')) {
      var subEl = document.createElement('div');
      subEl.id = 'luliy-subtitle';
      /* ★ 三个词分别链接到 Chronicle / Book / Favorites 页面，
         点哪个词就跳对应页面，样式继承副标题的整体发光风格。 */
      var _words = LULIY_OPTS.siteSubtitle.split(/\s+/);
      var _links = ['/chronicle.html', '/book.html', '/favorites.html'];
      subEl.innerHTML = _words.map(function (w, i) {
        var href = _links[i] || '#';
        return '<a href="' + esc(href) + '" class="luliy-subtitle-link">' + esc(w) + '</a>';
      }).join(' ');
      document.body.appendChild(subEl);
    }

    /* ── 双导航模式切换实现 ── */
    root._luliyToggleNavMode = function () {
      var next = (getNavMode() === 'hero') ? 'drawer' : 'hero';
      _lsSet(NAV_MODE_KEY, next);
      applyNavMode(next);
      refreshModeBtn();
      if (next === 'hero') {
        closeDrawer();
        /* 切回 hero：把设置面板还给右下角浮动工具条 */
        if (root._luliyRestorePanelToFloat) root._luliyRestorePanelToFloat();
      }
      if (playSfx) playSfx('click');
    };

    /* 初始应用当前模式 */
    applyNavMode(getNavMode());

    /* 窗口缩放跨过 768 断点时，若用户从未手动选择，则跟随宽度更新默认 */
    _luliyOnResize(function () {
      if (_lsGet(NAV_MODE_KEY)) return;   /* 用户已手选，不自动改 */
      applyNavMode(getNavMode());
    });
  }

  /* ---- Nav transparency on scroll (article pages) --------- */
  function initNavTransparency() {
    /* Merged into initHeroScrollFade — no-op here to avoid dual scroll handlers */
  }

  function initToolbar() {
    if (document.getElementById('luliy-toolbar')) return;
    var bar = document.createElement('div');
    bar.id = 'luliy-toolbar';

    /* ── Pill trigger button ──────────────────────────────── */
    var ctrlBtn = document.createElement('button');
    ctrlBtn.id = 'luliy-ctrl-btn';
    ctrlBtn.type = 'button';
    ctrlBtn.setAttribute('aria-haspopup', 'true');
    ctrlBtn.setAttribute('aria-expanded', 'false');
    function refreshBtnLabel() {
      /* 粒子/樱花特效已整体下线（性能原因），按钮标签不再显示相关状态 */
      var sfx = _lsGet('luliy-sfx') !== '0';
      ctrlBtn.textContent = (sfx ? '\uD83D\uDD0A' : '\uD83D\uDD07') + ' \u2699\uFE0F';
      /* 可见文字只有 emoji，屏幕阅读器读不出含义，单独补一份文字说明 */
      ctrlBtn.setAttribute('aria-label',
        '\u663e\u793a\u8bbe\u7f6e\u9762\u677f\uff08\u97f3\u6548' + (sfx ? '\u5f00' : '\u5173') + '\uff09');
    }
    refreshBtnLabel();

    /* ── Dropdown panel ───────────────────────────────────── */
    var panel = document.createElement('div');
    panel.id = 'luliy-ctrl-panel';

    function mkSep() { var h = document.createElement('hr'); h.className = 'luliy-ctrl-sep'; return h; }
    function mkSec(t) { var d = document.createElement('div'); d.className = 'luliy-ctrl-sec'; d.textContent = t; return d; }
    function mkRow(emoji, label, badgeText) {
      var row  = document.createElement('button');
      row.type = 'button'; row.className = 'luliy-ctrl-row';
      var lbl  = document.createElement('span'); lbl.className = 'luliy-ctrl-lbl';
      var ico  = document.createElement('span'); ico.textContent = emoji;
      var txt  = document.createElement('span'); txt.textContent = label;
      lbl.appendChild(ico); lbl.appendChild(txt);
      var bdg  = document.createElement('span'); bdg.className = 'luliy-ctrl-badge'; bdg.textContent = badgeText;
      row.appendChild(lbl); row.appendChild(bdg);
      row._ico = ico; row._bdg = bdg;
      return row;
    }

    /* Slider row:  label  [====O====]  value
       opts = { emoji, label, min, max, step, value, format(v), onInput(v) } */
    function mkSlider(opts) {
      var row = document.createElement('div');
      row.className = 'luliy-ctrl-row luliy-ctrl-slider';
      row.style.cursor = 'default';
      var top = document.createElement('div');
      top.className = 'luliy-slider-top';
      var lbl = document.createElement('span');
      lbl.className = 'luliy-ctrl-lbl';
      lbl.textContent = (opts.emoji ? opts.emoji + ' ' : '') + opts.label;
      var bdg = document.createElement('span');
      bdg.className = 'luliy-ctrl-badge';
      top.appendChild(lbl); top.appendChild(bdg);
      var rng = document.createElement('input');
      rng.type = 'range';
      rng.className = 'luliy-range';
      rng.min = String(opts.min); rng.max = String(opts.max);
      rng.step = String(opts.step || 1); rng.value = String(opts.value);
      function fmt(v) { return opts.format ? opts.format(v) : String(v); }
      bdg.textContent = fmt(opts.value);
      function fill() {
        var pct = (rng.value - opts.min) / (opts.max - opts.min) * 100;
        rng.style.setProperty('--luliy-range-pct', pct + '%');
      }
      fill();
      rng.addEventListener('input', function (e) {
        e.stopPropagation();
        var v = parseFloat(rng.value);
        bdg.textContent = fmt(v);
        fill();
        if (opts.onInput) opts.onInput(v);
      });
      rng.addEventListener('click', function (e) { e.stopPropagation(); });
      row.appendChild(top); row.appendChild(rng);
      row._range = rng; row._bdg = bdg;
      return row;
    }

    /* SFX */
    var sfxOn  = _lsGet('luliy-sfx') !== '0';
    var sfxRow = mkRow(sfxOn ? '\uD83D\uDD0A' : '\uD83D\uDD07', '\u97f3\u6548', sfxOn ? '\u5f00\u542f' : '\u5173\u95ed');
    sfxRow.addEventListener('click', function (e) {
      e.stopPropagation();
      var on = _lsGet('luliy-sfx') !== '0';
      _lsSet('luliy-sfx', on ? '0' : '1');
      sfxRow._ico.textContent = !on ? '\uD83D\uDD0A' : '\uD83D\uDD07';
      sfxRow._bdg.textContent = !on ? '\u5f00\u542f' : '\u5173\u95ed';
      refreshBtnLabel();
    });
    panel.appendChild(sfxRow);
    panel.appendChild(mkSep());
    var themeSecTitle = mkSec('\u98ce\u683c\u4e3b\u9898');
    themeSecTitle.classList.add('luliy-panel-theme-block');   /* 抽屉里隐藏(抽屉已有主题分区) */
    panel.appendChild(themeSecTitle);

    /* Theme rows */
    SINKS.forEach(function (s) {
      var row = mkRow('', s.label, '\u2713');
      row.setAttribute('data-sink', s.id);
      row.classList.add('luliy-sink-opt');
      row.classList.add('luliy-panel-theme-block');   /* 抽屉里隐藏 */
      /* Replace emoji span with color dot */
      var dot = document.createElement('span');
      dot.className = 'luliy-sink-dot'; dot.style.background = s.dot;
      row._ico.replaceWith(dot); row._dot = dot;
      row._bdg.style.opacity = '0';
      row.classList.add('luliy-ctrl-row'); /* shared row style */
      row.addEventListener('click', function (e) {
        e.stopPropagation();
        applySink(s.id);
        syncThemeRows();
        playSfx('click');
      });
      panel.appendChild(row);
    });

    /* ★ 需求④：导航栏透明度开关——在夜间模式按钮左侧加一个按钮
       状态存 localStorage('luliy-nav-fade')，默认开启('1')。
       关闭后 initHeroScrollFade 不再绑定透明度，导航栏始终完全不透明。 */
    var FADE_KEY = 'luliy-nav-fade';
    function isFadeEnabled() { return _lsGet(FADE_KEY) !== '0'; }
    /* 切换函数——供按钮点击和初始化共用 */
    function applyFadeState(enabled) {
      _lsSet(FADE_KEY, enabled ? '1' : '0');
      var shell = document.getElementById('luliy-nav-rebuilt');
      if (shell) {
        if (enabled) {
          /* 恢复透明度逻辑：触发一次虚拟 scroll 事件让现有 render() 重新计算 */
          shell._luliyFadeEnabled = true;
          window.dispatchEvent(new Event('scroll'));
        } else {
          /* 关闭：立刻把导航栏设为完全不透明，停止响应滚动 */
          shell._luliyFadeEnabled = false;
          shell.style.opacity = '1';
          shell.style.pointerEvents = '';
        }
      }
    }
    /* 透明度开关行（图标：半透明方块感 SVG） */
    var fadeRow = document.createElement('button');
    fadeRow.type = 'button';
    fadeRow.className = 'luliy-ctrl-row luliy-fade-toggle-row';
    fadeRow.id = 'luliy-fade-toggle-btn';
    var fadeIcon = '<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">' +
      '<rect x="1" y="1" width="8" height="8" rx="1.5" opacity="0.9"/>' +
      '<rect x="7" y="7" width="8" height="8" rx="1.5" opacity="0.35"/>' +
      '</svg>';
    function refreshFadeRow() {
      var on = isFadeEnabled();
      fadeRow.innerHTML =
        '<span class="luliy-ctrl-lbl">' + fadeIcon +
        ' \u5bfc\u822a\u900f\u660e\u5ea6</span>' +   /* 导航透明度 */
        '<span class="luliy-ctrl-badge luliy-fade-badge">' +
        (on ? '\u5f00\u542f' : '\u5173\u95ed') + '</span>';  /* 开启/关闭 */
      fadeRow.classList.toggle('is-active', on);
      applyFadeState(on);
    }
    refreshFadeRow();
    fadeRow.addEventListener('click', function () {
      var next = !isFadeEnabled();
      _lsSet(FADE_KEY, next ? '1' : '0');
      refreshFadeRow();
      playSfx && playSfx('click');
    });
    panel.appendChild(fadeRow);
    panel.appendChild(mkSep());

    /* Day / Night theme preview cards */
    var previewWrap = document.createElement('div');
    previewWrap.className = 'luliy-ctrl-theme-preview';

    var THEME_PALETTES = {
      'cyberpunk': { day: ['rgba(20,10,40,0.85)',    '#ff2bd6', '#f0e6ff'],  night: ['rgba(10,8,24,0.90)',   '#00e5ff', '#f0e6ff'] },
      'default':   { day: ['rgba(255,255,255,0.90)', '#8250df', '#1e1032'],  night: ['rgba(14,10,28,0.90)', '#cba6f7', '#cdd6f4'] },
      'sakura':    { day: ['rgba(255,238,245,0.92)', '#e05c8a', '#7a1040'],  night: ['rgba(42,10,28,0.88)',  '#f9a8c9', '#ffc5d0'] },
      'your-name': { day: ['rgba(230,244,255,0.92)', '#1a59a4', '#0d2b6b'],  night: ['rgba(4,14,52,0.90)',   '#93c5fd', '#c0e4ff'] },
      'space':     { day: ['rgba(2,8,36,0.88)',      '#00e5ff', '#c8e8ff'],  night: ['rgba(1,4,22,0.92)',    '#00e5ff', '#b8d8f0'] },
      'sunset':    { day: ['rgba(255,248,228,0.94)', '#d9930d', '#9a5a00'],  night: ['rgba(40,30,14,0.92)',  '#ffc14d', '#ffe2a8'] },
      'mono':      { day: ['rgba(255,255,255,0.94)', '#222222', '#111111'],  night: ['rgba(16,16,16,0.92)',  '#dddddd', '#e8e8e8'] }
    };

    function mkPreviewCard(label, bg, accent, textColor) {
      var card = document.createElement('div');
      card.className = 'luliy-ctrl-preview-card ' + label.toLowerCase();
      card.style.background = bg;
      card.style.color = textColor;
      card.style.borderColor = accent + '44';
      var dot = document.createElement('span');
      dot.className = 'preview-dot';
      dot.style.background = accent;
      var lbl = document.createElement('span');
      lbl.className = 'preview-label';
      lbl.textContent = label === 'day' ? '\u767d\u5929' : '\u591c\u665a';  /* 白天 / 夜晚 */
      card.appendChild(dot);
      card.appendChild(lbl);
      return card;
    }

    var previewDay   = mkPreviewCard('day',   'rgba(255,255,255,0.90)', '#8250df', '#1e1032');
    var previewNight = mkPreviewCard('night', 'rgba(14,10,28,0.90)',   '#cba6f7', '#cdd6f4');
    previewWrap.appendChild(previewDay);
    previewWrap.appendChild(previewNight);
    panel.appendChild(previewWrap);

    /* Make day/night cards interactive — click to switch colour mode */
    function setColorMode(mode) {
      var htmlEl = document.documentElement;
      /* 复用统一的模式解析函数，消除重复的 matchMedia 内联逻辑 */
      var cur = _luliyResolveMode();
      if (cur === mode) { syncThemeRows(); return; }   /* already there */

      /* Prefer Gmeek's own toggle (keeps its storage in sync) … */
      var circle = document.querySelector('.circle');
      if (circle) circle.click();
      /* … then verify; fall back to manual attribute set */
      var after = htmlEl.getAttribute('data-color-mode') || '';
      if (after !== mode) {
        htmlEl.setAttribute('data-color-mode', mode);
        try { _lsSet('meek_theme', mode); } catch (e) {}
      }
      /* Ripple from viewport centre */
      if (root._luliyThemeRipple) root._luliyThemeRipple(
        window.innerWidth / 2, window.innerHeight / 2);
      syncThemeRows();
    }
    previewDay.style.cursor = 'pointer';
    previewNight.style.cursor = 'pointer';
    previewDay.title = '\u5207\u6362\u767d\u5929\u6a21\u5f0f';   /* 切换白天模式 */
    previewNight.title = '\u5207\u6362\u591c\u665a\u6a21\u5f0f'; /* 切换夜晚模式 */
    previewDay.addEventListener('click', function(e) {
      e.stopPropagation(); setColorMode('light'); playSfx('theme');
    });
    previewNight.addEventListener('click', function(e) {
      e.stopPropagation(); setColorMode('dark'); playSfx('theme');
    });

    /* ── Active-state sync: highlight the card matching current mode ─ */
    /* 复用统一的模式解析函数（原内联实现已合并到 _luliyResolveMode） */
    function resolvedMode() { return _luliyResolveMode(); }
    function syncModePreview() {
      var m = resolvedMode();
      previewDay.classList.toggle('is-active', m !== 'dark');
      previewNight.classList.toggle('is-active', m === 'dark');
    }
    syncModePreview();
    /* Follow external switches (Gmeek circle, OS auto) */
    try {
      new MutationObserver(syncModePreview).observe(document.documentElement, {
        attributes: true, attributeFilter: ['data-color-mode']
      });
    } catch (e) {}

    function syncThemeRows() {
      var cur = _lsGet('luliy-sink') || 'cyberpunk';
      panel.querySelectorAll('[data-sink]').forEach(function (r) {
        var active = r.getAttribute('data-sink') === cur;
        r.classList.toggle('is-active', active);
        if (r._bdg) r._bdg.style.opacity = active ? '1' : '0';
      });
      /* Update preview cards for active theme */
      var pal = THEME_PALETTES[cur] || THEME_PALETTES['default'];
      previewDay.style.background   = pal.day[0];
      previewDay.style.color        = pal.day[2];
      previewDay.style.borderColor  = pal.day[1] + '44';
      var dayDot = previewDay.querySelector('.preview-dot');
      if (dayDot) dayDot.style.background = pal.day[1];
      previewNight.style.background  = pal.night[0];
      previewNight.style.color       = pal.night[2];
      previewNight.style.borderColor = pal.night[1] + '44';
      var nightDot = previewNight.querySelector('.preview-dot');
      if (nightDot) nightDot.style.background = pal.night[1];
    }

    panel.appendChild(mkSep());

    /* 樱花 / 赛博粒子 开关及速度·方向·风格控件 — 已随粒子系统整体移除 (2026-08) */

    /* ── 液态玻璃三个可调参数 ───────────────────────────── */
    panel.appendChild(mkSep());
    panel.appendChild(mkSec('\uD83E\uDE9E \u6db2\u6001\u73bb\u7483'));   /* 🪞 液态玻璃 */

    var glassBlurSlider = mkSlider({
      emoji: '\uD83C\uDF2B\uFE0F', label: '\u6a21\u7cca\u7a0b\u5ea6',   /* 🌫️ 模糊程度 */
      min: 0, max: 50, step: 2,
      value: parseFloat(_lsGet('luliy-glass-blur')) || 22,
      format: function (v) { return v + 'px'; },
      onInput: function (v) {
        _lsSet('luliy-glass-blur', String(v));
        applyGlassVars();
      }
    });
    panel.appendChild(glassBlurSlider);

    var glassOpacitySlider = mkSlider({
      emoji: '\uD83D\uDD73\uFE0F', label: '\u900f\u660e\u5ea6',   /* 🕳️ 透明度（这里指不透明度，数值越大越实） */
      min: 0.1, max: 0.95, step: 0.05,
      value: parseFloat(_lsGet('luliy-glass-opacity')) || 0.5,
      format: function (v) { return Math.round(v * 100) + '%'; },
      onInput: function (v) {
        _lsSet('luliy-glass-opacity', String(v));
        applyGlassVars();
      }
    });
    panel.appendChild(glassOpacitySlider);

    var glassHueSlider = mkSlider({
      emoji: '\uD83C\uDFA8', label: '\u8272\u8c03',   /* 🎨 色调 */
      min: 0, max: 360, step: 10,
      value: parseFloat(_lsGet('luliy-glass-hue')) || 250,
      format: function (v) { return v + '\u00b0'; },
      onInput: function (v) {
        _lsSet('luliy-glass-hue', String(v));
        applyGlassVars();
      }
    });
    panel.appendChild(glassHueSlider);

    var articleOpacitySlider = mkSlider({
      emoji: '\uD83D\uDCC4', label: '\u6587\u7ae0\u9762\u677f\u900f\u660e\u5ea6',   /* 📄 文章面板透明度（独立于上面的玻璃透明度，单独控制阅读面板） */
      min: 0.1, max: 0.95, step: 0.05,
      value: parseFloat(_lsGet('luliy-article-opacity')) || 0.5,
      format: function (v) { return Math.round(v * 100) + '%'; },
      onInput: function (v) {
        _lsSet('luliy-article-opacity', String(v));
        applyGlassVars();
      }
    });
    panel.appendChild(articleOpacitySlider);

    /* ── 主页卡片尺寸（宽 / 高可调） ───────────────────── */
    panel.appendChild(mkSep());
    panel.appendChild(mkSec('\uD83D\uDCD0 \u5361\u7247\u5c3a\u5bf8'));   /* 📐 卡片尺寸 */

    var catWSlider = mkSlider({
      emoji: '\u2194\uFE0F', label: '\u5361\u7247\u5bbd\u5ea6',   /* ↔️ 卡片宽度 */
      min: 900, max: 2000, step: 50,
      value: parseFloat(_lsGet('luliy-cat-w')) || 1700,
      format: function (v) { return v + 'px'; },
      onInput: function (v) {
        _lsSet('luliy-cat-w', String(v));
        applyCatSize();
      }
    });
    panel.appendChild(catWSlider);

    var catHSlider = mkSlider({
      emoji: '\u2195\uFE0F', label: '\u5361\u7247\u9ad8\u5ea6',   /* ↕️ 卡片高度 */
      min: 220, max: 500, step: 10,
      value: parseFloat(_lsGet('luliy-cat-h')) || 338,
      format: function (v) { return v + 'px'; },
      onInput: function (v) {
        _lsSet('luliy-cat-h', String(v));
        applyCatSize();
      }
    });
    panel.appendChild(catHSlider);

    /* ── 恢复默认值：一键重置上面这一串外观设置（粒子速度/方向、
       玻璃模糊/透明度/色调、文章面板透明度、卡片宽/高），
       省得调乱了找不回来。 */
    var APPEARANCE_DEFAULTS = {
      'luliy-glass-blur':     '22',
      'luliy-glass-opacity':  '0.5',
      'luliy-glass-hue':      '250',
      'luliy-article-opacity':'0.5',
      'luliy-cat-w':          '1700',
      'luliy-cat-h':          '338'
    };
    var resetRow = mkRow('\u21BA', '\u6062\u590d\u9ed8\u8ba4\u503c', '');
    resetRow._bdg.style.opacity = '0';
    resetRow.addEventListener('click', function (e) {
      e.stopPropagation();
      Object.keys(APPEARANCE_DEFAULTS).forEach(function (k) {
        _lsSet(k, APPEARANCE_DEFAULTS[k]);
      });
      /* 同步滑块的视觉显示：改 value 再派发 input 事件，
         会自动触发各自的 onInput（写 localStorage + 实时生效），
         不用逐个手写重复逻辑。
         （粒子速度/方向/风格三项已随粒子系统一起移除，不再需要同步。） */
      [glassBlurSlider, glassOpacitySlider,
       glassHueSlider, articleOpacitySlider, catWSlider, catHSlider].forEach(function (s) {
        s._range.value = APPEARANCE_DEFAULTS[
          s === glassBlurSlider ? 'luliy-glass-blur' :
          s === glassOpacitySlider ? 'luliy-glass-opacity' :
          s === glassHueSlider ? 'luliy-glass-hue' :
          s === articleOpacitySlider ? 'luliy-article-opacity' :
          s === catWSlider ? 'luliy-cat-w' : 'luliy-cat-h'
        ];
        s._range.dispatchEvent(new Event('input', { bubbles: false }));
      });
      playSfx('click');
    });
    panel.appendChild(resetRow);

    /* ── Reading settings (article pages only) ───────────── */
    if (document.getElementById('postBody')) {
      panel.appendChild(mkSep());
      panel.appendChild(mkSec('\u9605\u8bfb\u8bbe\u7f6e'));   /* 阅读设置 */

      /* Font size row: A-  18px  A+ */
      var fsRow = document.createElement('div');
      fsRow.className = 'luliy-ctrl-row';
      fsRow.style.cursor = 'default';
      var fsLbl = document.createElement('span');
      fsLbl.className = 'luliy-ctrl-lbl';
      fsLbl.textContent = '\uD83D\uDD24 \u5b57\u53f7';        /* 🔤 字号 */
      var fsCtrls = document.createElement('span');
      fsCtrls.style.cssText = 'display:flex;align-items:center;gap:6px';
      function mkFsBtn(txt) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = txt;
        b.className = 'luliy-fs-btn';
        return b;
      }
      var fsMinus = mkFsBtn('A-');
      var fsVal = document.createElement('span');
      fsVal.className = 'luliy-ctrl-badge';
      var fsPlus = mkFsBtn('A+');
      fsCtrls.appendChild(fsMinus); fsCtrls.appendChild(fsVal); fsCtrls.appendChild(fsPlus);
      fsRow.appendChild(fsLbl); fsRow.appendChild(fsCtrls);
      panel.appendChild(fsRow);

      function curFs() { return parseInt(_lsGet('luliy-fontsize') || '18', 10) || 18; }
      function setFs(px) {
        px = Math.min(24, Math.max(14, px));
        _lsSet('luliy-fontsize', String(px));
        applyReadingPrefs();
        fsVal.textContent = px + 'px';
      }
      fsVal.textContent = curFs() + 'px';
      fsMinus.addEventListener('click', function (e) { e.stopPropagation(); setFs(curFs() - 1); playSfx('click'); });
      fsPlus.addEventListener('click',  function (e) { e.stopPropagation(); setFs(curFs() + 1); playSfx('click'); });

      /* Font style: cycle default → 黑体 → 苍耳今楷 */
      var _fontLabels = {'0':'\u9ed8\u8ba4','1':'\u9ed1\u4f53','2':'\u82cd\u8033\u6977'};
      var sansRow = mkRow('\u270d', '\u5b57\u4f53', _fontLabels[_lsGet('luliy-sans')||'0']);
      sansRow.addEventListener('click', function (e) {
        e.stopPropagation();
        var cur = _lsGet('luliy-sans') || '0';
        var next = cur === '0' ? '1' : cur === '1' ? '2' : '0';
        _lsSet('luliy-sans', next);
        sansRow._bdg.textContent = _fontLabels[next];
        applyReadingPrefs();
        playSfx('click');
      });
      panel.appendChild(sansRow);

      /* Reading-panel width — slider 0..400px (extends both sides) */
      var pwSlider = mkSlider({
        emoji: '\u2194\uFE0F', label: '\u9605\u8bfb\u5bbd\u5ea6',   /* ↔️ 阅读宽度 */
        min: 0, max: 400, step: 20,
        value: parseInt(_lsGet('luliy-pbwidth') || '0', 10) || 0,
        format: function (v) { return '+' + v; },
        onInput: function (v) {
          _lsSet('luliy-pbwidth', String(v));
          if (root._luliyApplyPbWidth) root._luliyApplyPbWidth();
        }
      });
      panel.appendChild(pwSlider);
    }

    /* ── ⚙ Extras: card view / cursor trail / fireflies / focus / reduce-motion ── */
    panel.appendChild(mkSep());
    panel.appendChild(mkSec('\u2728 \u4e2a\u6027\u5316'));   /* ✨ 个性化 */

    /* Card view (grid/list) — only meaningful on list pages */
    var _cvLabels = { grid: '\u7f51\u683c', list: '\u5217\u8868', timeline: '\u65f6\u95f4\u8f74' };
    var cardViewRow = mkRow('\uD83D\uDD33', '\u5361\u7247\u89c6\u56fe', _cvLabels[getCardView()]);
    cardViewRow.addEventListener('click', function (e) {
      e.stopPropagation();
      var order = ['grid', 'list', 'timeline'];
      var cur = order.indexOf(getCardView());
      var next = order[(cur + 1) % order.length];
      _lsSet('luliy-cardview', next);
      cardViewRow._bdg.textContent = _cvLabels[next];
      if (root._luliyRerenderCards) root._luliyRerenderCards();
      else applyCardView();
      playSfx('click');
    });
    panel.appendChild(cardViewRow);

    /* Reduce-motion override */
    var reduceRow = mkRow('\uD83C\uDF00', '\u51cf\u5f31\u52a8\u6548',
      _lsGet('luliy-reduce') === '1' ? '\u5f00\u542f' : '\u5173\u95ed');
    reduceRow.addEventListener('click', function (e) {
      e.stopPropagation();
      var on = _lsGet('luliy-reduce') === '1';
      var turningOn = !on;
      _lsSet('luliy-reduce', turningOn ? '1' : '0');
      reduceRow._bdg.textContent = turningOn ? '\u5f00\u542f' : '\u5173\u95ed';
      applyReduceMotion();
      /* ★ 不只是切 CSS class（那只能停掉 CSS 动画），
         不影响阅读的装饰性效果（背景粒子、樱花）要真的整套停掉/重启，
         不能让它们在后台继续跑。各自的 init 函数内部仍会检查
         luliy-cyber / luliy-sakura 这两个独立开关，不会覆盖用户
         本来就关掉的选择。 */
      if (turningOn) {
        if (root._luliyStopCyberParticles) root._luliyStopCyberParticles();
        if (root._luliyStopSakura) root._luliyStopSakura();
      } else {
        if (root._luliyInitCyberParticles) root._luliyInitCyberParticles();
        if (root._luliyInitSakura) root._luliyInitSakura();
      }
      playSfx('click');
    });
    panel.appendChild(reduceRow);

    /* Toggle open / close */
    ctrlBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = panel.classList.toggle('is-open');
      ctrlBtn.classList.toggle('is-open', open);
      ctrlBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) syncThemeRows();
    });
    document.addEventListener('click', function () {
      panel.classList.remove('is-open');
      ctrlBtn.classList.remove('is-open');
      ctrlBtn.setAttribute('aria-expanded', 'false');
    });
    panel.addEventListener('click', function (e) { e.stopPropagation(); });

    var ctrlWrap = document.createElement('div');
    ctrlWrap.style.cssText = 'position:relative;display:flex;flex-direction:column;align-items:flex-end';
    ctrlWrap.appendChild(ctrlBtn);
    ctrlWrap.appendChild(panel);
    bar.appendChild(ctrlWrap);
    document.body.appendChild(bar);
    applySink(_lsGet('luliy-sink') || 'cyberpunk');
  }

  /* ---- 14  Home card rebuild ------------------------------ */
  function buildPostLink(rawLink) {
    var lnk = rawLink || '#';
    if (lnk !== '#') {
      lnk = lnk.replace(/^\//, '');
      lnk = lnk.replace(/^post\/post\//, 'post/');
      if (!/^post\//.test(lnk) && !/^https?:\/\//.test(lnk)) lnk = 'post/' + lnk;
      lnk = '/' + lnk;
    }
    return lnk;
  }

  /* ============================================================
     归档页 Archives —— 双标签页（Weekly / Other）+ 按年分组 + 分页
     ★ 替换原来的「时间线视图」归档页。复用现成的 fetchPosts() /
     esc() / buildPostLink()，赛博朋克风格沿用全站 CSS 变量。
     ============================================================ */
  var ARCHIVE_WEEKLY_LABELS = ['Weekly', 'weekly', '\u5468\u8bb0', '\u5468\u62a5', '\u4e8c\u5341\u56db\u8282\u6c14'];
  var ARCHIVE_SYSTEM_LABELS = ['archives', 'archive', 'chronicle', 'chronicle-data',
    'about', 'page', 'Pages', '\u9875\u9762', 'book', 'favorites', 'stock', 'link', 'gallery'];

  function archiveIsWeekly(post) {
    var names = (post.labels || []).map(function (l) { return l.name; });
    for (var i = 0; i < names.length; i++) {
      if (ARCHIVE_WEEKLY_LABELS.indexOf(names[i]) !== -1) return true;
    }
    return false;
  }
  function archiveIsSystem(post) {
    var names = (post.labels || []).map(function (l) { return l.name; });
    for (var i = 0; i < names.length; i++) {
      if (ARCHIVE_SYSTEM_LABELS.indexOf(names[i]) !== -1) return true;
    }
    return false;
  }
  function archiveGroupByYear(posts) {
    var groups = {};
    posts.forEach(function (p) {
      var y = (p.created || '').slice(0, 4) || '\u672a\u77e5';   /* 未知 */
      if (!groups[y]) groups[y] = [];
      groups[y].push(p);
    });
    return groups;
  }

  function initArchivesPage() {
    var pb = document.getElementById('postBody');
    if (!pb) return;
    /* ★ 幂等防护：已经初始化过就直接返回，避免重复渲染/重复绑事件 */
    if (document.getElementById('luliy-archives')) return;
    /* 标记 body：隐藏 Gmeek 原生翻页器等 */
    document.body.classList.add('luliy-archives-takeover', 'luliy-hide-pagination');

    pb.innerHTML = '<div id="luliy-archives" class="luliy-archives">' +
      '<div class="luliy-arch-loading">\u52a0\u8f7d\u4e2d\u2026</div></div>';
    var root2 = document.getElementById('luliy-archives');

    var PER_PAGE = 10;
    var TAB_KEY = 'luliy-archive-tab';
    var state = {
      tab: (_lsGet(TAB_KEY) === 'other') ? 'other' : 'weekly',
      pageWeekly: 1,
      pageOther: 1,
      weekly: [],
      other: []
    };

    fetchPosts().then(function (posts) {
      if (!posts || !posts.length) {
        root2.innerHTML = '<div class="luliy-arch-error">\u65e0\u6cd5\u8bfb\u53d6\u6587\u7ae0\u5217\u8868\uff0c' +
          '\u8bf7\u786e\u8ba4 Gmeek \u5df2\u751f\u6210 postList.json\u3002</div>';
        return;
      }
      /* 按日期降序 */
      posts.sort(function (a, b) {
        return String(b.created).localeCompare(String(a.created));
      });
      posts.forEach(function (p) {
        if (archiveIsWeekly(p)) state.weekly.push(p);
        else if (!archiveIsSystem(p)) state.other.push(p);
      });
      renderArchivesShell();
    }).catch(function (e) {
      try { console.warn('[luliy] archive page failed to load posts:', e); } catch (e2) {}
      root2.innerHTML = '<div class="luliy-arch-error">\u65e0\u6cd5\u8bfb\u53d6\u6587\u7ae0\u5217\u8868\uff0c' +
        '\u8bf7\u786e\u8ba4 Gmeek \u5df2\u751f\u6210 postList.json\u3002</div>';
    });

    function renderArchivesShell() {
      root2.innerHTML =
        '<div class="luliy-arch-header">' +
          '<h1 class="luliy-arch-title">Archives</h1>' +
          '<div class="luliy-arch-tabbar">' +
            '<button type="button" class="luliy-arch-tab" data-tab="weekly">Weekly</button>' +
            '<span class="luliy-arch-tabsep"></span>' +
            '<button type="button" class="luliy-arch-tab" data-tab="other">Other</button>' +
          '</div>' +
        '</div>' +
        '<div class="luliy-arch-body"></div>';

      root2.querySelectorAll('.luliy-arch-tab').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var t = btn.getAttribute('data-tab');
          if (t === state.tab) return;
          state.tab = t;
          _lsSet(TAB_KEY, t);
          renderArchiveBody();
        });
      });
      renderArchiveBody();
    }

    function renderArchiveBody() {
      /* 高亮当前标签 */
      root2.querySelectorAll('.luliy-arch-tab').forEach(function (btn) {
        btn.classList.toggle('is-active', btn.getAttribute('data-tab') === state.tab);
      });
      var body = root2.querySelector('.luliy-arch-body');
      var list = (state.tab === 'weekly') ? state.weekly : state.other;
      var page = (state.tab === 'weekly') ? state.pageWeekly : state.pageOther;
      var totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE));
      if (page > totalPages) { page = totalPages; }

      if (!list.length) {
        body.innerHTML = '<div class="luliy-arch-empty">\u6682\u65e0\u6587\u7ae0</div>';   /* 暂无文章 */
        return;
      }

      var start = (page - 1) * PER_PAGE;
      var pageItems = list.slice(start, start + PER_PAGE);
      var groups = archiveGroupByYear(pageItems);
      var years = Object.keys(groups).sort(function (a, b) { return b.localeCompare(a); });

      var html = '<div class="luliy-arch-list">';
      years.forEach(function (y) {
        html += '<div class="luliy-arch-year">' + esc(y) + '</div>';
        groups[y].forEach(function (p) {
          var href = buildPostLink(p.link);
          var date = (p.created || '').slice(0, 10);
          html += '<a class="luliy-arch-row" href="' + esc(href) + '">' +
            '<span class="luliy-arch-date">' + esc(date) + '</span>' +
            '<span class="luliy-arch-name">' + esc(p.title) + '</span>' +
          '</a>';
        });
      });
      html += '</div>';

      /* 分页（超过一页才显示） */
      if (totalPages > 1) {
        html += '<div class="luliy-arch-pagination">' +
          '<button type="button" class="luliy-arch-pgbtn" data-dir="prev"' +
            (page <= 1 ? ' disabled' : '') + '>&lt;</button>' +
          '<span class="luliy-arch-pginfo">Page ' + page + ' of ' + totalPages + '</span>' +
          '<button type="button" class="luliy-arch-pgbtn" data-dir="next"' +
            (page >= totalPages ? ' disabled' : '') + '>&gt;</button>' +
        '</div>';
      }
      body.innerHTML = html;

      body.querySelectorAll('.luliy-arch-pgbtn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (btn.disabled) return;
          var dir = btn.getAttribute('data-dir');
          var cur = (state.tab === 'weekly') ? state.pageWeekly : state.pageOther;
          cur += (dir === 'next' ? 1 : -1);
          cur = Math.max(1, Math.min(totalPages, cur));
          if (state.tab === 'weekly') state.pageWeekly = cur; else state.pageOther = cur;
          renderArchiveBody();
          /* 翻页后滚回列表顶部，体验更顺 */
          try { root2.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) {}
        });
      });
    }
  }

  /* ============================================================
     编年史 Chronicle —— 年份 + 分类（出游/书影游/海报墙）
     ★ 优先读 GitHub API（chronicle-data 标签的 issue），失败则
     回退到页面内置的 JSON。赛博朋克风格沿用全站 CSS 变量。
     ============================================================ */
  var CHRONICLE_REPO = (window.LULIY_CHRONICLE_REPO || 'luliyer6-ux/luliyer6-ux.github.io');

  function chronicleExtractJson(body) {
    if (!body) return null;
    var m = body.match(/<!--\s*chronicle:data:start\s*-->([\s\S]*?)<!--\s*chronicle:data:end\s*-->/);
    if (!m) return null;
    try { return JSON.parse(m[1].trim()); } catch (e) { return null; }
  }

  function chronicleFetchIssueData() {
    var url = 'https://api.github.com/repos/' + CHRONICLE_REPO +
      '/issues?state=open&labels=chronicle-data&per_page=1';
    return fetch(url, { cache: 'no-store' })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (arr) {
        if (!arr || !arr.length) return null;
        return chronicleExtractJson(arr[0].body);
      })
      .catch(function () { return null; });
  }

  function chronicleGetFallback() {
    var el = document.getElementById('luliy-chronicle-fallback');
    if (!el) return null;
    try { return JSON.parse(el.textContent.trim()); } catch (e) { return null; }
  }

  function initChroniclePage() {
    var pb = document.getElementById('postBody');
    if (!pb) return;
    /* ★ 幂等防护：已经初始化过就直接返回 */
    if (document.getElementById('luliy-chronicle')) return;
    document.body.classList.add('luliy-chronicle-takeover', 'luliy-hide-pagination');

    /* ★ 移除「预计阅读」和「文末字数」元素（Chronicle 不是普通文章，
       不需要显示这些信息；CSS 也有隐藏，这里双重保险）。 */
    ['luliy-readmeta', 'luliy-post-footer-bar'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.parentNode) el.parentNode.removeChild(el);
    });

    /* 把可能存在的内置 fallback JSON 先抢救出来（pb.innerHTML 会被覆盖） */
    var fallbackJson = chronicleGetFallback();

    pb.innerHTML = '<div id="luliy-chronicle" class="luliy-chronicle">' +
      '<div class="luliy-chron-loading">\u52a0\u8f7d\u4e2d\u2026</div></div>';
    var root2 = document.getElementById('luliy-chronicle');

    var YEAR_KEY = 'luliy-chronicle-year';
    var CAT_KEY = 'luliy-chronicle-category';

    chronicleFetchIssueData().then(function (apiData) {
      var data = apiData || fallbackJson;
      if (!data || !data.years || !data.years.length) {
        root2.innerHTML = '<div class="luliy-chron-error">\u65e0\u6cd5\u8bfb\u53d6\u7f16\u5e74\u53f2\u6570\u636e\u3002</div>';
        return;
      }
      renderChronicle(data);
    }).catch(function (e) {
      /* 兜底：万一渲染过程本身抛错（比如数据结构异常），也优雅降级 */
      try { console.warn('[luliy] chronicle page render failed:', e); } catch (e2) {}
      var data = fallbackJson;
      if (data && data.years && data.years.length) {
        try { renderChronicle(data); return; } catch (e) {}
      }
      root2.innerHTML = '<div class="luliy-chron-error">\u65e0\u6cd5\u8bfb\u53d6\u7f16\u5e74\u53f2\u6570\u636e\u3002</div>';
    });

    function renderChronicle(data) {
      var years = data.years;
      var cats = data.categories || [];

      var savedYear = _lsGet(YEAR_KEY);
      var savedCat = _lsGet(CAT_KEY);
      var curYear = (years.indexOf(savedYear) !== -1) ? savedYear : years[0];
      var catKeys = cats.map(function (c) { return c.key; });
      var curCat = (catKeys.indexOf(savedCat) !== -1) ? savedCat : (cats[0] && cats[0].key);

      root2.innerHTML =
        '<div class="luliy-chron-header">' +
          '<h1 class="luliy-chron-title">Chronicle</h1>' +
          '<div class="luliy-chron-years"></div>' +
        '</div>' +
        '<div class="luliy-chron-cats"></div>' +
        '<div class="luliy-chron-body"></div>';

      var yearsBox = root2.querySelector('.luliy-chron-years');
      years.forEach(function (y) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'luliy-chron-year-tab';
        b.textContent = y;
        b.setAttribute('data-year', y);
        b.addEventListener('click', function () {
          if (y === curYear) return;
          curYear = y;
          _lsSet(YEAR_KEY, y);
          syncTabs(); renderBody();
        });
        yearsBox.appendChild(b);
      });

      var catsBox = root2.querySelector('.luliy-chron-cats');
      cats.forEach(function (c) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'luliy-chron-cat-tab';
        b.textContent = c.label;
        b.setAttribute('data-cat', c.key);
        b.addEventListener('click', function () {
          if (c.key === curCat) return;
          curCat = c.key;
          _lsSet(CAT_KEY, c.key);
          syncTabs(); renderBody();
        });
        catsBox.appendChild(b);
      });

      function syncTabs() {
        root2.querySelectorAll('.luliy-chron-year-tab').forEach(function (b) {
          b.classList.toggle('is-active', b.getAttribute('data-year') === curYear);
        });
        root2.querySelectorAll('.luliy-chron-cat-tab').forEach(function (b) {
          b.classList.toggle('is-active', b.getAttribute('data-cat') === curCat);
        });
      }

      function renderBody() {
        var body = root2.querySelector('.luliy-chron-body');
        var yearData = (data.data && data.data[curYear]) || {};
        var list = yearData[curCat] || [];
        if (curCat === 'travel') body.innerHTML = renderTravel(list);
        else if (curCat === 'media') body.innerHTML = renderMedia(list);
        else if (curCat === 'posters') body.innerHTML = renderPosters(list);
        else body.innerHTML = '<div class="luliy-chron-empty">\u6682\u65e0\u5185\u5bb9</div>';
      }

      syncTabs();
      renderBody();
    }

    /* —— 出游：月份 | 城市 | 活动 三列 ——
       ★ 同月份的多条记录合并月份格（rowspan），实现"Jan. 跨多行"效果。 */
    function renderTravel(list) {
      if (!list || !list.length) return '<div class="luliy-chron-empty">\u6682\u65e0\u5185\u5bb9</div>';
      var h = '<div class="luliy-chron-scroll-x"><div class="luliy-chron-tablewrap"><table class="luliy-chron-table"><thead><tr>' +
        '<th>\u6708\u4efd</th><th>\u57ce\u5e02</th><th>\u6d3b\u52a8</th></tr></thead><tbody>';

      function makeActs(row) {
        return (row.items || []).map(function (it) {
          if (it && it.url) {
            return '<a href="' + esc(buildPostLink(it.url)) + '">' + esc(it.title || '') + '</a>';
          }
          return esc((it && it.title) || String(it || ''));
        }).join('\u3001');
      }

      var i = 0;
      while (i < list.length) {
        var month = list[i].month || '';
        /* 统计连续相同月份的条数，用于 rowspan */
        var span = 1;
        while (i + span < list.length && (list[i + span].month || '') === month) span++;

        /* 第一行：带 rowspan 的月份格 */
        h += '<tr>' +
          '<td rowspan="' + span + '" class="luliy-chron-month-cell">' + esc(month) + '</td>' +
          '<td data-label="\u57ce\u5e02">' + esc(list[i].city || '') + '</td>' +
          '<td data-label="\u6d3b\u52a8">' + makeActs(list[i]) + '</td>' +
        '</tr>';

        /* 同月的后续行：不再重复月份格 */
        for (var j = 1; j < span; j++) {
          h += '<tr>' +
            '<td data-label="\u57ce\u5e02">' + esc(list[i + j].city || '') + '</td>' +
            '<td data-label="\u6d3b\u52a8">' + makeActs(list[i + j]) + '</td>' +
          '</tr>';
        }
        i += span;
      }
      h += '</tbody></table></div></div>';
      return h;
    }

    /* —— 书影游：月份 | 读书 | 观影 | 演出 | 游戏 五列 —— */
    function renderMedia(list) {
      if (!list || !list.length) return '<div class="luliy-chron-empty">\u6682\u65e0\u5185\u5bb9</div>';
      function cell(arr) {
        if (!arr || !arr.length) return '';
        return arr.map(function (it) {
          if (it && typeof it === 'object' && it.url) {
            return '<a href="' + esc(buildPostLink(it.url)) + '">' + esc(it.title || '') + '</a>';
          }
          return esc(typeof it === 'object' ? (it.title || '') : String(it));
        }).join(' / ');
      }
      var h = '<div class="luliy-chron-scroll-x"><div class="luliy-chron-tablewrap"><table class="luliy-chron-table"><thead><tr>' +
        '<th>\u6708\u4efd</th><th>\u8bfb\u4e66/\u6f2b\u753b</th><th>\u89c2\u5f71/\u5267\u96c6/\u756a\u5267</th>' +
        '<th>\u6f14\u51fa/\u653e\u6620</th><th>\u6e38\u620f/\u5b9e\u51b5</th></tr></thead><tbody>';
      list.forEach(function (row) {
        h += '<tr><td class="luliy-chron-month-cell">' + esc(row.month || '') + '</td>' +
          '<td data-label="\u8bfb\u4e66">' + cell(row.books) + '</td>' +
          '<td data-label="\u89c2\u5f71">' + cell(row.watch) + '</td>' +
          '<td data-label="\u6f14\u51fa">' + cell(row.shows) + '</td>' +
          '<td data-label="\u6e38\u620f">' + cell(row.games) + '</td></tr>';
      });
      h += '</tbody></table></div></div>';
      return h;
    }

    /* —— 海报墙：响应式网格 7/5/3 列 —— */
    function renderPosters(list) {
      if (!list || !list.length) return '<div class="luliy-chron-empty">\u6682\u65e0\u5185\u5bb9</div>';
      var h = '<div class="luliy-chron-posters">';
      list.forEach(function (p, i) {
        /* ★ 点击海报触发灯箱，data-index 记录位置；有 url 的单独在灯箱里提供跳转按钮 */
        h += '<button type="button" class="luliy-poster-item" data-index="' + i + '"' +
          (p.url ? ' data-url="' + esc(buildPostLink(p.url)) + '"' : '') + '>' +
          '<div class="luliy-poster-img" style="background-image:url(\'' + esc(p.image || '') + '\')"></div>' +
          '<div class="luliy-poster-title">' + esc(p.title || '') + '</div>' +
          '</button>';
      });
      h += '</div>';

      /* 灯箱初始化（在 DOM 插入后由 body.click 事件委托触发） */
      setTimeout(function () {
        var body = document.querySelector('.luliy-chron-body');
        if (!body || body._lightboxBound) return;
        body._lightboxBound = true;

        function openLightbox(idx) {
          var lb = document.getElementById('luliy-lb');
          if (!lb) {
            lb = document.createElement('div'); lb.id = 'luliy-lb';
            lb.innerHTML =
              '<div class="luliy-lb-bg"></div>' +
              '<button class="luliy-lb-prev" aria-label="\u4e0a\u4e00\u5f20">&#8249;</button>' +
              '<button class="luliy-lb-next" aria-label="\u4e0b\u4e00\u5f20">&#8250;</button>' +
              '<div class="luliy-lb-img-wrap"><img class="luliy-lb-img" alt=""><div class="luliy-lb-cap"></div>' +
              '<a class="luliy-lb-link" target="_blank" rel="noopener">\u67e5\u770b\u6587\u7ae0 \u2192</a></div>' +
              '<button class="luliy-lb-close" aria-label="\u5173\u95ed">&#10005;</button>';
            document.body.appendChild(lb);

            /* 背景/关闭按钮关闭 */
            lb.querySelector('.luliy-lb-bg').addEventListener('click', closeLightbox);
            lb.querySelector('.luliy-lb-close').addEventListener('click', closeLightbox);
            lb.querySelector('.luliy-lb-prev').addEventListener('click', function () { navLightbox(-1); });
            lb.querySelector('.luliy-lb-next').addEventListener('click', function () { navLightbox(1); });

            /* 键盘 */
            document.addEventListener('keydown', function (e) {
              if (!lb.classList.contains('is-open')) return;
              if (e.key === 'ArrowLeft'  || e.keyCode === 37) navLightbox(-1);
              if (e.key === 'ArrowRight' || e.keyCode === 39) navLightbox(1);
              if (e.key === 'Escape'     || e.keyCode === 27) closeLightbox();
            });

            /* 触摸滑动 */
            var _tx = 0;
            lb.addEventListener('touchstart', function (e) { _tx = e.touches[0].clientX; }, { passive: true });
            lb.addEventListener('touchend', function (e) {
              var diff = e.changedTouches[0].clientX - _tx;
              if (Math.abs(diff) > 40) navLightbox(diff < 0 ? 1 : -1);
            }, { passive: true });
          }

          lb._list = list; lb._idx = idx;
          showLightboxItem(lb, idx);
          lb.classList.add('is-open');
          document.body.classList.add('luliy-lb-open');
        }

        function showLightboxItem(lb, idx) {
          var p = lb._list[idx];
          lb.querySelector('.luliy-lb-img').src = p.image || '';
          lb.querySelector('.luliy-lb-cap').textContent = p.title || '';
          var linkEl = lb.querySelector('.luliy-lb-link');
          if (p.url) { linkEl.href = buildPostLink(p.url); linkEl.style.display = ''; }
          else { linkEl.style.display = 'none'; }
          /* 更新前后箭头可用状态 */
          lb.querySelector('.luliy-lb-prev').disabled = idx <= 0;
          lb.querySelector('.luliy-lb-next').disabled = idx >= lb._list.length - 1;
          lb._idx = idx;
        }

        function navLightbox(dir) {
          var lb = document.getElementById('luliy-lb');
          if (!lb) return;
          var next = lb._idx + dir;
          if (next < 0 || next >= lb._list.length) return;
          showLightboxItem(lb, next);
        }

        function closeLightbox() {
          var lb = document.getElementById('luliy-lb');
          if (lb) lb.classList.remove('is-open');
          document.body.classList.remove('luliy-lb-open');
        }

        body.addEventListener('click', function (e) {
          var btn = e.target.closest('.luliy-poster-item');
          if (!btn) return;
          var idx = parseInt(btn.getAttribute('data-index') || '0', 10);
          openLightbox(idx);
        });
      }, 0);

      return h;
    }
  }

  function isChroniclePage() {
    /* ★ 只用 URL 路径判断，绝不能再看「页面里有没有 fallback 元素」——
       否则任何一篇文章只要正文里出现了 luliy-chronicle-fallback 这串字符
       （比如把本功能的部署指南当文章发出来），就会被误判成 Chronicle 页、
       整篇内容被接管替换掉。这是之前的严重 bug。
       Gmeek 生成的单页文件名就是 chronicle.html，按路径认最稳妥。 */
    return /(^|\/)chronicle(\.html)?$/i.test(location.pathname);
  }

  /* ============================================================
     书架 Bookshelf（singlePage: book）—— 赛博朋克风
     自动读 postList.json 里带 Library 标签的文章，按第二个标签
     归入「小说 / 成长 / 投资 / 现实 / 杂项」五大类，带「在读」标签
     的书额外放进右侧在读书堆。点击书脊跳到对应文章。
     ============================================================ */
  var BOOK_LABEL = 'Library';
  var BOOK_CATEGORIES = ['\u5c0f\u8bf4', '\u6210\u957f', '\u6295\u8d44', '\u73b0\u5b9e', '\u6742\u9879'];  /* 小说 成长 投资 现实 杂项 */
  var BOOK_READING_LABEL = '\u5728\u8bfb';   /* 在读 */
  /* ★ 手动补充的书（还没写文章、想先占位的）：
     { title, href, category, reading } —— category 必须是上面五类之一 */
  var BOOK_EXTRA = (window.LULIY_EXTRA_BOOKS && Array.isArray(window.LULIY_EXTRA_BOOKS))
    ? window.LULIY_EXTRA_BOOKS : [];

  var BOOK_PALETTE = ['#7A2E6B', '#2C4E6B', '#2E5C5A', '#5C2E6B', '#6B2E4A', '#3E2E6B'];
  function bookHash(s) {
    var h = 0; s = String(s);
    for (var i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; }
    return Math.abs(h);
  }

  function isBookPage() {
    return /(^|\/)book(\.html)?$/i.test(location.pathname);
  }

  function initBookPage() {
    var pb = document.getElementById('postBody');
    if (!pb) return;
    if (document.getElementById('luliy-bookshelf')) return;   /* 幂等 */
    document.body.classList.add('luliy-book-takeover', 'luliy-hide-pagination');

    pb.innerHTML = '<div id="luliy-bookshelf" class="luliy-bookshelf">' +
      '<div class="luliy-book-loading">\u52a0\u8f7d\u4e2d\u2026</div></div>';
    var root2 = document.getElementById('luliy-bookshelf');

    fetchPosts().then(function (posts) {
      var books = [];
      (posts || []).forEach(function (p) {
        var names = (p.labels || []).map(function (l) { return l.name; });
        if (names.indexOf(BOOK_LABEL) === -1) return;   /* 只要 Library 文章 */
        /* 分类 = 第一个命中五大类的标签，否则归杂项 */
        var cat = '\u6742\u9879';
        for (var i = 0; i < names.length; i++) {
          if (BOOK_CATEGORIES.indexOf(names[i]) !== -1) { cat = names[i]; break; }
        }
        books.push({
          title: p.title, href: buildPostLink(p.link), created: (p.created || '').slice(0, 10),
          category: cat, reading: names.indexOf(BOOK_READING_LABEL) !== -1
        });
      });
      /* 合并手动补充的书 */
      BOOK_EXTRA.forEach(function (b) {
        books.push({
          title: b.title || '\u672a\u547d\u540d', href: b.href || '#',
          created: b.created || '', category: BOOK_CATEGORIES.indexOf(b.category) !== -1 ? b.category : '\u6742\u9879',
          reading: !!b.reading
        });
      });
      renderBookshelf(books);
    }).catch(function (e) {
      try { console.warn('[luliy] bookshelf page failed to load posts:', e); } catch (e2) {}
      root2.innerHTML = '<div class="luliy-book-error">\u65e0\u6cd5\u8bfb\u53d6\u6587\u7ae0\u5217\u8868\uff0c' +
        '\u8bf7\u786e\u8ba4 Gmeek \u5df2\u751f\u6210 postList.json\u3002</div>';
    });

    function renderBookshelf(books) {
      var readingBooks = books.filter(function (b) { return b.reading; });

      var html = '<div class="luliy-book-header">' +
        '<h1 class="luliy-book-title">\u6211\u7684\u4e66\u67b6</h1>' +   /* 我的书架 */
        '<p class="luliy-book-sub">\u70b9\u51fb\u4e66\u810a\uff0c\u524d\u5f80\u5bf9\u5e94\u7684\u6587\u7ae0 \u00b7 \u5171 ' +
          books.length + ' \u672c</p></div>';   /* 点击书脊，前往对应的文章 · 共 N 本 */

      html += '<div class="luliy-bookcase">';
      BOOK_CATEGORIES.forEach(function (cat, ci) {
        var inCat = books.filter(function (b) { return b.category === cat; });
        html += '<section class="luliy-shelf">';
        html += '<div class="luliy-shelf-plaque">' + esc(cat) +
          ' <span class="luliy-shelf-count">' + inCat.length + ' \u672c</span></div>';   /* N 本 */
        html += '<div class="luliy-shelf-row">';
        if (!inCat.length) {
          html += '<div class="luliy-shelf-empty">\u6682\u65e0\u4e66\u7c4d</div>';   /* 暂无书籍 */
        } else {
          inCat.forEach(function (b) { html += buildSpine(b); });
        }
        /* 在读书堆放在第一个有在读书的分类那一层尾部 */
        if (ci === 0 && readingBooks.length) {
          html += buildReadingZone(readingBooks);
        }
        html += '</div><div class="luliy-shelf-board"></div></section>';
      });
      html += '</div>';

      root2.innerHTML = html;
    }

    function buildSpine(b) {
      var h = bookHash(b.title);
      var w = 44 + (h % 20);          /* 44–64px */
      var ht = 150 + (h % 36);        /* 150–186px */
      var tilt = (h % 7) - 3;         /* -3..3deg */
      var color = BOOK_PALETTE[h % BOOK_PALETTE.length];
      var meta = b.created ? ('<span class="luliy-spine-note">' + esc(b.created) + '</span>') : '';
      return '<a class="luliy-spine" href="' + esc(b.href) + '" ' +
        'style="--tilt:' + tilt + 'deg;width:' + w + 'px;height:' + ht + 'px;' +
        'background:linear-gradient(90deg,' + color + ',' + color + 'cc);" ' +
        'aria-label="' + esc(b.title) + '">' +
        '<span class="luliy-spine-title">' + esc(b.title) + '</span>' +
        '<span class="luliy-spine-tip"><strong>' + esc(b.title) + '</strong>' + meta + '</span>' +
        '</a>';
    }

    function buildReadingZone(readingBooks) {
      var h = '<div class="luliy-reading-zone"><span class="luliy-reading-label">\u5728\u8bfb</span>' +   /* 在读 */
        '<div class="luliy-reading-stack">';
      readingBooks.slice(0, 3).forEach(function (b, i) {
        var color = BOOK_PALETTE[bookHash(b.title) % BOOK_PALETTE.length];
        h += '<a class="luliy-flat-book' + (i === 0 ? ' is-top' : '') + '" href="' + esc(b.href) + '" ' +
          'style="bottom:' + (i * 12) + 'px;z-index:' + (10 - i) + ';background:' + color + ';" ' +
          'aria-label="\u5728\u8bfb\uff1a' + esc(b.title) + '">' + esc(b.title) + '</a>';
      });
      h += '</div></div>';
      return h;
    }
  }


  function initCards() {
    var isTagPage = /tag\.html?$|\/tag\/?$/i.test(location.pathname);
    var isArchive = isArchivePage();

    /* ★ 归档页改用全新的「Archives 双标签页」模块（Weekly/Other + 分页），
       不再走下面这套「卡片 + 时间线」渲染。 */
    if (isArchive) { initArchivesPage(); return; }

    /* ★ 真正的首页（既不是分类页也不是归档页）只要「Hero + 六张分类卡片」，
       绝不在这里渲染文章列表——哪怕 Gmeek 原生还在首页 DOM 里塞了一份 SideNav。 */
    if (isIndexPage() && !isTagPage && !isArchive) return;

    var nav;

    if (isTagPage) {
      /* ★ 分类页（tag.html）：它自带一套原生 JS——会自己拉 postList.json、
         生成 .lists 列表项、用 style.display 做标签筛选。那套和我们这套
         卡片系统会互相打架（原生筛选只认 .lists，对我们的卡片无效；两份
         列表还会叠加）。所以这里彻底"另起炉灶"：
           1) 给 body 打标记，CSS 隐藏页面里所有原生 .SideNav 与原生标签条
              （用 body 标记而非逐个打标记，可覆盖原生脚本"异步生成"的列表，
              否则它生成晚于我们时会漏网）；
           2) 新建一个我们自己的容器来渲染卡片；
           3) 标签筛选完全由我们按 location.hash 控制。 */
      document.body.classList.add('luliy-tag-takeover');

      var host = document.getElementById('content') ||
                 document.querySelector('.main') || document.body;
      nav = document.getElementById('luliy-tag-grid');
      if (!nav) {
        nav = document.createElement('ul');
        nav.id = 'luliy-tag-grid';
        nav.className = 'SideNav';
        host.appendChild(nav);
      }
    } else {
      nav = document.querySelector('nav.SideNav, ul.SideNav, .SideNav');
      if (!nav && isArchive) {
        /* archive.html 是单页类型，原生没有 SideNav 列表容器——
           在 #postBody 里现造一个，交给统一的卡片渲染逻辑接管，
           直接复用"漂亮卡片 + 时间轴视图"。 */
        var pbArchive = document.getElementById('postBody');
        if (pbArchive) {
          pbArchive.innerHTML = '';
          nav = document.createElement('ul');
          nav.className = 'SideNav';
          pbArchive.appendChild(nav);
        }
      }
    }

    if (!nav || nav.getAttribute('data-luliy-cards')) return;
    nav.setAttribute('data-luliy-cards', '1');
    /* ★ 分类页/归档页：标记 body，隐藏 Gmeek 原生的「上一页/下一页」翻页器 */
    if (isTagPage || isArchive) document.body.classList.add('luliy-hide-pagination');

    /* Show skeleton placeholders while postList.json loads */
    showCardSkeleton(nav);

    function buildCard(post, isPinned, colourIdx) {
      var li = document.createElement('li');
      li.className = 'luliy-card';
      li.setAttribute('data-ci', String((colourIdx || 0) % 4));
      if (isPinned) li.setAttribute('data-pinned', '1');

      /* Theme decoration layer (sakura petals / stars / etc.) */
      var deco = document.createElement('div');
      deco.className = 'luliy-card-deco';
      deco.setAttribute('aria-hidden', 'true');
      li.appendChild(deco);

      var a = document.createElement('a');
      a.href = buildPostLink(post.link);
      a.className = 'luliy-card-inner';

      var dateEl = document.createElement('div');
      dateEl.className = 'luliy-card-date';
      var absDate = post.created ? post.created.slice(0, 10) : '';
      var relDate = relativeTime(post.created);
      /* Relative time display, absolute date on hover */
      dateEl.textContent = relDate ? (relDate + ' \u00b7 ' + absDate) : absDate;
      dateEl.title = absDate;

      var titleEl = document.createElement('div');
      titleEl.className = 'luliy-card-title';
      titleEl.textContent = post.title || '\u65e0\u9898';

      var tagsEl = document.createElement('div');
      tagsEl.className = 'luliy-card-tags';
      var labels = Array.isArray(post.labels) ? post.labels : [];
      labels.forEach(function (lbl) {
        var info = (typeof lbl === 'object') ? lbl : { name: lbl, color: '0969da' };
        if (/^pinned(-\d+)?$/.test(info.name || lbl)) return;
        var pill = document.createElement('a');
        pill.className = 'luliy-card-pill';
        pill.href = '/tag.html#' + encodeURIComponent(info.name || lbl);
        pill.textContent = info.name || lbl;
        pill.style.background = '#' + (info.color || '0969da').replace('#', '');
        tagsEl.appendChild(pill);
      });

      a.appendChild(dateEl);
      a.appendChild(titleEl);
      a.appendChild(tagsEl);
      li.appendChild(a);
      return li;
    }

    fetchPosts().then(function (posts) {
      if (!posts || !posts.length) { fallbackDomCards(nav); return; }

      /* ★ 分类页（tag.html#标签名）：只保留带该标签的文章 */
      if (isTagPage) {
        var rawTag = decodeURIComponent((location.hash || '').replace(/^#/, ''));
        if (rawTag) {
          posts = posts.filter(function (p) {
            var labels = Array.isArray(p.labels) ? p.labels : [];
            return labels.some(function (lbl) {
              var name = (typeof lbl === 'object') ? lbl.name : lbl;
              return name === rawTag;
            });
          });
        }
        var tagHead = document.getElementById('luliy-tag-head');
        if (!tagHead) {
          tagHead = document.createElement('h1');
          tagHead.id = 'luliy-tag-head';
          nav.parentNode.insertBefore(tagHead, nav);
        }
        tagHead.textContent = rawTag ? ('\uD83C\uDFF7\uFE0F ' + rawTag) : '\u5168\u90e8\u6587\u7ae0';
        if (!posts.length) {
          nav.innerHTML = '';
          var empty = document.createElement('p');
          empty.style.cssText = 'color:#888;padding:24px 0;';
          empty.textContent = '\u8fd9\u4e2a\u5206\u7c7b\u4e0b\u8fd8\u6ca1\u6709\u6587\u7ae0\u3002';
          nav.appendChild(empty);
          return;
        }
      }

      var pinnedPosts, regularPosts;
      if (isIndexPage()) {
        pinnedPosts  = posts.filter(function (p) { return p.pinned; });
        regularPosts = posts.filter(function (p) { return !p.pinned; });
      } else {
        /* 归档页 / 分类页：不单独抽出"置顶区"，置顶文章混在普通列表里
           正常按时间排序显示，避免被两边都漏掉。 */
        pinnedPosts  = [];
        regularPosts = posts;
      }

      /* Multi-level pin sort: higher pinLevel first, then newest first */
      pinnedPosts.sort(function (a, b) {
        if ((b.pinLevel || 1) !== (a.pinLevel || 1)) return (b.pinLevel || 1) - (a.pinLevel || 1);
        return String(b.created).localeCompare(String(a.created));
      });

      var pageMatch = location.search.match(/[?&]page=([0-9]+)/);
      var pageNum = pageMatch ? parseInt(pageMatch[1]) : 1;
      var perPage = 12;
      var onIndex = isIndexPage();

      /* Pinned section — fixed area, always above the regular grid */
      if (pinnedPosts.length > 0 && onIndex && pageNum === 1) {
        var existing = document.getElementById('luliy-pinned-section');
        if (existing) existing.remove();
        var ps = document.createElement('div');
        ps.id = 'luliy-pinned-section';
        var pg = document.createElement('ul');
        pg.className = 'luliy-card-grid luliy-pinned-grid';
        pinnedPosts.forEach(function (post, i) { pg.appendChild(buildCard(post, true, i)); });
        ps.appendChild(pg);
        nav.parentNode.insertBefore(ps, nav);
      }

      /* Shared helpers for both render paths */
      var _tlObserver = null;          /* timeline IntersectionObserver */
      function appendWithYearDiv(container, post, i, state) {
        var y = (post.created || '').slice(0, 4);
        if (y && y !== state.lastYear) {
          state.lastYear = y;
          var divider = document.createElement('li');
          divider.className = 'luliy-card-yeardiv';
          divider.innerHTML = '<span>' + esc(y) + '</span>';
          container.appendChild(divider);
        }
        container.appendChild(buildCard(post, false, i));
      }
      function teardownTimeline() {
        if (_tlObserver) { try { _tlObserver.disconnect(); } catch (e) {} _tlObserver = null; }
        var sent = document.getElementById('luliy-tl-sentinel');
        if (sent) sent.remove();
        document.body.classList.remove('luliy-tl-infinite');
      }

      /* ── Paginated render (grid / list views) ──────────── */
      function renderPaged() {
        teardownTimeline();
        var displayPosts = regularPosts;
        if (onIndex) {
          var start = (pageNum - 1) * perPage;
          displayPosts = regularPosts.slice(start, start + perPage);
        }
        nav.innerHTML = '';
        nav.className = 'luliy-card-grid';
        var st = { lastYear: null };
        displayPosts.forEach(function (post, i) { appendWithYearDiv(nav, post, i, st); });
      }

      /* ── Timeline render: infinite scroll, no post limit ──── */
      function renderTimeline() {
        teardownTimeline();
        nav.innerHTML = '';
        nav.className = 'luliy-card-grid';
        document.body.classList.add('luliy-tl-infinite');   /* hides pagination */

        var BATCH = 15;
        var cursor = 0;
        var st = { lastYear: null };

        /* Sentinel sits AFTER the grid so the spine isn't stretched by it */
        var sentinel = document.createElement('div');
        sentinel.id = 'luliy-tl-sentinel';
        sentinel.textContent = '\u52a0\u8f7d\u4e2d\u2026';   /* 加载中… */
        nav.parentNode.insertBefore(sentinel, nav.nextSibling);

        function appendBatch() {
          var end = Math.min(cursor + BATCH, regularPosts.length);
          for (var i = cursor; i < end; i++) {
            appendWithYearDiv(nav, regularPosts[i], i, st);
          }
          cursor = end;
          if (cursor >= regularPosts.length) {
            sentinel.textContent =
              '\u2014 \u5168\u90e8 ' + regularPosts.length + ' \u7bc7\u5df2\u52a0\u8f7d \u2014'; /* — 全部 N 篇已加载 — */
            sentinel.classList.add('is-done');
            if (_tlObserver) { try { _tlObserver.disconnect(); } catch (e) {} _tlObserver = null; }
          }
        }

        appendBatch();   /* first screen */

        if (cursor < regularPosts.length) {
          if ('IntersectionObserver' in window) {
            _tlObserver = new IntersectionObserver(function (entries) {
              entries.forEach(function (en) {
                if (en.isIntersecting) appendBatch();
              });
            }, { rootMargin: '600px 0px' });   /* prefetch well before bottom */
            _tlObserver.observe(sentinel);
          } else {
            /* Fallback: rAF-throttled scroll proximity check */
            onScrollRAF(function () {
              if (!sentinel.isConnected) return;   /* view switched away */
              if (cursor >= regularPosts.length) return;
              var r = sentinel.getBoundingClientRect();
              if (r.top < window.innerHeight + 600) appendBatch();
            });
          }
        }
      }

      /* ── Route by current view + expose re-render for view switch ─ */
      function renderRegular() {
        /* ★ 分类页：跟随设置面板里的「卡片视图」（网格/列表/时间轴），
           和首页以前的切换方式一样，由 getCardView() 统一控制。
           归档页：固定时间轴视图，呈现"卡片沿时间线排列"的效果——
           这是「more」按钮的专属入口，不需要切换。 */
        var view = isArchive ? 'timeline' : getCardView();
        if (view === 'timeline') renderTimeline();
        else renderPaged();
        applyCardView(view);
      }
      root._luliyRerenderCards = renderRegular;
      root._luliyTeardownTimeline = teardownTimeline;
      renderRegular();

      /* ★ 分类页内切换标签（点了另一个标签 pill 或浏览器前进后退，#hash 变了
         但页面没刷新）：清掉"已渲染"标记，让容器可被重新填充，再渲染一遍。 */
      if (isTagPage && !nav.getAttribute('data-luliy-hash-bound')) {
        nav.setAttribute('data-luliy-hash-bound', '1');
        window.addEventListener('hashchange', function () {
          nav.removeAttribute('data-luliy-cards');
          nav.innerHTML = '';
          initCards();
        });
      }

    }).catch(function () { fallbackDomCards(nav); });

    function fallbackDomCards(container) {
      container.className = 'luliy-card-grid';
      container.querySelectorAll('li.SideNav-item, .SideNav-item').forEach(function (li, i) {
        li.className = 'luliy-card';
        var existingA = li.querySelector('a');
        if (!existingA) return;
        var rawText = (existingA.innerText || existingA.textContent || '').trim();
        var href = existingA.href;
        li.innerHTML = '';
        var inner = document.createElement('a');
        inner.className = 'luliy-card-inner';
        inner.href = href;
        var dateEl = document.createElement('div'); dateEl.className = 'luliy-card-date';
        var titleEl = document.createElement('div'); titleEl.className = 'luliy-card-title';
        titleEl.textContent = rawText || '\u65e0\u9898';
        inner.appendChild(dateEl); inner.appendChild(titleEl);
        li.appendChild(inner);
      });
    }
  }

  /* ---- 15  macOS code block strip (+ line numbers) --------- */
  /* One global Escape handler for all fullscreen code blocks
     (previously each <pre> registered its own document listener). */
  var _codeEscBound = false;
  function bindCodeEscape() {
    if (_codeEscBound) return;
    _codeEscBound = true;
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      document.querySelectorAll('pre.code-fullscreen').forEach(function (pre) {
        pre.classList.remove('code-fullscreen');
        var g = pre.querySelector('.mac-btn-green');
        if (g) g.setAttribute('data-tip', '\u5168\u5c4f\u9605\u8bfb');
      });
    });
  }

  function initCodeBlocks(pbody) {
    applyCodeBlocks(pbody);
    if (pbody._luliyCodeObs) return;
    pbody._luliyCodeObs = true;
    try {
      var obs = new MutationObserver(function () { applyCodeBlocks(pbody); });
      obs.observe(pbody, { childList: true, subtree: true });
    } catch (e) {}
  }

  function applyCodeBlocks(pbody) {
    pbody.querySelectorAll('pre').forEach(function (pre) {
      if (pre.querySelector('.mac-strip')) return; /* already decorated */
      var code = pre.querySelector('code'); if (!code) return;

      function makeBtn(cls, tip) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'mac-btn ' + cls;
        b.setAttribute('data-tip', tip); b.setAttribute('aria-label', tip);
        return b;
      }

      /* Create mac-strip wrapper */
      var strip = document.createElement('div');
      strip.className = 'mac-strip';

      /* RED = Copy */
      var bR = makeBtn('mac-btn-red', '\u590d\u5236\u4ee3\u7801');
      bR.addEventListener('click', function (e) {
        e.stopPropagation(); playSfx('click');
        var txt = code.innerText || code.textContent || '';
        function done() {
          bR.setAttribute('data-tip', '\u5df2\u590d\u5236 \u2713');
          setTimeout(function () { bR.setAttribute('data-tip', '\u590d\u5236\u4ee3\u7801'); }, 1500);
        }
        if (navigator.clipboard && location.protocol === 'https:') {
          navigator.clipboard.writeText(txt).then(done).catch(done);
        } else {
          var ta = document.createElement('textarea');
          ta.value = txt; ta.style.cssText = 'position:fixed;left:-9999px';
          document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); } catch (_) {}
          ta.remove(); done();
        }
      });

      /* YELLOW = Collapse */
      var bY = makeBtn('mac-btn-yellow', '\u6298\u53e0\u4ee3\u7801');
      bY.addEventListener('click', function (e) {
        e.stopPropagation(); playSfx('click');
        var folded = pre.classList.toggle('is-folded');
        bY.setAttribute('data-tip', folded ? '\u5c55\u5f00\u4ee3\u7801' : '\u6298\u53e0\u4ee3\u7801');
      });

      /* GREEN = Fullscreen */
      var bG = makeBtn('mac-btn-green', '\u5168\u5c4f\u9605\u8bfb');
      function toggleFS() {
        playSfx('sci');
        var fs = pre.classList.toggle('code-fullscreen');
        bG.setAttribute('data-tip', fs ? '\u9000\u51fa\u5168\u5c4f' : '\u5168\u5c4f\u9605\u8bfb');
      }
      bG.addEventListener('click', function (e) { e.stopPropagation(); toggleFS(); });
      pre.addEventListener('dblclick', function (e) {
        if (e.target === bR || e.target === bY || e.target === bG) return;
        toggleFS();
      });
      bindCodeEscape();

      /* Language label */
      var langMatch = (code.className || '').match(/language-(\w+)/);
      if (langMatch) {
        var langEl = document.createElement('span');
        langEl.className = 'mac-lang';
        langEl.textContent = langMatch[1].toUpperCase();
        strip.appendChild(bR); strip.appendChild(bY); strip.appendChild(bG);
        strip.appendChild(langEl);
      } else {
        strip.appendChild(bR); strip.appendChild(bY); strip.appendChild(bG);
      }

      pre.insertBefore(strip, pre.firstChild);
    });
  }

  /* ---- 16  Sakura petals / 主题流星粒子 — REMOVED (2026-08).
     Both were continuously-redrawn <canvas> animations (21 falling-petal
     sprites; per-theme meteor/star field) that ran an animation-frame loop
     for as long as the page was open — another meaningful contributor to
     the reported jank. Kept as permanent no-ops so any stray call
     (old localStorage toggle, resize handler, etc.) is harmless. */
  function initSakura() {}
  function stopSakura() {}
  root._luliyStopSakura = stopSakura;
  root._luliyInitSakura = initSakura;

  function initThemeParticles() {}
  function stopThemeParticles() {}
  root._luliyInitThemeParticles = initThemeParticles;
  root._luliyStopThemeParticles = stopThemeParticles;

/* ---- 17  ArticleTOC scroll-spy + back-to-top ------------ */
  function initArticleTocSpy() {
    if (!document.getElementById('postBody')) return;
    var pbody = document.getElementById('postBody');

    /* Back-to-top button */
    if (!document.getElementById('luliy-back-top')) {
      var btn = document.createElement('button');
      btn.id = 'luliy-back-top';
      btn.innerHTML = '&#8679;';
      btn.setAttribute('aria-label', '\u56de\u5230\u9876\u90e8');
      btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        playSfx('click');
      });
      document.body.appendChild(btn);
      onScrollRAF(function () {
        btn.classList.toggle('is-visible', (window.scrollY || 0) > 300);
      });
    }

    /* ── Rebuilt button-style TOC ─────────────────────────────
       Reads headings straight from #postBody (independent of the
       articletoc.js plugin), builds our own panel that pops up from
       the TOC button, highlights the current section, and jumps on
       click. Fully theme-styled, high contrast in both modes.       */
    buildLuliyTOC(pbody);

    /* 部分内容（如异步渲染的 Markdown/代码高亮）可能在首次调用时标题
       还没插入 DOM，buildLuliyTOC 会因标题不足直接跳过。此前用两次
       setTimeout(600/2000ms) 盲猜时机重试；改用 MutationObserver 监听
       pbody 子树变化，标题真正出现后立即重建一次目录。buildLuliyTOC
       本身对"已存在 #luliy-toc-panel"是幂等的，面板建成后立刻断开
       观察，避免长期监听造成不必要开销。 */
    if (!pbody._luliyTocObs && !document.getElementById('luliy-toc-panel')) {
      pbody._luliyTocObs = true;
      try {
        var tocObs = new MutationObserver(function () {
          buildLuliyTOC(pbody);
          if (document.getElementById('luliy-toc-panel')) tocObs.disconnect();
        });
        tocObs.observe(pbody, { childList: true, subtree: true });
        /* 保险丝：10 秒后无论如何断开，防止长期未出现标题的页面上
           观察器一直挂着（例如极短文章从未满足"≥2 个标题"的条件）。 */
        setTimeout(function () { try { tocObs.disconnect(); } catch (e) {} }, 10000);
      } catch (e) {}
    }
  }

  function buildLuliyTOC(pbody) {
    if (document.getElementById('luliy-toc-panel')) return;

    var heads = Array.prototype.slice.call(
      pbody.querySelectorAll('h1, h2, h3, h4'));
    /* Need at least 2 headings to be useful */
    if (heads.length < 2) return;

    /* Ensure every heading has a stable id */
    heads.forEach(function (h, i) {
      if (!h.id) {
        var slug = (h.textContent || '').trim().toLowerCase()
          .replace(/[\s\u3000]+/g, '-')
          .replace(/[^\w\u4e00-\u9fff-]/g, '').slice(0, 40) || ('h-' + i);
        var base = slug, n = 1;
        while (document.getElementById(slug)) slug = base + '-' + (n++);
        h.id = slug;
      }
    });

    /* ── Panel ─────────────────────────────────────────────── */
    var panel = document.createElement('nav');
    panel.id = 'luliy-toc-panel';
    panel.setAttribute('aria-label', '\u6587\u7ae0\u76ee\u5f55');

    var hdr = document.createElement('div');
    hdr.className = 'luliy-toc-hdr';
    var hLbl = document.createElement('span');
    hLbl.className = 'luliy-toc-hdr-label';
    hLbl.textContent = '\u76ee\u5f55';   /* 目录 */
    var hTop = document.createElement('button');
    hTop.type = 'button'; hTop.className = 'luliy-toc-hdr-top';
    hTop.textContent = '\u2191 \u56de\u9876';   /* ↑ 回顶 */
    hTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    hdr.appendChild(hLbl); hdr.appendChild(hTop);
    panel.appendChild(hdr);

    var listWrap = document.createElement('div');
    listWrap.className = 'luliy-toc-list';
    var linkFor = {};
    heads.forEach(function (h) {
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.className = 'luliy-toc-item luliy-toc-lv' + (h.tagName.charAt(1));
      a.textContent = (h.textContent || '').trim();
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var target = document.getElementById(h.id);
        if (target) {
          var y = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        playSfx('click');
      });
      linkFor[h.id] = a;
      listWrap.appendChild(a);
    });
    panel.appendChild(listWrap);
    document.body.appendChild(panel);

    /* ── Toggle button ─────────────────────────────────────── */
    var fab = document.createElement('button');
    fab.id = 'luliy-toc-fab';
    fab.type = 'button';
    fab.setAttribute('aria-label', '\u6587\u7ae0\u76ee\u5f55');
    fab.textContent = '\u2630';   /* ☰ */
    fab.classList.add('is-visible');
    var open = false;
    function setOpen(v) {
      open = v;
      fab.classList.toggle('is-active', open);
      panel.classList.toggle('is-open', open);
    }
    fab.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!open);
      playSfx('click');
    });
    /* Close on outside click or Escape key */
    document.addEventListener('click', function (e) {
      if (!open) return;
      if (e.target === fab || fab.contains(e.target)) return;
      if (panel.contains(e.target)) return;
      setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (open && (e.key === 'Escape' || e.keyCode === 27)) { setOpen(false); playSfx('click'); }
    });
    document.body.appendChild(fab);

    /* ── Scroll-spy highlight ──────────────────────────────── */
    var curId = null;
    function onScroll() {
      var best = null, bestTop = -Infinity;
      var probe = 120;   /* px from top counts as "current" */
      for (var i = 0; i < heads.length; i++) {
        var top = heads[i].getBoundingClientRect().top;
        if (top <= probe && top > bestTop) { bestTop = top; best = heads[i]; }
      }
      if (!best) best = heads[0];
      if (best && best.id !== curId) {
        if (curId && linkFor[curId]) linkFor[curId].classList.remove('is-current');
        curId = best.id;
        if (linkFor[curId]) {
          linkFor[curId].classList.add('is-current');
          /* keep current item in view within the panel */
          var it = linkFor[curId];
          if (panel.classList.contains('is-open')) {
            var pr = listWrap.getBoundingClientRect();
            var ir = it.getBoundingClientRect();
            if (ir.top < pr.top || ir.bottom > pr.bottom) {
              it.scrollIntoView({ block: 'nearest' });
            }
          }
        }
      }
    }
    onScrollRAF(onScroll);
    onScroll();
    root._luliyTOC = panel;
  }

  /* ---- 18  移动端导航已重构为左滑抽屉 initDrawerNav（见 section 18d） ----
     旧的 initMobileNav(汉堡) / initMobileQuickLinks(快捷栏) / collectNavAnchors
     已全部删除，统一由抽屉系统替代。 */

  /* ---- 20  Homepage bottom gallery banner ------------------
    /* ---- 20  Homepage bottom gallery banner ------------------
     · 1 image  → full-width banner
     · 2+ images → responsive grid
     · ✎ button → add custom image URLs (stored in localStorage)
     · click any image → lightbox zoom                          */
  /* ---- 19  Favorites page front-end lock --------------------
     Hides the favorites page behind a password prompt.
     NOTE: this is a deterrent only — page content still exists in
     the public HTML source. Do not store true secrets here.      */
  function initFavoritesLock() {
    if (!LULIY_OPTS.favoritesPathMatch.test(location.pathname)) return;
    if (sessionStorage.getItem('luliy-fav-unlocked') === '1') return;
    if (document.getElementById('luliy-fav-gate')) return;

    var pbody = document.getElementById('postBody');
    if (!pbody) return;

    pbody.classList.add('luliy-locked');

    var gate = document.createElement('div');
    gate.id = 'luliy-fav-gate';
    gate.innerHTML =
      '<div id="luliy-fav-gate-card">' +
      '<div id="luliy-fav-gate-icon">\uD83D\uDD12</div>' +
      '<div id="luliy-fav-gate-title">\u79c1\u5bc6\u6536\u85cf</div>' +          /* 私密收藏 */
      '<div id="luliy-fav-gate-sub">\u8bf7\u8f93\u5165\u5bc6\u7801\u67e5\u770b\u6b64\u9875\u9762</div>' + /* 请输入密码查看此页面 */
      '<input id="luliy-fav-gate-input" type="password" inputmode="numeric" ' +
      'placeholder="\u5bc6\u7801" autocomplete="off">' +
      '<button id="luliy-fav-gate-btn" type="button">\u89e3\u9501</button>' +     /* 解锁 */
      '<div id="luliy-fav-gate-err"></div>' +
      '</div>';
    document.body.appendChild(gate);

    var input = gate.querySelector('#luliy-fav-gate-input');
    var btn   = gate.querySelector('#luliy-fav-gate-btn');
    var err   = gate.querySelector('#luliy-fav-gate-err');

    function sha256Hex(str) {
      if (root.crypto && root.crypto.subtle) {
        return root.crypto.subtle.digest('SHA-256', new TextEncoder().encode(str))
          .then(function (buf) {
            return Array.prototype.map.call(new Uint8Array(buf), function (b) {
              return ('0' + b.toString(16)).slice(-2);
            }).join('');
          });
      }
      /* crypto.subtle requires https / localhost — GitHub Pages is https */
      return Promise.reject(new Error('no-subtle'));
    }

    function unlock() {
      sessionStorage.setItem('luliy-fav-unlocked', '1');
      playSfx('sci');
      /* Progressive reveal: blur dissolves + content slides up section by section */
      pbody.classList.remove('luliy-locked');
      pbody.classList.add('luliy-unlocking');
      var kids = Array.prototype.slice.call(pbody.children);
      /* First rAF: apply the hidden starting state */
      requestAnimationFrame(function () {
        kids.forEach(function (el, i) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(24px)';
          el.style.transition = 'none';
        });
        /* Second rAF: browser has painted opacity:0, now enable transitions */
        requestAnimationFrame(function () {
          kids.forEach(function (el, i) {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(.2,.7,.3,1)';
            el.style.transitionDelay = (i * 0.07) + 's';
            el.style.opacity = '';
            el.style.transform = '';
          });
        });
      });
      gate.classList.add('is-leaving');
      setTimeout(function () {
        gate.remove();
        pbody.classList.remove('luliy-unlocking');
        kids.forEach(function (el) {
          el.style.transition = ''; el.style.transitionDelay = '';
        });
      }, 900);
    }

    function attempt() {
      var v = (input.value || '').trim();
      if (!v) return;
      sha256Hex(v).then(function (hex) {
        if (hex === LULIY_OPTS.favoritesHash) unlock();
        else {
          err.textContent = '\u5bc6\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5';   /* 密码错误，请重试 */
          input.value = '';
          var gateCard = gate.querySelector('#luliy-fav-gate-card');
        if (gateCard) gateCard.classList.remove('shake');
          void gate.offsetWidth;
          if (gateCard) gateCard.classList.add('shake');
        }
      }).catch(function () {
        err.textContent = '\u5f53\u524d\u73af\u5883\u4e0d\u652f\u6301\u52a0\u5bc6\u9a8c\u8bc1';
      });
    }

    btn.addEventListener('click', attempt);
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') attempt(); });
    setTimeout(function () { input.focus(); }, 300);
  }

  /* ---- Article progressive reveal (blur dissolve + slide up) --
     Runs once on load for every article body, section by section.
     Skipped on the favorites page (it has its own gated reveal). */
  function revealArticle() {
    if (prefersReduce && prefersReduce()) return;
    var pbody = document.getElementById('postBody');
    if (!pbody) return;
    if (LULIY_OPTS.favoritesPathMatch &&
        LULIY_OPTS.favoritesPathMatch.test(location.pathname)) return;
    if (pbody.classList.contains('luliy-revealed')) return;
    pbody.classList.add('luliy-revealed');

    var kids = Array.prototype.slice.call(pbody.children);
    if (!kids.length) return;
    /* Wait 120ms so initial paint (theme + bg) has settled before animating */
    setTimeout(function() {
      requestAnimationFrame(function () {
        kids.forEach(function (el) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(18px)';
          el.style.filter = 'blur(4px)';
          el.style.transition = 'none';
        });
        requestAnimationFrame(function () {
          kids.forEach(function (el, i) {
            el.style.transition =
              'opacity 0.5s ease, transform 0.5s cubic-bezier(.2,.7,.3,1), filter 0.4s ease';
            el.style.transitionDelay = Math.min(i * 0.04, 0.8) + 's';
            el.style.opacity = '';
            el.style.transform = '';
            el.style.filter = '';
          });
        });
      });
    }, 120);
    /* Cleanup inline styles after the animation completes */
    setTimeout(function () {
      kids.forEach(function (el) {
        el.style.transition = ''; el.style.transitionDelay = '';
        el.style.opacity = ''; el.style.transform = ''; el.style.filter = '';
      });
    }, 2200);
  }

  /* ---- 21  Post page init --------------------------------- */
  root._luliyInitPost = function () {
    if (root._luliyPostInited) return;
    root._luliyPostInited = true;

    /* Mark body for post-page margin CSS */
    document.body.classList.add('luliy-post-page');

    var pbody = document.getElementById('postBody');

    /* External links → new tab */
    document.querySelectorAll('a[href^="http"]').forEach(function (a) {
      if (!a.href.includes('luliyer6-ux.github.io') && !a.href.includes(location.hostname))
        a.target = '_blank';
    });

    if (pbody) pbody.querySelectorAll('img').forEach(function (img) { img.loading = 'lazy'; });
    if (!pbody) return;

    /* Reading preferences (font size + sans-serif) */
    applyReadingPrefs();

    /* Favorites page front-end lock */
    initFavoritesLock();

    /* Global article progressive reveal */
    revealArticle();

    /* ★ 需求⑦：响应式表格——注入 data-label，窄屏卡片化时 CSS::before 用它显示列标题 */
    pbody.querySelectorAll('table').forEach(function (table) {
      if (table._luliyLabeled) return;
      table._luliyLabeled = true;
      var headers = [];
      var ths = table.querySelectorAll('thead th');
      ths.forEach(function (th) { headers.push((th.textContent || '').trim()); });
      if (!headers.length) {
        /* 无 thead 时用第一行 td 作为伪标题 */
        var firstRow = table.querySelector('tr');
        if (firstRow) firstRow.querySelectorAll('td').forEach(function (td) {
          headers.push((td.textContent || '').trim());
        });
      }
      table.querySelectorAll('tbody tr').forEach(function (tr) {
        tr.querySelectorAll('td').forEach(function (td, i) {
          if (headers[i]) td.setAttribute('data-label', headers[i]);
        });
      });
    });

    /* ★ 需求⑧：文末字数 + 阅读时长信息条 */
    if (!document.getElementById('luliy-post-footer-bar')) {
      var rawText = (pbody.textContent || '').trim();
      var charCount = rawText.length;
      var wordCount = rawText.replace(/[\u4e00-\u9fa5]/g, 'W').split(/\s+/).filter(Boolean).length;
      /* 中文按 300 字/分钟，英文按 200 词/分钟；取两者较大值 */
      var minRead = Math.max(1, Math.round(charCount / 300));
      var bar = document.createElement('div');
      bar.id = 'luliy-post-footer-bar';
      bar.innerHTML =
        '<span class="lpfb-item">' +
          '<svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor"><path d="M0 2.75A.75.75 0 0 1 .75 2h14.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 2.75Zm0 5A.75.75 0 0 1 .75 7h14.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 7.75Zm0 5a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75Z"/></svg>' +
          ' <b>' + charCount.toLocaleString() + '</b> \u5b57' +   /* 字 */
        '</span>' +
        '<span class="lpfb-sep">\xB7</span>' +
        '<span class="lpfb-item">' +
          '<svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor"><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm7-3.25v2.992l2.028.812a.75.75 0 0 1-.557 1.392l-2.5-1A.751.751 0 0 1 7 8.25v-3.5a.75.75 0 0 1 1.5 0Z"/></svg>' +
          ' \u7ea6 <b>' + minRead + '</b> \u5206\u949f\u9605\u8bfb' +  /* 约 N 分钟阅读 */
        '</span>';
      pbody.appendChild(bar);
    }

    /* Reading time estimate */
    if (!document.getElementById('luliy-readmeta')) {
      /* 性能优化：用 textContent 替代 innerText。innerText 会触发一次
         同步布局重排（计算渲染后的可见文本），而字数估算并不需要这种
         精度，textContent 直接读取、零重排。 */
      var wc = (pbody.textContent || '').length;
      var rt = document.createElement('p');
      rt.id = 'luliy-readmeta';
      rt.innerHTML =
        '\u9884\u8ba1\u9605\u8bfb\uff1a\u7ea6 <strong>' + Math.max(1, Math.round(wc / 300)) +
        '</strong> \u5206\u949f &nbsp;|&nbsp; \u5171 <strong>' + wc + '</strong> \u5b57';
      rt.style.cssText = 'color:#888;font-size:13px;margin-bottom:1.5rem';
      pbody.insertBefore(rt, pbody.firstChild);
    }

    /* Heading click → copy anchor link */
    pbody.querySelectorAll('h1,h2,h3').forEach(function (h) {
      if (h._luliyCopy) return;
      h._luliyCopy = true; h.style.cursor = 'pointer';
      h.title = '\u70b9\u51fb\u590d\u5236\u94fe\u63a5';
      h.addEventListener('click', function () {
        var url = location.href.split('#')[0] + '#' + h.id;
        if (navigator.clipboard) navigator.clipboard.writeText(url);
        var tip = document.createElement('span');
        tip.textContent = ' \u2713';
        tip.style.cssText = 'font-size:12px;color:#1f883d;font-weight:normal';
        h.appendChild(tip);
        setTimeout(function () { tip.remove(); }, 2000);
      });
    });

    /* macOS code blocks — initCodeBlocks() 内部已挂载 MutationObserver
       持续监听 pbody 子树变化，异步渲染的代码高亮出现时会自动补装饰，
       无需再用 setTimeout 盲猜时机重复调用。 */
    initCodeBlocks(pbody);

    /* TOC scroll-spy — 首次调用即挂好 MutationObserver，标题异步
       出现时会自动补建目录，无需重复调用（见 initArticleTocSpy 定义）。 */
    initArticleTocSpy();

    /* Prev / Next navigation */
    fetchPosts().then(function (posts) {
      var navPosts = posts.filter(function (p) { return !p.pinned; });
      var curPath = location.pathname;
      var curNorm = curPath.replace(/^\//, '').replace(/\.html?$/, '').replace(/\/$/, '');

      var idx = -1;
      navPosts.forEach(function (p, i) {
        if (!p.link) return;
        function normLink(s) {
          return s.replace(/^\//, '').replace(/\.html?$/, '').replace(/\/$/, '').replace(/^post\//, '');
        }
        var lnkSlug = normLink(p.link);
        var curSlug = normLink(curNorm);
        if (lnkSlug === curSlug || lnkSlug === curNorm ||
          p.link === curNorm || curPath === '/' + p.link ||
          curPath === p.link || curPath.endsWith('/' + lnkSlug)) {
          idx = i;
        }
      });

      if (idx < 0) return;
      var prevPost = navPosts[idx + 1] || null;
      var nextPost = navPosts[idx - 1] || null;
      if (!prevPost && !nextPost) return;

      var nav = document.createElement('div');
      nav.className = 'luliy-prevnext';

      function mkNavLink(post, labelText, align) {
        if (!post) { var e = document.createElement('div'); e.style.flex = '1'; return e; }
        var a = document.createElement('a');
        a.href = buildPostLink(post.link);
        a.style.textAlign = align;
        a.innerHTML =
          '<span class="pn-label">' + esc(labelText) + '</span>' +
          '<span class="pn-title">' + esc(post.title) + '</span>';
        return a;
      }

      nav.appendChild(mkNavLink(prevPost, '\u2B05 \u4e0a\u4e00\u7bc7', 'left'));
      nav.appendChild(mkNavLink(nextPost, '\u4e0b\u4e00\u7bc7 \u27A1', 'right'));
      pbody.appendChild(nav);

      /* Series navigation (same-tag prev/next with progress) */
      initSeriesNav(pbody, posts, idx, navPosts);
    }).catch(function (e) {
      /* 上/下一篇导航是锦上添花的功能，加载失败时静默降级（不影响正文
         阅读），但留一条 console.warn 方便排查为何导航条没出现。 */
      try { console.warn('[luliy] prev/next nav failed to load posts:', e); } catch (e2) {}
    });

    /* In-page search (Ctrl/Cmd+F) */
    initInPageSearch();

    /* External link favicon hover preview */
    initLinkPreview();
    setTimeout(initLinkPreview, 1500);

    /* Scroll position memory */
    initScrollMemory();

    /* Reading progress ring on back-to-top button */
    setTimeout(initProgressRing, 100);

    /* Mobile swipe between posts */

    /* Support / appreciation panel —— 原主题作者的个人赞赏码，
       已移除。如需在文章末尾展示自己的赞赏码，可在此处重新添加，
       把 img src 换成你自己的收款码图片直链即可。 */
  };

  /* ---- 22  Index page init -------------------------------- */
  root._luliyInitIndex = function () {
    /* ★ 大改后：
       - 首页（homepage）只要「Hero + 六张分类卡片」，不调用本函数渲染文章。
       - 分类页（tag.html#标签）→ initCards() 内部按标签过滤，焊死网格视图。
       - 归档页（archive.html）→ initCards() 内部在 #postBody 里现造容器，
         焊死时间轴视图，与分类页共用同一套"漂亮卡片"渲染逻辑。
       - 旧的 "Remember, this is your world." 横幅、底部画廊横幅、
         以及单独的 renderArchive() 简易列表，均已废弃不再调用。 */
    initCards();
  };

  /* ---- 22b  Archive: timeline + calendar views ------------ */

  /* ════════════════════════════════════════════════════════
     NEW MODULES (v10)
  ════════════════════════════════════════════════════════ */

  /* ---- 专注阅读模式已删除 ----------------------------------
     原专注模式的好处（沉浸、宽阅读区、清晰排版）已经变成
     文章页的默认样式（见 enhance.css），不再需要开关/快捷键/
     退出按钮这套切换机制，故整段移除。 */


  /* ---- Card view (grid / list) ---------------------------- */
  var CARD_VIEWS = ['grid', 'list', 'timeline'];
  function getCardView() {
    var v = _lsGet('luliy-cardview');
    return CARD_VIEWS.indexOf(v) >= 0 ? v : 'grid';
  }
  function applyCardView(forcedView) {
    var view = forcedView || (isArchivePage() ? 'timeline' : getCardView());
    document.querySelectorAll('.luliy-card-grid').forEach(function (g) {
      /* Pinned strip always stays a grid — alt layouts make no sense there */
      if (g.classList.contains('luliy-pinned-grid')) {
        g.classList.remove('luliy-card-list', 'luliy-card-timeline');
        return;
      }
      g.classList.toggle('luliy-card-list', view === 'list');
      g.classList.toggle('luliy-card-timeline', view === 'timeline');
    });
    var tb = document.getElementById('luliy-cardview-toggle');
    if (tb) tb.setAttribute('data-view', view);
  }


  /* ---- Reduce motion ------------------------------------- */
  function prefersReduce() {
    if (_lsGet('luliy-reduce') === '1') return true;
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) { return false; }
  }
  function applyReduceMotion() {
    document.body.classList.toggle('luliy-reduce-motion', prefersReduce());
  }

  /* ---- 17b  Reading progress ring (merged into back-top) -- */
  function initProgressRing() {
    var btn = document.getElementById('luliy-back-top');
    if (!btn || btn._luliyRing) return;
    btn._luliyRing = true;
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'luliy-ring');
    svg.setAttribute('viewBox', '0 0 44 44');
    var bg = document.createElementNS(NS, 'circle');
    bg.setAttribute('class', 'luliy-ring-bg');
    bg.setAttribute('cx', '22'); bg.setAttribute('cy', '22'); bg.setAttribute('r', '20');
    var fg = document.createElementNS(NS, 'circle');
    fg.setAttribute('class', 'luliy-ring-fg');
    fg.setAttribute('cx', '22'); fg.setAttribute('cy', '22'); fg.setAttribute('r', '20');
    var circ = 2 * Math.PI * 20;
    fg.style.strokeDasharray = circ;
    fg.style.strokeDashoffset = circ;
    svg.appendChild(bg); svg.appendChild(fg);
    btn.insertBefore(svg, btn.firstChild);

    function update() {
      var st = window.scrollY || document.documentElement.scrollTop;
      var dh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var pct = dh > 0 ? Math.min(1, st / dh) : 0;
      fg.style.strokeDashoffset = circ * (1 - pct);
    }
    onScrollRAF(update);
  }

  /* ---- 21b  Series nav (same-tag prev/next) --------------- */
  function initSeriesNav(pbody, posts, curIdx, navPosts) {
    /* Find the dominant non-pinned tag of the current post, then
       collect the chronological series it belongs to.              */
    var cur = navPosts[curIdx];
    if (!cur || !cur.labels || !cur.labels.length) return;
    var curTags = cur.labels
      .map(function (l) { return (l.name || l).toString(); })
      .filter(function (n) { return !/^pinned(-\d+)?$/.test(n); });
    if (!curTags.length) return;

    /* Pick the tag that yields the largest series (>=2 posts) */
    var best = null, bestList = [];
    curTags.forEach(function (tag) {
      var list = navPosts.filter(function (p) {
        return (p.labels || []).some(function (l) { return (l.name || l) === tag; });
      }).sort(function (a, b) { return String(a.created).localeCompare(String(b.created)); });
      if (list.length >= 2 && list.length > bestList.length) { best = tag; bestList = list; }
    });
    if (!best || bestList.length < 2) return;

    var pos = -1;
    bestList.forEach(function (p, i) { if (p === cur) pos = i; });
    if (pos < 0) return;

    var box = document.createElement('div');
    box.className = 'luliy-series';
    var head = document.createElement('div');
    head.className = 'luliy-series-head';
    head.innerHTML = '\uD83D\uDCDA \u7cfb\u5217\uff1a<b>' + esc(best) + '</b> ' +
      '<span class="luliy-series-prog"><b>' + (pos + 1) + '</b><span class="luliy-series-prog-sep">/</span>' + bestList.length + '</span>';
    box.appendChild(head);

    /* Progress dots */
    var dots = document.createElement('div');
    dots.className = 'luliy-series-dots';
    bestList.forEach(function (p, i) {
      var d = document.createElement('a');
      d.className = 'luliy-series-dot' + (i === pos ? ' is-current' : '');
      d.href = buildPostLink(p.link);
      d.title = (i + 1) + '. ' + p.title;
      dots.appendChild(d);
    });
    box.appendChild(dots);

    /* Compact list of the series */
    var ul = document.createElement('ul');
    ul.className = 'luliy-series-list';
    bestList.forEach(function (p, i) {
      var li = document.createElement('li');
      li.className = (i === pos ? 'is-current' : '');
      if (i === pos) {
        li.innerHTML = '<span class="ls-num">' + (i + 1) + '</span><span class="ls-cur">' + esc(p.title) + '</span>';
      } else {
        li.innerHTML = '<span class="ls-num">' + (i + 1) + '</span>' +
          '<a href="' + esc(buildPostLink(p.link)) + '">' + esc(p.title) + '</a>';
      }
      ul.appendChild(li);
    });
    ul.classList.add('is-collapsed');   /* default: dots only */
    box.appendChild(ul);

    /* Toggle the list open/closed by clicking the head (not the prog link) */
    box.classList.add('is-collapsed');
    head.style.cursor = 'pointer';
    head.title = '\u70b9\u51fb\u5c55\u5f00/\u6536\u8d77\u7cfb\u5217\u5217\u8868';  /* 点击展开/收起系列列表 */
    head.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      var collapsed = box.classList.toggle('is-collapsed');
      if (collapsed) {
        /* Collapse: set explicit height then animate to 0 */
        ul.style.maxHeight = ul.scrollHeight + 'px';
        ul.classList.add('is-collapsed');
        requestAnimationFrame(function() {
          requestAnimationFrame(function() { ul.style.maxHeight = '0'; });
        });
      } else {
        /* Expand: animate to scrollHeight then remove explicit max-height */
        ul.classList.remove('is-collapsed');
        ul.style.maxHeight = ul.scrollHeight + 'px';
        var onEnd = function() {
          ul.removeEventListener('transitionend', onEnd);
          ul.style.maxHeight = '';
        };
        ul.addEventListener('transitionend', onEnd);
      }
    });

    pbody.insertBefore(box, pbody.firstChild);
  }

  /* ---- 21c  Scroll position memory ------------------------ */
  function initScrollMemory() {
    var pbody = document.getElementById('postBody');
    if (!pbody) return;
    var key = 'luliy-scroll:' + location.pathname;

    /* Restore prompt */
    var saved = parseFloat(sessionStorage.getItem(key) || '0');
    if (saved > 0.05 && saved < 0.95) {
      var dh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var targetY = Math.round(saved * dh);
      var tip = document.createElement('div');
      tip.className = 'luliy-resume';
      tip.innerHTML = '\u4e0a\u6b21\u8bfb\u5230 ' + Math.round(saved * 100) + '%\uff0c<b>\u7ee7\u7eed\u9605\u8bfb \u2193</b>';
      document.body.appendChild(tip);
      requestAnimationFrame(function () { tip.classList.add('is-in'); });
      var hide = function () { tip.classList.remove('is-in'); setTimeout(function () { tip.remove(); }, 400); };
      tip.addEventListener('click', function () {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        hide();
      });
      setTimeout(hide, 6000);
    }

    /* Save throttled */
    var t = null;
    window.addEventListener('scroll', function () {
      if (t) return;
      t = setTimeout(function () {
        t = null;
        var st = window.scrollY || document.documentElement.scrollTop;
        var dh = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (dh > 0) sessionStorage.setItem(key, String(st / dh));
      }, 500);
    }, { passive: true });
  }

  /* ---- 24  In-page article search overlay ----------------- */
  function initInPageSearch() {
    var pbody = document.getElementById('postBody');
    if (!pbody) return;
    if (document.getElementById('luliy-search-bar')) return;

    var bar = document.createElement('div');
    bar.id = 'luliy-search-bar';
    bar.innerHTML =
      '<i class="luliy-search-icon" aria-hidden="true">\uD83D\uDD0D</i>' +
      '<input id="luliy-search-input" type="text" placeholder="\u641c\u7d22\u672c\u6587\u2026" ' +
        'aria-label="\u641c\u7d22\u672c\u6587" autocomplete="off">' +
      '<span id="luliy-search-count">0/0</span>' +
      '<button id="luliy-search-prev" type="button" title="\u4e0a\u4e00\u4e2a" aria-label="\u4e0a\u4e00\u4e2a\u5339\u914d\u9879">\u2191</button>' +
      '<button id="luliy-search-next" type="button" title="\u4e0b\u4e00\u4e2a" aria-label="\u4e0b\u4e00\u4e2a\u5339\u914d\u9879">\u2193</button>' +
      '<button id="luliy-search-close" type="button" title="\u5173\u95ed" aria-label="\u5173\u95ed\u641c\u7d22">\u2715</button>';
    document.body.appendChild(bar);

    var input = bar.querySelector('#luliy-search-input');
    var countEl = bar.querySelector('#luliy-search-count');
    var marks = [], cur = -1;

    function clearMarks() {
      marks.forEach(function (m) {
        var p = m.parentNode;
        if (p) { p.replaceChild(document.createTextNode(m.textContent), m); p.normalize(); }
      });
      marks = []; cur = -1;
    }

    /* Walk text nodes, skip code/katex/script/style */
    function highlight(term) {
      clearMarks();
      if (!term) { countEl.textContent = '0/0'; return; }
      var lower = term.toLowerCase();
      /* Walk BOTH element and text nodes so FILTER_REJECT prunes whole subtrees. */
      var SKIP_TAGS = { CODE:1, PRE:1, SCRIPT:1, STYLE:1, NOSCRIPT:1, SVG:1, MATH:1 };
      var SKIP_CLASS = ['katex','mermaid','luliy-series','luliy-lineno',
                        'luliy-toc','toc','articletoc','TOC'];
      var walker = document.createTreeWalker(
        pbody,
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
        {
          acceptNode: function (node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (SKIP_TAGS[node.tagName]) return NodeFilter.FILTER_REJECT;
              for (var ci = 0; ci < SKIP_CLASS.length; ci++) {
                if (node.classList && node.classList.contains(SKIP_CLASS[ci]))
                  return NodeFilter.FILTER_REJECT;
              }
              return NodeFilter.FILTER_SKIP;  /* descend into allowed elements */
            }
            /* Text node */
            if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            return node.nodeValue.toLowerCase().indexOf(lower) >= 0
              ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
          }
        }
      );
      var nodes = [], n;
      while ((n = walker.nextNode())) nodes.push(n);
      nodes.forEach(function (node) {
        var text = node.nodeValue, idx = 0, lc = text.toLowerCase(), frag = document.createDocumentFragment(), last = 0;
        while ((idx = lc.indexOf(lower, last)) >= 0) {
          if (idx > last) frag.appendChild(document.createTextNode(text.slice(last, idx)));
          var mk = document.createElement('mark');
          mk.className = 'luliy-search-hit';
          mk.textContent = text.slice(idx, idx + term.length);
          frag.appendChild(mk); marks.push(mk);
          last = idx + term.length;
        }
        if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
        node.parentNode.replaceChild(frag, node);
      });
      if (marks.length) { cur = 0; focusMark(); }
      updateCount();
    }
    function updateCount() { countEl.textContent = (marks.length ? (cur + 1) : 0) + '/' + marks.length; }
    function focusMark() {
      marks.forEach(function (m, i) { m.classList.toggle('is-current', i === cur); });
      if (marks[cur]) marks[cur].scrollIntoView({ behavior: 'smooth', block: 'center' });
      updateCount();
    }
    function step(dir) {
      if (!marks.length) return;
      cur = (cur + dir + marks.length) % marks.length;
      focusMark();
    }

    var deb = null;
    input.addEventListener('input', function () {
      clearTimeout(deb);
      deb = setTimeout(function () { highlight(input.value.trim()); }, 220);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); step(e.shiftKey ? -1 : 1); }
      if (e.key === 'Escape') closeSearch();
    });
    bar.querySelector('#luliy-search-next').addEventListener('click', function () { step(1); });
    bar.querySelector('#luliy-search-prev').addEventListener('click', function () { step(-1); });
    bar.querySelector('#luliy-search-close').addEventListener('click', closeSearch);

    function openSearch() {
      bar.classList.add('is-open');
      setTimeout(function () { input.focus(); input.select(); }, 50);
    }
    function closeSearch() {
      bar.classList.remove('is-open');
      clearMarks(); input.value = ''; countEl.textContent = '0/0';
    }
    root._luliyOpenSearch = openSearch;

    /* Ctrl/Cmd+F hijack (only on article pages) */
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        openSearch();
      }
    });

    /* Floating search trigger button */
    if (!document.getElementById('luliy-search-fab')) {
      var fab = document.createElement('button');
      fab.id = 'luliy-search-fab';
      fab.type = 'button';
      fab.title = '\u641c\u7d22\u672c\u6587 (Ctrl+F)';
      fab.setAttribute('aria-label', '\u641c\u7d22\u672c\u6587');
      fab.textContent = '\uD83D\uDD0D';
      fab.addEventListener('click', openSearch);
      document.body.appendChild(fab);
      onScrollRAF(function () {
        fab.classList.toggle('is-visible', (window.scrollY || 0) > 300);
      });
    }
  }

  /* ---- 23  Tag cloud page --------------------------------- */
  function initTagCloud() {
    var onTagPage = /tag\.html?$|\/tag\/?$/i.test(location.pathname);
    if (!onTagPage) return;
    if (document.getElementById('luliy-tagcloud')) return;   /* 防重复执行 */

    fetchPosts().then(function (posts) {
      if (!posts || !posts.length) return;
      /* Count tag frequencies + collect label colors */
      var freq = {}, colors = {};
      posts.forEach(function (p) {
        (p.labels || []).forEach(function (l) {
          var name = (l.name || l).toString();
          if (/^pinned(-\d+)?$/.test(name)) return;
          freq[name] = (freq[name] || 0) + 1;
          if (!colors[name]) colors[name] = '#' + ((l.color || '0969da') + '').replace(/^#/, '');
        });
      });
      var tags = Object.keys(freq);
      if (!tags.length) return;
      var max = Math.max.apply(null, tags.map(function (t) { return freq[t]; }));
      var min = Math.min.apply(null, tags.map(function (t) { return freq[t]; }));

      var wrap = document.createElement('div');
      wrap.id = 'luliy-tagcloud';
      var title = document.createElement('h1');
      title.className = 'luliy-tagcloud-title';
      title.textContent = '\uD83C\uDFF7\uFE0F \u6807\u7b7e\u4e91';
      wrap.appendChild(title);

      var cloud = document.createElement('div');
      cloud.className = 'luliy-tagcloud-body';
      tags.sort(function (a, b) { return freq[b] - freq[a]; });

      function syncActive() {
        var cur = decodeURIComponent((location.hash || '').replace(/^#/, ''));
        cloud.querySelectorAll('.luliy-tag-bubble').forEach(function (b) {
          b.classList.toggle('is-active', b.getAttribute('data-tag') === cur);
        });
      }

      tags.forEach(function (t) {
        var ratio = max === min ? 0.5 : (freq[t] - min) / (max - min);
        var size = 13 + ratio * 22;  /* 13px → 35px */
        var bubble = document.createElement('a');
        bubble.className = 'luliy-tag-bubble';
        bubble.setAttribute('data-tag', t);
        /* ★ 点击气泡只是普通的 hash 跳转链接，不再自己渲染列表。
           tag.html#标签名 这个 hash 变化会被 initCards() 里已经接好的
           hashchange 监听器捕获，自动重新筛选并刷新下面那套统一的
           卡片网格——两套 UI 由此"合二为一"，不再各管各的。 */
        bubble.href = '/tag.html#' + encodeURIComponent(t);
        bubble.style.fontSize = size.toFixed(1) + 'px';
        bubble.style.setProperty('--tag-c', colors[t]);
        bubble.innerHTML = esc(t) + '<sup>' + freq[t] + '</sup>';
        bubble.addEventListener('click', function () { playSfx('click'); });
        cloud.appendChild(bubble);
      });
      wrap.appendChild(cloud);
      syncActive();
      window.addEventListener('hashchange', syncActive);

      /* Insert above the card grid（#luliy-tag-grid 由 initCards() 创建；
         若它还没创建好就先插到 #content 顶部，等 initCards 跑完再调整也没关系，
         因为 #luliy-tag-grid 本身在 #content 末尾追加，先后顺序不影响视觉） */
      var mount = document.getElementById('content') || document.body;
      mount.insertBefore(wrap, mount.firstChild);
    }).catch(function (e) {
      /* 标签云是锦上添花的功能，加载失败时静默降级，但留一条
         console.warn 方便排查为何标签云没有出现。 */
      try { console.warn('[luliy] tag cloud failed to load posts:', e); } catch (e2) {}
    });
  }

  /* ---- 25a/25b 鼠标拖尾、萤火虫特效已删除 --------------------
     只保留樱花花瓣与点击火花两个装饰特效。 */


  /* ---- 25b  键盘快捷键 ------------------------------------- */
  function initKeyboardShortcuts() {
    /* 判断当前焦点是否在输入区（避免干扰打字） */
    function inInput() {
      var el = document.activeElement;
      if (!el) return false;
      var tag = el.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' ||
             el.isContentEditable || el.closest('[contenteditable]');
    }

    /* 平滑滚动辅助 */
    function smoothScrollBy(dy) {
      window.scrollBy({ top: dy, behavior: 'smooth' });
    }
    function smoothScrollTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /* ←/→：上/下一篇（仅文章页，读取 .luliy-prevnext 里的链接） */
    function goPrevNext(dir) {
      /* dir=-1 上一篇(左), dir=1 下一篇(右) */
      var nav = document.querySelector('.luliy-prevnext');
      if (!nav) return;
      var anchors = nav.querySelectorAll('a[href]');
      if (!anchors.length) return;
      /* 上一篇在 index=0（left 对齐），下一篇在 index=1（right 对齐） */
      var target = anchors[dir < 0 ? 0 : anchors.length - 1];
      if (target && target.href) { location.href = target.href; }
    }

    /* 唤起页内搜索（复用现有的搜索覆盖层） */
    function openSearch() {
      /* initInPageSearch 暴露了 _luliyOpenSearch */
      if (root._luliyOpenSearch) { root._luliyOpenSearch(); return; }
      /* 兜底：直接触发 Ctrl+F */
      var ev = new KeyboardEvent('keydown', { key: 'f', ctrlKey: true, bubbles: true });
      document.dispatchEvent(ev);
    }

    /* 切换日/夜模式 */
    function toggleDayNight() {
      var cur = _luliyResolveMode();
      if (root._luliySetMode) root._luliySetMode(cur === 'dark' ? 'light' : 'dark');
      else {
        var next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-color-mode', next);
        try { _lsSet('meek_theme', next); } catch(e) {}
      }
      if (playSfx) playSfx('theme');
    }

    document.addEventListener('keydown', function (e) {
      /* 屏蔽修饰键组合（让浏览器快捷键正常工作） */
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (inInput()) return;

      var k = e.key;

      if (k === '/') {
        /* / 唤起搜索 */
        e.preventDefault();
        openSearch();
      } else if (k === 'j' || k === 'J') {
        /* j 向下翻一屏 */
        e.preventDefault();
        smoothScrollBy(window.innerHeight * 0.85);
      } else if (k === 'k' || k === 'K') {
        /* k 向上翻一屏 */
        e.preventDefault();
        smoothScrollBy(-window.innerHeight * 0.85);
      } else if (k === 'g' || k === 'G') {
        /* g 回顶 */
        e.preventDefault();
        smoothScrollTop();
      } else if (k === 't' || k === 'T') {
        /* t 切换日/夜 */
        e.preventDefault();
        toggleDayNight();
      } else if (k === 'ArrowLeft') {
        /* ← 上一篇（仅文章页） */
        if (document.querySelector('.luliy-prevnext')) {
          e.preventDefault();
          goPrevNext(-1);
        }
      } else if (k === 'ArrowRight') {
        /* → 下一篇（仅文章页） */
        if (document.querySelector('.luliy-prevnext')) {
          e.preventDefault();
          goPrevNext(1);
        }
      }
    });

    /* 在页面上显示一个快捷键提示（仅首次访问，3 秒后自动消失） */
    if (!_lsGet('luliy-kb-hint')) {
      setTimeout(function () {
        var toast = document.createElement('div');
        toast.id = 'luliy-kb-toast';
        toast.innerHTML =
          '<b>\u952e\u76d8\u5feb\u6377\u952e</b>: ' +   /* 键盘快捷键 */
          '<kbd>/</kbd>\u641c\u7d22 ' +       /* 搜索 */
          '<kbd>j</kbd><kbd>k</kbd>\u7ffb\u9875 ' + /* 翻页 */
          '<kbd>g</kbd>\u56de\u9876 ' +        /* 回顶 */
          '<kbd>t</kbd>\u5207\u6362\u4e3b\u9898 ' +  /* 切换主题 */
          '<kbd>\u2190\u2192</kbd>\u4e0a\u4e0b\u7bc7'; /* 上下篇 */
        document.body.appendChild(toast);
        requestAnimationFrame(function () { toast.classList.add('is-visible'); });
        setTimeout(function () {
          toast.classList.remove('is-visible');
          setTimeout(function () { toast.remove(); }, 400);
        }, 3500);
        _lsSet('luliy-kb-hint', '1');
      }, 2000);
    }
  }

  /* ---- 26  View Transitions (cross-page fade) ------------- */
  function initViewTransitions() {
    if (!document.startViewTransition) return;
    if (prefersReduce()) return;
    document.addEventListener('click', function (e) {
      /* Don't intercept navigation during black-hole animation */
      if (_bhActive) return;
      var a = e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.hasAttribute('download')) return;
      /* Skip pure hash / in-page anchor links entirely */
      if (href.charAt(0) === '#') return;
      var url;
      try { url = new URL(a.href, location.href); } catch (_) { return; }
      if (url.origin !== location.origin) return;
      /* Skip same-page navigation (hash jumps, TOC) */
      if (url.pathname === location.pathname) return;
      e.preventDefault();
      var dest = url.href;
      /* Tag direction for CSS animation */
      var dir = (url.pathname === '/' || url.pathname === '/index.html') ? 'home'
              : (location.pathname === '/' || location.pathname === '/index.html') ? 'post'
              : (url.pathname > location.pathname) ? 'next' : 'prev';
      document.documentElement.setAttribute('data-vt-dir', dir);
      /* 只导航一次：优先走 startViewTransition，1s 后仍未跳转（回调异常/浏览器
         行为不一致）才用兜底定时器补一次跳转，避免旧代码里两条路径都会
         无条件调用 location.href 造成的重复导航。 */
      var navigated = false;
      function go() {
        if (navigated) return;
        navigated = true;
        document.documentElement.removeAttribute('data-vt-dir');
        location.href = dest;
      }
      try {
        document.startViewTransition(function () {
          if (root._luliyTeardownTimeline) root._luliyTeardownTimeline();
          go();
          return new Promise(function () {});
        });
        setTimeout(go, 1000); /* 兜底 */
      } catch (err) {
        go();
      }
    });
  }

  /* ---- 14b  Card skeleton placeholders -------------------- */
  function showCardSkeleton(nav) {
    if (!nav) return;
    nav.classList.add('luliy-card-grid');
    var html = '';
    for (var i = 0; i < 6; i++) {
      html += '<li class="luliy-card-skeleton"><div class="sk-line sk-date"></div>' +
        '<div class="sk-line sk-title"></div><div class="sk-line sk-title2"></div>' +
        '<div class="sk-tags"><span></span><span></span></div></li>';
    }
    nav.innerHTML = html;
  }

  /* ---- 16b  External link favicon hover preview ----------- */
  function initLinkPreview() {
    var pbody = document.getElementById('postBody');
    if (!pbody) return;
    var tip = null;
    function showTip(a, e) {
      var url;
      try { url = new URL(a.href); } catch (_) { return; }
      if (url.origin === location.origin) return;
      if (!tip) {
        tip = document.createElement('div');
        tip.className = 'luliy-linktip';
        document.body.appendChild(tip);
      }
      var host = url.hostname.replace(/^www\./, '');
      tip.innerHTML =
        '<img src="https://www.google.com/s2/favicons?domain=' + encodeURIComponent(host) + '&sz=32" alt="">' +
        '<div class="lt-meta"><div class="lt-host">' + esc(host) + '</div>' +
        '<div class="lt-path">' + esc((url.pathname + url.search).slice(0, 48) || '/') + '</div></div>';
      tip.classList.add('is-on');
      moveTip(e);
    }
    function moveTip(e) {
      if (!tip) return;
      /* ★ zoom 校正：fixed tooltip 需除以 html zoom 才能精准跟鼠标 */
      var p = zoomPos(e.clientX, e.clientY);
      var x = p.x + 14, y = p.y + 16;
      var w = 240;
      if (x + w > window.innerWidth / getZoomFactor()) x = p.x - w - 14;
      tip.style.left = x + 'px'; tip.style.top = y + 'px';
    }
    function hideTip() { if (tip) tip.classList.remove('is-on'); }

    pbody.querySelectorAll('a[href^="http"]').forEach(function (a) {
      if (a._luliyTip) return; a._luliyTip = true;
      a.addEventListener('mouseenter', function (e) { showTip(a, e); });
      a.addEventListener('mousemove', moveTip);
      a.addEventListener('mouseleave', hideTip);
    });
  }

  /* ---- 27  Main entry ------------------------------------- */
  initLocalStorage();

  /* Restore theme immediately to prevent FOUC.
     ★ 恢复手动选主题系统：不再跟随深浅模式自动切换。
     读取用户上次手动选的主题（localStorage 'luliy-sink'），
     没选过就用新默认主题「赛博朋克」。直接复用前面已经定义好的
     applySink()，它本身就会处理 data-luliy-theme + 卡片配色变量，
     7 套主题（含新增的 cyberpunk）全部覆盖，不用再单独维护一份
     精简版色板。 */
  (function () {
    function boot() {
      if (!document.body) return;
      applySink(_lsGet('luliy-sink') || 'cyberpunk');
    }
    if (document.body) boot();
    else document.addEventListener('DOMContentLoaded', boot);
  })();

  /* ★ 背景图功能已全部移除 —— 全站背景统一改为纯色 #00020c，
     直接写在 enhance.css 的 html,body 规则里，深浅模式自适配，
     不再需要任何 JS 早期注入/恢复逻辑。 */

  /* Welcome splash (before DOM ready, append after body exists) */
  /* ★ 大改后：网站打开时的加载动画，两种随机出现：
       · flow ：居中"ΔιάΝους"文字 + 荧光循环缠绕流动色（原有那版）
       · sweep：居中文字默认暗，一道白光从 Δ 扫向结尾十字星，
                光扫到哪个字母哪个字母才亮，扫过之后变暗，
                光到达十字星时更亮地闪一下、停顿，然后循环
     显示 splashMaxMs(默认1.5s) 后自动淡出移除。 */
  (function initSplash() {
    /* 避免重复、避免在 iframe / 打印时出现 */
    if (window.top !== window.self) return;
    var TEXT = (LULIY_OPTS && LULIY_OPTS.siteName) || '\u0394\u03b9\u03ac\u039d\u03bf\u03c5\u03c2';
    var MAXMS = (LULIY_OPTS && LULIY_OPTS.splashMaxMs) || 1500;
    var VARIANT = Math.random() < 0.5 ? 'flow' : 'sweep';

    function build() {
      if (!document.body) { return setTimeout(build, 10); }
      if (document.getElementById('luliy-splash')) return;

      var splash = document.createElement('div');
      splash.id = 'luliy-splash';
      var txt = document.createElement('div');
      txt.id = 'luliy-splash-text';
      txt.setAttribute('data-text', TEXT);   /* 用于 CSS 荧光叠层 */

      if (VARIANT === 'sweep') {
        txt.classList.add('is-sweep');
        var bodyChars = TEXT.slice(0, -1);
        var lastChar = TEXT.slice(-1);
        txt.appendChild(document.createTextNode(bodyChars));
        var flare = document.createElement('span');
        flare.className = 'flare-anchor';
        flare.textContent = lastChar;
        txt.appendChild(flare);
      } else {
        txt.textContent = TEXT;
      }

      splash.appendChild(txt);
      document.body.appendChild(splash);
      /* 锁滚动，避免加载时页面在动画底下乱跳 */
      document.documentElement.style.overflow = 'hidden';

      var done = false;
      function dismiss() {
        if (done) return; done = true;
        splash.classList.add('is-leaving');
        document.documentElement.style.overflow = '';
        setTimeout(function () {
          if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
        }, 600);   /* 与 CSS 淡出时长一致 */
      }
      setTimeout(dismiss, MAXMS);
    }
    build();
  })();

  /* Sakura petals auto-init call removed along with the sakura
     particle system itself (see section 16) — initSakura() is now
     a permanent no-op, so calling it here would do nothing anyway. */

  /* Crash isolation: one broken module must never take down the rest */
  function safe(fn, name) {
    try { fn(); }
    catch (e) {
      try { console.warn('[luliy] init failed:', name || fn.name, e); } catch (e2) {}
    }
  }

  /* ============================================================
     极简系统 Minimal System —— 与赛博朋克系统并存，可切换
     · localStorage 键 luliy-system：'cyber'(默认) / 'minimal'
     · 极简系统下不加载任何赛博特效，走自己的黑白灰衬线排版。
     ============================================================ */
  var SYSTEM_KEY = 'luliy-system';
  var MINIMAL_HOME_IMG = 'https://free.picui.cn/free/2026/06/28/6a413d098581f.png';

  function getSystem() {
    try { return _lsGet(SYSTEM_KEY) === 'minimal' ? 'minimal' : 'cyber'; }
    catch (e) { return 'cyber'; }
  }
  function setSystem(sys) {
    try { _lsSet(SYSTEM_KEY, sys); } catch (e) {}
    location.reload();
  }
  root._luliySetSystem = setSystem;
  root._luliyGetSystem = getSystem;

  /* 点击时：若干深浅不一的墨滴从点击处向外溅开，由大变小。 */
  function initMinimalInkClick() {
    if (initMinimalInkClick._bound) return;
    initMinimalInkClick._bound = true;
    document.addEventListener('click', function (e) {
      var x = e.clientX, y = e.clientY;
      var wrap = document.createElement('div');
      wrap.className = 'luliy-ink-wrap';
      wrap.style.left = x + 'px';
      wrap.style.top = y + 'px';

      /* 18~26 颗墨滴，随机角度/距离/大小/深浅/延迟 */
      var dropCount = 18 + Math.floor(Math.random() * 9);
      for (var i = 0; i < dropCount; i++) {
        var drop = document.createElement('span');
        drop.className = 'luliy-ink-drop';
        var angle = Math.random() * Math.PI * 2;
        var dist = 16 + Math.random() * 70;
        var dx = Math.cos(angle) * dist;
        var dy = Math.sin(angle) * dist;
        var size = 8 + Math.random() * 20;
        var shade = 0.18 + Math.random() * 0.55;   /* 深浅不一 */
        var delay = Math.random() * 0.12;
        drop.style.setProperty('--luliy-dx', dx + 'px');
        drop.style.setProperty('--luliy-dy', dy + 'px');
        drop.style.width = size + 'px';
        drop.style.height = size + 'px';
        drop.style.marginLeft = (-size / 2) + 'px';
        drop.style.marginTop = (-size / 2) + 'px';
        drop.style.setProperty('--luliy-drop-op', shade);
        drop.style.animationDelay = delay + 's';
        wrap.appendChild(drop);
      }

      document.body.appendChild(wrap);
      setTimeout(function () { if (wrap.parentNode) wrap.parentNode.removeChild(wrap); }, 850);
    }, { passive: true });
  }

  function initMinimalSystem() {
    document.body.classList.add('luliy-minimal');
    try { document.documentElement.style.zoom = '1'; } catch (e) {}
    safe(initMinimalInkClick, 'inkClick');

    if (!isIndexPage()) buildMinimalNav();
    buildSystemToggle();

    if (isIndexPage()) {
      renderMinimalHome();
    } else if (isChroniclePage()) {
      safe(initChroniclePage, 'chronicle');
    } else if (isBookPage()) {
      safe(initBookPage, 'book');
    } else if (isArchivePage()) {
      safe(initArchivesPage, 'archives');
    } else {
      renderMinimalArticle();
    }
  }

  function buildMinimalNav() {
    if (document.getElementById('luliy-min-nav')) return;
    var nav = document.createElement('nav');
    nav.id = 'luliy-min-nav';
    var links = [
      { label: 'Home', href: '/' },
      { label: 'Archives', href: '/archive.html' },
      { label: 'Chronicle', href: '/chronicle.html' },
      { label: 'Book', href: '/book.html' },
      { label: 'About', href: '/about.html' }
    ];
    nav.innerHTML = links.map(function (l) {
      return '<a href="' + l.href + '">' + l.label + '</a>';
    }).join('<span class="luliy-min-nav-sep">/</span>');
    document.body.insertBefore(nav, document.body.firstChild);
  }

  function buildSystemToggle() {
    if (document.getElementById('luliy-system-toggle')) return;
    var btn = document.createElement('button');
    btn.id = 'luliy-system-toggle';
    btn.type = 'button';
    btn.title = '\u5207\u6362\u5230\u8d5b\u535a\u670b\u514b\u7cfb\u7edf';
    btn.textContent = '\u25C8';
    btn.addEventListener('click', function () { setSystem('cyber'); });
    document.body.appendChild(btn);
  }

  function renderMinimalHome() {
    document.body.classList.add('luliy-min-home-page');
    var wrap = document.createElement('div');
    wrap.id = 'luliy-min-home';
    var links = [
      { href: '/about.html',     label: 'About' },
      { href: '/book.html',      label: 'Book' },
      { href: '/archive.html',   label: 'Archives' },
      { href: '/chronicle.html', label: 'Chronicle' }
    ];
    var navHtml = links.map(function (l) {
      return '<a href="' + l.href + '">' + l.label + '</a>';
    }).join('<span class="luliy-min-nav-sep">/</span>');
    wrap.innerHTML =
      '<div class="luliy-min-home-stage">' +
        '<img class="luliy-min-home-img" src="' + esc(MINIMAL_HOME_IMG) + '" alt="" draggable="false">' +
        '<nav class="luliy-min-home-nav">' + navHtml + '</nav>' +
      '</div>';
    document.body.appendChild(wrap);
  }


  function renderMinimalArticle() {
    document.body.classList.add('luliy-min-article');
    var pb = document.getElementById('postBody');
    if (!pb) return;
    var heads = pb.querySelectorAll('h1, h2, h3');
    if (heads.length >= 2) {
      var toc = document.createElement('nav');
      toc.id = 'luliy-min-toc';
      var html = '';
      heads.forEach(function (h, i) {
        if (!h.id) h.id = 'luliy-min-h-' + i;
        var lvl = h.tagName === 'H1' ? 'h1' : (h.tagName === 'H2' ? 'h2' : 'h3');
        html += '<a class="luliy-min-toc-' + lvl + '" href="#' + h.id + '">' +
          esc(h.textContent) + '</a>';
      });
      toc.innerHTML = html;
      document.body.appendChild(toc);

      /* 滚动时给当前所在标题对应的目录项加 is-active（加粗高亮） */
      var tocLinks = toc.querySelectorAll('a');
      function updateActiveToc() {
        var activeIdx = 0;
        var headsArr = Array.prototype.slice.call(heads);
        for (var i = 0; i < headsArr.length; i++) {
          if (headsArr[i].getBoundingClientRect().top - 120 <= 0) activeIdx = i;
          else break;
        }
        tocLinks.forEach(function (a, i) {
          a.classList.toggle('is-current', i === activeIdx);
        });
      }
      updateActiveToc();
      var tocSpyTicking = false;
      window.addEventListener('scroll', function () {
        if (tocSpyTicking) return;
        tocSpyTicking = true;
        requestAnimationFrame(function () { updateActiveToc(); tocSpyTicking = false; });
      }, { passive: true });
    }
  }

  /* 极简系统 · 专注模式（Focus Mode）
     仅文章页可用：双击正文区域，或按 F 键，进入/退出专注模式。
     专注模式套用独立的编辑部/学术期刊排版（象牙白背景/近黑正文/
     陶土色强调色/衬线正文/无阴影无圆角），并隐藏目录、导航等干扰元素，
     样式定义见 enhance.css 的 .luliy-focus-mode 区块。
     注：双击是浏览器选词手势——双击文字必然会先选中一个词。为避免
     切换专注模式后留下刺眼的高亮选区，切换后会主动清空当前选区。 */
  function initMinimalFocusMode() {
    if (initMinimalFocusMode._bound) return;
    initMinimalFocusMode._bound = true;

    function hasArticle() {
      return !!document.getElementById('postBody') &&
        document.body.classList.contains('luliy-min-article');
    }
    function inEditableOrControl(el) {
      if (!el || !el.closest) return false;
      return !!el.closest(
        'a, button, input, textarea, select, [contenteditable], ' +
        '#luliy-min-nav, #luliy-min-toc, #luliy-system-toggle, #luliy-focus-hint'
      );
    }
    function showFocusHint() {
      if (document.getElementById('luliy-focus-hint')) return;
      var hint = document.createElement('div');
      hint.id = 'luliy-focus-hint';
      hint.textContent = 'F \u6216\u53cc\u51fb\u00b7\u9000\u51fa\u4e13\u6ce8\u6a21\u5f0f'; /* F 或双击·退出专注模式 */
      document.body.appendChild(hint);
      setTimeout(function () {
        hint.classList.add('is-out');
        setTimeout(function () { if (hint.parentNode) hint.parentNode.removeChild(hint); }, 400);
      }, 2200);
    }
    function toggleFocus() {
      if (!hasArticle()) return;
      var on = document.body.classList.toggle('luliy-focus-mode');
      try { if (typeof playSfx === 'function') playSfx('theme'); } catch (e) {}
      var sel = window.getSelection && window.getSelection();
      if (sel && sel.removeAllRanges) sel.removeAllRanges();
      if (on) showFocusHint();
    }

    document.addEventListener('keydown', function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var t = e.target;
      var tag = t && t.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' ||
        (t && t.isContentEditable)) return;
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFocus();
      } else if (e.key === 'Escape' && document.body.classList.contains('luliy-focus-mode')) {
        document.body.classList.remove('luliy-focus-mode');
      }
    });

    document.addEventListener('dblclick', function (e) {
      if (!hasArticle()) return;
      if (inEditableOrControl(e.target)) return;
      toggleFocus();
    });
  }

  ready(function () {
    /* ★ 极简系统拦截：在任何赛博初始化之前判断。命中则走极简分支并 return。 */
    if (getSystem() === 'minimal') {
      safe(initMinimalSystem, 'minimalSystem');
      safe(initMinimalFocusMode, 'minimalFocusMode');
      return;
    }

    /* ★ 大改后：全站锁定「抽屉导航」，首屏直接应用，避免两套导航闪现 */
    try {
      document.body.classList.remove('luliy-nav-hero');
      document.body.classList.add('luliy-nav-drawer');
    } catch (e) {}

    /* ★ 把 Gmeek 原生 header 里的博客名也改成 ΔιάΝους（保持一致；
       原生 header 在抽屉模式下被压扁隐藏，但改掉更稳妥） */
    try {
      var _bn = (LULIY_OPTS && LULIY_OPTS.siteName) || '\u0394\u03b9\u03ac\u039d\u03bf\u03c5\u03c2';
      document.querySelectorAll('.blogTitle, .blogTitle a, a.blogTitle').forEach(function (el) {
        /* 只改纯文字节点，避免动到里头的头像 <img> */
        if (el.children.length === 0) el.textContent = _bn;
      });
    } catch (e) {}

    safe(initCategoryCards,   'categoryCards');
    safe(initAPlayer,         'aplayer');
    safe(initProgressBar,     'progressBar');
    safe(initDynamicTitle,    'dynamicTitle');
    safe(initUptime,          'uptime');
    safe(initSfxEvents,       'sfx');
    safe(initThemeRipple,     'ripple');
    safe(initTagEnhance,      'tagEnhance');
    safe(initHeroCluster,     'navbar');
    safe(initLightbox,        'lightbox');
    safe(initToolbar,         'toolbar');
    safe(initNavTransparency, 'navTransparency');
    safe(initDrawerNav,       'drawerNav');           /* ★ 左滑抽屉导航（全端） */
    safe(initKeyboardShortcuts, 'keyboardShortcuts'); /* ★ 键盘快捷键 / j k g t ←→ */
    safe(initFavoritesLock,   'favLock');   /* safety net — also called in post init */

    /* v10 global features */
    safe(applyReduceMotion,   'reduceMotion');
    safe(applyPbWidth,        'pbWidth');
    safe(applyGlassVars,      'glassVars');
    safe(applyCatSize,        'catSize');
    safe(initViewTransitions, 'viewTransitions');
    safe(initTagCloud,        'tagCloud');

    var isPost    = !!document.getElementById('postBody');
    var hasList   = !!document.querySelector('.SideNav,.post-item,.postList,.post-list');

    /* ★ 编年史 Chronicle 单页：优先识别（它也有 #postBody，但要走自己的
       渲染，不能当普通文章页）。识别后直接接管，不再往下走文章页逻辑。 */
    if (isChroniclePage()) {
      safe(initChroniclePage, 'chronicle');
      return;
    }

    /* ★ 书架 Bookshelf 单页：同理，自己接管渲染 */
    if (isBookPage()) {
      safe(initBookPage, 'book');
      return;
    }

    if (isPost) root._luliyInitPost();
    if (isIndexPage() || isArchivePage() || (!isPost && hasList)) root._luliyInitIndex();

    /* ── Click-blocker watchdog ───────────────────────────────
       Safety net: neutralise any leftover full-viewport fixed
       overlay (high z-index, transparent / off-screen) that would
       silently intercept clicks on the navbar / TOC / buttons.    */
    initClickBlockerWatchdog();
  });

  function initClickBlockerWatchdog() {
    function sweep() {
      var vw = window.innerWidth, vh = window.innerHeight;
      var els = document.querySelectorAll('body > div, body > section, body > a');
      els.forEach(function (el) {
        /* Never touch our own interactive overlays or known UI */
        var id = el.id || '';
        if (/luliy-(toolbar|ctrl|search-bar|lightbox|fav-gate|nav-dropdown|back-top|search-fab|resume|linktip|music)/.test(id)) return;
        var cs = window.getComputedStyle(el);
        if (cs.position !== 'fixed') return;
        if (cs.pointerEvents === 'none') return;
        var r = el.getBoundingClientRect();
        /* Covers most of the viewport? */
        var coversX = r.left <= 4 && r.right >= vw - 4;
        var coversY = r.top <= 4 && r.bottom >= vh - 4;
        if (!coversX || !coversY) return;
        /* If it's effectively invisible (transparent / faded), it must
           not be eating clicks — force click-through. */
        var op = parseFloat(cs.opacity);
        var leaving = el.classList.contains('is-leaving');
        if (op < 0.05 || leaving || cs.visibility === 'hidden' || cs.display === 'none') {
          el.style.pointerEvents = 'none';
        }
      });
    }
    /* Run a few times after load to catch late-appearing overlays */
    sweep();
    setTimeout(sweep, 500);
    setTimeout(sweep, 1500);
    setTimeout(sweep, 3500);
    /* Also sweep whenever the user tries (and fails) to interact */
    document.addEventListener('pointerdown', function () { setTimeout(sweep, 0); }, { passive: true });
  }

})(window);
