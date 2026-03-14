// js/reports/ads/campaignEfficiency.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildCampaignEfficiency() {

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
        const ctr = g.views === 0 ? 0 : g.clicks / g.views;
        const cvr = g.clicks === 0 ? 0 : g.units / g.clicks;
        const rpc = g.clicks === 0 ? 0 : g.revenue / g.clicks;

        result.push({
            campaign,
            spend: g.spend,
            revenue: g.revenue,
            roi,
            cpc,
            ctr,
            cvr,
            rpc
        });

    });

    result.sort((a,b)=>b.cvr-a.cvr);

    return result;

}

export function renderCampaignEfficiency(containerId) {

    const rows = buildCampaignEfficiency();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Campaign</th>
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
                <td>${r.campaign}</td>
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
