// js/reports/sales/locationPerformance.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildLocationPerformance() {

    const data = applyDateFilter("EM", "Order Date");

    const grouped = {};

    data.forEach(row => {

        const location = row["Location Id"];

        if (!location) return;

        if (!grouped[location]) {

            grouped[location] = {
                gross: 0,
                cancel: 0,
                returns: 0,
                revenue: 0
            };

        }

        grouped[location].gross += Number(row["Gross Units"] || 0);
        grouped[location].cancel += Number(row["Cancellation Units"] || 0);
        grouped[location].returns += Number(row["Return Units"] || 0);
        grouped[location].revenue += Number(row["Final Sale Amount"] || 0);

    });

    const result = [];

    Object.keys(grouped).forEach(location => {

        const g = grouped[location];

        const net = g.gross - g.cancel - g.returns;

        result.push({
            location: location,
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

export function renderLocationPerformance(containerId) {

    const rows = buildLocationPerformance();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
    <table>
        <thead>
            <tr>
                <th>Location ID</th>
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
            <td>${r.location}</td>
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
