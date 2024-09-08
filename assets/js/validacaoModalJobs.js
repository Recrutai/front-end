const formEmployment = document.getElementById("jobsModal");
const campos = document.querySelectorAll(".required");
const spans = document.querySelectorAll(".span-required")

formEmployment.addEventListener("submit", (event) => {
    event.preventDefault();

    validadeTitle();
    validadeDescription();
    validadeCity();
    validadeSelect();
    validadeDate();
})

function setError(index) {
    campos[index].style.border = "2px solid #e63636"
    spans[index].style.display = "block";
}

function clearError(index) {
    campos[index].style.border = ""
    spans[index].style.display = "none";
}

function validadeTitle() {
    if(campos[0].value.length < 4 || campos[0].value.length > 100) {
        setError(0);
    }
    else {
        clearError(0);
    }
}

function validadeDescription() {
    if(campos[2].value === '') {
        setError(2);
    }
    else {
        clearError(2);
    }
}

function validadeCity() {
    if(campos[3].value.length <= 2 || campos[3].value.length > 50) {
        setError(3);
    }
    else {
        clearError(3);
    }
}

function validadeSelect() {
    if(campos[1].value === '') {
        setError(1);
    }
    if(campos[4].value === '') {
        setError(4);
    }
    if(campos[5].value === '') {
        setError(5);
    }
    else {
        clearError(1);
        clearError(4);
        clearError(5);
    }
}

function validadeDate() {
    if(campos[6].value === '') {
        setError(6);
    }
    else {
        clearError(6);
    }
}