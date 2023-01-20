const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

var chapters = getChapterList() || [];



const bookOfMormonBooks = ['1 nephi', '2 nephi', 'jacob', 'enos', 'jarom', 'omni', 'words of mormon', 'mosiah', 'alma', 'helaman', '3 nephi', '4 nephi', 'mormon', 'ether', 'moroni'];
const bookChapterMap = {
    '1 nephi': 22,
    '2 nephi': 33,
    'jacob': 7,
    'enos': 1,
    'jarom': 1,
    'omni': 1,
    'words of mormon': 1,
    'mosiah': 29,
    'alma': 63,
    'helaman': 16,
    '3 nephi': 30,
    '4 nephi': 1,
    'mormon': 9,
    'ether': 15,
    'moroni': 10
};

button.addEventListener('click', () => {
    if (input.value === '') return displayError('Please enter a chapter');
    let inputData = input.value.split(' ');
    if (inputData.length < 2) return displayError('Please enter a book and chapter');
    let book = inputData.slice(0, inputData.length - 1).join(' ').toLowerCase();
    if (!bookOfMormonBooks.includes(book)) return displayError('Please enter a valid book and chapter');
    let chapter = inputData[inputData.length - 1];
    if (isNaN(parseInt(chapter)) || chapter < 1 || chapter > bookChapterMap[book]) return displayError('Please enter a valid chapter');

    chapters.push(input.value);
    displayList(input.value);

});


function displayList(item) {
    const listItem = document.createElement('li');
    const deleteBtn = document.createElement('button');
    listItem.textContent = item;
    deleteBtn.textContent = '❌';
    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);

    deleteBtn.addEventListener('click', () => {
        chapters = chapters.filter(chapter => chapter != item);
        list.removeChild(listItem);
        updateStorage();
    });
    input.focus();
    input.value = '';
    updateStorage();
}

function updateStorage() {
    localStorage.setItem('chapters', JSON.stringify(chapters));
}

function displayError(message) {
    alert(message);
    input.focus();
}


function getChapterList() {

    let chapters = localStorage.getItem('chapters');
    if (chapters != null) {
        return JSON.parse(chapters);
    }
}


chapters.forEach(chapter => {
    displayList(chapter);
});




