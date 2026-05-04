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
    page.style.display = "block"
}
/*Changepage({
    id : "dashboard"
});
*/
