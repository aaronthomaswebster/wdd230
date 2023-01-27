//setup haberger menu
let darkMode = localStorage.getItem("darkMode");
getVisits();

const menuButton = document.querySelector('.menu-button');
const menuitems = document.querySelectorAll('.menu-item');
const modeButton = document.querySelector("#mode");
const body = document.querySelector("body");
const userName = document.getElementById("user-name");
const userNameRepeat = document.getElementById("repeat-user-name");
const rangeInput = document.getElementById("range");
const rangeValue = document.getElementById("range-value");
const submitButton = document.getElementById("submit-button");
const formElement = document.getElementById("form");
const formInputElement = document.getElementById("form-table");


menuButton.addEventListener("click", () => {
    menuitems.forEach((item) => item.classList.toggle("open"));
    menuButton.classList.toggle("close");
});




if (darkMode === "enabled") {
    body.classList.toggle("dark-mode");
    modeButton.classList.toggle("dark-mode");
}

modeButton.addEventListener("click", () => {
    console.log(darkMode)
    body.classList.toggle("dark-mode");
    modeButton.classList.toggle("dark-mode");
    if (darkMode === "enabled") {
        darkMode = "disabled";
        localStorage.setItem("darkMode", null);
    } else {
        darkMode = "enabled";
        localStorage.setItem("darkMode", "enabled");
    }
});


function getVisits() {
    const visitsSpan = document.getElementById("visits");
    let visits = 1;
    let numberOfVisits = localStorage.getItem("visits");
    if (numberOfVisits != null) {
        visits = parseInt(numberOfVisits) + 1;
    }
    localStorage.setItem("visits", visits);
    visitsSpan.textContent = visits;
}

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (formElement.reportValidity()) {
        formInputElement.classList.toggle("hidden");
        const tableName = document.getElementById("table-name");
        const tableEmail = document.getElementById("table-email");
        const tableRange = document.getElementById("table-page-raiting");
        const tableUserName = document.getElementById("table-username");
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");

        tableName.textContent = nameInput.value;
        tableEmail.textContent = emailInput.value;
        tableRange.textContent = rangeInput.value;
        tableUserName.textContent = userName.value;


    }

});

rangeInput.addEventListener("input", (e) => {
    rangeValue.textContent = e.target.value;
});

userNameRepeat.addEventListener("input", (e) => {

    if (userName.value !== userNameRepeat.value) {
        userNameRepeat.setCustomValidity("Usernames do not match");
    } else {
        userNameRepeat.setCustomValidity("");
    }
});