import torch
import torch.nn as nn

# 모델 커스터마이징
class CustomMobilenetV2(nn.Module):
    def __init__(self, num_classes):
        super(CustomMobilenetV2, self).__init__()
        mobilenet = torch.hub.load('pytorch/vision:v0.10.0', 'mobilenet_v2', pretrained=False)

        self.features = nn.Sequential(
            nn.Conv2d(in_channels=1, out_channels=3, kernel_size=(1,1)),
            *list(mobilenet.features)[:-1])
        self.classifier = nn.Linear(20480, num_classes)

    def forward(self, x):
        x = self.features(x).view(-1, 20480)
        x = self.classifier(x)
        return x