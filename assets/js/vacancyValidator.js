const campos = document.querySelectorAll(".required");
const spans = document.querySelectorAll(".span-required")
const formVacancy = document.getElementById("vacancyForm");

function setError(index) {
    campos[index].style.border = "2px solid #e63636"
    spans[index].style.display = "block";
}
  
function clearError(index) {
    campos[index].style.border = ""
    spans[index].style.display = "none";
}

formVacancy.addEventListener("submit", function(event) {
    event.preventDefault();
    validTitulo();
    validDescripton();
    validSelectCompany();
    validSelectEmployment();
    validSelectWork();
    validState();
    validSalary();
    validPositions();
})

function validTitulo() {
    if(campos[0].value.length < 5 || campos[0].value.length > 100) {
      setError(0)
    }
    else {
      clearError(0)
    }
}

function validDescripton() {
    if(campos[1].value.length < 1 || campos[1].value.length > 3850) {
        setError(1)
    }
    else {
        clearError(1)
    }
}

function validSelectCompany() {
    if(campos[2].value === '') {
        setError(2);
    }
    else {
        clearError(2)
    }
}

function validSelectEmployment() {
    if(campos[3].value === '') {
        setError(3);
    }
    else {
        clearError(3)
    }
}

function validSelectWork() {
    if(campos[4].value === '') {
        setError(4);
    }
    else {
        clearError(4)
    }
}

function validState() {
    if(campos[5].value === '' || campos[6].value === '') {
        setError(5);
        setError(6);
    }
    else {
        clearError(5);
        clearError(6);
    }
}

function validSalary() {
    const input = document.getElementById("salary");
    const span = document.querySelector(".salary-required");
    const num = Number(input.value);
    if(num < 1) {
       input.style.border = "2px solid #e63636";
       span.style.display = "block";
    }
    else if(isNaN(num)) {
        input.style.border = "2px solid #e63636";
        span.style.display = "block";
    }

    else {
        input.style.border = "";
        span.style.display = "none";
    }
}

function validPositions() {
    const input = document.getElementById("positions");
    const span = document.querySelector(".positions-required");
    const num = Number(input.value);
    if(num < 1) {
       input.style.border = "2px solid #e63636";
       span.style.display = "block";
    }
    else if(isNaN(num)) {
        input.style.border = "2px solid #e63636";
        span.style.display = "block";
    }

    else {
        input.style.border = "";
        span.style.display = "none";
    }
}
