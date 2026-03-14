// js/reports/skuAds/skuAdsPerformance.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildSkuAdsPerformance() {

    const data = applyDateFilter("CFR", "Date");

    const grouped = {};

    data.forEach(row => {

        const sku = row["Sku Id"];
        const product = row["Product Name"];

        if (!sku) return;

        if (!grouped[sku]) {

            grouped[sku] = {
                product: product,
                views: 0,
                clicks: 0,
                units: 0,
                revenue: 0
            };

        }

        grouped[sku].views += Number(row["Views"] || 0);
        grouped[sku].clicks += Number(row["Clicks"] || 0);
        grouped[sku].units += Number(row["Direct Units Sold"] || 0)
                            + Number(row["Indirect Units Sold"] || 0);
        grouped[sku].revenue += Number(row["Total Revenue (Rs.)"] || 0);

    });

    const result = [];

    Object.keys(grouped).forEach(sku => {

        const g = grouped[sku];

        const roi = g.revenue === 0 ? 0 : g.revenue / (g.clicks || 1);

        result.push({
            sku: sku,
            product: g.product,
            views: g.views,
            clicks: g.clicks,
            units: g.units,
            revenue: g.revenue,
            roi: roi
        });

    });

    result.sort((a, b) => b.revenue - a.revenue);

    return result;

}

export function renderSkuAdsPerformance(containerId) {

    const rows = buildSkuAdsPerformance();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
    <table>
        <thead>
            <tr>
                <th>SKU</th>
                <th>Product</th>
                <th>Views</th>
                <th>Clicks</th>
                <th>Units</th>
                <th>Revenue</th>
                <th>ROI</th>
            </tr>
        </thead>
        <tbody>
    `;

    rows.forEach(r => {

        html += `
        <tr>
            <td>${r.sku}</td>
            <td>${r.product}</td>
            <td>${r.views}</td>
            <td>${r.clicks}</td>
            <td>${r.units}</td>
            <td>${r.revenue}</td>
            <td>${r.roi.toFixed(2)}</td>
        </tr>
        `;

    });

    html += `
        </tbody>
    </table>
    `;

    container.innerHTML = html;

}
