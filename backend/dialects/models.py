from django.db import models

# Create your models here.
class Case(models.Model):
    image_url = models.URLField()
    result = models.CharField(max_length=128)
    sentences = models.ManyToManyField('Sentence', through='Audio')
    # Case 인스턴스 case에 sentence s1 추가해줄 때: case.sentences.add(s1)


class Sentence(models.Model):
    sentence = models.CharField(max_length=64)


class Audio(models.Model):
    audio_path = models.FileField()
    created_at = models.DateTimeField(auto_now_add=True)
    sentence = models.ForeignKey(Sentence, on_delete=models.CASCADE)
    case = models.ForeignKey(Case, on_delete=models.CASCADE)

