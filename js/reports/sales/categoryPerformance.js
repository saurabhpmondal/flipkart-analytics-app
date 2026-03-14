// js/reports/sales/categoryPerformance.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildCategoryPerformance() {

    const data = applyDateFilter("EM", "Order Date");

    const grouped = {};

    data.forEach(row => {

        const category = row["Category"];

        if (!category) return;

        if (!grouped[category]) {

            grouped[category] = {
                gross: 0,
                cancel: 0,
                returns: 0,
                revenue: 0
            };

        }

        grouped[category].gross += Number(row["Gross Units"] || 0);
        grouped[category].cancel += Number(row["Cancellation Units"] || 0);
        grouped[category].returns += Number(row["Return Units"] || 0);
        grouped[category].revenue += Number(row["Final Sale Amount"] || 0);

    });

    const result = [];

    Object.keys(grouped).forEach(category => {

        const g = grouped[category];

        const net = g.gross - g.cancel - g.returns;

        result.push({
            category: category,
            gross: g.gross,
            cancel: g.cancel,
            returns: g.returns,
            net: net,
            revenue: g.revenue
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
        </tr>
        `;

    });

    html += `
        </tbody>
    </table>
    `;

    container.innerHTML = html;

}
