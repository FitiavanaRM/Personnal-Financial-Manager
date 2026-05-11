/*const filterPeriode = document.getElementById("filterPeriod")
const filterStart = document.getElementById("filterStart")
const filterEnd = document.getElementById("filterEnd")
const typeFilter = document.getElementById("typeFilter")
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
    addEvents();
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

    if (filterPeriode.value === "month") {
        filtered = filtered.filter(filt => {
            const dateFilt = new Date(filt.date)
            return dateFilt.getMonth() === now.getMonth() && dateFilt.getFullYear() === now.getFullYear()
        });
    }
    if (filterPeriode.value === "3month") {
        filtered = filtered.filter(filt => {
            const dateFilt = new Date(filt.date)
            const diff = (now - dateFilt) / (1000 * 60 * 60 * 24)
            return diff <= 90
        });
    }
    if (filterPeriode.value === "year") {
        filtered = filtered.filter(filt => {
            const dateFilt = new Date(filt.date)
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
    displayTransaction(filtered);
    updateSummary(filtered);
}
function displayTransaction(list) {
    historyList.innerHTML = "";
    if (list.length === 0) {
        historyList.innerHTML = "<p>No transactions found</p>";
        return;
    }
    list.slice().reverse().forEach(filt => {
        const div = document.createElement("div")
        div.className = "transaction-item";
        div.innerHTML = `
            <div>
                <strong>${filt.label}</strong>
                <small>${filt.date}</small>
            </div>
            <div class="${filt.type}">
                ${filt.type === "income" ? "+" : "-"}${filt.amount} Ar
            </div>
        `;
        historyList.appendChild(div);
    });
}
function updateSummary(list) {
    let income = 0;
    let expense = 0;

    list.forEach(filt => {
        if (filt.type === "income") {
            income += Number(filt.amount)
        }
        else {
            expense += Number(filt.amount)
        }
    });

    const balance = income - expense;
    totalIncome.textContent = income + "Ar";
    totalExpense.textContent = expense + "Ar";
    netBalance.textContent = balance + "Ar";
}

function addEvents() {
    document.querySelectorAll(".filter select, .filter input").forEach(el => {
        el.addEventListener("change", applyFilter)
    });

    resetBtn.addEventListener("click", () => {
        filterPeriode.value = "all";
        filterStart.value = "";
        filterEnd.value = "";
        typeFilter.value = "";
        categoryFilter.value = "";

        displayTransaction(transactions);
        updateSummary(transactions);

        resetBtn.style.transform = "scale(0.95)";
        setTimeout(() => {
            resetBtn.style.transform = "scale(1)";
        }, 150);
        //applyFilters();
    });
}

document.addEventListener("DOMContentLoaded", init);*/