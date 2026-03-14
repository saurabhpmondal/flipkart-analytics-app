// js/reports/combined/tacosReport.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildTacosReport() {

    const sales = applyDateFilter("EM", "Order Date");
    const ads = applyDateFilter("CDR", "Date");

    let totalRevenue = 0;
    let adSpend = 0;

    sales.forEach(row => {

        totalRevenue += Number(row["Final Sale Amount"] || 0);

    });

    ads.forEach(row => {

        adSpend += Number(row["Ad Spend"] || 0);

    });

    const tacos = totalRevenue === 0 ? 0 : adSpend / totalRevenue;

    let health = "Healthy";

    if (tacos > 0.30) health = "Danger";
    else if (tacos > 0.20) health = "Risky";
    else if (tacos > 0.10) health = "Moderate";

    return {
        revenue: totalRevenue,
        spend: adSpend,
        tacos,
        health
    };

}

export function renderTacosReport(containerId) {

    const data = buildTacosReport();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `

        <table>
            <thead>
                <tr>
                    <th>Metric</th>
                    <th>Value</th>
                </tr>
            </thead>

            <tbody>

                <tr>
                    <td>Total Revenue</td>
                    <td>₹ ${data.revenue.toLocaleString("en-IN")}</td>
                </tr>

                <tr>
                    <td>Ad Spend</td>
                    <td>₹ ${data.spend.toLocaleString("en-IN")}</td>
                </tr>

                <tr>
                    <td>TACOS</td>
                    <td>${(data.tacos * 100).toFixed(2)}%</td>
                </tr>

                <tr>
                    <td>Health Status</td>
                    <td>${data.health}</td>
                </tr>

            </tbody>

        </table>

    `;

    container.innerHTML = html;

}
