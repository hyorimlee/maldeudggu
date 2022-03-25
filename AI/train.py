# Modules, Configs, Utils
import os
from datetime import datetime, date
from tqdm import tqdm

# from modules.custom.dataset import DialectAudioDataset
from modules.custom.model.mobilenetv2 import CustomModel


# 서버 경로
ZIP_BASE_DIR = '/data/team2/audio/'
EXTRACT_BASE_DIR = ZIP_BASE_DIR + 'Training/data/remote/PROJECT/AI학습데이터/KoreanSpeech/data'

# 클래스 개수
NUM_CLASSES = 6
AUDIO_STANDARD_LENGTH = 160000

# 오디오 전처리 인스턴스
make_mel = AudioPreprocessing(AUDIO_STANDARD_LENGTH).make_melspectogram

# 데이터 로드
training_data = DialectAudioDataset('./audio_data_train', EXTRACT_BASE_DIR, make_mel)
testing_data = DialectAudioDataset('./audio_data_test', EXTRACT_BASE_DIR, make_mel)

# 데이터 로더
train_loader = DataLoader(training_data, batch_size=128, shuffle=True, num_workers=8)
test_loader = DataLoader(testing_data, batch_size=128, shuffle=True, num_workers=8)

# 이름변경해야함, 모델 로드시 바로 NUM_CLASSES만 넣고 로드될 수 있도록
# 모델 로드
model = CustomModel(mobilenet, NUM_CLASSES)

# Loss함수 cross entropy loss
creterion = nn.CrossEntropyLoss()

# optimizer adam
optimizer = optim.Adam(model.parameters(), lr=0.01, weight_decay=0.0001)
scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=3, gamma=0.1)  # reduce the learning after 20 epochs by a factor of 10

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 학습함수
def train(model, epoch, log_interval):
    model.train()
    model.to(device)
    for batch_idx, (data, target) in enumerate(train_loader):
        data = data.to(device)
        target = target.to(device)

        output = model(data)

        loss = creterion(output.squeeze(), target.squeeze())

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        # print training stats
        if batch_idx % log_interval == 0:
            logging(f"Train Epoch: {epoch} [{batch_idx * len(data)}/{len(train_loader.dataset)} ({100. * batch_idx / len(train_loader):.0f}%)]\tLoss: {loss.item():.6f}", 'train_log', today)

        # update progress bar
        pbar.update(pbar_update)
        # record loss
        losses.append(loss.item())

# 맞춘 개수
def number_of_correct(pred, target):
    # count number of correct predictions
    return target.squeeze().eq(pred).sum().item()

# 계산된 결과 (1x6)에서 가장 큰 확률이 predict label
def get_likely_index(tensor):
    return tensor.argmax(dim=-1)

def test(model, epoch):
    model.eval()
    model.to(device)
    correct = 0
    for data, target in test_loader:

        data = data.to(device)
        target = target.to(device)

        output = model(data)

        pred = get_likely_index(output)
        correct += number_of_correct(pred, target)

        pbar.update(pbar_update)

    logging(f"\nTest Epoch: {epoch}\tAccuracy: {correct}/{len(test_loader.dataset)} ({100. * correct / len(test_loader.dataset):.0f}%)\n", 'test_log', today)

log_interval = 20
n_epoch = 10

pbar_update = 1 / (len(train_loader) + len(test_loader))
losses = []

with tqdm(total=n_epoch) as pbar:
    for epoch in range(1, n_epoch + 1):
        train(model, epoch, log_interval)
        test(model, epoch)
        scheduler.step()


if __name__ == '__main__':
    today = ''.join(str(date.today()).split('-'))[2:]       # YYMMDD

    pass