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

export function renderSidebar() {

const sidebar = document.getElementById("sidebar");

sidebar.innerHTML = `

<div class="sidebar-container">

<h3 class="sidebar-title">Analytics</h3>

<div class="menu-group">

<div class="menu-header" data-group="sales">+ Sales</div>
<ul id="sales-group" class="menu-items">
<li data-report="daily">Daily Sales</li>
<li data-report="product">Product Performance</li>
<li data-report="category">Category Performance</li>
<li data-report="brand">Brand Performance</li>
<li data-report="location">Location Performance</li>
<li data-report="health">Product Health</li>
<li data-report="vertical">Vertical Performance</li>
<li data-report="fulfillment">Fulfillment Performance</li>
</ul>

<div class="menu-header" data-group="ads">+ Ads</div>
<ul id="ads-group" class="menu-items">
<li data-report="campaign">Campaign Performance</li>
<li data-report="dailyads">Daily Ads Performance</li>
<li data-report="funnel">Ads Funnel</li>
<li data-report="campaignEff">Campaign Efficiency</li>
</ul>

<div class="menu-header" data-group="keywords">+ Keywords</div>
<ul id="keywords-group" class="menu-items">
<li data-report="keywordPerf">Keyword Performance</li>
<li data-report="keywordScale">Keyword Scaling</li>
<li data-report="keywordWaste">Keyword Waste</li>
</ul>

<div class="menu-header" data-group="placements">+ Placements</div>
<ul id="placements-group" class="menu-items">
<li data-report="placementPerf">Placement Performance</li>
<li data-report="placementEff">Placement Efficiency</li>
</ul>

<div class="menu-header" data-group="sku">+ SKU Ads</div>
<ul id="sku-group" class="menu-items">
<li data-report="skuPerf">SKU Ads Performance</li>
<li data-report="skuConv">SKU Conversion</li>
<li data-report="adsDep">Ads Dependency</li>
</ul>

<div class="menu-header" data-group="combined">+ Combined</div>
<ul id="combined-group" class="menu-items">
<li data-report="adsOrg">Ads vs Organic</li>
<li data-report="momentum">Sales Momentum</li>
<li data-report="lifecycle">Product Lifecycle</li>
<li data-report="tacos">TACOS</li>
</ul>

</div>
</div>
`;

initSidebar();

}

function initSidebar(){

document.querySelectorAll(".menu-header").forEach(header=>{

header.onclick=()=>{

const group=header.dataset.group;
const list=document.getElementById(group+"-group");

document.querySelectorAll(".menu-items").forEach(el=>el.style.display="none");

list.style.display="block";

};

});

document.querySelectorAll(".menu-items li").forEach(li=>{

li.onclick=()=>{

document.querySelectorAll(".menu-items li").forEach(x=>x.classList.remove("active"));
li.classList.add("active");

loadReport(li.dataset.report);

};

});

}

function loadReport(id){

const tables=document.getElementById("dashboard-tables");
tables.innerHTML='<div id="report-container"></div>';

switch(id){

case "daily":renderDailySales("report-container");break;
case "product":renderProductPerformance("report-container");break;
case "category":renderCategoryPerformance("report-container");break;
case "brand":renderBrandPerformance("report-container");break;
case "location":renderLocationPerformance("report-container");break;
case "health":renderProductHealth("report-container");break;
case "vertical":renderVerticalPerformance("report-container");break;
case "fulfillment":renderFulfillmentPerformance("report-container");break;

case "campaign":renderCampaignPerformance("report-container");break;
case "dailyads":renderDailyAdsPerformance("report-container");break;
case "funnel":renderAdsFunnel("report-container");break;
case "campaignEff":renderCampaignEfficiency("report-container");break;

case "keywordPerf":renderKeywordPerformance("report-container");break;
case "keywordScale":renderKeywordScaling("report-container");break;
case "keywordWaste":renderKeywordWaste("report-container");break;

case "placementPerf":renderPlacementPerformance("report-container");break;
case "placementEff":renderPlacementEfficiency("report-container");break;

case "skuPerf":renderSkuAdsPerformance("report-container");break;
case "skuConv":renderSkuConversion("report-container");break;
case "adsDep":renderAdsDependency("report-container");break;

case "adsOrg":renderAdsVsOrganic("report-container");break;
case "momentum":renderSalesMomentum("report-container");break;
case "lifecycle":renderProductLifecycle("report-container");break;
case "tacos":renderTacosReport("report-container");break;

}

}
