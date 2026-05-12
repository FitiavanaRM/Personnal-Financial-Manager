const dashBalance = document.getElementById("dash-balance")
const dashIncome = document.getElementById("dash-income")
const dashExpense = document.getElementById("dash-expense")
const upcomingLst = document.getElementById("dash-upcoming-list")
const goalList = document.getElementById("dash-goals-list")

const monthDisplay = document.getElementById("currentMonthDisplay")
const prevMonth = document.getElementById("prevMonth")
const nextMonth = document.getElementById("nextMonth")

const expenseChartDisplay = document.getElementById("expenseChart")

let expenseChart;
function createChart(transactions) {
  const categoryTotals = {};
  transactions.forEach(element => {
    if(element.type === "expense" && element.subCateg) {
      if(!categoryTotals[element.subCateg]) {
        categoryTotals[element.subCateg] = 0;
      }
      categoryTotals[element.subCateg] += element.amount;
    }
  });

  const labels = Object.keys(categoryTotals);
  const data = Object.values(categoryTotals);

  const colors = [ "#9b3e3e", "#896930", "#987b23", "#5a7630", "#308750", "#10b981", "#14b8a6", "#06b6d4"];

  if (expenseChart) {
    expenseChart.destroy();
  }

  expenseChart = new Chart(expenseChartDisplay, {
    type : "doughnut",
    data: {
      labels: labels.length ? labels: ["None"],
      datasets: [{
        data: data.length ? data : [1],
        backgroundColor : colors,
        borderWidth: 2,
        borderColor: "#1e2937"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            colors: "#e2e8f0",
            padding: 15,
            font: {
              size: 13
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + " : " + context.raw + " Ar";
            }
          }
        }
      }
    }
  });
}
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
  updateUpcoming(upcoming);
  updateGoals(goals);
  createChart(transactions);
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
    upcomingLst.innerHTML = "<p>NONE</p>";
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
    const progress = element.targetAmount ? Math.min((element.saveAmount / element.targetAmount) * 100, 100) : 0;
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
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October ","November", "December"];

function updateMonth() {
  monthDisplay.textContent = `${monthNames[defaultMonth-1]} 2026`;
}

prevMonth.addEventListener("click", () => {
  defaultMonth = defaultMonth > 1 ? defaultMonth - 1 : 12;
  updateMonth();
});

nextMonth.addEventListener("click", () => {
  defaultMonth = defaultMonth < 12 ? defaultMonth + 1 : 1;
  updateMonth();
});

document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
  updateMonth();
})



