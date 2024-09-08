//Cadastro de Usuário
import { getDataForm } from "../js/uteis.js";

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const dataForm = {
    firstName: getDataForm("firstName"),
    lastName: getDataForm("lastName"),
    email: getDataForm("email"),
    headline: getDataForm("headline"),
    password: getDataForm("password"),
    location: {
    "city": getDataForm("city"),
    "state": "string",
    "country": "string"
  }
  };

  const url = "http://localhost:8080/api/v1/auth/register";
  registerUser(dataForm, url)

});

async function registerUser(data, url) {

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
  const response = await fetch(url, options);

  if (response.ok) {
    sessionStorage.setItem("userEmail", data.email);
    window.location.href = "verificacao.html";
  }
  else {
    console.log(response);
    alert("Ocorreu um erro!");
  }
}