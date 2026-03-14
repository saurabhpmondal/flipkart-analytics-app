// js/reports/sales/verticalPerformance.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildVerticalPerformance() {

    const data = applyDateFilter("EM", "Order Date");

    const grouped = {};

    data.forEach(row => {

        const vertical = row["Vertical"];

        if (!vertical) return;

        if (!grouped[vertical]) {

            grouped[vertical] = {
                gross: 0,
                cancel: 0,
                returns: 0,
                revenue: 0
            };

        }

        grouped[vertical].gross += Number(row["Gross Units"] || 0);
        grouped[vertical].cancel += Number(row["Cancellation Units"] || 0);
        grouped[vertical].returns += Number(row["Return Units"] || 0);
        grouped[vertical].revenue += Number(row["Final Sale Amount"] || 0);

    });

    const result = [];

    Object.keys(grouped).forEach(vertical => {

        const g = grouped[vertical];

        const net = g.gross - g.cancel - g.returns;

        result.push({
            vertical: vertical,
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

export function renderVerticalPerformance(containerId) {

    const rows = buildVerticalPerformance();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Vertical</th>
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
                <td>${r.vertical}</td>
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
