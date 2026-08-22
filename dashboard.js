const STORAGE_KEY = "nexoraProfile";


const defaultProfile = {

    type: "creator",

    name: "Alex Creator",

    username: "alexcreator",

    bio: "Creador de contenido · Gaming · Tecnología",

    category: "Creador de contenido",

    location: "México",

    avatar: "",

    cover: "",

    links: [

        {
            title: "Instagram",
            url: "https://instagram.com/",
            icon: "◎",
            clicks: 124
        },

        {
            title: "TikTok",
            url: "https://tiktok.com/",
            icon: "♪",
            clicks: 89
        },

        {
            title: "YouTube",
            url: "https://youtube.com/",
            icon: "▶",
            clicks: 67
        },

        {
            title: "WhatsApp",
            url: "https://wa.me/",
            icon: "☏",
            clicks: 47
        }

    ]

};


function getProfile() {

    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (!saved) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultProfile)
        );

        return defaultProfile;
    }

    try {

        return {
            ...defaultProfile,
            ...JSON.parse(saved)
        };

    } catch {

        return defaultProfile;
    }
}


function saveProfile(profile) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(profile)
    );
}


const profile = getProfile();


function calculateCompletion(profile) {

    let completed = 0;

    const fields = [

        profile.name,

        profile.username,

        profile.bio,

        profile.category,

        profile.location

    ];


    fields.forEach(value => {

        if (
            value &&
            String(value).trim() !== ""
        ) {
            completed++;
        }

    });


    if (profile.avatar) {
        completed++;
    }


    if (
        profile.links &&
        profile.links.length
    ) {
        completed++;
    }


    return Math.round(
        (completed / 7) * 100
    );
}


function updateDashboard() {

    const name =
        profile.name || "Alex";


    const firstName =
        name.split(" ")[0];


    const welcomeName =
        document.getElementById("welcomeName");


    if (welcomeName) {

        welcomeName.textContent =
            firstName;

    }


    const sidebarName =
        document.getElementById("sidebarName");


    if (sidebarName) {

        sidebarName.textContent =
            profile.name;

    }


    const sidebarUsername =
        document.getElementById(
            "sidebarUsername"
        );


    if (sidebarUsername) {

        sidebarUsername.textContent =
            "@" + profile.username;

    }


    const sidebarAvatar =
        document.getElementById(
            "sidebarAvatar"
        );


    if (sidebarAvatar) {

        if (profile.avatar) {

            sidebarAvatar.innerHTML =
                `<img src="${profile.avatar}" alt="">`;

        } else {

            sidebarAvatar.textContent =
                profile.name
                    ? profile.name.charAt(0)
                    : "A";

        }

    }


    const completion =
        calculateCompletion(profile);


    const completionNumber =
        document.getElementById(
            "completionNumber"
        );


    const profileCompletion =
        document.getElementById(
            "profileCompletion"
        );


    if (completionNumber) {

        completionNumber.textContent =
            completion + "%";

    }


    if (profileCompletion) {

        profileCompletion.textContent =
            completion + "%";

    }


    renderLinks();

}


function renderLinks() {

    const container =
        document.getElementById(
            "dashboardLinks"
        );


    if (!container) return;


    container.innerHTML = "";


    if (
        !profile.links ||
        !profile.links.length
    ) {

        container.innerHTML = `
            <div class="dashboard-empty">
                Aún no tienes enlaces.
            </div>
        `;

        return;
    }


    profile.links
        .slice(0, 6)
        .forEach(link => {

            const row =
                document.createElement("div");


            row.className =
                "dashboard-link-row";


            row.innerHTML = `

                <div class="link-platform-icon">
                    ${escapeHTML(
                        link.icon || "↗"
                    )}
                </div>

                <div class="dashboard-link-info">

                    <strong>
                        ${escapeHTML(
                            link.title
                        )}
                    </strong>

                    <span>
                        ${escapeHTML(
                            link.url
                        )}
                    </span>

                </div>

                <span class="link-clicks">
                    ${link.clicks || 0} clics
                </span>

            `;


            container.appendChild(row);

        });

}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function showToast(message) {

    const toast =
        document.getElementById("toast");


    const text =
        document.getElementById(
            "toastText"
        );


    if (!toast) return;


    text.textContent = message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


async function shareProfile() {

    const url =
        window.location.origin +
        window.location.pathname
            .replace(
                "dashboard.html",
                "perfil.html"
            );


    if (
        navigator.share
    ) {

        try {

            await navigator.share({

                title:
                    profile.name,

                text:
                    "Mira mi perfil en NEXORA",

                url

            });

        } catch {

            // Usuario canceló.

        }

        return;
    }


    try {

        await navigator.clipboard.writeText(
            url
        );

        showToast(
            "Enlace del perfil copiado"
        );

    } catch {

        showToast(
            "No se pudo copiar el enlace"
        );

    }

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateDashboard();


        const share =
            document.getElementById(
                "shareProfileBtn"
            );


        const shareQuick =
            document.getElementById(
                "shareQuickBtn"
            );


        if (share) {

            share.addEventListener(
                "click",
                shareProfile
            );

        }


        if (shareQuick) {

            shareQuick.addEventListener(
                "click",
                shareProfile
            );

        }

    }
);
