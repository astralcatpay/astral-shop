// Transition de page premium
document.addEventListener("DOMContentLoaded", () => {
    const transition = document.createElement("div");
    transition.classList.add("page-transition");
    document.body.appendChild(transition);

    // Effet à l'ouverture
    setTimeout(() => {
        transition.classList.remove("active");
    }, 100);

    // Effet à la fermeture
    document.querySelectorAll("a").forEach(link => {
        if (link.href && !link.href.includes("#")) {
            link.addEventListener("click", e => {
                e.preventDefault();
                transition.classList.add("active");
                setTimeout(() => {
                    window.location = link.href;
                }, 500);
            });
        }
    });
});
