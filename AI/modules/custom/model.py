from .model.mobilenetv2 import mobilenet

# 모델 커스터마이징
class CustomMobilenetV2(nn.Module):
    def __init__(self, num_classes):
        super(CustomMobilenetV2, self).__init__()

        self.features = nn.Sequential(
            nn.Conv2d(in_channels=1, out_channels=3, kernel_size=(1,1)),
            *list(mobilenet.features)[:-1])
        self.classifier = nn.Linear(1280*20, num_classes)

    def forward(self, x):
        x = self.features(x).view(-1, 320*4*20)
        x = self.classifier(x)
        return x

class CustomESnet(nn.Module):
    def __init__(self, num_classes):
        super(CustomESnet, self).__init__()

        self.features = nn.Sequential(
            nn.Conv2d(in_channels=1, out_channels=3, kernel_size=(1,1)),
            *list(mobilenet.features)[:-1])
        self.classifier = nn.Linear(1280*20, num_classes)

    def forward(self, x):
        x = self.features(x).view(-1, 320*4*20)
        x = self.classifier(x)
        return x

class CustomFairseq(nn.Module):
    def __init__(self, num_classes):
        super(CustomFairseq, self).__init__()

        self.features = nn.Sequential(
            nn.Conv2d(in_channels=1, out_channels=3, kernel_size=(1,1)),
            *list(mobilenet.features)[:-1])
        self.classifier = nn.Linear(1280*20, num_classes)

    def forward(self, x):
        x = self.features(x).view(-1, 320*4*20)
        x = self.classifier(x)
        return x
