/**
 * Converts a plain selectbox to a stylable selectbox component
 * @param {HTMLElement} selectBoxEl The select element to convert
 */
export default function convertSelectbox(selectBoxEl) {
  const cssClass = selectBoxEl.dataset.cssClass || 'vselect';
  const options = Array.from(selectBoxEl.querySelectorAll('option')).map(
    ({ value, textContent, selected }) => ({
      value,
      selected,
      text: textContent,
      cssClass: `${cssClass}__options__option`,
    })
  );
  const vselectEl = createVselectEl({
    cssClass,
    options,
    name: selectBoxEl.name,
  });
  selectBoxEl.parentNode.replaceChild(vselectEl, selectBoxEl);
}
/**
 *
 * @param {params}          object Parameters
 * @param {params.cssClass} string Namespace all CSS classnames with this value
 * @param {params.options}  array  Array of option values
 * @returns                        HTML Element
 */
export function createVselectEl({ cssClass = 'vselect', name, options }) {
  const selectedOption = options.find(option => option.selected) || options[0];
  const vselectEl = document.createElement('div');
  vselectEl.classList.add(cssClass);
  vselectEl.tabIndex = '0';
  vselectEl.dataset.open = false;
  vselectEl.dataset.type = 'vselect';
  const tpl = `
    <input type="hidden" name="${name}" value="${selectedOption.value}">
    <div
      class="${cssClass}__value"
      data-type="value"
      data-value="${selectedOption.value}"
    >
      ${selectedOption.text}
    </div>
    <div class="${cssClass}__options">
      ${options.map(optionTpl).join('')}
    </div>
  `;
  vselectEl.innerHTML = tpl;
  vselectEl.addEventListener('click', handleSelect);
  vselectEl.addEventListener('keydown', handleSelect);
  vselectEl.addEventListener('blur', handleBlur);

  return vselectEl;
}

/**
 * Template for the individual option values
 * @param  {params}  object          export Function parameter object
 * @param  {string}  object.cssClass CSS class name to use for the option
 * @param  {boolean} object.selected This is the selected option
 * @param  {string}  object.value    Option value
 * @param  {string}  object.text     Option Text
 * @return {string}                  HTML for the option
 */
export function optionTpl({ cssClass, value, selected, text }) {
  return `<div
    class="${cssClass}"
    data-value="${value}"
    data-type="option"
    ${selected ? 'data-selected="selected" data-highlight="highlight"' : ''}
  >${text}</div>`;
}

/**
 * Handle select
 * Should trigger on click, keyboard enter, and keyboard space
 * @param {Event} e Event that triggered the function
 */
export function handleSelect(e) {
  if (e.type === 'keydown') {
    if (
      e.keyCode !== 13 && // Enter
      e.keyCode !== 32 && // Space
      e.keyCode !== 40 && // Arrow down
      e.keyCode !== 38 // Arrow up
    ) {
      return;
    }
    e.preventDefault();
  }

  switch (e.srcElement.dataset.type) {
    case 'vselect':
      if (
        e.type === 'keydown' &&
        e.keyCode === 38 &&
        e.srcElement.dataset.open === 'true'
      ) {
        console.log('Type vselect, keyboard up');
        highlightOption(
          e.srcElement.querySelector('[data-highlight]').previousElementSibling
        );
      } else if (
        e.type === 'keydown' &&
        e.keyCode === 40 &&
        e.srcElement.dataset.open === 'true'
      ) {
        console.log('Type vselect, keyboard up');
        highlightOption(
          e.srcElement.querySelector('[data-highlight]').nextElementSibling
        );
      } else if (
        e.type === 'keydown' &&
        (e.keyCode === 13 || e.keyCode === 32) &&
        e.srcElement.dataset.open === 'true'
      ) {
        console.log('Type vselect, keyboard enter or space');
        selectOption(e.srcElement.querySelector('[data-highlight]'));
      } else {
        toggleOpenState(e.srcElement);
      }
      break;

    case 'value':
      console.log('Type value, keyboard up');
      if (
        e.type === 'keydown' &&
        e.keyCode === 38 &&
        e.srcElement.parentNode.dataset.open === 'true'
      ) {
        highlightOption(e.srcElement.previousElementSibling);
      } else {
        toggleOpenState(e.srcElement.parentNode);
      }
      break;

    case 'option':
      console.log('Type optionm, keyboard up');
      if (e.type === 'keydown' && e.keyCode === 38) {
        highlightOption(e.srcElement.previousElementSibling);
      } else {
        selectOption(e.srcElement);
      }
      break;

    default:
      break;
  }
}

/**
 * Highlights an option Element, and removes highlight from all siblings
 * @param {HTMLElement} optionEl Option to highlight
 */
export function highlightOption(optionEl) {
  Object.values(optionEl.parentNode.children).forEach(option => {
    if (option.removeAttribute) {
      option.removeAttribute('data-highlight');
    }
  });
  optionEl.setAttribute('data-highlight', 'highlight');
}

/**
 * Updates the selected value from the given option
 * @param {HTMLElement} optionEl Option element to select
 */
export function selectOption(optionEl) {
  const vselect = optionEl.parentNode.parentNode;
  const options = optionEl.parentNode.childNodes;
  const inputHidden = vselect.querySelector('input[type="hidden"]');
  inputHidden.value = optionEl.dataset.value;
  const valueEl = vselect.querySelector('[data-type="value"]');
  valueEl.setAttribute('data-value', optionEl.dataset.value);
  valueEl.textContent = optionEl.textContent;

  Object.values(options).forEach(option => {
    if (option.removeAttribute) {
      option.removeAttribute('data-selected');
      option.removeAttribute('data-highlight');
    }
  });
  optionEl.setAttribute('data-highlight', 'highlight');
  optionEl.setAttribute('data-selected', 'selected');
  closeOptions(vselect);
}

/**
 * Closes open options on blur
 * @param {Event} e Blur event
 */
export function handleBlur(e) {
  console.log('Blur vselect');
  closeOptions(e.currentTarget);
}

/**
 * Sets data-open to 'false' for the given element
 * @param {HTMLElement} el Element to close
 */
export function closeOptions(el) {
  el.setAttribute('data-open', 'false');
}

/**
 * Toggles open state for given element
 * @param {HTMLElement} el Element to toggle
 */
export function toggleOpenState(el) {
  if (el.dataset.open !== 'true') {
    el.setAttribute('data-open', 'true');
  } else {
    el.setAttribute('data-open', 'false');
  }
}
