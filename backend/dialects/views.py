from django.shortcuts import get_list_or_404, get_object_or_404
from .models import *
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CaseSerializer, SentenceSerializer, ImageListSerializer
from .models import *
import random
from pathlib import Path
from django.core.files import File
import datetime

# Create your views here.

@api_view()
def get_images(request):
    cases = get_list_or_404(Case, image_url__isnull=False)
    # cases = Case.objects.filter(image_url__isnull=False)
    serializer = ImageListSerializer(cases, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    """
    image_list = Case.objects.filter(image_url__isnull=False)
    serializer = CaseSerializer(image_list, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    """

@api_view()
def count_participant(request):
    """
    tb_case에서 result != Null 인 데이터 개수
    """
    num_participant = Case.objects.filter(result__isnull=False).count()
    data = {
        'count': num_participant
    }
    return Response(data,status=status.HTTP_200_OK)
    
@api_view(['POST'])
def start_test(request):
    """
    - tb_case에 튜플 생성
    - 케이스 pk와 랜덤 문장 리스트 반환
    """
    serializer = CaseSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        # raise_exception=True는 기본적으로 문제 있을 경우 HTTP 400 코드를 응답
        serializer.save()
        # 랜덤 문장 리스트
        all_sentences = Sentence.objects.all()
        random_list = random.sample(list(all_sentences), 5) # 5개로 가정
        res = {
            'data': serializer.data,
            'sentences': random_list
        }
        return Response(res,status=status.HTTP_201_CREATED)

@api_view(['POST'])     # request.FILES 사용하려면 POST 방식이어야 함
def save_audio(request, case_pk):
    """
    case pk, sentence pk 받아서 오디오 저장
    *이름형식
    case pk 이름의 폴더 아래에, 날짜시각, sentence pk, 확장자로 이루어진 파일
    저장된 audio pk 리턴
    """
    case = get_object_or_404(Case, pk=case_pk)
    sentence_pk = request.GET.get('sentence')
    sentence = get_object_or_404(Sentence, pk=sentence_pk)
    case.sentences.add(sentence)
    case.save()

    audio = get_object_or_404(Audio, case=case, sentence=sentence)
    ## 테스트용
    # sentence = Sentence()
    # sentence.save()
    # audio = Audio(case=case, sentence=sentence)
    audio.audio_path = request.FILES['audio']   # 프런트에서 날짜시각, sentence_pk, 확장자로 이루어진 파일명의 'audio' 전달
    audio.save()
    data = {
        'audio_pk': audio.pk
    }
    return Response(data,status=status.HTTP_201_CREATED)

def get_result(request, case_pk):
    """
    case pk 받고, 오디오 재사용 동의여부 받기 (저장은 기본값!)
    case pk에 해당하는 오디오파일 뽑아서 모델에 돌리고 / 로컬 스토리지에서 한번에 받고
    case pk 에 해당하는 결과 반환하며 tb_case에 결과값 저장 (리스트 형태. 저장시 string)
    """
    return Response("hello get_result",status=status.HTTP_200_OK)

def save_image(request, case_pk):
    """
    클라이언트에서 firebase 이미지 url과 case pk 주면, 저장(patch)
    ok message (+ 결과값) 반환
    """
    return Response("hello save_image",status=status.HTTP_200_OK)