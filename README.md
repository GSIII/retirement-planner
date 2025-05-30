## 📝 프로젝트 소개
은퇴 자산 시뮬레이션은 개인이 은퇴 후 필요한 생활자금을 예측하고, 노후 준비 상태를 점검할 수 있도록 돕는 도구입니다. 
사용자는 현재 나이, 은퇴를 원하는 나이, 은퇴 후 원하는 삶의 수준(풍족하게, 평범하게 등)을 입력하면, 이에 따라 예상되는 연금 수령액과 자산을 바탕으로 은퇴에 필요한 자금 규모를 계산합니다. 
이를 통해 자신의 준비 수준을 확인하고, 부족한 부분에 대해 미리 대비할 수 있습니다.

## 💡 프로젝트 배경
국민연금의 고갈 시점이 2055년 전후로 전망되면서 개인의 노후 재정 자립이 점점 더 중요해지고 있습니다. 
그러나 현실에서는 많은 사람들이 은퇴 후 자신에게 필요한 자금 규모를 알지 못하며, 앞으로 얼마를 더 벌어야 하는지도 불확실한 경우가 많습니다. 
이러한 상황에서 체계적인 은퇴 자산 시뮬레이션의 필요성이 더욱 커지고 있습니다.

## 🔧 Stack
### Frontend(Web)

- Language : HTML, CSS, JavaScript

### Backend

- Language : JavaScript, Python
- Library & Framework : Node.js, Express, FastAPI
- Database : MongoDB
  
### Data Analysis
- Language & Tools: Python, pandas, matplotlib

### Development Environment
- OS: Linux(Ubuntu)

## 프로젝트 아키텍처
<img src="https://github.com/user-attachments/assets/8c1d6a50-f0bf-4fb9-9330-c2e974aa8438" width="600" height="400"/>

## 📊 데이터 분석
### 연금
예측을 위해서는 납입 인구 추이, 정부 정책 변화, 수령 조건 개편, 기금 운영 수익률 등 다양한 요소를 고려해야 하지만, 이러한 요소들은 불확실성이 크고 정확한 데이터를 확보하기 어려워 분석에 제약이 있었습니다.
이에 따라 본 분석에서는 연금 수령이 증가하기 시작한 2005년부터 2023년까지의 연금 증가 추세에 초점을 맞추어 데이터를 분석하였습니다.
#### 비선형 보간 방식
이 방법은 데이터를 보간할 때 선형적인 추세가 아닌, 보다 복잡한 곡선을 이용해 추세를 근사할 수 있습니다. 

#### 랜덤 노이즈 추가
예측 모델에서 불확실성을 고려하고, 보다 현실적인 범위의 결과를 얻는 데 유용할 수 있습니다.
<img src="https://github.com/user-attachments/assets/fa1bf958-e0d9-4185-9c9f-ff541b9d0deb" width="600" height="250"/>

### 자산
#### 은퇴 이후 적정 생활비
은퇴 후 적정 생활비를 기준으로 구간을 나눈 뒤, 평균 수준은 '평범한 삶', 상위 4%는 '풍족한 삶'으로 정의하여 각 구간별 자산과 추가 수입 필요성을 분석했습니다. 이를 통해 연금 수령 패턴과 소비·저축 성향을 반영한 맞춤형 자산 분석을 제공했습니다.
<img src="https://github.com/user-attachments/assets/439e5fa0-3f97-41a1-a9c7-4278a190b341" width="600" height="250"/>


### 연령별 월평균 저축금액
연령별 월평균 가계수지 데이터를 기반으로 소득에서 지출을 뺀 금액을 저축으로 보고, 현재부터 은퇴까지 필요한 자산을 모으기 위한 연령별 저축 비율을 계산했습니다.

<img src="https://github.com/user-attachments/assets/69542e8b-2157-42c6-bcf4-35fb2a64b105" width="400" height="250"/>


## 🧩 화면
### 랜딩페이지
<img src="https://github.com/user-attachments/assets/87855bd0-aa68-4e24-bdcf-01ef2cf74a7b" width="250">
<img src="https://github.com/user-attachments/assets/6680149e-27c0-4823-b0dc-3fe76943b23e" width="250">
<img src="https://github.com/user-attachments/assets/0d3b2cef-4745-47a9-96a7-1fc36414b5a2" width="250">

랜딩페이지는 사용자가 서비스의 목적과 기능을 직관적으로 이해하고, CTA(Call to Action) 버튼을 통해 사용자가 즉시 분석을 시작할 수 있습니다.

### 입력 화면
<img src="https://github.com/user-attachments/assets/1840430c-5e9b-45b6-8318-0179d62184b4" width="300">

사용자는 간단한 정보를 입력하는 것만으로 분석을 시작할 수 있습니다.<br>
- 현재 나이, 은퇴 목표 나이
- 원하는 삶의 스타일 (예: 평범하게, 여유롭게 등)

## 📈 분석 결과
분석 결과는 `Chart.js` 라이브러리를 활용해 시각화하였습니다.
<img src="https://github.com/user-attachments/assets/c6da1a09-53f4-499c-a0f8-065b011187a5" height="300">

90세까지 필요한 자금을 계산한 결과를 보여줍니다.
이를 바탕으로, 사용자가 현재 나이부터 은퇴 시점까지 매달 모아야 할 금액도 함께 산출합니다.
그래프는 60세 이상 연령대의 생활비 분포를 나타냅니다.

<img src="https://github.com/user-attachments/assets/bc548f14-4682-4655-b049-5e5942e39f90" height="300">

65세부터 사용자가 매월 수령할 수 있는 예상 은퇴 자금을 제시합니다.


<img src="https://github.com/user-attachments/assets/b78a41d0-d4e5-4047-a33a-41e228c5af78" height="300">

90세까지 필요한 자금을 기반으로, 사용자의 현재 연령대부터 은퇴 희망 연령대까지 각 시기별로 적립해야 할 저축 비율을 시각적으로 제공합니다.

<img src="https://github.com/user-attachments/assets/32cc4778-49d0-4a24-96b6-106d788fad1f" height="300">

사용자가 입력한 삶의 스타일과 대비되는 시나리오를 함께 제시합니다. 예를 들어, 평범한 삶을 선택했다면 풍족한 삶을 선택했을 때의 결과를, 풍족한 삶을 선택했다면 평범한 삶을 선택했을 때의 결과를 보여줍니다.

