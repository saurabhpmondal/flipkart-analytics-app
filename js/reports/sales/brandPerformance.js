// js/reports/sales/brandPerformance.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildBrandPerformance() {

    const data = applyDateFilter("EM", "Order Date");

    const grouped = {};

    data.forEach(row => {

        const brand = row["Brand"];

        if (!brand) return;

        if (!grouped[brand]) {

            grouped[brand] = {
                gross: 0,
                cancel: 0,
                returns: 0,
                revenue: 0
            };

        }

        grouped[brand].gross += Number(row["Gross Units"] || 0);
        grouped[brand].cancel += Number(row["Cancellation Units"] || 0);
        grouped[brand].returns += Number(row["Return Units"] || 0);
        grouped[brand].revenue += Number(row["Final Sale Amount"] || 0);

    });

    const result = [];

    Object.keys(grouped).forEach(brand => {

        const g = grouped[brand];

        const net = g.gross - g.cancel - g.returns;

        result.push({
            brand: brand,
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

export function renderBrandPerformance(containerId) {

    const rows = buildBrandPerformance();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
    <table>
        <thead>
            <tr>
                <th>Brand</th>
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
            <td>${r.brand}</td>
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
