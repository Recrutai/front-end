const formCourses = document.getElementById("formCourses");
const camposCourses = document.querySelectorAll(".required-courses");
const spanCourses = document.querySelectorAll(".span-courses");


formCourses.addEventListener("submit", function(event) {
    event.preventDefault();
    validNameCourses();
    validSelectCourses();
})

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