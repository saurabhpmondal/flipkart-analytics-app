// js/core/filterEngine.js

import { getData } from "./dataStore.js";

let filters = {
    startDate: null,
    endDate: null
};

export function setDateFilter(start, end) {

    filters.startDate = start;
    filters.endDate = end;

}

export function getFilters() {

    return filters;

}

function parseDDMMYYYY(dateStr) {

    if (!dateStr) return null;

    const parts = dateStr.split("/");

    if (parts.length !== 3) return null;

    const day = parts[0];
    const month = parts[1];
    const year = parts[2];

    return new Date(`${year}-${month}-${day}`);

}

export function applyDateFilter(datasetName, dateField) {

    const data = getData(datasetName);

    if (!filters.startDate || !filters.endDate) {
        return data;
    }

    const start = new Date(filters.startDate);
    const end = new Date(filters.endDate);

    return data.filter(row => {

        const rawDate = row[dateField];

        if (!rawDate) return false;

        const rowDate = parseDDMMYYYY(rawDate);

        if (!rowDate) return false;

        return rowDate >= start && rowDate <= end;

    });

}
