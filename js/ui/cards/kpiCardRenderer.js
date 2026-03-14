// js/ui/cards/kpiCardRenderer.js

import {
    calculateGMV,
    calculateNetSales,
    calculateAdsSpend,
    calculateAdsRevenue,
    calculateROI
} from "../../core/metricsEngine.js";

import { formatCurrency } from "../../utils/formatCurrency.js";

export function renderCards() {

    const gmv = calculateGMV();
    const netSales = calculateNetSales();
    const adsSpend = calculateAdsSpend();
    const adsRevenue = calculateAdsRevenue();
    const roi = calculateROI();

    const container = document.getElementById("kpi-cards");

    container.innerHTML = `
        <div class="kpi-grid">

            <div class="card">
                <div class="card-title">GMV</div>
                <div class="card-value">${formatCurrency(gmv)}</div>
            </div>

            <div class="card">
                <div class="card-title">Net Sales</div>
                <div class="card-value">${formatCurrency(netSales)}</div>
            </div>

            <div class="card">
                <div class="card-title">Ads Spend</div>
                <div class="card-value">${formatCurrency(adsSpend)}</div>
            </div>

            <div class="card">
                <div class="card-title">Ads Revenue</div>
                <div class="card-value">${formatCurrency(adsRevenue)}</div>
            </div>

            <div class="card">
                <div class="card-title">ROI</div>
                <div class="card-value">${roi.toFixed(2)}</div>
            </div>

        </div>
    `;
}
