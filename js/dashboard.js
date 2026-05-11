/*const transactions = JSON.parse(localStorage.getItem("pfm_transactions")) || [];
const upcoming = JSON.parse(localStorage.getItem("pfm_upcoming")) || [];
const goals = JSON.parse(localStorage.getItem("pfm_goals")) || [];
const categories = JSON.parse(localStorage.getItem("pfm_categories")) || [];
const settings = JSON.parse(localStorage.getItem("pfm_settings")) || {
    currency: "MGA",
    theme: "light",
};

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

function loadDashboardStats() {
    const income = sumByType("income");
    const expense = sumByType("expense");
    const balance = income - expense;
    document.getElementById("totalIncome").textContent = formatMoney(income);
    document.getElementById("totalExpense").textContent = formatMoney(expense);
    document.getElementById("totalBalance").textContent = formatMoney(balance);
}
function loadRecentTransactions() {
    const container = document.getElementById("recentTransactions");
    if (!container) return;
    container.innerHTML = "";
    const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

    if (recent.length === 0) {
        container.innerHTML = `<p>None</p>`;
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
*/
