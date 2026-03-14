// js/reports/skuAds/skuConversion.js

import { getData } from "../../core/dataStore.js";

export function buildSkuConversion() {

    const data = getData("CFR");

    const grouped = {};

    data.forEach(row => {

        const sku = row["Sku Id"];
        const product = row["Product Name"];

        if (!sku) return;

        if (!grouped[sku]) {

            grouped[sku] = {
                product: product,
                views: 0,
                clicks: 0,
                units: 0,
                revenue: 0
            };

        }

        grouped[sku].views += Number(row["Views"] || 0);
        grouped[sku].clicks += Number(row["Clicks"] || 0);

        const units =
            Number(row["Direct Units Sold"] || 0) +
            Number(row["Indirect Units Sold"] || 0);

        grouped[sku].units += units;

        grouped[sku].revenue += Number(row["Total Revenue (Rs.)"] || 0);

    });

    const result = [];

    Object.keys(grouped).forEach(sku => {

        const g = grouped[sku];

        const ctr = g.views === 0 ? 0 : g.clicks / g.views;
        const cvr = g.clicks === 0 ? 0 : g.units / g.clicks;
        const rpc = g.clicks === 0 ? 0 : g.revenue / g.clicks;

        result.push({
            sku,
            product: g.product,
            views: g.views,
            clicks: g.clicks,
            units: g.units,
            ctr,
            cvr,
            rpc
        });

    });

    result.sort((a, b) => b.cvr - a.cvr);

    return result;

}

export function renderSkuConversion(containerId) {

    const rows = buildSkuConversion();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>Product</th>
                    <th>Views</th>
                    <th>Clicks</th>
                    <th>Units</th>
                    <th>CTR</th>
                    <th>CVR</th>
                    <th>Revenue / Click</th>
                </tr>
            </thead>
            <tbody>
    `;

    rows.forEach(r => {

        html += `
            <tr>
                <td>${r.sku}</td>
                <td>${r.product}</td>
                <td>${r.views}</td>
                <td>${r.clicks}</td>
                <td>${r.units}</td>
                <td>${(r.ctr * 100).toFixed(2)}%</td>
                <td>${(r.cvr * 100).toFixed(2)}%</td>
                <td>${r.rpc.toFixed(2)}</td>
            </tr>
        `;

    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;

}
