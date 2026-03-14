// js/reports/placements/placementPerformance.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildPlacementPerformance() {

    const data = applyDateFilter("PPR", "Date");

    const grouped = {};

    data.forEach(row => {

        const placement = row["Placement Type"];

        if (!placement) return;

        if (!grouped[placement]) {

            grouped[placement] = {
                views: 0,
                clicks: 0,
                spend: 0,
                revenue: 0
            };

        }

        grouped[placement].views += Number(row["Views"] || 0);
        grouped[placement].clicks += Number(row["Clicks"] || 0);
        grouped[placement].spend += Number(row["Ad Spend"] || 0);

        const directRevenue = Number(row["Direct Revenue"] || 0);
        const indirectRevenue = Number(row["Indirect Revenue"] || 0);

        grouped[placement].revenue += directRevenue + indirectRevenue;

    });

    const result = [];

    Object.keys(grouped).forEach(placement => {

        const g = grouped[placement];

        const roi = g.spend === 0 ? 0 : g.revenue / g.spend;
        const ctr = g.views === 0 ? 0 : g.clicks / g.views;

        result.push({
            placement: placement,
            views: g.views,
            clicks: g.clicks,
            spend: g.spend,
            revenue: g.revenue,
            roi: roi,
            ctr: ctr
        });

    });

    result.sort((a, b) => b.spend - a.spend);

    return result;

}

export function renderPlacementPerformance(containerId) {

    const rows = buildPlacementPerformance();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
    <table>
        <thead>
            <tr>
                <th>Placement</th>
                <th>Views</th>
                <th>Clicks</th>
                <th>Spend</th>
                <th>Revenue</th>
                <th>ROI</th>
                <th>CTR</th>
            </tr>
        </thead>
        <tbody>
    `;

    rows.forEach(r => {

        html += `
        <tr>
            <td>${r.placement}</td>
            <td>${r.views}</td>
            <td>${r.clicks}</td>
            <td>${r.spend}</td>
            <td>${r.revenue}</td>
            <td>${r.roi.toFixed(2)}</td>
            <td>${(r.ctr * 100).toFixed(2)}%</td>
        </tr>
        `;

    });

    html += `
        </tbody>
    </table>
    `;

    container.innerHTML = html;

}
