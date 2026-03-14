// js/core/dataLoader.js

import { parseCSV } from "./csvParser.js";
import { setData } from "./dataStore.js";

const DATA_SOURCES = {

EM: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT8F99awOmRYIURwR5n_gRFYMG7WTNFATKZ3Y-_Wm6i6q_3EtZXn4hOE9RTIKjPcz6hQQ87vzbZ9AeS/pub?gid=0&single=true&output=csv",

CDR: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT8F99awOmRYIURwR5n_gRFYMG7WTNFATKZ3Y-_Wm6i6q_3EtZXn4hOE9RTIKjPcz6hQQ87vzbZ9AeS/pub?gid=170536164&single=true&output=csv",

CFR: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT8F99awOmRYIURwR5n_gRFYMG7WTNFATKZ3Y-_Wm6i6q_3EtZXn4hOE9RTIKjPcz6hQQ87vzbZ9AeS/pub?gid=1413320708&single=true&output=csv",

PPR: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT8F99awOmRYIURwR5n_gRFYMG7WTNFATKZ3Y-_Wm6i6q_3EtZXn4hOE9RTIKjPcz6hQQ87vzbZ9AeS/pub?gid=1087210412&single=true&output=csv",

CKR: "https://docs.google.com/spreadsheets/d/e/2PACX-1vT8F99awOmRYIURwR5n_gRFYMG7WTNFATKZ3Y-_Wm6i6q_3EtZXn4hOE9RTIKjPcz6hQQ87vzbZ9AeS/pub?gid=658236251&single=true&output=csv"

};

async function fetchCSV(url) {

    const response = await fetch(url);

    const text = await response.text();

    return parseCSV(text);

}

export async function loadAllData() {

    console.log("Loading datasets...");

    const EM = await fetchCSV(DATA_SOURCES.EM);

    const CDR = await fetchCSV(DATA_SOURCES.CDR);

    const CFR = await fetchCSV(DATA_SOURCES.CFR);

    const PPR = await fetchCSV(DATA_SOURCES.PPR);

    const CKR = await fetchCSV(DATA_SOURCES.CKR);

    setData("EM", EM);

    setData("CDR", CDR);

    setData("CFR", CFR);

    setData("PPR", PPR);

    setData("CKR", CKR);

    console.log("Datasets loaded");

}
