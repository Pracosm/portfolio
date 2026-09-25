import sys, asyncio, certifi
certifi.where = lambda: '/root/.ccr/ca-bundle.crt'
import edge_tts
async def main(voice, text, out, rate='+0%', pitch='+0Hz'):
    await edge_tts.Communicate(text, voice, rate=rate, pitch=pitch).save(out)
if __name__ == '__main__':
    v, t, o = sys.argv[1:4]; r = sys.argv[4] if len(sys.argv) > 4 else '+0%'; p = sys.argv[5] if len(sys.argv) > 5 else '+0Hz'
    import time
    for k in range(6):
        try: asyncio.run(main(v, t, o, r, p)); break
        except Exception as e:
            if k == 5: raise
            time.sleep(2 * 2 ** k)
