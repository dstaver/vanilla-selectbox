import { init } from './adloader';
import AudienceReportsPlugin from './adloader/plugins/AudienceReportsPlugin';
import DocumentVisibilityPlugin from './adloader/plugins/DocumentVisibilityPlugin';

init(
  {
    global: 'adloader',
    plugins: [AudienceReportsPlugin, DocumentVisibilityPlugin],
  },
  [
    {
      id: 'banner_top',
      size: [[1000, 300]],
      targeting: ['position', 'banner_top'],
    },
    {
      id: 'skyscraper_right',
      size: [[1000, 300]],
      targeting: ['position', 'skyscraper_right'],
    },
  ]
);

setTimeout(() => addElement('skyscraper_right', 500));

function addElement(id) {
  const element = document.createElement('div');
  element.id = id;
  element.className = 'ad';
  element.textContent = id;
  document.body.appendChild(element);
}
