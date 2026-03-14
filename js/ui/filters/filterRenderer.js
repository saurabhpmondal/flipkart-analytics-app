// js/ui/filters/filterRenderer.js

import { setDateFilter } from "../../core/filterEngine.js";
import { setSearchQuery } from "../../core/searchEngine.js";
import { renderDashboard } from "../dashboard/dashboardRenderer.js";

export function renderFilters() {

    const container = document.getElementById("filter-bar");

    container.innerHTML = `

        <div class="filter-group">
            <label>Range</label>
            <select id="filter-range">
                <option value="">Custom</option>
                <option value="7">Last 7 Days</option>
                <option value="30">Last 30 Days</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
            </select>
        </div>

        <div class="filter-group">
            <label>Start</label>
            <input type="date" id="filter-start-date">
        </div>

        <div class="filter-group">
            <label>End</label>
            <input type="date" id="filter-end-date">
        </div>

        <button id="apply-filter-btn">Apply</button>

        <button id="reset-filter-btn">Reset</button>

        <div class="search-wrapper">
            <input 
                type="text" 
                id="global-search" 
                placeholder="Search SKU / Campaign / Keyword"
            >
            <span id="search-clear">×</span>
        </div>

    `;

    attachFilterEvents();

}

function attachFilterEvents() {

    const applyBtn = document.getElementById("apply-filter-btn");
    const resetBtn = document.getElementById("reset-filter-btn");
    const searchBox = document.getElementById("global-search");
    const clearBtn = document.getElementById("search-clear");

    applyBtn.onclick = () => {

        const start = document.getElementById("filter-start-date").value;
        const end = document.getElementById("filter-end-date").value;

        setDateFilter(start, end);

        reloadDashboard();

    };

    resetBtn.onclick = () => {

        document.getElementById("filter-start-date").value = "";
        document.getElementById("filter-end-date").value = "";
        document.getElementById("filter-range").value = "";

        setDateFilter(null, null);

        reloadDashboard();

    };

    searchBox.oninput = () => {

        const query = searchBox.value;

        setSearchQuery(query);

        clearBtn.style.display = query ? "block" : "none";

        reloadDashboard();

    };

    clearBtn.onclick = () => {

        searchBox.value = "";

        setSearchQuery("");

        clearBtn.style.display = "none";

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
