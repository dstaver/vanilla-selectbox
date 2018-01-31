export function promiseSerial(list, args) {
  const p = Promise.resolve();
  return list.reduce((pacc, fn) => pacc.then(fn(args)), p);
}
