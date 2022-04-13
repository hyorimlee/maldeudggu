import os


# with open('raw_data/usable_audios', 'r') as f:
#     usable_audios = [l.rstrip().split('\t') for l in f.readlines()]


with open('raw_data/filter_usable_audios', 'r') as f:
    filtered_audios = [l.rstrip().split('\t') for l in f.readlines()]

ZIP_BASE_DIR = '/data/team2/audio/'

EXTRACT_BASE_DIR = ZIP_BASE_DIR + 'Training/data/remote/PROJECT/AI학습데이터/KoreanSpeech/data'

# idx = 0
# for audio_path, label in usable_audios:
#     if audio_path == filtered_audios[idx][0]:
#         idx += 1
#     else:
#         os.remove(EXTRACT_BASE_DIR+audio_path)
        
final_dummy_data = []
for audio_path, label, _ in filtered_audios:
    if label == '1':
        final_dummy_data.append(audio_path + '\t0')
    else:
        try:
            os.remove(EXTRACT_BASE_DIR+audio_path)
        except:
            pass

with open('raw_data/dummy_datas', 'w') as f:
    f.write('\n'.join(final_dummy_data))