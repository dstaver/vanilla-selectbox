export default async function DocumentVisibilityPlugin(adloader) {
  adloader.setReadyCondition('documentVisible', !document.hidden);

  document.addEventListener('visibilitychange', () =>
    adloader.setReadyCondition('documentVisible', !document.hidden)
  );

  return 'DocumentVisibilityPlugin registered successfully';
}
