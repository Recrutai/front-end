var modal = document.getElementById("salaryModal");
var btn = document.getElementById("applyBtn");
var span = document.getElementsByClassName("close")[0];
var submitBtn = document.getElementById("submitSalaryBtn");

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

submitBtn.onclick = function () {
  var expectedSalary = parseFloat(
    document.getElementById("expectedSalary").value
  );
  var vacancyId = btn.getAttribute("data-vacancy-id");

  if (isNaN(expectedSalary) || expectedSalary <= 0) {
    alert("Por favor, informe um valor válido para a expectativa salarial.");
    return;
  }

  applyForVacancy(vacancyId, expectedSalary);

  modal.style.display = "none";
};
