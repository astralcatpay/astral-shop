// Transition de page premium
document.addEventListener("DOMContentLoaded", () => {
    const transition = document.createElement("div");
    transition.classList.add("page-transition");
    document.body.appendChild(transition);

    setTimeout(() => transition.classList.remove("active"), 100);

    document.querySelectorAll("a").forEach(link => {
        if (link.href && !link.href.includes("#") && !link.classList.contains("limited-btn")) {
            link.addEventListener("click", e => {
                e.preventDefault();
                transition.classList.add("active");
                setTimeout(() => window.location = link.href, 500);
            });
        }
    });
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
// RÔLE LIMITÉ À 3 ACHATS
// ===========================
document.querySelectorAll(".limited-btn").forEach(btn => {
    const role = btn.dataset.role;
    const limit = parseInt(btn.dataset.limit);

    let count = parseInt(localStorage.getItem("buy_" + role)) || 0;

    // Désactiver si limite atteinte
    if (count >= limit) {
        btn.textContent = "Indisponible";
        btn.style.background = "gray";
        btn.style.cursor = "not-allowed";
        btn.style.pointerEvents = "none";
    }

    btn.addEventListener("click", () => {
        count++;
        localStorage.setItem("buy_" + role, count);

        if (count >= limit) {
            btn.textContent = "Indisponible";
            btn.style.background = "gray";
            btn.style.cursor = "not-allowed";
            btn.style.pointerEvents = "none";
        }

        // Redirection PayPal
        window.location = "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=lucas.mathieupro01@gmail.com&item_name=First%20Cat&amount=2&currency_code=EUR&return=merci.html?role=firstcat";
    });
});
