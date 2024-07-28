//Cadastro de Endereço

const form = document.querySelector("form")

function getDataForm(id) {
    return document.getElementById(id).value;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const dataForm = {
        streetAddress : getDataForm("streetAddress"),
        city : getDataForm("city"),
        state : getDataForm("state"),
        country: getDataForm("country"),
        postalCode: getDataForm("postalCode"),
        latitude: getDataForm("latitude"),
        longitude: getDataForm("longitude")
    }
    console.log(dados)
    const url = "http://localhost:8080/api/address"
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
            //window.location.href = '';
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
            alert('Erro ao enviar dados. Tente novamente!');
        });
})