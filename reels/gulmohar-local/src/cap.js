const { launch } = require('./lib');
const fs = require('fs');
async function open(city, extra = '', vp = { width: 720, height: 1280 }) {
  const { b, ctx } = await launch({ viewport: vp, deviceScaleFactor: 1 });
  await ctx.addInitScript(() => {
    const raf = window.requestAnimationFrame.bind(window);
    window.__frozen = false;
    window.requestAnimationFrame = cb => window.__frozen ? 0 : raf(cb);
  });
  const p = await ctx.newPage();
  p.on('pageerror', e => console.log('err', e.message));
  await p.goto(`https://gulmohar-local.pages.dev/?city=${city}&skip&nohud&scale=1${extra}`);
  await p.waitForFunction(() => window.__ready, null, { timeout: 600000, polling: 1000 });
  await p.waitForTimeout(1500);
  await p.evaluate(() => { window.__frozen = true; });
  await p.waitForTimeout(300);
  return { b, p };
}
async function frame(p, pre) {
  const url = await p.evaluate(pre => {
    if (pre) (0, eval)(pre)();
    window.__api.step(1, window.__dt || 1 / 30);
    return document.querySelector('#c').toDataURL('image/jpeg', 0.92);
  }, pre ? pre.toString() : null);
  return Buffer.from(url.split(',')[1], 'base64');
}
module.exports = { open, frame };
if (require.main === module) (async () => {
  const t0 = Date.now();
  const { b, p } = await open(process.argv[2] || 'mumbai');
  console.log('loaded in', (Date.now() - t0) / 1000);
  const info = await p.evaluate(() => ({ poses: window.__api.fpsPoses, inter: window.__ctx.interactables.map(o => Object.keys(o).join('/') + ':' + (o.label || o.text || o.name || '')).slice(0, 40), keys: [...window.__ctx.keys.keys()], p: [window.__api.player.x, window.__api.player.z] }));
  console.log(JSON.stringify(info));
  for (const [name, pose] of info.poses) {
    await p.evaluate(pose => window.__api.pose(pose), pose);
    for (let i = 0; i < 20; i++) await frame(p);
    const t = Date.now(); const buf = await frame(p); console.log(name, 'frame ms', Date.now() - t);
    fs.writeFileSync(`probe/${name}.jpg`, buf);
  }
  await b.close();
})();
