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