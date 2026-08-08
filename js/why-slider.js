const slider = document.querySelector(".slider-why");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

// --- Seamless infinite loop ---------------------------------------------
// Clone the full card set on both sides so the layout (in card units) is:
//   [ clone set A ][ real set ][ clone set B ]
// Because every set is an identical copy, any index maps to a visually
// identical position cardCount away. We keep the *live* index parked in the
// real set and "heal" it back there instantly before each move. This is what
// makes the loop work in both directions with no abrupt jump — and, unlike a
// transitionend-based reset, it can't drift when the tab is backgrounded
// (autoplay keeps ticking there, but the next heal snaps it right back).
const originalCards = Array.from(slider.querySelectorAll(".card"));
const cardCount = originalCards.length;

originalCards.forEach((card) => slider.prepend(card.cloneNode(true))); // set A
originalCards.forEach((card) => slider.appendChild(card.cloneNode(true))); // set B

const cards = slider.querySelectorAll(".card");

// Real set occupies indices [cardCount, 2*cardCount). Start on real card 0.
let index = cardCount;
let whyAutoplayTimer;

function getCardWidth() {
    return cards[0].offsetWidth + 20; // card width + flex gap
}

function setSliderPosition(i, instant = false) {
    if (instant) slider.classList.add("no-transition");
    slider.style.transform = `translateX(-${i * getCardWidth()}px)`;
    if (instant) {
        void slider.offsetWidth; // force reflow so the next move still animates
        slider.classList.remove("no-transition");
    }
}

// Snap the index back into the real set with an instant, visually identical
// reposition (the clone sets are exact copies, so the viewer sees no jump).
function healIndex() {
    const wrapped =
        cardCount + ((((index - cardCount) % cardCount) + cardCount) % cardCount);
    if (wrapped !== index) {
        index = wrapped;
        setSliderPosition(index, true);
    }
}

function goNext() {
    healIndex(); // park in the real set first, then step into the trailing clone
    index++;
    setSliderPosition(index);
}

function goPrev() {
    healIndex();
    index--;
    setSliderPosition(index);
}

function startWhyAutoplay() {
    clearInterval(whyAutoplayTimer);
    whyAutoplayTimer = setInterval(goNext, 3000);
}

function stopWhyAutoplay() {
    clearInterval(whyAutoplayTimer);
}

next.addEventListener("click", () => {
    goNext();
    startWhyAutoplay();
});

prev.addEventListener("click", () => {
    goPrev();
    startWhyAutoplay();
});

// --- Swipe / drag support (pointer events cover mouse + touch) ----------
let isDragging = false;
let dragStartX = 0;
let dragBaseOffset = 0; // px the slider was translated when the drag began

function pointerDown(e) {
    healIndex(); // start from a clean, in-range position
    isDragging = true;
    dragStartX = e.clientX;
    dragBaseOffset = index * getCardWidth();
    stopWhyAutoplay();
    slider.classList.add("no-transition");
    slider.style.cursor = "grabbing";
}

function pointerMove(e) {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX;
    slider.style.transform = `translateX(-${dragBaseOffset - delta}px)`;
}

function pointerUp(e) {
    if (!isDragging) return;
    isDragging = false;
    slider.style.cursor = "";
    slider.classList.remove("no-transition");

    const delta = e.clientX - dragStartX;
    const cardWidth = getCardWidth();
    const threshold = cardWidth / 4;

    if (delta <= -threshold) {
        index += Math.max(1, Math.round(-delta / cardWidth)); // dragged left -> next
    } else if (delta >= threshold) {
        index -= Math.max(1, Math.round(delta / cardWidth)); // dragged right -> prev
    }

    setSliderPosition(index); // animate to the snapped card (within a clone copy)
    startWhyAutoplay();
}

slider.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    pointerDown(e);
});
window.addEventListener("pointermove", pointerMove);
window.addEventListener("pointerup", pointerUp);
window.addEventListener("pointercancel", pointerUp);

// Stop native image dragging from hijacking the swipe.
slider.querySelectorAll("img").forEach((img) => (img.draggable = false));

// Pause autoplay while hovering the slider.
slider.addEventListener("mouseenter", stopWhyAutoplay);
slider.addEventListener("mouseleave", startWhyAutoplay);

window.addEventListener("resize", () => setSliderPosition(index, true));

setSliderPosition(index, true);
startWhyAutoplay();
