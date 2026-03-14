// js/core/metricsEngine.js

import { getData } from "./dataStore.js";

export function calculateGMV() {

    const data = getData("EM");

    let total = 0;

    data.forEach(row => {
        total += Number(row["GMV"] || 0);
    });

    return total;

}

export function calculateNetSales() {

    const data = getData("EM");

    let total = 0;

    data.forEach(row => {
        total += Number(row["Final Sale Amount"] || 0);
    });

    return total;

}

export function calculateGrossUnits() {

    const data = getData("EM");

    let total = 0;

    data.forEach(row => {
        total += Number(row["Gross Units"] || 0);
    });

    return total;

}

export function calculateCancelUnits() {

    const data = getData("EM");

    let total = 0;

    data.forEach(row => {
        total += Number(row["Cancellation Units"] || 0);
    });

    return total;

}

export function calculateReturnUnits() {

    const data = getData("EM");

    let total = 0;

    data.forEach(row => {
        total += Number(row["Return Units"] || 0);
    });

    return total;

}

export function calculateNetUnits() {

    const gross = calculateGrossUnits();
    const cancel = calculateCancelUnits();
    const returns = calculateReturnUnits();

    return gross - cancel - returns;

}

export function calculateAdsSpend() {

    const data = getData("CDR");

    let total = 0;

    data.forEach(row => {
        total += Number(row["Ad Spend"] || 0);
    });

    return total;

}

export function calculateAdsRevenue() {

    const data = getData("CDR");

    let total = 0;

    data.forEach(row => {
        total += Number(row["Total Revenue (Rs.)"] || 0);
    });

    return total;

}

export function calculateROI() {

    const revenue = calculateAdsRevenue();
    const spend = calculateAdsSpend();

    if (spend === 0) return 0;

    return revenue / spend;

}

export function calculateCancelRate() {

    const cancel = calculateCancelUnits();
    const gross = calculateGrossUnits();

    if (gross === 0) return 0;

    return cancel / gross;

}

export function calculateReturnRate() {

    const returns = calculateReturnUnits();
    const gross = calculateGrossUnits();

    if (gross === 0) return 0;

    return returns / gross;

}
