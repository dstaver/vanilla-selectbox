const listeners = [];
const MutationObserver =
  window.MutationObserver || window.WebKitMutationObserver;
let observer;

function check() {
  // Check the DOM for elements matching a stored selector
  listeners.forEach(listener => {
    // Query for elements matching the specified selector
    const element = document.getElementById(listener.id);

    // Make sure the callback isn't invoked with the
    // same element more than once
    if (element && !element.ready) {
      element.ready = true;

      // Invoke the callback with the element
      listener.fn.call(element, element);
    }
  });
}

export function elementReadyById(id, fn) {
  if (MutationObserver) {
    // Store the element ID and callback to be monitored
    listeners.push({
      id,
      fn,
    });

    if (!observer) {
      // Watch for changes in the document
      observer = new MutationObserver(check);
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
      });
    }
    // Check if the element is currently in the DOM
    check();
  } else {
    setInterval(check, 50);
  }
}
