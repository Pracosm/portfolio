# Gulmohar Local: Instagram reel

`gulmohar-local-reel.mp4`: 28 s, 1080×1920, 30 fps, H.264 + AAC. Ready to upload as a Reel.
`CAPTION.md`: post caption and hashtags.

## How it was made (`src/`)
1. **Footage**: `shots.js` / `fix.js` drive the live game (gulmohar-local.pages.dev) in headless Chromium.
   They freeze the game loop and step it frame by frame through `window.__api.step()`, so the footage is smooth even with software WebGL.
   Shots: planet orbit, orbit→street dive, Charni Road platform, riding the local, auto ride, giant wheel, monsoon, night, Bengaluru metro and more.
2. **Edit**: `compose.html` is a frame-accurate compositor (captions, beat punches, flashes, instax polaroids, tweet card). `compose.js` screenshots it frame by frame.
3. **Music**: `music.py` synthesises a 120 BPM track (kick/clap/dhol/phrygian pluck) with whooshes, impacts and shutter clicks on the cuts.
4. `ffmpeg -framerate 30 -i frames/%05d.jpg -i music.wav -c:v libx264 -crf 24 -tune grain -c:a aac out.mp4`

Needs: `npm i playwright @fontsource/{anton,permanent-marker,noto-sans-devanagari,noto-sans-kannada,space-mono}`, `pip install numpy scipy imageio-ffmpeg`.
