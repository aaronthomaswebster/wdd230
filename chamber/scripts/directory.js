const membersDiv = document.getElementById('members');
const gridBtn = document.getElementById('grid-button');
const listBtn = document.getElementById('list-button');


async function buildMemberGrid() {
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
        dataContainer.appendChild(h4);
        card.appendChild(dataContainer);
        membersDiv.appendChild(card)
    }
}

async function buildMemberList() {
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
        dataContainer.appendChild(h4);
        const p = document.createElement("p");
        p.innerHTML = data.members[member].description;
        dataContainer.appendChild(p);
        card.appendChild(dataContainer);
        membersDiv.appendChild(card)
    }
}

gridBtn.addEventListener('click', () => {
    members.innerHTML = '';
    buildMemberGrid();
});

listBtn.addEventListener('click', () => {
    members.innerHTML = '';
    buildMemberList();
});