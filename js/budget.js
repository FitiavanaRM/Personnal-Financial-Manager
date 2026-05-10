const categoriesSelect = document.getElementById("trans-category")
const subCategoriesSelect = document.getElementById("trans-subcategory")
const expensebtn = document.getElementById("type-expense")
const incomebtn = document.getElementById("type-income")
const saveTransactionbtn = document.getElementById("btn-save-transaction")
const type = document.querySelector(".type-btn.active")
const label = document.getElementById("trans-label")
const displaytransact = document.getElementById("display-transaction")
let transactions = [];

function loadTransaction() {
    if(localStorage.getItem("pfm_transactions")) {
        transactions = JSON.parse(localStorage.getItem("pfm_transactions"));
    }
}

function saveTransaction() {
    localStorage.setItem("pfm_transactions", JSON.stringify(transactions));
}

function selectCategories () {
    categoriesSelect.innerHTML = '<option value="">Select a category</option>';
    if (localStorage.getItem("pfm_categories")) {
        const categ = JSON.parse(localStorage.getItem("pfm_categories"))
        categ.forEach(element => {
            const choice = document.createElement("option")
            choice.value = element.id;
            choice.textContent = element.name;
            categoriesSelect.appendChild(choice)
        });
    }
}

categoriesSelect.addEventListener("change", function() {
    subCategoriesSelect.innerHTML = '<option value="">Subcategories</option>';
    const opt = document.createElement("option");

    if (!this.value) {
        return;
    }
    if (localStorage.getItem("pfm_categories")) {
        const categories = JSON.parse(localStorage.getItem("pfm_categories"))
        const search = categories.find(categ => categ.id == this.value)
        if (search && search.subCategories) {
            search.subCategories.forEach(subCateg => {
                opt.value = subCateg;
                opt.textContent = subCateg;
                subCategoriesSelect.appendChild(opt);
            });
        }
    }
});

expensebtn.addEventListener("click", () => {
    expensebtn.classList.add("active");
    incomebtn.classList.remove("active");
})

incomebtn.addEventListener("click", () => {
    incomebtn.classList.add("active");
    expensebtn.classList.remove("active");
})

saveTransactionbtn.addEventListener("click", () => {
    const isExpense = document.getElementById("type-expense").classList.contains("active");
    const type = isExpense ? "expense" : "income";
    const amount = parseFloat(document.getElementById("trans-amount").value);
    const categId = categoriesSelect.value;
    const subCateg = subCategoriesSelect.value;
    const date = document.getElementById("trans-date").value;

    if (!label.value.trim || !amount || !categId || !date) {
        alert("Please fill in all fields!");
        return;
    }
    const newTransaction = {
        id: Date.now(),
        type: type,
        label: label,
        amount: amount,
        categId: parseInt(categId),
        subCateg: subCateg,
        date: date
    };
    transactions.push(newTransaction);
    saveTransaction();
    
    label.value = "";
    document.getElementById("trans-amount").value = "";
    subCategoriesSelect.innerHTML = '<option value="">Subcategory</option>';
})

function displayTransaction() {
    displaytransact.innerHTML = "";

    transactions.forEach(trans => {
        const div = document.createElement("div");
        div.className = `transaction-item ${trans.type}`;
        div.innerHTML = `
            <span class = "trans-date">${trans.date}</span>
            <div class = "trans-details>
                <strong>${trans.label}</strong><br>
                <small>${trans.subCateg || ''}</small>
            </div>
        `
    })
}
document.addEventListener("DOMContentLoaded", () => {
    loadTransaction();
    selectCategories();
});