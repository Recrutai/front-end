//Login de Usuário
function getDataForm(id) {
  return document.getElementById(id).value;
}

async function login(loginData, url) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("userId", data.id);
    console.log(data);
    window.location.href = "main.html";
  } else {
    alert("Falha ao logar!");
  }
}

const form = document.getElementById("loginForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const dataForm = {
    email: getDataForm("email"),
    password: getDataForm("password"),
  };

  console.log(dataForm);
  const url = "http://localhost:8080/api/auth/login";
  login(dataForm, url);
});
