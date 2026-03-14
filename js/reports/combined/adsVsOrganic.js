// js/reports/combined/adsVsOrganic.js

import { getData } from "../../core/dataStore.js";

export function buildAdsVsOrganic() {

    const sales = getData("EM");
    const ads = getData("CFR");

    let totalUnits = 0;
    let adsUnits = 0;

    sales.forEach(row => {

        totalUnits += Number(row["Final Sale Units"] || 0);

    });

    ads.forEach(row => {

        const units =
            Number(row["Direct Units Sold"] || 0) +
            Number(row["Indirect Units Sold"] || 0);

        adsUnits += units;

    });

    const organicUnits = totalUnits - adsUnits;

    const adsPercent =
        totalUnits === 0 ? 0 : adsUnits / totalUnits;

    const organicPercent =
        totalUnits === 0 ? 0 : organicUnits / totalUnits;

    return {
        totalUnits,
        adsUnits,
        organicUnits,
        adsPercent,
        organicPercent
    };

}

export function renderAdsVsOrganic(containerId) {

    const data = buildAdsVsOrganic();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `

        <table>
            <thead>
                <tr>
                    <th>Metric</th>
                    <th>Units</th>
                    <th>Share</th>
                </tr>
            </thead>

            <tbody>

                <tr>
                    <td>Total Sales</td>
                    <td>${data.totalUnits}</td>
                    <td>100%</td>
                </tr>

                <tr>
                    <td>Ads Sales</td>
                    <td>${data.adsUnits}</td>
                    <td>${(data.adsPercent * 100).toFixed(2)}%</td>
                </tr>

                <tr>
                    <td>Organic Sales</td>
                    <td>${data.organicUnits}</td>
                    <td>${(data.organicPercent * 100).toFixed(2)}%</td>
                </tr>

            </tbody>

        </table>

    `;

    container.innerHTML = html;

}
