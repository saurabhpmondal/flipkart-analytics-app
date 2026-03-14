// js/reports/sales/dailySales.js

import { applyDateFilter } from "../../core/filterEngine.js";

export function buildDailySales() {

    const data = applyDateFilter("EM", "Order Date");

    const grouped = {};

    data.forEach(row => {

        const date = row["Order Date"];

        if (!date) return;

        if (!grouped[date]) {

            grouped[date] = {
                gross: 0,
                cancel: 0,
                returns: 0,
                net: 0,
                revenue: 0
            };

        }

        const gross = Number(row["Gross Units"] || 0);
        const cancel = Number(row["Cancellation Units"] || 0);
        const returns = Number(row["Return Units"] || 0);
        const net = Number(row["Final Sale Units"] || 0);
        const revenue = Number(row["Final Sale Amount"] || 0);

        grouped[date].gross += gross;
        grouped[date].cancel += cancel;
        grouped[date].returns += returns;
        grouped[date].net += net;
        grouped[date].revenue += revenue;

    });

    const result = [];

    Object.keys(grouped).forEach(date => {

        const g = grouped[date];

        const asp = g.net === 0 ? 0 : g.revenue / g.net;

        result.push({
            date: date,
            gross: g.gross,
            cancel: g.cancel,
            returns: g.returns,
            net: g.net,
            revenue: g.revenue,
            asp: asp
        });

    });

    result.sort((a, b) => {

        const da = new Date(a.date.split("/").reverse().join("-"));
        const db = new Date(b.date.split("/").reverse().join("-"));

        return da - db;

    });

    return result;

}

export function renderDailySales(containerId) {

    const rows = buildDailySales();

    const container = document.getElementById(containerId);

    if (!container) return;

    let html = `
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Gross Units</th>
                    <th>Cancel Units</th>
                    <th>Return Units</th>
                    <th>Net Units</th>
                    <th>Revenue</th>
                    <th>ASP</th>
                </tr>
            </thead>
            <tbody>
    `;

    rows.forEach(r => {

        html += `
            <tr>
                <td>${r.date}</td>
                <td>${r.gross}</td>
                <td>${r.cancel}</td>
                <td>${r.returns}</td>
                <td>${r.net}</td>
                <td>${r.revenue.toFixed(0)}</td>
                <td>${r.asp.toFixed(2)}</td>
            </tr>
        `;

    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;

}
