const formInstitution = document.getElementById("institutionModal");
const camposInst = document.querySelectorAll(".required-Inst");
const spansInst = document.querySelectorAll(".span-required-Inst")


formInstitution.addEventListener("submit", (event) => {
    event.preventDefault();
    validName();
    validSelect();
    validHeadLine();
    validAbout();
    validSite();
})

function setErrorM(index) {
    camposInst[index].style.border = "2px solid #e63636"
    spansInst[index].style.display = "block";
}

function clearErrorM(index) {
    camposInst[index].style.border = ""
    spansInst[index].style.display = "none";
}

function validName() {
    if(camposInst[0].value.length < 3 || camposInst[0].value.length > 100) {
        setErrorM(0);
    }
    else {
        clearErrorM(0);
    }
}

function validHeadLine() {
    if(camposInst[2].value.length < 4 || camposInst[1].value.length > 100) {
        setErrorM(2);
    }
    else {
        clearErrorM(2);
    }
}

function validSelect() {
    if(camposInst[1].value === '') {
        setErrorM(1);
    }
    if(camposInst[3].value === '') {
        setErrorM(3);
    }
    if(camposInst[4].value === '') {
        setErrorM(4);
    }
    else {
        clearErrorM(1);
        clearErrorM(3);
        clearErrorM(4);
    }
}

function validSite() {
    if(camposInst[6].value.length > 100 || camposInst[6].value === '') {
        setErrorM(6);
    }
    else {
        clearErrorM(6);
    }
}

function validAbout() {
    if(camposInst[5].value.length > 100 || camposInst[5].value === '') {
        setErrorM(5);
    }
    
    else {
        clearErrorM(5);
    }
}

