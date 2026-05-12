const dashBalance = document.getElementById("dash-balance")
const dashIncome = document.getElementById("dash-income")
const dashExpense = document.getElementById("dash-expense")
const upcomingLst = document.getElementById("dash-upcoming-list")
const goalList = document.getElementById("dash-goals-list")

const monthDisplay = document.getElementById("currentMonthDisplay")
const prevMonth = document.getElementById("prevMonth")
const nextMonth = document.getElementById("nextMonth")

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

  updateSummary(transactions);
  upcomingLst(upcoming);
  updateGoals(goals);
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

function updateGoals(goals) {
  goalList.innerHTML = "";

  if(goals.length === 0) {
    goalList.innerHTML = "<p>None</p>";
    return;
  }

  goals.slice(0, 2).forEach(element => {
    const progress = goalList.targetAmount ? Math.min((element.saveAmount / element.targetAmount) * 100, 100) : 0;
    const div = document.createElement("div");
    div.className = "goal-item";
    div.innerHTML = ` 
      <div class="goal-name">${element.name}</div>
      <div class="progress-bar">
        <div class="progress" style="width: ${progress}%"></div>
      </div>
      <small>${element.savedAmount} / ${element.targetAmount} Ar</small>
    `;
    goalList.appendChild(div);
  });
}

let defaultMonth = 5;
const monthNames = ["January", "Febroary", "March", "April", "Mey", "June", "July", "August", "September", "November", "December"];

function updateMonth() {
  monthDisplay.textContent = `${monthNames[defaultMonth-1]} 2026`;
}

prevMonth.addEventListener("click", () => {
  defaultMonth = defaultMonth > 1 ? currentMonth - 1 : 12;
  updateMonth();
});

nextMonth.addEventListener("click", () => {
  defaultMonth = defaultMonth < 12 ? currentMonth + 1 : 1;
  updateMonth();
});

document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
  updateMonth();
})



