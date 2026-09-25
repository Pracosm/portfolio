const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path'), crypto = require('crypto');
fs.mkdirSync('cache', { recursive: true });
function fetchCached(url) {
  const h = crypto.createHash('md5').update(url).digest('hex');
  const body = path.join('cache', h), meta = body + '.json';
  if (!fs.existsSync(meta)) {
    const out = execFileSync('curl', ['-sS', '-L', '-o', body, '-D', '-', '-w', '\n%{http_code}|%{content_type}', url], { maxBuffer: 1 << 26 }).toString();
    const [code, ct] = out.trim().split('\n').pop().split('|');
    fs.writeFileSync(meta, JSON.stringify({ code: +code, ct }));
  }
  const m = JSON.parse(fs.readFileSync(meta));
  return { status: m.code, contentType: m.ct || undefined, body: fs.readFileSync(body) };
}
async function launch(opts = {}) {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'] });
  const ctx = await b.newContext({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2, ...opts });
  await ctx.route(/^https:\/\/gulmohar-local\.pages\.dev\//, r => {
    try { r.fulfill(fetchCached(r.request().url())); } catch (e) { console.log('fetchfail', r.request().url()); r.abort(); }
  });
  return { b, ctx };
}
module.exports = { launch };
