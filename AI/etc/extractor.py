import os
import tarfile
from glob import glob

ZIP_BASE_DIR = '/data/team2/audio/'

EXTRACT_BASE_DIR = ZIP_BASE_DIR + 'Training/data/remote/PROJECT/AI학습데이터/KoreanSpeech/data'

train_zips = os.listdir(ZIP_BASE_DIR + 'Training')
valid_zips = os.listdir(ZIP_BASE_DIR + 'Validation')

train_label_zips = filter(lambda x: '[라벨]' in x, train_zips)

for train_label_zip in train_label_zips:
    train_audio_zip = train_label_zip.replace('[라벨]', '[원천]')
    try:
    # if '[원천]3.일상안부_dialog_01.tar.gz' in train_audio_zip:
        label_tar = tarfile.open(ZIP_BASE_DIR + 'Training/' + train_label_zip)
        label_tar.extractall(ZIP_BASE_DIR + 'Training/')
        label_tar.close()

        # 라벨 압축 파일만 삭제
        # os.remove(ZIP_BASE_DIR + 'Training/' + train_label_zip)

        audio_tar = tarfile.open(ZIP_BASE_DIR + 'Training/' + train_audio_zip)
        audio_tar.extractall(ZIP_BASE_DIR + 'Training/')
        audio_tar.close()
    except:
        pass

    # break