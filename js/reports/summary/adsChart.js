// js/reports/summary/adsChart.js

import { applyDateFilter } from "../../core/filterEngine.js";

let adsChartInstance = null;

export function renderAdsChart(containerId) {

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
    const spendData = [];
    const revenueData = [];

    Object.keys(grouped)
        .sort((a, b) => {

            const da = new Date(a.split("/").reverse().join("-"));
            const db = new Date(b.split("/").reverse().join("-"));

            return da - db;

        })
        .forEach(date => {

            labels.push(date);
            spendData.push(grouped[date].spend);
            revenueData.push(grouped[date].revenue);

        });

    const ctx = document.getElementById(containerId);

    if (!ctx) return;

    if (adsChartInstance) {
        adsChartInstance.destroy();
    }

    adsChartInstance = new Chart(ctx, {

        type: "line",

        data: {

            labels: labels,

            datasets: [

                {
                    label: "Ad Spend",
                    data: spendData,
                    tension: 0.3
                },

                {
                    label: "Ads Revenue",
                    data: revenueData,
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
