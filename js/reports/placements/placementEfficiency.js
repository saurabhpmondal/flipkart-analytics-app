// js/reports/placements/placementEfficiency.js

import { getData } from "../../core/dataStore.js";

export function buildPlacementEfficiency() {

    const data = getData("PPR");

    const grouped = {};

    data.forEach(row => {

        const placement = row["Placement Type"];

        if (!placement) return;

        if (!grouped[placement]) {

            grouped[placement] = {
                views: 0,
                clicks: 0,
                spend: 0,
                units: 0,
                revenue: 0
            };

        }

        grouped[placement].views += Number(row["Views"] || 0);
        grouped[placement].clicks += Number(row["Clicks"] || 0);
        grouped[placement].spend += Number(row["Ad Spend"] || 0);

        const units =
            Number(row["Direct Units Sold"] || 0) +
            Number(row["Indirect Units Sold"] || 0);

        const revenue =
            Number(row["Direct Revenue"] || 0) +
            Number(row["Indirect Revenue"] || 0);

        grouped[placement].units += units;
        grouped[placement].revenue += revenue;

    });

    const result = [];

    Object.keys(grouped).forEach(placement => {

        const g = grouped[placement];

        const roi = g.spend === 0 ? 0 : g.revenue / g.spend;
        const cpc = g.clicks === 0 ? 0 : g.spend / g.clicks;
        const ctr = g.views === 0 ? 0 : g.clicks / g.views;
        const cvr = g.clicks === 0 ? 0 : g.units / g.clicks;
        const rpc = g.clicks === 0 ? 0 : g.revenue / g.clicks;

        result.push({
            placement,
            spend: g.spend,
            revenue: g.revenue,
            roi,
            cpc,
            ctr,
            cvr,
            rpc
        });

    });

    result.sort((a, b) => b.roi - a.roi);

    return result;

}

export function renderPlacementEfficiency(containerId) {

    const rows = buildPlacementEfficiency();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Placement</th>
                    <th>Spend</th>
                    <th>Revenue</th>
                    <th>ROI</th>
                    <th>CPC</th>
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
                <td>${r.placement}</td>
                <td>${r.spend.toFixed(0)}</td>
                <td>${r.revenue.toFixed(0)}</td>
                <td>${r.roi.toFixed(2)}</td>
                <td>${r.cpc.toFixed(2)}</td>
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
