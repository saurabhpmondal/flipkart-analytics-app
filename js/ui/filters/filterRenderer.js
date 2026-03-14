// js/ui/filters/filterRenderer.js

export function renderFilters() {

    const bar = document.getElementById("filter-bar");

    if (!bar) return;

    bar.innerHTML = `

        <div class="filter-group">
            <label>Range</label>
            <select id="rangeFilter">
                <option value="">Custom</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="30">Last 30 Days</option>
                <option value="7">Last 7 Days</option>
            </select>
        </div>

        <div class="filter-group">
            <label>Start</label>
            <input type="date" id="startDate">
        </div>

        <div class="filter-group">
            <label>End</label>
            <input type="date" id="endDate">
        </div>

        <button class="btn-primary" id="apply-filter-btn">Apply</button>
        <button class="btn-secondary" id="reset-filter-btn">Reset</button>

        <div class="search-wrapper">
            <input id="global-search" placeholder="Search report...">
            <span id="search-clear">×</span>
        </div>

    `;

    initFilterEvents();

}


function initFilterEvents() {

    const search = document.getElementById("global-search");
    const clear = document.getElementById("search-clear");
    const resetBtn = document.getElementById("reset-filter-btn");

    if (!search) return;

    clear.style.display = "none";

    search.addEventListener("input", () => {

        if (search.value.length > 0) {
            clear.style.display = "block";
        } else {
            clear.style.display = "none";
        }

        filterTable(search.value);

    });

    clear.addEventListener("click", () => {

        search.value = "";
        clear.style.display = "none";
        filterTable("");

    });

    resetBtn.addEventListener("click", () => {

        document.getElementById("rangeFilter").value = "";
        document.getElementById("startDate").value = "";
        document.getElementById("endDate").value = "";

    });

}


function filterTable(text) {

    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {

        if (row.innerText.toLowerCase().includes(text.toLowerCase())) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

}
