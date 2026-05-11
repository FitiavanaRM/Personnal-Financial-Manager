// Ajoutez Chart.js dans votre <head> HTML : 
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

function updateDashboard() {
    const transactions = JSON.parse(localStorage.getItem("pfm_transactions")) || [];
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let totalIncome = 0;
    let totalExpense = 0;
    let categoryData = {};

    transactions.forEach(t => {
        const tDate = new Date(t.date);
        if (tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear) {
            if (t.type === "income") {
                totalIncome += t.amount;
            } else {
                totalExpense += t.amount;
                // Pour le graphique
                categoryData[t.subCateg] = (categoryData[t.subCateg] || 0) + t.amount;
            }
        }
    });

    // Mise à jour des textes
    document.getElementById("dash-solde").textContent = formatMoney(totalIncome - totalExpense);
    document.getElementById("dash-revenus").textContent = formatMoney(totalIncome);
    document.getElementById("dash-depenses").textContent = formatMoney(totalExpense);

    renderChart(categoryData);
}

function renderChart(data) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    if (window.myChart) window.myChart.destroy(); // Éviter les superpositions

    window.myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: ['#2b5990', '#22d1bc', '#7d5fff', '#e29236', '#d82d1a']
            }]
        },
        options: { cutout: '70%' }
    });
}

// Appeler updateDashboard() quand on clique sur le bouton Dashboard
document.getElementById("btn-dashboard").addEventListener("click", updateDashboard);