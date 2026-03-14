// js/reports/sales/fulfillmentPerformance.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildFulfillmentPerformance() {

    const data = applyDateFilter("EM", "Order Date");

    const grouped = {};

    data.forEach(row => {

        const type = row["Fulfillment Type"];

        if (!type) return;

        if (!grouped[type]) {

            grouped[type] = {
                gross: 0,
                cancel: 0,
                returns: 0,
                revenue: 0
            };

        }

        grouped[type].gross += Number(row["Gross Units"] || 0);
        grouped[type].cancel += Number(row["Cancellation Units"] || 0);
        grouped[type].returns += Number(row["Return Units"] || 0);
        grouped[type].revenue += Number(row["Final Sale Amount"] || 0);

    });

    const result = [];

    Object.keys(grouped).forEach(type => {

        const g = grouped[type];

        const net = g.gross - g.cancel - g.returns;

        result.push({
            type: type,
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

export function renderFulfillmentPerformance(containerId) {

    const rows = buildFulfillmentPerformance();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Fulfillment Type</th>
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
                <td>${r.type}</td>
                <td>${r.gross}</td>
                <td>${r.cancel}</td>
                <td>${r.returns}</td>
                <td>${r.net}</td>
                <td>${r.revenue.toFixed(0)}</td>
            </tr>
        `;

    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;

}
