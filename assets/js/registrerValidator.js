const campos = document.querySelectorAll(".required");
const spans = document.querySelectorAll(".span-required")
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()[\]{}\\-_+=.,:;<>/|?]).{12,}$/;


function setError(index) {
  campos[index].style.border = "2px solid #e63636"
  spans[index].style.display = "block";
}

function clearError(index) {
  campos[index].style.border = ""
  spans[index].style.display = "none";
}

const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    validNames();
    validHeadline();
    validCity();
    validEmail();
    validEmail();
    validPassword();
})

function validNames() {
  if(campos[0].value.length < 4 || campos[0].value.length > 40) {
    setError(0)
  }
  if(campos[1].value.length < 4 || campos[1].value.length > 40) {
    setError(1)
  }
  else {
    clearError(0)
    clearError(1)
  }
}

function validHeadline() {
    if(campos[2].value === '' || campos[2].value.length > 40) {
        setError(2)
    }
    else {
        clearError(2)
    }
}

function validCity() {
    if(campos[3].value === '' || campos[3].value.length > 40) {
        setError(3)
    }
    else {
        clearError(3)
    }
}


function validEmail() {
    const email = campos[4].value;
    if(!emailRegex.test(email)) {
        setError(4)
    }
    else {
        clearError(4)
    }
}

function validPassword() {
    const password = campos[5].value;
    if(!passwordRegex.test(password)) {
        setError(5)
    }
    else {
        clearError(5)
    }
}