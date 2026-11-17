/*
 * Sword-pull intro: the portfolio's preloader.
 *
 * Inspired by the Budokai Tenkaichi 3 loading screen: Tarun teleports across a
 * field of swords and yanks them out of the ground while the site loads.
 *
 * How it fits together
 *  - A tiny gate script in index.html <head> starts the intro before first
 *    paint on every full page load. It sets html.pl-active and
 *    window.__swordIntro.
 *  - This file is a deferred classic script ordered before the app bundle, so
 *    it always runs first. It pulls at least MIN_PULLS swords, then keeps
 *    pulling until React has rendered ('app:ready', fired by signalAppReady()
 *    in src/lib/swordIntro.ts).
 *  - Mash Space / click / tap to make him pull faster. Esc or Skip to leave.
 *  - The last yank slashes the screen in two and the halves slide apart.
 *    'sword-intro:reveal' fires at that moment so hero animations can start.
 *  - Sprite: /preloader/sword-pull.{avif,webp}, three frames (grab, strain,
 *    yank) built by scripts/build-preloader-sprite.mjs.
 */
(() => {
  'use strict';

  const S = window.__swordIntro;
  if (!S || !S.active || S.started) return;
  S.started = true;

  // ── Tunables ────────────────────────────────────────────────────────────
  const MIN_PULLS = 3; // swords pulled before the site may appear (~4.5s)
  const MAX_WAIT = 20000; // never hold the site back longer than this (ms)
  const T = {
    firstArrive: 380,
    arrive: 100,
    grab: 200,
    strain: 430,
    yank: 330,
    vanish: 100,
    gap: 40,
    mashCut: 150, // each mash during the strain shortens it by this much
  };

  // Sprite geometry in source-art pixels (the 1024px frames).
  // Keep in sync with CROP in scripts/build-preloader-sprite.mjs.
  const ART = {
    cellW: 1140,
    cellH: 1124,
    anchorX: 743.5, // sword base (ground contact) inside a cell
    anchorY: 1098,
    reachLeft: 556, // body extent around the anchor
    reachRight: 390, // blade tip when he's standing
    reachUp: 1095, // head when he's standing
    crouch: 733, // crouching height, used for sizing
    tip: [384.4, -286.3], // yank pose, relative to the anchor
    guard: [10.7, -589.4],
    angle: 40, // blade angle in the yank pose, degrees below horizontal
  };
  // Keep tapping and he keeps pulling. A gap this long between taps means the
  // visitor has stopped: he yanks the sword he's on and slashes into the site.
  const PLAY_GRACE = 700;
  // Playing is capped: the first sword that comes out after this long (ms since
  // the intro started) is the last one, then the slash.
  const PLAY_LIMIT = 8000;
  // Field-sword art, same units as ART, origin at the point where the blade
  // meets the ground. The <svg> that <use>s it needs a 0-based viewBox: the
  // symbol's viewport is placed at the user-space origin.
  const VIEWBOX = '-52 -236 104 244';
  const BOX = { x: -52, y: -236, w: 104, h: 244 };
  const SPRITE = { avif: '/preloader/sword-pull.avif', webp: '/preloader/sword-pull.webp' };

  const doc = document;
  const html = doc.documentElement;
  const appRoot = doc.getElementById('root');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = matchMedia('(hover: none) and (pointer: coarse)').matches;
  const minPulls = reduced ? 1 : MIN_PULLS;
  const now = () => performance.now();
  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const px = (v) => `${v.toFixed(2)}px`;
  const el = (tag, cls, parent) => {
    const node = doc.createElement(tag);
    if (cls) node.className = cls;
    if (parent) parent.appendChild(node);
    return node;
  };
  const t0 = now();

  // ── Is the site ready? ─────────────────────────────────────────────────
  let tRun = t0; // reset when the show actually starts (tab visible)
  let appReady = !!window.__appReady;
  let appReadyAt = appReady ? t0 : 0;
  let winLoaded = doc.readyState === 'complete';
  const onAppReady = () => {
    if (appReady) return;
    appReady = true;
    appReadyAt = now();
  };
  addEventListener('app:ready', onAppReady);
  addEventListener('load', () => { winLoaded = true; }, { once: true });
  const fontsDone = () => !doc.fonts || doc.fonts.status === 'loaded';

  function siteReady() {
    if (now() - tRun > MAX_WAIT) return true;
    if (!appReady) return false;
    const since = now() - appReadyAt;
    // Below-the-fold videos can hold up window.load; don't wait on them forever.
    return (winLoaded || since > 2500) && (fontsDone() || since > 1500);
  }

  // ── Art ─────────────────────────────────────────────────────────────────
  const INK = '#100c0a';
  const CRACKS = `<path d="M-36 3q4.5-4.5 9.5-1t9-1M16 2.5q4-3.5 8.5-.5t9.5-1.5" fill="none" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>`;
  const diamonds = Array.from({ length: 9 }, (_, i) => `M0 ${-205.5 + i * 12}l7.5 4.5-7.5 4.5-7.5-4.5z`).join('');
  // Drawn to match the katana in frame 1, so the swap to the sprite is seamless.
  const SWORD_ART = `
    <ellipse cx="9" cy="1.5" rx="27" ry="3.6" fill="#000" opacity=".2"/>
    <path d="M-14.5-53H0V0h-14.5z" fill="#75797d"/>
    <path d="M0-53h14.5V0H0z" fill="#aab2b8"/>
    <path d="M0-53V0" stroke="${INK}" stroke-width="1.4"/>
    <g stroke="${INK}" stroke-width="2.6" stroke-linejoin="round">
      <path d="M-14.5-53h29V0h-29z" fill="none"/>
      <path d="M-17-70h34v17h-34z" fill="#4c483a" stroke="none"/>
      <path d="M-17-59h34v6h-34z" fill="#7d7658" stroke="none"/>
      <path d="M-17-70h34v17h-34z" fill="none"/>
      <ellipse cy="-72.5" rx="43.5" ry="6.6" fill="#3d3d30"/>
      <ellipse cy="-76.5" rx="43.5" ry="5.6" fill="#7e7a5f" stroke-width="2.2"/>
      <path d="M-11-93h22v16h-22z" fill="#87815f" stroke-width="2.4"/>
      <path d="M-13-209h26l.6 116h-27.2z" fill="#3a3029"/>
      <path d="${diamonds}" fill="#958f76" stroke-width="1.5"/>
      <path d="M-13.5-209v-14.5q0-5 5-5h17q5 0 5 5v14.5z" fill="#77704f"/>
    </g>
    <path d="M-8.5-225.5h17" stroke="#b3ae8c" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M-3.2-228.6v6.6h6.4v-6.6z" fill="${INK}"/>
    ${CRACKS}`;
  const HOLE_ART = `
    <ellipse cy="1" rx="34" ry="7.5" fill="#000" opacity=".16"/>
    <ellipse cy=".5" rx="16" ry="4.6" fill="#0d0a08"/>
    <path d="M-38 3q5-5 10.5-1.2t10-1.3M17 2.5q4.5-4 9.5-.6t10.5-1.7" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <g fill="${INK}"><circle cx="-11" cy="-8" r="2.4"/><circle cx="13" cy="-12" r="2"/><circle cx="3" cy="-18" r="1.5"/></g>`;

  // ── Scene ───────────────────────────────────────────────────────────────
  const root = el('div', 'pl-root');
  root.innerHTML = `
    <svg class="pl-defs" aria-hidden="true" focusable="false"><defs>
      <symbol id="pl-sword-art" viewBox="${VIEWBOX}">${SWORD_ART}</symbol>
      <symbol id="pl-hole-art" viewBox="${VIEWBOX}">${HOLE_ART}</symbol>
      <symbol id="pl-glint-art" viewBox="-20 -20 40 40"><path d="M0-20C1.6-5 5-1.6 20 0 5 1.6 1.6 5 0 20-1.6 5-5 1.6-20 0-5-1.6-1.6-5 0-20z" fill="#fff"/></symbol>
    </defs></svg>
    <div class="pl-scene" aria-hidden="true">
      <svg class="pl-tufts"><path/></svg>
      <svg class="pl-grain"><rect width="100%" height="100%" filter="url(#noise)"/></svg>
    </div>
    <div class="pl-ui">
      <button class="pl-skip" type="button">Skip intro<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg></button>
      <div class="pl-hint" aria-hidden="true">${touch
        ? '<span class="pl-tap"></span><span>Tap to pull faster</span>'
        : '<kbd class="pl-key">Space</kbd><span>Mash to pull faster</span>'}</div>
      <div class="pl-progress" aria-hidden="true"><span class="pl-label"><i class="pl-dot"></i>Now loading</span><span class="pl-pct"><b>0</b><small>%</small></span></div>
      <p class="pl-sr" role="status">Loading portfolio</p>
    </div>`;
  doc.body.insertBefore(root, appRoot || doc.body.firstChild);
  if (appRoot) appRoot.inert = true;

  const scene = root.querySelector('.pl-scene');
  const ui = root.querySelector('.pl-ui');
  const skipBtn = root.querySelector('.pl-skip');
  const hint = root.querySelector('.pl-hint');
  const pressEl = hint.querySelector('.pl-key, .pl-tap');
  const pctEl = root.querySelector('.pl-pct b');
  const tuftPath = root.querySelector('.pl-tufts path');

  // ── Layout ──────────────────────────────────────────────────────────────
  let W = 0;
  let H = 0;
  let s = 1; // screen px per art px
  let mX = 16;
  let region = { x0: 0, x1: 0, y0: 0, y1: 0 };

  function measure() {
    W = innerWidth;
    H = innerHeight;
    s = clamp(Math.min(H * 0.27, W * 0.52) / ART.crouch, 0.2, 0.44);
    mX = Math.max(16, W * 0.03);
    const y0 = Math.max(H * 0.3, Math.max(20, H * 0.03) + ART.reachUp * s);
    region = {
      x0: mX + ART.reachRight * s,
      x1: W - mX - ART.reachRight * s,
      y0,
      y1: Math.max(y0 + 40, H - Math.max(120, H * 0.15)), // clear of the bottom readouts
    };
  }

  // Farther up the field = slightly smaller.
  const depth = (y) => 0.86 + 0.14 * clamp((y - region.y0) / Math.max(1, region.y1 - region.y0), 0, 1);
  const dist = (sw, x, y) => Math.hypot(sw.x - x, (sw.y - y) * 1.4);

  // Best-candidate sampling: an even but organic scatter, like the BT3 field.
  // Spacing is measured in normalised units so it survives any later resize.
  function fieldSize() {
    const rw = Math.max(1, region.x1 - region.x0);
    const rh = Math.max(1, region.y1 - region.y0);
    const cell = 229 * s * 2.3;
    return clamp(Math.round((rw * rh) / (cell * cell)), 5, 12);
  }

  // `count` new spots, each as far as possible from `taken` and each other.
  function scatter(count, taken = []) {
    const aspect = clamp(Math.max(1, region.x1 - region.x0) / Math.max(1, region.y1 - region.y0), 0.25, 4);
    const pts = [...taken];
    const fresh = [];
    for (let i = 0; i < count; i++) {
      let best = null;
      let bestD = -1;
      for (let k = 0; k < 24; k++) {
        const p = { u: Math.random(), v: Math.random() };
        let d = Infinity;
        for (const q of pts) d = Math.min(d, ((p.u - q.u) * aspect) ** 2 + ((p.v - q.v) * 1.5) ** 2);
        if (d > bestD) {
          bestD = d;
          best = p;
        }
      }
      pts.push(best);
      fresh.push(best);
    }
    return fresh;
  }

  function placeSword(sw) {
    sw.x = region.x0 + sw.u * (region.x1 - region.x0);
    sw.y = region.y0 + sw.v * (region.y1 - region.y0);
    sw.d = depth(sw.y);
    const k = s * sw.d;
    // Face right like the art, unless his body would run off the left edge.
    const roomLeft = sw.x - ART.reachLeft * k;
    const roomRight = W - (sw.x + ART.reachLeft * k);
    sw.facing = roomLeft >= mX * 0.5 || roomLeft >= roomRight ? 1 : -1;
    const st = sw.el.style;
    st.left = px(sw.x + BOX.x * k);
    st.top = px(sw.y + BOX.y * k);
    st.width = px(BOX.w * k);
    st.height = px(BOX.h * k);
    st.zIndex = String(Math.round(sw.y));
  }

  const tuftSeeds = Array.from({ length: 30 }, () => ({ u: Math.random(), v: Math.random(), k: rand(0.7, 1.25) }));
  function drawTufts() {
    const n = Math.round(clamp((W * H) / 52000, 10, 30));
    let d = '';
    for (let i = 0; i < n; i++) {
      const t = tuftSeeds[i];
      const x = t.u * W;
      const y = H * 0.1 + t.v * H * 0.88;
      const k = (s / 0.33) * t.k * depth(y);
      const f = (v) => (v * k).toFixed(1);
      d += `M${x.toFixed(1)} ${y.toFixed(1)}l${f(2)} ${f(-5)}l${f(1.5)} ${f(5)}l${f(2)} ${f(-7)}l${f(1.5)} ${f(7)}l${f(2)} ${f(-4.5)}`;
    }
    tuftPath.setAttribute('d', d);
  }

  measure();
  function makeSword(p) {
    const node = el('div', 'pl-sword', scene);
    node.innerHTML = `<svg viewBox="0 0 ${BOX.w} ${BOX.h}" aria-hidden="true"><use class="pl-u-sword" href="#pl-sword-art"/><use class="pl-u-hole" href="#pl-hole-art"/></svg>`;
    const sw = { u: p.u, v: p.v, el: node, svg: node.firstChild, state: 'sword', landing: null, x: 0, y: 0, d: 1, facing: 1 };
    placeSword(sw);
    return sw;
  }
  const fieldCount = fieldSize();
  const swords = scatter(fieldCount).map(makeSword);
  drawTufts();

  // ── Character ───────────────────────────────────────────────────────────
  const charEl = el('div', 'pl-char', scene);
  charEl.innerHTML = `<div class="pl-char-hop"><div class="pl-char-shake"><div class="pl-char-flip"><picture><source type="image/avif" srcset="${SPRITE.avif}"><img class="pl-sheet" src="${SPRITE.webp}" alt="" decoding="sync" draggable="false"></picture></div></div></div>`;
  const hopEl = charEl.querySelector('.pl-char-hop');
  const sheet = charEl.querySelector('img');
  const spriteLoaded = new Promise((resolve) => {
    if (sheet.complete) return resolve();
    sheet.addEventListener('load', () => resolve(), { once: true });
    sheet.addEventListener('error', () => resolve(), { once: true });
  }).then(() => (sheet.naturalWidth > 0 && sheet.decode ? sheet.decode().catch(() => {}) : undefined));
  const spriteOk = () => sheet.complete && sheet.naturalWidth > 0;

  const setFrame = (f) => charEl.style.setProperty('--f', String(f));
  // A point on the character (art px from the anchor) in screen px.
  const at = (sw, ax, ay) => ({ x: sw.x + ax * s * sw.d * sw.facing, y: sw.y + ay * s * sw.d });

  function placeChar(sw) {
    const k = s * sw.d;
    const st = charEl.style;
    st.left = px(sw.x - ART.anchorX * k);
    st.top = px(sw.y - ART.anchorY * k);
    st.width = px(ART.cellW * k);
    st.height = px(ART.cellH * k);
    st.zIndex = String(Math.round(sw.y) + 1);
    charEl.classList.toggle('is-flipped', sw.facing < 0);
  }

  // ── Timing helpers ──────────────────────────────────────────────────────
  const waiters = new Set();
  function wait(ms) {
    return new Promise((resolve) => {
      const done = () => {
        clearTimeout(id);
        waiters.delete(done);
        resolve();
      };
      const id = setTimeout(done, Math.max(0, ms));
      waiters.add(done);
    });
  }
  const interruptWaits = () => [...waiters].forEach((done) => done());

  // ── Effects ─────────────────────────────────────────────────────────────
  const fxScale = (sw) => (s * (sw ? sw.d : 1)) / 0.33;

  function spawn(cls, x, y, w, h) {
    const n = el('i', `pl-fx ${cls}`, scene);
    const st = n.style;
    st.left = px(x);
    st.top = px(y);
    st.width = px(w);
    st.height = px(h);
    st.marginLeft = px(-w / 2);
    st.marginTop = px(-h / 2);
    return n;
  }
  const play = (node, frames, opts) => {
    const a = node.animate(frames, { fill: 'forwards', ...opts });
    a.finished.then(() => node.remove(), () => node.remove());
    return a;
  };

  function puff(sw, count, power = 1) {
    if (reduced || !sw) return;
    const k = fxScale(sw);
    for (let i = 0; i < count; i++) {
      const size = rand(16, 28) * k;
      const p = spawn('pl-dust', sw.x + rand(-10, 10) * k, sw.y - 2 * k, size, size);
      const dx = rand(14, 34) * k * power * (Math.random() < 0.5 ? -1 : 1);
      const dy = -rand(4, 14) * k * power;
      play(p, [
        { transform: 'translate(0, 0) scale(.35)', opacity: 0.75 },
        { transform: `translate(${dx}px, ${dy}px) scale(1.25)`, opacity: 0 },
      ], { duration: rand(380, 520), easing: 'cubic-bezier(.2,.7,.3,1)' });
    }
  }

  function dirtBurst(sw) {
    const k = fxScale(sw);
    for (let i = 0; i < 7; i++) {
      const size = rand(3, 6) * k;
      const c = spawn('pl-chunk', sw.x + rand(-6, 6) * k, sw.y - 2 * k, size, size);
      const dx = rand(-46, 46) * k;
      const up = rand(26, 58) * k;
      const rot = rand(-220, 220);
      play(c, [
        { transform: 'translate(0, 0) rotate(0deg)', easing: 'cubic-bezier(.15,.6,.35,1)' },
        { transform: `translate(${dx * 0.55}px, ${-up}px) rotate(${rot / 2}deg)`, offset: 0.42, easing: 'cubic-bezier(.6,0,.85,.4)' },
        { transform: `translate(${dx}px, ${4 * k}px) rotate(${rot}deg)`, opacity: 0.2 },
      ], { duration: rand(480, 620) });
    }
    puff(sw, 3, 1.2);
  }

  function glint(sw) {
    const tip = at(sw, ART.tip[0], ART.tip[1]);
    const size = 44 * fxScale(sw);
    const g = spawn('pl-glint', tip.x, tip.y, size, size);
    g.innerHTML = '<svg viewBox="0 0 40 40"><use href="#pl-glint-art"/></svg>';
    play(g, [
      { transform: 'scale(0) rotate(0deg)', opacity: 1 },
      { transform: 'scale(1.1) rotate(45deg)', opacity: 1, offset: 0.35 },
      { transform: 'scale(0) rotate(90deg)', opacity: 0 },
    ], { duration: 420, delay: 50, easing: 'ease-out', fill: 'both' });
  }

  function speedLines(sw) {
    const k = s * sw.d;
    const cx = sw.x - 230 * k * sw.facing;
    for (let i = 0; i < 3; i++) {
      const len = rand(70, 130) * fxScale(sw);
      const y = sw.y - rand(140, 560) * k;
      const x = cx + rand(-120, 60) * k * sw.facing - (sw.facing < 0 ? len : 0);
      const line = spawn('pl-streak', x + len / 2, y, len, 2);
      play(line, [
        { transform: 'translateX(0) scaleX(1)', opacity: 0.9 },
        { transform: `translateX(${-sw.facing * 28}px) scaleX(.1)`, opacity: 0 },
      ], { duration: 220, easing: 'cubic-bezier(.2,.7,.3,1)' });
    }
  }

  function hop() {
    const lift = 10 * fxScale(current);
    hopEl.animate([
      { transform: 'translateY(0)', easing: 'cubic-bezier(.2,.9,.3,1)' },
      { transform: `translateY(${-lift}px)`, offset: 0.35, easing: 'cubic-bezier(.5,0,.75,0)' },
      { transform: 'translateY(0)' },
    ], { duration: 300 });
  }

  function jolt() {
    const k = fxScale(current);
    hopEl.animate([
      { transform: 'translate(0, 0)' },
      { transform: `translate(${-current.facing * 2 * k}px, ${-3 * k}px)` },
      { transform: 'translate(0, 0)' },
    ], { duration: 120, easing: 'ease-out' });
  }

  function wobble(sw) {
    sw.svg.animate([
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(4deg)' },
      { transform: 'rotate(-2.5deg)' },
      { transform: 'rotate(1deg)' },
      { transform: 'rotate(0deg)' },
    ], { duration: 320, easing: 'ease-out' });
  }

  // DBZ-style afterimage: a fading copy stays behind as he vanishes.
  function ghost() {
    const g = charEl.cloneNode(true);
    g.classList.remove('is-straining');
    scene.appendChild(g);
    play(g, [
      { opacity: 0.55, transform: 'translateX(0)' },
      { opacity: 0, transform: `translateX(${-current.facing * 18 * fxScale(current)}px)` },
    ], { duration: 260, easing: 'ease-out' });
  }

  const flicker = (frames, duration) => charEl.animate(frames, { duration, fill: 'forwards' }).finished;
  const FLICKER_IN = [
    { opacity: 0, easing: 'step-end' },
    { opacity: 1, offset: 0.3, easing: 'step-end' },
    { opacity: 0.2, offset: 0.55, easing: 'step-end' },
    { opacity: 1, offset: 0.8 },
    { opacity: 1 },
  ];
  const FLICKER_OUT = [
    { opacity: 1, easing: 'step-end' },
    { opacity: 0.15, offset: 0.3, easing: 'step-end' },
    { opacity: 0.8, offset: 0.55, easing: 'step-end' },
    { opacity: 0, offset: 0.8 },
    { opacity: 0 },
  ];
  const resetCharAnims = () => charEl.getAnimations().forEach((a) => a.cancel());

  function dropSword(sw, delay) {
    sw.state = 'sword';
    sw.el.classList.remove('is-hole', 'is-taken');
    if (reduced) {
      sw.landing = null;
      return;
    }
    // Stab down from just above its own spot, so nothing flies across him.
    const lift = 90 * s * sw.d;
    const a = sw.el.animate(
      [
        { transform: `translateY(${-lift}px)`, opacity: 0 },
        { opacity: 1, offset: 0.35 },
        { transform: 'translateY(0)', opacity: 1 },
      ],
      { duration: 240, delay, easing: 'cubic-bezier(.55,0,.95,.45)', fill: 'backwards' },
    );
    sw.landing = a.finished.then(() => {
      sw.landing = null;
      wobble(sw);
      puff(sw, 2, 0.7);
    }, () => {});
  }

  // ── State ───────────────────────────────────────────────────────────────
  let phase = 'intro';
  let pulls = 0;
  let phaseFrac = 0;
  let grabEnd = 0;
  let strainEnd = 0;
  let pending = 0;
  let lastMash = -1e9;
  let skipRequested = false;
  let finishing = false;
  let current = null;

  const hurry = () => skipRequested || now() - lastMash < 700;
  // Skip pressed, or a visitor who was playing past the minimum has stopped.
  const exitNow = () => siteReady() && (skipRequested || (counting && !playing()));
  // Someone tapping is playing: let them keep pulling swords.
  const playing = () => now() - lastMash < PLAY_GRACE;
  // Done after MIN_PULLS swords (or one, once the intro has already run its
  // ~4.5s on a slow connection), unless the visitor is still tapping away.
  const timeUp = () => now() - tRun >= PLAY_LIMIT;
  const canFinish = () =>
    siteReady() &&
    (skipRequested || timeUp() || (!playing() && (pulls >= minPulls || (pulls >= 1 && now() - tRun > 4500))));

  function pickFirst() {
    const cx = (region.x0 + region.x1) / 2;
    const cy = region.y0 + (region.y1 - region.y0) * 0.45;
    return swords.reduce((a, b) => (dist(b, cx, cy) < dist(a, cx, cy) ? b : a));
  }

  // Field running dry (slow load, or someone mashing): new swords stab into
  // random empty spots, and the oldest holes fade away to keep it tidy.
  function summonSwords(from) {
    const count = Math.max(3, Math.round(fieldCount * 0.6));
    const spots = scatter(count, swords.map((sw) => ({ u: sw.u, v: sw.v })));
    spots.forEach((p, i) => {
      const sw = makeSword(p);
      swords.push(sw);
      dropSword(sw, i * 70);
    });
    let extra = swords.length - (fieldCount * 2 + 4);
    for (let i = 0; i < swords.length && extra > 0; i++) {
      const old = swords[i];
      if (old.state !== 'hole' || old === from) continue;
      swords.splice(i--, 1);
      extra--;
      old.el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 400, fill: 'forwards' })
        .finished.then(() => old.el.remove(), () => old.el.remove());
    }
  }

  function pickNext(from) {
    let open = swords.filter((sw) => sw.state === 'sword' && sw !== from);
    if (open.length <= 1) {
      summonSwords(from);
      open = swords.filter((sw) => sw.state === 'sword' && sw !== from);
    }
    open.sort((a, b) => dist(a, from.x, from.y) - dist(b, from.x, from.y));
    return open[Math.random() < 0.7 ? 0 : Math.min(1, open.length - 1)];
  }

  // ── The pull ────────────────────────────────────────────────────────────
  async function arrive(sw) {
    if (sw.landing) await sw.landing;
    phase = 'arrive';
    phaseFrac = 0.04;
    current = sw;
    sw.state = 'taken';
    resetCharAnims();
    placeChar(sw);
    setFrame(0);
    charEl.classList.add('is-on');
    if (reduced) {
      await flicker([{ opacity: 0 }, { opacity: 1 }], 180);
    } else {
      speedLines(sw);
      await flicker(FLICKER_IN, hurry() ? 70 : T.arrive);
    }
    sw.el.classList.add('is-taken');
  }

  async function grab() {
    phase = 'grab';
    phaseFrac = 0.12;
    if (!reduced) {
      hopEl.animate([
        { transform: 'scale(1, 1)' },
        { transform: 'scale(1.01, .985)' },
        { transform: 'scale(1, 1)' },
      ], { duration: 170, easing: 'ease-out' });
    }
    grabEnd = now() + (reduced ? 450 : hurry() ? 90 : T.grab);
    while (now() < grabEnd && !exitNow()) await wait(Math.min(40, grabEnd - now()));
  }

  async function strain() {
    phase = 'strain';
    setFrame(1);
    if (!reduced) charEl.classList.add('is-straining');
    puff(current, 2);
    const start = now();
    strainEnd = start + (reduced ? 650 : T.strain) - pending * T.mashCut;
    pending = 0;
    let lastPuff = start;
    while (now() < strainEnd && !exitNow()) {
      phaseFrac = 0.15 + 0.7 * clamp((now() - start) / Math.max(1, strainEnd - start), 0, 1);
      if (now() - lastPuff > 170) {
        puff(current, 1, 0.6);
        lastPuff = now();
      }
      await wait(Math.min(40, strainEnd - now()));
    }
    charEl.classList.remove('is-straining');
  }

  function yankFx() {
    setFrame(2);
    // The sword is out: the field shows the hole it left behind.
    current.state = 'hole';
    current.el.classList.remove('is-taken');
    current.el.classList.add('is-hole');
    if (reduced) return;
    hop();
    glint(current);
    dirtBurst(current);
  }

  async function yank() {
    phase = 'yank';
    phaseFrac = 0;
    yankFx();
    await wait(reduced ? 500 : hurry() ? 220 : T.yank);
  }

  async function vanish() {
    phase = 'vanish';
    if (reduced) {
      await flicker([{ opacity: 1 }, { opacity: 0 }], 180);
    } else {
      ghost();
      await flicker(FLICKER_OUT, hurry() ? 80 : T.vanish);
    }
    charEl.classList.remove('is-on');
    await wait(T.gap);
  }

  async function run() {
    if (doc.hidden) {
      // Opened in a background tab: save the show for when it's actually seen.
      await new Promise((resolve) => {
        const onVisible = () => {
          if (doc.hidden) return;
          doc.removeEventListener('visibilitychange', onVisible);
          resolve();
        };
        doc.addEventListener('visibilitychange', onVisible);
      });
    }

    const start = now();
    tRun = start;
    armFailSafe();
    const first = pickFirst();
    dropSword(first, 0);
    swords
      .filter((sw) => sw !== first)
      .sort(() => Math.random() - 0.5)
      .forEach((sw, i) => dropSword(sw, 60 + i * 26));
    setTimeout(() => hint.classList.add('is-on'), 900);

    // Wait for the character art, but never past the moment the site is ready.
    let spriteSettled = false;
    spriteLoaded.then(() => { spriteSettled = true; });
    while (!spriteSettled && !(siteReady() && now() - start > 1200)) await wait(60);
    if (!spriteOk()) {
      // No character art (offline, blocked): keep the field up until ready.
      while (!(siteReady() && (skipRequested || now() - start > 1200))) await wait(80);
      return finale(null);
    }

    await wait(T.firstArrive - (now() - start));
    let sw = first;
    for (;;) {
      if (exitNow()) return finale(sw);
      await arrive(sw);
      if (exitNow()) return finale(sw);
      await grab();
      if (exitNow()) return finale(sw);
      await strain();
      pulls += 1;
      sw.counted = true;
      phaseFrac = 0;
      if (canFinish()) return finale(sw);
      const yankedAt = now();
      await yank();
      // Playing: he only moves on to another sword if they're still tapping.
      while (counting && lastMash < yankedAt && !exitNow() && !timeUp()) await wait(30);
      if (exitNow() || (timeUp() && siteReady())) return finale(sw);
      const next = pickNext(sw);
      await vanish();
      sw = next;
    }
  }

  // ── Exit: the last yank cuts the screen in two ──────────────────────────
  async function finale(sw) {
    if (finishing) return;
    finishing = true;
    phase = 'finale';
    charEl.classList.remove('is-straining');
    ui.classList.add('is-out');

    // If he's still standing over a sword he just pulled, go straight to the
    // slash; otherwise yank the one he's on (or about to reach) as the finisher.
    if (sw && spriteOk() && sw.state !== 'hole') {
      if (!sw.counted) {
        sw.counted = true;
        pulls += 1;
      }
      current = sw;
      resetCharAnims();
      placeChar(sw);
      sw.state = 'taken';
      sw.el.classList.add('is-taken');
      charEl.classList.add('is-on');
      yankFx();
    }

    if (reduced) {
      await wait(500);
      reveal();
      root.style.pointerEvents = 'none';
      await root.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 320, fill: 'forwards' }).finished;
      return cleanup();
    }

    await wait(170);
    const G = sw && spriteOk() ? at(sw, ART.guard[0], ART.guard[1]) : { x: W / 2, y: H / 2 };
    const angle = ((sw && sw.facing < 0 ? 180 - ART.angle : ART.angle) * Math.PI) / 180;
    await slash(G, angle);
    await wait(90);
    await split(G, angle);
    cleanup();
  }

  function slash(G, angle) {
    const L = Math.hypot(W, H) * 2.2;
    const line = el('div', 'pl-slash', root);
    line.style.width = px(L);
    const base = `translate(${px(G.x - L / 2)}, ${px(G.y)}) rotate(${angle}rad)`;
    line.animate(
      [{ transform: `${base} scaleX(0)` }, { transform: `${base} scaleX(1)` }],
      { duration: 150, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' },
    );
    line.animate([{ opacity: 1 }, { opacity: 1, offset: 0.55 }, { opacity: 0 }], { duration: 900, fill: 'forwards' });
    const flash = el('div', 'pl-flash', root);
    flash.animate([{ opacity: 0 }, { opacity: 0.4, offset: 0.25 }, { opacity: 0 }], { duration: 320, easing: 'ease-out', fill: 'forwards' });
    return wait(150);
  }

  function split(G, angle) {
    reveal();
    root.style.pointerEvents = 'none';
    scene.querySelectorAll('.pl-fx').forEach((n) => n.remove());

    const d = { x: Math.cos(angle), y: Math.sin(angle) };
    let n = { x: d.y, y: -d.x };
    if (n.y > 0) n = { x: -n.x, y: -n.y }; // n points to the upper half
    const L = Math.hypot(W, H) * 2;
    const P = (a, b) => `${px(G.x + d.x * a + n.x * b)} ${px(G.y + d.y * a + n.y * b)}`;
    const travel = Math.hypot(W, H) * 1.05;
    const slip = 14 * fxScale(null);

    const anims = [1, -1].map((side) => {
      const half = el('div', 'pl-half');
      const clip = `polygon(${P(-L, 0)}, ${P(L, 0)}, ${P(L, L * side)}, ${P(-L, L * side)})`;
      half.style.clipPath = clip;
      half.style.webkitClipPath = clip;
      half.appendChild(scene.cloneNode(true));
      root.insertBefore(half, scene);
      // Slip along the cut first, then fly apart.
      const sx = -d.x * slip * side;
      const sy = -d.y * slip * side;
      return half.animate([
        { transform: 'translate(0, 0)', easing: 'cubic-bezier(.25,.8,.35,1)' },
        { transform: `translate(${sx}px, ${sy}px)`, offset: 0.24, easing: 'cubic-bezier(.55,0,.9,.4)' },
        { transform: `translate(${sx + n.x * travel * side}px, ${sy + n.y * travel * side}px) rotate(${-2.5 * side}deg)` },
      ], { duration: 760, fill: 'forwards' }).finished;
    });
    scene.remove();
    return Promise.all(anims);
  }

  function reveal() {
    if (S.revealed) return;
    S.revealed = true;
    html.classList.remove('pl-active');
    if (appRoot) appRoot.inert = false;
    dispatchEvent(new Event('sword-intro:reveal'));
  }

  function cleanup() {
    clearTimeout(failSafe);
    removeEventListener('keydown', onKey, true);
    removeEventListener('resize', onResize);
    removeEventListener('app:ready', onAppReady);
    root.remove();
    S.active = false;
  }

  // ── Input ───────────────────────────────────────────────────────────────
  let pressTimer = 0;
  function mash() {
    if (finishing) return;
    lastMash = now();
    pressEl.classList.add('is-down');
    clearTimeout(pressTimer);
    pressTimer = setTimeout(() => pressEl.classList.remove('is-down'), 90);
    if (phase === 'strain') {
      strainEnd = Math.max(now() + 30, strainEnd - T.mashCut);
      if (!reduced) {
        jolt();
        puff(current, 1, 0.8);
      }
    } else if (phase === 'grab') {
      grabEnd = now();
    } else {
      pending = Math.min(pending + 1, 2);
    }
  }

  function skip() {
    if (finishing || skipRequested) return;
    skipRequested = true;
    if (!siteReady()) skipBtn.firstChild.textContent = 'Almost there';
    interruptWaits();
  }

  const SCROLL_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End']);
  function onKey(e) {
    if (finishing) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      skip();
    } else if (e.key === ' ' || e.code === 'Space') {
      if (doc.activeElement === skipBtn) return; // let the button do its thing
      e.preventDefault();
      if (!e.repeat) mash();
    } else if (SCROLL_KEYS.has(e.key)) {
      e.preventDefault();
    }
  }

  let resizeTimer = 0;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (finishing) return;
      measure();
      swords.forEach(placeSword);
      if (current) placeChar(current);
      drawTufts();
    }, 120);
  }

  root.addEventListener('pointerdown', (e) => {
    if (e.button > 0 || e.target.closest('.pl-skip')) return;
    mash();
  });
  root.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });
  root.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
  skipBtn.addEventListener('click', skip);
  addEventListener('keydown', onKey, true);
  addEventListener('resize', onResize);

  // ── Progress readout ────────────────────────────────────────────────────
  let shown = 0;
  let lastPct = -1;
  let loadP = 0;
  let loadAt = t0;
  function loadProgress() {
    if (siteReady()) return 1;
    const p = 0.2 + (appReady ? 0.4 : 0) + (fontsDone() ? 0.1 : 0) + (winLoaded ? 0.2 : 0);
    if (p !== loadP) {
      loadP = p;
      loadAt = now();
    }
    return Math.min(0.97, p + (now() - loadAt) * 0.00002); // creep while waiting
  }
  // Past the minimum and still tapping: the readout becomes a sword counter.
  let counting = false;
  function startCounting() {
    counting = true;
    root.querySelector('.pl-label').lastChild.textContent = 'Swords pulled';
    root.querySelector('.pl-pct small').hidden = true;
    hint.lastElementChild.textContent = touch ? 'Keep tapping to keep pulling' : 'Keep mashing to keep pulling';
  }

  function tick() {
    if (!root.isConnected) return;
    if (!counting && !finishing && pulls >= minPulls && playing()) startCounting();
    if (counting) {
      if (lastPct !== pulls) {
        lastPct = pulls;
        pctEl.textContent = String(pulls);
      }
      requestAnimationFrame(tick);
      return;
    }
    const need = skipRequested ? 0 : minPulls;
    const pullP = need ? Math.min(1, (pulls + phaseFrac) / need) : 1;
    const target = finishing ? 1 : Math.min(pullP, loadProgress(), 0.99);
    shown += (target - shown) * (finishing ? 0.3 : 0.12);
    const pct = Math.floor(shown * 100 + (finishing ? 0.5 : 0));
    if (pct !== lastPct) {
      lastPct = pct;
      pctEl.textContent = String(pct);
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // ── Go ──────────────────────────────────────────────────────────────────
  let failSafe = 0; // armed in run(), once the tab is visible
  function armFailSafe() {
    clearTimeout(failSafe);
    failSafe = setTimeout(() => (playing() ? armFailSafe() : bail()), MAX_WAIT + 8000);
  }
  function bail(err) {
    if (err) console.error('[sword-intro]', err);
    reveal();
    cleanup();
  }
  run().catch(bail);
})();
