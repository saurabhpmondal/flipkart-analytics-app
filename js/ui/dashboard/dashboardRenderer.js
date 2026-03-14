export function renderDashboard(){

document.getElementById('dashboard-charts').innerHTML = `

<div class="chart-box">
<canvas id="gmvChart"></canvas>
</div>

<div class="chart-box">
<canvas id="adsChart"></canvas>
</div>

`;

const gmvCtx = document.getElementById('gmvChart');

new Chart(gmvCtx,{
type:'line',
data:{
labels:['Mon','Tue','Wed','Thu','Fri'],
datasets:[{
label:'GMV',
data:[120,190,300,500,200]
}]
}
});

const adsCtx = document.getElementById('adsChart');

new Chart(adsCtx,{
type:'bar',
data:{
labels:['Mon','Tue','Wed','Thu','Fri'],
datasets:[{
label:'Ads Spend',
data:[20,40,50,30,60]
}]
}
});

}
