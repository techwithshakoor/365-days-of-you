# 365 Days With You

A romantic, premium anniversary surprise website built with HTML, CSS, and vanilla JavaScript.

## Run locally

Open `preview.html` in a browser, or run a small local server:

```powershell
cd 365-days-of-you
python -m http.server 8000
```

Then visit `http://localhost:8000/preview.html`.

For normal browsing, visit `http://localhost:8000/index.html`.

## Personalize

All personal text and asset paths are in `js/config.js`.

- **Recipient name:** change `recipientName`.
- **Page title:** change `title`.
- **Introduction:** change `introduction`.
- **Envelope message:** change `envelopeMessage`.
- **Anniversary text and number:** edit the `anniversary` section.
- **Little cards:** edit the objects in `littleThings`.
- **Personal letter:** replace the text in `letter`. Do not remove the template comments or HTML/CSS unless you know how.
- **Final message:** change `finalMessage`.
- **Music:** change `music`.

## Add the chat screenshot

Place the real screenshot at `images/chat-memory.jpg`. You can change its path, caption, and alt text in the `chatMemories` section of `js/config.js`. The screenshot is displayed unchanged, without recreating its messages.

## Add the picture of you both

Place the single photo at `images/us.jpg`. Its path, alt text, and caption can be changed in the `togetherPhoto` section of `js/config.js`. The requested default caption is already set.

## Add music

Put an MP3 in `music/background.mp3`. The music player is user-controlled and does not autoplay. Missing audio is reported by the player and preview page.

## Private preview

`preview.html` is a local review page that shows all configured messages, chat conversations, captions, and assets. It is a convenience tool only, not an admin area or login system. Do not add private text to the public version unless you are comfortable with anyone who receives the link seeing it.

## Publish with GitHub Pages

1. Create a GitHub repository.
2. Upload the contents of this folder, keeping `index.html` at the repository root.
3. On GitHub, open **Settings > Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the main branch and the root folder, then save.
6. Wait for GitHub to publish it and use the displayed Pages URL.

If you put the `365-days-of-you` folder inside another repository, choose that folder as the Pages publishing source instead, if supported by your repository setup.

## Update after publishing

1. Edit `js/config.js` or replace files locally.
2. Commit and push the changes to the selected branch.
3. GitHub Pages updates automatically after the new commit is built.

## Public privacy note

A GitHub Pages site is publicly accessible to anyone with its URL and may be indexed by search engines. It is not password-protected or truly private. Do not publish information you do not want shared publicly.
