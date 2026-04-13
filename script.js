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

    function resetSlideAnimation() {
        slideItems.forEach((slide) => {
            slide.classList.remove("active");

            const line = slide.querySelector(".title-line");
            const title = slide.querySelector(".slide-text h1");
            const text = slide.querySelector(".slide-text p");

            if (line) line.style.animation = "none";
            if (title) title.style.animation = "none";
            if (text) text.style.animation = "none";
        });
    }

    function activateSlideAnimation(currentSlide) {
        if (!currentSlide) return;

        void currentSlide.offsetWidth;

        const line = currentSlide.querySelector(".title-line");
        const title = currentSlide.querySelector(".slide-text h1");
        const text = currentSlide.querySelector(".slide-text p");

        if (line) line.style.animation = "";
        if (title) title.style.animation = "";
        if (text) text.style.animation = "";

        currentSlide.classList.add("active");
    }

    function updateCarousel() {
        slides.style.transform = `translateX(-${index * 100}%)`;

        dots.forEach(dot => dot.classList.remove("active"));
        if (dots[index]) {
            dots[index].classList.add("active");
        }

        resetSlideAnimation();
        activateSlideAnimation(slideItems[index]);
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
        }, 20000);
    }

    function restartAutoplay() {
        clearInterval(autoPlay);
        startAutoplay();
    }

    window.addEventListener("load", updateCarousel);
    window.addEventListener("resize", updateCarousel);
    window.addEventListener("orientationchange", updateCarousel);

    carousel.addEventListener("mouseenter", () => {
        clearInterval(autoPlay);
    });

    carousel.addEventListener("mouseleave", () => {
        startAutoplay();
    });

    let touchStartX = 0;
    let touchEndX = 0;

    slides.addEventListener("touchstart", (e) => {
        touchStartX = e.changedTouches[0].clientX;
    });

    slides.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                index++;
                if (index >= totalSlides) {
                    index = 0;
                }
            } else {
                index--;
                if (index < 0) {
                    index = totalSlides - 1;
                }
            }

            updateCarousel();
            restartAutoplay();
        }
    });

    updateCarousel();
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

/* ========= POPUP DEL MAPA ========= */

document.addEventListener("DOMContentLoaded", () => {
    const markers = document.querySelectorAll(".marker-btn");
    const popup = document.getElementById("mapPopup");
    const popupLink = document.getElementById("mapPopupLink");
    const map = document.querySelector(".map-interactive");

    if (markers.length && popup && popupLink && map) {
        markers.forEach(marker => {
            marker.addEventListener("click", (e) => {
                e.stopPropagation();

                const country = marker.dataset.country;
                const url = marker.dataset.url;

                popupLink.textContent = country;
                popupLink.href = url;

                const markerBox = marker.getBoundingClientRect();
                const mapBox = map.getBoundingClientRect();

                popup.style.left = `${markerBox.left - mapBox.left + 18}px`;
                popup.style.top = `${markerBox.top - mapBox.top - 8}px`;

                popup.classList.add("show");
            });
        });

        document.addEventListener("click", (e) => {
            if (!popup.contains(e.target)) {
                popup.classList.remove("show");
            }
        });
    }
});

/* ========= MODAL DE PROYECTOS ========= */

document.addEventListener("DOMContentLoaded", () => {
    const projectsData = {
        jovenes: {
            support: "Apoyado por: KINDERMISSIONWERK, ALEMANIA",
            title: "Jóvenes Rompiendo Fronteras. Promoviendo cultura de hospitalidad con enfoque intercultural y migratorio – El Alto / Bolivia",
            body: `
                <p>
                    El proyecto “Jóvenes Rompiendo Fronteras” promueve la construcción de una cultura de hospitalidad e interculturalidad en la ciudad de El Alto mediante procesos formativos dirigidos a adolescentes y jóvenes en situación de vulnerabilidad, fortaleciendo el reconocimiento de su identidad cultural y sus capacidades de convivencia en contextos diversos.
                </p>
                <p>
                    A través de formación progresiva, experiencias vivenciales e incidencia social, los participantes se convierten en protagonistas de encuentros interculturales y acciones de sensibilización, mientras el proyecto impulsa la organización juvenil, la producción de contenidos comunicacionales y el fortalecimiento institucional, consolidando a los jóvenes como actores clave en la construcción de relaciones basadas en la dignidad, la diversidad y la inclusión.
                </p>
            `
        },

        acompanamiento: {
            support: "Apoyado por: JESUITEN WELTWEIT, ALEMANIA",
            title: "Acompañamiento integral y visibilización de la migración forzada con enfoque intercultural (2024 – 2025)",
            body: `
                <p>
                    El proyecto “Acompañamiento integral y visibilización de la migración forzada” busca reducir la vulnerabilidad de las personas migrantes en Bolivia mediante una intervención integral basada en los principios de acoger, proteger, promover e integrar, brindando atención humanitaria, apoyo psicosocial, asesoramiento legal y oportunidades de integración sociocultural que garantizan el acceso a derechos y condiciones dignas.
                </p>
                <p>
                    Paralelamente, impulsa procesos de convivencia intercultural, visibilización del fenómeno migratorio y monitoreo de fronteras, contribuyendo a la sensibilización social, la generación de información y la incidencia pública, posicionando al SJM como un actor clave en la protección y promoción de los derechos de las personas migrantes.
                </p>
            `
        },

        emprendimiento: {
            support: "Apoyado por: Desarrollo y Paz – Caritas Canadá",
            title: "Propuesta metodológica para el apoyo a Emprendimientos con población vulnerable a partir de la evaluación de experiencias de emprendimiento con migrantes forzados residentes en Bolivia",
            body: `
                <p>
                    El proyecto piloto “Propuesta metodológica para el apoyo a Emprendimientos con población vulnerable” tiene como finalidad fortalecer la inclusión económica de personas migrantes mediante un proceso integral que inicia con un diagnóstico basado en la evaluación social sistémica, continúa con la formación en áreas productivas y gestión empresarial, y se concreta en la implementación y acompañamiento de emprendimientos piloto.
                </p>
                <p>
                    A partir de la evaluación participativa de estas experiencias, se identifican buenas prácticas que permiten diseñar una metodología institucional replicable, orientada a promover la sostenibilidad de los emprendimientos y la autonomía económica de las poblaciones migrantes en contextos de vulnerabilidad.
                </p>
            `
        }
    };

    const modal = document.getElementById("projectModal");
    const modalClose = document.getElementById("projectModalClose");
    const modalTitle = document.getElementById("projectModalTitle");
    const modalSupport = document.getElementById("projectModalSupport");
    const modalBody = document.getElementById("projectModalBody");
    const modalBackdrop = document.querySelector(".project-modal-backdrop");
    const triggers = document.querySelectorAll(".project-capsule");

    if (!modal || !modalClose || !modalTitle || !modalSupport || !modalBody || !triggers.length) {
        return;
    }

    function openProjectModal(projectKey) {
        const project = projectsData[projectKey];
        if (!project) return;

        modalSupport.textContent = project.support;
        modalTitle.textContent = project.title;
        modalBody.innerHTML = project.body;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeProjectModal() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    triggers.forEach(trigger => {
        trigger.addEventListener("click", () => {
            const projectKey = trigger.dataset.project;
            openProjectModal(projectKey);
        });
    });

    modalClose.addEventListener("click", closeProjectModal);

    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", closeProjectModal);
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeProjectModal();
        }
    });
});