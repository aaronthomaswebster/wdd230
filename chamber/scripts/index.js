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
            console.log('element not found');
        }
    }
    localStorage.setItem("lastVisit", currentDate);
}






async function getWeatherData() {
    const weatherAPIKey = '';
    const weatherData = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=40.29775431026302&lon=-111.69413769991905&exclude=minutely,hourly,alerts&appid=${weatherAPIKey}`,
    );
    //update weather data section

}

getDaysSinceLastVisit();