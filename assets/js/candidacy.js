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
  //var vacancyId = btn.getAttribute("data-vacancy-id");

  if (isNaN(expectedSalary) || expectedSalary <= 0) {
    alert("Por favor, informe um valor válido para a expectativa salarial.");
    return;
  }

  modal.style.display = "none";
};

function getDataForm(id) {
  return document.getElementById(id).value;
}

function getVacancyDetails() {
  const params = new URLSearchParams(window.location.search);
  const vacancyId = params.get("id");

  if (!vacancyId) {
    document.getElementById("vacancyDetails").innerHTML =
      "ID da vaga não encontrado.";
    return;
  }

  const url = `http://localhost:8080/api/v1/vacancies/${vacancyId}`;
  fetch(url)
    .then((response) => response.json())
    .then((vacancy) => {
      const detailsContainer = document.getElementById("vacancyDetails");
      detailsContainer.innerHTML = `
            <h2>${vacancy.title}</h2>
            <p><strong>Descrição:</strong> ${vacancy.description}</p>
            <p><strong>Modelo de Trabalho:</strong> ${vacancy.workModel}</p>
            <p><strong>Salário Médio:</strong> R$ ${vacancy.salary},00</p>
            <p><strong>Candidaturas:</strong> ${vacancy.applications}</p>
            <p><strong>Vagas:</strong> ${vacancy.positions}</p>
          `;

      // const applyBtn = document.getElementById("applyBtn");
      // applyBtn.onclick = () => applyForVacancy(vacancyId);
    })
    .catch((error) => {
      document.getElementById("vacancyDetails").innerHTML =
        "Não foi possível carregar os detalhes da vaga."
      console.error("Erro ao buscar detalhes da vaga:", error);
    });
}

async function applyForVacancy(url, data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  console.log(data)

  const response = await fetch(url, options)
  console.log(response)

  if(response.ok) {
    alert("Candidatura enviada com sucesso!");
    window.location.href = "home.html";
  }
  else {
    alert("Não foi possível enviar a candidatura.");
    console.error("Erro ao enviar candidatura:", error);
    window.location.href = "home.html";
  }
}

const formApplication = document.getElementById("formApplication");
formApplication.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = {
    candidateId: parseInt(sessionStorage.getItem("userId")),
    vacancyId: parseInt(getUrlParameter("id")),
    expectedSalary: parseInt(getDataForm("expectedSalary"))
  };
  const url = "http://localhost:8080/api/v1/applications";
  applyForVacancy(url, data);

})
