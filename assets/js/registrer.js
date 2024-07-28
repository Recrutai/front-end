//Cadastro de Usuário
function getDataForm(id) {
    return document.getElementById(id).value;
}

const form = document.querySelector("form")
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const dataForm = {
        firstName : getDataForm("firstName"),
        lastName : getDataForm("lastName"),
        email : getDataForm("email"),
        password: getDataForm("password"),
    }
    console.log(dados)
    const url = "http://localhost:8080/api/register"
    const options = {
        method: 'POST',
        headers: {
             "Content-Type": "application/json"
        },
        body: JSON.stringify(dataForm)
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            alert("Dados Cadastrados com Sucesso!");
            console.log(data);
            window.location.href = 'login.html';
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
            alert('Erro ao enviar dados. Tente novamente!');
        });
})