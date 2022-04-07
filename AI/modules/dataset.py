import torch
from torch.utils.data import Dataset
class DialectAudioDataset(Dataset):
    def __init__(self, label_file, root_dir, make_melspectogram=None, transform=None, target_transform=None):
        with open(label_file, 'r', encoding='UTF-8') as f:
            self.audio_datas = [l.rstrip().split('\t') for l in f.readlines()]
        self.root_dir = root_dir
        self.transform = transform
        self.make_melspectogram = make_melspectogram
        self.target_transform = target_transform

    def __len__(self):
        return len(self.audio_datas)
    
    def __getitem__(self, idx):
        audio_path = self.root_dir + self.audio_datas[idx][0]
        # audio melspectogram
        # image = read_image(img_path)
        # audio = get_speech(self.root_dir, self.audio_datas[idx][0])
        
        # print(self.audio_datas[idx])
        
        # 경로상 오류있음, 처리
        audio_path = audio_path.replace('06.경제', '6.경제')

        audio = self.make_melspectogram(audio_path)[1]
        
        # label은 0부터 시작
        label = torch.tensor([int(self.audio_datas[idx][1])], dtype=torch.long)

        # zero padding, noise padding 필요
        if self.transform:
            audio = self.transform(audio)
        if self.target_transform:
            label = self.target_transform(label)

        return audio, label