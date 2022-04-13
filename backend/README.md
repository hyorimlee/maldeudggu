# Backend

## 🧣ERD

![ERD](https://user-images.githubusercontent.com/42627507/163178479-4e68b652-86da-4a46-afe8-fedd62768444.png)

--- 

## 💡API 명세
|번호| 기능 | METHOD | URI | PARAMETERS |
|:----:|:------:|:------:|:------:|:------:|
| 1 | 공유 이미지 목록 조회 | `GET` | <code>api/v1/dialects/<mark>shared/</mark></code> | |
| 2 | 테스트 참가 인원 | `GET` | <code>api/v1/dialects/<mark>participant/</mark></code> | |
| 3 | 테스트 시작 | `POST` | <code>api/v1/dialects/<mark>start/</mark></code> | |
| 4 | 테스트 문장 정보 | `GET` | <code>api/v1/dialects/<mark>sentence/{sentence_pk}</mark></code> | |
| 5 | 음성 파일 전송 | `POST` | <code>api/v1/dialects/<mark>{case_pk}/</mark></code> | sentence=`sentence_pk` |
| 6 | 테스트 결과 조회 | `GET` | <code>api/v1/dialects/<mark>{case_pk}/result/</mark></code> | reuse=True, reuse=False |
| 7 | 캐릭터 이미지 저장 | `PATCH` | <code>api/v1/dialects/<mark>{case_pk}/image/</mark></code> | |
| 8 | 설문 정보 저장 | `POST` | <code>api/v1/dialects/<mark>{case_pk}/survey/</mark></code> | |
| 9 | 이미지 내려받기 | `GET` | <code>api/v1/dialects/<mark>{case_pk}/download/</mark></code> | |
| 10 | 사용자 이미지 확인 | `GET` | <code>api/v1/dialects/<mark>{case_pk}/my/</mark></code> | |

--- 

## 🎡CI/CD

<img align = "right" src="https://velog.velcdn.com/images/soover/post/e6896a09-5802-46dc-af32-15af096e9123/Jenkins.png" width="150">

### Jenkins

Jenkins를 활용하여 ~~

<br>
<br>

<img align = "right" src="https://blog.kakaocdn.net/dn/H8U2C/btrcQfxb7XO/LtSpjuVBVUJ1DN6DDsbHLK/img.png" width="150">

### Docker

Docker를 활용하여 ~~


