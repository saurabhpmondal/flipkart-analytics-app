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

export function applyDateFilter(datasetName, dateField) {

    const data = getData(datasetName);

    if (!filters.startDate || !filters.endDate) {
        return data;
    }

    const start = new Date(filters.startDate);
    const end = new Date(filters.endDate);

    return data.filter(row => {

        const dateValue = row[dateField];

        if (!dateValue) return false;

        const rowDate = new Date(dateValue);

        return rowDate >= start && rowDate <= end;

    });

}
