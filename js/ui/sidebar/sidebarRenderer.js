// js/ui/sidebar/sidebarRenderer.js

import { renderDashboard } from "../dashboard/dashboardRenderer.js";
import { renderReport } from "../dashboard/reportRouter.js";

export function renderSidebar(){

const sidebar=document.getElementById("sidebar");

const items=sidebar.querySelectorAll("[data-report]");

items.forEach(item=>{

item.onclick=()=>{

items.forEach(i=>i.classList.remove("active"));
item.classList.add("active");

const report=item.dataset.report;

if(report==="summary"){

reloadSummary();
return;

}

renderReport(report);

};

});

}

function reloadSummary(){

const charts=document.getElementById("dashboard-charts");
const tables=document.getElementById("dashboard-tables");

charts.innerHTML="";
tables.innerHTML="";

renderDashboard();

}
