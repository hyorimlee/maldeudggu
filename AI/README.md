# AI

## 🎈Result

<img src="https://user-images.githubusercontent.com/42627507/163181048-cdb991e3-52b5-48e4-bcac-2134d65869e2.png" height="400">
<br><br>

웹서버에서 모델을 실행하기 위해 지연 시간이 짧은 <span style="color: #FB7D1E; font-weight: 700;">MobileNet V2</span>를 선택했고<br>
100 회 연속 요청 시 평균 지연시간은 **1.77초**로 ESNet(3.77초)과 비교했을 때 <span style="color: yellow; font-weight: 700;">약 63%</span>정도 빠른 추론 속도를 보였습니다.

---

## 🔍Dataset

![Dataset](https://user-images.githubusercontent.com/42627507/163181454-6b977046-b5ba-4494-bdfc-8fd6e7207b8f.png)

<br>

활용한 데이터는 **한국어 음성 대화 데이터**와 **한국어 방언 발화 데이터**로<br>
각각 약 5초, 6초 정도의 길이를 가지고있습니다.

---

## 🦾Model

| **MobileNetV2** | **ESNet** |
| :-----------------: | :-----------------: |
| <img src="https://user-images.githubusercontent.com/42627507/163181653-056b2aa0-a679-4948-914a-e0ac263979c6.png" height="500"> | <img src="https://user-images.githubusercontent.com/42627507/163181784-f37ad24f-463d-41ff-98d9-d1d72439b6bc.png" height="500"> |
| ＊ 정확도를 약간 포기하고, Cost를 상당히 줄인 모델 <br> * 논문에서 줄어든 정확도 대비 (1.1%), 속도는 약 8~9배 빨라짐 | * Feature Extraction (Encoder), Semantic Segmentation (Decoder)으로 이루어진 모델 |

---

## 👽Preprocessing

### Random Cutting, Zero Padding

<img src="https://user-images.githubusercontent.com/42627507/163182109-5da374e9-4c14-4a1e-99f2-9c94a5e30f43.png" width="400">

- AI 학습을 위해선 음성의 길이가 길 경우 Random Cutting 적용
- 음성의 길이가 짧을 경우 Zero Padding 적용

### Mel Spectogram

<img src="https://user-images.githubusercontent.com/42627507/163182404-4c1a4c5d-a7ee-4cfe-a8b4-b2f46dfa289e.png" width="400">

- 숫자로 이루어진 학습용 데이터 Melspectogram으로 변환

---

## 🎃Spec Augmentation

<img src="https://user-images.githubusercontent.com/42627507/163182550-af922bc4-0d59-4e22-a7e5-7fc191d3bccc.png" height="300">

- 시간대, 주파수 마스킹을 통해 다양한 상황을 학습할 수 있도록 적용

