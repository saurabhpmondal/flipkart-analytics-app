// js/reports/summary/gmvChart.js

import { applyDateFilter } from "../../core/filterEngine.js";

let gmvChartInstance = null;

export function renderGmvChart(containerId) {

    const data = applyDateFilter("EM", "Order Date");

    const grouped = {};

    data.forEach(row => {

        const date = row["Order Date"];

        if (!date) return;

        if (!grouped[date]) {
            grouped[date] = 0;
        }

        grouped[date] += Number(row["Final Sale Units"] || 0);

    });

    const labels = [];
    const values = [];

    Object.keys(grouped)
        .sort((a, b) => {

            const da = new Date(a.split("/").reverse().join("-"));
            const db = new Date(b.split("/").reverse().join("-"));

            return da - db;

        })
        .forEach(date => {

            labels.push(date);
            values.push(grouped[date]);

        });

    const ctx = document.getElementById(containerId);

    if (!ctx) return;

    if (gmvChartInstance) {
        gmvChartInstance.destroy();
    }

    gmvChartInstance = new Chart(ctx, {

        type: "line",

        data: {
            labels: labels,
            datasets: [
                {
                    label: "Net Units",
                    data: values,
                    tension: 0.3
                }
            ]
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
