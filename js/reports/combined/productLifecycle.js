// js/reports/combined/productLifecycle.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildProductLifecycle() {

    const data = applyDateFilter("EM", "Order Date");

    const grouped = {};

    data.forEach(row => {

        const sku = row["SKU ID"];
        const units = Number(row["Final Sale Units"] || 0);

        if (!sku) return;

        if (!grouped[sku]) {

            grouped[sku] = {
                totalUnits: 0,
                days: 0
            };

        }

        grouped[sku].totalUnits += units;
        grouped[sku].days += 1;

    });

    const result = [];

    Object.keys(grouped).forEach(sku => {

        const g = grouped[sku];

        const avgDailySales =
            g.days === 0 ? 0 : g.totalUnits / g.days;

        let stage = "Stable";

        if (avgDailySales > 20) stage = "Rising";
        if (avgDailySales < 5) stage = "Declining";

        result.push({
            sku,
            totalUnits: g.totalUnits,
            avgDailySales,
            stage
        });

    });

    result.sort((a, b) => b.totalUnits - a.totalUnits);

    return result;

}

export function renderProductLifecycle(containerId) {

    const rows = buildProductLifecycle();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>Total Units</th>
                    <th>Avg Daily Sales</th>
                    <th>Lifecycle Stage</th>
                </tr>
            </thead>
            <tbody>
    `;

    rows.forEach(r => {

        html += `
            <tr>
                <td>${r.sku}</td>
                <td>${r.totalUnits}</td>
                <td>${r.avgDailySales.toFixed(2)}</td>
                <td>${r.stage}</td>
            </tr>
        `;

    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;

}
