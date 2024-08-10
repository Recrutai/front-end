//Confirmação de Usuário

async function verifyAccount(url) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    window.location.href = "login.html";
  } else if (response.status === 401) {
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

  const url = `http://localhost:8080/api/auth/verify-account?code=${verifCode}`;
  verifyAccount(url);
});

async function newVerifyCode(url, email) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: email,
  });
  if(response.ok) {
    window.location.href = "verificacao.html";
  }
  else {
    console.log(response)
  }
  
}

const sendNewCode = document.querySelector(".resendCode");
sendNewCode.addEventListener("click", function (event) {
  event.preventDefault()

  let email = sessionStorage.getItem("userEmail");
  const url = "http://localhost:8080/api/auth/resend-code";
  newVerifyCode(url, email);
  document.getElementById("div-erro").style.visibility = "visible";
  document.getElementById("div-erro").style.backgroundColor = "#4a9c5d";
  let erro = document.getElementById("erro");
  erro.innerHTML = "Digite o novo código enviado!";
})