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

        <button id="apply-filter-btn">Apply</button>
        <button id="reset-filter-btn">Reset</button>

        <div class="search-box">

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

    const search = document.getElementById("global-search");
    const clear = document.getElementById("search-clear");

    const apply = document.getElementById("apply-filter-btn");
    const reset = document.getElementById("reset-filter-btn");

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

    apply.onclick = () => {

        const start = document.getElementById("filter-start-date").value;
        const end = document.getElementById("filter-end-date").value;

        setDateFilter(start, end);

        reloadDashboard();

    };

    reset.onclick = () => {

        document.getElementById("filter-start-date").value = "";
        document.getElementById("filter-end-date").value = "";

        setDateFilter(null, null);

        reloadDashboard();

    };

}

function reloadDashboard(){

    const charts = document.getElementById("dashboard-charts");
    const tables = document.getElementById("dashboard-tables");

    charts.innerHTML="";
    tables.innerHTML="";

    renderDashboard();

}
