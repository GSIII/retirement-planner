document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("pensionForm");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const age = document.getElementById("age");
      const expense = document.getElementById("expense");
      const retireAge = document.getElementById("retireAge");
  
      let valid = true;

      valid &= validateInput(age, "age-group", "나이를 입력해주세요");
      valid &= validateInput(expense, "expense-group", "지출액을 입력해주세요");
      valid &= validateInput(retireAge, "retireAge-group", "은퇴 나이를 입력해주세요");

      if (valid) {
        // Submit form or do further calculations here.
      }
    });

    function validateInput(inputElement, groupId, errorMessage) {
      const group = document.getElementById(groupId);
      const errorText = group.querySelector(".error-text");
  
      if (!inputElement.value.trim()) {
        group.classList.add("error");
        errorText.innerHTML = errorMessage;
        return false;  
      } else {
        group.classList.remove("error");
        errorText.innerHTML = "";
        return true;
      }
    }
  });
