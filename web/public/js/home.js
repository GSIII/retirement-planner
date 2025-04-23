const amount = localStorage.getItem('retirementAmount');
const pensionGap = localStorage.getItem('pensionGap');
const totalAmount = Number(amount) + Number(pensionGap);
document.getElementById('retirement-result').innerText = `필요한 자금은 ${formatCurrency(totalAmount)} 입니다.`;
const pensionAmount = localStorage.getItem('pensionAmount');
document.getElementById('pension-amount').innerText = `${formatCurrency(pensionAmount)}`;
const currentAge = localStorage.getItem('currentAge');
const retirementAge = localStorage.getItem('retirementAge');
const monthlyNeedAmount = Math.floor(totalAmount /((retirementAge-currentAge) *12));
document.getElementById('monthly-requireAmount').innerText = `${formatCurrency(monthlyNeedAmount)}`;


function formatCurrency(value) {
  return Number(value).toLocaleString('ko-KR') + '원';
}


const AGE_GROUP = [
  { label: '20·30대', minAge: 20, maxAge: 39, value: 21.97 },
  { label: '40대', minAge: 40, maxAge: 49, value: 20.96 },
  { label: '50대', minAge: 50, maxAge: 59, value: 33.52 },
  { label: '60대', minAge: 60, maxAge: 69, value: 23.55 }
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
console.log(adjusted)

const ctx = document.getElementById('donutChart').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: adjusted.map(item => item.label),
    datasets: [{
      data: adjusted.map(item => item.percentage),
      backgroundColor: ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2'],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
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