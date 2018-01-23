import adloader from './adloader/index';
import AudienceReportsPlugin from './adloader/plugins/AudienceReportsPlugin';
import DocumentVisibilityPlugin from './adloader/plugins/DocumentVisibilityPlugin';

adloader.init(
  {
    global: 'adloader',
    plugins: [AudienceReportsPlugin, DocumentVisibilityPlugin],
  },
  [
    {
      id: 'banner_top',
      size: [[1000, 300]],
      targeting: [['position', 'banner_top']],
    },
    {
      id: 'banner_middle',
      size: [[580, 400]],
      targeting: [['position', 'banner_middle']],
    },
  ]
);

// setTimeout(() => addElement('skyscraper_right'), 100);

// function addElement(id) {
//   const element = document.createElement('div');
//   element.id = id;
//   element.className = 'ad';
//   element.textContent = id;
//   document.body.appendChild(element);
// }
