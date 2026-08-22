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
        }

    ]

};


function loadProfile() {

    const saved =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!saved) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultProfile)
        );

        return {
            ...defaultProfile
        };

    }


    try {

        return {
            ...defaultProfile,
            ...JSON.parse(saved)
        };

    } catch {

        return {
            ...defaultProfile
        };

    }

}


let profile =
    loadProfile();


const nameInput =
    document.getElementById("name");


const usernameInput =
    document.getElementById("username");


const bioInput =
    document.getElementById("bio");


const categoryInput =
    document.getElementById("category");


const locationInput =
    document.getElementById("location");


const avatarInput =
    document.getElementById("avatar");


const coverInput =
    document.getElementById("cover");


const linksEditor =
    document.getElementById(
        "linksEditor"
    );


const previewName =
    document.getElementById(
        "previewName"
    );


const previewUsername =
    document.getElementById(
        "previewUsername"
    );


const previewBio =
    document.getElementById(
        "previewBio"
    );


const previewAvatar =
    document.getElementById(
        "previewAvatar"
    );


const previewCover =
    document.getElementById(
        "previewCover"
    );


const previewLinks =
    document.getElementById(
        "previewLinks"
    );


function fillForm() {

    nameInput.value =
        profile.name || "";


    usernameInput.value =
        profile.username || "";


    bioInput.value =
        profile.bio || "";


    categoryInput.value =
        profile.category ||
        "Creador de contenido";


    locationInput.value =
        profile.location || "";


    avatarInput.value =
        profile.avatar || "";


    coverInput.value =
        profile.cover || "";


    document
        .querySelectorAll(
            ".type-option"
        )
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.type ===
                profile.type
            );

        });


    renderLinks();

    updatePreview();

}


function updatePreview() {

    const name =
        nameInput.value.trim() ||
        "Tu nombre";


    const username =
        usernameInput.value.trim() ||
        "tuusuario";


    const bio =
        bioInput.value.trim() ||
        "Tu descripción aparecerá aquí.";


    previewName.textContent =
        name;


    previewUsername.textContent =
        "@" + username;


    previewBio.textContent =
        bio;


    if (
        avatarInput.value.trim()
    ) {

        previewAvatar.innerHTML = `

            <img
                src="${escapeAttribute(
                    avatarInput.value.trim()
                )}"
                alt=""
                onerror="this.parentElement.textContent='${escapeAttribute(
                    name.charAt(0)
                )}'"
            >

        `;

    } else {

        previewAvatar.textContent =
            name.charAt(0).toUpperCase();

    }


    if (
        coverInput.value.trim()
    ) {

        previewCover.style.backgroundImage =
            `url("${coverInput.value.trim()}")`;

        previewCover.style.backgroundSize =
            "cover";

        previewCover.style.backgroundPosition =
            "center";

    } else {

        previewCover.style.backgroundImage =
            "";

    }


    renderPreviewLinks();

}


function renderLinks() {

    linksEditor.innerHTML = "";


    if (
        !profile.links ||
        !profile.links.length
    ) {

        linksEditor.innerHTML = `

            <div class="empty-links">
                Todavía no tienes enlaces.
                Pulsa "Agregar enlace".
            </div>

        `;

        return;

    }


    profile.links.forEach(
        (link, index) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "link-editor-row";


            row.innerHTML = `

                <div class="drag-handle">
                    ☷
                </div>

                <input
                    type="text"
                    class="link-title"
                    value="${escapeAttribute(
                        link.title || ""
                    )}"
                    placeholder="Nombre"
                    data-index="${index}"
                >

                <input
                    type="url"
                    class="link-url"
                    value="${escapeAttribute(
                        link.url || ""
                    )}"
                    placeholder="https://..."
                    data-index="${index}"
                >

                <button
                    type="button"
                    class="remove-link"
                    data-index="${index}"
                >
                    ×
                </button>

            `;


            linksEditor.appendChild(row);

        }
    );


    linksEditor
        .querySelectorAll(
            ".link-title"
        )
        .forEach(input => {

            input.addEventListener(
                "input",
                event => {

                    const index =
                        Number(
                            event.target
                                .dataset
                                .index
                        );


                    profile.links[index]
                        .title =
                        event.target.value;


                    updatePreview();

                }
            );

        });


    linksEditor
        .querySelectorAll(
            ".link-url"
        )
        .forEach(input => {

            input.addEventListener(
                "input",
                event => {

                    const index =
                        Number(
                            event.target
                                .dataset
                                .index
                        );


                    profile.links[index]
                        .url =
                        event.target.value;

                }
            );

        });


    linksEditor
        .querySelectorAll(
            ".remove-link"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const index =
                        Number(
                            event.target
                                .dataset
                                .index
                        );


                    profile.links
                        .splice(
                            index,
                            1
                        );


                    renderLinks();

                    updatePreview();

                }
            );

        });

}


function renderPreviewLinks() {

    previewLinks.innerHTML = "";


    if (
        !profile.links ||
        !profile.links.length
    ) {

        return;

    }


    profile.links.forEach(link => {

        if (!link.title) return;


        const element =
            document.createElement(
                "div"
            );


        element.className =
            "preview-link";


        element.textContent =
            link.title;


        previewLinks.appendChild(
            element
        );

    });

}


function addLink() {

    profile.links.push({

        title: "Nuevo enlace",

        url: "https://",

        icon: "↗",

        clicks: 0

    });


    renderLinks();

    updatePreview();

}


function saveProfile() {

    profile.name =
        nameInput.value.trim();


    profile.username =
        usernameInput.value
            .trim()
            .replace(/^@/, "")
            .replace(/\s/g, "")
            .toLowerCase();


    profile.bio =
        bioInput.value.trim();


    profile.category =
        categoryInput.value;


    profile.location =
        locationInput.value.trim();


    profile.avatar =
        avatarInput.value.trim();


    profile.cover =
        coverInput.value.trim();


    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(profile)
    );


    const toast =
        document.getElementById(
            "editorToast"
        );


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );


        window.location.href =
            "dashboard.html";

    }, 1000);

}


function escapeAttribute(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

}


document
    .querySelectorAll(
        ".type-option"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".type-option"
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


                profile.type =
                    button.dataset.type;

            }
        );

    });


[
    nameInput,
    usernameInput,
    bioInput,
    categoryInput,
    locationInput,
    avatarInput,
    coverInput
].forEach(input => {

    input.addEventListener(
        "input",
        updatePreview
    );

    input.addEventListener(
        "change",
        updatePreview
    );

});


document
    .getElementById("addLink")
    .addEventListener(
        "click",
        addLink
    );


document
    .getElementById("saveProfile")
    .addEventListener(
        "click",
        saveProfile
    );


fillForm();
