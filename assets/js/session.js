document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("userId");
    if (!token) {
        window.location.href = "login.html";
    }
    else {
        document.getElementById("main-content").style.display = "block";
    }
});