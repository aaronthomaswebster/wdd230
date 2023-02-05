const membersDiv = document.getElementById('members');
const gridBtn = document.getElementById('grid-button');
const listBtn = document.getElementById('list-button');
const listSRC = 'images/directory/list';
const gridSRC = 'images/directory/grid';


async function buildMemberGrid() {
    gridBtn.src = `${gridSRC}-selected.svg`;
    listBtn.src = `${listSRC}.svg`;
    const response = await fetch('data/members.json');
    const data = await response.json();
    console.log({ data });

    for (let member in data.members) {
        const card = document.createElement("div");
        card.classList.add("card");
        const img = document.createElement("img");
        img.src = data.members[member].logo;
        img.alt = data.members[member].name;
        card.appendChild(img);
        const dataContainer = document.createElement("div");
        dataContainer.classList.add("member-container");
        const h4 = document.createElement("h4");
        h4.innerHTML = data.members[member].name;
        h4.style.fontWeight = "bold";
        const h3Address = document.createElement("h3");
        h3Address.innerHTML = data.members[member].address;
        h3Address.style.fontWeight = "normal";
        const h3StateCityZip = document.createElement("h3");
        h3StateCityZip.innerHTML = ` ${data.members[member].city}, ${data.members[member].state}${data.members[member].zip}`;
        h3StateCityZip.style.fontWeight = "normal";
        const h3Phone = document.createElement("h3");
        h3Phone.innerHTML = data.members[member].phone;
        h3Phone.style.fontWeight = "normal";
        dataContainer.appendChild(h4);
        dataContainer.appendChild(h3Address);
        dataContainer.appendChild(h3StateCityZip);
        dataContainer.appendChild(h3Phone);
        card.appendChild(dataContainer);
        membersDiv.appendChild(card)
    }
}

async function buildMemberList() {
    gridBtn.src = `${gridSRC}.svg`;
    listBtn.src = `${listSRC}-selected.svg`;
    const response = await fetch('data/members.json');
    const data = await response.json();
    console.log({ data });

    const dataTable = document.createElement("table");
    dataTable.classList.add("table");
    const tableHead = document.createElement("thead");
    const tableHeadRow = document.createElement("tr");
    const tableHeadName = document.createElement("th");
    tableHeadName.innerHTML = "Business Name";
    const tableHeadAddress = document.createElement("th");
    tableHeadAddress.innerHTML = "Address";
    const tableHeadPhone = document.createElement("th");
    tableHeadPhone.innerHTML = "Phone";
    tableHeadRow.appendChild(tableHeadName);
    tableHeadRow.appendChild(tableHeadAddress);
    tableHeadRow.appendChild(tableHeadPhone);
    tableHead.appendChild(tableHeadRow);
    dataTable.appendChild(tableHead);
    const tableBody = document.createElement("tbody");


    for (let member in data.members) {
        const tableRow = document.createElement("tr");
        const tableDataName = document.createElement("td");
        tableDataName.innerHTML = data.members[member].name;
        const tableDataAddress = document.createElement("td");
        tableDataAddress.innerHTML = `${data.members[member].address} ${data.members[member].city}, ${data.members[member].state}${data.members[member].zip}`;
        const tableDataPhone = document.createElement("td");
        tableDataPhone.innerHTML = data.members[member].phone;
        tableRow.appendChild(tableDataName);
        tableRow.appendChild(tableDataAddress);
        tableRow.appendChild(tableDataPhone);
        tableBody.appendChild(tableRow);
    }
    dataTable.appendChild(tableBody);
    membersDiv.appendChild(dataTable);
}

gridBtn.addEventListener('click', () => {
    members.innerHTML = '';
    buildMemberGrid();
});

listBtn.addEventListener('click', () => {
    members.innerHTML = '';
    buildMemberList();
});

buildMemberGrid()
