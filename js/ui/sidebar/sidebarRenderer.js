
// js/ui/sidebar/sidebarRenderer.js

import { renderDashboard } from "../dashboard/dashboardRenderer.js";

/* SALES */
import { renderDailySales } from "../../reports/sales/dailySales.js";
import { renderProductPerformance } from "../../reports/sales/productPerformance.js";
import { renderCategoryPerformance } from "../../reports/sales/categoryPerformance.js";
import { renderBrandPerformance } from "../../reports/sales/brandPerformance.js";
import { renderLocationPerformance } from "../../reports/sales/locationPerformance.js";
import { renderProductHealth } from "../../reports/sales/productHealth.js";
import { renderVerticalPerformance } from "../../reports/sales/verticalPerformance.js";
import { renderFulfillmentPerformance } from "../../reports/sales/fulfillmentPerformance.js";

/* ADS */
import { renderCampaignPerformance } from "../../reports/ads/campaignPerformance.js";
import { renderDailyAdsPerformance } from "../../reports/ads/dailyAdsPerformance.js";
import { renderAdsFunnel } from "../../reports/ads/adsFunnel.js";
import { renderCampaignEfficiency } from "../../reports/ads/campaignEfficiency.js";

/* KEYWORDS */
import { renderKeywordPerformance } from "../../reports/keywords/keywordPerformance.js";
import { renderKeywordScaling } from "../../reports/keywords/keywordScaling.js";
import { renderKeywordWaste } from "../../reports/keywords/keywordWaste.js";

/* PLACEMENTS */
import { renderPlacementPerformance } from "../../reports/placements/placementPerformance.js";
import { renderPlacementEfficiency } from "../../reports/placements/placementEfficiency.js";

/* SKU ADS */
import { renderSkuAdsPerformance } from "../../reports/skuAds/skuAdsPerformance.js";
import { renderSkuConversion } from "../../reports/skuAds/skuConversion.js";
import { renderAdsDependency } from "../../reports/skuAds/adsDependency.js";

/* COMBINED */
import { renderAdsVsOrganic } from "../../reports/combined/adsVsOrganic.js";
import { renderSalesMomentum } from "../../reports/combined/salesMomentum.js";
import { renderProductLifecycle } from "../../reports/combined/productLifecycle.js";
import { renderTacosReport } from "../../reports/combined/tacosReport.js";


export function renderSidebar(){

const sidebar=document.getElementById("sidebar");

sidebar.innerHTML=`

<div class="sidebar-container">

<div class="menu-item summary" data-report="summary">
📊 Summary
</div>

<div class="accordion">

<div class="accordion-header">Sales</div>
<div class="accordion-body">
<div data-report="dailySales">Daily Sales</div>
<div data-report="productPerformance">Product Performance</div>
<div data-report="categoryPerformance">Category Performance</div>
<div data-report="brandPerformance">Brand Performance</div>
<div data-report="locationPerformance">Location Performance</div>
<div data-report="productHealth">Product Health</div>
<div data-report="verticalPerformance">Vertical Performance</div>
<div data-report="fulfillmentPerformance">Fulfillment Performance</div>
</div>

<div class="accordion-header">Ads</div>
<div class="accordion-body">
<div data-report="campaignPerformance">Campaign Performance</div>
<div data-report="dailyAdsPerformance">Daily Ads Performance</div>
<div data-report="adsFunnel">Ads Funnel</div>
<div data-report="campaignEfficiency">Campaign Efficiency</div>
</div>

<div class="accordion-header">Keywords</div>
<div class="accordion-body">
<div data-report="keywordPerformance">Keyword Performance</div>
<div data-report="keywordScaling">Keyword Scaling</div>
<div data-report="keywordWaste">Keyword Waste</div>
</div>

<div class="accordion-header">Placements</div>
<div class="accordion-body">
<div data-report="placementPerformance">Placement Performance</div>
<div data-report="placementEfficiency">Placement Efficiency</div>
</div>

<div class="accordion-header">SKU Ads</div>
<div class="accordion-body">
<div data-report="skuAdsPerformance">SKU Ads Performance</div>
<div data-report="skuConversion">SKU Conversion</div>
<div data-report="adsDependency">Ads Dependency</div>
</div>

<div class="accordion-header">Combined Analytics</div>
<div class="accordion-body">
<div data-report="adsVsOrganic">Ads vs Organic</div>
<div data-report="salesMomentum">Sales Momentum</div>
<div data-report="productLifecycle">Product Lifecycle</div>
<div data-report="tacosReport">TACOS Report</div>
</div>

</div>
</div>
`;

initSidebar();

}


function initSidebar(){

const headers=document.querySelectorAll(".accordion-header");

headers.forEach(header=>{

header.onclick=()=>{

const body=header.nextElementSibling;

document.querySelectorAll(".accordion-body").forEach(b=>{
if(b!==body) b.style.display="none";
});

body.style.display=body.style.display==="block"?"none":"block";

};

});

document.querySelectorAll("[data-report]").forEach(item=>{

item.onclick=()=>{

document.querySelectorAll("[data-report]").forEach(i=>i.classList.remove("active"));
item.classList.add("active");

loadReport(item.dataset.report);

};

});

}


function loadReport(report){

const charts=document.getElementById("dashboard-charts");
const tables=document.getElementById("dashboard-tables");

if(report==="summary"){

charts.innerHTML="";
tables.innerHTML="";
renderDashboard();
return;

}

charts.innerHTML="";
tables.innerHTML='<div id="report-container"></div>';

switch(report){

case "dailySales":renderDailySales("report-container");break;
case "productPerformance":renderProductPerformance("report-container");break;
case "categoryPerformance":renderCategoryPerformance("report-container");break;
case "brandPerformance":renderBrandPerformance("report-container");break;
case "locationPerformance":renderLocationPerformance("report-container");break;
case "productHealth":renderProductHealth("report-container");break;
case "verticalPerformance":renderVerticalPerformance("report-container");break;
case "fulfillmentPerformance":renderFulfillmentPerformance("report-container");break;

case "campaignPerformance":renderCampaignPerformance("report-container");break;
case "dailyAdsPerformance":renderDailyAdsPerformance("report-container");break;
case "adsFunnel":renderAdsFunnel("report-container");break;
case "campaignEfficiency":renderCampaignEfficiency("report-container");break;

case "keywordPerformance":renderKeywordPerformance("report-container");break;
case "keywordScaling":renderKeywordScaling("report-container");break;
case "keywordWaste":renderKeywordWaste("report-container");break;

case "placementPerformance":renderPlacementPerformance("report-container");break;
case "placementEfficiency":renderPlacementEfficiency("report-container");break;

case "skuAdsPerformance":renderSkuAdsPerformance("report-container");break;
case "skuConversion":renderSkuConversion("report-container");break;
case "adsDependency":renderAdsDependency("report-container");break;

case "adsVsOrganic":renderAdsVsOrganic("report-container");break;
case "salesMomentum":renderSalesMomentum("report-container");break;
case "productLifecycle":renderProductLifecycle("report-container");break;
case "tacosReport":renderTacosReport("report-container");break;

}

}
