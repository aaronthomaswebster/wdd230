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

function converKtoF(kelvin) {
    return (kelvin - 273.15) * 9 / 5 + 32;
}

async function getWeather() {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=40.296898&lon=-111.694649&appid=cfd4af0654acd4eb5d23d279ae86e62b');
    const data = await response.json();
    console.log(data);
    const temp = document.createElement("p");
    const description = document.createElement("p");

    temp.innerHTML = `${converKtoF(data.main.temp).toFixed()}&deg;F`;

    description.textContent = data.weather[0].description;


    const weatherIcon = document.createElement("img");
    weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    const weatherDiv = document.getElementById("weather");

    weatherDiv.appendChild(temp);
    weatherDiv.appendChild(description);
    weatherDiv.appendChild(weatherIcon);

}

getWeather();


async function buildActivityList() {
    const response = await fetch('./activities.json');
    const data = await response.json();
    console.log({ data });
    const activityEl = document.getElementById('activity');

    for (let week in data) {
        const weekli = document.createElement("li");
        weekli.innerHTML = week + ': '
        for (let link in data[week]) {
            console.log(data[week][link]);
            const linkEl = document.createElement('a');
            linkEl.innerHTML = data[week][link].title;
            linkEl.setAttribute('href', data[week][link].path);
            weekli.appendChild(linkEl);
            weekli.innerHTML += ' | '
        }
        activityEl.appendChild(weekli)
    }


}

buildActivityList()