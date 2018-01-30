import { createLogger } from '../../log';

import { loadScriptAsync } from '../../script';

const log = createLogger('adloader:AudienceReportsPlugin');

const url = '//sak.userreport.com/startsiden/launcher.js';

export default function AudienceReportsPlugin(adloader) {
  return new Promise(resolve => {
    log('Register plugin');
    adloader.setReadyCondition('audienceReports', false);

    loadScriptAsync(url)
      .then(() => {
        log('Audience Reports script loaded');
      })
      .catch(err => log(err.message));

    log('Targeting start');
    doAudienceReportsTargeting('apr', window);

    window.apr('dfp-targeting-done', () => {
      log('Targeting done');
      adloader.setReadyCondition('audienceReports', true);
    });

    log('Plugin registered');

    resolve('AudienceReportsPlugin registered successfully');
  });
}

/* eslint-disable */
function doAudienceReportsTargeting(l, a) {
  var d = function(b) {
    d._cmds.push({
      k: String(b),
      a: Array.prototype.slice.call(arguments, 1),
      t: Date.now()
    });
    for (var c = 0, a = d._subs.length; c < a; c++) d._subs[c]();
  };
  d._cmds = [];
  d._subs = [];
  a[l] = a.__APRSAK = d;
  var d = a.__APRSAK,
    g = null,
    h = !1,
    f = function() {
      var b,
        c,
        a = [],
        e = null;
      clearTimeout(g);
      for (b = d._cmds.length - 1; 0 <= b; b--)
        if (((c = d._cmds[b]), 'dfp-targeting-done' === c.k)) {
          var k = c.t + 1e3;
          if (!0 === h || k <= Date.now())
            a.unshift(c.a[0]), d._cmds.splice(b, 1);
          else if (((c = k - Date.now()), null === e || c < e)) e = c;
        }
      b = 0;
      for (c = a.length; b < c; b++)
        try {
          a[b]();
        } catch (m) {
          console && console.error && console.error(m);
        }
      null !== e && (g = setTimeout(f, e));
    };
  f._id = 'dfp-targeting-nomock-fallback';
  try {
    var e = JSON.parse(a.localStorage.apr_tdc || '0');
    e &&
      e.exp > Date.now() &&
      ((a.googletag = a.googletag || {}),
      (a.googletag.cmd = a.googletag.cmd || []),
      a.googletag.cmd.push(function() {
        for (var b in e.d)
          e.d.hasOwnProperty(b) && a.googletag.pubads().setTargeting(b, e.d[b]);
      }),
      (h = !0));
  } finally {
    d._subs.push(f), f();
  }
}
/* eslint-enable */
