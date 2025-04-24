const amount = Number(localStorage.getItem('retirementAmount'));
const pensionGap = Number(localStorage.getItem('pensionGap'));
let totalAmount;

const pensionAmount = Number(localStorage.getItem('pensionAmount'));
const currentAge = Number(localStorage.getItem('currentAge'));
const retirementAge = Number(localStorage.getItem('retirementAge'));
const monthlyExpense = Number(localStorage.getItem('monthlyExpense'));

console.log(typeof(pensionGap))
console.log(typeof(amount))

if (retirementAge > 65) {
  totalAmount = pensionGap - amount
} else {
  totalAmount = amount + pensionGap
}

const monthlyNeedAmount = Math.floor(totalAmount /((retirementAge-currentAge) *12));

const qualityLife = localStorage.getItem('qualityLife');
document.getElementById('retirement-result').innerHTML = `${retirementAge}세에 은퇴 후 90세까지 필요한 자금은 <span class="highlight-money">${formatCurrency(totalAmount)}</span> 입니다.`;
document.getElementById('pension-amount').innerHTML = `<span class="highlight-money">${formatCurrency(pensionAmount)}</span>`;
document.getElementById('monthly-requireAmount').innerHTML = `월 <span class="highlight-money">${formatCurrency(monthlyNeedAmount)}</span>을 모아야합니다.`;
if (qualityLife === 'abundant') {
  document.getElementById('another-life').innerText = '평범하게 산다면?'
} else {
  document.getElementById('another-life').innerText = '풍족하게 산다면?'
}

// 원화 변경 함수
function formatCurrency(value) {
  return Number(value).toLocaleString('ko-KR') + '원';
}

// 60대 생활비 차트
document.addEventListener("DOMContentLoaded", async function () {
  const ctx = document.getElementById('barChart');

  try {
    const res = await fetch('http://192.168.1.20:8000/get-expense-data');
    const result = await res.json();
  
    const labels = result.data.map(item => item.Category);
    const expenses = result.data.map(item => item.Expense);

    new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '생활비',
        data: expenses,
        borderWidth: 1
      }]
    },
    options: {
      responsive: false, // ✅ 자동 리사이징 끄기
      maintainAspectRatio: false, // ✅ 비율 유지 안 함
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
  } catch (error) {
    console.error(error);
  }


});

// 도넛 차트
const AGE_GROUP = [
  { label: '20대', minAge: 20, maxAge: 29, value: 18.01 },
  { label: '30대', minAge: 30, maxAge: 39, value: 18.01 },
  { label: '40대', minAge: 40, maxAge: 49, value: 17.18 },
  { label: '50대', minAge: 50, maxAge: 59, value: 27.49 },
  { label: '60대 이상', minAge: 60, maxAge: 69, value: 19.31 }
]

function getAdjustedPercentagesByRetireAge(retirementAge) {
  const filtered = AGE_GROUP.filter(group => group.minAge <= retirementAge);


const sum = filtered.reduce((acc, group) => acc + group.value, 0);

return filtered.map(group => ({
  label: group.label,
  percentage: Math.round((group.value / sum) * 100)
}))
}

const adjusted = getAdjustedPercentagesByRetireAge(retirementAge);

const ctx = document.getElementById('donutChart').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: adjusted.map(item => item.label),
    datasets: [{
      data: adjusted.map(item => item.percentage),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: false, // ✅ 자동 리사이징 끄기
      maintainAspectRatio: false, // ✅ 비율 유지 안 함

    plugins: {
      legend: {
        position: 'bottom'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value}%`;
          }
        }
      }
    }
  }
});

// 다른 삶을 살 경우 필요 자금 계산
async function getAnotherLife() {
  try {
    const res1 = await fetch(`/api/retirement-need?retirement_age=${retirementAge}&quality_life=${qualityLife}`);
    const res2 = await fetch(`/api/pension_calculation`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        age: currentAge
      })
    })

    const requestBody = {
      age : Number(retirementAge),
      quality_life: qualityLife
      
    }

    if (qualityLife ==='normal') {
      requestBody.quality_life = Number(1200000000)
    } else {
      requestBody.quality_life = Number(750000000)
    }

    const res3 = await fetch('/pension_gap',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    const data1 = await res1.json();
    // console.log(data1)
    const data2 = await res2.json();
    // console.log(data2)
    const data3 = await res3.json()

    let totalAmount;

if (retirementAge > 65) {
  totalAmount = Number(data3.gap)-amount ;
  document.getElementById('another-life-totalAmount').innerHTML =
    `${retirementAge}세에 은퇴 후 필요한 자금은 <span class="highlight-money">${formatCurrency(totalAmount)}</span> 입니다.`;
} else {
  totalAmount = amount + Number(data3.gap);
  document.getElementById('another-life-totalAmount').innerHTML =
    `${retirementAge}세에 은퇴 후 필요한 자금은 <span class="highlight-money">${formatCurrency(totalAmount)}</span> 입니다.`;
}
    console.log(data3)
    
    // document.getElementById('another-life-monthlyAmount').innerHTML = `월 <span class="highlight-money">${formatCurrency(Math.floor((totalAmount) / ((retirementAge-currentAge) *12)))}</span> 모아야 합니다.`;
    const diffRaw = monthlyNeedAmount - Math.floor((totalAmount) / ((retirementAge-currentAge) *12));
    const diffText = diffRaw > 0
    ? `🎉 월 ${formatCurrency(Math.abs(diffRaw))}을 모아야 합니다.`
    : `💡 월 ${formatCurrency(Math.abs(diffRaw))}을 모아야 합니다.`
    
    document.getElementById('result-diff').innerText = diffText;

  } catch(err) {
    console.error(err)
  }
}

// 연금차트
const currentYear = new Date().getFullYear();
const expectedYear = currentYear + (retirementAge - currentAge);


const labels = [2010, 2020, 2030, 2040, 2050, 2060, 2070, 2080, 2090, 2100];
const rawData = [273227, 413290, 548049, 642514, 726322, 807095, 916840, 1019034, 1103938, 1240800];

const closestYear = labels.reduce((prev, curr) =>
  Math.abs(curr - expectedYear) < Math.abs(prev - expectedYear) ? curr : prev
);

const highlightYears = [closestYear];
const data = {
  labels: labels,
  datasets: [{
    label: '연금',
    data: rawData,
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1,

    // ✅ 하이라이트를 위한 포인트 스타일 설정
    pointBackgroundColor: labels.map(year => highlightYears.includes(year) ? 'red' : 'rgb(75, 192, 192)'),
    pointRadius: labels.map(year => highlightYears.includes(year) ? 6 : 3),
    pointBorderWidth: labels.map(year => highlightYears.includes(year) ? 2 : 1),
  }]
};

// Config for the chart
const config = {
  type: 'line',
  data: data,
  options: {
    responsive: false, // ✅ 자동 리사이징 끄기
    maintainAspectRatio: false, // ✅ 비율 유지 안 함

    scales: {
      x: {
        title: {
          display: true,
        }
      },
      y: {
        title: {
          display: true,
        }
      }
    }
  }
};


// Create the chart
const myChart = new Chart(
  document.getElementById('lineChart'),
  config
);


// 도넛 비율로 연령대별 분배 금액 계산
function getAmountPerAgeGroup(adjusted, totalAmount) {
  return adjusted.map(group => ({
    label: group.label,
    amount: Math.round((group.percentage / 100) * totalAmount)
  }));
}

const amountsByGroup = getAmountPerAgeGroup(adjusted, totalAmount);

$(document).ready(function(){
  var owl = $('.owl-carousel');
  owl.owlCarousel({
    items: 1, // 한번에 보여지는 이미지 수
    loop: false, // 항목들을 무한으로 반복하여 보여줄지 여부
    autoplay: true, // 자동으로 슬라이드 쇼를 시작할지 여부
    autoplayTimeout: 10000, // 다음 이미지로 넘어가는 시간 (단위 : 밀리초)
    autoplayHoverPause: true, // 마우스가 이미지에 위에 있을 때 자동 슬라이드를 일시중지 할지 여부
  });           
});