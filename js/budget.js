const categoriesSelect = document.getElementById("trans-category")
const subCategoriesSelect = document.getElementById("trans-subcategory")
const categories = JSON.parse(localStorage.getItem("pfm_categories"))
const expensebtn = document.getElementById("type-expense")
const incomebtn = document.getElementById("type-income")
let transactions = [];

function loadTransaction() {
    if(localStorage.getItem("pfm_transaction")) {
        transactions = JSON.parse(localStorage.getItem("pfm_transaction"));
    }
}

function saveTransaction() {
    localStorage.setItem("pfm_transaction", JSON.stringify(transactions));
}

function selectCategories () {
    categoriesSelect.innerHTML = '<option value="">Select a category</option>';
    if (localStorage.getItem("pfm_categories")) {
        categories.forEach(element => {
            const choice = document.createElement("option")
            choice.value = element.id;
            choice.textContent = element.name;
            categoriesSelect.appendChild(choice)
        });
    }
}

function selectSubcategories() {
    subCategoriesSelect.innerHTML = '<option value="">Subcategories</option>';
    const opt = document.createElement("option");
    if (!this.value) {
        return;
    }
    if (localStorage.getItem("pfm_categories")) {
        const search = categories.find(categ => categ.id == this.value)
        if (search && search.subCategories) {
            search.subCategories.forEach(subCateg => {
                opt.value = subCateg;
                opt.textContent = subCateg;
                subCategoriesSelect.appendChild(opt);
            });
        }
    }
}
CategoriesSelect.addEventListener("change", selectCategories());

expensebtn.addEventListener("click", () => {
    expensebtn.classList.add("active");
    incomebtn.classList.remove("active");
})

incomebtn.addEventListener("click", () => {
    incomebtn.classList.add("active");
    expensebtn.classList.remove("active");
})
document.addEventListener("DOMContentLoaded", () => {
    loadTransactions();
});