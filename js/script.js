(() => {
    "use strict";

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const qs = (selector, parent = document) => parent.querySelector(selector);

    function setText(id, text) {
        const element = qs(id);
        if (element) element.textContent = text;
    }

    function buildStars() {
        const stars = qs("#stars");
        const fragment = document.createDocumentFragment();
        const count = window.innerWidth < 700 ? 35 : 70;
        for (let i = 0; i < count; i += 1) {
            const star = document.createElement("i");
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 7}s`;
            star.style.animationDuration = `${3 + Math.random() * 5}s`;
            fragment.appendChild(star);
        }
        stars.appendChild(fragment);
    }

    function applyConfig() {
        document.title = `${config.title} ✨`;
        setText("#siteTitle", `${config.title} ✨`);
        setText("#introText", config.introduction);
        setText("#envelopeText", config.envelopeMessage);
        setText("#anniversaryHeading", config.anniversary.heading);
        setText("#anniversaryMessage", config.anniversary.message);
        setText("#finalMessage", config.finalMessage);
        setText("#letterSignature", `— ${config.recipientName}`);
        setText("#musicLabel", config.musicLabel);
        buildChatMemories();
        buildTogetherPhoto();
        buildLittleThings();
    }

    function buildTogetherPhoto() {
        const photo = qs("#togetherPhotoImage");
        const caption = qs("#togetherPhotoCaption");
        photo.src = config.togetherPhoto.image;
        photo.alt = config.togetherPhoto.alt;
        caption.textContent = config.togetherPhoto.caption;
        photo.addEventListener("error", () => {
            photo.classList.add("photo-missing");
            photo.removeAttribute("src");
            photo.alt = "The photo will appear here when images/us.jpg is added";
        }, { once: true });
    }

    function buildChatMemories() {
        const container = qs("#chatMemories");
        container.innerHTML = "";
        const card = document.createElement("figure");
        card.className = "chat-memory";
        card.innerHTML = `
            <div class="chat-screenshot-frame">
                <img id="chatScreenshot" alt="">
            </div>
            <figcaption class="chat-caption"></figcaption>`;
        const image = qs("#chatScreenshot", card);
        image.src = config.chatMemories.image;
        image.alt = config.chatMemories.alt;
        qs("figcaption", card).textContent = config.chatMemories.caption;
        container.appendChild(card);
    }

    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
        })[char]);
    }

    function buildLittleThings() {
        const grid = qs("#littleThingsGrid");
        grid.innerHTML = "";
        config.littleThings.forEach((thing, index) => {
            const card = document.createElement("button");
            card.className = "thing-card";
            card.type = "button";
            card.style.setProperty("--delay", `${index * 80}ms`);
            card.setAttribute("aria-expanded", "false");
            card.innerHTML = `
                <span class="thing-icon">${escapeHtml(thing.icon)}</span>
                <span class="thing-front">
                    <strong>${escapeHtml(thing.title)}</strong>
                    <small>${escapeHtml(thing.preview)}</small>
                </span>
                <span class="thing-message">${escapeHtml(thing.message)}</span>
                <span class="card-plus">+</span>`;
            card.addEventListener("click", () => {
                const open = card.classList.toggle("revealed");
                card.setAttribute("aria-expanded", String(open));
            });
            grid.appendChild(card);
        });
    }

    function navigateTo(id) {
        const target = qs(`#${id}`);
        if (!target) return;
        target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
        target.classList.add("active");
        if (id === "anniversary") animateNumber();
        if (id === "letter") typeLetter();
        if (id === "finale") bloomGarden();
    }

    function animateNumber() {
        const target = qs("#daysNumber");
        if (target.dataset.done === "true") return;
        target.dataset.done = "true";
        const end = Number(config.anniversary.number) || 365;
        if (reducedMotion) {
            target.textContent = end;
            return;
        }
        let current = 0;
        const steps = 45;
        const timer = window.setInterval(() => {
            current += end / steps;
            if (current >= end) {
                target.textContent = end;
                window.clearInterval(timer);
            } else {
                target.textContent = Math.round(current);
            }
        }, 28);
    }

    let letterStarted = false;
    function typeLetter() {
        const output = qs("#personalLetter");
        if (letterStarted) return;
        letterStarted = true;
        const text = config.letter;
        if (reducedMotion) {
            output.textContent = text;
            return;
        }
        output.textContent = "";
        let index = 0;
        const timer = window.setInterval(() => {
            output.textContent += text[index] ?? "";
            index += 1;
            output.style.whiteSpace = "pre-wrap";
            if (index > text.length) window.clearInterval(timer);
        }, 22);
    }

    function bloomGarden() {
        const garden = qs("#garden");
        if (garden.dataset.bloomed === "true") return;
        garden.dataset.bloomed = "true";
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 11; i += 1) {
            const flower = document.createElement("div");
            flower.className = "flower";
            flower.style.left = `${4 + i * 9.1}%`;
            flower.style.animationDelay = `${i * 0.12}s`;
            flower.style.setProperty("--scale", `${0.65 + Math.random() * 0.55}`);
            flower.innerHTML = '<span></span><i></i><b></b><em></em>';
            fragment.appendChild(flower);
        }
        garden.appendChild(fragment);
    }

    function setupEnvelope() {
        const envelope = qs("#envelopeButton");
        envelope.addEventListener("click", () => {
            envelope.classList.add("opened");
            setText("#envelopeHint", "A little message, just for you");
            qs("#envelopeContinue").classList.remove("hidden");
            envelope.setAttribute("aria-expanded", "true");
        });
    }

    function setupMusic() {
        const audio = qs("#backgroundMusic");
        const toggle = qs("#musicToggle");
        const status = qs("#musicStatus");
        const volume = qs("#volumeControl");
        audio.src = config.music;
        audio.volume = Number(volume.value);

        audio.addEventListener("canplay", () => {
            toggle.disabled = false;
            status.textContent = "Ready to play";
        });
        audio.addEventListener("error", () => {
            toggle.disabled = true;
            status.textContent = "Add music/background.mp3 to enable music";
        });
        audio.addEventListener("play", () => {
            qs("#musicIcon").textContent = "Ⅱ";
            toggle.setAttribute("aria-label", "Pause background music");
            status.textContent = "Playing";
        });
        audio.addEventListener("pause", () => {
            qs("#musicIcon").textContent = "▶";
            toggle.setAttribute("aria-label", "Play background music");
            status.textContent = "Paused";
        });

        toggle.addEventListener("click", async () => {
            try {
                if (audio.paused) await audio.play();
                else audio.pause();
            } catch {
                status.textContent = "Music could not be played";
            }
        });
        volume.addEventListener("input", () => { audio.volume = Number(volume.value); });
    }

    document.addEventListener("click", event => {
        const button = event.target.closest("[data-go]");
        if (button) navigateTo(button.dataset.go);
    });
    qs("#replayButton").addEventListener("click", () => navigateTo("welcome"));

    applyConfig();
    buildStars();
    setupEnvelope();
    setupMusic();
})();
