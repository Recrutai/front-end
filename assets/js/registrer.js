//Cadastro de Usuário
import { getDataForm } from "../js/uteis.js";

function formRegister() {
  const formErrors = document.getElementById("formErrors");
  formErrors.innerHTML = "";

  let isValid = true;
  const firstName = getDataForm("firstName");
  const lastName = getDataForm("lastName");
  const email = getDataForm("email");
  const password = getDataForm("password");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()[\]{}\\-_+=.,:;<>/|?]).{12,}$/;

  let errorList = "<ul>";

  if (firstName.length < 4 || firstName.length > 40) {
    errorList += "<li>Nome Inválido! Mín: 4 | Máx: 40</li>";
    isValid = false;
  }

  if (lastName.length < 4 || lastName.length > 40) {
    errorList += "<li>Sobrenome Inválido! Mín: 4 | Máx: 40</li>";
    isValid = false;
  }

  if (!emailRegex.test(email)) {
    errorList += "<li>Endereço de E-mail Inválido.</li>";
    isValid = false;
  }

  if (password.length < 12) {
    errorList += "<li>Padrão de Senha Inválido! No Mínimo 12 Caracteres.</li>";
    isValid = false;
  }

  if (!passwordRegex.test(password)) {
    errorList +=
      "<li>Padrão de Senha Inválido! 1 Caractere Especial, 1 Maiúsculo, 1 Minúsculo e 1 Número.</li>";
    isValid = false;
  }

  errorList += "</ul>";

  formErrors.innerHTML = errorList;
  return isValid;
}

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const dataForm = {
    firstName: getDataForm("firstName"),
    lastName: getDataForm("lastName"),
    email: getDataForm("email"),
    headline: "Tech",
    password: getDataForm("password"),
  };

  const url = "http://localhost:8080/api/v1/auth/register";
  registerUser(dataForm, url)
  formRegister()

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

  if (response.ok && formRegister()) {
    sessionStorage.setItem("userEmail", data.email);
    window.location.href = "verificacao.html";
  }
  else {
    console.log(response);
    alert("Ocorreu um erro!");
  }
}