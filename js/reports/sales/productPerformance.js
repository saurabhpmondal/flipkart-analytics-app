// js/reports/sales/productPerformance.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildProductPerformance() {

    const data = applyDateFilter("EM", "Order Date");

    const grouped = {};

    data.forEach(row => {

        const sku = row["SKU ID"];
        const productId = row["Product Id"];
        const category = row["Category"];
        const brand = row["Brand"];

        if (!sku) return;

        if (!grouped[sku]) {

            grouped[sku] = {
                productId: productId,
                category: category,
                brand: brand,
                gross: 0,
                cancel: 0,
                returns: 0,
                revenue: 0
            };

        }

        grouped[sku].gross += Number(row["Gross Units"] || 0);
        grouped[sku].cancel += Number(row["Cancellation Units"] || 0);
        grouped[sku].returns += Number(row["Return Units"] || 0);
        grouped[sku].revenue += Number(row["Final Sale Amount"] || 0);

    });

    const result = [];

    Object.keys(grouped).forEach(sku => {

        const g = grouped[sku];

        const net = g.gross - g.cancel - g.returns;

        result.push({
            sku: sku,
            productId: g.productId,
            category: g.category,
            brand: g.brand,
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

export function renderProductPerformance(containerId) {

    const rows = buildProductPerformance();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
    <table>
        <thead>
            <tr>
                <th>SKU</th>
                <th>Product ID</th>
                <th>Category</th>
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
            <td>${r.sku}</td>
            <td>${r.productId}</td>
            <td>${r.category}</td>
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
