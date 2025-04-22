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