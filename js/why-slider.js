const slider = document.querySelector(".slider-why");
const cards = document.querySelectorAll(".card");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;
let whyAutoplayTimer;

function getVisibleCards() {
    // Derive the number of fully visible cards from the real card width, so
    // the slider adapts automatically to the 450px (desktop) / 320px (mobile)
    // card sizes instead of assuming a fixed count.
    const containerWidth = slider.parentElement.clientWidth;
    const cardWidth = cards[0].offsetWidth + 20; // card + flex gap
    return Math.max(Math.floor(containerWidth / cardWidth), 1);
}

function getMaxIndex() {
    return Math.max(cards.length - getVisibleCards(), 0);
}

function setSliderPosition(i, instant = false) {
    const cardWidth = cards[0].offsetWidth + 20;
    if (instant) slider.classList.add("no-transition");
    slider.style.transform = `translateX(-${i * cardWidth}px)`;
    if (instant) {
        void slider.offsetWidth;
        slider.classList.remove("no-transition");
    }
}

function updateSlider() {
    const maxIndex = getMaxIndex();
    if (index > maxIndex) index = maxIndex;
    setSliderPosition(index, true);
}

function goNext() {
    const maxIndex = getMaxIndex();
    if (index >= maxIndex) {
        index = 0;
        setSliderPosition(index, true);
    } else {
        index++;
        setSliderPosition(index);
    }
}

function goPrev() {
    const maxIndex = getMaxIndex();
    if (index <= 0) {
        index = maxIndex;
        setSliderPosition(index, true);
    } else {
        index--;
        setSliderPosition(index);
    }
}

function startWhyAutoplay() {
    clearInterval(whyAutoplayTimer);
    whyAutoplayTimer = setInterval(goNext, 3000);
}

next.addEventListener("click", () => {
    goNext();
    startWhyAutoplay();
});

prev.addEventListener("click", () => {
    goPrev();
    startWhyAutoplay();
});

startWhyAutoplay();

window.addEventListener("resize", updateSlider);

updateSlider();
