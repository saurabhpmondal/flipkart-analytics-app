// js/charts/adsSpendChart.js

import { applyDateFilter } from "../core/filterEngine.js";

let adsChartInstance = null;

export function renderAdsChart() {

    const data = applyDateFilter("CDR", "Date");

    const grouped = {};

    data.forEach(row => {

        const date = row["Date"];

        if (!date) return;

        if (!grouped[date]) {

            grouped[date] = {
                spend: 0,
                revenue: 0
            };

        }

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

    const ctx = document.getElementById("adsChart");

    if (!ctx) return;

    // Destroy previous chart
    if (adsChartInstance) {
        adsChartInstance.destroy();
    }

    adsChartInstance = new Chart(ctx, {

        type: "line",

        data: {

            labels: labels,

            datasets: [

                {
                    label: "Ads Spend",
                    data: spend,
                    tension: 0.3
                },

                {
                    label: "Ads Revenue",
                    data: revenue,
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
