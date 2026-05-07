const enterApp = document.getElementById("enterBtn")

const links = [
    {
        id: "dashboard",
    },
    {
        id: "budget",
    },
    {
        id: "upcoming",
    },
    {
        id: "goals",
    },
    {
        id: "history",
    },
    {
        id: "settings",
    },
];

enterApp.addEventListener("click", changeWelcome)
function changeWelcome() {
    const wlcm = document.getElementById("wlcm")
    wlcm.style.display = "none"
    const app = document.getElementById("app")
    app.style.display = "block"
    const change = document.getElementById("welcome")
    change.style.display = "none"
    Changepage(dashboard)
}

links.forEach(linkObj => {
    const list = document.getElementById("btn-" + linkObj.id)
    list.addEventListener("click", ()=>Changepage(linkObj))
});

function Changepage(linkObj) {
    const pageView = document.getElementsByClassName("six-view")
    for (let i = 0; i < pageView.length; i++) {
        pageView[i].style.display = "none";
    }
    const page = document.getElementById(linkObj.id)
    page.style.display = "block";
}

//////////////////////////////////////////////////////////////////////////
// SETTING //

const categoriesBTN = document.getElementById("categories-btn")
const preferenceBTN = document.getElementById("preference-btn")
const dataBTN = document.getElementById("data-btn")
const CategChange = document.getElementById("categories")
const PrefChange = document.getElementById("display-pref")
const dataChange = document.getElementById("display-data")
const hideSubcateg = document.getElementById("display-subcateg")
const hideEditCateg = document.getElementById("editCategories")

categoriesBTN.addEventListener("click", displayCategorie)
function displayCategorie() {
    CategChange.style.display = "block"
    PrefChange.style.display = "none"
    dataChange.style.display = "none"
    hideSubcateg.style.display = "block"
    hideEditCateg.style.display = "block"
}
preferenceBTN.addEventListener("click", displayPreference)
function displayPreference() {
    CategChange.style.display = "none"
    hideEditCateg.style.display = "none"
    PrefChange.style.display = "block"
    hideSubcateg.style.display = "none"
    dataChange.style.display = "none"
}

dataBTN.addEventListener("click", displayData)
function displayData() {
    CategChange.style.display = "none"
    hideEditCateg.style.display = "none"
    PrefChange.style.display = "none"
    hideSubcateg.style.display = "none"
    dataChange.style.display = "block"
}

document.addEventListener("DOMContentLoaded", () => {
    displayCategorie()
})



