from django.shortcuts import render, redirect
from .models import *
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CaseSerializer, SentenceSerializer
from .models import *

# Create your views here.

@api_view()
def image_list(request):
    """
    image_list = Case.objects.filter(image_url__isnull=False)
    serializer = CaseSerializer(image_list, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    """

def count_participant(request):
    """
    tb_case에서 result != Null 인 데이터 개수
    """
    return

def start_test(request):
    """
    - tb_case에 튜플 생성
    - 케이스 pk와 랜덤 문장 리스트 반환
    """
    return

def save_audio(request):
    """
    case pk, sentence pk 받아서 오디오 저장
    *이름형식
    case pk 이름의 폴더 아래에, 날짜시각, sentence pk, 확장자로 이루어진 파일
    저장된 audio pk 리턴
    """
    return

def get_result(request):
    """
    case pk 받고, 오디오 재사용 동의여부 받기 (저장은 기본값!)
    case pk에 해당하는 오디오파일 뽑아서 모델에 돌리고 / 로컬 스토리지에서 한번에 받고
    case pk 에 해당하는 결과 반환하며 tb_case에 결과값 저장 (리스트 형태. 저장시 string)
    """
    return

def save_image(request):
    """
    클라이언트에서 firebase 이미지 url과 case pk 주면, 저장(patch)
    ok message (+ 결과값) 반환
    """
    return