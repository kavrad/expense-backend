

async function showDailyExpenses(){
    const token=localStorage.getItem('token');
    const response=await axios.get("http://localhost:800/report/daily-expenses",{headers:{"Authorization":token}});
    console.log(response);
}
showDailyExpenses();

console.log('kavya');