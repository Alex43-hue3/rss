/* =========================================
   TOPSPOT
   APP.JS
========================================= */

"use strict";


/* =========================================
   DATOS TEMPORALES
========================================= */

const profiles = [

    {
        id: 1,
        name: "Nova Gaming",
        category: "Gaming",
        icon: "🎮",
        description: "Streamer y creador de contenido enfocado en videojuegos.",
        visits: 12840,
        trending: true,
        sponsored: true
    },

    {
        id: 2,
        name: "Luna Creator",
        category: "Creadores",
        icon: "🎥",
        description: "Creadora de contenido, lifestyle y entretenimiento.",
        visits: 9640,
        trending: true,
        sponsored: true
    },

    {
        id: 3,
        name: "Café Central",
        category: "Negocios",
        icon: "☕",
        description: "Café, postres y desayunos para disfrutar con amigos.",
        visits: 8230,
        trending: true,
        sponsored: true
    },

    {
        id: 4,
        name: "Dark Wolf",
        category: "TikTok",
        icon: "🐺",
        description: "Contenido de entretenimiento y tendencias.",
        visits: 7140,
        trending: false,
        sponsored: false
    },

    {
        id: 5,
        name: "Pixel Studio",
        category: "Arte",
        icon: "🎨",
        description: "Diseño gráfico, ilustración y proyectos digitales.",
        visits: 5980,
        trending: false,
        sponsored: false
    },

    {
        id: 6,
        name: "Zero Beat",
        category: "Música",
        icon: "🎵",
        description: "Proyecto musical independiente y productor.",
        visits: 4870,
        trending: false,
        sponsored: false
    }

];


/* =========================================
   ELEMENTOS
========================================= */

const searchButton =
    document.getElementById("searchButton");

const searchPanel =
    document.getElementById("searchPanel");

const searchInput =
    document.getElementById("searchInput");

const closeSearch =
    document.getElementById("closeSearch");

const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const closeMobile =
    document.getElementById("closeMobile");

const profileButton =
    document.getElementById("profileButton");

const ctaCreate =
    document.getElementById("ctaCreate");

const mobileCreate =
    document.querySelector(".mobile-create");

const profileModal =
    document.getElementById("profileModal");

const closeModal =
    document.getElementById("closeModal");

const modalAccept =
    document.getElementById("modalAccept");

const heroSearch =
    document.getElementById("heroSearch");

const heroSearchButton =
    document.getElementById("heroSearchButton");

const trendingProfiles =
    document.getElementById("trendingProfiles");

const rankingList =
    document.getElementById("rankingList");


/* =========================================
   FORMATO DE VISITAS
========================================= */

function formatVisits(number) {

    if (number >= 1000000) {

        return (
            (number / 1000000)
                .toFixed(1)
                .replace(".0", "")
            + " M"
        );

    }

    if (number >= 1000) {

        return (
            (number / 1000)
                .toFixed(1)
                .replace(".0", "")
            + " K"
        );

    }

    return number.toString();

}


/* =========================================
   CREAR TARJETA DE PERFIL
========================================= */

function createProfileCard(profile) {

    return `

        <article class="profile-card">

            ${
                profile.trending
                ?
                `<span class="trending-badge">
                    🔥 EN TENDENCIA
                </span>`
                :
                ""
            }

            <div class="profile-top">

                <div class="profile-avatar">
                    ${profile.icon}
                </div>

                <div>

                    <div class="profile-name">
                        ${profile.name}
                    </div>

                    <div class="profile-category">
                        ${profile.category}
                    </div>

                </div>

            </div>

            <p class="profile-description">
                ${profile.description}
            </p>

            <div class="profile-footer">

                <span class="profile-visits">
                    👁️ ${formatVisits(profile.visits)} visitas
                </span>

                <a href="#" class="profile-link">
                    Ver perfil →
                </a>

            </div>

        </article>

    `;

}


/* =========================================
   MOSTRAR TENDENCIAS
========================================= */

function renderTrending() {

    if (!trendingProfiles) return;

    const trending =
        profiles
            .filter(profile => profile.trending)
            .slice(0, 6);

    trendingProfiles.innerHTML =
        trending
            .map(createProfileCard)
            .join("");

}


/* =========================================
   MOSTRAR RANKING
========================================= */

function renderRanking(list = profiles) {

    if (!rankingList) return;

    const sorted =
        [...list]
            .sort((a, b) => b.visits - a.visits);

    rankingList.innerHTML =
        sorted
            .map((profile, index) => {

                const position =
                    index + 1;

                return `

                    <article class="ranking-item">

                        <div class="
                            rank-number
                            ${position <= 3 ? "top" : ""}
                        ">

                            #${position}

                        </div>

                        <div class="rank-info">

                            <div class="rank-avatar">
                                ${profile.icon}
                            </div>

                            <div>

                                <div class="rank-name">
                                    ${profile.name}
                                </div>

                                <div class="rank-category">
                                    ${profile.category}
                                </div>

                            </div>

                        </div>

                        <div class="rank-visits">
                            👁️ ${formatVisits(profile.visits)}
                        </div>

                        <button
                            class="rank-button"
                            data-profile="${profile.id}"
                        >
                            Ver
                        </button>

                    </article>

                `;

            })
            .join("");

}


/* =========================================
   BUSCAR
========================================= */

function searchProfiles(value) {

    const search =
        value
            .trim()
            .toLowerCase();

    if (!search) {

        renderRanking();

        return;

    }

    const results =
        profiles.filter(profile =>

            profile.name
                .toLowerCase()
                .includes(search)

            ||

            profile.category
                .toLowerCase()
                .includes(search)

            ||

            profile.description
                .toLowerCase()
                .includes(search)

        );

    renderRanking(results);

    document
        .getElementById("ranking")
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


/* =========================================
   CATEGORÍAS
========================================= */

document
    .querySelectorAll(".category-card")
    .forEach(button => {

        button.addEventListener("click", () => {

            const category =
                button.dataset.category;

            const results =
                profiles.filter(
                    profile =>
                        profile.category === category
                );

            renderRanking(results);

            document
                .getElementById("ranking")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


/* =========================================
   FILTROS DEL RANKING
========================================= */

document
    .querySelectorAll(".filter-button")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".filter-button")
                .forEach(btn =>
                    btn.classList.remove("active")
                );

            button.classList.add("active");

            const category =
                button.textContent.trim();

            if (category === "Todos") {

                renderRanking();

                return;

            }

            const results =
                profiles.filter(
                    profile =>
                        profile.category === category
                );

            renderRanking(results);

        });

    });


/* =========================================
   BUSCADOR HEADER
========================================= */

if (searchButton) {

    searchButton.addEventListener("click", () => {

        searchPanel.classList.toggle("active");

        if (searchPanel.classList.contains("active")) {

            searchInput.focus();

        }

    });

}


if (closeSearch) {

    closeSearch.addEventListener("click", () => {

        searchPanel.classList.remove("active");

        searchInput.value = "";

        renderRanking();

    });

}


if (searchInput) {

    searchInput.addEventListener("input", () => {

        searchProfiles(searchInput.value);

    });

}


/* =========================================
   BUSCADOR HERO
========================================= */

if (heroSearchButton) {

    heroSearchButton.addEventListener("click", () => {

        searchProfiles(heroSearch.value);

    });

}


if (heroSearch) {

    heroSearch.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            searchProfiles(heroSearch.value);

        }

    });

}


/* =========================================
   MENÚ MOBILE
========================================= */

if (menuButton) {

    menuButton.addEventListener("click", () => {

        mobileMenu.classList.add("active");

        document.body.style.overflow = "hidden";

    });

}


function closeMobileMenu() {

    mobileMenu.classList.remove("active");

    document.body.style.overflow = "";

}


if (closeMobile) {

    closeMobile.addEventListener(
        "click",
        closeMobileMenu
    );

}


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


/* =========================================
   MODAL
========================================= */

function openProfileModal() {

    profileModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeProfileModal() {

    profileModal.classList.remove("active");

    document.body.style.overflow = "";

}


if (profileButton) {

    profileButton.addEventListener(
        "click",
        openProfileModal
    );

}


if (ctaCreate) {

    ctaCreate.addEventListener(
        "click",
        openProfileModal
    );

}


if (mobileCreate) {

    mobileCreate.addEventListener(
        "click",
        () => {

            closeMobileMenu();

            openProfileModal();

        }
    );

}


if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeProfileModal
    );

}


if (modalAccept) {

    modalAccept.addEventListener(
        "click",
        closeProfileModal
    );

}


if (profileModal) {

    profileModal.addEventListener(
        "click",
        event => {

            if (event.target === profileModal) {

                closeProfileModal();

            }

        }
    );

}


/* =========================================
   INICIALIZAR
========================================= */

renderTrending();

renderRanking();

console.log("TOPSPOT iniciado correctamente.");
console.log("Perfiles cargados:", profiles.length);
