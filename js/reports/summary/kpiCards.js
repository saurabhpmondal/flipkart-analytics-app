// js/reports/summary/kpiCards.js

import { buildSummaryMetrics } from "./summaryEngine.js";

export function renderKpiCards(containerId) {

    const data = buildSummaryMetrics();

    const container = document.getElementById(containerId);

    if (!container) return;

    const formatNumber = (num) => {

        return num.toLocaleString("en-IN");

    };

    const formatCurrency = (num) => {

        return "₹ " + num.toLocaleString("en-IN");

    };

    const formatPercent = (num) => {

        return (num * 100).toFixed(2) + "%";

    };

    let html = `

        <div class="kpi-grid">

            <div class="card">
                <div class="card-title">GMV (Gross Units)</div>
                <div class="card-value">${formatNumber(data.grossUnits)}</div>
            </div>

            <div class="card">
                <div class="card-title">Net Units</div>
                <div class="card-value">${formatNumber(data.netUnits)}</div>
            </div>

            <div class="card">
                <div class="card-title">Revenue</div>
                <div class="card-value">${formatCurrency(data.revenue)}</div>
            </div>

            <div class="card">
                <div class="card-title">Ad Spend</div>
                <div class="card-value">${formatCurrency(data.adSpend)}</div>
            </div>

            <div class="card">
                <div class="card-title">Ads Revenue</div>
                <div class="card-value">${formatCurrency(data.adRevenue)}</div>
            </div>

            <div class="card">
                <div class="card-title">ROI</div>
                <div class="card-value">${data.roi.toFixed(2)}</div>
            </div>

            <div class="card">
                <div class="card-title">TACOS</div>
                <div class="card-value">${formatPercent(data.tacos)}</div>
            </div>

        </div>

    `;

    container.innerHTML = html;

}
