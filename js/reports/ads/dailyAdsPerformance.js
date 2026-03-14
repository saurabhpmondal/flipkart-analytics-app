// js/reports/ads/dailyAdsPerformance.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildDailyAdsPerformance() {

    const data = applyDateFilter("CDR", "Date");

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

    Object.keys(grouped).forEach(date => {

        const g = grouped[date];

        const roi = g.spend === 0 ? 0 : g.revenue / g.spend;
        const ctr = g.views === 0 ? 0 : g.clicks / g.views;
        const cvr = g.clicks === 0 ? 0 : g.units / g.clicks;

        result.push({
            date: date,
            spend: g.spend,
            views: g.views,
            clicks: g.clicks,
            units: g.units,
            revenue: g.revenue,
            roi: roi,
            ctr: ctr,
            cvr: cvr
        });

    });

    result.sort((a, b) => {

        const da = new Date(a.date.split("/").reverse().join("-"));
        const db = new Date(b.date.split("/").reverse().join("-"));

        return da - db;

    });

    return result;

}

export function renderDailyAdsPerformance(containerId) {

    const rows = buildDailyAdsPerformance();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Spend</th>
                    <th>Views</th>
                    <th>Clicks</th>
                    <th>Units</th>
                    <th>Revenue</th>
                    <th>ROI</th>
                    <th>CTR</th>
                    <th>CVR</th>
                </tr>
            </thead>
            <tbody>
    `;

    rows.forEach(r => {

        html += `
            <tr>
                <td>${r.date}</td>
                <td>${r.spend.toFixed(0)}</td>
                <td>${r.views}</td>
                <td>${r.clicks}</td>
                <td>${r.units}</td>
                <td>${r.revenue.toFixed(0)}</td>
                <td>${r.roi.toFixed(2)}</td>
                <td>${(r.ctr * 100).toFixed(2)}%</td>
                <td>${(r.cvr * 100).toFixed(2)}%</td>
            </tr>
        `;

    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;

}
