// js/core/csvParser.js

export function parseCSV(csvText) {

    const lines = csvText.trim().split("\n");

    if (lines.length === 0) return [];

    const headers = lines[0]
        .split(",")
        .map(h => h.trim());

    const rows = [];

    for (let i = 1; i < lines.length; i++) {

        const values = splitCSVLine(lines[i]);

        const row = {};

        headers.forEach((header, index) => {
            row[header] = cleanValue(values[index]);
        });

        rows.push(row);

    }

    return rows;

}

function splitCSVLine(line) {

    const result = [];
    let current = "";
    let insideQuotes = false;

    for (let char of line) {

        if (char === '"') {
            insideQuotes = !insideQuotes;
            continue;
        }

        if (char === "," && !insideQuotes) {
            result.push(current);
            current = "";
        } else {
            current += char;
        }

    }

    result.push(current);

    return result;

}

function cleanValue(value) {

    if (value === undefined) return null;

    const trimmed = value.trim();

    if (trimmed === "") return null;

    if (!isNaN(trimmed)) {
        return Number(trimmed);
    }

    return trimmed;

}
