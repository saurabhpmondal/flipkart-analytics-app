// js/reports/skuAds/adsDependency.js

import { getData } from "../../core/dataStore.js";

export function buildAdsDependency() {

    const sales = getData("EM");
    const ads = getData("CFR");

    const salesMap = {};
    const adsMap = {};

    // Total sales units per SKU
    sales.forEach(row => {

        const sku = row["SKU ID"];

        if (!sku) return;

        if (!salesMap[sku]) {
            salesMap[sku] = 0;
        }

        salesMap[sku] += Number(row["Final Sale Units"] || 0);

    });

    // Ads driven units per SKU
    ads.forEach(row => {

        const sku = row["Sku Id"];

        if (!sku) return;

        if (!adsMap[sku]) {
            adsMap[sku] = 0;
        }

        const units =
            Number(row["Direct Units Sold"] || 0) +
            Number(row["Indirect Units Sold"] || 0);

        adsMap[sku] += units;

    });

    const result = [];

    Object.keys(salesMap).forEach(sku => {

        const totalUnits = salesMap[sku];
        const adsUnits = adsMap[sku] || 0;

        const dependency =
            totalUnits === 0 ? 0 : adsUnits / totalUnits;

        result.push({
            sku,
            totalUnits,
            adsUnits,
            dependency
        });

    });

    result.sort((a, b) => b.dependency - a.dependency);

    return result;

}

export function renderAdsDependency(containerId) {

    const rows = buildAdsDependency();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>Total Units</th>
                    <th>Ads Units</th>
                    <th>Ads Dependency</th>
                </tr>
            </thead>
            <tbody>
    `;

    rows.forEach(r => {

        html += `
            <tr>
                <td>${r.sku}</td>
                <td>${r.totalUnits}</td>
                <td>${r.adsUnits}</td>
                <td>${(r.dependency * 100).toFixed(2)}%</td>
            </tr>
        `;

    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;

}
