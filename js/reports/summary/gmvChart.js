// js/reports/summary/gmvChart.js

import { applyDateFilter } from "../../core/filterEngine.js";

let gmvChartInstance = null;

export function renderGmvChart(containerId) {

    const data = applyDateFilter("EM", "Order Date");

    const grouped = {};

    data.forEach(row => {

        const date = row["Order Date"];

        if (!date) return;

        if (!grouped[date]) grouped[date] = 0;

        grouped[date] += Number(row["Final Sale Units"] || 0);

    });

    const labels = [];
    const values = [];

    Object.keys(grouped)
        .sort((a, b) => new Date(a.split("/").reverse().join("-")) - new Date(b.split("/").reverse().join("-")))
        .forEach(date => {

            labels.push(date);
            values.push(grouped[date]);

        });

    const ctx = document.getElementById(containerId);

    if (!ctx) return;

    if (gmvChartInstance) gmvChartInstance.destroy();

    const gradient = ctx.getContext("2d").createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, "rgba(37,99,235,0.35)");
    gradient.addColorStop(1, "rgba(37,99,235,0)");

    gmvChartInstance = new Chart(ctx, {

        type: "line",

        data: {
            labels,
            datasets: [{
                label: "Net Units",
                data: values,
                tension: 0.4,
                fill: true,
                borderWidth: 3,
                borderColor: "#2563eb",
                backgroundColor: gradient,
                pointRadius: 4,
                pointBackgroundColor: "#2563eb"
            }]
        },

        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: "#eee" } },
                x: { grid: { display: false } }
            }
        }

    });

}
