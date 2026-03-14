// js/reports/sales/categoryPerformance.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildCategoryPerformance() {

    const data = applyDateFilter("EM", "Order Date");

    const grouped = {};
    let totalGross = 0;

    data.forEach(row => {

        const category = row["Category"];

        if (!category) return;

        const gross = Number(row["Gross Units"] || 0);
        const cancel = Number(row["Cancellation Units"] || 0);
        const returns = Number(row["Return Units"] || 0);
        const revenue = Number(row["Final Sale Amount"] || 0);

        totalGross += gross;

        if (!grouped[category]) {

            grouped[category] = {
                gross: 0,
                cancel: 0,
                returns: 0,
                revenue: 0
            };

        }

        grouped[category].gross += gross;
        grouped[category].cancel += cancel;
        grouped[category].returns += returns;
        grouped[category].revenue += revenue;

    });

    const result = [];

    Object.keys(grouped).forEach(category => {

        const g = grouped[category];
        const net = g.gross - g.cancel - g.returns;

        const share = totalGross === 0 ? 0 : g.gross / totalGross;

        result.push({
            category,
            gross: g.gross,
            cancel: g.cancel,
            returns: g.returns,
            net,
            revenue: g.revenue,
            share
        });

    });

    result.sort((a, b) => b.revenue - a.revenue);

    return result;

}

export function renderCategoryPerformance(containerId) {

    const rows = buildCategoryPerformance();

    const container = document.getElementById(containerId);
    if (!container) return;

    let html = `
    <table>
        <thead>
            <tr>
                <th>Category</th>
                <th>Gross Units</th>
                <th>Cancel Units</th>
                <th>Return Units</th>
                <th>Net Units</th>
                <th>Revenue</th>
                <th>Share %</th>
            </tr>
        </thead>
        <tbody>
    `;

    rows.forEach(r => {

        html += `
        <tr>
            <td>${r.category}</td>
            <td>${r.gross}</td>
            <td>${r.cancel}</td>
            <td>${r.returns}</td>
            <td>${r.net}</td>
            <td>${r.revenue}</td>
            <td>${(r.share * 100).toFixed(2)}%</td>
        </tr>
        `;

    });

    html += `</tbody></table>`;

    container.innerHTML = html;

}
