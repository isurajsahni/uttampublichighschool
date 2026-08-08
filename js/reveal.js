// Scroll-reveal: fades elements in (up / down / left / right) as they enter
// the viewport. Add data-reveal="fade-up|fade-down|fade-left|fade-right|fade"
// to any element; optionally set a stagger with style="--reveal-delay:.15s".
(function () {
    const els = document.querySelectorAll("[data-reveal]");
    if (!els.length) return;

    const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // No motion wanted (or no observer support): just show everything.
    if (prefersReduced || !("IntersectionObserver" in window)) {
        els.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    io.unobserve(entry.target); // reveal once, then stop watching
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));
})();
