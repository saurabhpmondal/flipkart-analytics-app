// js/app.js

import { renderHeader } from "./ui/header/headerRenderer.js";
import { renderSidebar } from "./ui/sidebar/sidebarRenderer.js";
import { renderFilters } from "./ui/filters/filterRenderer.js";
import { renderCards } from "./ui/cards/kpiCardRenderer.js";
import { renderDashboard } from "./ui/dashboard/dashboardRenderer.js";

import { loadAllData } from "./core/dataLoader.js";
import { logDataSummary } from "./core/dataStore.js";

async function startApp() {

    console.log("Starting Flipkart Analytics App");

    try {

        // Load all datasets from Google Sheets
        await loadAllData();

        // Show dataset stats
        logDataSummary();

        // Render UI
        renderHeader();
        renderSidebar();
        renderFilters();
        renderCards();
        renderDashboard();

        console.log("App loaded successfully");

    } catch (error) {

        console.error("App failed to start:", error);

    }

}

startApp();
