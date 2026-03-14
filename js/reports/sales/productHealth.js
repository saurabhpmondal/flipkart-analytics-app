// js/reports/sales/productHealth.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildProductHealth() {

    const data = applyDateFilter("EM", "Order Date");

    const grouped = {};

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

    const result = [];

    Object.keys(grouped).forEach(sku => {

        const g = grouped[sku];

        const cancelRate = g.gross === 0 ? 0 : g.cancel / g.gross;
        const returnRate = g.gross === 0 ? 0 : g.returns / g.gross;

        result.push({
            sku: sku,
            gross: g.gross,
            cancel: g.cancel,
            returns: g.returns,
            cancelRate: cancelRate,
            returnRate: returnRate
        });

    });

    result.sort((a, b) => b.returnRate - a.returnRate);

    return result;

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
                <th>Cancel %</th>
                <th>Return %</th>
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
            <td>${(r.cancelRate * 100).toFixed(2)}%</td>
            <td>${(r.returnRate * 100).toFixed(2)}%</td>
        </tr>
        `;

    });

    html += `
        </tbody>
    </table>
    `;

    container.innerHTML = html;

}
