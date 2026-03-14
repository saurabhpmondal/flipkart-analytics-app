// js/ui/sidebar/sidebarRenderer.js

export function renderSidebar() {

    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    sidebar.innerHTML = `

        <div class="menu-item active" data-report="summary">📊 Summary</div>

        <div class="menu-section">
            <div class="menu-title">Sales</div>

            <div class="menu-item" data-report="dailySales">Daily Sales</div>
            <div class="menu-item" data-report="productPerformance">Product Performance</div>
            <div class="menu-item" data-report="categoryPerformance">Category Performance</div>
            <div class="menu-item" data-report="brandPerformance">Brand Performance</div>
            <div class="menu-item" data-report="locationPerformance">Location Performance</div>
            <div class="menu-item" data-report="productHealth">Product Health</div>
            <div class="menu-item" data-report="verticalPerformance">Vertical Performance</div>
            <div class="menu-item" data-report="fulfillmentPerformance">Fulfillment Performance</div>
        </div>

        <div class="menu-section">
            <div class="menu-title">Ads</div>

            <div class="menu-item" data-report="campaignPerformance">Campaign Performance</div>
            <div class="menu-item" data-report="dailyAdsPerformance">Daily Ads Performance</div>
            <div class="menu-item" data-report="adsFunnel">Ads Funnel</div>
            <div class="menu-item" data-report="campaignEfficiency">Campaign Efficiency</div>
        </div>

        <div class="menu-section">
            <div class="menu-title">Keywords</div>

            <div class="menu-item" data-report="keywordPerformance">Keyword Performance</div>
            <div class="menu-item" data-report="keywordScaling">Keyword Scaling</div>
            <div class="menu-item" data-report="keywordWaste">Keyword Waste</div>
        </div>

        <div class="menu-section">
            <div class="menu-title">Placements</div>

            <div class="menu-item" data-report="placementPerformance">Placement Performance</div>
            <div class="menu-item" data-report="placementEfficiency">Placement Efficiency</div>
        </div>

        <div class="menu-section">
            <div class="menu-title">SKU Ads</div>

            <div class="menu-item" data-report="skuAdsPerformance">SKU Ads Performance</div>
            <div class="menu-item" data-report="skuConversion">SKU Conversion</div>
            <div class="menu-item" data-report="adsDependency">Ads Dependency</div>
        </div>

        <div class="menu-section">
            <div class="menu-title">Combined Analytics</div>

            <div class="menu-item" data-report="adsVsOrganic">Ads vs Organic</div>
            <div class="menu-item" data-report="salesMomentum">Sales Momentum</div>
            <div class="menu-item" data-report="productLifecycle">Product Lifecycle</div>
            <div class="menu-item" data-report="tacosReport">TACOS Report</div>
        </div>

    `;

    attachSidebarEvents();

}

function attachSidebarEvents() {

    const items = document.querySelectorAll(".menu-item");

    items.forEach(item => {

        item.onclick = () => {

            items.forEach(i => i.classList.remove("active"));

            item.classList.add("active");

            const report = item.dataset.report;

            const event = new CustomEvent("report-change", {
                detail: report
            });

            window.dispatchEvent(event);

        };

    });

}
