import json, subprocess, sys
import numpy as np
from scipy.io import wavfile
FF='/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2'
plan=json.load(open('vo_plan.json'))
args=[FF,'-loglevel','error','-y']
for st,f in plan: args+=['-i',f]
fc=''.join(f'[{i}]adelay={int(st*1000)}|{int(st*1000)},apad=whole_dur=28[a{i}];' for i,(st,f) in enumerate(plan))
fc+=''.join(f'[a{i}]' for i in range(len(plan)))+f'amix=inputs={len(plan)}:normalize=0,atrim=0:28[m]'
subprocess.run(args+['-filter_complex',fc,'-map','[m]','-ac','1','-ar','44100','vo_track.wav'],check=True)
CH=("[1]highpass=f=90,equalizer=f=3000:t=q:w=1.2:g=2,acompressor=threshold=-20dB:ratio=4:attack=5:release=80:makeup=4,aformat=channel_layouts=stereo,asplit=2[v][sc];"
    "[0]volume=0.8[mu];[mu][sc]sidechaincompress=threshold=0.015:ratio=14:attack=10:release=300[duck]")
subprocess.run([FF,'-loglevel','error','-y','-i','music.wav','-i','vo_track.wav','-filter_complex',CH,'-map','[duck]','stem_music.wav','-map','[v]','stem_voice.wav'],check=True)
_,m=wavfile.read('stem_music.wav'); _,v=wavfile.read('stem_voice.wav'); m=m.astype(float).mean(1); v=v.astype(float).mean(1); SR=44100
db=lambda x:20*np.log10(np.sqrt(np.mean(x**2))+1e-9)

subprocess.run([FF,'-loglevel','error','-y','-i','music.wav','-i','vo_track.wav','-filter_complex',CH+";[duck][v]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[out]",'-map','[out]','-ar','44100','mix.wav'],check=True)
subprocess.run([FF,'-loglevel','error','-y','-i','reel.mp4','-i','mix.wav','-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',sys.argv[1]],check=True)
print('wrote', sys.argv[1])
