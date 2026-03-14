// js/ui/sidebar/sidebarRenderer.js

export function renderSidebar() {

const sidebar=document.getElementById("sidebar");

sidebar.innerHTML=`

<div class="sidebar-section">

<div class="menu-item active" data-report="summary">
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

};

});

}
