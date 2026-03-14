// js/ui/header/headerRenderer.js

export function renderHeader() {

    let header = document.getElementById("header");

    // If header container doesn't exist, create it safely
    if (!header) {

        header = document.createElement("div");
        header.id = "header";

        document.body.prepend(header);

    }

    header.innerHTML = `
        <div class="app-header">
            <div class="app-title">Flipkart Sales & Ads Analytics</div>
        </div>
    `;

}
