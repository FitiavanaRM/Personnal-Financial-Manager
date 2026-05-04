const inputBox = document.getElementById("name-input")
const addBtn = document.getElementById("addCategories")
const btnSave = document.getElementById("btnSave")
const btnDelete = document.getElementById("btnDelete")
const displayCate = document.getElementById("alreadyAdded")
const listSubcategory = document.getElementById("listSubcategory")
let selectColor = "#2b5990"
const choiceColor = document.querySelectorAll(".display-color")

choiceColor.forEach(btn => {
    btn.addEventListener("click", () => {
        selectColor = btn.getAttribute("data-color")
        choiceColor.forEach(elmnt => elmnt.style.border = "none")
        btn.style.border = "2px solid black"
    });
})

btnSave.addEventListener("click", ()=> {
    const name = inputBox.value.trim()
    const Categ = JSON.parse(localStorage.getItem("pfm_categories")) || []
    const categories = {
        id : Date.now(),
        name : name,
        color : selectColor,
        subCategories : []
    };

    Categ.push(categories);
    localStorage.setItem('pfm_categories', JSON.stringify(Categ))
    inputBox.value = "";  
    displayCategories()
})

function displayCategories() {
    displayCate.innerHTML = "";
    const Categ = JSON.parse(localStorage.getItem("pfm_categories")) || []
    Categ.forEach(category => {
        const item = document.createElement('div');
        item.className = 'category';
        
        item.innerHTML = `
            <div class="left">
                <span class="colorCateg" style="background-color: ${category.color}"></span>
                <span class="category-name">${category.name}</span>
            </div>
            <div class="right">
                <span class="subcategory-count">${category.subCategories.length} sous-cat.</span>
                <span class="arrow">▶</span>
            </div>
        `;
        displayCate.appendChild(item);
    })
}

document.addEventListener("DOMContentLoaded", displayCategories)