// ======================
// DASHBOARD.JS
// ======================

// STORAGE KEYS
const TRANSACTIONS_KEY = "pfm_transactions";
const UPCOMING_KEY = "pfm_upcoming";
const GOALS_KEY = "pfm_goals";
const CATEGORIES_KEY = "pfm_categories";
const SETTINGS_KEY = "pfm_settings";

// ======================
// GET DATA
// ======================

const transactions =
  JSON.parse(localStorage.getItem(TRANSACTIONS_KEY)) || [];

const upcoming =
  JSON.parse(localStorage.getItem(UPCOMING_KEY)) || [];

const goals =
  JSON.parse(localStorage.getItem(GOALS_KEY)) || [];

const categories =
  JSON.parse(localStorage.getItem(CATEGORIES_KEY)) || [];

const settings =
  JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {
    currency: "MGA",
    theme: "light",
  };


// ======================
// HELPERS
// ======================

function formatMoney(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: settings.currency || "MGA",
    minimumFractionDigits: 0,
  }).format(value);
}

function sumByType(type) {
  return transactions
    .filter((t) => t.type === type)
    .reduce((acc, t) => acc + Number(t.amount), 0);
}

function getCurrentMonthTransactions() {
  const now = new Date();

  return transactions.filter((t) => {
    const d = new Date(t.date);

    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  });
}


// ======================
// GLOBAL STATS
// ======================

function loadDashboardStats() {
  const income = sumByType("income");
  const expense = sumByType("expense");
  const balance = income - expense;

  document.getElementById("totalIncome").textContent =
    formatMoney(income);

  document.getElementById("totalExpense").textContent =
    formatMoney(expense);

  document.getElementById("totalBalance").textContent =
    formatMoney(balance);
}


// ======================
// RECENT TRANSACTIONS
// ======================

function loadRecentTransactions() {
  const container = document.getElementById("recentTransactions");

  if (!container) return;

  container.innerHTML = "";

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (recent.length === 0) {
    container.innerHTML = `<p>Aucune transaction</p>`;
    return;
  }

  recent.forEach((t) => {
    const div = document.createElement("div");

    div.className = "transaction-item";

    div.innerHTML = `
      <div>
        <strong>${t.label}</strong>
        <small>${t.date}</small>
      </div>

      <div class="${t.type}">
        ${
          t.type === "income" ? "+" : "-"
        } ${formatMoney(t.amount)}
      </div>
    `;

    container.appendChild(div);
  });
}


// ======================
// UPCOMING PAYMENTS
// ======================

function loadUpcoming() {
  const container = document.getElementById("upcomingList");

  if (!container) return;

  container.innerHTML = "";

  const sorted = [...upcoming]
    .sort((a, b) => new Date(a.nextDate) - new Date(b.nextDate))
    .slice(0, 5);

  if (sorted.length === 0) {
    container.innerHTML = `<p>Aucun paiement à venir</p>`;
    return;
  }

  sorted.forEach((item) => {
    const div = document.createElement("div");

    div.className = "upcoming-item";

    div.innerHTML = `
      <div>
        <strong>${item.label}</strong>
        <small>${item.nextDate}</small>
      </div>

      <div>
        ${formatMoney(item.amount)}
      </div>
    `;

    container.appendChild(div);
  });
}


// ======================
// GOALS
// ======================

function loadGoals() {
  const container = document.getElementById("goalsList");

  if (!container) return;

  container.innerHTML = "";

  if (goals.length === 0) {
    container.innerHTML = `<p>Aucun objectif</p>`;
    return;
  }

  goals.forEach((goal) => {
    const percent = Math.min(
      (goal.savedAmount / goal.targetAmount) * 100,
      100
    );

    const div = document.createElement("div");

    div.className = "goal-item";

    div.innerHTML = `
      <div class="goal-header">
        <strong>${goal.name}</strong>
        <span>${percent.toFixed(0)}%</span>
      </div>

      <div class="goal-bar">
        <div 
          class="goal-progress"
          style="width:${percent}%"
        ></div>
      </div>

      <small>
        ${formatMoney(goal.savedAmount)}
        / 
        ${formatMoney(goal.targetAmount)}
      </small>
    `;

    container.appendChild(div);
  });
}


// ======================
// MONTHLY SUMMARY
// ======================

function loadMonthlySummary() {
  const monthly = getCurrentMonthTransactions();

  const income = monthly
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = monthly
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  document.getElementById("monthIncome").textContent =
    formatMoney(income);

  document.getElementById("monthExpense").textContent =
    formatMoney(expense);
}


// ======================
// CATEGORY EXPENSES
// ======================

function loadCategoryStats() {
  const container = document.getElementById("categoryStats");

  if (!container) return;

  container.innerHTML = "";

  const expenses = transactions.filter(
    (t) => t.type === "expense"
  );

  const grouped = {};

  expenses.forEach((t) => {
    if (!grouped[t.categoryId]) {
      grouped[t.categoryId] = 0;
    }

    grouped[t.categoryId] += Number(t.amount);
  });

  Object.keys(grouped).forEach((catId) => {
    const category = categories.find((c) => c.id == catId);

    const div = document.createElement("div");

    div.className = "category-item";

    div.innerHTML = `
      <div>
        <span 
          class="category-color"
          style="background:${category?.color || "#999"}"
        ></span>

        ${category?.name || "Unknown"}
      </div>

      <strong>${formatMoney(grouped[catId])}</strong>
    `;

    container.appendChild(div);
  });
}


// ======================
// INIT
// ======================

function initDashboard() {
  loadDashboardStats();
  loadRecentTransactions();
  loadUpcoming();
  loadGoals();
  loadMonthlySummary();
  loadCategoryStats();
}

document.addEventListener("DOMContentLoaded", initDashboard);