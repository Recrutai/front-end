document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("userId");
    if (!token) {
        window.location.href = "login.html";
    }
    else {
        document.getElementById("main-content").style.display = "block";
    }
});

const form = document.querySelector("form")
if(form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const token = localStorage.getItem("userId");
        console.log(token)
        if (token) {
            localStorage.removeItem("userId");
            window.location.href = "login.html";
        }
    })
}
