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
    console.log(response)
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        window.location.href = "home.html";
    }
    else if(response.status === 404) {
        document.getElementById("div-erro").style.visibility = "visible"
        let erro = document.getElementById("erro");
        erro.innerHTML = "Membro não encontrado!";
    }
    else {
        document.getElementById("div-erro").style.visibility = "visible"
        let erro = document.getElementById("erro");
        erro.innerHTML = "Erro ao cadastrar a vaga!";
    }
}

const formVacancy = document.getElementById("vacancyForm");
formVacancy.addEventListener("submit", function (event) {
    event.preventDefault();

    const userId = localStorage.getItem("userId");

    const dataForm = {
        "title": getDataForm("title"),
        "description": getDataForm("description"),
        "workModel": getDataForm("workModel"),
        "avgSalary": parseInt(getDataForm("avgSalary")),
        "positions": parseInt(getDataForm("positions")),
        "recruiterId": 1,
        "publisherId": 1
    };

    const url = "http://localhost:8080/api/vacancies";
    createVacancy(dataForm, url);
});



document.getElementById("listarVagas").addEventListener("click", (e) => {

})

function getAllVacancys() {
    const url = "http://localhost:8080/api/vacancies"
    fetch(url)
    .then(response => response.json())
    .then(data => {
        //Aqui manipular os dados da resposta
        console.log(data);
        alert("Sucesso!")
    })
    .catch(error => {
        alert("Não possível buscar os dados!");
        console.error(error);
    })
}

function getVacancyByTitle() {

    let title = document.getElementById("search");
    const url = `http://localhost:8080/api/vacancies?search=${title}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
        //Aqui manipular os dados da resposta
        console.log(data);
        alert("Sucesso!")
    })
    .catch(error => {
        alert("Não possível buscar os dados!");
        console.error(error);
    })
}