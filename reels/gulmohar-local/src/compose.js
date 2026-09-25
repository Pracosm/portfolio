const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const [mode, arg] = process.argv.slice(2); // mode: preview "t1,t2,..." | full
  const man = {}; for (const d of fs.readdirSync('shots')) man[d] = fs.readdirSync('shots/' + d).length;
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('pageerror', e => console.log('err', e.message));
  await p.goto('file://' + path.resolve('compose.html'));
  await p.evaluate(m => window.setup(m), man);
  const times = mode === 'preview' ? arg.split(',').map(Number) : [...Array(Math.round(28 * 30)).keys()].map(i => i / 30);
  const out = mode === 'preview' ? 'preview' : 'frames';
  fs.mkdirSync(out, { recursive: true });
  for (let i = 0; i < times.length; i++) {
    await p.evaluate(t => window.render(t), times[i]);
    await p.screenshot({ path: `${out}/${mode === 'preview' ? 't' + times[i].toFixed(2) : String(i).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 93 });
    if (i % 100 === 0) console.log('frame', i);
  }
  console.log(JSON.stringify(await p.evaluate(() => window.__cuts)));
  await b.close();
})();
