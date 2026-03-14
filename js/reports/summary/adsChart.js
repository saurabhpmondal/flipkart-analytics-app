// js/reports/summary/adsChart.js

import { applyDateFilter } from "../../core/filterEngine.js";

let adsChartInstance = null;

export function renderAdsChart(containerId) {

    const data = applyDateFilter("CDR", "Date");

    const grouped = {};

    data.forEach(row => {

        const date = row["Date"];

        if (!date) return;

        if (!grouped[date]) grouped[date] = { spend: 0, revenue: 0 };

        grouped[date].spend += Number(row["Ad Spend"] || 0);
        grouped[date].revenue += Number(row["Total Revenue (Rs.)"] || 0);

    });

    const labels = [];
    const spend = [];
    const revenue = [];

    Object.keys(grouped)
        .sort((a, b) => new Date(a.split("/").reverse().join("-")) - new Date(b.split("/").reverse().join("-")))
        .forEach(date => {

            labels.push(date);
            spend.push(grouped[date].spend);
            revenue.push(grouped[date].revenue);

        });

    const ctx = document.getElementById(containerId);

    if (!ctx) return;

    if (adsChartInstance) adsChartInstance.destroy();

    adsChartInstance = new Chart(ctx, {

        type: "line",

        data: {
            labels,
            datasets: [

                {
                    label: "Ad Spend",
                    data: spend,
                    tension: .4,
                    borderWidth: 3,
                    borderColor: "#ef4444",
                    backgroundColor: "rgba(239,68,68,.15)",
                    fill: true
                },

                {
                    label: "Ads Revenue",
                    data: revenue,
                    tension: .4,
                    borderWidth: 3,
                    borderColor: "#10b981",
                    backgroundColor: "rgba(16,185,129,.15)",
                    fill: true
                }

            ]
        },

        options: {
            responsive: true,
            plugins: { legend: { position: "top" } },
            scales: {
                y: { beginAtZero: true },
                x: { grid: { display: false } }
            }
        }

    });

}
