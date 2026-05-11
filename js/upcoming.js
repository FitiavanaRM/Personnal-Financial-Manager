let upcomingCharges = [];

function loadUpcoming() {
    if (localStorage.getItem("pfm_upcoming")) {
        upcomingCharges = JSON.parse(localStorage.getItem("pfm_upcoming"))
    }
}

function saveUpcoming() {
    localStorage.setItem("pfm_upcoming" , JSON.stringify(upcomingCharges));
}

function getCurrency() {
    const data = localStorage.getItem("pfm_settings");
    if(data) {
        return JSON.parse(data).currency || "Ar";
    }
    return "Ar";
}

function formatMoney(amount) {
    const currency = getCurrency();
    return amount.toLocalString("fr-FR") + " " + currency;
}

function updateUpcommingSummary () {
    let total = 0;
    upcomingCharges.forEach(c => total += c.amount);
    document.getElementById("trans-upcoming").textContent = formatMoney(total);
    document.getElementById("countMonthly").textContent = upcomingCharges.length + " Levy";
}

