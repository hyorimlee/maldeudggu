from django.shortcuts import get_list_or_404, get_object_or_404
from .models import *
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ImageListSerializer, AudioQuerySerializer, ReuseQuerySerializer, StartBodySerializer, SentenceSerializer
from .models import *
import random
from rest_framework.decorators import api_view #api docs
from rest_framework.response import Response #api docs
from drf_yasg.utils import swagger_auto_schema

from .audio_ai.inference import inference
from pydub import AudioSegment
from django.http import HttpResponse
import urllib.request
from PIL import Image
from io import BytesIO


@api_view()
def get_sentences(request):
    sentences = get_list_or_404(Sentence)
    serializer = SentenceSerializer(sentences, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view()
def get_sentence(request, sentence_pk):
    sentence = get_object_or_404(Sentence, pk=sentence_pk)
    serializer = SentenceSerializer(sentence)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view()
def get_images(request):
    cases = get_list_or_404(Case.objects.order_by('-pk'), image_url__isnull=False)[:12]
    serializer = ImageListSerializer(cases, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view()
def get_image(request, case_pk):
    case = get_object_or_404(Case, pk=case_pk)
    serializer = ImageListSerializer(case)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view()
def count_participant(request):
    num_participant = Case.objects.filter(result__isnull=False).count()
    data = {
        'count': num_participant
    }
    return Response(data,status=status.HTTP_200_OK)

@swagger_auto_schema(method='post', request_body=StartBodySerializer)
@api_view(['POST'])
def start_test(request):
    case = Case(nickname=request.data['nickname'])
    case.save()
    
    # 랜덤 문장 리스트
    all_sentences = Sentence.objects.all()
    if len(list(all_sentences)) <5 : 
        return Response("sentences are less than 5",status=status.HTTP_404_NOT_FOUND)
    random_list = random.sample(list(all_sentences), 5) # 5개로 가정
    serializer = SentenceSerializer(random_list, many=True)
    data = {
        "case_id": case.pk,
        "sentences": serializer.data
    }
    return Response(data, status=status.HTTP_201_CREATED)

from moviepy.editor import AudioFileClip
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
    audio.audio_path = request.FILES.get('audio')   # 프런트에서 날짜시각, sentence_pk, 확장자로 이루어진 파일명의 'audio' 전달    
    audio.save()
    try:
        audio_path = str(audio.audio_path.name)
        if 'webm' in audio_path:
            file_ext = 'webm'
            audioSegment = AudioSegment.from_file(audio.audio_path, 'webm')
            new_file_path = 'media/' + audio_path.replace('webm', 'wav')
            audioSegment.export(new_file_path, format='wav')
        elif 'mp4' in audio_path:
            file_ext = 'mp4'
            sound = AudioFileClip('media/' + audio_path)
            new_file_path = 'media/' + audio_path.replace('mp4', 'wav')
            sound.write_audiofile(new_file_path, 16000, 2, 2000)

    except:
        data = {
            'message': 'audio file error'
        }
        audio.audio_path = None
        audio.save()
        return Response(data, status=status.HTTP_400_BAD_REQUEST)
    
    audio.audio_path.name = audio_path.replace(file_ext, 'wav')
    audio.save()
    
    data = {
        'case_id': case_pk,
        'audio_id': audio.pk
    }
    return Response(data, status=status.HTTP_201_CREATED)


@swagger_auto_schema(method='get',query_serializer=ReuseQuerySerializer)
@api_view(['GET'])
def get_result(request, case_pk):
    # 1)
    case = get_object_or_404(Case, pk=case_pk)
    case.reuse = request.GET.get('reuse')
    case.save()
    
    # 결과가 이미 저장되어있을 경우 다시 계산하지 않음
    if case.result:
        data = {'case_id': case.pk, 'result': {}}
        for r in case.result.split('\t'):
            k, v = r.split()
            data['result'][k] = v
        return Response(data, status=status.HTTP_200_OK)

    # 2)
    audio_objs = case.audio_set.all()
    audio_files = []
    for audio_obj in audio_objs:
        audio_files.append('media/'+audio_obj.audio_path.name)
    result = inference(audio_files)
    
    # 3)

    # 가중치 주기 
    remain = 100 - sum(result.values())
    
    for k in result:
        result[k] += remain
        break
    case.result = '\t'.join([f'{k} {v}' for k, v in result.items()])
    case.save()
    

    data = {
        'case_id': case.pk,
        'result': result
    }
    return Response(data,status=status.HTTP_200_OK)


@api_view(['PATCH'])
def save_image(request, case_pk):
    case = get_object_or_404(Case, pk=case_pk)
    case.image_url = request.data['image_url']   # image_url이라는 이름으로 받는다고 가정
    case.save()
    data = {
        'case_id': case.pk,
        'image_url': case.image_url
    }
    return Response(data, status=status.HTTP_200_OK)


@api_view(['POST'])
def save_survey(request, case_pk):
    survey = Survey(case=Case(pk=case_pk))
    print(request.data)
    survey.gender = request.data['gender']
    survey.age = request.data['age']
    survey.born_in = request.data['birthLocation']
    survey.lived_in = request.data['location']
    survey.save()
    data = {
        'case_id': case_pk,
        'survey': survey.pk
    }
    return Response(data, status=status.HTTP_201_CREATED)

import os
def download_image(request, case_pk):
    case = get_object_or_404(Case, pk=case_pk)
    img_name = f'{case.pk}_img.png'
    urllib.request.urlretrieve(case.image_url, img_name)

    img = Image.open(img_name)
    os.remove(img_name)
    img_file = BytesIO()
    img.save(img_file, 'png')
    image_file_size = img_file.tell()
    

    response = HttpResponse()
    response['content-type'] = 'image/png'
    response['Content-Length'] = image_file_size
    response['Content-Disposition'] = "attachment; filename=%s" % (f'{case.pk}_img.png')
    img.save(response, "png")
    return response
