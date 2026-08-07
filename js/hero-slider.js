function initHeroSlider(sliderWrapper) {
    if (!sliderWrapper) return;

    const slides = sliderWrapper.querySelector(".slides");
    if (!slides) return;

    const realSlideCount = sliderWrapper.querySelectorAll(".slide").length - 1;

    let currentSlide = 0;
    let autoplayTimer;

    function setSlide(index, instant = false) {
        if (instant) slides.classList.add("no-transition");
        slides.style.transform = `translateX(-${index * 100}vw)`;
        if (instant) {
            void slides.offsetWidth;
            slides.classList.remove("no-transition");
        }
    }

    function nextSlide() {
        currentSlide++;
        setSlide(currentSlide);
    }

    function prevSlide() {
        if (currentSlide === 0) {
            currentSlide = realSlideCount - 1;
            setSlide(currentSlide, true);
        } else {
            currentSlide--;
            setSlide(currentSlide);
        }
    }

    slides.addEventListener("transitionend", () => {
        if (currentSlide >= realSlideCount) {
            currentSlide = 0;
            setSlide(currentSlide, true);
        }
    });

    function startAutoplay() {
        clearInterval(autoplayTimer);
        autoplayTimer = setInterval(nextSlide, 3000);
    }

    startAutoplay();

    let dragStartX = 0;
    let dragActive = false;

    sliderWrapper.addEventListener("pointerdown", (e) => {
        dragActive = true;
        dragStartX = e.clientX;
    });

    sliderWrapper.addEventListener("pointerup", (e) => {
        if (!dragActive) return;
        dragActive = false;

        const deltaX = e.clientX - dragStartX;
        const swipeThreshold = 40;

        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX < 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            startAutoplay();
        }
    });

    sliderWrapper.addEventListener("pointercancel", () => {
        dragActive = false;
    });
}

document.querySelectorAll(".slider").forEach(initHeroSlider);
