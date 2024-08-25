function getDataForm(id) {
    return document.getElementById(id).value;
}

function getSelectedOption(idSelect) {
    let  selectElement = document.getElementById(idSelect);
    let selectedValue = selectElement.value;
    return selectedValue;
}

function checkBoxVerif(idCheckBox) {
    const check = document.getElementById(idCheckBox);
    return check.checked ? true : false;
}

async function create(data, url) {

    const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }
    const response = await fetch(url, options);

    if(response.ok) {
        window.location.href = "perfil.html";
    }
    else {
        console.log(response);
        alert("Ocorreu um erro!");
    }
}

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
    const url = "http://localhost:8080/api/jobs";
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
    const url = "http://localhost:8080/api/courses/" + userId;
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

const jobsForm = document.getElementById("formJobs");
jobsForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const jobData = {
        "userId" : sessionStorage.getItem("userId"),
        "title" : getDataForm("title"),
        "typeJob" : getSelectedOption("typeJobSelect"),
        "modalityJob" : getSelectedOption("modalityJobSelect"),
        "companyName" : getDataForm("companyName"),
        "city" : getDataForm("city"),
        "dateStart" : getDataForm("dateStartJ"),
        "dateEnd" : getDataForm("dateEndJ"),
        "currentJob" : checkBoxVerif("flexCheckDefault")
    };
    
    const url = "http://localhost:8080/api/jobs";
    create(jobData, url)
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
    const url = "http://localhost:8080/api/jobs/" + userId;
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