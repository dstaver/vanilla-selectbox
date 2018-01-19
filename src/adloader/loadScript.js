const log = require('debug')('adloader:loadScript');

export function loadScriptAsync(src, cb) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.charset = 'utf8';
  script.async = 'async';
  script.src = src;

  if (cb) {
    script.addEventListener('load', cb);
  }

  script.addEventListener('error', e =>
    log(`script ${src} failed to load`, e.message)
  );

  head.appendChild(script);
}
