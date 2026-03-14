// js/app.js

import { renderHeader } from "./ui/header/headerRenderer.js";
import { renderSidebar } from "./ui/sidebar/sidebarRenderer.js";
import { renderFilters } from "./ui/filters/filterRenderer.js";

import { renderKpiCards } from "./reports/summary/kpiCards.js";
import { renderGmvChart } from "./reports/summary/gmvChart.js";
import { renderAdsChart } from "./reports/summary/adsChart.js";

import { loadDatasets } from "./core/dataLoader.js";

async function startApp() {

    console.log("Starting Flipkart Analytics App");

    await loadDatasets();

    renderHeader();
    renderSidebar();
    renderFilters();

    renderSummary();

}

function renderSummary() {

    const cardsContainer = document.getElementById("dashboard-cards");
    const chartsContainer = document.getElementById("dashboard-charts");

    if (cardsContainer) {

        cardsContainer.innerHTML = "";
        renderKpiCards("dashboard-cards");

    }

    if (chartsContainer) {

        chartsContainer.innerHTML = `
            <div class="chart-card">
                <canvas id="gmvChart"></canvas>
            </div>

            <div class="chart-card">
                <canvas id="adsChart"></canvas>
            </div>
        `;

        renderGmvChart("gmvChart");
        renderAdsChart("adsChart");

    }

}

startApp();
