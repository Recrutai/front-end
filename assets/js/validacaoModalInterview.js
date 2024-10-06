const campos = document.querySelectorAll(".required-interview");
const span = document.querySelectorAll(".span-interview");
const formInterview = document.getElementById("formInterview");
const regexURL = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(\/[^\s]*)?$/;

formInterview.addEventListener("submit", function(event) {
    event.preventDefault();
    validTitle();
    validDescription();
    validInterviewDate();
    validUrl();
})

function setError(index) {
    campos[index].style.border = "2px solid #e63636"
    span[index].style.display = "block";
}

function clearError(index) {
    campos[index].style.border = ""
    span[index].style.display = "none";
}

function isBeforeToday(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    
    currentDate.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    
    return inputDate > currentDate;
}

function validTitle() {
    if(campos[0].value.length < 5 || campos[0].value.length > 100) {
        setError(0)
    }
    else {
        clearError(0)
    }
}

function validDescription() {
    if(campos[1].value.length <= 0 || campos[1].value.length > 2000) {
        setError(1)
    }
    else {
        clearError(1)
    }
}

function validInterviewDate() {
    if(!isBeforeToday(campos[2].value)) {
        setError(2)
    }
    else {
        clearError(2)
    }
}

campos[3].addEventListener("keydown", function(event) {
    event.preventDefault(); // Bloqueia o evento do teclado
});

function validUrl() {
    const url = campos[4].value;
    if(!regexURL.test(url)) {
        setError(4)
    }
    else {
        clearError(4)
    }
}