async function getRetirementAmount() {
  const retirement_age = document.getElementById('retireAge').value;
  const monthly_expense = document.getElementById('expense').value;

  try {
    const res = await fetch(`/api/retirement-need?retirement_age=${retirement_age}&monthly_expense=${monthly_expense}`);
    const data = await res.json();
    console.log(data)
  } catch(err) {
    console.error(err)
  }
}


