// js/reports/sales/categoryPerformance.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function renderCategoryPerformance(containerId){

const data = applyDateFilter("EM","Order Date");

const grouped={};
let total=0;

data.forEach(r=>{

const cat=r["Category"];

if(!cat)return;

if(!grouped[cat]) grouped[cat]={gross:0,cancel:0,returns:0,revenue:0};

grouped[cat].gross+=Number(r["Gross Units"]||0);
grouped[cat].cancel+=Number(r["Cancellation Units"]||0);
grouped[cat].returns+=Number(r["Return Units"]||0);
grouped[cat].revenue+=Number(r["Final Sale Amount"]||0);

total+=Number(r["Gross Units"]||0);

});

const rows=[];

Object.keys(grouped).forEach(cat=>{

const g=grouped[cat];
const net=g.gross-g.cancel-g.returns;

rows.push({
cat,
gross:g.gross,
cancel:g.cancel,
returns:g.returns,
net,
revenue:g.revenue,
share:g.gross/total
});

});

rows.sort((a,b)=>b.gross-a.gross);

const container=document.getElementById(containerId);

let html=`<table>
<thead>
<tr>
<th>Category</th>
<th>Gross</th>
<th>Cancel</th>
<th>Return</th>
<th>Net</th>
<th>Revenue</th>
<th>Share</th>
</tr>
</thead><tbody>`;

rows.forEach(r=>{

html+=`<tr>
<td>${r.cat}</td>
<td>${r.gross}</td>
<td>${r.cancel}</td>
<td>${r.returns}</td>
<td>${r.net}</td>
<td>${r.revenue}</td>
<td>${(r.share*100).toFixed(2)}%</td>
</tr>`;

});

html+="</tbody></table>";

container.innerHTML=html;

}
