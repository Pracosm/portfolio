# Gulmohar Local: Instagram reel

`gulmohar-local-reel.mp4`: 28 s, 1080×1920, 30 fps, H.264 + AAC, **with voiceover**. Ready to upload as a Reel.
`gulmohar-local-reel-music-only.mp4`: same cut without voiceover, for use with a trending sound.
`CAPTION.md`: post caption and hashtags.

## How it was made (`src/`)
1. **Footage**: `shots.js` / `fix.js` drive the live game (gulmohar-local.pages.dev) in headless Chromium.
   They freeze the game loop and step it frame by frame through `window.__api.step()`, so the footage is smooth even with software WebGL.
   Shots: planet orbit, orbit→street dive, Charni Road platform, riding the local, auto ride, giant wheel, monsoon, night, Bengaluru metro and more.
2. **Edit**: `compose.html` is a frame-accurate compositor (captions, beat punches, flashes, instax polaroids, tweet card). `compose.js` screenshots it frame by frame.
3. **Music**: `music.py` synthesises a 120 BPM track (kick/clap/dhol/phrygian pluck) with whooshes, impacts and shutter clicks on the cuts.
4. **Voiceover**: `vo_lines.json` holds the script with a start time per line. `vo_build.py` voices each line with edge-tts (`en-US-AvaMultilingualNeural`, +12% rate; pass another voice name as the first argument) through `tts.py`, trims the silence, and places each line at its cut without overlaps.
   Mix: the music is ducked under the voice with `sidechaincompress`, then loudness is normalised to -14 LUFS (`vo_mix.py out.mp4`).
5. `ffmpeg -framerate 30 -i frames/%05d.jpg -i music.wav -c:v libx264 -crf 25 -tune grain -c:a aac out.mp4`

Needs: `npm i playwright @fontsource/{anton,permanent-marker,noto-sans-devanagari,noto-sans-kannada,space-mono}`, `pip install numpy scipy imageio-ffmpeg edge-tts`.
