// js/ui/dashboard/dashboardRenderer.js

import { renderGMVTable } from "../../reports/summary/gmvTable.js";
import { renderAdsTable } from "../../reports/summary/adsTable.js";
import { renderVerticalSales } from "../../reports/summary/verticalSales.js";
import { renderFulfillmentSales } from "../../reports/summary/fulfillmentSales.js";

import { renderGMVChart } from "../../charts/gmvTrendChart.js";
import { renderAdsChart } from "../../charts/adsSpendChart.js";

export function renderDashboard() {

    const chartsContainer = document.getElementById("dashboard-charts");
    const tablesContainer = document.getElementById("dashboard-tables");

    // Charts Section
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

    // Tables Section
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

    // Render Charts
    renderGMVChart();
    renderAdsChart();

    // Render Tables
    renderGMVTable("gmv-table-container");
    renderAdsTable("ads-table-container");
    renderVerticalSales("vertical-sales-container");
    renderFulfillmentSales("fulfillment-sales-container");

}
