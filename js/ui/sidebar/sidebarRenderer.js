// js/ui/sidebar/sidebarRenderer.js

import { renderDashboard } from "../dashboard/dashboardRenderer.js";

/* SUMMARY */
import { renderKpiCards } from "../../reports/summary/kpiCards.js";
import { renderGmvChart } from "../../reports/summary/gmvChart.js";
import { renderAdsChart } from "../../reports/summary/adsChart.js";

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

            <ul class="sidebar-menu">

                <li id="menu-summary">Summary</li>

                <li class="menu-section">Sales</li>
                <li id="menu-daily-sales">Daily Sales</li>
                <li id="menu-product">Product Performance</li>
                <li id="menu-category">Category Performance</li>
                <li id="menu-brand">Brand Performance</li>
                <li id="menu-location">Location Performance</li>
                <li id="menu-product-health">Product Health</li>
                <li id="menu-vertical">Vertical Performance</li>
                <li id="menu-fulfillment">Fulfillment Performance</li>

                <li class="menu-section">Ads</li>
                <li id="menu-campaign">Campaign Performance</li>
                <li id="menu-daily-ads">Daily Ads Performance</li>
                <li id="menu-funnel">Ads Funnel</li>
                <li id="menu-campaign-eff">Campaign Efficiency</li>

                <li class="menu-section">Keywords</li>
                <li id="menu-keywords">Keyword Performance</li>
                <li id="menu-keyword-scale">Keyword Scaling</li>
                <li id="menu-keyword-waste">Keyword Waste</li>

                <li class="menu-section">Placements</li>
                <li id="menu-placement">Placement Performance</li>
                <li id="menu-placement-eff">Placement Efficiency</li>

                <li class="menu-section">SKU Ads</li>
                <li id="menu-sku-ads">SKU Ads Performance</li>
                <li id="menu-sku-conv">SKU Conversion</li>
                <li id="menu-ads-dep">Ads Dependency</li>

                <li class="menu-section">Combined Analytics</li>
                <li id="menu-ads-org">Ads vs Organic</li>
                <li id="menu-momentum">Sales Momentum</li>
                <li id="menu-lifecycle">Product Lifecycle</li>
                <li id="menu-tacos">TACOS Report</li>

            </ul>

        </div>
    `;

    attachMenuEvents();

}

function attachMenuEvents() {

    document.getElementById("menu-summary").onclick = () => {
        clearContent();
        renderDashboard();
    };

    bind("menu-daily-sales", "Daily Sales", renderDailySales);
    bind("menu-product", "Product Performance", renderProductPerformance);
    bind("menu-category", "Category Performance", renderCategoryPerformance);
    bind("menu-brand", "Brand Performance", renderBrandPerformance);
    bind("menu-location", "Location Performance", renderLocationPerformance);
    bind("menu-product-health", "Product Health", renderProductHealth);
    bind("menu-vertical", "Vertical Performance", renderVerticalPerformance);
    bind("menu-fulfillment", "Fulfillment Performance", renderFulfillmentPerformance);

    bind("menu-campaign", "Campaign Performance", renderCampaignPerformance);
    bind("menu-daily-ads", "Daily Ads Performance", renderDailyAdsPerformance);
    bind("menu-funnel", "Ads Funnel", renderAdsFunnel);
    bind("menu-campaign-eff", "Campaign Efficiency", renderCampaignEfficiency);

    bind("menu-keywords", "Keyword Performance", renderKeywordPerformance);
    bind("menu-keyword-scale", "Keyword Scaling", renderKeywordScaling);
    bind("menu-keyword-waste", "Keyword Waste", renderKeywordWaste);

    bind("menu-placement", "Placement Performance", renderPlacementPerformance);
    bind("menu-placement-eff", "Placement Efficiency", renderPlacementEfficiency);

    bind("menu-sku-ads", "SKU Ads Performance", renderSkuAdsPerformance);
    bind("menu-sku-conv", "SKU Conversion", renderSkuConversion);
    bind("menu-ads-dep", "Ads Dependency", renderAdsDependency);

    bind("menu-ads-org", "Ads vs Organic", renderAdsVsOrganic);
    bind("menu-momentum", "Sales Momentum", renderSalesMomentum);
    bind("menu-lifecycle", "Product Lifecycle", renderProductLifecycle);
    bind("menu-tacos", "TACOS Report", renderTacosReport);

}

function bind(id, title, renderFunction) {

    document.getElementById(id).onclick = () => {

        clearContent();

        const tables = document.getElementById("dashboard-tables");

        tables.innerHTML = `
            <div class="table-box">
                <h3>${title}</h3>
                <div id="report-container"></div>
            </div>
        `;

        renderFunction("report-container");

    };

}

function clearContent() {

    const charts = document.getElementById("dashboard-charts");
    const tables = document.getElementById("dashboard-tables");

    charts.innerHTML = "";
    tables.innerHTML = "";

}
