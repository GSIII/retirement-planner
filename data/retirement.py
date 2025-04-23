import pandas as pd
import matplotlib.pyplot as plt
from pymongo import MongoClient

client = MongoClient('mongodb://192.168.1.20:27017/')
db = client['retirement']
collection = db['retirement']

file_path = 'retirement.csv'
df = pd.read_csv(file_path, header=[0, 1])

plt.rcParams['font.family'] = 'NanumGothic'

# 1. 60세 이상 생활비 분포
age = df[df[("구분별(2)", "구분별(2)")] == "60세 이상"]
income_columns = [col for col in df.columns if col[0] == '2024']

income_labels = [col[1] for col in income_columns]

# 문자열을 숫자로 변환 (예: '12,345' -> 12345)
age_expense_raw = age.iloc[0][income_columns]
age_expense = pd.to_numeric(age_expense_raw.replace({',': ''}, regex=True))

# 라벨 추가
age_expense.index = income_labels

age_expense_df = age_expense.reset_index()
age_expense_df.columns = ['Category', 'Expense']

age_expense_dict = age_expense_df.to_dict(orient='records')

collection.insert_many(age_expense_dict)

print("데이터가 MongoDB에 성공적으로 삽입되었습니다.")

# 원하는 형식으로 CSV 파일로 저장
filename = '60s_expense_2024.csv'
age_expense_df.to_csv(filename, index=False)

# 그래프 그리기
plt.figure(figsize=(12, 6))
age_expense.plot(kind='bar', color='#3b0fd3', title='60세 이상 생활비 분포')
plt.ylabel("비율(%)", fontsize=12)
plt.xticks(rotation=45, ha='right')


filename='60s_expense_2024.png'
plt.savefig(filename, dpi=400, bbox_inches='tight')
plt.show()


# 2. 생활비별 소득 분포 (전체 인구)
income_rows = df[df[("구분별(1)", "구분별(1)")] == "소득별"]
income_index = income_rows[("구분별(2)", "구분별(2)")].str.strip()
expense_labels = [col[1] for col in income_columns]
expense_by_income = income_rows[income_columns]
expense_by_income.index = income_index
expense_by_income.columns = expense_labels
expense_by_income = expense_by_income.T 

# 불필요한 컬럼 제거
if ('구분별(2)', '구분별(2)') in expense_by_income.columns:
    expense_by_income = expense_by_income.drop(('구분별(2)', '구분별(2)'), axis=1)

# 컬럼명을 단일 인덱스로 변환
expense_by_income.columns = [str(col) for col in expense_by_income.columns]

expense_by_income = expense_by_income.apply(pd.to_numeric, errors='coerce')


print("생활비별 소득 분포 (전체 인구):")
print(expense_by_income)

expense_by_income.to_csv('expense_by_income.csv', index=True)

# 그래프 그리기
plt.figure(figsize=(18, 8))
expense_by_income.plot(kind='bar', color=['r','g','b','y','c'], title='생활비별 소득 분포 (전체 인구)')
plt.ylabel("비율(%)", fontsize=12)
plt.xticks(rotation=45, ha='right')


filename='expense_by_income_2024.png'
plt.savefig(filename, dpi=400, bbox_inches='tight')
plt.show()
