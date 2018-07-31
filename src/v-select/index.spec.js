import { optionTpl } from './index';

test('Create option template', () => {
  expect(
    optionTpl({
      cssClass: 'vselect',
      value: 'test',
      selected: true,
      text: 'Test text',
    })
  ).toBe(`<div
    class="vselect"
    data-value="test"
    data-type="option"
    data-selected="selected" data-highlight="highlight"
  >Test text</div>`);
});
