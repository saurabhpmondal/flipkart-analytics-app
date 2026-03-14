// js/reports/summary/fulfillmentSales.js

import { getData } from "../../core/dataStore.js";

export function buildFulfillmentSales() {

    const data = getData("EM");

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

        result.push({
            type: type,
            gross: g.gross,
            cancel: g.cancel,
            returns: g.returns,
            revenue: g.revenue
        });

    });

    result.sort((a, b) => b.revenue - a.revenue);

    return result;

}

export function renderFulfillmentSales(containerId) {

    const rows = buildFulfillmentSales();

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
                <th>Net Revenue</th>
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
