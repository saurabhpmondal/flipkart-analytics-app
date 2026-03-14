// js/reports/keywords/keywordWaste.js

import { getData } from "../../core/dataStore.js";

export function buildKeywordWaste() {

    const data = getData("CKR");

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
                units: 0,
                revenue: 0
            };

        }

        grouped[keyword].views += Number(row["Views"] || 0);
        grouped[keyword].clicks += Number(row["Clicks"] || 0);
        grouped[keyword].spend += Number(row["SUM(cost)"] || 0);

        const units =
            Number(row["Direct Units Sold"] || 0) +
            Number(row["Indirect Units Sold"] || 0);

        const revenue =
            Number(row["Direct Revenue"] || 0) +
            Number(row["Indirect Revenue"] || 0);

        grouped[keyword].units += units;
        grouped[keyword].revenue += revenue;

    });

    const result = [];

    Object.keys(grouped).forEach(keyword => {

        const g = grouped[keyword];

        const roi = g.spend === 0 ? 0 : g.revenue / g.spend;
        const ctr = g.views === 0 ? 0 : g.clicks / g.views;
        const cvr = g.clicks === 0 ? 0 : g.units / g.clicks;

        result.push({
            keyword,
            match: g.match,
            spend: g.spend,
            revenue: g.revenue,
            roi,
            ctr,
            cvr
        });

    });

    // Waste keywords → highest spend + lowest ROI
    result.sort((a, b) => {

        if (a.roi === b.roi) {
            return b.spend - a.spend;
        }

        return a.roi - b.roi;

    });

    return result;

}

export function renderKeywordWaste(containerId) {

    const rows = buildKeywordWaste();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Keyword</th>
                    <th>Match</th>
                    <th>Spend</th>
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
                <td>${r.keyword}</td>
                <td>${r.match}</td>
                <td>${r.spend.toFixed(0)}</td>
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
