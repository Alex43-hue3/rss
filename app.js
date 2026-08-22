"use strict";


/* ==================================================
   PULSO — DATOS DEMO
================================================== */

const profiles = [

    {
        id: "nova",
        name: "Nova Gaming",
        category: "Gaming",
        icon: "🎮",
        description:
            "Streamer y creador de contenido construyendo una comunidad un stream a la vez.",
        visits: 12400,
        growth: "+28%",
        trending: true
    },

    {
        id: "luna",
        name: "Luna Creator",
        category: "Creadores",
        icon: "🎥",
        description:
            "Lifestyle, entretenimiento y contenido para una comunidad que sigue creciendo.",
        visits: 9640,
        growth: "+21%",
        trending: true
    },

    {
        id: "central",
        name: "Café Central",
        category: "Negocios",
        icon: "☕",
        description:
            "Café, postres y desayunos. Un nuevo lugar para descubrir en Cadereyta.",
        visits: 8230,
        growth: "+18%",
        trending: true
    },

    {
        id: "zero",
        name: "Zero Beat",
        category: "Música",
        icon: "🎵",
        description:
            "Artista independiente creando música sin esperar a que alguien le dé permiso.",
        visits: 7140,
        growth: "+17%",
        trending: true
    },

    {
        id: "pixel",
        name: "Pixel Studio",
        category: "Arte",
        icon: "🎨",
        description:
            "Diseño, ilustración y creatividad digital.",
        visits: 5980,
        growth: "+13%",
        trending: false
    },

    {
        id: "tech",
        name: "Nexora Tech",
        category: "Tecnología",
        icon: "⚡",
        description:
            "Proyecto tecnológico enfocado en soluciones digitales.",
        visits: 5120,
        growth: "+11%",
        trending: false
    },

    {
        id: "wolf",
        name: "Dark Wolf",
        category: "Creadores",
        icon: "🐺",
        description:
            "Contenido de entretenimiento y tendencias.",
        visits: 4870,
        growth: "+9%",
        trending: false
    },

    {
        id: "cine",
        name: "Cine Norte",
        category: "Cine",
        icon: "🎬",
        description:
            "Historias independientes creadas desde el norte de México.",
        visits: 3980,
        growth: "+8%",
        trending: false
    },

    {
        id: "urban",
        name: "Urban District",
        category: "Negocios",
        icon: "👕",
        description:
            "Moda urbana, diseño y cultura.",
        visits: 3540,
        growth: "+7%",
        trending: false
    },

    {
        id: "launch",
        name: "Project Alpha",
        category: "Proyectos",
        icon: "🚀",
        description:
            "Una idea que apenas está comenzando.",
        visits: 2870,
        growth: "+6%",
        trending: false
    }

];


/* ==================================================
   ELEMENTOS
================================================== */

const searchOverlay =
    document.getElementById("searchOverlay");

const openSearch =
    document.getElementById("openSearch");

const closeSearch =
    document.getElementById("closeSearch");

const globalSearch =
    document.getElementById("globalSearch");

const searchResults =
    document.getElementById("searchResults");

const mobileNav =
    document.getElementById("mobileNav");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileClose =
    document.getElementById("mobileClose");

const profileModal =
    document.getElementById("profileModal");

const closeProfileModal =
    document.getElementById("closeProfileModal");

const modalCloseButton =
    document.getElementById("modalCloseButton");

const detailModal =
    document.getElementById("detailModal");

const closeDetailModal =
    document.getElementById("closeDetailModal");

const trendingGrid =
    document.getElementById("trendingGrid");

const categoryResults =
    document.getElementById("categoryResults");


/* ==================================================
   UTILIDADES
================================================== */

function formatNumber(number) {

    if (number >= 1000000) {

        return (
            (number / 1000000)
                .toFixed(1)
                .replace(".0", "")
            + "M"
        );

    }

    if (number >= 1000) {

        return (
            (number / 1000)
                .toFixed(1)
                .replace(".0", "")
            + "K"
        );

    }

    return number.toString();

}


function findProfile(id) {

    return profiles.find(
        profile => profile.id === id
    );

}


/* ==================================================
   TRENDING
================================================== */

function renderTrending() {

    if (!trendingGrid) return;

    const trending =
        profiles
            .filter(profile => profile.trending)
            .slice(0, 8);

    trendingGrid.innerHTML =
        trending.map(
            (profile, index) => `

                <article
                    class="trend-card"
                    data-profile="${profile.id}"
                >

                    <div class="trend-top">

                        <span class="trend-number">
                            0${index + 1}
                        </span>

                        <span class="trend-growth">
                            ${profile.growth}
                        </span>

                    </div>


                    <div class="trend-icon">
                        ${profile.icon}
                    </div>


                    <div class="trend-bottom">

                        <span class="trend-category">
                            ${profile.category}
                        </span>

                        <strong class="trend-name">
                            ${profile.name}
                        </strong>

                        <div class="trend-meta">

                            <span>
                                👁 ${formatNumber(profile.visits)}
                            </span>

                            <span>
                                ↗ CRECIENDO
                            </span>

                        </div>

                    </div>

                </article>

            `
        ).join("");

}


/* ==================================================
   CATEGORÍAS
================================================== */

function renderCategory(category = "Todos") {

    if (!categoryResults) return;

    let results;

    if (category === "Todos") {

        results =
            profiles.slice(0, 6);

    } else {

        results =
            profiles.filter(
                profile =>
                    profile.category === category
            );

    }


    if (!results.length) {

        categoryResults.innerHTML = `

            <div class="category-result">

                <div class="category-result-icon">
                    🔎
                </div>

                <div class="category-result-info">

                    <span>
                        TODAVÍA NO
                    </span>

                    <strong>
                        Estamos buscando...
                    </strong>

                    <small>
                        Pronto habrá más perfiles aquí.
                    </small>

                </div>

            </div>

        `;

        return;

    }


    categoryResults.innerHTML =
        results.map(
            profile => `

                <article
                    class="category-result"
                    data-profile="${profile.id}"
                >

                    <div class="category-result-icon">
                        ${profile.icon}
                    </div>

                    <div class="category-result-info">

                        <span>
                            ${profile.category}
                        </span>

                        <strong>
                            ${profile.name}
                        </strong>

                        <small>
                            ${formatNumber(profile.visits)}
                            personas lo descubrieron
                        </small>

                    </div>

                </article>

            `
        ).join("");

}


/* ==================================================
   PROFILE DETAIL
================================================== */

function openDetail(profileId) {

    const profile =
        findProfile(profileId);

    if (!profile) return;


    document.getElementById(
        "detailVisual"
    ).textContent =
        profile.icon;


    document.getElementById(
        "detailCategory"
    ).textContent =
        profile.category.toUpperCase();


    document.getElementById(
        "detailName"
    ).textContent =
        profile.name;


    document.getElementById(
        "detailDescription"
    ).textContent =
        profile.description;


    document.getElementById(
        "detailVisits"
    ).textContent =
        formatNumber(profile.visits);


    detailModal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


/* ==================================================
   SEARCH
================================================== */

function openSearchPanel() {

    searchOverlay.classList.add("active");

    document.body.style.overflow =
        "hidden";

    setTimeout(() => {

        globalSearch.focus();

    }, 150);

}


function closeSearchPanel() {

    searchOverlay.classList.remove("active");

    document.body.style.overflow =
        "";

    globalSearch.value = "";

    searchResults.innerHTML =
        "";

}


function searchProfiles(value) {

    const query =
        value
            .trim()
            .toLowerCase();


    if (!query) {

        searchResults.innerHTML =
            "";

        return;

    }


    const results =
        profiles.filter(profile =>

            profile.name
                .toLowerCase()
                .includes(query)

            ||

            profile.category
                .toLowerCase()
                .includes(query)

            ||

            profile.description
                .toLowerCase()
                .includes(query)

        );


    if (!results.length) {

        searchResults.innerHTML = `

            <div class="category-result">

                <div class="category-result-icon">
                    🔎
                </div>

                <div class="category-result-info">

                    <span>
                        SIN RESULTADOS
                    </span>

                    <strong>
                        No encontramos eso todavía.
                    </strong>

                    <small>
                        Intenta con otro término.
                    </small>

                </div>

            </div>

        `;

        return;

    }


    searchResults.innerHTML =
        results.map(
            profile => `

                <article
                    class="category-result search-result-item"
                    data-profile="${profile.id}"
                >

                    <div class="category-result-icon">
                        ${profile.icon}
                    </div>

                    <div class="category-result-info">

                        <span>
                            ${profile.category}
                        </span>

                        <strong>
                            ${profile.name}
                        </strong>

                        <small>
                            ${profile.description}
                        </small>

                    </div>

                </article>

            `
        ).join("");

}


/* ==================================================
   MODAL CRECER
================================================== */

function openGrowModal() {

    profileModal.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


function closeGrowModal() {

    profileModal.classList.remove("active");

    document.body.style.overflow =
        "";

}


/* ==================================================
   EVENTOS
================================================== */

openSearch?.addEventListener(
    "click",
    openSearchPanel
);


closeSearch?.addEventListener(
    "click",
    closeSearchPanel
);


globalSearch?.addEventListener(
    "input",
    event => {

        searchProfiles(
            event.target.value
        );

    }
);


globalSearch?.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeSearchPanel();

        }

    }
);


/* ==================================================
   MOBILE
================================================== */

mobileMenuButton?.addEventListener(
    "click",
    () => {

        mobileNav.classList.add("active");

        document.body.style.overflow =
            "hidden";

    }
);


mobileClose?.addEventListener(
    "click",
    () => {

        mobileNav.classList.remove("active");

        document.body.style.overflow =
            "";

    }
);


document
    .querySelectorAll(".mobile-nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileNav.classList.remove(
                    "active"
                );

                document.body.style.overflow =
                    "";

            }
        );

    });


/* ==================================================
   CRECER
================================================== */

document
    .querySelectorAll(
        "#headerGrow, #heroGrow, #mainGrowButton"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            openGrowModal
        );

    });


closeProfileModal?.addEventListener(
    "click",
    closeGrowModal
);


modalCloseButton?.addEventListener(
    "click",
    closeGrowModal
);


/* ==================================================
   DETAIL MODAL
================================================== */

closeDetailModal?.addEventListener(
    "click",
    () => {

        detailModal.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }
);


/* ==================================================
   DELEGACIÓN DE CLICS
================================================== */

document.addEventListener(
    "click",
    event => {

        const element =
            event.target.closest(
                "[data-profile]"
            );


        if (!element) return;


        const profileId =
            element.dataset.profile;


        if (!profileId) return;


        closeSearchPanel();

        openDetail(profileId);

    }
);


/* ==================================================
   CATEGORÍAS
================================================== */

document
    .querySelectorAll(".category-pill")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".category-pill"
                    )
                    .forEach(
                        item =>
                            item.classList.remove(
                                "active"
                            )
                    );


                button.classList.add(
                    "active"
                );


                renderCategory(
                    button.dataset.category
                );

            }
        );

    });


/* ==================================================
   DESCUBRIR MÁS
================================================== */

document
    .getElementById("discoverMore")
    ?.addEventListener(
        "click",
        () => {

            document
                .getElementById("categorias")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* ==================================================
   VER TENDENCIAS
================================================== */

document
    .getElementById("viewTrending")
    ?.addEventListener(
        "click",
        () => {

            document
                .getElementById("tendencias")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


/* ==================================================
   ESCAPE
================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape")
            return;


        closeSearchPanel();

        closeGrowModal();


        detailModal.classList.remove(
            "active"
        );


        mobileNav.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";

    }
);


/* ==================================================
   CLICK FUERA DE MODALES
================================================== */

profileModal?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            profileModal
        ) {

            closeGrowModal();

        }

    }
);


detailModal?.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            detailModal
        ) {

            detailModal.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";

        }

    }
);


/* ==================================================
   CURSOR GLOW
================================================== */

const cursorGlow =
    document.querySelector(
        ".cursor-glow"
    );


if (
    cursorGlow &&
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    document.addEventListener(
        "mousemove",
        event => {

            cursorGlow.style.left =
                event.clientX + "px";

            cursorGlow.style.top =
                event.clientY + "px";

        }
    );

}


/* ==================================================
   INICIALIZAR
================================================== */

renderTrending();

renderCategory("Todos");


console.log(
    "PULSO V1 iniciado correctamente."
);

console.log(
    "Perfiles demo:",
    profiles.length
);
