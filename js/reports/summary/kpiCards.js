// js/reports/summary/kpiCards.js

import { buildSummaryMetrics } from "./summaryEngine.js";

export function renderKpiCards(containerId) {

    const data = buildSummaryMetrics();

    const container = document.getElementById(containerId);

    if (!container) {
        console.error("KPI container not found:", containerId);
        return;
    }

    const formatCurrency = (num) => "₹" + num.toLocaleString("en-IN");

    const formatNumber = (num) => num.toLocaleString("en-IN");

    container.innerHTML = `
    
    <div class="kpi-grid">

        <div class="kpi-card">
            <div class="kpi-title">GMV</div>
            <div class="kpi-value">${formatCurrency(data.gmv)}</div>
        </div>

        <div class="kpi-card">
            <div class="kpi-title">Net Sales</div>
            <div class="kpi-value">${formatCurrency(data.netSales)}</div>
        </div>

        <div class="kpi-card">
            <div class="kpi-title">Ads Spend</div>
            <div class="kpi-value">${formatCurrency(data.adSpend)}</div>
        </div>

        <div class="kpi-card">
            <div class="kpi-title">Ads Revenue</div>
            <div class="kpi-value">${formatCurrency(data.adsRevenue)}</div>
        </div>

        <div class="kpi-card">
            <div class="kpi-title">ROI</div>
            <div class="kpi-value">${formatNumber(data.roi)}</div>
        </div>

    </div>
    
    `;

}
