import { closeModal, addSelectObject, getDataCalendar, 
    checkActualJob, getDataForm, getSelectedOption } from "../js/uteis.js";
import { create } from "../js/api.js";

//Courses
const coursesForm = document.getElementById("formCourses");
coursesForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const courseData = {
        "userId" : sessionStorage.getItem("userId"),
        "name" : getDataForm("name"),
        "description" : getDataForm("description"),
        "sender" : getDataForm("sender"),
        "conclusion" : getDataForm("dateEnd")
    };
    const url = "http://localhost:8080/api/v1/jobs";
    create(courseData, url)
})


function createCardCourses(course) {
    const cardBody = document.getElementById("cardCourses");
    const cardCourse = `
        <div>
            <i class="fa-solid fa-graduation-cap">${course.sender}</i>
            <p>${course.name}</p>
            <p>${course.description}</p>
            <p>${course.dateStart} | ${course.conclusion}</p>
        </div>
        <hr>
    `
    cardBody.innerHTML += cardCourse;
}

async function getAllCourses() {

    const userId = sessionStorage.getItem("userId")
    const url = "http://localhost:8080/api/v1/courses/" + userId;
    const options = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json'}
    };
    const response = await fetch(url, options);

    if(response.ok) {
        const data = await response.json();
        if(data.length > 0) {
            data.forEach(createCardCourses);
        }
        return;
    }
    else {
        console.log(response);
    }
}

getAllCourses();
//Courses

//Jobs

function loadCompanies() {
    const url = "http://localhost:8080/api/v1/institutions"
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }   
    })
    .then(data => {
        addSelectObject(data, "company")
    })
    .catch(error => {
        console.error('Houve um problema com a requisição:', error);
    });
}

loadCompanies()

const jobsForm = document.getElementById("formJobs");
jobsForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const userId = sessionStorage.getItem("userId")
    const data = {
        "institutionId": parseInt(getSelectedOption("company")),
        "title": getDataForm("title"),
        "type": getSelectedOption("typeJobSelect"),
        "workModel": getSelectedOption("modalityJobSelect"),
        "address": {
            "city": getDataForm("city"),
            "state": "string",
            "country": "string"
        },
        "description": getDataForm("description"),
        "startDate": getDataCalendar(getDataForm("dateStartJ")),
        "endDate": checkActualJob(getDataForm("dateEndJ"), "flexCheckDefault"),
      }
    const url = `http://localhost:8080/api/v1/users/${userId}/employments`
    console.log(data)
    create(data, url, "perfil.html")
})

function createCardJobs(job) {
    const cardBody = document.getElementById("cardJobs");
    const cardCourse = `
        <div>
            <i class="fa-solid fa-building">${job.companyName}</i>
            <p>${job.title}</p>
            <p>${job.modalityJob} | ${job.city}</p>
            <p>${job.dateStart} | ${job.dateEnd}</p>
        </div>
        <hr>
    `
    cardBody.innerHTML += cardCourse;
}

async function getAllJobs() {

    const userId = sessionStorage.getItem("userId")
    const url = "http://localhost:8080/api/v1/jobs/" + userId;
    const options = {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json'}
    };
    const response = await fetch(url, options);

    if(response.ok) {
        const data = await response.json();
        if(data.length > 0) {
            data.forEach(createCardJobs);
        }
        return;
    }
    else {
        console.log(response);
    }
}

getAllJobs();
//Jobs