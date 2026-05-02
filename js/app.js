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
    const change = document.getElementById("welcome")
    const app = document.getElementById("app")
    change.style.display = "none"
    app.style.display = "block"
}

links.forEach(linkObj => {
    const list = document.getElementById(linkObj.id)
    list.addEventListener("click", ()=>Changepage(linkObj))
});
function Changepage(linkObj) {
    const pageView = document.getElementsByClassName("six-view")
    //const btn = document.getElementsByClassName("btn-view")
    for (let i = 0; i < pageView.length; i++) {
        pageView[i].style.display = "none";
    }
    const page = document.getElementById(linkObj.id)
    page.style.display = "block"
}
Changepage({
    id : "dashboard"
});