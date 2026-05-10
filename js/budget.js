const categoriesSelect = document.getElementById("trans-category")
const subCategoriesSelect = document.getElementById("trans-subcategory")
const expensebtn = document.getElementById("type-expense")
const incomebtn = document.getElementById("type-income")
const saveTransactionbtn = document.getElementById("btn-save-transaction")
const displaytransact = document.getElementById("display-transaction")
const addBtnTrans = document.getElementById("btn-add-transaction")
let transactions = [];
const displaytransactForm = document.getElementById("transactionForm")

function loadTransaction() {
    if(localStorage.getItem("pfm_transactions")) {
        transactions = JSON.parse(localStorage.getItem("pfm_transactions"));
    }
}

function saveTransaction() {
    localStorage.setItem("pfm_transactions", JSON.stringify(transactions));
}

addBtnTrans.addEventListener("click", () => {
    if (displaytransactForm.style.display === "none" || displaytransactForm.style.display === "") {
        displaytransactForm.style.display = "block";
        addBtnTrans.textContent = "Cancel";
    }
    else {
        displaytransactForm.style.display = "none";
        addBtnTrans.textContent = "+ Add";
    }
});
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
    
    if (!this.value) {
        return;
    }
    if (localStorage.getItem("pfm_categories")) {
        const categories = JSON.parse(localStorage.getItem("pfm_categories"))
        const search = categories.find(categ => categ.id == this.value)
        if (search && search.subCategories) {
            search.subCategories.forEach(subCateg => {
                const opt = document.createElement("option");
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
    const labelValue = document.getElementById("trans-label").value.trim();
    const amount = parseFloat(document.getElementById("trans-amount").value);
    const categId = categoriesSelect.value;
    const subCateg = subCategoriesSelect.value;
    const date = document.getElementById("trans-date").value;

    if (!labelValue|| !amount || !categId || !date) {
        alert("Please fill in all fields!");
        return;
    }
    const newTransaction = {
        id: Date.now(),
        type: type,
        label: labelValue,
        amount: amount,
        categId: parseInt(categId),
        subCateg: subCateg,
        date: date
    };
    transactions.push(newTransaction);
    saveTransaction();
    displayTransaction();

    labelValue.value = "";
    document.getElementById("trans-amount").value = "";
    subCategoriesSelect.innerHTML = '<option value="">Subcategory</option>';

    displaytransactForm.style.display = "none"
    addBtnTrans.textContent = "+ Add";
})

function displayTransaction() {
    displaytransact.innerHTML = "";

    displaytransact.innerHTML += `
        <div class="transaction-header">
            <span>Date</span>
            <span>Labels</span>
            <span>Categories</span>
            <span>Amount</span>
        </div>
    `;

    transactions.forEach(trans => {
        const div = document.createElement("div");
        div.className = `transaction-item ${trans.type}`;
        div.innerHTML = `
            <span>${trans.date}</span>
            <span>${trans.label}</span>
            <span>${trans.subCateg || '---'}</span>
            <span class="amount ${trans.type}">
                ${trans.type === "expense" ? '-' : '+'} ${trans.amount} Ar
            </span>
            <button class="delete-btn" data-id="${trans.id}">🗑️</button>
        `;
        displaytransact.appendChild(div);
    })
    const deletebtn = document.querySelectorAll(".delete-btn")
    deletebtn.forEach(btn => {
        btn.addEventListener("click", () => {
            if(confirm("Delete this transaction?")) {
                const id = parseInt(btn.getAttribute("data-id"))
                transactions = transactions.filter(trans => trans.id !== id);
                saveTransaction();
                displayTransaction();
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", () => {
    loadTransaction();
    selectCategories();
    displayTransaction();
});