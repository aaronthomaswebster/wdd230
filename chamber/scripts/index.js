const weatherAPIKey = 'cfd4af0654acd4eb5d23d279ae86e62b';


//set copyright year
document.getElementById("current-year").innerHTML = new Date().getFullYear();

//set last modified date
const options = {
    day: "2-digit",
    month: "short",
    year: "numeric"
};
const lastModified = new Date(document.lastModified).toLocaleDateString("en-US", options);
// Set up the Date format object parameter for toLocaleDateString method.
document.getElementById("lastModified").innerHTML = 'Last Modification: ' + lastModified;



//menu toggle
const menuButton = document.getElementById('menu-button')
const menu = document.getElementsByClassName('menu')[0]

menuButton.addEventListener('click', () => {
    let expanded = menuButton.getAttribute('aria-expanded') === 'true' || false
    menuButton.setAttribute('aria-expanded', !expanded)
    menu.classList.toggle('open')
});
function getDaysSinceLastVisit() {

    let currentDate = new Date();
    try {
        let lastVisit = localStorage.getItem("lastVisit");
        let lastVisitDate = new Date(lastVisit);
        let daysSinceLastVisit = Math.floor((currentDate - lastVisitDate) / (1000 * 60 * 60 * 24));
        let timeSinceLastVistElemet = document.getElementById("daysSinceLastVisit");
        timeSinceLastVistElemet.textContent = daysSinceLastVisit;
    } catch (e) {
        try {
            let timeSinceLastVistElemet = document.getElementById("daysSinceLastVisit");
            timeSinceLastVistElemet.textContent = 'First Visit';
        } catch (e) {
        }
    }
    localStorage.setItem("lastVisit", currentDate);
}


async function getWeather() {
    const weatherElement = document.getElementById("weather");
    if (!weatherElement) return;

    const cityElement = document.getElementById("city");
    const stateElement = document.getElementById("state");
    const currentWeatherIcon = document.getElementById("current-weather-icon");
    const currentTemp = document.getElementById("current-temp");
    const currentDescription = document.getElementById("current-weather-description");
    const forcastElement = document.getElementById("forcast");
    const lat = 40.2968;
    const lng = -111.6946;
    const city = "Orem";
    const state = "Utah";
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?units=imperial&lat=${lat}&lon=${lng}&exclude=minutely&appid=${weatherAPIKey}`);
    const data = await response.json();

    cityElement.textContent = city;
    stateElement.textContent = state;
    currentWeatherIcon.src = `http://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;
    currentWeatherIcon.alt = data.current.weather[0].description;
    currentTemp.textContent = data.current.temp + "°F";
    currentDescription.textContent = data.current.weather[0].description;

    forcastElement.innerHTML = "";
    forcastElement.classList.add("forcast");
    weatherElement.classList.add("weather");
    for (let i = 0; i < 3; i++) {
        let forcast = data.daily[i];
        let forcastCard = document.createElement("div");
        forcastCard.classList.add("card");
        forcastCard.classList.add("forcast-card");
        let forcastDate = document.createElement("h3");
        forcastDate.textContent = new Date(forcast.dt * 1000).toLocaleDateString();
        let forcastIcon = document.createElement("img");
        forcastIcon.src = `http://openweathermap.org/img/w/${forcast.weather[0].icon}.png`;
        forcastIcon.alt = forcast.weather[0].description;
        let forcastTempHigh = document.createElement("p");
        forcastTempHigh.textContent = Math.round(forcast.temp.max) + "°F";
        let forcastTempLow = document.createElement("p");
        forcastTempLow.textContent = Math.round(forcast.temp.min) + "°F";
        forcastTempHigh.style.color = "#FF1744";
        forcastTempLow.style.color = "#150ed8";
        forcastCard.appendChild(forcastIcon);
        forcastCard.appendChild(forcastTempHigh);
        forcastCard.appendChild(forcastTempLow);
        forcastCard.appendChild(forcastDate);
        forcastElement.appendChild(forcastCard);
    }


}

const loadSponsors = async () => {

    const response = await fetch('data/members.json');
    const data = await response.json();
    let goldAndSilverMembers = data.members.filter(sponsor => sponsor.memberStatus == 'gold' || sponsor.memberStatus == 'silver');
    for (let i = 0; i < 3; i++) {
        let randIndex = Math.floor(Math.random() * (goldAndSilverMembers.length));
        let sponsor = goldAndSilverMembers.splice(randIndex, 1)[0];
        const sponsorElement = document.createElement('img');
        sponsorElement.classList.add('sponsor');
        sponsorElement.src = sponsor.logo;
        sponsorElement.alt = sponsor.name;
        sponsorElement.width = 200;
        document.getElementById('sponsor-list').appendChild(sponsorElement);
    }
}

const createBanner = () => {
    //if it is Wednesday, show the banner
    //if it is not Wednesday, do not show the banner
    if (![1, 2, 3].includes(new Date().getDay())) return;
    const banner = document.createElement('div');
    banner.classList.add('banner');
    banner.innerHTML = `
    <div class="banner-content">
        <h2>Join the Chamber</h2>
        <p>Please attend the chamber of commerce meet and greet on Wednesday at 7:00 p.m.</p>
        <button class="button">Close</button>
    </div>
    `;
    document.getElementById('banner-container').appendChild(banner);
    banner.querySelector('.button').addEventListener('click', () => {
        banner.remove();
    });
}


loadSponsors();

getDaysSinceLastVisit();
getWeather();

createBanner();