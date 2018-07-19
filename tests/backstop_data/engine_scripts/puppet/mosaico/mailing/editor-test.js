'use strict';

module.exports = async (engine, scenario, viewport) => {
  await require('./step-2.js') (engine, scenario, viewport);
  await engine.waitFor('a[title="Edit"]');
  // wait for Angular to bind function
  await engine.waitFor(200);
  await engine.click('a[title="Edit"]');
  await engine.waitFor('.status-start', { hidden: true });
  await engine.waitFor(() => document.querySelectorAll('body> iframe.ui-front').length > 0);

  const frames = await engine.frames();
  const frame = frames.find(f => f._navigationURL .match(/civicrm\/mosaico\/iframe\?snippet\=1/g) !== null);
  const testButton = await frame.$('a[title="Show preview and send test"]');
  
  await testButton.click();
  // wait for modal to adjust
  await engine.waitFor(500);
}
