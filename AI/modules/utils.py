import os
import random
import torch
import torchaudio
import torchaudio.transforms as T

torchaudio.USE_SOUNDFILE_LEGACY_INTERFACE = False

"""
-- description : 로그로 기록하기 위한 함수

-- input
    text : 로그 내용
    file_name : 저장할 로그 파일 이름
    date : 로그 기록 날짜 (YYMMDD)

-- output
    없음
"""
def logging(text: str, file_name: str, date: str):
    directory = date + '_log'
    if not os.path.exists(f'./log/{directory}'):
        os.makedirs('/test')

    with open(f'./log/{directory}/{file_name}' ,'a') as f:
        f.write(text + '\n')




"""
-- description : 오디오 파일 전처리 관련 클래스
"""
class AudioPreprocessing():
    def __init__(self, audio_standard_length: int):
        self.audio_standard_length = audio_standard_length

    """
    -- description : 음성 파일 로드 함수

    -- input
        file_path : 음성 파일 상대 경로
        audio_standard_length : 음성 패딩 기준 길이

    -- output
        result : 음성 패딩 기준 길이만큼 시작과 끝에 제로패딩이 추가된 waveform
        sample_rate : sample_rate
    """
    def get_speech(self, file_path):
        waveform, sample_rate = torchaudio.backend.soundfile_backend.load(file_path)

        length = waveform.size(1)
        result = torch.zeros((1, self.audio_standard_length))
        idx = (self.audio_standard_length - waveform.size(1)) // 2

        result[0, idx:idx+length] = waveform

        return result, sample_rate 

    """
    -- description : mel-spectrogram 변환 함수

    -- input
        audio_path : 음성 파일 상대 경로
        audio_standard_length : 음성 패딩 기준 길이

    -- output
        True : 참
        melspec.numpy() : 변형된 mel-spectrogram 이 numpy 형태로 변환된 값
    """
    def make_melspectogram(self, file_path):
        waveform, sample_rate = self.get_speech(file_path)

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

        return True, melspec.numpy()