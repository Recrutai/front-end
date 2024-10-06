async function getVacanciesByMember() {

    const userId = sessionStorage.getItem("userId")
    const url = `http://localhost:8080/api/v1/vacancies/member/${userId}`
    const options = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json'}
    };
    const response = await fetch(url, options);

    if(response.ok) {
        const data = await response.json();
        if(data.length > 0) {
            data.forEach(createCardVacancies);
        }
        else {
            const body = document.getElementById("empty");
            body.innerHTML = 
            `
                <div class="empty-content">
                    <div class="no-data">
                        <p>Você ainda não realizou nenhuma candidatura.</p>
                    </div>
                </div>
            `
        }
    }
    else if(response.status === 404) {
        const body = document.getElementById("empty");
        body.innerHTML = 
        `
            <div class="empty-content">
                <div class="no-data">
                    <p>Você não cadastrou nenhuma vaga.</p>
                </div>
            </div>
        ` 
    }
    else {
        console.log(response);
    }
}

getVacanciesByMember();

function createCardVacancies(vacancy) {
    const cardApplication = document.getElementById("vacancies-By-Member");
    const card = `
        <div class="col">
            <div class="card mt-3 card-application">
                <div class="card-title">
                    <h6 class="name-organization">${vacancy.organization.name}
                        <i class="fa-solid fa-building"></i>
                    </h6>
                </div>
                <hr>
                <p><strong>Cargo:</strong>${vacancy.title}</p>
                <p><strong>Descrição:</strong> ${vacancy.description}</p>
                <p><strong>Modalidade:</strong> ${vacancy.workModel} | ${vacancy.employmentType}</p>
                <p><strong>Salário:</strong> R$ ${vacancy.salary},00</p>
                <p><strong>Localização da Empresa:</strong> ${vacancy.location.city}-${vacancy.location.state}</p>
                <a class="btn btn-primary" href="../pages/candidatos.html?id=${vacancy.id}">Listar Candidados</a>
            </div>
        </div>
    `
    cardApplication.innerHTML += card;
}

function getUrlParameter(parameter) {

    const url = window.location.href;
    const urlObject = new URL(url);
    const params = new URLSearchParams(urlObject.search);
  
    return params.get(parameter);
  
}

async function getCandidates() {

    const vacancyId = getUrlParameter("id");
    if(vacancyId !== null) {

    const url = `http://localhost:8080/api/v1/vacancies/${vacancyId}/applications`
    const options = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json'}
    };
    const response = await fetch(url, options);

    if(response.ok) {
        const data = await response.json();
        if(data.length > 0) {
            data.forEach(createCardCandidates);
        }
        else {
            const div = document.getElementById("empty");
            div.innerHTML = 
            `
                <div class="empty-content">
                    <div class="no-data">
                        <p>Essa vaga ainda não possui candidatos</p>
                    </div>
                </div>
            `
        }
        const vacancyName = document.getElementById("vacancyName");
        vacancyName.innerHTML = data[0].vacancy.title;
    }
    else {
        console.log(response);
    }
    }
}
getCandidates()

function createCardCandidates(data) {
    const cardApplication = document.getElementById("candidates");
    const card = `
        <li class="list-group-item px-3 border-0 rounded-3 list-group-item-primary mb-2 card-item">
            <div>
                <p><strong>Nome:</strong> ${data.candidate.firstName}${data.candidate.lastName}</p>
                <p><strong>E-mail:</strong> ${data.candidate.email}</p>
                <p><strong>Área de Atuação:</strong> ${data.candidate.headline}</p>
                <p><strong>Cidade:</strong> ${data.candidate.location}</p>
                <p><strong>Espectativa Salarial:</strong> R$ ${data.expectedSalary},00</p>
            </div>
            <button type="submit" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#interViewModal">Marcar Entrevista</button>
        </li>
    `
    cardApplication.innerHTML += card;
}
