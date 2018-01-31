import scrollMonitor from 'scrollmonitor';

export default function ScrollMonitorPlugin(ad, adloader) {
  return new Promise(resolve => {
    ad.log('ScrollMonitor: register plugin');
    ad.setReadyCondition('nearViewport', false);
    adloader.subscribe('ad:elementReady', () => {
      if (ad.element) {
        ad.log('ScrollMonitor: Adding watcher', ad.element);
        const watcher = scrollMonitor.create(ad.element, 200);
        watcher.enterViewport(() => {
          ad.setReadyCondition('nearViewport', true);
          ad.log('ScrollMonitor: Enter viewport');
        });
        watcher.exitViewport(() => {
          ad.log('ScrollMonitor: Exit viewport');
        });
      }
    });
    resolve();
  });
}
