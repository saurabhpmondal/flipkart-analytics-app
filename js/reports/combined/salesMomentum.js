// js/reports/combined/salesMomentum.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildSalesMomentum() {

    const data = applyDateFilter("EM", "Order Date");

    const grouped = {};

    data.forEach(row => {

        const date = row["Order Date"];

        if (!date) return;

        if (!grouped[date]) {

            grouped[date] = {
                units: 0,
                revenue: 0
            };

        }

        grouped[date].units += Number(row["Final Sale Units"] || 0);
        grouped[date].revenue += Number(row["Final Sale Amount"] || 0);

    });

    const rows = [];

    Object.keys(grouped)
        .sort((a, b) => {

            const da = new Date(a.split("/").reverse().join("-"));
            const db = new Date(b.split("/").reverse().join("-"));

            return da - db;

        })
        .forEach(date => {

            rows.push({
                date,
                units: grouped[date].units,
                revenue: grouped[date].revenue
            });

        });

    // calculate growth
    for (let i = 1; i < rows.length; i++) {

        const prev = rows[i - 1];
        const curr = rows[i];

        curr.growth =
            prev.units === 0 ? 0 : (curr.units - prev.units) / prev.units;

    }

    rows[0].growth = 0;

    return rows;

}

export function renderSalesMomentum(containerId) {

    const rows = buildSalesMomentum();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Units</th>
                    <th>Revenue</th>
                    <th>Growth</th>
                </tr>
            </thead>
            <tbody>
    `;

    rows.forEach(r => {

        html += `
            <tr>
                <td>${r.date}</td>
                <td>${r.units}</td>
                <td>${r.revenue.toFixed(0)}</td>
                <td style="color:${r.growth>0?'green':'red'}">
${(r.growth*100).toFixed(2)}%
</td>
            </tr>
        `;

    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;

}
