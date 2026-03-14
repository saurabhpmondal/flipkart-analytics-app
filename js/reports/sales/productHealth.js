// js/reports/sales/productHealth.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildProductHealth() {

    const data = applyDateFilter("EM", "Order Date");

    const grouped = {};
    const rows = [];

    data.forEach(row => {

        const sku = row["SKU ID"];
        if (!sku) return;

        if (!grouped[sku]) {
            grouped[sku] = {
                gross: 0,
                cancel: 0,
                returns: 0
            };
        }

        grouped[sku].gross += Number(row["Gross Units"] || 0);
        grouped[sku].cancel += Number(row["Cancellation Units"] || 0);
        grouped[sku].returns += Number(row["Return Units"] || 0);

    });

    Object.keys(grouped).forEach(sku => {

        const g = grouped[sku];
        const net = g.gross - g.cancel - g.returns;

        rows.push({
            sku,
            gross: g.gross,
            cancel: g.cancel,
            returns: g.returns,
            net
        });

    });

    rows.sort((a, b) => b.gross - a.gross);

    return rows;

}

export function renderProductHealth(containerId) {

    const rows = buildProductHealth();
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = `
    <table>
        <thead>
            <tr>
                <th>SKU</th>
                <th>Gross Units</th>
                <th>Cancel Units</th>
                <th>Return Units</th>
                <th>Net Units</th>
            </tr>
        </thead>
        <tbody>
    `;

    rows.forEach(r => {

        html += `
        <tr>
            <td>${r.sku}</td>
            <td>${r.gross}</td>
            <td>${r.cancel}</td>
            <td>${r.returns}</td>
            <td>${r.net}</td>
        </tr>
        `;

    });

    html += `</tbody></table>`;

    container.innerHTML = html;

}
