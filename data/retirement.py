import pandas as pd
file_path = 'retirement.csv'
df = pd.read_csv(file_path, header=[0, 1])

# 1. 60세 이상 생활비 분포
age = df[df[("구분별(2)", "구분별(2)")] == "60세 이상"]
income_columns = [col for col in df.columns if col[0] == '2024']

income_labels = [col[1] for col in income_columns]

age_expense = pd.Series(age.iloc[0][income_columns].values, index=income_labels)

print("60세 이상 생활비 분포:")
print(age_expense)
print('-' * 50)

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

print("생활비별 소득 분포 (전체 인구):")
print(expense_by_income)