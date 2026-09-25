import numpy as np, json, sys
from scipy.signal import butter, sosfilt
from scipy.io import wavfile
SR = 44100; BPM = 120; B = 60 / BPM
DUR = float(sys.argv[1]) if len(sys.argv) > 1 else 32.0
ev = json.load(open('sfx.json')) if len(sys.argv) > 2 else {}
N = int(DUR * SR); L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(7)
def filt(x, kind, f, order=2):
    return sosfilt(butter(order, f, btype=kind, fs=SR, output='sos'), x)
def put(sig, t, gain=1.0, pan=0.0):
    i = int(t * SR)
    if i >= N: return
    s = sig[:N - i] * gain
    L[i:i + len(s)] += s * (1 - max(0, pan)); R[i:i + len(s)] += s * (1 + min(0, pan))
def env(n, a, d):
    t = np.arange(n) / SR
    return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)
def kick():
    n = int(.45 * SR); t = np.arange(n) / SR
    f = 45 + 110 * np.exp(-t / .035); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.tanh(2.2 * np.sin(ph) * np.exp(-t / .16)) * .9 + filt(rng.standard_normal(n), 'high', 2000) * env(n, 0, .004) * .3
def clap():
    n = int(.3 * SR); x = filt(rng.standard_normal(n), 'band', [900, 4000])
    e = np.zeros(n)
    for o in [0, .011, .022]: i = int(o * SR); e[i:] += env(n - i, 0, .012 if o < .02 else .09)
    return x * e * .55
def hat(open_=False):
    n = int((.22 if open_ else .05) * SR); return filt(rng.standard_normal(n), 'high', 7500) * env(n, 0, .07 if open_ else .012) * .28
def tom(f0=95, d=.18):
    n = int(.5 * SR); t = np.arange(n) / SR; f = f0 * (1 + .5 * np.exp(-t / .02))
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .001, d) * .7
def tak():
    n = int(.12 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 520 * t) * .5 + filt(rng.standard_normal(n), 'band', [1500, 5000]) * .6) * env(n, 0, .025) * .5
def nf(m): return 440 * 2 ** ((m - 69) / 12)
def bass(m, dur):
    n = int(dur * SR); t = np.arange(n) / SR
    return np.tanh(1.8 * np.sin(2 * np.pi * nf(m) * t)) * env(n, .003, dur * .6) * .5
def pluck(m, dur=.3):
    n = int(dur * SR); t = np.arange(n) / SR; f = nf(m)
    saw = 2 * ((t * f) % 1) - 1 + .5 * (2 * ((t * f * 1.005) % 1) - 1)
    return filt(saw, 'low', 3200) * env(n, .002, .11) * .16
def whoosh(d=.45, up=True):
    n = int(d * SR); x = rng.standard_normal(n); out = np.zeros(n); seg = 512
    for k in range(0, n, seg):
        p = k / n; fc = 300 + (6000 if up else 6000 * (1 - p)) * (p if up else 1)
        fc = min(max(fc, 200), 12000)
        out[k:k + seg] = filt(x[k:k + seg], 'band', [fc * .6, fc * 1.4], 1)
    return out * np.sin(np.pi * np.arange(n) / n) ** 2 * .6
def impact():
    n = int(1.4 * SR); t = np.arange(n) / SR
    return np.tanh(3 * np.sin(2 * np.pi * np.cumsum(38 + 80 * np.exp(-t / .06)) / SR) * np.exp(-t / .5)) * .8 + filt(rng.standard_normal(n), 'low', 1500) * env(n, 0, .25) * .5
def shutter():
    n = int(.14 * SR); x = filt(rng.standard_normal(n), 'band', [1200, 6000]); e = env(n, 0, .008); i = int(.06 * SR); e[i:] += env(n - i, 0, .015) * .8
    return x * e * .9
def riser(d):
    n = int(d * SR); t = np.arange(n) / SR; p = t / d
    s = np.sin(2 * np.pi * np.cumsum(200 + 1400 * p ** 2) / SR) * .12 * p ** 1.5
    return s + filt(rng.standard_normal(n), 'high', 1500) * .18 * p ** 2
# ---------- arrangement ----------
DROP = ev.get('drop', 2.0); BREAK = ev.get('break', [99, 99]); END = ev.get('end', DUR - 1.5)
# intro: tabla ticks + riser
for k in range(int(DROP / (B / 2))):
    put(tak(), k * B / 2, .5 + .5 * k / 8, pan=.3 if k % 2 else -.3)
put(riser(DROP), 0, 1.2)
riff = [62, 65, 63, 62, 67, 65, 63, 62,  62, 65, 67, 69, 70, 69, 67, 65]   # D phrygian-dominant-ish
bassline = [38, 38, 41, 43]
t = DROP; step = 0
while t < END:
    inbreak = BREAK[0] <= t < BREAK[1]
    beat = step % 4
    if not inbreak or beat == 0: put(kick(), t, 1.0 if not inbreak else .7)
    if beat in (1, 3) and not inbreak: put(clap(), t, 1.0)
    for h in range(2): put(hat(open_=(h == 1 and beat == 3)), t + h * B / 2, 1, pan=.25)
    # dhol-ish
    put(tom(90), t + B * .75, .7, pan=-.2); put(tak(), t + B * .5, .8, pan=.3)
    if beat == 3: put(tak(), t + B * .25, .6, pan=.3)
    bar = step // 4
    if beat == 0: put(bass(bassline[bar % 4], B * 2), t, 1)
    for h in range(2):
        m = riff[(step * 2 + h) % 16]
        if not inbreak or h == 0: put(pluck(m + 12, .35), t + h * B / 2, .9 if not inbreak else .5, pan=-.15 if h else .15)
    t += B; step += 1
put(impact(), DROP, 1.2)
for c in ev.get('whoosh', []): put(whoosh(.35), c - .3, .9)
for c in ev.get('impact', []): put(impact(), *(c if isinstance(c, list) else [c, .8]))
for c in ev.get('shutter', []): put(shutter(), c, 1.0)
# outro tail
put(impact(), END, .6)
mix = np.stack([L, R], 1)
fade = np.ones(N); fo = int(1.2 * SR); fade[-fo:] = np.linspace(1, 0, fo)
mix *= fade[:, None]
mix = np.tanh(mix / np.max(np.abs(mix)) * 1.6) * .89
wavfile.write('music.wav', SR, (mix * 32767).astype(np.int16))
print('ok', DUR)
