// js/ui/sidebar/sidebarRenderer.js

import { renderDashboard } from "../dashboard/dashboardRenderer.js";
import { renderCampaignPerformance } from "../../reports/ads/campaignPerformance.js";

export function renderSidebar() {

    const sidebar = document.getElementById("sidebar");

    sidebar.innerHTML = `

        <div class="sidebar-container">

            <h3 class="sidebar-title">Analytics</h3>

            <ul class="sidebar-menu">

                <li id="menu-summary">Summary</li>

                <li id="menu-ads">Ads</li>

            </ul>

        </div>

    `;

    attachMenuEvents();

}

function attachMenuEvents() {

    const summaryBtn = document.getElementById("menu-summary");
    const adsBtn = document.getElementById("menu-ads");

    summaryBtn.onclick = () => {

        clearContent();

        renderDashboard();

    };

    adsBtn.onclick = () => {

        clearContent();

        renderAdsPage();

    };

}

function clearContent() {

    const charts = document.getElementById("dashboard-charts");
    const tables = document.getElementById("dashboard-tables");

    charts.innerHTML = "";
    tables.innerHTML = "";

}

function renderAdsPage() {

    const tables = document.getElementById("dashboard-tables");

    tables.innerHTML = `

        <div class="table-box">
            <h3>Campaign Performance</h3>
            <div id="campaign-performance-container"></div>
        </div>

    `;

    renderCampaignPerformance("campaign-performance-container");

}
