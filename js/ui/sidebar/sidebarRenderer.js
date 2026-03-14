// js/ui/sidebar/sidebarRenderer.js

import { renderDashboard } from "../dashboard/dashboardRenderer.js";

import { renderProductPerformance } from "../../reports/sales/productPerformance.js";
import { renderCategoryPerformance } from "../../reports/sales/categoryPerformance.js";
import { renderBrandPerformance } from "../../reports/sales/brandPerformance.js";
import { renderLocationPerformance } from "../../reports/sales/locationPerformance.js";
import { renderProductHealth } from "../../reports/sales/productHealth.js";

import { renderCampaignPerformance } from "../../reports/ads/campaignPerformance.js";
import { renderSkuAdsPerformance } from "../../reports/skuAds/skuAdsPerformance.js";
import { renderKeywordPerformance } from "../../reports/keywords/keywordPerformance.js";
import { renderPlacementPerformance } from "../../reports/placements/placementPerformance.js";

export function renderSidebar() {

    const sidebar = document.getElementById("sidebar");

    sidebar.innerHTML = `

        <div class="sidebar-container">

            <h3 class="sidebar-title">Analytics</h3>

            <ul class="sidebar-menu">

                <li id="menu-summary">Summary</li>

                <li class="menu-section">Sales</li>
                <li id="menu-product">Product Performance</li>
                <li id="menu-category">Category Performance</li>
                <li id="menu-brand">Brand Performance</li>
                <li id="menu-location">Location Performance</li>
                <li id="menu-health">Product Health</li>

                <li class="menu-section">Ads</li>
                <li id="menu-campaign">Campaign Performance</li>
                <li id="menu-skuads">SKU Ads Performance</li>
                <li id="menu-keywords">Keyword Performance</li>
                <li id="menu-placement">Placement Performance</li>

            </ul>

        </div>

    `;

    attachMenuEvents();

}

function attachMenuEvents() {

    document.getElementById("menu-summary").onclick = () => {

        clearContent();
        renderDashboard();

    };

    document.getElementById("menu-product").onclick = () => {

        renderTablePage("Product Performance", renderProductPerformance);

    };

    document.getElementById("menu-category").onclick = () => {

        renderTablePage("Category Performance", renderCategoryPerformance);

    };

    document.getElementById("menu-brand").onclick = () => {

        renderTablePage("Brand Performance", renderBrandPerformance);

    };

    document.getElementById("menu-location").onclick = () => {

        renderTablePage("Location Performance", renderLocationPerformance);

    };

    document.getElementById("menu-health").onclick = () => {

        renderTablePage("Product Health", renderProductHealth);

    };

    document.getElementById("menu-campaign").onclick = () => {

        renderTablePage("Campaign Performance", renderCampaignPerformance);

    };

    document.getElementById("menu-skuads").onclick = () => {

        renderTablePage("SKU Ads Performance", renderSkuAdsPerformance);

    };

    document.getElementById("menu-keywords").onclick = () => {

        renderTablePage("Keyword Performance", renderKeywordPerformance);

    };

    document.getElementById("menu-placement").onclick = () => {

        renderTablePage("Placement Performance", renderPlacementPerformance);

    };

}

function clearContent() {

    const charts = document.getElementById("dashboard-charts");
    const tables = document.getElementById("dashboard-tables");

    charts.innerHTML = "";
    tables.innerHTML = "";

}

function renderTablePage(title, renderFunction) {

    clearContent();

    const tables = document.getElementById("dashboard-tables");

    tables.innerHTML = `

        <div class="table-box">
            <h3>${title}</h3>
            <div id="report-container"></div>
        </div>

    `;

    renderFunction("report-container");

}
