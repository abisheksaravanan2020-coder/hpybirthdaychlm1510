/* =========================================
   SAN BIRTHDAY EXPERIENCE
   script.js
========================================= */


/* =========================================
   SETTINGS
========================================= */

// Number of photos you want to check.
// You can increase this to 100, 200 etc.
const TOTAL_PHOTOS = 100;

// Your birthday
const BIRTHDAY_MONTH = 9;   // September
const BIRTHDAY_DAY = 10;


/* =========================================
   ELEMENTS
========================================= */

const intro = document.getElementById("intro");


const photoGrid = document.getElementById("photoGrid");

const imageViewer = document.getElementById("imageViewer");

const fullImage = document.getElementById("fullImage");

const toast = document.getElementById("toast");


let musicPlaying = false;


/* =========================================
   START EXPERIENCE
========================================= */

function beginExperience() {

    // Hide intro
    intro.style.opacity = "0";

    intro.style.transform = "scale(1.05)";

    intro.style.transition = "1.2s ease";


    setTimeout(() => {

        intro.style.display = "none";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 1000);


    // Start music
    playMusic();


    // Small welcome message
    showToast(
        "Our story begins... ❤️"
    );


    // Start effects
    createHearts();

}


/* =========================================
   MUSIC
========================================= */

function playMusic() {

    music.play()
        .then(() => {

            musicPlaying = true;

            musicBtn.innerHTML = "🔊";

        })
        .catch(() => {

            musicPlaying = false;

            musicBtn.innerHTML = "🎵";

        });

}


function toggleMusic() {

    if (musicPlaying) {

        music.pause();

        musicPlaying = false;

        musicBtn.innerHTML = "🎵";

    } else {

        playMusic();

    }

}
  

// =========================
// PREMIUM MUSIC CONTROL
// =========================

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

function updateMusicUI() {
    if (!music || !musicBtn) return;

    if (!music.paused) {
        musicBtn.classList.add("playing");
    } else {
        musicBtn.classList.remove("playing");
    }
}

if (music && musicBtn) {

    musicBtn.addEventListener("click", () => {

        if (music.paused) {
            music.play()
                .then(() => {
                    updateMusicUI();
                })
                .catch(() => {
                    showToast("🎵 Tap again to play the song");
                });

        } else {
            music.pause();
            updateMusicUI();
        }

    });

    music.addEventListener("play", updateMusicUI);
    music.addEventListener("pause", updateMusicUI);
}

/* =========================================
   AUTO PHOTO GALLERY
========================================= */

async function loadPhotos() {

    if (!photoGrid) return;


    for (
        let i = 1;
        i <= TOTAL_PHOTOS;
        i++
    ) {

        const number =
            String(i).padStart(2, "0");

        const jpg =
            `assets/photos/${number}.jpg`;

        const jpeg =
            `assets/photos/${number}.jpeg`;

        const png =
            `assets/photos/${number}.png`;


        const exists =
            await checkImage(jpg);


        if (exists) {

            addPhoto(jpg, i);

        } else {

            const jpegExists =
                await checkImage(jpeg);


            if (jpegExists) {

                addPhoto(jpeg, i);

            } else {

                const pngExists =
                    await checkImage(png);


                if (pngExists) {

                    addPhoto(png, i);

                }

            }

        }

    }


    // If no photos found
    if (!photoGrid.children.length) {

        photoGrid.innerHTML = `

            <div class="no-photo">

                <p>
                    Add your photos inside
                    <br>
                    <strong>
                        assets/photos/
                    </strong>
                </p>

            </div>

        `;

    }

}


/* =========================================
   CHECK IMAGE
========================================= */

function checkImage(src) {

    return new Promise((resolve) => {

        const img =
            new Image();


        img.onload = () => {

            resolve(true);

        };


        img.onerror = () => {

            resolve(false);

        };


        img.src = src;

    });

}


/* =========================================
   ADD PHOTO
========================================= */

function addPhoto(src, number) {

    const img =
        document.createElement("img");


    img.src = src;

    img.alt =
        `San Memory ${number}`;


    img.loading = "lazy";


    img.onclick = () => {

        openImage(img);

    };


    photoGrid.appendChild(img);

}


/* =========================================
   FULLSCREEN IMAGE
========================================= */

function openImage(img) {

    fullImage.src = img.src;

    imageViewer.style.display = "flex";


    document.body.style.overflow =
        "hidden";

}


function closeImage() {

    imageViewer.style.display = "none";

    document.body.style.overflow =
        "auto";

}


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closeImage();

        }

    }
);


/* =========================================
   TOAST
========================================= */

function showToast(message) {

    toast.innerHTML = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================================
   FLOATING HEARTS
========================================= */

function createHearts() {

    const container =
        document.createElement("div");


    container.style.position =
        "fixed";

    container.style.inset =
        "0";

    container.style.pointerEvents =
        "none";

    container.style.overflow =
        "hidden";

    container.style.zIndex =
        "999";


    document.body.appendChild(
        container
    );


    setInterval(() => {

        const heart =
            document.createElement("div");


        heart.innerHTML =
            ["❤️", "♡", "💗", "✨"][
                Math.floor(
                    Math.random() * 4
                )
            ];


        heart.style.position =
            "absolute";


        heart.style.left =
            Math.random() * 100 + "%";


        heart.style.bottom =
            "-30px";


        heart.style.fontSize =
            12 + Math.random() * 20 + "px";


        heart.style.opacity =
            0.2 + Math.random() * 0.5;


        heart.style.transition =
            "transform 7s linear, opacity 7s";


        container.appendChild(
            heart
        );


        requestAnimationFrame(() => {

            heart.style.transform =
                `
                translateY(-110vh)
                rotate(360deg)
                `;

            heart.style.opacity =
                "0";

        });


        setTimeout(() => {

            heart.remove();

        }, 7000);


    }, 1400);

}


/* =========================================
   SCROLL REVEAL
========================================= */

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


document
    .querySelectorAll(
        ".story-card"
    )
    .forEach((card) => {

        observer.observe(card);

    });


/* =========================================
   APP BUTTON
========================================= */

function getApp(event) {

    event.preventDefault();


    showToast(
        "📱 The birthday app is coming..."
    );


    /*
       IMPORTANT:

       Later, when your Android app is ready,
       replace this function with your
       actual download / Play Store link.

       Example:

       window.location.href =
       "YOUR_APP_LINK_HERE";
    */

}


/* =========================================
   DOUBLE CLICK HEART
========================================= */

document.addEventListener(
    "dblclick",
    (event) => {

        createClickHeart(
            event.clientX,
            event.clientY
        );

    }
);


function createClickHeart(x, y) {

    const heart =
        document.createElement("div");


    heart.innerHTML =
        "❤️";


    heart.style.position =
        "fixed";


    heart.style.left =
        x + "px";


    heart.style.top =
        y + "px";


    heart.style.fontSize =
        "30px";


    heart.style.pointerEvents =
        "none";


    heart.style.zIndex =
        "30000";


    heart.style.transition =
        "1s ease";


    document.body.appendChild(
        heart
    );


    requestAnimationFrame(() => {

        heart.style.transform =
            "translateY(-100px) scale(1.5)";

        heart.style.opacity =
            "0";

    });


    setTimeout(() => {

        heart.remove();

    }, 1000);

}


/* =========================================
   RANDOM STAR PARTICLES
========================================= */

function createStars() {

    const starContainer =
        document.querySelector(
            ".intro-screen"
        );


    if (!starContainer) return;


    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const star =
            document.createElement("span");


        star.style.position =
            "absolute";


        star.style.width =
            Math.random() * 3 + "px";


        star.style.height =
            star.style.width;


        star.style.background =
            "white";


        star.style.borderRadius =
            "50%";


        star.style.left =
            Math.random() * 100 + "%";


        star.style.top =
            Math.random() * 100 + "%";


        star.style.opacity =
            Math.random();


        star.style.animation =
            `
            twinkle
            ${2 + Math.random() * 4}s
            infinite
            alternate
            `;


        starContainer.appendChild(
            star
        );

    }

}


/* =========================================
   ADD TWINKLE ANIMATION
========================================= */

const starStyle =
    document.createElement("style");


starStyle.innerHTML = `

@keyframes twinkle {

    from {
        opacity: .15;
        transform: scale(.7);
    }

    to {
        opacity: 1;
        transform: scale(1.4);
    }

}

.story-card {

    opacity: 0;

    transform:
        translateY(50px);

}

.story-card.visible {

    opacity: 1;

    transform:
        translateY(0);

    transition:
        opacity 1s ease,
        transform 1s ease;

}

.no-photo {

    grid-column: 1 / -1;

    padding: 50px;

    opacity: .5;

}

`;


document.head.appendChild(
    starStyle
);


/* =========================================
   BIRTHDAY COUNTDOWN
========================================= */

function getNextBirthday() {

    const now =
        new Date();


    let year =
        now.getFullYear();


    let birthday =
        new Date(
            year,
            BIRTHDAY_MONTH - 1,
            BIRTHDAY_DAY,
            0,
            0,
            0
        );


    if (
        birthday <= now
    ) {

        birthday =
            new Date(
                year + 1,
                BIRTHDAY_MONTH - 1,
                BIRTHDAY_DAY,
                0,
                0,
                0
            );

    }


    return birthday;

}


function countdown() {

    const birthday =
        getNextBirthday();


    const now =
        new Date();


    const difference =
        birthday - now;


    if (
        difference <= 0
    ) {

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            difference /
            (1000 * 60 * 60)
        ) % 24;


    const minutes =
        Math.floor(
            difference /
            (1000 * 60)
        ) % 60;


    const seconds =
        Math.floor(
            difference /
            1000
        ) % 60;


    console.log(
        `🎂 ${days}d ${hours}h ${minutes}m ${seconds}s`
    );

}


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadPhotos();

        createStars();

        countdown();

        setInterval(
            countdown,
            1000
        );

    }
);

// =========================
// CINEMATIC LOADER
// =========================

setTimeout(() => {
    const loader = document.getElementById("loader");

    if (loader) {
        loader.classList.add("hide");
    }
}, 2600);