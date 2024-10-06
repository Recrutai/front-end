import { getDataForm, loadCompanies, getSelectedOption, translate } from "../js/uteis.js";

loadCompanies("institutionId")

document.addEventListener("DOMContentLoaded", function () {
  // carrega todas as vagas aqui
  getAllVacancys();

  // carrega as vagas conforme o titulo procurado
  document
    .getElementById("search-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      getVacancyByTitle();
    });
});

document
  .getElementById("opportunityType")
  .addEventListener("change", filterVacancies);

let allVacancies = [];
// // recupera vagas cadastradas
getAllVacancys();
function getAllVacancys() {
  const url = "http://localhost:8080/api/v1/vacancies";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      allVacancies = data;
      filterVacancies();
    })
    .catch((error) => {
      const cardsContainer = document.querySelector(".cards");
      cardsContainer.innerHTML = "";
      cardsContainer.innerHTML = `
    <div></div>
      <div class="no-data">
        <p>Nenhuma vaga disponível no momento.</p>
      </div>
    `;
      console.log(error);
    });
}

function filterVacancies() {
  const selectedValue = document.getElementById("opportunityType").value;
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.innerHTML = "";

  const filteredVacancies = allVacancies.filter(
    (vacancy) => vacancy.workModel === selectedValue
  );

  if (filteredVacancies.length === 0) {
    cardsContainer.innerHTML = `
    <div></div>
      <div class="no-data">
        <p>Nenhuma vaga disponível no momento.</p>
      </div>
    `;
  } else {
    filteredVacancies.forEach((vacancy) => {
      const truncatedTitle =
        vacancy.title.length > 15
          ? `${vacancy.title.substring(0, 10)}...`
          : vacancy.title;

      const card = document.createElement("div");
      const workModel = translate(vacancy.workModel);
      card.className = "card";
      card.innerHTML = `
       <div class="card-content">
        <h3>${truncatedTitle}</h3>
        <p><strong>Modelo de Trabalho:</strong> ${workModel}</p>
        <p><strong>Salário Médio:</strong> R$ ${vacancy.salary},00</p>
        <p><strong>Local:</strong> ${vacancy.location}</p>
      </div>

      <a href="vacancy-details.html?id=${vacancy.id}" class="btn-details">
          <i class="fas fa-search"></i>
        </a>
   
      `;
      cardsContainer.appendChild(card);
    });
  }
}

// criar vaga atraves do modal
async function createVacancy(vacancyData, url) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vacancyData),
  });
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    window.location.href = "home.html";
  }
  else if(response.status === 400) {
    alert('Corrija os dados do formulário!')
  }
  else {
    console.error(response);
  }
}

const formVacancy = document.getElementById("vacancyForm");
formVacancy.addEventListener("submit", function (event) {
  event.preventDefault();

  const userId = sessionStorage.getItem("userId");

  const dataForm = {
    title: getDataForm("title"),
    organizationId: parseInt(getSelectedOption("institutionId")),
    description: getDataForm("description"),
    employmentType: getSelectedOption("employmentType"),
    workModel: getSelectedOption("workModel"),
    location: {
      city: getSelectedOption("cities-Select"),
      state: getSelectedOption("states-Select"),
      country: "Brasil"
    },
    salary: parseInt(getDataForm("salary")),
    positions: parseInt(getDataForm("positions")),
    recruiterId: parseInt(userId),
    publishedById: parseInt(userId),
  };

  const url = "http://localhost:8080/api/v1/vacancies";
  console.log(dataForm);
  createVacancy(dataForm, url);
});

// recupera vaga por titulo
function getVacancyByTitle() {
  let title = document.getElementById("search").value.trim();
  const url = title
    ? `http://localhost:8080/api/v1/vacancies?title=${title}`
    : "http://localhost:8080/api/v1/vacancies";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const cardsContainer = document.querySelector(".cards");
      cardsContainer.innerHTML = "";

      if (!data || (Array.isArray(data) && data.length === 0)) {
        cardsContainer.innerHTML = `
        <div></div>
          <div class="no-data">
            <p>Nenhuma vaga disponível no momento.</p>
          </div>
        `;
      } else {
        const vacancies = Array.isArray(data) ? data : [data];
        vacancies.forEach((vacancy) => {
          const truncatedTitle =
            vacancy.title.length > 15
              ? `${vacancy.title.substring(0, 15)}...`
              : vacancy.title;

          const card = document.createElement("div");
          const workModel = translate(vacancy.workModel);
          card.className = "card";
          card.innerHTML = `
            <div class="card-content">
              <h3>${truncatedTitle}</h3>
              <p><strong>Modelo de Trabalho:</strong> ${workModel}</p>
              <p><strong>Salário Médio:</strong> R$ ${vacancy.salary},00</p>
              <p><strong>Vagas:</strong> ${vacancy.positions || "N/A"}</p>
            </div>

            <a href="vacancy-details.html?id=${vacancy.id}" class="btn-details">
                <i class="fas fa-search"></i>
              </a>
          `;
          cardsContainer.appendChild(card);
        });
      }
    })
    .catch((error) => {
      const cardsContainer = document.querySelector(".cards");
      cardsContainer.innerHTML = "";

      cardsContainer.innerHTML = `
        <div></div>
          <div class="no-data">
            <p>Nenhuma vaga disponível no momento.</p>
          </div>
        `;
      console.error(error);
    });
}

//Recupera vaga em detalhes e se candidata 
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
      let workModel = translate(vacancy.workModel.trim());
      detailsContainer.innerHTML = `
            <h2>${vacancy.title}</h2>
            <p><strong>Descrição:</strong> ${vacancy.description}</p>
            <p><strong>Modelo de Trabalho:</strong>${workModel}</p>
            <p><strong>Salário Médio:</strong> R$ ${vacancy.avgSalary},00</p>
            <p><strong>Candidaturas:</strong> ${vacancy.applications}</p>
            <p><strong>Vagas:</strong> ${vacancy.positions}</p>
          `;
    })
    .catch((error) => {
      document.getElementById("vacancyDetails").innerHTML =
        "Não foi possível carregar os detalhes da vaga."
      console.error("Erro ao buscar detalhes da vaga:", error);
    });
}
