export function renderFilters(){

document.getElementById('filter-bar').innerHTML = `

<select class="filter">
<option>This Month</option>
<option>This Week</option>
<option>Last Month</option>
</select>

<input class="filter" placeholder="Search SKU / Campaign / Keyword"/>

`;

}
