const slider = document.querySelector(".slider-why");
const cards = document.querySelectorAll(".card");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;
let whyAutoplayTimer;

function getVisibleCards() {
    if (window.innerWidth <= 576) return 1;
    if (window.innerWidth <= 991) return 2;
    return 4;
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
