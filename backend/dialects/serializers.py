from rest_framework import serializers
from .models import Case, Sentence

class CaseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Case
        fields = '__all__'


class SentenceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sentence
        fields = '__all__'


class ImageListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Case
        exclude = ('result', 'sentences',)


class AudioQuerySerializer(serializers.Serializer):
    sentence = serializers.IntegerField(required=True)


class ReuseQuerySerializer(serializers.Serializer):
    reuse = serializers.BooleanField(required=True)


class StartBodySerializer(serializers.Serializer):
    nickname = serializers.CharField(required=True, help_text="닉네임")