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

        <button id="apply-filter-btn" class="btn-primary">Apply</button>
        <button id="reset-filter-btn" class="btn-secondary">Reset</button>

        <div class="search-wrapper">
            <input
                type="text"
                id="global-search"
                placeholder="Search SKU / Campaign / Keyword"
            >
            <span id="search-clear">×</span>
        </div>

    `;

    attachEvents();

}

function attachEvents() {

    const range = document.getElementById("filter-range");
    const start = document.getElementById("filter-start-date");
    const end = document.getElementById("filter-end-date");

    const apply = document.getElementById("apply-filter-btn");
    const reset = document.getElementById("reset-filter-btn");

    const search = document.getElementById("global-search");
    const clear = document.getElementById("search-clear");

    range.onchange = () => {

        const today = new Date();
        let startDate = null;

        if (range.value === "7") {

            startDate = new Date();
            startDate.setDate(today.getDate() - 7);

        }

        if (range.value === "30") {

            startDate = new Date();
            startDate.setDate(today.getDate() - 30);

        }

        if (startDate) {

            start.value = startDate.toISOString().slice(0,10);
            end.value = today.toISOString().slice(0,10);

        }

    };

    apply.onclick = () => {

        setDateFilter(start.value, end.value);

        reloadDashboard();

    };

    reset.onclick = () => {

        start.value = "";
        end.value = "";
        range.value = "";

        setDateFilter(null, null);

        search.value = "";
        clear.style.display = "none";

        setSearchQuery("");

        reloadDashboard();

    };

    search.oninput = () => {

        const q = search.value;

        setSearchQuery(q);

        clear.style.display = q ? "block" : "none";

        reloadDashboard();

    };

    clear.onclick = () => {

        search.value = "";
        clear.style.display = "none";

        setSearchQuery("");

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
