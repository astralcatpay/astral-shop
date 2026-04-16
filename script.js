document.addEventListener("DOMContentLoaded", () => {

    // ===========================
    // TRANSITION DE PAGE PREMIUM
    // ===========================
    const transition = document.createElement("div");
    transition.classList.add("page-transition");
    document.body.appendChild(transition);

    setTimeout(() => transition.classList.remove("active"), 100);

    document.querySelectorAll("a").forEach(link => {
        if (link.href && !link.href.includes("#") && !link.classList.contains("limited-btn")) {

            link.addEventListener("click", e => {
                const url = link.href;

                if (!url) return;

                e.preventDefault();
                transition.classList.add("active");

                setTimeout(() => {
                    window.location.href = url;
                }, 300);
            });
        }
    });

    // ===========================
    // FILTRE PAR CATÉGORIE (FULL OPERA SAFE)
    // ===========================
    document.querySelectorAll(".cat-btn").forEach(btn => {
        btn.addEventListener("click", () => {

            document.querySelectorAll(".cat-btn").forEach(b => {
                b.classList.remove(
                    "active",
                    "active-vip",
                    "active-event",
                    "active-staff",
                    "active-all"
                );
            });

            const cat = btn.dataset.category;

            btn.classList.add("active");
            btn.classList.add("active-" + cat);

            document.querySelectorAll(".product-card").forEach(card => {
                card.style.display =
                    (cat === "all" || card.dataset.category === cat)
                        ? "block"
                        : "none";
            });
        });
    });

    // ===========================
    // STOCK FIRST CAT
    // ===========================
    const limit = 3;
    const count = parseInt(localStorage.getItem("buy_firstcat")) || 0;
    const remaining = Math.max(limit - count, 0);

    const badge = document.getElementById("firstcat-stock");
    const btn = document.querySelector(".limited-btn");

    if (badge) {
        badge.textContent = remaining > 0 ? `Restant : ${remaining}` : "Épuisé";
    }

    if (remaining <= 0) {
        btn.textContent = "Indisponible";
        btn.style.background = "gray";
        btn.style.cursor = "not-allowed";
        btn.style.pointerEvents = "none";
    }
});
