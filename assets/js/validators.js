function getDataForm(id) {
  return document.getElementById(id).value;
}

function flashMessage(erros) {
  document.getElementById("div-erro").style.visibility = "visible";
  document.getElementById("div-erro").style.height = "20vh";
  const listErros = document.getElementById("list-erros");
  const ul = document.createElement("ul");

  erros.forEach((erro) => {
    const li = document.createElement("li");
    li.textContent = erro;
    ul.appendChild(li);
  });
  listErros.appendChild(ul);
}

function formRegister() {
  let formErrors = [];
  let isValid = true;
  const firstName = getDataForm("firstName");
  const lastName = getDataForm("lastName");
  const email = getDataForm("email");
  const password = getDataForm("password");
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()[\]{}\\-_+=.,:;<>/|?]).{12,}$/;

  if (firstName.length < 4 || firstName.length > 40) {
    formErrors.push("Nome Inválido! Mín: 4 | Máx: 40");
    isValid = false;
  }

  if (lastName.length < 4 || lastName.length > 40) {
    formErrors.push("Sobrenome Inválido! Mín: 4 | Máx: 40");
    isValid = false;
  }

  if (!emailRegex.test(email)) {
    formErrors.push("Endereço de E-mail Inválido!");
    isValid = false;
  }

  if (!passwordRegex.test(password) || password.length < 12) {
    formErrors.push(
      "Padrão de Senha Inválido: 1 Caractere Especial, 1 Maiscúlo, 1 Mínisculo e 1 Número"
    );
    isValid = false;
  }

  flashMessage(formErrors);
  return isValid;
}

document.querySelector("form").addEventListener("submit", function (event) {
  if (!formRegister()) {
    event.preventDefault();
  }
});
