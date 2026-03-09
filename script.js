let index = 0;

const slides = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slide");
const totalSlides = slideItems.length;

const leftArrow = document.querySelector(".carousel-arrow.left");
const rightArrow = document.querySelector(".carousel-arrow.right");
const dotsContainer = document.querySelector(".carousel-dots");

let autoPlay;

/* crear indicadores */
slideItems.forEach((_, i) => {
    const dot = document.createElement("span");

    if (i === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        index = i;
        updateCarousel();
        restartAutoplay();
    });

    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".carousel-dots span");

function updateCarousel() {
    slides.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

rightArrow.addEventListener("click", () => {
    index++;
    if (index >= totalSlides) {
        index = 0;
    }
    updateCarousel();
    restartAutoplay();
});

leftArrow.addEventListener("click", () => {
    index--;
    if (index < 0) {
        index = totalSlides - 1;
    }
    updateCarousel();
    restartAutoplay();
});

function startAutoplay() {
    autoPlay = setInterval(() => {
        index++;
        if (index >= totalSlides) {
            index = 0;
        }
        updateCarousel();
    }, 6000);
}

function restartAutoplay() {
    clearInterval(autoPlay);
    startAutoplay();
}

startAutoplay();