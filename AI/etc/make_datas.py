import os
from copy import deepcopy
# 데이터 셔플
from random import shuffle

DATA_DIR = '/data/team2'

try: 
    with open('raw_data/final_dataset', 'r') as f:
        labels = [l.rstrip().split('\t') for l in f.readlines()]
except:
    with open(DATA_DIR+'/metadata', 'r') as f:
        labels = [l.rstrip().split('\t') for l in f.readlines()]

    with open(DATA_DIR+'/metadata2', 'r') as f:
        labels.extend([l.rstrip().split('\t') for l in f.readlines()])

    dummy_path = '/audio/Training/data/remote/PROJECT/AI학습데이터/KoreanSpeech/data'
    with open('raw_data/dummy_datas', 'r') as f:
        # data/team2 이후 기존 경로 더하기 (audio~)
        labels.extend(map(lambda i : [dummy_path+i[0], i[1]], [l.rstrip().split('\t') for l in f.readlines()]))

    # 데이터 저장
    with open('raw_data/final_dataset', 'w') as f:
        f.write('\n'.join(['\t'.join(l) for l in labels]))

shuffle(labels)

label_counter = { i: 0 for i in range(6) }

for _, label in labels:
    label_counter[int(label)]+=1

MIN_LABEL_LENGTH = min(list(label_counter.values())[:-1])
MIN_LABEL_LENGTH

print(label_counter)
print(MIN_LABEL_LENGTH)

# 라벨 데이터를 1000개씩 균등하게 분배
MAX_LENGTH = 1000
DATASET_SIZE = MIN_LABEL_LENGTH//MAX_LENGTH
label_source = {i:[] for i in range(6)}
label_dataset = [deepcopy(label_source) for _ in range(DATASET_SIZE)]
label_idxs = {i:0 for i in range(6)}


for audio_path, label in labels:
    label = int(label)
    
    if label == 9:
        continue
    idx = label_idxs[label]
    try:
        label_dataset[idx][label].append(audio_path)
        if len(label_dataset[idx][label]) >= MAX_LENGTH:
            label_idxs[label] +=1
    except:
        pass

TRAIN_SIZE = 100
TEST_SIZE = 120

temp_dataset = []
for i in range(TRAIN_SIZE):
    for label in label_dataset[i]:
        for audio_path in label_dataset[i][label]:
            temp_dataset.append(audio_path+'\t'+str(label))

# train용 오디오 데이터 경로 + 라벨 임시 저장
with open('./audio_data_train', 'w', encoding='utf8') as f:
    f.write('\n'.join(temp_dataset))

    
temp_dataset = []
for i in range(TRAIN_SIZE, TEST_SIZE):
    for label in label_dataset[i]:
        for audio_path in label_dataset[i][label]:
            temp_dataset.append(audio_path+'\t'+str(label))

# test용 오디오데이터 경로 + 라벨 임시 저장
with open('./audio_data_test', 'w', encoding='utf8') as f:
    f.write('\n'.join(temp_dataset))