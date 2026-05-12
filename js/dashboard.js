
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
