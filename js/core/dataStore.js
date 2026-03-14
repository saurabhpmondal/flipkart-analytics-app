// js/core/dataStore.js

const store = {

    EM: [],
    CDR: [],
    CFR: [],
    PPR: [],
    CKR: []

};

export function setData(datasetName, data) {

    if (!store.hasOwnProperty(datasetName)) {
        console.warn(`Dataset ${datasetName} not recognized`);
        return;
    }

    store[datasetName] = data;

}

export function getData(datasetName) {

    if (!store.hasOwnProperty(datasetName)) {
        console.warn(`Dataset ${datasetName} not found`);
        return [];
    }

    return store[datasetName];

}

export function getAllData() {

    return store;

}

export function clearData() {

    store.EM = [];
    store.CDR = [];
    store.CFR = [];
    store.PPR = [];
    store.CKR = [];

}

export function getDatasetSize(datasetName) {

    if (!store.hasOwnProperty(datasetName)) return 0;

    return store[datasetName].length;

}

export function logDataSummary() {

    console.log("DATA SUMMARY");

    console.log("EM rows:", store.EM.length);
    console.log("CDR rows:", store.CDR.length);
    console.log("CFR rows:", store.CFR.length);
    console.log("PPR rows:", store.PPR.length);
    console.log("CKR rows:", store.CKR.length);

}
