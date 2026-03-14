// js/ui/filters/filterRenderer.js

import { setDateFilter } from "../../core/filterEngine.js";
import { setSearchQuery } from "../../core/searchEngine.js";
import { renderDashboard } from "../dashboard/dashboardRenderer.js";

export function renderFilters() {

    const container = document.getElementById("filter-bar");

    if (!container) return;

    container.innerHTML = `

        <div class="filter-group">

            <label>Range</label>

            <select id="range-filter">
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

        <button id="apply-filter-btn" class="btn-primary">
            Apply
        </button>

        <button id="reset-filter-btn" class="btn-secondary">
            Reset
        </button>

        <div class="search-box">

            <input 
                type="text" 
                id="global-search" 
                placeholder="Search SKU / Campaign / Keyword"
            >

            <span id="search-clear">✕</span>

        </div>

    `;

    attachFilterEvents();

}

function attachFilterEvents() {

    const applyBtn = document.getElementById("apply-filter-btn");
    const resetBtn = document.getElementById("reset-filter-btn");
    const range = document.getElementById("range-filter");

    const start = document.getElementById("filter-start-date");
    const end = document.getElementById("filter-end-date");

    const searchBox = document.getElementById("global-search");
    const clearBtn = document.getElementById("search-clear");

    // RANGE PRESETS
    range.onchange = () => {

        const today = new Date();
        let startDate = null;

        if (range.value === "7") {

            startDate = new Date();
            startDate.setDate(today.getDate() - 7);

        }

        if (range.value === "30") {

            startDate