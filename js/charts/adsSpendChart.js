// js/charts/adsSpendChart.js

import { getData } from "../core/dataStore.js";

export function renderAdsChart() {

    const data = getData("CDR");

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
        .sort((a, b) => new Date(a) - new Date(b))
        .forEach(date => {

            labels.push(date);
            spend.push(grouped[date].spend);
            revenue.push(grouped[date].revenue);

        });

    const ctx = document.getElementById("adsChart");

    if (!ctx) return;

    new Chart(ctx, {

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
