// js/ui/dashboard/dashboardRenderer.js

import { renderGMVTable } from "../../reports/summary/gmvTable.js";
import { renderAdsTable } from "../../reports/summary/adsTable.js";
import { renderVerticalSales } from "../../reports/summary/verticalSales.js";
import { renderFulfillmentSales } from "../../reports/summary/fulfillmentSales.js";

import { renderGMVChart } from "../../charts/gmvTrendChart.js";
import { renderAdsChart } from "../../charts/adsSpendChart.js";

// SALES REPORTS
import { renderDailySales } from "../../reports/sales/dailySales.js";
import { renderProductPerformance } from "../../reports/sales/productPerformance.js";
import { renderCategoryPerformance } from "../../reports/sales/categoryPerformance.js";
import { renderBrandPerformance } from "../../reports/sales/brandPerformance.js";
import { renderLocationPerformance } from "../../reports/sales/locationPerformance.js";
import { renderProductHealth } from "../../reports/sales/productHealth.js";
import { renderVerticalPerformance } from "../../reports/sales/verticalPerformance.js";
import { renderFulfillmentPerformance } from "../../reports/sales/fulfillmentPerformance.js";

// ADS
import { renderCampaignPerformance } from "../../reports/ads/campaignPerformance.js";
import { renderDailyAdsPerformance } from "../../reports/ads/dailyAdsPerformance.js";
import { renderAdsFunnel } from "../../reports/ads/adsFunnel.js";
import { renderCampaignEfficiency } from "../../reports/ads/campaignEfficiency.js";

// KEYWORDS
import { renderKeywordPerformance } from "../../reports/keywords/keywordPerformance.js";
import { renderKeywordScaling } from "../../reports/keywords/keywordScaling.js";
import { renderKeywordWaste } from "../../reports/keywords/keywordWaste.js";

// PLACEMENTS
import { renderPlacementPerformance } from "../../reports/placements/placementPerformance.js";
import { renderPlacementEfficiency } from "../../reports/placements/placementEfficiency.js";

// SKU ADS
import { renderSkuAdsPerformance } from "../../reports/skuAds/skuAdsPerformance.js";
import { renderSkuConversion } from "../../reports/skuAds/skuConversion.js";
import { renderAdsDependency } from "../../reports/skuAds/adsDependency.js";

// COMBINED
import { renderAdsVsOrganic } from "../../reports/combined/adsVsOrganic.js";
import { renderSalesMomentum } from "../../reports/combined/salesMomentum.js";
import { renderProductLifecycle } from "../../reports/combined/productLifecycle.js";
import { renderTacosReport } from "../../reports/combined/tacosReport.js";


export function renderDashboard(report = "summary") {

    const chartsContainer = document.getElementById("dashboard-charts");
    const tablesContainer = document.getElementById("dashboard-tables");

    chartsContainer.innerHTML = "";
    tablesContainer.innerHTML = "";

    /* SUMMARY DASHBOARD */

    if (report === "summary") {

        chartsContainer.innerHTML = `

            <div class="chart-box">
                <h3>GMV Trend</h3>
                <canvas id="gmvChart"></canvas>
            </div>

            <div class="chart-box">
                <h3>Ads Spend vs Revenue</h3>
                <canvas id="adsChart"></canvas>
            </div>

        `;

        tablesContainer.innerHTML = `

            <div class="table-box">
                <h3>Daily GMV Table</h3>
                <div id="gmv-table-container"></div>
            </div>

            <div class="table-box">
                <h3>Daily Ads Performance</h3>
                <div id="ads-table-container"></div>
            </div>

            <div class="table-box">
                <h3>Vertical Sales Performance</h3>
                <div id="vertical-sales-container"></div>
            </div>

            <div class="table-box">
                <h3>Fulfillment Sales Performance</h3>
                <div id="fulfillment-sales-container"></div>
            </div>

        `;

        renderGMVChart();
        renderAdsChart();

        renderGMVTable("gmv-table-container");
        renderAdsTable("ads-table-container");
        renderVerticalSales("vertical-sales-container");
        renderFulfillmentSales("fulfillment-sales-container");

        return;

    }

    /* REPORT ROUTER */

    const container = tablesContainer;

    container.innerHTML = `<div id="report-container"></div>`;

    const reportContainer = "report-container";

    switch (report) {

        case "dailySales": renderDailySales(reportContainer); break;
        case "productPerformance": renderProductPerformance(reportContainer); break;
        case "categoryPerformance": renderCategoryPerformance(reportContainer); break;
        case "brandPerformance": renderBrandPerformance(reportContainer); break;
        case "locationPerformance": renderLocationPerformance(reportContainer); break;
        case "productHealth": renderProductHealth(reportContainer); break;
        case "verticalPerformance": renderVerticalPerformance(reportContainer); break;
        case "fulfillmentPerformance": renderFulfillmentPerformance(reportContainer); break;

        case "campaignPerformance": renderCampaignPerformance(reportContainer); break;
        case "dailyAdsPerformance": renderDailyAdsPerformance(reportContainer); break;
        case "adsFunnel": renderAdsFunnel(reportContainer); break;
        case "campaignEfficiency": renderCampaignEfficiency(reportContainer); break;

        case "keywordPerformance": renderKeywordPerformance(reportContainer); break;
        case "keywordScaling": renderKeywordScaling(reportContainer); break;
        case "keywordWaste": renderKeywordWaste(reportContainer); break;

        case "placementPerformance": renderPlacementPerformance(reportContainer); break;
        case "placementEfficiency": renderPlacementEfficiency(reportContainer); break;

        case "skuAdsPerformance": renderSkuAdsPerformance(reportContainer); break;
        case "skuConversion": renderSkuConversion(reportContainer); break;
        case "adsDependency": renderAdsDependency(reportContainer); break;

        case "adsVsOrganic": renderAdsVsOrganic(reportContainer); break;
        case "salesMomentum": renderSalesMomentum(reportContainer); break;
        case "productLifecycle": renderProductLifecycle(reportContainer); break;
        case "tacosReport": renderTacosReport(reportContainer); break;

        default:
            container.innerHTML = "<p>Report not found</p>";

    }

}
