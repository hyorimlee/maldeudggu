from django.db import models
from django.core.files.storage import FileSystemStorage

# Create your models here.
class Case(models.Model):
    nickname = models.CharField(max_length=15)
    image_url = models.URLField(null=True)
    result = models.CharField(max_length=128, null=True)
    sentences = models.ManyToManyField('Sentence', through='Audio')
    # Case 인스턴스 case에 sentence s1 추가해줄 때: case.sentences.add(s1)


class Sentence(models.Model):
    sentence = models.CharField(max_length=64)


# fs = FileSystemStorage(location='/audio')

def audio_file_path(instance, filename):
    return f'user_{instance.pk}/{filename}'

class Audio(models.Model):
    # audio_path = models.FileField(storage=fs)
    audio_path = models.FileField(upload_to=audio_file_path, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    sentence = models.ForeignKey(Sentence, on_delete=models.CASCADE)
    case = models.ForeignKey(Case, on_delete=models.CASCADE)

