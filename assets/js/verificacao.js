//Confirmação de Usuário

async function login(codeData, url) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(codeData),
  });

  if (response.ok) {
    window.location.href = "login.html";
  } else if (response.status === 400) {
    document.getElementById("div-erro").style.visibility = "visible";
    let erro = document.getElementById("erro");
    erro.innerHTML = "Código de Verificação Inválido!";
  } else {
    document.getElementById("div-erro").style.visibility = "visible";
    let erro = document.getElementById("erro");
    erro.innerHTML = "Erro Interno, Contacte o Administrador do Sistema!";
  }
}

const form = document.getElementById("ConfimacaoForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  let verifCode = document.getElementById("codigo").value;
  const dataForm = {
    codigo: verifCode,
  };
  console.log(dataForm);

  const url = "http://localhost:8080/api/auth/login";
  login(dataForm, url);
});
