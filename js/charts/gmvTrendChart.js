// js/charts/gmvTrendChart.js

import { buildGMVTable } from "../reports/summary/gmvTable.js";

export function renderGMVChart() {

    const rows = buildGMVTable();

    const labels = [];
    const netUnits = [];

    rows.forEach(r => {
        labels.push(r.date);
        netUnits.push(r.net);
    });

    const ctx = document.getElementById("gmvChart");

    if (!ctx) return;

    new Chart(ctx, {

        type: "line",

        data: {
            labels: labels,

            datasets: [{
                label: "Net Units Sold",
                data: netUnits,
                tension: 0.3
            }]
        },

        options: {

            responsive: true,

            plugins: {
                legend: {
                    display: true
                }
            },

            scales: {
                y: {
                    beginAtZero: true
                }
            }

        }

    });

}
