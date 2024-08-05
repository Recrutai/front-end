document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("userId");
  const isActive = localStorage.getItem("isActive");
  if (!token && !isActive) {
    window.location.href = "login.html";
  } else {
    document.getElementById("main-content").style.display = "block";
  }
});

const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const token = localStorage.getItem("userId");
    console.log(token);
    if (token) {
      localStorage.removeItem("userId");
      window.location.href = "login.html";
    }
  });
}
