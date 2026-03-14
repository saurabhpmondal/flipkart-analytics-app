// js/ui/dashboard/dashboardRenderer.js

import { renderGMVTable } from "../../reports/summary/gmvTable.js";
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

    `;

    // Render Charts
    renderGMVChart();
    renderAdsChart();

    // Render Tables
    renderGMVTable("gmv-table-container");

}
