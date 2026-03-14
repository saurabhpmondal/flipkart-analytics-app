// js/reports/summary/gmvTable.js

import { getData } from "../../core/dataStore.js";

export function buildGMVTable() {

    const data = getData("EM");

    const grouped = {};

    data.forEach(row => {

        const date = row["Order Date"];

        if (!date) return;

        if (!grouped[date]) {

            grouped[date] = {
                gross: 0,
                cancel: 0,
                returns: 0
            };

        }

        grouped[date].gross += Number(row["Gross Units"] || 0);
        grouped[date].cancel += Number(row["Cancellation Units"] || 0);
        grouped[date].returns += Number(row["Return Units"] || 0);

    });

    const result = [];

    Object.keys(grouped).forEach(date => {

        const g = grouped[date];

        const net = g.gross - g.cancel - g.returns;

        result.push({
            date: date,
            gross: g.gross,
            cancel: g.cancel,
            returns: g.returns,
            net: net
        });

    });

    result.sort((a, b) => new Date(a.date) - new Date(b.date));

    return result;

}

export function renderGMVTable(containerId) {

    const rows = buildGMVTable();

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
        </tr>
        `;

    });

    html += `
        </tbody>
    </table>
    `;

    container.innerHTML = html;

}
