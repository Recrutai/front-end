document.addEventListener("DOMContentLoaded", function () {
  const token = sessionStorage.getItem("userId");
  if (!token) {
    window.location.href = "login.html";
  } else {
    document.getElementById("main-content").style.display = "block";
  }
});

const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const token = sessionStorage.getItem("userId");
    console.log(token);
    if (token) {
      sessionStorage.removeItem("userId");
      window.location.href = "login.html";
    }
  });
}