//set copyright year
document.getElementById("current-year").innerHTML = new Date().getFullYear();

//set last modified date
const options = {
    day: "2-digit",
    month: "short",
    year: "numeric"
};
let lastModified = new Date(document.lastModified).toLocaleDateString("en-US", options);
// Set up the Date format object parameter for toLocaleDateString method.
document.getElementById("lastModified").innerHTML = 'Last Modification: ' +lastModified;
