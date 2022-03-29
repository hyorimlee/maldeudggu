from django.shortcuts import get_list_or_404, get_object_or_404
from .models import *
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ImageListSerializer, AudioQuerySerializer, ReuseQuerySerializer,StartBodySerializer
from .models import *
import random
from rest_framework.decorators import api_view #api docs
from rest_framework.response import Response #api docs
from drf_yasg.utils import swagger_auto_schema

from .audio_ai import inference

@api_view()
def get_images(request):
    cases = get_list_or_404(Case, image_url__isnull=False)
    serializer = ImageListSerializer(cases, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


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

# @swagger_auto_schema(method='post',query_serializer=StartQuerySerializer)
@swagger_auto_schema(method='post', request_body=StartBodySerializer)
@api_view(['POST'])
def start_test(request):
    """
    - tb_case에 튜플 생성
    - 케이스 pk와 랜덤 문장 리스트 반환

    """
    case = Case(nickname=request.data['nickname'])
    case.save()
    
    # 랜덤 문장 리스트
    all_sentences = Sentence.objects.all()
    if len(list(all_sentences)) <5 : 
        return Response("sentences are less than 5",status=status.HTTP_404_NOT_FOUND)
    random_list = random.sample(list(all_sentences), 5) # 5개로 가정
    data = {
        'case_id': case.pk,
        'sentences': random_list
    }
    return Response(data, status=status.HTTP_201_CREATED)


@swagger_auto_schema(method='post',query_serializer=AudioQuerySerializer)
@api_view(['POST'])     # request.FILES 사용하려면 POST 방식이어야 함
def save_audio(request, case_pk):
    """
    case pk, sentence pk 받아서 오디오 저장
    case pk 이름의 폴더 아래에, 날짜시각, sentence pk, 확장자로 이루어진 파일
    저장된 audio pk 리턴

    ** 오디오 저장 방법
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
        'case_id': case_pk,
        'audio_id': audio.pk
    }
    return Response(data, status=status.HTTP_201_CREATED)


@swagger_auto_schema(method='get',query_serializer=ReuseQuerySerializer)
@api_view(['GET'])
def get_result(request, case_pk):
    """
    1) case pk 받고, 오디오 재사용 동의여부 받기 (저장은 기본값!)
    2) case pk에 해당하는 오디오파일 뽑아서 모델에 돌리고 / 로컬 스토리지에서 한번에 받고
    3) case pk 에 해당하는 결과 반환하며 tb_case에 결과값 저장 (리스트 형태. 저장시 string)
    """
    # 1)
    case = get_object_or_404(pk=case_pk)
    case.reuse = request.GET.get('reuse')
    case.save()
    # 2)`,`
    audio_objs = case.audio_set.all()
    audio_files = []
    for audio_obj in audio_objs:
        audio_files.append(audio_obj.audio_path)
    
    # 테스트 필요
    result = inference(audio_files)
    
    # 3)
    case.result = ' '.join(result)
    case.save()
    data = {
        'case_id': case.pk,
        'result': result
    }
    return Response(data,status=status.HTTP_200_OK)


@api_view(['PATCH'])
def save_image(request, case_pk):
    """
    클라이언트에서 firebase 이미지 url과 case pk 주면, 저장(patch)
    ok message (+ 결과값) 반환
    """
    case = get_object_or_404(pk=case_pk)
    case.image_url = request.GET.get('image_url')   # image_url이라는 이름으로 받는다고 가정
    case.save()
    data = {
        'case_id': case.pk,
        'image_url': case.image_url
    }
    return Response(data, status=status.HTTP_200_OK)