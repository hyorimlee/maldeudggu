import torch
import torchaudio
import torchaudio.transforms as T
import torch.nn as nn
import soundfile

import numpy as np


working_dir = '/home/team2/workspace'

# 서버 음성 데이터 경로 (웹서버로 코드 옮기면 웹서버에 음성파일이 저장되는 경로로 변경 필요)
ZIP_BASE_DIR = '/data/team2/audio/'
EXTRACT_BASE_DIR = ZIP_BASE_DIR + 'Training/data/remote/PROJECT/AI학습데이터/KoreanSpeech/data'

NUM_CLASSES = 6

# 오디오 파일 기준 길이
audio_standard_length = 160000

LABEL_DICT = {0: '서울,경기', 1: '강원', 2: '충청', 3: '경상', 4: '전라', 5: '제주'}

# 오디오 파일 로드 함수
def get_speech(file_path):
    waveform, sample_rate = torchaudio.backend.soundfile_backend.load(file_path)

    length = waveform.size(1)
    result = torch.zeros((1, audio_standard_length))
    idx = (audio_standard_length - waveform.size(1)) // 2

    result[0, idx:idx+length] = waveform

    return result, sample_rate 

# mel-spectrogram 변형 함수
def make_melspectogram(file_path):
    waveform, sample_rate = get_speech(file_path)

    n_fft = 512
    win_length = 512
    hop_length = 256
    n_mels = 128
    
    mel_spectrogram = T.MelSpectrogram(
        sample_rate=sample_rate,
        n_fft=n_fft,
        win_length=win_length,
        hop_length=hop_length,
        center=True,
        pad_mode="reflect",
        power=2.0,
        norm="slaney",
        onesided=True,
        n_mels=n_mels,
        mel_scale="htk",
    )

    melspec = mel_spectrogram(waveform)             # 결과값

    return melspec

# 모델 생성 클래스
class CustomMobilenetV2(nn.Module):
    def __init__(self, num_classes):
        super(CustomMobilenetV2, self).__init__()
        mobilenet = torch.hub.load('pytorch/vision:v0.10.0', 'mobilenet_v2', pretrained=False)

        self.features = nn.Sequential(
            nn.Conv2d(in_channels=1, out_channels=3, kernel_size=(1,1)),
            *list(mobilenet.features)[:-1])
        self.classifier = nn.Linear(1280*20, num_classes)

    def forward(self, x):
        x = self.features(x).view(-1, 320*4*20)
        x = self.classifier(x)
        return x

def load_model(model):
    model.load_state_dict(torch.load('../model_state_dict.pt'))

# 계산된 결과 (1x6)에서 가장 큰 확률이 predict label
def get_likely_index(tensor):
    return tensor.argmax(dim=-1)

def inference(audiofile_path: list):
    mel_specs = tuple(map(lambda x: make_melspectogram(x), audiofile_path))
    mel_specs_dataset = torch.stack(mel_specs)

    output = model(mel_specs_dataset)

    result_label = get_likely_index(output)

    result = list(map(lambda x: LABEL_DICT[x], result_label.tolist()))
    
    return result


# 추론 확인용 데이터
inference_data = []
with open('../audio_data_test', 'r') as f:
    inference_data = list(map(lambda x: x.split('\t')[0], f.readlines()))[:4]

# 모델 생성
model = CustomMobilenetV2(NUM_CLASSES)

load_model(model)
model.eval()

result = inference(inference_data)