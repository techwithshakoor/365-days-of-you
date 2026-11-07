(() => {
    "use strict";

    const qs = selector => document.querySelector(selector);

    qs("#previewRecipient").textContent = config.recipientName;
    qs("#previewTitle").textContent = config.title;
    qs("#previewIntroduction").textContent = config.introduction;
    qs("#previewEnvelope").textContent = config.envelopeMessage;
    qs("#previewAnniversary").textContent = config.anniversary.message;
    qs("#previewLetter").textContent = config.letter;
    qs("#previewFinal").textContent = config.finalMessage;

    const fileStatus = qs("#fileStatus");
    const chats = qs("#previewChats");
    chats.innerHTML = `
        <figure class="preview-chat-memory">
            <img src="${escapeHtml(config.chatMemories.image)}" alt="${escapeHtml(config.chatMemories.alt)}">
            <figcaption>${escapeHtml(config.chatMemories.caption)}</figcaption>
        </figure>
        <small>${escapeHtml(config.chatMemories.image)}</small>`;
    checkMusic();

    const togetherPhoto = qs("#previewTogetherPhoto");
    togetherPhoto.innerHTML = `
        <img id="previewUsImage" alt="${escapeHtml(config.togetherPhoto.alt)}">
        <p>${escapeHtml(config.togetherPhoto.caption)}</p>
        <small>${escapeHtml(config.togetherPhoto.image)}</small>`;
    const previewImage = qs("#previewUsImage");
    previewImage.addEventListener("error", () => {
        previewImage.alt = "images/us.jpg is not available yet";
    }, { once: true });
    previewImage.src = config.togetherPhoto.image;

    const things = qs("#previewThings");
    config.littleThings.forEach(thing => {
        const card = document.createElement("article");
        card.innerHTML = `<strong>${escapeHtml(thing.title)}</strong><span>${escapeHtml(thing.message)}</span>`;
        things.appendChild(card);
    });

    async function assetExists(path) {
        try {
            const response = await fetch(path, { method: "HEAD" });
            return response.ok;
        } catch {
            return false;
        }
    }

    async function checkMusic() {
        const exists = await assetExists(config.music);
        const row = document.createElement("p");
        row.innerHTML = `<span class="${exists ? "ok" : "missing"}">${exists ? "Found" : "Missing"}</span> <code>${escapeHtml(config.music)}</code>`;
        fileStatus.appendChild(row);
    }

    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
        })[char]);
    }

})();
