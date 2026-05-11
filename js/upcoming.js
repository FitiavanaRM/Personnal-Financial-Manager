const nextPaymentLabel = document.getElementById("nextPayment")
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
    return amount.toLocaleString("fr-FR") + " " + currency;
}

function updateUpcommingSummary () {
    let total = 0;
    upcomingCharges.forEach(charge => total += charge.amount);
document.getElementById("trans-upcoming").textContent = formatMoney(total);
    document.getElementById("countMonthly").textContent = upcomingCharges.length + " Levy";

    if (upcomingCharges.length > 0) {
        const next = upcomingCharges[0];
        document.getElementById("nextPayment").textContent = next.label;
        document.getElementById("nextPaymentDate").textContent = next.nextDate;
    } else {
        document.getElementById("nextPayment").textContent = "None";
        document.getElementById("nextPaymentDate").textContent = "---";
    }
}
function showTimeline() {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = "";

    if (upcomingCharges.length === 0) {
        timeline.innerHTML = `
            <p class="alert">
                No recurring charges yet.<br>
                Click on <strong>+New</strong> to add one
            </p>`;
        return;
    }
    function sortNextDate(charges) {
        return charges.slice().sort((a, b) => {
            const dateA = new Date(a.nextDate)
            const dateB = new Date(b.nextDate)
            return dateA.getTime - dateB.getTime;
        });
    }
    const sortedCharges = sortNextDate(upcomingCharges)
    sortedCharges.forEach(charge => {
        const div = document.createElement("div")
        div.className = `timeline-item`;
        div.innerHTML = `
            <div class="timeline-date">
                <span class="day">${new Date(charge.nextDate).getDate()}</span>
            </div>
            <div class="timeline-content">
                <b>${charge.label}</b><br>
                <small>${charge.frequency}</small>
            </div>
            <div class="timeline-amount red">
                ${formatMoney(charge.amount)}
            </div>
            <div class="timeline-actions">
                <button class="edit-btn" data-id="${charge.id}">✏️</button>
                <button class="delete-btn" data-id="${charge.id}">🗑️</button>
            </div>
        `;
        timeline.appendChild(div);
    });
}

function showForm() {
    const formUpcoming = document.getElementById("formUpcoming")
    formUpcoming.style.display = "block";
}
function hideForm() {
    const hideFormUpcoming = document.getElementById("formUpcoming")
    hideFormUpcoming.style.display = "none";
}
function saveNewCharge() {
    const label = document.getElementById("labelForm").value.trim();
    const amount = parseFloat(document.getElementById("amountForm").value);
    const frequency = document.getElementById("form-freq").value;
    const nextDate = document.getElementById("form-date").value;
    const autoDebit = document.getElementById("form-auto").checked;

    if (!label || !amount || !nextDate) {
        alert("Please fill in all required fields!");
        return;
    }

    const newCharge = {
        id: Date.now(),
        label: label,
        amount: -amount,
        categoryId: null,
        frequency: frequency,
        nextDate: nextDate,
        autoDebit: autoDebit
    };

    upcomingCharges.push(newCharge);
    saveUpcoming();
    showTimeline();
    updateUpcommingSummary();
    hideForm();
}
document.addEventListener("DOMContentLoaded", () => {
    loadUpcoming();
    showTimeline();
    updateUpcommingSummary();

    document.getElementById("UpcomingBtn").addEventListener("click", showForm);
    document.getElementById("form-cancel").addEventListener("click", hideForm);
    document.getElementById("form-save").addEventListener("click", saveNewCharge);

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            if (confirm("Delete this recurring charge?")) {
                const id = Number(e.target.dataset.id);
                upcomingCharges = upcomingCharges.filter(c => c.id !== id);
                saveUpcoming();
                showTimeline();
                updateSummary();
            }
        }

        if (e.target.classList.contains("edit-btn")) {
            alert("Edit function will be added later.");
        }
    });
});