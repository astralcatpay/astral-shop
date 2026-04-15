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
    // FILTRE PAR CATÉGORIE
    // ===========================
    document.querySelectorAll(".cat-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const cat = btn.dataset.category;

            document.querySelectorAll(".product-card").forEach(card => {
                card.style.display = (cat === "all" || card.dataset.category === cat)
                    ? "block"
                    : "none";
            });
        });
    });

    // ===========================
    // STOCK FIRST CAT
    // ===========================
    const btn = document.querySelector(".limited-btn");
    const badge = document.getElementById("firstcat-stock");

    if (!btn || !badge) return; // Sécurité

    const limit = 3;
    const count = parseInt(localStorage.getItem("buy_firstcat")) || 0;
    const remaining = Math.max(limit - count, 0);

    // Mise à jour du badge
    badge.textContent = remaining > 0 ? `Restant : ${remaining}` : "Épuisé";

    // Si plus de stock → bouton bloqué
    if (remaining <= 0) {
        btn.textContent = "Indisponible";
        btn.style.background = "gray";
        btn.style.cursor = "not-allowed";
        btn.style.pointerEvents = "none";
        return;
    }

    // ===========================
    // REDIRECTION PAYPAL
    // ===========================
    btn.addEventListener("click", () => {
        window.location.href =
            "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=lucas.mathieupro01@gmail.com&item_name=First%20Cat&amount=2&currency_code=EUR&return=https://lucasmathieupro01-boop.github.io/astral-shop/merci.html?role=firstcat";
    });

});
