document.addEventListener("DOMContentLoaded", function () {
  getAllVacancys();
});

function getDataForm(id) {
  return document.getElementById(id).value;
}

async function createVacancy(vacancyData, url) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vacancyData),
  });
  console.log(vacancyData);
  console.log(response);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    window.location.href = "home.html";
  } else if (response.status === 404) {
    document.getElementById("div-erro").style.visibility = "visible";
    let erro = document.getElementById("erro");
    erro.innerHTML = "Membro não encontrado!";
  } else {
    document.getElementById("div-erro").style.visibility = "visible";
    let erro = document.getElementById("erro");
    erro.innerHTML = "Erro ao cadastrar a vaga!";
  }
}

const formVacancy = document.getElementById("vacancyForm");
formVacancy.addEventListener("submit", function (event) {
  event.preventDefault();

  const userId = localStorage.getItem("userId");

  const dataForm = {
    title: getDataForm("title"),
    description: getDataForm("description"),
    workModel: getDataForm("workModel"),
    avgSalary: parseInt(getDataForm("avgSalary")),
    positions: parseInt(getDataForm("positions")),
    recruiterId: 1,
    publisherId: 1,
  };

  const url = "http://localhost:8080/api/vacancies";
  createVacancy(dataForm, url);
});

function getAllVacancys() {
  const url = "http://localhost:8080/api/vacancies";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const cardsContainer = document.querySelector(".cards");
      cardsContainer.innerHTML = "";

      if (data.length === 0) {
        cardsContainer.innerHTML = `
          <div class="no-data">
            <p>Nenhuma vaga disponível no momento.</p>
          </div>
        `;
      } else {
        data.forEach((vacancy) => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <h3>${vacancy.title}</h3>
            <p><strong>Descrição:</strong> ${vacancy.description}</p>
            <p><strong>Modelo de Trabalho:</strong> ${vacancy.workModel}</p>
            <p><strong>Salário Médio:</strong> ${vacancy.avgSalary}</p>
            <p><strong>Posições:</strong> ${vacancy.positions}</p>
          `;
          cardsContainer.appendChild(card);
        });
      }
    })
    .catch((error) => {
      alert("Não foi possível buscar os dados!");
      console.error(error);
    });
}

function getVacancyByTitle() {
  let title = document.getElementById("search");
  const url = `http://localhost:8080/api/vacancies?search=${title}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Sucesso!");
    })
    .catch((error) => {
      alert("Não possível buscar os dados!");
      console.error(error);
    });
}
