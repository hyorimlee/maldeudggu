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

말듣꾸는 CI/CD 시스템을 구축하였습니다. 

push event 이후 자동적으로 빌드 & 최종 시스템 로드까지 이루어집니다.
<img align = "right" src="https://velog.velcdn.com/images/soover/post/e6896a09-5802-46dc-af32-15af096e9123/Jenkins.png" width="150">

### Jenkins

Jenkins와 Gitlab의 repository를 연결하였습니다.

webhook 기능을 이용하여, develop branch에 push를 하면 지정해 놓은 일을 수행합니다.

Jenkins 서버에서 git clone한 후, ssh를 통해 aws ec2 서버에 파일을 이동시킵니다.

이후, ec2 서버에서 미리 구현된 shell script를 실행하여 빌드&배포 작업을 완료합니다.

[shell scrip](../deploy.sh) 서버에 구동 중인 백엔드/프론트엔드 서버를 종료하고, 새로 빌드한 것을 서버에 구동시키는 과정이 구현되어 있습니다.

