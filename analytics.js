/* Analytics + small click helpers (jmTrack / jmTrackOnce). */
(function () {
  var ID = 'G-WFGB7D2MBZ', q = null;
  try { q = new URLSearchParams(location.search); } catch (e) {}
  try {
    if (q && q.get('me') === '1') localStorage.setItem('jm_owner', '1');
    if (q && q.get('me') === '0') localStorage.removeItem('jm_owner');
    if (localStorage.getItem('jm_owner') === '1') window['ga-disable-' + ID] = true;
  } catch (e) {}

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());

  var cfg = {};
  var ref = q && (q.get('r') || q.get('ref'));
  if (ref && !q.get('utm_source')) {
    ref = ref.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 60);
    if (ref) {
      cfg.page_location = location.origin + location.pathname +
        '?utm_source=' + encodeURIComponent(ref) + '&utm_medium=link';
      gtag('event', 'personal_link_visit', { ref: ref });
    }
  }
  gtag('config', ID, cfg);

  // tidy the address bar after ?me / ?r
  if (q && (q.has('me') || q.has('r') || q.has('ref'))) {
    try { q.delete('me'); q.delete('r'); q.delete('ref'); var s = q.toString();
      history.replaceState(null, '', location.pathname + (s ? '?' + s : '') + location.hash); } catch (e) {}
  }

  window.jmTrack = function (name, params) { try { gtag('event', name, params || {}); } catch (e) {} };
  var sent = {};
  window.jmTrackOnce = function (name, params, key) {
    var k = name + '|' + (key || '');
    if (sent[k]) return;
    sent[k] = 1;
    window.jmTrack(name, params);
  };

  function ready() {
    // any link or button marked data-ev="event_name" (optional data-tool / data-from)
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('[data-ev]');
      if (!a) return;
      var p = {};
      if (a.getAttribute('data-tool')) p.tool = a.getAttribute('data-tool');
      if (a.getAttribute('data-from')) p.from = a.getAttribute('data-from');
      window.jmTrack(a.getAttribute('data-ev'), p);
    });
    // <body data-sections>: send dance_section_<id> the first time each section is seen
    if (document.body.hasAttribute('data-sections') && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          window.jmTrackOnce('dance_section_' + en.target.id, {}, en.target.id);
          io.unobserve(en.target);
        });
      }, { threshold: 0.3 });
      document.querySelectorAll('section[id]').forEach(function (s) { io.observe(s); });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready);
  else ready();
})();
