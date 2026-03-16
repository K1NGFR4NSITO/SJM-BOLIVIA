let index = 0;

const carousel = document.querySelector(".carousel");
const slides = document.querySelector(".slides");
const slideItems = document.querySelectorAll(".slide");
const totalSlides = slideItems.length;

const leftArrow = document.querySelector(".carousel-arrow.left");
const rightArrow = document.querySelector(".carousel-arrow.right");
const dotsContainer = document.querySelector(".carousel-dots");

let autoPlay;

/* ========= CARRUSEL ========= */

if (carousel && slides && slideItems.length > 0 && dotsContainer) {
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
        const slideWidth = carousel.clientWidth;
        slides.style.transform = `translateX(-${index * slideWidth}px)`;

        dots.forEach(dot => dot.classList.remove("active"));
        if (dots[index]) {
            dots[index].classList.add("active");
        }
    }

    if (rightArrow) {
        rightArrow.addEventListener("click", () => {
            index++;
            if (index >= totalSlides) {
                index = 0;
            }
            updateCarousel();
            restartAutoplay();
        });
    }

    if (leftArrow) {
        leftArrow.addEventListener("click", () => {
            index--;
            if (index < 0) {
                index = totalSlides - 1;
            }
            updateCarousel();
            restartAutoplay();
        });
    }

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

    window.addEventListener("load", updateCarousel);
    window.addEventListener("resize", updateCarousel);
    window.addEventListener("orientationchange", updateCarousel);

    startAutoplay();
}

/* ========= MENU MOVIL ========= */

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
const mobileMenuClose = document.querySelector(".mobile-menu-close");

function openMobileMenu() {
    if (mobileMenu && mobileMenuOverlay) {
        mobileMenu.classList.add("active");
        mobileMenuOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }
}

function closeMobileMenu() {
    if (mobileMenu && mobileMenuOverlay) {
        mobileMenu.classList.remove("active");
        mobileMenuOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }
}

if (menuToggle) {
    menuToggle.addEventListener("click", openMobileMenu);
}

if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", closeMobileMenu);
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", closeMobileMenu);
}

/* ========= DROPDOWN ORIENTACION MIGRATORIA ========= */

const pillDropdown = document.querySelector(".pill-dropdown");
const dropdownToggle = document.querySelector(".dropdown-toggle");

if (dropdownToggle && pillDropdown) {
    dropdownToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        pillDropdown.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!pillDropdown.contains(e.target)) {
            pillDropdown.classList.remove("active");
        }
    });
}