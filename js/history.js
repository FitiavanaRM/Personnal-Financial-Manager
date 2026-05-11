const filterPeriod = document.getElementById("filterPeriod")
const filterStart = document.getElementById("filterStart")
const filterEnd = document.getElementById("filterEnd")
const typeFilter = document.getElementById("categoryFilter")
const categoryFilter = document.getElementById("categoryFilter")
const resetBtn = document.getElementById("resetFilter")

const historyList = document.getElementById("historyList")
const totalIncome = document.getElementById("totalIncome")
const totalExpense = document.getElementById("totalExpense")
const netBalance = document.getElementById("netBalance")

let transactions = JSON.parse(localStorage.getItem("pfm_transactions")) || [];
let categories = JSON.parse(localStorage.getItem("pfm_categories")) || [];

init();
function init() {
    loadCategories();
    applyFilter();
}

function loadCategories() {
    categoryFilter.innerHTML = `<option value="">All category</option>`
    categories.forEach(element => {
        const option = document.createElement("option")
        option.value = element.id;
        option.textContent = element.name;
        categoryFilter.appendChild(option);
    });
}

function applyFilter() {
    let filtered = transactions.slice()
    const now = new Date()

    if (filterPeriod.value === "month") {
        filtered = filtered.filter(filt => {
            const dateFilt = new Date(filt.date)
            return dateFilt.getMonth() === now.getMonth() && dateFilt.getFullYear() === now.getFullYear()
        });
    }
    if (filterPeriod.value === "3month") {
        filtered = filtered.filter(filt => {
            const dateFilt = new Date(filt.date)
            const diff = (now - dateFilt) / (1000 * 60 * 60 * 24)
            return diff <= 90
        });
    }
    if (filterPeriod.value === "year") {
        filtered = filtered.filter(filt => {
            const dateFilt = new Date(filtt.date)
            return dateFilt.getFullYear() === now.getFullYear()
        })
    }
    if (filterStart.value) {
        filtered = filtered.filter(filt =>
            new Date(filt.date) >= new Date(filterStart.value)
        )
    }
    if (filterEnd.value) {
        filtered = filtered.filter(filt =>
            new Date(filt.date) <= new Date(filterEnd.value)
        )
    }
    if (typeFilter.value) {
        filtered = filtered.filter(filt =>
            filt.type === typeFilter.value
        )
    }
    if (categoryFilter.value) {
        filtered = filtered.filter(filt =>
            filt.categoryId == categoryFilter.value
        )
    }
}
function displayTransaction(list) {
    historyList.innerHTML = "";
    if (list.length === 0) {
        historyList.innerHTML = "<p>No transactions found</p>";
        return;
    }
    list.slice().reverse().forEach(t => {
        const div = document.createElement("div")
        div.className = "transaction-item";
        div.innerHTML = `
            <div>
                <strong>${t.label}</strong>
                <small>${t.date}</small>
            </div>
            <div class="${t.type}">
                ${t.type === "income" ? "+" : "-"}${t.amount} Ar
            </div>
        `;
        historyList.appendChild(div);
    });
}
