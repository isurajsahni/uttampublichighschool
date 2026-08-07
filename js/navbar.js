const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

function setNav(isOpen) {
    navMenu.classList.toggle("active", isOpen);
    hamburgerBtn.classList.toggle("active", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
    hamburgerBtn.setAttribute("aria-expanded", isOpen);
}

hamburgerBtn.addEventListener("click", () => {
    setNav(!navMenu.classList.contains("active"));
});

navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNav(false));
});

// The dimmed backdrop is a body pseudo-element, so clicks land on <body> itself
document.addEventListener("click", (e) => {
    if (!document.body.classList.contains("nav-open")) return;
    if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        setNav(false);
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setNav(false);
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 1140) setNav(false);
});
