async function getApplicationsByUser() {

    const userId = sessionStorage.getItem("userId")
    const url = `http://localhost:8080/api/v1/users/${userId}/applications`
    const options = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json'}
    };
    const response = await fetch(url, options);

    if(response.ok) {
        const data = await response.json();
        if(data.length > 0) {
            data.forEach(createCardApplication);
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
    else {
        console.log(response);
    }
}

getApplicationsByUser();

function createCardApplication(application) {
    const cardApplication = document.getElementById("application");
    const card = `
        <div class="col">
            <div class="card mt-3 card-application">
                <div class="card-title">
                    <h6 class="name-organization">${application.vacancy.organization.name}
                        <i class="fa-solid fa-building"></i>
                    </h6>
                </div>
                <hr>
                <p><strong>Cargo:</strong>${application.vacancy.title}</p>
                <p><strong>Descrição:</strong> ${application.vacancy.description}</p>
                <p><strong>Modalidade:</strong> ${application.vacancy.workModel} | ${application.vacancy.employmentType}</p>
                <p><strong>Salário:</strong> R$ ${application.vacancy.salary},00</p>
                <p><strong>Localização da Empresa:</strong> ${application.vacancy.location.city}-${application.vacancy.location.state} </p>
            </div>
        </div>
    `
    cardApplication.innerHTML += card;
}

async function getInterviewsByUser() {

    const userId = sessionStorage.getItem("userId")
    const url = `http://localhost:8080/api/v1/interviews/${userId}`
    const options = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json'}
    };
    const response = await fetch(url, options);

    if(response.ok) {
        const data = await response.json();
        if(data.length > 0) {
            data.forEach(createCardInterviews);
        }
        else {
            const div = document.getElementById("empty-modal");
            div.innerHTML = 
            `
                <div class="empty-content">
                    <div class="no-data">
                        <p>Você não possui nenhuma entrevista marcada!</p>
                    </div>
                </div>
            `
        }
    }
    else {
        console.log(response);
    }
}

getInterviewsByUser();

function formatarDataHoraISO(dataISO) {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Meses começam em 0
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} | ${horas}:${minutos}`;
}

function createCardInterviews(data) {
    const modal = document.getElementById("modal-body");
    const card = `
        <li class="list-group-item px-3 border-0 rounded-3 list-group-item-primary mb-2">
            <div>
                <h3>${data.title}</h3>
                <p><strong>Mensagem:</strong> ${data.description}</p>
                <p><strong>Data e Hora da Reunião:</strong> ${formatarDataHoraISO(data.scheduledTo)}</p>
                <p><strong>Link Reunião:</strong> ${data.reunionURL}</p>
                <p><strong>Recrutador:</strong> ${data.createdBy.firstName} ${data.createdBy.lastName}</p>
                <p><strong>E-mail do Recrutador:</strong> ${data.createdBy.email}</p>
            </div>
        </li>
    `
    modal.innerHTML += card;
}