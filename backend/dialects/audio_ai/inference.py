import torch
import torchaudio
import torchaudio.transforms as T
import torch.nn as nn
import soundfile
import random

import numpy as np

# print('현재 디렉토리 = 최상위 프로젝트 폴더 backend')

# 음성 데이터 경로
NUM_CLASSES = 6

MODEL_PATH = './dialects/audio_ai/esnet/model_state_dict.pt'

# 오디오 파일 기준 길이
audio_standard_length = 128000

LABEL_DICT = {0: '경기', 1: '강원', 2: '충청', 3: '경상', 4: '전라', 5: '제주'}

# 오디오 파일 로드 함수
def get_speech(file_path):
    waveform, sample_rate = torchaudio.backend.soundfile_backend.load(file_path)

    length = waveform.size(1)
    result = torch.zeros((1, audio_standard_length))
    if waveform.size(0) == 2:
        waveform = waveform[0, :].view(1, -1)
    
    if length <= audio_standard_length:
        idx = (audio_standard_length - length) // 2
        result[0, idx:idx+length] = waveform
    else:
        idx = random.randint(0, length-audio_standard_length)
        start_idx = idx
        end_idx = idx + audio_standard_length
        result[0, :] = waveform[0, start_idx:end_idx]

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
##### linear 수정
class CustomMobilenetV2(nn.Module):
    def __init__(self, num_classes):
        super(CustomMobilenetV2, self).__init__()
        mobilenet = torch.hub.load('pytorch/vision:v0.10.0', 'mobilenet_v2', pretrained=False)

        self.features = nn.Sequential(
            nn.Conv2d(in_channels=1, out_channels=3, kernel_size=(1,1)),
            *list(mobilenet.features)[:-1])
            # 인자 수 확인
        self.classifier = nn.Linear(20480, num_classes)

    def forward(self, x):
        # 인자 수 확인
        x = self.features(x).view(-1, 20480)
        x = self.classifier(x)
        return x

def load_model(model):
    model.load_state_dict(torch.load(MODEL_PATH, map_location=torch.device('cpu')))

# 계산된 결과 (1x6)에서 가장 큰 확률이 predict label
def get_likely_index(tensor):
    return tensor.argmax(dim=-1)

def inference(audiofile_path: list):
    mel_specs = tuple(map(lambda x: make_melspectogram(x), audiofile_path))
    mel_specs_dataset = torch.stack(mel_specs)

    output = model(mel_specs_dataset)
    output = output.sum(dim=0)
    min_val = output.min()
    if min_val < 0:
        output -= min_val
    output /= output.sum()
    result = {v: output[i].item() for i, v in LABEL_DICT.items()}
    return {k: int(v*100) for k, v in sorted(result.items(), key=lambda item: -item[1])[:3]}

import ssl
ssl._create_default_https_context = ssl._create_unverified_context

# 모델 생성, 메모리에 얹어놓기
# model = CustomMobilenetV2(NUM_CLASSES)

from .esnet import CustomESNet
model = CustomESNet(NUM_CLASSES)

load_model(model)
model.eval()

if __name__ == '__main__':
    # 추론 확인용 데이터
    inference_data = []
    # with open('../audio_data_test', 'r') as f:
    #     inference_data = list(map(lambda x: x.split('\t')[0], f.readlines()))[:4]


    result = inference(inference_data)