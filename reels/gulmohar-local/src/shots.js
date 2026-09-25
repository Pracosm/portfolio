const { open, frame } = require('./cap');
const fs = require('fs');
const HELPERS = () => {
  const A = window.__api, C = window.__ctx;
  window.__ff = (sec, dt = 1 / 30) => { const R = A.post.render; A.post.render = () => {}; A.step(Math.round(sec / dt), dt); A.post.render = R; };
  window.__key = (code, down) => window.dispatchEvent(new KeyboardEvent(down ? 'keydown' : 'keyup', { code, key: code.replace('Key', '').toLowerCase(), shiftKey: code === 'ShiftLeft' }));
  window.__inter = re => C.interactables.find(o => re.test(typeof o.label === 'function' ? o.label(C) : o.label));
  window.__reset = () => { const P = A.player; P.mode = 'walk'; P.ride = null; P.orbit.target = P.orbit.k = 0; ['KeyW', 'ShiftLeft', 'KeyA', 'KeyD'].forEach(k => window.__key(k, false)); };
  window.__tod = (t, rain = 0) => { const T = A.tod; T.t = T.target = t; T.rain = T.rainTarget = rain; T.apply(Math.max(0, t)); };
};
const SHOTS = {
  mumbai: [
    ['m_planet', 75, () => { __tod(0); const O = __api.player.orbit; O.target = O.k = 1; O.yaw = -0.4; O.pitch = 0.55; __ff(0.5); },
      i => { __api.player.orbit.yaw += 0.012; }],
    ['m_dive', 70, () => { __tod(0); __api.pose({ x: -9, z: 22.6, yaw: 2.45, pitch: 0.1 }); const O = __api.player.orbit; O.target = O.k = 1; O.yaw = 0.3; O.pitch = 0.7; __ff(0.3); O.target = 0; O.speed = 0.55; },
      i => {}],
    ['m_platform', 90, () => {
      __reset(); __tod(0);
      const tr = () => __ctx.rail.trains.find(t => t.dir === -1 && t.p.ph === 'decel' && /CHARNI/.test(t.p.stop.en) && t.cars[0].solid.x > 60 && t.cars[0].solid.x < 200);
      for (let k = 0; k < 400 && !tr(); k++) __ff(0.5);
      __api.pose({ x: -25, z: -6.4, yaw: Math.PI / 2 - 0.22, pitch: 0.02 }); __ff(0.1);
    }, i => {}],
    ['m_ride', 80, () => {
      // board whatever train is dwelling at charni on the -z track
      let t; for (let k = 0; k < 400; k++) { t = __ctx.rail.trains.find(t => t.p.ph === 'dwell' && /CHARNI/.test(t.p.stop.en) && t.p.left > 4); if (t) break; __ff(0.5); }
      const d = __ctx.rail.doorWorld(t, 3, __ctx.rail.CAR.DOORS[0]);
      __api.pose({ x: d.x, z: t.track.z + t.track.side * (__ctx.rail.CAR.HW + 0.6), yaw: t.track.side > 0 ? Math.PI : 0 });
      __api.step(1, 1 / 30);
      const b = __inter(/^Board/); b.fn(__ctx);
      for (let k = 0; k < 60 && t.p.ph !== 'cruise'; k++) __ff(0.5);
      __ff(1);
      __api.player.yaw = (t.track.side > 0 ? 0 : Math.PI) - t.dir * 0.55; __api.player.pitch = -0.03;
    }, i => {}],
    ['m_auto', 80, () => {
      __reset(); __tod(0.15);
      __api.pose({ x: -40, z: 22.6, yaw: Math.PI, pitch: 0 }); __ff(0.2);
      __ctx.keys.get('KeyV')(__ctx); __api.step(1, 1 / 30);
      __inter(/Get in the auto/).fn(__ctx); __api.player.yaw = 0.15;
      __key('KeyW', true); __ff(2.5);
    }, i => {}],
    ['m_wheel', 70, () => {
      __key('KeyW', false); __reset(); __tod(0);
      __api.pose({ x: 160.9, z: 125.5, yaw: 0, pitch: 0 }); __api.step(1, 1 / 30);
      __inter(/giant wheel/).fn(__ctx); __ff(9);
      __api.player.yaw = 0.8; __api.player.pitch = -0.25;
    }, i => { __api.player.yaw += 0.004; }],
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
  ],
  bangalore: [
    ['b_planet', 75, () => { __tod(0); const O = __api.player.orbit; O.target = O.k = 1; O.yaw = 0.6; O.pitch = 0.5; __ff(0.5); },
      i => { __api.player.orbit.yaw += 0.012; }],
    ['b_platform', 90, () => {
      __reset(); __tod(0);
      __api.pose({ x: 10, z: 6, yaw: 1.57, pitch: 0.05 });
      const R = __ctx.rail; const has = () => R && R.trains.some(t => Math.abs(t.cars[0].solid.x - 10) < 140 && t.p.ph === 'decel');
      for (let k = 0; k < 400 && R && !has(); k++) __ff(0.5);
    }, i => {}],
    ['b_ride', 80, () => {
      const b = () => __inter(/^Board/);
      __ctx.__rideMsg = 'none';
      if (__ctx.rail) {
        let t; for (let k = 0; k < 400; k++) { t = __ctx.rail.trains.find(t => t.p.ph === 'dwell' && Math.abs(t.p.stop.x) < 60 && t.p.left > 4); if (t) break; __ff(0.5); }
        if (t) {
          const d = __ctx.rail.doorWorld(t, 1, __ctx.rail.CAR.DOORS[0]);
          __api.pose({ x: d.x, z: t.track.z + t.track.side * (__ctx.rail.CAR.HW + 0.6), yaw: 0 }); __api.step(1, 1 / 30);
          if (b().enabled(__ctx)) { b().fn(__ctx); __ctx.__rideMsg = 'boarded'; }
          for (let k = 0; k < 60 && t.p.ph !== 'cruise'; k++) __ff(0.5);
          __ff(1); __api.player.yaw = (t.track.side > 0 ? 0 : Math.PI) - t.dir * 0.55;
        }
      }
    }, i => {}],
    ['b_lake', 75, () => { __reset(); __tod(0.05); __api.pose({ x: 470, z: -60, yaw: 2.4, pitch: 0.05 }); __ff(1); __key('KeyW', true); __ff(0.3); }, i => { __api.player.yaw += 0.003; }],
    ['b_avenue', 75, () => { __key('KeyW', false); __reset(); __tod(0.2, 1); __api.pose({ x: 180, z: 40, yaw: 0.3, pitch: 0.1 }); __ff(1); __key('KeyW', true); __ff(0.3); }, i => {}],
    ['b_auto', 80, () => {
      __key('KeyW', false); __reset(); __tod(0.1);
      __api.pose({ x: -104, z: 15.6, yaw: Math.PI, pitch: 0 }); __ff(0.2);
      __ctx.keys.get('KeyV')(__ctx); __api.step(1, 1 / 30);
      __inter(/Get in the auto/).fn(__ctx); __api.player.yaw = 0.15;
      __key('KeyW', true); __ff(2.5);
    }, i => {}],
    ['b_night', 75, () => { __key('KeyW', false); __reset(); __tod(1); __api.pose({ x: -104, z: 15.6, yaw: 1.8, pitch: 0.1 }); __ff(1); __key('KeyW', true); __ff(0.3); }, i => {}],
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
