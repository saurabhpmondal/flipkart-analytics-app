// js/ui/sidebar/sidebarRenderer.js

export function renderSidebar() {

    const sidebar = document.getElementById("sidebar");

    if (!sidebar) return;

    const items = sidebar.querySelectorAll("[data-report]");

    items.forEach(item => {

        item.onclick = () => {

            items.forEach(i => i.classList.remove("active"));

            item.classList.add("active");

            // Navigation handled by existing router in app/dashboard
            const event = new CustomEvent("report-change", {
                detail: item.dataset.report
            });

            window.dispatchEvent(event);

        };

    });

}
