/* OpenRoadSync szimulátor – a motor menürendszere (az app BikeUi osztályának mása)
   és a telefonos app beállításai, böngészőben. Külső függőség nincs. */
'use strict';

const $ = (s) => document.querySelector(s);

// ---------------------------------------------------------------- ikonok (SVG path, 24×24)
// A motor nagy, fehér csempe-ikonjai a videó alapján újrarajzolva.
const P = {
  nav: 'M12 1.5 21 22l-9-4.6L3 22z',
  music: 'M8.5 4.5v10.9a3.6 3.6 0 1 0 2 3.2V9.6l8.5-2v5.8a3.6 3.6 0 1 0 2 3.2V2z',
  msg: 'M3.5 3h17A1.5 1.5 0 0 1 22 4.5v11a1.5 1.5 0 0 1-1.5 1.5H9.5L5 21v-4H3.5A1.5 1.5 0 0 1 2 15.5v-11A1.5 1.5 0 0 1 3.5 3zM6 7.2v2h12v-2zm0 4v2h9v-2z',
  phone: 'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.35.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z',
  fav: 'M9.5 5A7 7 0 0 0 2.5 12c0 5.2 7 11 7 11s7-5.8 7-11a7 7 0 0 0-7-7zm0 4.4a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2zM21.6 2.3c-.9-1-2.5-.8-3.1.5-.6-1.3-2.2-1.5-3.1-.5-.8.9-.6 2.2.4 3.1l2.7 2.4 2.7-2.4c1-.9 1.2-2.2.4-3.1z',
  history: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2.2a7.8 7.8 0 1 1 0 15.6 7.8 7.8 0 0 1 0-15.6zM11 7v6.2l5 3 1-1.7-3.9-2.3V7z',
  nearby: 'M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22zm0 2.3a8.7 8.7 0 1 1 0 17.4 8.7 8.7 0 0 1 0-17.4zM12 6a4.6 4.6 0 0 0-4.6 4.6C7.4 14.2 12 18.5 12 18.5s4.6-4.3 4.6-7.9A4.6 4.6 0 0 0 12 6zm0 2.9a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4z',
  fuel: 'M4 3.5A1.5 1.5 0 0 1 5.5 2h8A1.5 1.5 0 0 1 15 3.5V12h1a2 2 0 0 1 2 2v4a1 1 0 0 0 2 0V9.4l-2.6-2.6 1.4-1.4 3.2 3.2V18a3 3 0 0 1-6 0v-4h-1v8H4zM6.5 4.5v5h6v-5z',
  parking: 'M5 2h14a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3zm4 4v12h2.7v-4H14a4 4 0 0 0 0-8zm2.7 2.4H14a1.6 1.6 0 0 1 0 3.2h-2.3z',
  store: 'M7 8V7a5 5 0 0 1 10 0v1h3.5L19 22H5L3.5 8zm2.2 0h5.6V7a2.8 2.8 0 0 0-5.6 0z',
  atm: 'M2 5h20v12H2zm2.2 2.2v7.6h15.6V7.2zM12 7.8a3.2 3.2 0 1 1 0 6.4 3.2 3.2 0 0 1 0-6.4zM4 19h16v2H4z',
  repair: 'M12 2 1.5 8.2V22h3V10h15v12h3V8.2zM6.5 15.5l1.6-3.5h7.8l1.6 3.5V21h-2.2v-1.4H8.7V21H6.5zm2 1v1.6h1.6v-1.6zm5.4 0v1.6h1.6v-1.6z',
  finish: 'M5 2h2v20H5zm3 1h13v11H8zm2 1.8v2.4h2.4V4.8zm4.8 0v2.4h2.4V4.8zm-2.4 2.4v2.4h2.4V7.2zm4.8 0v2.4H19V7.2zM10 9.6V12h2.4V9.6zm4.8 0V12h2.4V9.6z',
  bolt: 'M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13.01 3h1l-1 7h3.51c.4 0 .62.19.4.66C12.97 17.55 11 21 11 21z',
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
};
const svg = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" fill-rule="evenodd" d="${P[name] || P.phone}"/></svg>`;

// Manőver-nyilak az alsó sávhoz (a valódi appban az OsmAnd szövegéből ismeri fel, lásd Maneuver.java)
const MV = {
  STRAIGHT: 'M12 1 20.5 10.5H15v5.5H9v-5.5H3.5zM9 17.4h6v1.9H9zM9 20.4h6v1.9H9z',
  RIGHT: 'M4 22V12.5A3.5 3.5 0 0 1 7.5 9H14V3.5l8 8-8 8V14H9.5v8z',
  SLIGHT_RIGHT: 'M6.5 22v-8.3l7.3-7.3-3-3H21v10.2l-3-3-6 6V22z',
  SHARP_RIGHT: 'M5 22V8a5 5 0 0 1 9-3l3.2 4.2 2.6-2L21 18l-10-1.9 2.6-2L10.2 9.7A1 1 0 0 0 10.4 8V22z',
  KEEP_RIGHT: 'M15.5 1.5 22 9h-4v13h-5V9H9zM3 9h3v13H3z',
  UTURN: 'M5 22V9.5a6.5 6.5 0 0 1 13 0V14h3.5L15.5 21 9.5 14H13V9.5a1.5 1.5 0 0 0-3 0V22z',
  ROUNDABOUT: 'M12 4.5a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6zM10.5 16h3v6.5h-3zM15.4 1H22v6.6l-2.3-2.3-2.4 2.4-2-2 2.4-2.4z',
  ARRIVE: P.finish,
};
const MV_FLIP = { LEFT: 'RIGHT', SLIGHT_LEFT: 'SLIGHT_RIGHT', SHARP_LEFT: 'SHARP_RIGHT', KEEP_LEFT: 'KEEP_RIGHT' };
function maneuverSvg(kind) {
  const base = MV_FLIP[kind] || kind;
  const flip = MV_FLIP[kind] ? ' transform="matrix(-1 0 0 1 24 0)"' : '';
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd"${flip} d="${MV[base] || MV.STRAIGHT}"/></svg>`;
}
/** Ugyanaz a felismerés, mint az app Maneuver.classify-ja. */
function classify(text) {
  const t = String(text || '').toLowerCase();
  const has = (...w) => w.some((x) => t.includes(x));
  if (has('megérkez', 'célhoz', 'úticél', 'arriv', 'destination')) return 'ARRIVE';
  if (has('körforgalom', 'roundabout')) return 'ROUNDABOUT';
  if (has('fordulj vissza', 'forduljon vissza', 'forduljon meg', 'megfordul', 'u-turn')) return 'UTURN';
  const first = (...w) => w.map((x) => t.indexOf(x)).filter((i) => i >= 0).sort((a, b) => a - b)[0] ?? -1;
  const l = first('balra', 'bal ', 'left'), r = first('jobbra', 'jobb ', 'right');
  if (l < 0 && r < 0) return 'STRAIGHT';
  const left = r < 0 || (l >= 0 && l < r);
  const side = left ? 'LEFT' : 'RIGHT';
  if (has('tartson', 'tarts ', 'keep')) return 'KEEP_' + side;
  if (has('élesen', 'sharp')) return 'SHARP_' + side;
  if (has('enyhén', 'slight')) return 'SLIGHT_' + side;
  return side;
}

// ---------------------------------------------------------------- műszerek (fordulatszámmérők)
const NS = 'http://www.w3.org/2000/svg';
function el(parent, tag, attrs, text) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (text != null) e.textContent = text;
  parent.appendChild(e);
  return e;
}
const pt = (cx, cy, r, deg) => [cx + r * Math.cos(deg * Math.PI / 180), cy + r * Math.sin(deg * Math.PI / 180)];
function arc(cx, cy, r, a0, a1) {
  const [x0, y0] = pt(cx, cy, r, a0), [x1, y1] = pt(cx, cy, r, a1);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
}
/**
 * o: cx, cy, r (sáv közepe), w (sáv), a0 (0-s fok), deg (fok / 1000 1/min), max, red (piros zóna kezdete),
 * lr (számok sugara), ls (számok mérete), inner (a piros csík a sáv belső felén)
 */
function gauge(g, o) {
  const A = (k) => o.a0 + k * o.deg;
  el(g, 'path', { d: arc(o.cx, o.cy, o.r, A(0), A(o.max)), stroke: 'url(#band)', 'stroke-width': o.w, fill: 'none' });
  const rr = o.inner ? o.r - o.w / 2 + 8 : o.r;
  el(g, 'path', { d: arc(o.cx, o.cy, rr, A(o.red), A(o.max)), stroke: o.inner ? '#f0894c' : '#e2402b', 'stroke-width': o.inner ? 15 : o.w, fill: 'none' });
  const ri = o.r - o.w / 2;
  for (let k = 0; k <= o.max * 2; k++) {
    const major = k % 2 === 0;
    const [x0, y0] = pt(o.cx, o.cy, ri + 1, A(k / 2));
    const [x1, y1] = pt(o.cx, o.cy, ri + (major ? 15 : 9), A(k / 2));
    el(g, 'line', { x1: x0, y1: y0, x2: x1, y2: y1, stroke: '#fff', 'stroke-width': major ? 3.4 : 2.4 });
  }
  for (let k = 0; k <= 10; k += 2) {
    const [x, y] = pt(o.cx, o.cy, o.lr, A(k) + (o.lo || 0));
    el(g, 'text', { x, y: y + o.ls * 0.36, 'text-anchor': 'middle', 'font-size': o.ls, 'font-weight': 600, fill: '#fff' }, k);
  }
  // mutató 0-n (álló motor)
  const [nx0, ny0] = pt(o.cx, o.cy, o.r - o.w / 2, A(0)), [nx1, ny1] = pt(o.cx, o.cy, o.r + o.w / 2, A(0));
  el(g, 'line', { x1: nx0, y1: ny0, x2: nx1, y2: ny1, stroke: '#e8432c', 'stroke-width': 6 });
}
function buildCluster() {
  const app = $('#g-app');
  gauge(app, { cx: 290, cy: 238, r: 147, w: 45, a0: 90, deg: 21, max: 11, red: 8.4, lr: 150, ls: 25, inner: true, lo: 6 });
  el(app, 'text', { x: 287, y: 150, 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600, fill: '#fff' }, 'x1000 r/min');
  el(app, 'text', { x: 470, y: 296, 'text-anchor': 'middle', 'font-size': 165, 'font-weight': 500, fill: '#fff' }, '0');
  el(app, 'text', { x: 470, y: 327, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 600, fill: '#fff' }, 'km/h');

  const nat = $('#g-native');
  gauge(nat, { cx: 395, cy: 405, r: 285, w: 34, a0: 195, deg: 14.5, max: 11, red: 9.2, lr: 248, ls: 24 });
  el(nat, 'text', { x: 395, y: 196, 'text-anchor': 'middle', 'font-size': 17, 'font-weight': 600, fill: '#fff' }, 'x1000 r/min');
  el(nat, 'text', { x: 480, y: 318, 'text-anchor': 'middle', 'font-size': 165, 'font-weight': 500, fill: '#fff' }, '0');
  el(nat, 'text', { x: 480, y: 352, 'text-anchor': 'middle', 'font-size': 24, 'font-weight': 600, fill: '#fff' }, 'km/h');

  // a motor saját gyorsmenüje a jobb szélen + az app csempéjének keskeny csíkja
  const q = $('#quick');
  const icons = [
    'M6 9l6-5 6 5M12 13l1.6 3.3 3.6.5-2.6 2.5.6 3.6-3.2-1.7-3.2 1.7.6-3.6-2.6-2.5 3.6-.5z',
    'M9 7l-5 5 5 5M15 7l5 5-5 5',
    'M3 6h7v12H3zM13 7h8M13 12h8M13 17h8',
    'M4 9h4l5-4v14l-5-4H4zM16 9l5 6M21 9l-5 6',
  ];
  icons.forEach((d, i) => {
    const y = 120 + i * 54;
    el(q, 'rect', { x: 708, y, width: 50, height: 48, rx: 5, fill: '#2b4766', class: 'qm', 'data-i': i });
    el(q, 'path', { d, transform: `translate(721 ${y + 12})`, fill: 'none', stroke: '#fff', 'stroke-width': 2.2, 'stroke-linejoin': 'round' });
  });
  el(q, 'rect', { x: 768, y: 120, width: 9, height: 210, rx: 2, fill: '#1dc6a3' });
}

/** A motor betűkészlete: nincs ő/ű (helyette ö/ü), emoji és nem latin betű kimarad. */
function tft(s) {
  return String(s ?? '')
    .replace(/ő/g, 'ö').replace(/Ő/g, 'Ö').replace(/ű/g, 'ü').replace(/Ű/g, 'Ü')
    .replace(/[–—•]/g, '-').replace(/…/g, '...').replace(/[^\x20-\x7e -ÿ]/g, '');
}
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ---------------------------------------------------------------- állapot
const KEYMAP_DEFAULTS = {
  music: { up: 'vol_up', down: 'vol_down', left: 'play_pause', right: 'next', back: 'exit' },
  phone: { up: 'prev', down: 'next', left: 'back', right: 'click', back: 'menu' },
};
const MUSIC_ACTIONS = { play_pause: 'Lejátszás / szünet', next: 'Következő szám', prev: 'Előző szám', vol_up: 'Hangerő fel', vol_down: 'Hangerő le', exit: 'Vissza a főmenübe', none: 'Semmi' };
const PHONE_ACTIONS = { prev: 'Előző elem', next: 'Következő elem', click: 'Kattintás', long: 'Hosszú nyomás', back: 'Vissza', menu: 'Rendszermenü (motoron)', home: 'Kezdőképernyő', recents: 'Legutóbbi appok', notifications: 'Értesítések', page_left: 'Lapozás balra', page_right: 'Lapozás jobbra', scroll_down: 'Görgetés le', scroll_up: 'Görgetés fel', none: 'Semmi' };
const KEY_NAMES = { up: '▴ Fel', down: '▾ Le', left: '◂ Balra', right: '▸ Jobbra / OK', back: 'Vissza (08)' };

const FAKE_APPS = {
  Spotify: { c: '#1db954', items: [['Kedvenc dalok', '312 dal'], ['Motoros mix', 'Lejátszási lista'], ['Rock klasszikusok', 'Lejátszási lista'], ['Podcastok', '4 új epizód']] },
  Gmail: { c: '#d93025', items: [['Szerviz időpont', 'Kedden 10:00 megfelel?'], ['Biztosítás', 'Az éves díj esedékes'], ['Motoros klub', 'Hétvégi túra részletei'], ['Hírlevél', 'Új kiegészítők']] },
  Térkép: { c: '#1a73e8', items: [['Otthon', 'Mentett hely'], ['Munkahely', 'Mentett hely'], ['Benzinkutak a közelben', 'Keresés'], ['Legutóbbi: Dobogókő', 'Tegnap']] },
  Üzenetek: { c: '#0b57d0', items: [['Anna', 'Hol vagy? Már a benzinkútnál várunk.'], ['Peti', 'Holnap mehetünk?'], ['Szerviz', 'Kész a motor'], ['Anya', 'Vigyázz magadra!']] },
  Kamera: { c: '#444', items: [['Fotó', 'Exponálás'], ['Videó', 'Felvétel'], ['Galéria', 'Utolsó kép']] },
  Fotók: { c: '#fbbc04', items: [['Ma', '12 kép'], ['Balaton túra', 'Album'], ['Kedvencek', '48 kép']] },
  Naptár: { c: '#1967d2', items: [['Szerviz', 'Kedd 10:00'], ['Motoros találkozó', 'Szombat 9:00'], ['Műszaki vizsga', 'Jövő hónap']] },
  Időjárás: { c: '#f29900', items: [['Most: 18°, napos', 'Budapest'], ['Délután: zápor', '60%'], ['Holnap: 22°', 'Napos']] },
  YouTube: { c: '#ff0000', items: [['Motoros vlog', 'Új videó'], ['Láncápolás lépésről lépésre', '12 perc'], ['Alpesi túra', '24 perc']] },
  Chrome: { c: '#188038', items: [['Keresés', ''], ['Időjárás előrejelzés', 'Könyvjelző'], ['Motoros fórum', 'Könyvjelző']] },
  Beállítások: { c: '#5f6368', items: [['Wi-Fi', 'Otthon'], ['Bluetooth', 'HONDA BTU 85D4'], ['Akkumulátor', '87%'], ['Kijelző', '']] },
  'Home Assistant': { c: '#18bcf2', items: [['Garázskapu', 'Zárva'], ['Nappali lámpa', 'Ki'], ['Riasztó', 'Élesítve']] },
  Automate: { c: '#673ab7', items: [['Garázs flow', 'Fut'], ['Hazaérkezés', 'Leállítva']] },
  Óra: { c: '#3c4043', items: [['Ébresztő 6:30', 'Be'], ['Stopper', ''], ['Időzítő', '']] },
  Telefon: { c: '#0b8043', items: [['Anna', 'Mobil'], ['Peti', 'Mobil'], ['Szerviz', 'Munkahelyi']] },
  Névjegyek: { c: '#1a73e8', items: [['Anna', ''], ['Peti', ''], ['Szerviz', '']] },
  Deezer: { c: '#a238ff', items: [['Flow', 'Neked szóló mix'], ['Kedvencek', '120 dal'], ['Albumok', '']] },
};
const LAUNCHER = [
  ['Spotify', 'Gmail', 'Térkép', 'Üzenetek', 'Kamera', 'Fotók', 'Naptár', 'Időjárás'],
  ['YouTube', 'Chrome', 'Beállítások', 'Home Assistant', 'Automate', 'Óra', 'Deezer', 'Névjegyek'],
];
const DOCK = ['Telefon', 'Üzenetek', 'Chrome', 'Kamera'];

const HA_ENTITIES = [
  { id: 'cover.garazs', name: 'Garázskapu', services: [['toggle', 'Nyitás/zárás váltás'], ['open_cover', 'Nyitás'], ['close_cover', 'Zárás']] },
  { id: 'light.nappali', name: 'Nappali lámpa', services: [['toggle', 'Kapcsolás'], ['turn_on', 'Bekapcsolás'], ['turn_off', 'Kikapcsolás']] },
  { id: 'script.hazaerkezes', name: 'Hazaérkezés', services: [['turn_on', 'Futtatás']] },
  { id: 'alarm.riaszto', name: 'Riasztó', services: [['disarm', 'Kikapcsolás']] },
];
const ACTIONS = { home: 'Kezdőképernyő', recents: 'Legutóbbi appok', notifications: 'Értesítések', play_pause: 'Zene: lejátszás/szünet', next_track: 'Zene: következő', vol_up: 'Hangerő fel', vol_down: 'Hangerő le', nav_home: 'Navigáció: Haza', nav_work: 'Navigáció: Munkahely', nav_stop: 'Navigáció leállítása' };

const SAMPLE_NOTIFS = [
  { app: 'Messenger', title: 'Anna', text: 'Hol vagy? Már a benzinkútnál várunk.' },
  { app: 'WhatsApp', title: 'Motoros csapat', text: 'Szombaton 9-kor indulunk Dobogókőre' },
  { app: 'Gmail', title: 'Szerviz időpont', text: 'Kedden 10:00 megfelelő lenne?' },
  { app: 'Időjárás', title: 'Esőriasztás', text: 'Fél óra múlva eső várható' },
  { app: 'Üzenetek', title: 'Peti', text: 'Hozz egy pót esőruhát, ha van' },
];
const TRACKS = [
  { t: 'Meztelen', a: 'Majka' }, { t: 'Bohemian Rhapsody', a: 'Queen' }, { t: 'Ezt nem gondoltam volna', a: 'Halott Pénz' },
  { t: 'Highway to Hell', a: 'AC/DC' }, { t: 'Gyöngyhajú lány', a: 'Omega' },
];
const CONTACTS = [
  { name: 'Anna', number: '+36 30 123 4567', label: 'Mobil', star: true },
  { name: 'Apa', number: '+36 20 765 4321', label: 'Mobil', star: true },
  { name: 'Bence', number: '+36 70 222 3344', label: 'Mobil' },
  { name: 'Csaba – szerviz', number: '+36 1 234 5678', label: 'Munkahelyi' },
  { name: 'Dóri', number: '+36 30 987 6543', label: 'Mobil', star: true },
  { name: 'Gábor', number: '+36 20 111 2233', label: 'Mobil' },
  { name: 'Kati', number: '+36 70 555 6677', label: 'Otthoni' },
  { name: 'Peti', number: '+36 30 444 8899', label: 'Mobil' },
];
const RECENT_CALLS = [
  { name: 'Anna', number: '+36 30 123 4567', label: 'Bejövő 11.26. 14:02' },
  { name: '+36 1 555 0101', number: '+36 1 555 0101', label: 'Nem fogadott 11.26. 12:40' },
  { name: 'Csaba – szerviz', number: '+36 1 234 5678', label: 'Kimenő 11.25. 09:15' },
];
const POI = {
  fuel: { label: 'Benzinkút', icon: 'fuel', res: [['MOL', '650 m'], ['Shell', '1,2 km'], ['OMV', '2,4 km'], ['MOL', '3,1 km']] },
  parking: { label: 'Parkoló', icon: 'parking', res: [['Motorparkoló', '120 m'], ['Széll Kapu', '480 m'], ['Parkoló', '700 m']] },
  store: { label: 'Bolt', icon: 'store', res: [['Príma', '210 m'], ['Spar', '450 m'], ['Lidl', '1,3 km']] },
  atm: { label: 'ATM', icon: 'atm', res: [['OTP ATM', '90 m'], ['Euronet', '300 m'], ['K&H ATM', '520 m']] },
  repair: { label: 'Szerviz', icon: 'repair', res: [['Honda Dream', '630 m'], ['Moto.hu', '1,0 km'], ['Powerbike Motorosbolt', '1,8 km']] },
};

function freshState() {
  return {
    prefs: {
      musicInfo: true, notifPopup: true, notifContent: true, notifFocus: false, phoneControl: true, calls: true,
      keymap: JSON.parse(JSON.stringify(KEYMAP_DEFAULTS)),
    },
    destinations: ['Balaton, Tihany', 'Dobogókő', 'Auchan Gödöllő', 'Tata, Öreg-tó'],
    home: 'Balaton, Tihany', work: null,
    shortcuts: [
      { type: 'app', label: 'Spotify', data: 'Spotify' },
      { type: 'ha', label: 'Garázskapu', data: 'cover.garazs|open_cover', desc: 'Garázskapu → Nyitás' },
      { type: 'command', label: 'Garázs', data: 'garazs' },
      { type: 'action', label: 'Haza', data: 'nav_home' },
    ],
    notifs: [],
    media: { app: 'Deezer', playing: true, track: 0, volume: 60 },
    nav: { active: false, pending: false, dest: '', steps: [], step: 0 },
    call: { state: 'idle', name: '', number: '', since: 0, volume: 70 },
    phone: { view: 'app', tab: 'home', page: 0, app: null, sel: 0, control: false, opened: [] },
  };
}
let S = freshState();

// ---------------------------------------------------------------- motor UI
const ui = {
  mode: 'LIST', current: null, overlay: false, loadingTitle: 'Betöltés…', banner: null, bannerTimer: 0,
  volumeUntil: 0, feedback: {}, phoneLabel: '', phonePos: 0, phoneTotal: 0, poiCat: null,
  native: false, dirty: false, callVolUntil: 0, contacts: [], contactParent: 'callMenu', letter: '', dialTarget: null,
};
const screens = {};
const scr = (id, def) => { screens[id] = { id, index: 0, wrap: false, parent: null, ...def }; return screens[id]; };

scr('main', {
  wrap: true, app: 'nav',
  items: () => {
    const l = [
      { title: 'Navigáció', icon: 'nav', app: 'nav', act: () => openList('nav') },
      { title: 'Zene', icon: 'music', app: 'music', act: openMusic },
      { title: 'Értesítések', icon: 'msg', app: 'msg', act: () => { openList('notif'); } },
    ];
    if (S.prefs.phoneControl || S.prefs.calls || S.shortcuts.length) l.push({ title: 'Telefon', icon: 'phone', app: 'phone', act: () => openList('phoneRoot') });
    return l;
  },
});
scr('nav', {
  parent: 'main', app: 'nav',
  items: () => {
    const l = [];
    if (S.nav.active || S.nav.pending) {
      l.push({ title: 'Navigálás', icon: 'nav', act: () => { ui.mode = 'NAV_ACTIVE'; render(); } });
      l.push({ title: 'Navigáció leállítása', icon: 'finish', act: stopNav });
    }
    if (S.home) l.push({ title: 'Haza', icon: 'fav', act: () => startNav(S.home) });
    if (S.work) l.push({ title: 'Munkahely', icon: 'fav', act: () => startNav(S.work) });
    l.push({ title: 'Mentett célok', icon: 'fav', act: () => openList('dest') });
    l.push({ title: 'Közeli helyek', icon: 'nearby', act: () => openList('poi') });
    return l;
  },
});
scr('dest', {
  parent: 'nav', app: 'nav',
  items: () => S.destinations.length
    ? S.destinations.map((d) => ({ title: d, icon: 'history', act: () => startNav(d) }))
    : [{ title: 'Nincs mentett cél', icon: 'fav' }],
});
scr('poi', {
  parent: 'nav', app: 'nav',
  items: () => Object.entries(POI).map(([k, p]) => ({ title: p.label, icon: p.icon, act: () => searchPoi(k) })),
});
scr('poiResults', {
  parent: 'poi', app: 'nav',
  items: () => {
    const p = POI[ui.poiCat];
    return p.res.map(([n, d]) => ({ title: n, icon: p.icon, sub: d, act: () => startNav(n) }));
  },
});
scr('notif', {
  parent: 'main', app: 'msg',
  items: () => {
    const n = S.notifs.length;
    if (!n) return [{ title: 'Nincs értesítés', icon: 'msg' }];
    const l = S.notifs.map((e, i) => S.prefs.notifFocus
      ? { title: `${i + 1}/${n} ${e.app}`, content: notifLines(e), act: () => showNotif(e, true) }
      : { title: `${i + 1}/${n} ${S.prefs.notifContent ? e.title : e.app}`, icon: 'msg', sub: S.prefs.notifContent ? e.text : e.app, act: () => showNotif(e, true) });
    l.push({ title: 'Összes törlése', icon: 'msg', act: () => { S.notifs = []; screens.notif.index = 0; hideBanner(); renderAll(); } });
    return l;
  },
});
scr('phoneRoot', {
  parent: 'main', app: 'phone',
  items: () => {
    const l = [];
    if (S.prefs.calls) {
      if (S.call.state !== 'idle') l.push({ title: 'Folyamatban', icon: 'phone', sub: S.call.name, act: showCallScreen });
      l.push({ title: 'Hívás', icon: 'phone', act: () => openList('callMenu') });
    }
    if (S.prefs.phoneControl) l.push({ title: 'Teljes vezérlés', icon: 'phone', act: enterPhoneControl });
    l.push({ title: 'Gyorsgombok', icon: 'fav', sub: `${S.shortcuts.length} db`, act: () => { ui.feedback = {}; openList('shortcuts'); } });
    return l;
  },
});
scr('callMenu', {
  parent: 'phoneRoot', app: 'phone',
  items: () => [
    { title: 'Kedvencek', icon: 'fav', act: () => openContacts(CONTACTS.filter((c) => c.star), 'callMenu') },
    { title: 'Legutóbbi hívások', icon: 'history', act: () => openContacts(RECENT_CALLS, 'callMenu') },
    { title: 'Névjegyek', icon: 'phone', act: () => openList('letterMenu') },
  ],
});
// Névjegyek: előbb a kezdőbetű, hogy ne kelljen az összes nevet végiglapozni
scr('letterMenu', {
  parent: 'callMenu', app: 'phone',
  items: () => {
    const m = {};
    CONTACTS.forEach((c) => { (m[c.name[0].toUpperCase()] ||= []).push(c); });
    return Object.keys(m).sort((a, b) => a.localeCompare(b, 'hu')).map((k) => ({ title: k, icon: 'phone', sub: `${m[k].length} névjegy`, act: () => openContacts(m[k], 'letterMenu') }));
  },
});
scr('contactMenu', {
  parent: 'callMenu', app: 'phone',
  items: () => ui.contacts.map((c) => ({ title: c.name, icon: 'phone', sub: c.label, act: () => { ui.dialTarget = c; openList('dialMenu'); } })),
});
// megerősítés: ▸ = hívás, ◂/08 = mégse
scr('dialMenu', {
  parent: 'contactMenu', app: 'phone',
  items: () => [{ title: `Hívás: ${ui.dialTarget.name}`, icon: 'phone', sub: ui.dialTarget.number, act: () => dial(ui.dialTarget) }],
});
scr('shortcuts', {
  parent: 'phoneRoot', app: 'phone',
  items: () => S.shortcuts.length
    ? S.shortcuts.map((s, i) => ({ title: s.label, icon: shortcutIcon(s), sub: ui.feedback[i] || '', act: () => runShortcut(s, i) }))
    : [{ title: 'Nincs gyorsgomb', icon: 'bolt', sub: 'Telefonon: Gyorsgombok' }],
});
scr('phoneMenu', {
  parent: null, app: 'phone',
  items: () => [
    ['Vissza a vezérléshez', () => enterPhoneControl(false)],
    ['Kezdőképernyő', () => phoneGlobal('home')],
    ['Legutóbbi appok', () => phoneGlobal('recents')],
    ['Értesítések', () => phoneGlobal('notifications')],
    ['Lapozás jobbra', () => phoneGlobal('page_right')],
    ['Lapozás balra', () => phoneGlobal('page_left')],
    ['Görgetés le', () => phoneGlobal('scroll_down')],
    ['Görgetés fel', () => phoneGlobal('scroll_up')],
    ['Kilépés', exitPhoneControl],
  ].map(([t, a]) => ({ title: t, icon: 'phone', act: a })),
});

function openList(id, index = 0) {
  ui.current = screens[id];
  ui.current.index = index;
  ui.mode = 'LIST';
  render();
}

// ---------------------------------------------------------------- gombok
function key(k) {
  flash(k);
  if (ui.native) { nativeKey(k); return; }
  if (ui.overlay) {           // a felugrott értesítés panelt bármely gomb bezárja
    ui.overlay = false;
    clearTimeout(ui.notifTimer);
    endNotif();
    return;
  }
  switch (ui.mode) {
    case 'LIST': listKey(k); break;
    case 'SEARCHING': if (k === 'left' || k === 'back') { ui.searchToken++; openList('poi', screens.poi.index); } break;
    case 'NAV_LOADING':
    case 'NAV_ACTIVE':
      if (k === 'left') { ui.mode = 'NAV_END'; render(); } else if (k === 'back') backToMain(0);
      break;
    case 'NAV_END':
      if (k === 'right') stopNav();
      else if (k === 'left' || k === 'back') { ui.mode = 'NAV_ACTIVE'; render(); }
      break;
    case 'MUSIC': musicKey(k); break;
    case 'PHONE': phoneKey(k); break;
    case 'CALL': callKey(k); break;
  }
}

// ---------------------------------------------------------------- kilépés a motor saját nézetébe
// A valódi motor ilyenkor „hello” jelet küld. Az app régebben erre visszarajzolt, és a motor
// azonnal visszaugrott az appra (a videón látszott). Most csendben marad, amíg vissza nem lépsz.
function exitToNative() {
  if (ui.native) return;
  ui.native = true;
  ui.quick = 0;
  $('#tft').classList.add('native');
  drawQuick();
  log('Kilépés a motor saját nézetébe – az app csendben marad, nem ugrik vissza. Vissza: ▸');
}
function nativeKey(k) {
  if (k === 'up' || k === 'down') { ui.quick = (ui.quick + (k === 'up' ? 3 : 1)) % 4; drawQuick(); return; }
  if (k === 'right') {
    ui.native = false;
    $('#tft').classList.remove('native');
    log('Vissza az app nézetébe – az app újrarajzolja az utolsó képernyőt.');
    ui.dirty = false;
    render();
    return;
  }
  log('A motor saját nézetében a gombok a motor menüjét kezelik. Vissza az apphoz: ▸');
}
function drawQuick() {
  document.querySelectorAll('#quick .qm').forEach((r) => r.setAttribute('fill', +r.dataset.i === ui.quick ? '#4f80b5' : '#2b4766'));
}

// ---------------------------------------------------------------- hívások
function openContacts(list, parent) {
  ui.contacts = list;
  screens.contactMenu.parent = parent;
  openList('contactMenu');
}
function dial(c) {
  S.call = { state: 'active', name: c.name, number: c.number, since: Date.now(), volume: S.call.volume, outgoing: true };
  log(`Tárcsázás: ${c.name} (${c.number})`);
  ui.current = screens.callMenu;
  screens.callMenu.index = 0;
  showCallScreen();
  S.phone.prevView = S.phone.view === 'call' ? S.phone.prevView : S.phone.view;
  S.phone.view = 'call';
  renderApp();
}
function incomingCall() {
  if (!S.prefs.calls) { log('A hívások a telefon Beállításaiban vannak kikapcsolva.'); return; }
  if (S.call.state !== 'idle') return;
  const c = CONTACTS[(ui.callIdx = ((ui.callIdx ?? -1) + 1) % CONTACTS.length)];
  S.call = { state: 'ringing', name: c.name, number: c.number, since: 0, volume: S.call.volume };
  log(`Bejövő hívás: ${c.name} – ▸ fogadás, ◂ elutasítás`);
  showBanner('call', ` Hívás: ${c.name}`);
  clearTimeout(ui.notifTimer);
  ui.notifTimer = setTimeout(endNotif, 10000);
  showCallScreen();
  S.phone.prevView = S.phone.view === 'call' ? S.phone.prevView : S.phone.view;
  S.phone.view = 'call';
  renderApp();
}
function showCallScreen() {
  if (ui.mode !== 'CALL') { ui.callReturn = { mode: ui.mode, current: ui.current }; }
  ui.overlay = false;
  ui.mode = 'CALL';
  render();
  clearInterval(ui.callTimer);
  ui.callTimer = setInterval(() => { if (ui.mode === 'CALL' && S.call.state === 'active') render(); if (S.phone.view === 'call') renderApp(); }, 1000);
}
function leaveCallScreen() {
  const r = ui.callReturn || { mode: 'LIST', current: screens.main };
  ui.mode = ['SEARCHING', 'NAV_LOADING', 'CALL'].includes(r.mode) ? 'LIST' : r.mode;
  ui.current = r.current || screens.main;
  render();
}
function acceptCall() {
  if (S.call.state !== 'ringing') return;
  S.call.state = 'active'; S.call.since = Date.now();
  log(`Hívás fogadva: ${S.call.name}`);
  endNotif();
  render(); renderApp();
}
function endCall() {
  if (S.call.state === 'idle') return;
  log(S.call.state === 'ringing' ? `Hívás elutasítva: ${S.call.name}` : `Hívás vége: ${S.call.name} (${callDuration()})`);
  S.call = { state: 'idle', name: '', number: '', since: 0, volume: S.call.volume };
  clearInterval(ui.callTimer);
  if (S.phone.view === 'call') S.phone.view = S.phone.prevView || 'app';
  if (ui.notifShowing) endNotif();
  if (ui.mode === 'CALL') leaveCallScreen(); else render();
  renderApp();
}
function callDuration() {
  const t = Math.floor((Date.now() - S.call.since) / 1000);
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
}
function callKey(k) {
  const st = S.call.state;
  if (st === 'idle' || k === 'back') { leaveCallScreen(); if (st !== 'idle') log('A hívás megy tovább – visszahozható: Telefon → Folyamatban'); return; }
  if (k === 'left') endCall();
  else if (k === 'right' && st === 'ringing') acceptCall();
  else if ((k === 'up' || k === 'down') && st === 'active') {
    S.call.volume = Math.max(0, Math.min(100, S.call.volume + (k === 'up' ? 15 : -15)));
    ui.callVolUntil = Date.now() + 2000; setTimeout(render, 2050);
    render();
  }
}

function listKey(k) {
  const s = ui.current;
  const items = s.items();
  const n = items.length;
  if (s.index >= n) s.index = n - 1;
  if (k === 'up') { if (s.index > 0) s.index--; else if (s.wrap) s.index = n - 1; render(); if (s.id === 'notif') previewNotif(); }
  else if (k === 'down') { if (s.index < n - 1) s.index++; else if (s.wrap) s.index = 0; render(); if (s.id === 'notif') previewNotif(); }
  else if (k === 'right') { const it = items[s.index]; if (it.act) it.act(); }
  else if (k === 'left' || k === 'back') {
    if (s.id === 'phoneMenu') enterPhoneControl(false);
    else if (s.parent) { ui.current = screens[s.parent]; render(); }
  }
}

function backToMain(index) {
  screens.main.index = index;
  ui.current = screens.main;
  ui.mode = 'LIST';
  render();
}

// ---------------------------------------------------------------- navigáció
const STREETS = ['Fő utca', 'Kossuth Lajos utca', 'Petőfi Sándor utca', 'Szabadság tér', 'Rákóczi út'];
function startNav(dest) {
  S.nav = { active: false, pending: true, dest, step: 0, steps: [] };
  ui.mode = 'NAV_LOADING';
  ui.loadingTitle = 'Betöltés…';
  render(); renderApp();
  log(`OsmAnd: útvonal ide: ${dest}`);
  clearTimeout(ui.navTimer);
  ui.navTimer = setTimeout(() => {
    const st = STREETS[Math.floor(Math.random() * STREETS.length)];
    S.nav.active = true; S.nav.pending = false;
    S.nav.steps = [`Haladjon a(z) ${st} irányába`, '300 m - Forduljon jobbra', '1,2 km - Körforgalom, 2. kijárat',
      '600 m - Forduljon enyhén balra', '900 m - Tartson jobbra', '400 m - Forduljon élesen balra',
      '500 m - Forduljon balra', `200 m - Megérkezik: ${dest}`, `Megérkezett: ${dest}`];
    // az eredeti sorrend: állapot -> sáv a cél nevével -> Navigálás képernyő
    showBanner('nav', ' ' + dest);
    setTimeout(() => navBanner(), 1600);
    if (ui.mode === 'NAV_LOADING') ui.mode = 'NAV_ACTIVE';
    render(); renderApp(); startNavAuto();
  }, 1400);
}
function navBanner() { if (S.nav.active && !ui.notifShowing) showBanner('nav', ' ' + S.nav.steps[S.nav.step]); }
function startNavAuto() { clearInterval(ui.navAuto); ui.navAuto = setInterval(() => nextNavStep(true), 9000); }
function nextNavStep(auto) {
  if (!S.nav.active) { if (!auto) log('Nincs aktív navigáció – indíts egyet a motor menüjéből.'); return; }
  if (S.nav.step < S.nav.steps.length - 1) { S.nav.step++; navBanner(); renderApp(); if (ui.mode === 'NAV_ACTIVE') render(); }
  else if (auto) { log('Megérkeztél – a navigáció véget ért.'); stopNav(); }
}
function stopNav() {
  clearTimeout(ui.navTimer); clearInterval(ui.navAuto);
  S.nav = { active: false, pending: false, dest: '', steps: [], step: 0 };
  hideBanner();
  screens.nav.index = 0;
  if (['NAV_ACTIVE', 'NAV_LOADING', 'NAV_END'].includes(ui.mode) || ui.current?.id === 'nav') { ui.current = screens.nav; ui.mode = 'LIST'; }
  render(); renderApp();
}
function searchPoi(cat) {
  ui.poiCat = cat;
  ui.mode = 'SEARCHING';
  const token = ++ui.searchToken;
  render();
  setTimeout(() => { if (token === ui.searchToken && ui.mode === 'SEARCHING') openList('poiResults'); }, 1100);
}
ui.searchToken = 0;

// ---------------------------------------------------------------- zene
function openMusic() { ui.mode = 'MUSIC'; render(); }
function musicKey(k) {
  const a = S.prefs.keymap.music[k];
  const m = S.media;
  if (a === 'vol_up' || a === 'vol_down') { m.volume = Math.max(0, Math.min(100, m.volume + (a === 'vol_up' ? 7 : -7))); ui.volumeUntil = Date.now() + 2000; setTimeout(render, 2050); }
  else if (a === 'play_pause') m.playing = !m.playing;
  else if (a === 'next') { m.track = (m.track + 1) % TRACKS.length; m.playing = true; }
  else if (a === 'prev') { m.track = (m.track + TRACKS.length - 1) % TRACKS.length; m.playing = true; }
  else if (a === 'exit') { backToMain(1); return; }
  render(); renderApp();
}

// ---------------------------------------------------------------- értesítések
function notifLines(e) {
  if (!S.prefs.notifContent) return ['Új értesítés', ''];
  const t = tft(e.text || e.title).trim();
  if (t.length <= 16) return [t, ''];
  let cut = t.lastIndexOf(' ', 16); if (cut <= 0) cut = 16;
  return [t.slice(0, cut).trim(), t.slice(cut).trim()];
}
function newNotif() {
  const base = SAMPLE_NOTIFS[(ui.sampleIdx = ((ui.sampleIdx ?? -1) + 1) % SAMPLE_NOTIFS.length)];
  const e = { ...base, time: Date.now() };
  S.notifs.unshift(e); S.notifs = S.notifs.slice(0, 20);
  log(`Értesítés: ${e.app} – ${e.title}`);
  if (ui.mode === 'LIST' && ui.current?.id === 'notif') render();
  if (S.prefs.notifPopup) showNotif(e, false);
  renderApp();
}
function showNotif(e, fromList) {
  if (ui.native) return;   // a motor saját nézetében az app semmit nem küld (a listában megmarad)
  const focus = S.prefs.notifFocus, content = S.prefs.notifContent;
  let t;
  if (focus) t = content && e.title ? `${e.app}: ${e.title}` : e.app;
  else if (!content) t = `${e.app}: új értesítés`;
  else t = `${e.app}: ${e.title} - ${e.text}`;
  ui.notifShowing = true;
  showBanner('msg', ' ' + t);
  if (focus && !fromList && !ui.native && ui.mode !== 'CALL') {
    ui.overlay = true;
    const [l1, l2] = notifLines(e);
    drawTile(contentTile('msg', e.app, l1, l2, {}));
  }
  clearTimeout(ui.notifTimer);
  ui.notifTimer = setTimeout(endNotif, 10000);
}
function previewNotif() {
  clearTimeout(ui.previewTimer);
  ui.previewTimer = setTimeout(() => {
    const i = screens.notif.index;
    if (ui.current?.id === 'notif' && i < S.notifs.length) showNotif(S.notifs[i], true);
  }, 350);
}
function endNotif() {
  ui.notifShowing = false;
  if (S.nav.active) navBanner(); else hideBanner();
  if (ui.overlay) ui.overlay = false;
  render();
}

// ---------------------------------------------------------------- telefon vezérlés
function enterPhoneControl(reset = true) {
  ui.mode = 'PHONE';
  if (!S.phone.control || reset) {
    S.phone.control = true;
    if (S.phone.view === 'app') { S.phone.view = 'launcher'; S.phone.page = 0; }
    S.phone.sel = 0;
  }
  renderApp(); render();
}
function exitPhoneControl() {
  S.phone.control = false;
  S.phone.view = 'app';
  renderApp();
  openList('phoneRoot', 0);
}
function phoneTargets() { return [...document.querySelectorAll('#ps-screen [data-target]')]; }
function phoneKey(k) {
  const a = S.prefs.keymap.phone[k];
  if (a === 'menu') { openList('phoneMenu', 0); return; }
  phoneDo(a);
}
function phoneDo(a) {
  const t = phoneTargets();
  const ph = S.phone;
  switch (a) {
    case 'next':
      if (ph.sel < t.length - 1) ph.sel++;
      else if (ph.view === 'launcher' && ph.page < LAUNCHER.length - 1) { ph.page++; ph.sel = 0; log('Telefon: lapozás jobbra (a kezdőképernyő végén)'); }
      else ph.sel = 0;
      break;
    case 'prev':
      if (ph.sel > 0) ph.sel--;
      else if (ph.view === 'launcher' && ph.page > 0) { ph.page--; renderApp(); ph.sel = phoneTargets().length - 1; log('Telefon: lapozás balra'); }
      else ph.sel = Math.max(0, t.length - 1);
      break;
    case 'click':
    case 'long': {
      const el = t[ph.sel];
      if (el) { el.click(); log(`Telefon: ${a === 'long' ? 'hosszú nyomás' : 'kattintás'} – ${el.dataset.label}`); }
      break;
    }
    default: phoneGlobal(a, true); return;
  }
  renderApp(); render();
}
function phoneGlobal(a, stay) {
  const ph = S.phone;
  if (a === 'home') { ph.view = 'launcher'; ph.page = 0; ph.sel = 0; }
  else if (a === 'back') { if (ph.view !== 'launcher') { ph.view = 'launcher'; ph.sel = 0; } }
  else if (a === 'recents') { ph.view = 'recents'; ph.sel = 0; }
  else if (a === 'notifications') { ph.view = 'shade'; ph.sel = 0; }
  else if (a === 'page_right') { if (ph.view === 'launcher') { ph.page = Math.min(LAUNCHER.length - 1, ph.page + 1); ph.sel = 0; } }
  else if (a === 'page_left') { if (ph.view === 'launcher') { ph.page = Math.max(0, ph.page - 1); ph.sel = 0; } }
  else if (a === 'scroll_down' || a === 'scroll_up') { $('#ps-screen').scrollBy({ top: a === 'scroll_down' ? 200 : -200, behavior: 'smooth' }); }
  if (a !== 'none') log(`Telefon: ${PHONE_ACTIONS[a] || a}`);
  if (!stay) ui.mode = 'PHONE';
  renderApp(); render();
}
function openFakeApp(name) {
  const ph = S.phone;
  ph.view = 'fakeapp'; ph.app = name; ph.sel = 0;
  ph.opened = [name, ...ph.opened.filter((x) => x !== name)].slice(0, 5);
  renderApp(); render();
}

// ---------------------------------------------------------------- gyorsgombok
function shortcutIcon(s) {
  if (s.type === 'action' && s.data.startsWith('nav_')) return 'nav';
  if (s.type === 'action' && /vol|track|play/.test(s.data)) return 'music';
  if (s.type === 'ha' || s.type === 'command') return 'fav';
  return 'phone';
}
function runShortcut(s, i) {
  const fb = (m) => { ui.feedback = { [i]: m }; if (ui.mode === 'LIST' && ui.current?.id === 'shortcuts') render(); };
  if (s.type === 'app') {
    S.phone.view = 'fakeapp'; S.phone.app = s.data; S.phone.fromShortcut = true;
    renderApp(); fb('Elindítva'); log(`Telefon: ${s.data} megnyitva`);
  } else if (s.type === 'ha') {
    fb('Küldés…'); setTimeout(() => { fb('Kész'); log(`Home Assistant: ${s.desc || s.data}`); }, 700);
  } else if (s.type === 'command') {
    fb('Elküldve'); log(`Automate/Tasker: hu.openroadsync.COMMAND, command=${s.data}`);
  } else if (s.type === 'action') {
    const d = s.data;
    if (d === 'nav_home') { if (S.home) startNav(S.home); else fb('Nincs Haza'); return; }
    if (d === 'nav_work') { if (S.work) startNav(S.work); else fb('Nincs Munkahely'); return; }
    if (d === 'nav_stop') { stopNav(); return; }
    if (d === 'play_pause') { S.media.playing = !S.media.playing; fb('Lejátszás/szünet'); }
    else if (d === 'next_track') { S.media.track = (S.media.track + 1) % TRACKS.length; fb('Következő szám'); }
    else if (d === 'vol_up' || d === 'vol_down') { S.media.volume = Math.max(0, Math.min(100, S.media.volume + (d === 'vol_up' ? 7 : -7))); fb(`Hangerő ${S.media.volume}%`); }
    else { S.phone.view = d === 'home' ? 'launcher' : d === 'recents' ? 'recents' : 'shade'; S.phone.page = 0; renderApp(); fb(ACTIONS[d]); }
    renderApp();
  }
}

// ---------------------------------------------------------------- kirajzolás: motor
const arrows = (o) => `${o.up ? '<i class="ar ar-up"></i>' : ''}${o.down ? '<i class="ar ar-down"></i>' : ''}${o.back ? '<i class="ar ar-left"></i>' : ''}${o.fwd === false ? '' : '<i class="ar ar-right"></i>'}`;
function listTile(app, title, icon, o) {
  return `<div class="tile t-${app}">
    <div class="tile-head"><span>${esc(tft(title))}</span></div>
    <div class="tile-body">
      ${o.sub ? `<span class="tile-sub">${esc(tft(o.sub))}</span>` : ''}
      <span class="tile-icon">${svg(icon)}</span>
      ${arrows(o)}
    </div>
  </div>`;
}
function contentTile(app, title, l1, l2, o) {
  return `<div class="tile t-${app}">
    <div class="tile-head"><span>${esc(tft(title))}</span></div>
    <div class="tile-body"><div class="tile-text"><b>${esc(tft(l1))}</b>${l2 ? `<span>${esc(tft(l2))}</span>` : ''}</div>
      ${arrows({ ...o, fwd: false })}</div>
  </div>`;
}
function screenTile(app, title, body, soft) {
  return `<div class="tile t-${app} screen">
    <div class="tile-head"><span>${esc(tft(title))}</span></div>
    <div class="tile-body">${body}</div>
    ${soft ? `<div class="softkeys"><span><i>◀</i>${soft[0]}</span><span>${soft[1]}<i>▶</i></span></div>` : '<div style="height:.75cqw"></div>'}
  </div>`;
}
function splashTile() {
  return `<div class="tile t-sys"><div class="tile-body"><div class="tile-text big"><b>Honda</b><span>RoadSync</span></div></div></div>`;
}
function drawTile(html) {
  const t = $('#tile');
  t.outerHTML = html.replace('class="tile', 'id="tile" class="tile');
}
const SOFT = { play_pause: () => (S.media.playing ? '❚❚' : '▶'), next: () => '▶▶|', prev: () => '|◀◀', vol_up: () => '+', vol_down: () => '−', exit: () => '⌂', none: () => '' };

function render() {
  if (ui.overlay) return;
  $('#ic-nav').style.display = S.nav.active || S.nav.pending ? '' : 'none';
  $('#ic-music').style.display = S.media.playing ? '' : 'none';
  if (ui.native) { ui.dirty = true; return; }   // a motor saját nézete: az app nem küld képernyőt
  const m = ui.mode;
  if (m === 'LIST') {
    const s = ui.current;
    const items = s.items();
    if (s.index >= items.length) s.index = Math.max(0, items.length - 1);
    const it = items[s.index];
    const n = items.length;
    const o = { up: s.wrap ? n > 1 : s.index > 0, down: s.wrap ? n > 1 : s.index < n - 1, back: !!s.parent || s.id === 'phoneMenu', sub: it.sub };
    const app = it.app || s.app;
    drawTile(it.content ? contentTile(app, it.title, it.content[0], it.content[1], o) : listTile(app, it.title, it.icon, o));
  } else if (m === 'SEARCHING' || m === 'NAV_LOADING') {
    drawTile(screenTile('nav', m === 'SEARCHING' ? 'Keresés…' : ui.loadingTitle, '<span class="dots"><i></i><i></i><i></i></span>', null));
  } else if (m === 'NAV_ACTIVE') {
    const step = S.nav.active ? S.nav.steps[S.nav.step] : '';
    drawTile(screenTile('nav', 'Navigálás', `<span class="tile-icon">${maneuverSvg(classify(step))}</span>`, ['✕', '↻']));
  } else if (m === 'NAV_END') {
    drawTile(screenTile('nav', 'Befejezés?', `<span class="tile-icon">${svg('finish')}</span>`, ['✕', '✓']));
  } else if (m === 'MUSIC') {
    const md = S.media, tr = TRACKS[md.track];
    let body;
    if (Date.now() < ui.volumeUntil) {
      const bars = Math.round(md.volume / 10);
      body = `<div class="tile-text"><b>Hang ${md.volume}%</b><span>${'='.repeat(bars)}${'-'.repeat(10 - bars)}</span></div>`;
    } else if (S.prefs.musicInfo) {
      body = `<div class="tile-text"><b>${esc(tft(tr.t))}</b><span>${esc(tft(tr.a))}</span></div>`;
    } else {
      body = `<span class="tile-icon">${svg('music')}</span>`;
    }
    const km = S.prefs.keymap.music;
    drawTile(screenTile('music', md.app, body, [SOFT[km.left](), SOFT[km.right]()]));
  } else if (m === 'PHONE') {
    const t = phoneTargets();
    const el = t[S.phone.sel];
    const label = el ? el.dataset.label : 'Nincs elem';
    const sub = t.length ? `${S.phone.sel + 1}/${t.length}` : '';
    drawTile(listTile('phone', label, 'phone', { up: true, down: true, back: true, sub }));
  } else if (m === 'CALL') {
    const c = S.call;
    const ringing = c.state === 'ringing';
    const sub = ringing ? '< Nem      Igen >' : Date.now() < ui.callVolUntil ? `Hang ${c.volume}%` : `< Bontás   ${callDuration()}`;
    drawTile(listTile('phone', c.name || 'Hívás', 'phone', { up: !ringing, down: !ringing, back: true, sub }));
  }
}

function showBanner(kind, text) {
  const b = $('#banner');
  const icon = kind === 'nav' ? maneuverSvg(classify(text)) : svg(kind === 'call' ? 'phone' : 'msg');
  const changed = b.hidden || b.dataset.kind !== kind;
  b.className = 'banner' + (changed ? ' pop' : '');
  b.dataset.kind = kind;
  b.innerHTML = `${icon}<span>${esc(tft(text))}</span>`;
  b.hidden = false;
}
function hideBanner() { $('#banner').hidden = true; }

// ---------------------------------------------------------------- kirajzolás: telefon
const T = (label, inner, extra = '') => `data-target data-label="${esc(label)}" ${extra}`;

function renderApp() {
  const ph = S.phone;
  const scr = $('#ps-screen');
  const tabs = $('#ps-tabs');
  let html = '';
  if (ph.view === 'app') {
    tabs.hidden = false;
    html = APP_TABS[ph.tab]();
  } else {
    tabs.hidden = true;
    if (ph.view === 'launcher') html = launcherHtml();
    else if (ph.view === 'fakeapp') html = fakeAppHtml(ph.app);
    else if (ph.view === 'recents') html = listScreen('Legutóbbi appok', '#3c4043', (ph.opened.length ? ph.opened : ['Spotify']).map((a) => [a, 'Megnyitás', `data-open="${esc(a)}"`]));
    else if (ph.view === 'call') html = callViewHtml();
    else if (ph.view === 'shade') html = listScreen('Értesítések', '#3c4043', (S.notifs.length ? S.notifs : [{ app: 'Rendszer', title: 'Nincs értesítés', text: '' }]).map((e) => [`${e.app}: ${e.title}`, e.text, `data-open="${esc(FAKE_APPS[e.app] ? e.app : 'Üzenetek')}"`]));
  }
  scr.innerHTML = html;
  // kijelölés (telefon vezérlés módban)
  const t = phoneTargets();
  if (ph.control && ui.mode === 'PHONE') {
    if (ph.sel >= t.length) ph.sel = Math.max(0, t.length - 1);
    t.forEach((el, i) => el.classList.toggle('sel', i === ph.sel));
    t[ph.sel]?.scrollIntoView({ block: 'nearest' });
  }
  [...tabs.children].forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === ph.tab)));
}

function callViewHtml() {
  const c = S.call;
  const st = c.state === 'ringing' ? 'Bejövő hívás…' : c.state === 'active' ? callDuration() : 'Hívás vége';
  const btns = c.state === 'ringing'
    ? '<button class="cbtn no" data-call="end" aria-label="Elutasítás">✆</button><button class="cbtn yes" data-call="accept" aria-label="Fogadás">✆</button>'
    : '<button class="cbtn no" data-call="end" aria-label="Bontás">✆</button>';
  return `<div class="callview"><div class="cv-ava">${esc((c.name || '?')[0])}</div>
    <h3>${esc(c.name)}</h3><p>${esc(c.number)}</p><p class="cv-st">${st}</p>
    <div class="cv-btns">${btns}</div>
    <p class="cv-hint">A motoron: ${c.state === 'ringing' ? '▸ fogadás, ◂ elutasítás' : '◂ bontás, ▴▾ hangerő, 08 vissza a menübe'}</p></div>`;
}
function launcherHtml() {
  const ph = S.phone;
  const icon = (a) => `<div class="lapp" ${T(a)} data-open="${esc(a)}"><i style="background:${FAKE_APPS[a].c}">${esc(a[0])}</i>${esc(a)}</div>`;
  return `<div class="launcher">
    <div class="ldate">${new Date().toLocaleDateString('hu-HU', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
    <div class="lgrid">${LAUNCHER[ph.page].map(icon).join('')}</div>
    <div class="lpages">${LAUNCHER.map((_, i) => (i === ph.page ? '●' : '○')).join('')}</div>
    <div class="ldock">${DOCK.map(icon).join('')}</div>
  </div>`;
}
function fakeAppHtml(name) {
  const a = FAKE_APPS[name] || FAKE_APPS.Chrome;
  const back = S.phone.fromShortcut && !S.phone.control ? '<button class="btn" data-back-to-app style="margin:10px 16px">◂ Vissza az OpenRoadSync-hez</button>' : '';
  return `<div class="fakeapp">
    <header style="background:${a.c}">${esc(name)}</header>
    ${back}
    ${a.items.map(([t, s]) => `<div class="fa-item" ${T(t)}><b>${esc(t)}</b>${s ? `<small>${esc(s)}</small>` : ''}</div>`).join('')}
  </div>`;
}
function listScreen(title, color, rows) {
  return `<div class="fakeapp"><header style="background:${color}">${esc(title)}</header>
    ${rows.map(([t, s, x]) => `<div class="fa-item" ${T(t)} ${x || ''}><b>${esc(t)}</b>${s ? `<small>${esc(s)}</small>` : ''}</div>`).join('')}
  </div>`;
}

// ---- az OpenRoadSync app fülei
const sw = (id, on, label, small) => `<div class="row"><label for="${id}">${label}${small ? `<small>${small}</small>` : ''}</label><input type="checkbox" class="sw" id="${id}" ${on ? 'checked' : ''}></div>`;
const APP_TABS = {
  home() {
    const tr = TRACKS[S.media.track];
    const n = S.notifs[0];
    return `<div class="app">
      <h3>OpenRoadSync</h3>
      <div class="card status-card"><div class="status-row"><span class="status-dot">${svg('phone')}</span>
        <div><h4>Kapcsolódva</h4><p>HONDA BTU 85D4</p></div></div></div>
      <div class="card"><h4>Most</h4>
        <div class="list-item"><span class="li-ic">${svg('nav')}</span><div class="li-t">${S.nav.active ? esc(S.nav.steps[S.nav.step]) : S.nav.pending ? 'Útvonaltervezés…' : 'Nincs aktív navigáció'}<small>${S.nav.dest ? esc(S.nav.dest) : 'Indítsd a motor menüjéből'}</small></div></div>
        <div class="list-item"><span class="li-ic">${svg('music')}</span><div class="li-t">${esc(tr.t)}<small>${S.media.playing ? 'Szól' : 'Szünetel'} · ${esc(S.media.app)} · ${esc(tr.a)} · ${S.media.volume}%</small></div></div>
        <div class="list-item"><span class="li-ic">${svg('msg')}</span><div class="li-t">${n ? esc(n.title) : 'Nincs új értesítés'}<small>${n ? esc(n.app + ' · ' + n.text) : 'Próbáld ki: „Új értesítés érkezik”'}</small></div></div>
      </div>
      <div class="card"><p>Ez egy szimuláció: a motor menüje bal oldalt a kormánygombokkal kezelhető. A
        Célpontok, Gyorsgombok és Beállítások fülön módosíthatsz – a kijelző azonnal követi.</p></div>
    </div>`;
  },
  dest() {
    const rows = S.destinations.map((d, i) => `<div class="list-item"><span class="li-ic">${svg('fav')}</span>
      <div class="li-t">${esc(d)}${S.home === d ? '<span class="tag">Haza</span>' : ''}${S.work === d ? '<span class="tag">Munkahely</span>' : ''}
      <small><button class="btn" data-home="${i}">Haza</button> <button class="btn" data-work="${i}">Munkahely</button></small></div>
      <button data-del-dest="${i}" aria-label="Törlés">✕</button></div>`).join('');
    return `<div class="app"><h3>Célpontok</h3>
      <div class="card">${rows || '<p>Még nincs mentett cél.</p>'}</div>
      <div class="card"><h4>Új cél</h4><p>A valódi appban megosztással is felveheted OsmAnd-ból vagy Google Mapsből.</p>
        <div class="add-row"><input id="new-dest" placeholder="pl. Mátraháza"><button class="btn btn-primary" id="add-dest">Mentés</button></div></div>
    </div>`;
  },
  short() {
    const desc = (s) => s.type === 'app' ? 'Alkalmazás' : s.type === 'ha' ? `Home Assistant · ${s.desc || s.data}` : s.type === 'command' ? `Automate / Tasker · ${s.data}` : `Művelet · ${ACTIONS[s.data]}`;
    const rows = S.shortcuts.map((s, i) => `<div class="list-item"><span class="li-ic">${svg(shortcutIcon(s))}</span>
      <div class="li-t">${esc(s.label)}<small>${esc(desc(s))}</small></div>
      <button data-up-short="${i}" aria-label="Feljebb">↑</button><button data-del-short="${i}" aria-label="Törlés">✕</button></div>`).join('');
    return `<div class="app"><h3>Gyorsgombok</h3>
      <div class="card"><p style="margin-bottom:8px">A motoron: Telefon → Gyorsgombok.</p>${rows || '<p>Még nincs gyorsgomb.</p>'}</div>
      <div class="card"><h4>Gyorsgomb hozzáadása</h4>
        <div class="add-row"><select id="sc-type">
          <option value="app">Alkalmazás</option><option value="action">Művelet</option>
          <option value="ha">Home Assistant</option><option value="command">Automate / Tasker</option></select></div>
        <div class="add-row" id="sc-what"></div>
        <div class="add-row"><input id="sc-name" placeholder="Név a motoron (rövid)"><button class="btn btn-primary" id="add-short">Hozzáadás</button></div>
      </div></div>`;
  },
  settings() {
    const p = S.prefs;
    const sel = (mode, k) => {
      const opts = mode === 'music' ? MUSIC_ACTIONS : PHONE_ACTIONS;
      return `<div class="row"><label>${KEY_NAMES[k]}</label><select data-km="${mode}:${k}">${Object.entries(opts).map(([v, l]) => `<option value="${v}" ${p.keymap[mode][k] === v ? 'selected' : ''}>${l}</option>`).join('')}</select></div>`;
    };
    const keys = ['up', 'down', 'left', 'right', 'back'];
    return `<div class="app"><h3>Beállítások</h3>
      <div class="card"><h4>Zene</h4>${sw('p-musicInfo', p.musicInfo, 'Cím és előadó kiírása')}</div>
      <div class="card"><h4>Értesítések a motoron</h4>
        ${sw('p-notifPopup', p.notifPopup, 'Felugró sáv új értesítésnél')}
        ${sw('p-notifContent', p.notifContent, 'Szöveg is látszódjon', 'különben csak az app neve')}
        ${sw('p-notifFocus', p.notifFocus, 'Tartalom központú', 'a küldő alul, a szöveg nagyban a jobb oldali panelen')}</div>
      <div class="card"><h4>Hívások a motoron</h4>${sw('p-calls', p.calls, 'Hívások kezelése a motor gombjaival', 'fogadás, elutasítás, tárcsázás a névjegyekből')}</div>
      <div class="card"><h4>Telefon vezérlés a motorról</h4>${sw('p-phoneControl', p.phoneControl, 'Bekapcsolás (saját felelősségre)')}</div>
      <div class="card"><h4>Manőver-ikonok</h4><p>Az app az OsmAnd utasításából felismeri a manővert (balra, jobbra,
        enyhén, élesen, tartson, körforgalom, visszafordulás, megérkezés), és a motor megfelelő nyilát küldi.
        Ha valamelyik mégsem stimmel, itt átállítható.</p></div>
      <div class="card"><h4>Gombkiosztás – Zene</h4>${keys.map((k) => sel('music', k)).join('')}
        <button class="btn" data-km-reset="music">Alapértelmezett</button></div>
      <div class="card"><h4>Gombkiosztás – Telefon vezérlés</h4>${keys.map((k) => sel('phone', k)).join('')}
        <button class="btn" data-km-reset="phone">Alapértelmezett</button></div>
      <p id="km-msg" style="color:#92001e;font-size:13px"></p>
    </div>`;
  },
};

function shortcutWhatHtml(type) {
  if (type === 'app') return `<select id="sc-data">${Object.keys(FAKE_APPS).map((a) => `<option>${esc(a)}</option>`).join('')}</select>`;
  if (type === 'action') return `<select id="sc-data">${Object.entries(ACTIONS).map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}</select>`;
  if (type === 'ha') return `<select id="sc-data">${HA_ENTITIES.flatMap((e) => e.services.map(([s, l]) => `<option value="${e.id}|${s}">${esc(e.name)} → ${esc(l)}</option>`)).join('')}</select>`;
  return '<input id="sc-data" placeholder="Parancs, pl. garazs">';
}

// ---------------------------------------------------------------- események
function renderAll() { render(); renderApp(); }

function log(t) { $('#sim-log').textContent = t; }
function flash(k) {
  const b = document.querySelector(`[data-key="${k}"]`);
  if (!b) return;
  b.classList.add('pressed'); setTimeout(() => b.classList.remove('pressed'), 120);
}

document.addEventListener('click', (ev) => {
  const t = ev.target.closest('button, [data-open], [data-target]');
  if (!t) return;
  if (t.dataset.key) { if (t.dataset.key === 'right' && ui.held) { ui.held = false; return; } key(t.dataset.key); return; }
  if (t.dataset.call) { if (t.dataset.call === 'accept') acceptCall(); else endCall(); return; }
  if (t.dataset.tab) { S.phone.tab = t.dataset.tab; renderApp(); return; }
  if (t.dataset.open) { openFakeApp(t.dataset.open); return; }
  if (t.hasAttribute('data-back-to-app')) { S.phone.view = 'app'; S.phone.fromShortcut = false; renderApp(); return; }
  if (t.dataset.home !== undefined) { S.home = S.destinations[+t.dataset.home]; renderAll(); return; }
  if (t.dataset.work !== undefined) { S.work = S.destinations[+t.dataset.work]; renderAll(); return; }
  if (t.dataset.delDest !== undefined) {
    const d = S.destinations.splice(+t.dataset.delDest, 1)[0];
    if (S.home === d) S.home = null; if (S.work === d) S.work = null;
    renderAll(); return;
  }
  if (t.id === 'add-dest') { const v = $('#new-dest').value.trim(); if (v) { S.destinations.push(v); renderAll(); } return; }
  if (t.dataset.delShort !== undefined) { S.shortcuts.splice(+t.dataset.delShort, 1); renderAll(); return; }
  if (t.dataset.upShort !== undefined) { const i = +t.dataset.upShort; if (i > 0) { const [x] = S.shortcuts.splice(i, 1); S.shortcuts.splice(i - 1, 0, x); renderAll(); } return; }
  if (t.id === 'add-short') {
    const type = $('#sc-type').value, data = $('#sc-data').value.trim();
    if (!data) return;
    let label = $('#sc-name').value.trim();
    const sc = { type, data };
    if (type === 'ha') { const [id, svc] = data.split('|'); const e = HA_ENTITIES.find((x) => x.id === id); sc.desc = `${e.name} → ${e.services.find((s) => s[0] === svc)[1]}`; label ||= e.name; }
    else if (type === 'action') label ||= ACTIONS[data];
    else label ||= data;
    sc.label = label;
    S.shortcuts.push(sc); renderAll(); return;
  }
  if (t.dataset.kmReset) { S.prefs.keymap[t.dataset.kmReset] = { ...KEYMAP_DEFAULTS[t.dataset.kmReset] }; renderAll(); return; }
  if (t.id === 'act-notif') newNotif();
  if (t.id === 'act-call') incomingCall();
  if (t.id === 'act-exit') exitToNative();
  if (t.id === 'act-track') { S.media.track = (S.media.track + 1) % TRACKS.length; S.media.playing = true; log(`Új szám: ${TRACKS[S.media.track].t} – ${TRACKS[S.media.track].a}`); if (ui.mode === 'MUSIC') render(); renderApp(); }
  if (t.id === 'act-step') nextNavStep(false);
  if (t.id === 'act-reset') {
    clearTimeout(ui.navTimer); clearInterval(ui.navAuto); clearInterval(ui.callTimer);
    S = freshState(); ui.overlay = false; ui.native = false; $('#tft').classList.remove('native');
    hideBanner(); backToMain(0); renderApp(); log('Újrakezdve.');
  }
});

document.addEventListener('change', (ev) => {
  const t = ev.target;
  if (t.id === 'sc-type') { $('#sc-what').innerHTML = shortcutWhatHtml(t.value); return; }
  if (t.id?.startsWith('p-')) {
    const k = t.id.slice(2);
    if (k === 'phoneControl' && t.checked && !confirm('A telefon vezérlése a motor gombjaival elvonhatja a figyelmet a vezetésről. A használat a saját felelősséged.\n\nBekapcsolod?')) { t.checked = false; return; }
    S.prefs[k] = t.checked;
    if (k === 'phoneControl' && !t.checked && S.phone.control) exitPhoneControl();
    render(); return;
  }
  if (t.dataset.km) {
    const [mode, k] = t.dataset.km.split(':');
    S.prefs.keymap[mode][k] = t.value;
    const exit = mode === 'music' ? 'exit' : 'menu';
    if (!Object.values(S.prefs.keymap[mode]).includes(exit)) {
      S.prefs.keymap[mode].back = exit;
      renderApp();
      $('#km-msg').textContent = 'A kilépés a Vissza (08) gombon maradt, hogy ne ragadj be ebbe a módba.';
    }
    render();
  }
});

// a Gyorsgombok fül "mit" mezője a típus szerint
new MutationObserver(() => { const w = $('#sc-what'); if (w && !w.children.length) w.innerHTML = shortcutWhatHtml($('#sc-type').value); })
  .observe($('#ps-screen'), { childList: true });

document.addEventListener('keydown', (ev) => {
  if (ev.target.matches?.('input, select, textarea')) return;
  if (ev.key === 'ArrowRight' && ev.shiftKey) { ev.preventDefault(); flash('right'); exitToNative(); return; }
  const map = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', Enter: 'right', Backspace: 'back', Escape: 'back' };
  const k = map[ev.key];
  if (k) { ev.preventDefault(); key(k); }
});

// ▸ hosszan (0,7 mp): kilépés a motor saját nézetébe, mint a valódi motoron
(() => {
  const rb = document.querySelector('[data-key="right"]');
  let timer;
  rb.addEventListener('pointerdown', () => {
    ui.held = false;
    rb.classList.add('holding');
    timer = setTimeout(() => { ui.held = true; rb.classList.remove('holding'); exitToNative(); }, 700);
  });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((e) => rb.addEventListener(e, () => { clearTimeout(timer); rb.classList.remove('holding'); }));
})();

function tick() {
  const now = new Date();
  const hm = now.toLocaleTimeString('hu-HU', { hour: '2-digit', minute: '2-digit' });
  $('#tft-clock').textContent = hm;
  $('#ps-clock').textContent = hm;
}
setInterval(tick, 10000);
tick();

// indulás: nyitókép, majd a főmenü (mint a valódi kapcsolódáskor)
buildCluster();
drawTile(splashTile());
renderApp();
setTimeout(() => backToMain(0), 1300);
