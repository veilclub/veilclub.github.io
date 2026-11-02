/* VEIL / THE ARCHIVE v10 — printed member contents travel with the FLIP sheet. */
(function () {
  'use strict';
  const html = document.documentElement;
  const pathname = location.pathname;
  const onHome = pathname === '/' || /\/index\.html$/.test(pathname);
  const onRoster = /\/members\.html$/.test(pathname);
  const reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const params = new URLSearchParams(location.search);
  const debug = params.get('archiveDebug') === '1';
  const wantsIntro = params.get('archiveOpen') === '1';
  let running = false;
  function isRosterLink(anchor) {
    if (!anchor || !anchor.getAttribute || anchor.hasAttribute('download') || anchor.hasAttribute('data-cube-switch')) return false;
    const href = anchor.getAttribute('href');
    if (!href || href.charAt(0) === '#') return false;
    try {
      const url = new URL(href, location.href);
      return url.origin === location.origin && /\/members\.html$/.test(url.pathname) && (!anchor.target || anchor.target === '_self');
    } catch (_) { return false; }
  }
  if (onHome) {
    let leaving = false;
    document.addEventListener('click', function (event) {
      if (leaving || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest && event.target.closest('a[href]');
      if (!isRosterLink(link)) return;
      event.preventDefault();
      leaving = true;
      const url = new URL(link.href, location.href);
      url.searchParams.set('archiveOpen', '1');
      if (reduced) { location.assign(url.href); return; }
      const overlay = document.createElement('div');
      overlay.className = 'veil-archive-exit';
      overlay.setAttribute('aria-hidden', 'true');
      document.body.appendChild(overlay);
      requestAnimationFrame(function () { overlay.classList.add('is-on'); });
      setTimeout(function () { location.assign(url.href); }, 250);
      window.addEventListener('pageshow', function (e) {
        if (e.persisted) { overlay.remove(); leaving = false; }
      });
    }, false);
  }
  if (!onRoster) return;
  function removeIntroParam() {
    const url = new URL(location.href);
    url.searchParams.delete('archiveOpen');
    try { history.replaceState(history.state, '', url.pathname + url.search + url.hash); } catch (_) {}
  }
  if (!wantsIntro || reduced || !html.classList.contains('archive-intro')) {
    html.classList.remove('archive-intro');
    if (wantsIntro) removeIntroParam();
    return;
  }
  window.__veilIntroRan = true;
  function start() {
    const book = document.querySelector('.archive-book');
    if (!book) { html.classList.remove('archive-intro'); removeIntroParam(); return; }
    running = true;
    try { history.scrollRestoration = 'manual'; } catch (_) {}
    scrollTo(0, 0);
    const stage = document.createElement('div');
    stage.className = 'veil-archive-intro';
    stage.setAttribute('role', 'dialog');
    stage.setAttribute('aria-label', '正在打開 VEIL 人物名錄，點擊可略過');
    stage.innerHTML =
      '<div class="veil-archive-intro__folder" aria-hidden="true">' +
        '<div class="veil-archive-intro__tab"></div>' +
        '<div class="veil-archive-intro__back"></div>' +
        '<div class="veil-archive-intro__pocket"><img src="assets/veil-logo-silver.svg" alt=""><strong>THE ARCHIVE</strong><span>GENTLEMEN / VEIL</span></div>' +
      '</div>' +
      '<button type="button" class="veil-archive-intro__skip">SKIP ↗</button>';
    const folder = stage.querySelector('.veil-archive-intro__folder');
    const documentPage = document.createElement('div');
    documentPage.className = 'archive-book veil-archive-intro__document';
    documentPage.setAttribute('aria-hidden', 'true');
    // Clone the real printed page, not just its empty shell. It is laid out
    // at the destination width before FLIP, so type and portraits scale with
    // the document as one continuous composition.
    ['.archive-book__shell', '.archive-book__index', '.archive-book__content'].forEach(function (selector) {
      const original = book.querySelector(selector);
      if (original) documentPage.appendChild(original.cloneNode(true));
    });
    documentPage.querySelectorAll('[id]').forEach(function (node) { node.removeAttribute('id'); });
    documentPage.querySelectorAll('img[loading="lazy"]').forEach(function (img) { img.loading = 'eager'; });
    stage.appendChild(documentPage);
    document.body.appendChild(stage);
    let finished = false;
    let entrance = null;
    let paperAnimation = null;
    let folderRetreat = null;
    let holdTimer = null;
    let safetyTimer = null;
    let entranceTimer = null;
    let phase = 'enter';
    const blockedKeys = new Set([' ', 'PageDown', 'PageUp', 'Home', 'End', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight']);
    function blockScroll(event) { if (event.cancelable) event.preventDefault(); }
    function blockKeyboard(event) {
      if (event.key === 'Escape') { event.preventDefault(); finish(true); return; }
      if (blockedKeys.has(event.key)) blockScroll(event);
    }
    function pinScroll() { if (scrollX || scrollY) scrollTo(0, 0); }
    window.addEventListener('wheel', blockScroll, {passive: false});
    window.addEventListener('touchmove', blockScroll, {passive: false});
    window.addEventListener('keydown', blockKeyboard);
    window.addEventListener('scroll', pinScroll, {passive: true});
    function unlock() {
      window.removeEventListener('wheel', blockScroll);
      window.removeEventListener('touchmove', blockScroll);
      window.removeEventListener('keydown', blockKeyboard);
      window.removeEventListener('scroll', pinScroll);
    }
    function skipClick(event) {
      if (finished) return;
      event.preventDefault();
      event.stopPropagation();
      finish(true);
    }
    document.addEventListener('click', skipClick, true);
    function targetRect() {
      const r = book.getBoundingClientRect();
      return {left: r.left, top: r.top, width: r.width, height: Math.min(r.height, Math.max(1, innerHeight - r.top))};
    }
    function applyTarget(t) {
      documentPage.style.left = t.left + 'px';
      documentPage.style.top = t.top + 'px';
      documentPage.style.width = t.width + 'px';
      documentPage.style.height = t.height + 'px';
    }
    function snapRect() {
      const r = documentPage.getBoundingClientRect();
      return {left: r.left, top: r.top, width: r.width, height: r.height};
    }
    function mapRect(from, to) {
      return 'translate(' + (from.left - to.left) + 'px,' + (from.top - to.top) + 'px) scale(' +
        (from.width / to.width) + ',' + (from.height / to.height) + ')';
    }
    function folderSource() {
      const r = folder.getBoundingClientRect();
      return {left: r.left + r.width * .11, top: r.top + r.height * .08,
        width: r.width * .78, height: r.height * .84};
    }
    function logAlignment() {
      if (!debug) return;
      const d = snapRect();
      const actual = book.getBoundingClientRect();
      const visible = targetRect();
      const differences = {
        left: Math.abs(d.left - visible.left), top: Math.abs(d.top - visible.top),
        width: Math.abs(d.width - visible.width), height: Math.abs(d.height - visible.height)
      };
      window.__archiveDebug = {document: d, book: {
        left: actual.left, top: actual.top, width: actual.width, height: actual.height
      }, visibleBook: visible, delta: differences, pass: Object.values(differences).every(function (v) {return v <= 1;})};
      console.log('[VEIL archive] 動畫最後一幀文件的 rect', d);
      console.log('[VEIL archive] .archive-book 的 rect', window.__archiveDebug.book);
      console.log('[VEIL archive] visible book rect / delta (≤1px)', visible, differences, 'PASS:', window.__archiveDebug.pass);
    }
    function cancelAnimation(a) { if (a) { try { a.cancel(); } catch (_) {} } }
    function finish(skipped) {
      if (finished) return;
      finished = true;
      running = false;
      clearTimeout(entranceTimer);
      clearTimeout(holdTimer);
      clearTimeout(safetyTimer);
      cancelAnimation(entrance);
      cancelAnimation(paperAnimation);
      cancelAnimation(folderRetreat);
      if (!skipped) {
        documentPage.style.transform = 'none';
        applyTarget(targetRect());
        logAlignment();
      } else if (debug) {
        console.log('[VEIL archive] animation skipped');
        window.__archiveDebug = {skipped: true};
      }
      // Atomic handoff: the animated sheet and real album share exactly
      // the same printed contents. Reveal the original and remove the clone
      // before the next paint, without a second text fade-in or blank frame.
      html.classList.remove('archive-intro', 'archive-reveal-pending', 'archive-reveal', 'archive-handoff');
      stage.remove();
      document.removeEventListener('click', skipClick, true);
      window.removeEventListener('resize', onResize);
      unlock();
      removeIntroParam();
      try { history.scrollRestoration = 'auto'; } catch (_) {}
    }
    function startPaper(from, duration) {
      if (finished) return;
      phase = 'paper';
      const t = targetRect();
      applyTarget(t);
      const initial = mapRect(from, t);
      paperAnimation = documentPage.animate([
        {transform: initial, opacity: 1, offset: 0},
        {transform: 'translate(' + (from.left-t.left) + 'px,' + (from.top-t.top-60) + 'px) scale(' + (from.width/t.width) + ',' + (from.height/t.height) + ')', opacity: 1, offset: .18},
        {transform: 'none', opacity: 1, offset: 1}
      ], {duration: duration, easing: 'cubic-bezier(.22,.8,.2,1)', fill: 'forwards'});
      paperAnimation.finished.then(function () {
        if (finished || phase !== 'paper') return;
        phase = 'hold';
        documentPage.style.transform = 'none';
        documentPage.style.opacity = '1';
        cancelAnimation(paperAnimation);
        paperAnimation = null;
        holdTimer = setTimeout(function () { finish(false); }, 260);
      }).catch(function () {});
    }
    function onResize() {
      if (finished) return;
      if (phase === 'enter') return;
      const from = snapRect();
      if (phase === 'hold') {
        applyTarget(targetRect());
        return;
      }
      if (phase === 'paper') {
        const remaining = Math.max(180, 1700 - (performance.now() - paperStartTime));
        cancelAnimation(paperAnimation);
        startPaper(from, remaining);
      }
    }
    let paperStartTime = 0;
    window.addEventListener('resize', onResize, {passive: true});
    safetyTimer = setTimeout(function () { finish(true); }, 5500);
    const fw = Math.min(340, Math.max(210, innerWidth * .26));
    const fh = fw * 4 / 3;
    const header = document.querySelector('body>header');
    const hb = header ? header.getBoundingClientRect().bottom : 0;
    folder.style.width = fw + 'px';
    folder.style.height = fh + 'px';
    folder.style.top = (hb + (innerHeight - hb) * .55) + 'px';
    entrance = folder.animate([
      {transform: 'translate(-50%,-50%) translate(' + innerWidth*.65 + 'px,' + innerHeight*.3 + 'px) rotate(-8deg)', opacity: 0},
      {transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 1}
    ], {duration: 600, easing: 'cubic-bezier(.22,.8,.2,1)', fill: 'forwards'});
    entranceTimer = setTimeout(function () {
      if (finished) return;
      folder.style.transform = 'translate(-50%,-50%)';
      folder.style.opacity = '1';
      cancelAnimation(entrance);
      paperStartTime = performance.now();
      startPaper(folderSource(), 1100);
      // Keep the folder's size stable; let the visible paper grow above it.
      folderRetreat = folder.animate([
        {transform: 'translate(-50%,-50%)', opacity: 1, offset: 0},
        {transform: 'translate(-50%,-50%)', opacity: 1, offset: .18},
        {transform: 'translate(-50%,-50%) translateY(16px)', opacity: 0, offset: 1}
      ], {duration: 850, easing: 'ease-in', fill: 'forwards'});
    }, 600);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once: true});
  else start();
})();