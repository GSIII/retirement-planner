async function getRetirementAmount() {

  const current_age = document.getElementById('age').value;
  const retirement_age = document.getElementById('retireAge').value;
  const monthly_expense = document.getElementById('expense').value;
  const quality_life = document.getElementById('quality_life').value;

  localStorage.setItem('currentAge', current_age);
  localStorage.setItem('retirementAge', retirement_age);
  localStorage.setItem('monthlyExpense', monthly_expense);
  localStorage.setItem('qualityLife', quality_life);

  try {

    let quality_life_num = 0;
    if (quality_life === 'normal') {
      quality_life_num = 750000000;
    } else {
      quality_life_num = 1200000000;
    }

    const res1 = await fetch(`/api/retirement-need?retirement_age=${retirement_age}&quality_life=${quality_life_num}`);

    const res2 = await fetch(`/api/pension_calculation`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        age: current_age
      })
    })

    const requestBody = {
      age : Number(retirement_age),
      quality_life: quality_life_num
    }

    if (quality_life ==='normal') {
      requestBody.quality_life = Number(750000000)
    } else {
      requestBody.quality_life = Number(1200000000)
    }

    const res3 = await fetch('/pension_gap',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })

    const data1 = await res1.json();
    console.log(data1)
    const data2 = await res2.json();
    const data3 = await res3.json()
    console.log(data3)

    
    localStorage.setItem('retirementAmount', data1.require_savings);
    localStorage.setItem('pensionAmount', data2.saving_pension);
    localStorage.setItem('pensionGap', data3.gap);
    window.location.href = '/home.html';
  } catch(err) {
    console.error(err)
  }
}


