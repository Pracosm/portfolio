import json, subprocess
FF='/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2'
L=json.load(open('vo_lines.json')); starts=[t for t,_ in L]+[27.6]
def dur(f):
    out=subprocess.run([FF,'-i',f],capture_output=True,text=True).stderr
    d=[x for x in out.split('\n') if 'Duration' in x][0].split()[1].rstrip(','); h,m,s=d.split(':'); return float(s)+60*float(m)
plan=[]; prev_end=0
for i,(t,txt) in enumerate(L):
    subprocess.run(['python3','tts.py','en-IN-PrabhatNeural',txt,f'vo/l{i:02d}.mp3','+20%','+2Hz'],check=True)
    subprocess.run([FF,'-loglevel','error','-y','-i',f'vo/l{i:02d}.mp3','-af','silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse','-ar','44100','-ac','1',f'vo/l{i:02d}.wav'],check=True)
    d=dur(f'vo/l{i:02d}.wav'); st=max(t,prev_end+0.06); room=starts[i+1]+0.35-st
    tempo=min(1.25,max(1.0,d/room)); nd=d/tempo
    if tempo>1.0:
        subprocess.run([FF,'-loglevel','error','-y','-i',f'vo/l{i:02d}.wav','-af',f'atempo={tempo:.3f}',f'vo/f{i:02d}.wav'],check=True)
    else:
        subprocess.run(['cp',f'vo/l{i:02d}.wav',f'vo/f{i:02d}.wav'])
    prev_end=st+nd; plan.append([st,f'vo/f{i:02d}.wav'])
    print(f'{i:2d} start {st:5.2f} dur {d:4.2f} tempo {tempo:4.2f} end {prev_end:5.2f} (next cut {starts[i+1]:5.2f}) {txt}')
json.dump(plan,open('vo_plan.json','w'))
