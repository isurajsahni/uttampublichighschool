const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

hamburgerBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    hamburgerBtn.classList.toggle("active", isOpen);
    hamburgerBtn.setAttribute("aria-expanded", isOpen);
});

navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburgerBtn.classList.remove("active");
        hamburgerBtn.setAttribute("aria-expanded", false);
    });
});
