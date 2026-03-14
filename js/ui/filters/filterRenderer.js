
export function renderFilters(){

const bar=document.getElementById("filter-bar");

bar.innerHTML=`

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

initFilters();

}


function initFilters(){

const search=document.getElementById("global-search");
const clear=document.getElementById("search-clear");

clear.style.display="none";

search.oninput=()=>{

clear.style.display=search.value?"block":"none";
filterTable(search.value);

};

clear.onclick=()=>{

search.value="";
clear.style.display="none";
filterTable("");

};

document.getElementById("reset-filter-btn").onclick=()=>{

document.getElementById("rangeFilter").value="";
document.getElementById("startDate").value="";
document.getElementById("endDate").value="";

};

}


function filterTable(text){

const rows=document.querySelectorAll("tbody tr");

rows.forEach(r=>{
r.style.display=r.innerText.toLowerCase().includes(text.toLowerCase())?"":"none";
});

}
// js/ui/filters/filterRenderer.js

export function renderFilters(){

const bar=document.getElementById("filter-bar");

bar.innerHTML=`

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

<button id="apply-filter-btn">Apply</button>
<button id="reset-filter-btn">Reset</button>

<input id="global-search" placeholder="Search...">
<span id="search-clear">✕</span>

`;

initFilters();

}

function initFilters(){

const search=document.getElementById("global-search");
const clear=document.getElementById("search-clear");

search.oninput=()=>{
filterTable(search.value);
};

clear.onclick=()=>{
search.value="";
filterTable("");
};

document.getElementById("reset-filter-btn").onclick=()=>{

document.getElementById("startDate").value="";
document.getElementById("endDate").value="";
document.getElementById("rangeFilter").value="";

};

}

function filterTable(text){

const rows=document.querySelectorAll("tbody tr");

rows.forEach(r=>{
r.style.display=r.innerText.toLowerCase().includes(text.toLowerCase())?"":"none";
});

}
