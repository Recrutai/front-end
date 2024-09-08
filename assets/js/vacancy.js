function getDataForm(id) {
  return document.getElementById(id).value;
}

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
// recupera vagas cadastradas
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
      card.className = "card";
      card.innerHTML = `
       <div class="card-content">
        <h3>${truncatedTitle}</h3>
        <p><strong>Modelo de Trabalho:</strong> ${vacancy.workModel}</p>
        <p><strong>Salário Médio:</strong> R$ ${vacancy.avgSalary},00</p>
        <p><strong>Vagas:</strong> ${vacancy.positions}</p>
      </div>

      <a href="vacancy-details.html?id=${vacancy.id}" class="btn-details">
          <i class="fas fa-search"></i>
        </a>
   
      `;
      cardsContainer.appendChild(card);
    });
  }
}

function getDataForm(id) {
  return document.getElementById(id).value;
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

  const userId = sessionStorage.getItem("userId");

  const dataForm = {
    title: getDataForm("title"),
    description: getDataForm("description"),
    workModel: getDataForm("workModel"),
    avgSalary: parseInt(getDataForm("avgSalary")),
    positions: parseInt(getDataForm("positions")),
    recruiterId: userId,
    publisherId: userId,
  };

  const url = "http://localhost:8080/api/v1/vacancies";
  createVacancy(dataForm, url);
});

// recupera vaga por titulo
function getVacancyByTitle() {
  let title = document.getElementById("search").value.trim();
  const url = title
    ? `http://localhost:8080/api/v1/vacancies/search?title=${encodeURIComponent(
      title
    )}`
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
          card.className = "card";
          card.innerHTML = `
            <div class="card-content">
              <h3>${truncatedTitle}</h3>
              <p><strong>Modelo de Trabalho:</strong> ${vacancy.workModel}</p>
              <p><strong>Salário Médio:</strong> R$ ${vacancy.avgSalary},00</p>
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

// recupera vaga em detalhes e se candidata
// function getVacancyDetails() {
//   const params = new URLSearchParams(window.location.search);
//   const vacancyId = params.get("id");

//   if (!vacancyId) {
//     document.getElementById("vacancyDetails").innerHTML =
//       "ID da vaga não encontrado.";
//     return;
//   }

//   const url = `http://localhost:8080/api/v1/vacancies/${vacancyId}`;
//   fetch(url)
//     .then((response) => response.json())
//     .then((vacancy) => {
//       const detailsContainer = document.getElementById("vacancyDetails");
//       detailsContainer.innerHTML = `
//             <h2>${vacancy.title}</h2>
//             <p><strong>Descrição:</strong> ${vacancy.description}</p>
//             <p><strong>Modelo de Trabalho:</strong> ${vacancy.workModel}</p>
//             <p><strong>Salário Médio:</strong> R$ ${vacancy.avgSalary},00</p>
//             <p><strong>Candidaturas:</strong> ${vacancy.applications}</p>
//             <p><strong>Vagas:</strong> ${vacancy.positions}</p>
//           `;

//       // const applyBtn = document.getElementById("applyBtn");
//       // applyBtn.onclick = () => applyForVacancy(vacancyId);
//     })
//     .catch((error) => {
//       document.getElementById("vacancyDetails").innerHTML =
//         "Não foi possível carregar os detalhes da vaga."
//       console.error("Erro ao buscar detalhes da vaga:", error);
//     });
// }

function getUrlParameter(parameter) {
  
  const url = window.location.href;
  const urlObject = new URL(url);
  const params = new URLSearchParams(urlObject.search);

  return params.get(parameter);

}