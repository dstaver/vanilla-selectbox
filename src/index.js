// import '@babel/polyfill';
// import { createLogger } from './log';
import { createLogger } from './adloader/log';
import { adloader } from './adloader';
import AudienceReportsPlugin from './adloader/plugins/AudienceReportsPlugin';
import DocumentVisibilityPlugin from './adloader/plugins/DocumentVisibilityPlugin';
import './index.scss';

const log = createLogger('adloader:testconfig');
log('init start');
adloader
  .init(
    {
      global: 'adloader',
      plugins: [AudienceReportsPlugin, DocumentVisibilityPlugin],
    },
    [
      {
        id: 'banner_top',
        size: [[1000, 300]],
        targeting: {
          position: 'banner_top',
        },
      },
      {
        id: 'skyscraper_right',
        size: [
          [120, 600],
          [160, 600],
          [180, 500],
          [180, 600],
          [280, 778],
          [300, 600],
        ],
        targeting: {
          position: 'skyscraper_right',
        },
      },
      {
        id: 'banner_middle',
        size: [[580, 400]],
        targeting: {
          position: 'banner_middle',
        },
      },
    ]
  )
  .then(() => log('init end'))
  .catch(err => log(err.message));

// setTimeout(() => addElement('skyscraper_right'), 100);

// function addElement(id) {
//   const element = document.createElement('div');
//   element.id = id;
//   element.className = 'ad';
//   element.textContent = id;
//   document.body.appendChild(element);
// }
