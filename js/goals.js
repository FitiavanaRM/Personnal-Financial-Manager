let goals = [];

const goalsGrid = document.querySelector('.goals-grid');
const totalSavedEl = document.querySelector('.stats-grid .stat-card:nth-child(1) .stat-value');
const activeGoalsEl = document.querySelector('.stats-grid .stat-card:nth-child(2) .stat-value');
const overallProgressEl = document.querySelector('.stats-grid .stat-card:nth-child(3) .stat-value');

const newGoalBtn = document.querySelector('#goals .btn-primary');

function formatMoney(amount) {
    return Number(amount).toLocaleString('fr-FR') + ' Ar';
}

function loadGoals() {
    const saved = localStorage.getItem('pfm_goals');
    goals = saved ? JSON.parse(saved) : [];
}

function saveGoals() {
    localStorage.setItem('pfm_goals', JSON.stringify(goals));
}

function calculateProgress(saved, target) {
    if (!target || target <= 0) return 0;
    return Math.min(Math.floor((saved / target) * 100), 100);
}

function updateStats() {
    let totalSaved = 0;
    let active = 0;
    let completed = 0;

    goals.forEach(goal => {
        totalSaved += goal.savedAmount || 0;
        if (goal.status !== 'completed') active++;
        else completed++;
    });

    const totalGoals = goals.length;
    const overallProgress = totalGoals ? 
        Math.floor((goals.reduce((sum, g) => sum + calculateProgress(g.savedAmount, g.targetAmount), 0)) / totalGoals) : 0;

    totalSavedEl.textContent = formatMoney(totalSaved);
    activeGoalsEl.textContent = `${active} / ${totalGoals}`;
    overallProgressEl.textContent = `${overallProgress} %`;
}

function createProgressRing(percentage) {
    const circumference = 220;
    const offset = circumference - (circumference * percentage / 100);
    
    return `
        <svg class="progress-ring" width="80" height="80">
            <circle class="ring-bg" cx="40" cy="40" r="35" />
            <circle class="ring-fill" cx="40" cy="40" r="35" 
                    style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};" />
        </svg>
        <span class="percentage">${percentage}%</span>
    `;
}

function renderGoals() {
    goalsGrid.innerHTML = '';

    if (goals.length === 0) {
        goalsGrid.innerHTML = `
            <p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b;">
                None.<br>
                Cliquez sur "+ New goal"
            </p>`;
        return;
    }

    goals.forEach(goal => {
        const progress = calculateProgress(goal.savedAmount, goal.targetAmount);
        const isCompleted = goal.status === 'completed' || progress >= 100;

        if (isCompleted && goal.status !== 'completed') {
            goal.status = 'completed';
        }

        const goalEl = document.createElement('div');
        goalEl.className = `goal-item ${isCompleted ? 'completed' : ''}`;
        goalEl.innerHTML = `
            <div class="goal-top">
                <h3>${goal.name}</h3>
                <span class="deadline">
                    ${goal.deadline ? 'Deadline: ' + goal.deadline : 'Sans échéance'}
                </span>
            </div>
            <div class="goal-body">
                <div class="progress-ring-container">
                    ${createProgressRing(progress)}
                </div>
                <div class="goal-info">
                    <p class="saved">${formatMoney(goal.savedAmount)}</p>
                    <p class="target">of ${formatMoney(goal.targetAmount)} (target)</p>
                    <p class="monthly-add">0 Ar this month</p>
                </div>
                <button class="btn-action" data-id="${goal.id}">
                    + Déposer
                </button>
            </div>
        `;

        goalsGrid.appendChild(goalEl);
    });

    updateStats();
}

function addNewGoal() {
    const name = prompt("Goal name :");
    if (!name) {
        return;
    } 

    const target = parseFloat(prompt("Targeted amount (Ar) :"));
    if (!target || target <= 0) {
        alert("Invalid targeted amount!");
        return;
    }

    const deadline = prompt("Deadline :") || "";

    const newGoal = {
        id: Date.now(),
        name: name.trim(),
        targetAmount: target,
        savedAmount: 0,
        deadline: deadline,
        deposits: [],
        status: 'active'
    };

    goals.push(newGoal);
    saveGoals();
    renderGoals();
}

function depositToGoal(id) {
    const goal = goals.find(g => g.id === id);
    if (!goal) return;

    const amount = parseFloat(prompt(`How much do you want to deposit in "${goal.name}" ?`));
    if (!amount || amount <= 0) {
        return;
    }
    goal.savedAmount += amount;
    goal.deposits.push({
        amount: amount,
        date: new Date().toISOString().split('T')[0]
    });

    saveGoals();
    renderGoals();
}

function initGoals() {
    loadGoals();
    renderGoals();
    newGoalBtn.addEventListener('click', addNewGoal);
    goalsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-action')) {
            const id = Number(e.target.dataset.id);
            depositToGoal(id);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('goals').style.display !== 'none') {
        initGoals();
    }
});