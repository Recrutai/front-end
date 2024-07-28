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