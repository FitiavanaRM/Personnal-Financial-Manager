const dashBalance = document.getElementById("dash-balance")
const dashIncome = document.getElementById("dash-income")
const dashExpense = document.getElementById("dash-expense")
const upcomingLst = document.getElementById("dash-upcoming-list")

function loadDashboard() {
  
  let transactions = [];
  let goals = [];
  let upcoming = [];

  if (localStorage.getItem("pfm_transactions")) {
    transactions = JSON.parse(localStorage.getItem("pfm_transactions"));
  }
  if(localStorage.getItem("pfm_goals")) {
    goals = JSON.parse(localStorage.getItem("pfm_goals"));
  } 
  if(localStorage.getItem("pfm_upcoming")) {
    upcoming = JSON.parse(localStorage.getItem("pfm_upcoming"));
  }
}

function updateSummary(transactions) {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(element => {
    if(element.type === "income") {
      totalIncome += element.amount;
    }
    else {
      totalExpense += element.amount;
    }
  }); 
  
  const balance = totalIncome - totalExpense;
  dashBalance.textContent = balance.toLocaleString("fr-MG") + "Ar";
  dashIncome.textContent = totalIncome.toLocaleString("fr-MG") + "Ar";
  dashExpense.textContent = totalExpense.toLocaleString("fr-MG") + "Ar";

  dashBalance.style.color = balance >= 0 ? "#22d1bc" : "#ef4444";
}

function updateUpcoming(upcoming) {
  upcomingLst.innerHTML = "";

  if(upcoming.length === 0) {
    upcomingLst = "<p>NONE</p>";
    return;
  }

  upcoming.slice(0, 3).forEach(element => {
    const div = document.createElement("div")
    div.className = "upcoming-lst";
    div.innerHTML = `
      <span>${element.label || 'Charge'}</span>
      <span class="red">- ${element.amount} Ar</span>
    `;
    upcomingLst.appendChild(div);
  })
}