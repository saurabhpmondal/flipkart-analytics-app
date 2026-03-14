// js/ui/filters/filterRenderer.js

import { setDateFilter } from "../../core/filterEngine.js";
import { renderDashboard } from "../dashboard/dashboardRenderer.js";

export function renderFilters() {

    const container = document.getElementById("filter-bar");

    container.innerHTML = `

        <div class="filter-group">

            <label>Start Date</label>
            <input type="date" id="filter-start-date">

        </div>

        <div class="filter-group">

            <label>End Date</label>
            <input type="date" id="filter-end-date">

        </div>

        <button id="apply-filter-btn">
            Apply Filter
        </button>

        <input 
            type="text" 
            id="global-search" 
            placeholder="Search SKU / Campaign / Keyword"
        >

    `;

    attachFilterEvents();

}

function attachFilterEvents() {

    const applyBtn = document.getElementById("apply-filter-btn");

    applyBtn.onclick = () => {

        const start = document.getElementById("filter-start-date").value;
        const end = document.getElementById("filter-end-date").value;

        setDateFilter(start, end);

        reloadDashboard();

    };

}

function reloadDashboard() {

    const charts = document.getElementById("dashboard-charts");
    const tables = document.getElementById("dashboard-tables");

    charts.innerHTML = "";
    tables.innerHTML = "";

    renderDashboard();

}
