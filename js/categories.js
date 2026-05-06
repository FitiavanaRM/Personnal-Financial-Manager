const inputBox = document.getElementById("name-input")
const addBtn = document.getElementById("addCategories")
const btnSave = document.getElementById("btnSave")
const btnDelete = document.getElementById("btnDelete")
const listSubcategory = document.getElementById("listSubcategory")
const btnAddSub = document.getElementById("btn-add-subcategories")
const displayCate = document.getElementById("alreadyAdded")
const choiceColor = document.querySelectorAll(".display-color")
const editCategories = document.getElementById("editCategories")

let selectColor = "#2b5990"
let categories = [];
let editingId = null;


document.addEventListener("DOMContentLoaded", () => {
    displayCategories();
}); 

function localCategories() {
    if (localStorage.getItem("pfm_categories")) {
        categories = JSON.parse(localStorage.getItem("pfm_categories"));
    }
    else {
        categories = DefaultCategories();
        saveCategories();
    }
}

function DefaultCategories () {
    return [
        {
            id: 1, name: "Salary", color: "#464b4a", subCategories: ["Bonus", "Main Salary"]
        },
        {
            id: 2, name: "Food", color: "#22d1bc", subCategories : ["Restaurant", "Street food"]
        },
        {
            id: 3, name: "Transport", color: "#2b5990", subCategories: ["Taxi", "Bus"]
        },
        {
            id: 4, name: "Utilities", color: "#78ddf3", subCategories: ["Electricity", "water", "Internet"]
        },

    ]
}

function saveCategories() {
    localStorage.setItem("pfm_categories", JSON.stringify(categories))
}

function displayCategories() {
    displayCate.innerHTML = "";
    categories.forEach(category => {
        const div = document.createElement("div");
        div.className = 'category';
        
        div.innerHTML = `
            <div class="left">
                <span class="colorCateg" style="background-color: ${category.color}"></span>
                <span class="category-name">${category.name}</span>
            </div>
            <div class="right">
                <span class="subcategory-count">
                    ${category.subCategories.length} sub 
                </span>
                <span class="arrow">▶</span>
            </div>
        `;
        div.addEventListener("click", ()=> editCategory(category.id));
        displayCate.appendChild(div);
    })
}

addBtn.addEventListener("click", () => {
    editingId = null;
    inputBox.value = "";
    selectColor = "#2b5990";
    listSubcategory.innerHTML = "";
    editCategories.style.display = "block";
})

choiceColor.forEach(btn => {
    btn.addEventListener("click", () => {
        selectColor = btn.getAttribute("data-color")
        choiceColor.forEach(elmnt => {elmnt.style.border = "none"
        });
        btn.style.border = "2px solid black"
    });

})

// ====-- SUBCATEGORIES --==== //

btnAddSub.addEventListener("click", () => {
    const li = document.createElement("li")
    li.className = "subcategory-item";
    li.innerHTML = `
        <input type="text" placeholder="Subcategory name" class="input-subcategorie">
        <button class="remove-sub">x</button>
    `;
    
    const removeS = li.querySelector(".remove-sub")
    removeS.addEventListener("click", () => {
        li.remove();
    })
    listSubcategory.appendChild(li)
    li.querySelector("input").focus();
})

// ====-- Get Subcategories --==== // 
function getSubCategories() {
    const inputs = document.querySelectorAll("#listSubcategory .input-subcategorie")
    const subcategorie = [];

    inputs.forEach(input => {
        const value = input.value.trim()
        if (value !== "") {
            subcategorie.push(value)
        }
    });
    return subcategorie;
}

//////////// SAVED //////////////

btnSave.addEventListener("click", ()=> {
    const name = inputBox.value.trim();
    if (!name) {
        alert("Category name is required!");
        return;
    }
    const subCategorie = getSubCategories();
    const newCateg = {
        id : Date.now(),
        name : name,
        color : selectColor,
        subCategories : []
    };

    categories.push(newCateg);
    saveCategories();
    displayCategories();
    editCategories.style.display = "none";
})

// ====-- DELETE --==== //
btnDelete.addEventListener("click", () => {
    if (!editingId) {
        return;
    }

    categories = categories.filter(categ => categ.id !== editingId);
    saveCategories();
    displayCategories();
    editCategories.style.display = "none";
})

function editCategory(id) {
    currentEditingId = id;
    const category = categories.find(c => c.id === id);
    if (!category) return;

    document.getElementById("name-input").value = category.name;
    selectedColor = category.color;

    const ul = document.getElementById("listSubcategory");
    ul.innerHTML = "";

    category.subCategories.forEach(sub => {
        const li = document.createElement("li");
        li.className = "subcategory-item";
        li.innerHTML = `
            <input type="text" value="${sub}" class="input-subcategorie">
            <button class="remove-sub">×</button>
        `;
        li.querySelector(".remove-sub").addEventListener("click", () => li.remove());
        ul.appendChild(li);
    });

    document.getElementById("editCategories").style.display = "block";
}


