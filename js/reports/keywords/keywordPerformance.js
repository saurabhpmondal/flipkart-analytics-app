// js/reports/keywords/keywordPerformance.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildKeywordPerformance() {

    const data = applyDateFilter("CKR", "Date");

    const grouped = {};

    data.forEach(row => {

        const keyword = row["attributed_keyword"];
        const match = row["keyword_match_type"];

        if (!keyword) return;

        if (!grouped[keyword]) {

            grouped[keyword] = {
                match: match,
                views: 0,
                clicks: 0,
                spend: 0,
                revenue: 0
            };

        }

        grouped[keyword].views += Number(row["Views"] || 0);
        grouped[keyword].clicks += Number(row["Clicks"] || 0);
        grouped[keyword].spend += Number(row["SUM(cost)"] || 0);

        const directRevenue = Number(row["Direct Revenue"] || 0);
        const indirectRevenue = Number(row["Indirect Revenue"] || 0);

        grouped[keyword].revenue += directRevenue + indirectRevenue;

    });

    const result = [];

    Object.keys(grouped).forEach(keyword => {

        const g = grouped[keyword];

        const roi = g.spend === 0 ? 0 : g.revenue / g.spend;
        const ctr = g.views === 0 ? 0 : g.clicks / g.views;

        result.push({
            keyword: keyword,
            match: g.match,
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

export function renderKeywordPerformance(containerId) {

    const rows = buildKeywordPerformance();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
    <table>
        <thead>
            <tr>
                <th>Keyword</th>
                <th>Match Type</th>
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
            <td>${r.keyword}</td>
            <td>${r.match}</td>
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
