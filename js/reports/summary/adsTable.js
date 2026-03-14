// js/reports/summary/adsTable.js

import { getData } from "../../core/dataStore.js";

export function buildAdsTable() {

    const data = getData("CDR");

    const grouped = {};

    data.forEach(row => {

        const date = row["Date"];

        if (!date) return;

        if (!grouped[date]) {

            grouped[date] = {
                spend: 0,
                views: 0,
                clicks: 0,
                units: 0,
                revenue: 0
            };

        }

        grouped[date].spend += Number(row["Ad Spend"] || 0);
        grouped[date].views += Number(row["Views"] || 0);
        grouped[date].clicks += Number(row["Clicks"] || 0);
        grouped[date].units += Number(row["Total converted units"] || 0);
        grouped[date].revenue += Number(row["Total Revenue (Rs.)"] || 0);

    });

    const result = [];

    Object.keys(grouped)
        .sort((a, b) => new Date(a) - new Date(b))
        .forEach(date => {

            const g = grouped[date];

            result.push({
                date: date,
                spend: g.spend,
                views: g.views,
                clicks: g.clicks,
                units: g.units,
                revenue: g.revenue
            });

        });

    return result;

}

export function renderAdsTable(containerId) {

    const rows = buildAdsTable();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
    <table>
        <thead>
            <tr>
                <th>Date</th>
                <th>Ad Spend</th>
                <th>Views</th>
                <th>Clicks</th>
                <th>Converted Units</th>
                <th>Revenue</th>
            </tr>
        </thead>
        <tbody>
    `;

    rows.forEach(r => {

        html += `
        <tr>
            <td>${r.date}</td>
            <td>${r.spend}</td>
            <td>${r.views}</td>
            <td>${r.clicks}</td>
            <td>${r.units}</td>
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
