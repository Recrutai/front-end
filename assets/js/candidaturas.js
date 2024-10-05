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
            console.log(data);
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
                <p><strong>Localização da Empresa:</strong> ${application.vacancy.organization.headquarters}</p>
            </div>
        </div>
    `
    cardApplication.innerHTML += card;
}