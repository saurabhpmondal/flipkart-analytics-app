// js/reports/ads/campaignPerformance.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildCampaignPerformance() {

    const data = applyDateFilter("CDR", "Date");

    const grouped = {};

    data.forEach(row => {

        const campaign = row["Campaign Name"];

        if (!campaign) return;

        if (!grouped[campaign]) {

            grouped[campaign] = {
                spend: 0,
                views: 0,
                clicks: 0,
                units: 0,
                revenue: 0
            };

        }

        grouped[campaign].spend += Number(row["Ad Spend"] || 0);
        grouped[campaign].views += Number(row["Views"] || 0);
        grouped[campaign].clicks += Number(row["Clicks"] || 0);
        grouped[campaign].units += Number(row["Total converted units"] || 0);
        grouped[campaign].revenue += Number(row["Total Revenue (Rs.)"] || 0);

    });

    const result = [];

    Object.keys(grouped).forEach(campaign => {

        const g = grouped[campaign];

        const roi = g.spend === 0 ? 0 : g.revenue / g.spend;
        const cpc = g.clicks === 0 ? 0 : g.spend / g.clicks;
        const cvr = g.clicks === 0 ? 0 : g.units / g.clicks;

        result.push({
            campaign: campaign,
            spend: g.spend,
            views: g.views,
            clicks: g.clicks,
            units: g.units,
            revenue: g.revenue,
            roi: roi,
            cpc: cpc,
            cvr: cvr
        });

    });

    rows.sort((a,b)=>b.roi-a.roi);

    return result;

}

export function renderCampaignPerformance(containerId) {

    const rows = buildCampaignPerformance();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
    <table>
        <thead>
            <tr>
                <th>Campaign</th>
                <th>Spend</th>
                <th>Views</th>
                <th>Clicks</th>
                <th>Units</th>
                <th>Revenue</th>
                <th>ROI</th>
                <th>CPC</th>
                <th>CVR</th>
            </tr>
        </thead>
        <tbody>
    `;

    rows.forEach(r => {

        html += `
        <tr>
            <td>${r.campaign}</td>
            <td>${r.spend}</td>
            <td>${r.views}</td>
            <td>${r.clicks}</td>
            <td>${r.units}</td>
            <td>${r.revenue}</td>
            <td>${r.roi.toFixed(2)}</td>
            <td>${r.cpc.toFixed(2)}</td>
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
