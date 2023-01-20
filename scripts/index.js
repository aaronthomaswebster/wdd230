//setup haberger menu
let darkMode = localStorage.getItem("darkMode");
getVisits();

const menuButton = document.querySelector('.menu-button');
const menuitems = document.querySelectorAll('.menu-item');
const modeButton = document.querySelector("#mode");
const body = document.querySelector("body");


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