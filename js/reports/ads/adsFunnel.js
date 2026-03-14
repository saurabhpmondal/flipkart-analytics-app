// js/reports/ads/adsFunnel.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildAdsFunnel() {

    const data = applyDateFilter("CDR", "Date");

    let views = 0;
    let clicks = 0;
    let units = 0;
    let revenue = 0;

    data.forEach(row => {

        views += Number(row["Views"] || 0);
        clicks += Number(row["Clicks"] || 0);
        units += Number(row["Total converted units"] || 0);
        revenue += Number(row["Total Revenue (Rs.)"] || 0);

    });

    const ctr = views === 0 ? 0 : clicks / views;
    const cvr = clicks === 0 ? 0 : units / clicks;
    const rpc = clicks === 0 ? 0 : revenue / clicks;

    return {

        views,
        clicks,
        units,
        revenue,
        ctr,
        cvr,
        rpc

    };

}

export function renderAdsFunnel(containerId) {

    const data = buildAdsFunnel();

    const container = document.getElementById(containerId);

    if (!container) return;

    const percentClicks = data.views === 0 ? 0 : (data.clicks / data.views) * 100;
    const percentUnits = data.clicks === 0 ? 0 : (data.units / data.clicks) * 100;

    let html = `

        <div class="funnel-container">

            <div class="funnel-step">
                <h3>Views</h3>
                <p>${data.views.toLocaleString()}</p>
            </div>

            <div class="funnel-step">
                <h3>Clicks</h3>
                <p>${data.clicks.toLocaleString()}</p>
                <span>CTR: ${(data.ctr * 100).toFixed(2)}%</span>
            </div>

            <div class="funnel-step">
                <h3>Conversions</h3>
                <p>${data.units.toLocaleString()}</p>
                <span>CVR: ${(data.cvr * 100).toFixed(2)}%</span>
            </div>

            <div class="funnel-step">
                <h3>Revenue</h3>
                <p>₹ ${data.revenue.toLocaleString("en-IN")}</p>
                <span>Revenue / Click: ₹ ${data.rpc.toFixed(2)}</span>
            </div>

        </div>

    `;

    container.innerHTML = html;

}
