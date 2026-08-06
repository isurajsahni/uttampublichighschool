const counters = document.querySelectorAll(".counter-number");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = +counter.dataset.target;
            const suffix = counter.dataset.suffix || "";

            let count = 0;
            const speed = target / 100;

            const updateCounter = () => {

                if (count < target) {
                    count += speed;
                    counter.textContent =
                        Math.ceil(count) + suffix;

                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent =
                        target + suffix;
                }
            };

            updateCounter();
            observer.unobserve(counter);
        }
    });
}, {
    threshold: 0.5
});

counters.forEach(counter => observer.observe(counter));
