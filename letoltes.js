/* A letöltés gombok mindig a GitHubon lévő legújabb kiadást adják: alapból a repó updates
   mappájára mutatnak, betöltés után (updates/latest.json – ugyanaz, amiből az app is frissül)
   közvetlenül a legújabb APK-ra. */
(() => {
  const BASE = 'https://raw.githubusercontent.com/simsononroad/OpenRoadSync_app/main/updates/';
  fetch(BASE + 'latest.json', { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((j) => {
      const url = BASE + encodeURIComponent(j.apk);
      const mb = (j.size / 1e6).toFixed(1).replace('.', ',') + ' MB';
      document.querySelectorAll('a[data-apk]').forEach((a) => { a.href = url; });
      document.querySelectorAll('[data-apk-size]').forEach((e) => { e.textContent = mb; });
      document.querySelectorAll('[data-apk-ver]').forEach((e) => { e.textContent = j.versionName; });
    })
    .catch(() => {});   // ha nem érhető el: marad a GitHub updates mappa linkje
})();
