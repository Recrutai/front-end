const formCourses = document.getElementById("formCourses");
const camposCourses = document.querySelectorAll(".required-courses");
const spanCourses = document.querySelectorAll(".span-courses");


formCourses.addEventListener("submit", function(event) {
    event.preventDefault();
    validNameCourses();
    validSelectCourses();
    validDescriptionCourses();
    validHoursCourses();
    validDateConclusion();
})

function isBeforeToday(dateString) {
    const inputDate = new Date(dateString);
    const currentDate = new Date();
    
    currentDate.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);
    
    return inputDate > currentDate;
}

function validNameCourses() {
    const input = document.getElementById("name");
    const span = document.querySelector(".name-valid");
    if(input.value.length < 5 || input.value.length > 120) {
        input.style.border = "2px solid #e63636";
        span.style.display = "block";
    }
    else {
        input.style.border = "";
        span.style.display = "none";
    }
}


function validSelectCourses() {
    const input = document.getElementById("schoolId");
    const span = document.querySelector(".select-school-valid");
    if(input.value === '') {
        input.style.border = "2px solid #e63636";
        span.style.display = "block";
    }
    else {
        input.style.border = "";
        span.style.display = "none";
    }
}

function validDescriptionCourses() {
    const input = document.getElementById("description");
    const span = document.querySelector(".description-valid");
    if(input.value.length < 1 || input.value.length > 2000) {
        input.style.border = "2px solid #e63636";
        span.style.display = "block";
    }
    else {
        input.style.border = "";
        span.style.display = "none";
    }
}

function validHoursCourses() {
    const input = document.getElementById("workloadHours");
    const span = document.querySelector(".hours-valid");
    if(Number(input.value) <= 0 || isNaN(Number(input.value))) {
        input.style.border = "2px solid #e63636";
        span.style.display = "block";
    }
    else {
        input.style.border = "";
        span.style.display = "none";
    }
}

function validDateConclusion() {
    let input = document.getElementById("completionDate");
    let span = document.querySelector(".span-completionDate");
    if(isBeforeToday(input.value)) {
        input.style.border = "2px solid #e63636";
        span.style.display = "block";
    }
    else {
        input.style.border = "";
        span.style.display = "none";
    }

}