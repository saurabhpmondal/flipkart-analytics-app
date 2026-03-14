// js/reports/summary/summaryEngine.js

import { applyDateFilter } from "../../core/filterEngine.js";
import { getData } from "../../core/dataStore.js";

export function buildSummaryMetrics() {

    const sales = applyDateFilter("EM", "Order Date");
    const ads = applyDateFilter("CDR", "Date");

    let grossUnits = 0;
    let cancelUnits = 0;
    let returnUnits = 0;
    let netUnits = 0;
    let revenue = 0;

    sales.forEach(row => {

        grossUnits += Number(row["Gross Units"] || 0);
        cancelUnits += Number(row["Cancellation Units"] || 0);
        returnUnits += Number(row["Return Units"] || 0);
        netUnits += Number(row["Final Sale Units"] || 0);
        revenue += Number(row["Final Sale Amount"] || 0);

    });

    let adSpend = 0;
    let adRevenue = 0;
    let adUnits = 0;

    ads.forEach(row => {

        adSpend += Number(row["Ad Spend"] || 0);
        adRevenue += Number(row["Total Revenue (Rs.)"] || 0);
        adUnits += Number(row["Total converted units"] || 0);

    });

    const roi = adSpend === 0 ? 0 : adRevenue / adSpend;
    const tacos = revenue === 0 ? 0 : adSpend / revenue;

    return {

        grossUnits,
        cancelUnits,
        returnUnits,
        netUnits,
        revenue,

        adSpend,
        adRevenue,
        adUnits,

        roi,
        tacos

    };

}
