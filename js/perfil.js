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
            url: "#",
            icon: "◎"
        },

        {
            title: "TikTok",
            url: "#",
            icon: "♪"
        },

        {
            title: "YouTube",
            url: "#",
            icon: "▶"
        }

    ]

};


function getProfile() {

    const saved =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!saved) {

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


const profile =
    getProfile();


const publicName =
    document.getElementById(
        "publicName"
    );


const publicUsername =
    document.getElementById(
        "publicUsername"
    );


const publicBio =
    document.getElementById(
        "publicBio"
    );


const publicAvatar =
    document.getElementById(
        "publicAvatar"
    );


const publicCover =
    document.getElementById(
        "publicCover"
    );


const publicLinks =
    document.getElementById(
        "publicLinks"
    );


const publicCategory =
    document.getElementById(
        "publicCategory"
    );


const publicLocation =
    document.getElementById(
        "publicLocation"
    );


const publicType =
    document.getElementById(
        "publicType"
    );


publicName.textContent =
    profile.name;


publicUsername.textContent =
    "@" + profile.username;


publicBio.textContent =
    profile.bio;


publicCategory.textContent =
    "✦ " +
    profile.category;


publicLocation.textContent =
    "◉ " +
    profile.location;


publicType.textContent =
    profile.type === "business"
        ? "NEGOCIO"
        : "CREADOR";


if (profile.avatar) {

    publicAvatar.innerHTML = `

        <img
            src="${escapeAttribute(
                profile.avatar
            )}"
            alt=""
        >

    `;

} else {

    publicAvatar.textContent =
        profile.name
            .charAt(0)
            .toUpperCase();

}


if (profile.cover) {

    publicCover.style.backgroundImage =
        `url("${profile.cover}")`;

}


if (
    profile.links &&
    profile.links.length
) {

    profile.links.forEach(link => {

        if (!link.title) return;


        const element =
            document.createElement(
                "a"
            );


        element.href =
            link.url || "#";


        element.target =
            "_blank";


        element.rel =
            "noopener noreferrer";


        element.className =
            "public-link";


        element.textContent =
            link.title;


        element.addEventListener(
            "click",
            () => {

                registerClick(link);

            }
        );


        publicLinks.appendChild(
            element
        );

    });

}


function registerClick(link) {

    try {

        const saved =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (!saved) return;


        const data =
            JSON.parse(saved);


        const target =
            data.links.find(
                item =>
                    item.title ===
                    link.title
            );


        if (target) {

            target.clicks =
                Number(
                    target.clicks || 0
                ) + 1;

        }


        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );

    } catch {

        // No interrumpir navegación.

    }

}


function escapeAttribute(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

}
