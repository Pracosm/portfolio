const { open, frame } = require('./cap');
const fs = require('fs');
const HELPERS = () => {
  const A = window.__api, C = window.__ctx;
  window.__ff = (sec, dt = 1 / 30) => { const R = A.post.render; A.post.render = () => {}; A.step(Math.round(sec / dt), dt); A.post.render = R; };
  window.__key = (code, down) => window.dispatchEvent(new KeyboardEvent(down ? 'keydown' : 'keyup', { code, key: code.replace('Key', '').toLowerCase(), shiftKey: code === 'ShiftLeft' }));
  window.__inter = re => C.interactables.find(o => re.test(typeof o.label === 'function' ? o.label(C) : o.label));
  window.__reset = () => { window.__dt = 1 / 30; const P = A.player; P.mode = 'walk'; P.ride = null; P.orbit.target = P.orbit.k = 0; ['KeyW', 'ShiftLeft', 'KeyA', 'KeyD'].forEach(k => window.__key(k, false)); };
  window.__tod = (t, rain = 0) => { const T = A.tod; T.t = T.target = t; T.rain = T.rainTarget = rain; T.apply(Math.max(0, t)); };
};

const ARRIVE = (stationX, onlyDir = 0, fixed = null) => `() => {
  __reset(); __tod(0.05); window.__dt = 1 / 15;
  const R = __ctx.rail; const log = [];
  // wait until some train is inbound to this station and its nearest car is ~110 units away on the approach side
  let tr = null;
  for (let k = 0; k < 3000; k++) {
    for (const t of R.trains) {
      const xs = t.cars.map(c => c.solid.x - ${stationX});
      const lead = t.dir < 0 ? Math.min(...xs) : Math.max(...xs);
      const nx = t.p.next ? t.p.next.x : t.p.stop.x; if (Math.abs(nx - ${stationX}) < 40 && t.p.ph !== 'dwell' && Math.abs(lead) > 70 && Math.abs(lead) < 110 && Math.sign(lead) === -t.dir && (!${onlyDir} || t.dir === ${onlyDir})) { tr = t; break; }
    }
    if (tr) break; __ff(0.1);
  }
  __ctx.__rideMsg = tr ? 'found dir=' + tr.dir + ' z=' + tr.track.z + ' side=' + tr.track.side + ' v=' + tr.p.v.toFixed(1) : 'nofound';
  const FIX = ${JSON.stringify(fixed)}; if (tr && FIX) __api.pose(FIX); else if (tr) { const yaw = tr.dir < 0 ? Math.PI / 2 : -Math.PI / 2; const z = tr.track.z + tr.track.side * (R.CAR.HW + 2.2);
    __api.pose({ x: ${stationX} - tr.dir * -1 * 0 + (tr.dir < 0 ? -20 : 20), z, yaw: yaw + (tr.track.side > 0 ? 1 : -1) * (tr.dir < 0 ? 1 : -1) * 0.18, pitch: 0.03 }); }
  __ff(0.05);
}`;
const SHOTS = {
  mumbai: [
    ['m_platform', 90, ARRIVE(0, -1, { x: -25, z: -6.4, yaw: Math.PI / 2 - 0.22, pitch: 0.02 }), i => {}],
    ['m_wheel', 70, () => {
      __key('KeyW', false); __reset(); __tod(0);
      __api.pose({ x: 160.9, z: 125.5, yaw: 0, pitch: 0 }); __api.step(1, 1 / 30);
      __inter(/giant wheel/).fn(__ctx); __ff(16);
      __api.player.yaw = -2.24; __api.player.pitch = -0.32;
    }, i => { __api.player.yaw += 0.006; }],
    ['m_rain', 75, () => {
      __reset(); __tod(0.1, 1);
      __api.pose({ x: 20, z: 90, yaw: 1.2, pitch: 0.05 }); __ff(1);
      __key('KeyW', true); __ff(0.5);
    }, i => {}],
    ['m_night', 75, () => {
      __key('KeyW', false); __reset(); __tod(1);
      __api.pose({ x: 4, z: 6, yaw: 0.35, pitch: 0.12 }); __ff(1);
      __key('KeyW', true); __ff(0.3);
    }, i => {}],
    ['m_auto', 75, () => {
      __reset(); __tod(0.15);
      __api.pose({ x: -9, z: 22.6, yaw: Math.PI, pitch: 0 }); __ff(0.2);
      __ctx.keys.get('KeyV')(__ctx); __api.step(1, 1 / 30);
      __inter(/Get in the auto/).fn(__ctx); __api.player.yaw = 0.1;
      __key('KeyW', true); for (let k = 0; k < 20; k++) { __ctx.vehicles.ride.v = 9; __ff(0.05); } __ctx.__rideMsg = 'auto yaw ' + __ctx.vehicles.ride.yaw.toFixed(2);
      __api.player.pitch = -0.12;
    }, i => { __ctx.vehicles.ride.v = Math.max(__ctx.vehicles.ride.v, 9); }],
  ],
  bangalore: [
    ['b_platform', 90, ARRIVE(0), i => {}],
    ['b_auto', 75, () => {
      __key('KeyW', false); __reset(); __tod(0.1); __ff(1);
      __api.pose({ x: -104, z: 13.6, yaw: Math.PI, pitch: 0 }); __ff(0.3);
      const v = __ctx.keys.get('KeyV'); if (!v) { __ctx.__rideMsg = 'nokeyV ' + [...__ctx.keys.keys()]; return; }
      v(__ctx); __api.step(1, 1 / 30);
      __inter(/Get in the auto/).fn(__ctx); __api.player.yaw = 0.1;
      __key('KeyW', true); __ff(0.6);
    }, i => {}],
  ],
};
(async () => {
  const city = process.argv[2], only = process.argv[3];
  const { b, p } = await open(city);
  p.on('console', m => m.type() === 'error' && console.log('console', m.text().slice(0, 200)));
  await p.evaluate(`(${HELPERS})()`);
  for (const [name, n, setup, upd] of SHOTS[city]) {
    if (only && !only.split(',').includes(name)) continue;
    const t0 = Date.now();
    try { await p.evaluate(`(${setup})()`); } catch (e) { console.log(name, 'setup failed', e.message.slice(0, 300)); continue; }
    const st = await p.evaluate(() => [__api.player.mode, __api.player.x.toFixed(1), __api.player.z.toFixed(1), __ctx.__rideMsg || '']);
    fs.mkdirSync(`shots/${name}`, { recursive: true });
    for (let i = 0; i < n; i++) fs.writeFileSync(`shots/${name}/${String(i).padStart(4, '0')}.jpg`, await frame(p, `() => (${upd})(${i})`));
    console.log(name, 'done', st.join(' '), ((Date.now() - t0) / 1000).toFixed(0) + 's');
  }
  await b.close();
})();
