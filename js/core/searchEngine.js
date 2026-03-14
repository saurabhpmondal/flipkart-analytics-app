// js/core/searchEngine.js

let searchQuery = "";

export function setSearchQuery(query) {

    if (!query) {
        searchQuery = "";
        return;
    }

    searchQuery = query.toLowerCase();

}

export function getSearchQuery() {

    return searchQuery;

}

export function applySearchFilter(data) {

    if (!searchQuery || searchQuery === "") {
        return data;
    }

    return data.filter(row => {

        const values = Object.values(row);

        return values.some(value => {

            if (!value) return false;

            return value.toString().toLowerCase().includes(searchQuery);

        });

    });

}
