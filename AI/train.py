# Modules, Configs, Utils
import os
from datetime import datetime, date
from tqdm import tqdm

from modules import *
from modules.utils import *
from modules.dataset import DialectAudioDataset
from modules.model import CustomMobilenetV2

# os.environ['CUDA_LAUNCH_BLOCKING'] = "1"
# os.environ["CUDA_VISIBLE_DEVICES"] = "0"

# 서버 경로
ZIP_BASE_DIR = '/data/team2/'
EXTRACT_BASE_DIR = ZIP_BASE_DIR + 'audio/Training/data/remote/PROJECT/AI학습데이터/KoreanSpeech/data'

# 클래스 개수
NUM_CLASSES = 6
AUDIO_STANDARD_LENGTH = 128000

# 오디오 전처리 인스턴스
make_mel = AudioPreprocessing(AUDIO_STANDARD_LENGTH).make_melspectogram

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
    global eval_dict
    for data, target in test_loader:

        data = data.to(device)
        target = target.to(device)

        output = model(data)

        pred = get_likely_index(output)
        correct += number_of_correct(pred, target)

        eval_dict = count_correct(eval_dict, pred, target)

        pbar.update(pbar_update)

    logging(f"\nTest Epoch: {epoch}\tAccuracy: {correct}/{len(test_loader.dataset)} ({100. * correct / len(test_loader.dataset):.0f}%)\n", 'test_log', today)
    
    logging('Precision : %.4f / Recall: %.4f / F1 Score : %.4f \n'%(precision(eval_dict), recall(eval_dict), f1score(eval_dict)), 'test_log', today)
    return correct

def save_model(model):
    torch.save(model.state_dict(), './model_state_dict.pt')

def load_model(model):
    model.load_state_dict(torch.load('../model_state_dict.pt'))
    return model


# precision 1이라고 예측 한 것 중 실제 1인 것
def precision(eval_dict):
    return sum([a/b if b else 0 for a, b, _ in eval_dict.values()]) / len(eval_dict)

# recall 실제 1인 것 중에서 1로 예측한 것
def recall(eval_dict):
    return sum([a/b if b else 0 for a, _, b in eval_dict.values()]) / len(eval_dict)
    
# 2 * precision * recall / (precision + recall)
# all f1 = sum of f1 score / len
def f1score(eval_dict):
    recalls = [a/b if b else 0 for a, _, b in eval_dict.values()]
    precisions = [a/b if b else 0 for a, b, _ in eval_dict.values()]
    f1_scores = []
    for i, k in enumerate(eval_dict):
        if (recalls[i] + precisions[i]):
            f1_score = 2 * recalls[i] * precisions[i] / (recalls[i] + precisions[i])
        else:
            f1_score = 0
        f1_scores.append(f1_score)
    
    return sum(f1_scores) / len(f1_scores)

def count_correct(eval_dict, pred, target):
    # correct, for precision, for recall
    for i in range(NUM_CLASSES):
        this_label = torch.ones(pred.size(0), dtype=torch.long) * i
        this_label = this_label.to(device)
        # 예측한것중에 label 인 것
        aa = this_label.eq(pred)
        # 실제 label 인 것
        bb = this_label.eq(target.squeeze())
        
        # 둘다 true 인 것
        correct_tensor = torch.where(aa == True, 1, 0) + torch.where(bb == True, 1, 0)
        eval_dict[i][0] += torch.where(correct_tensor==2, 1, 0).sum().item()

        # precision
        eval_dict[i][1] += aa.sum().item()
        # recall
        eval_dict[i][2] += bb.sum().item()

    return eval_dict

import random
# 인자를 여러개로 바꾸어가면서 처리해봐야 할 듯
time_masking = T.TimeMasking(time_mask_param=40)
freq_masking = T.FrequencyMasking(freq_mask_param=40)

def custom_aug(spec):
    random_value = random.random()
    # time masking
    if random_value > 0.5 :
        spec = time_masking(spec)

    random_value = random.random()
    # freq masking
    if random_value > 0.5:
        spec = freq_masking(spec)

    return spec

if __name__ == '__main__':
    today = ''.join(str(date.today()).split('-'))[2:]       # YYMMDD

    # 데이터 로드
    training_data = DialectAudioDataset('./audio_data_train', ZIP_BASE_DIR, make_mel, transform=custom_aug)
    testing_data = DialectAudioDataset('./audio_data_test', ZIP_BASE_DIR, make_mel)

    # 데이터 로더
    train_loader = DataLoader(training_data, batch_size=128, shuffle=True, num_workers=8)
    test_loader = DataLoader(testing_data, batch_size=128, shuffle=True, num_workers=8)

    # 모델 로드
    model = CustomMobilenetV2(NUM_CLASSES)

    # Loss함수 cross entropy loss
    creterion = nn.CrossEntropyLoss()

    # optimizer adam
    optimizer = optim.Adam(model.parameters(), lr=0.01, weight_decay=0.0001)
    scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=6, gamma=0.1)  # reduce the learning after 7 epochs by a factor of 10

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    log_interval = 200
    n_epoch = 20

    pbar_update = 1 / (len(train_loader) + len(test_loader))
    losses = []

    max_correct = 0
    
    # 평가지표
    eval_dict = {i:[0,0,0] for i in range(NUM_CLASSES)}
    with tqdm(total=n_epoch) as pbar:
        for epoch in range(1, n_epoch + 1):
            train(model, epoch, log_interval)
            correct = test(model, epoch)

            if max_correct < correct:
                save_model(model)
                max_correct = correct

            scheduler.step()
