# Mobile reading contract · v1

Applies to the portal and every live product in both languages. The same URLs, data, original photographs, claims, evidence, review links and gallery entries are retained. This is a layout and navigation layer, not a separate content edition.

## Shared implementation

- Load site-root `mobile-previews.js`, then `mobile-training.js` in the head. Load `mobile-training.css` after other styles. Include `viewport-fit=cover` without disabling browser zoom.
- Mobile applies at width ≤900 CSS pixels, or coarse-pointer landscape height ≤500px. Desktop beyond these conditions keeps the accepted layout.
- Each product supplies a small adapter to `MoondropMobile.mount`: current section/story/language, localized story/section labels, navigation actions, original master image, gallery originals and proof images. Do not duplicate product facts in the adapter.
- Notify the shared layer when section, language, feature or media changes. Focus animations are immediate on mobile; content should not wait for a desktop camera transition.

## Layout and image rules

- Header has persistent Back, product identity, Home and training menu. Home returns to the training system homepage; Back preserves the category/product hierarchy. The original language control moves to a fixed bottom bar on mobile and returns to its original header position on desktop. The footer remains reachable inside category, contents and gallery dialogs without duplicating language handlers.
- Center the Back, Home, Menu and Close SVGs inside their circular buttons using 26px canvases within unchanged 44px controls. The narrower lock drawing uses a 30px canvas for similar visual weight, with its text label visually hidden throughout the mobile breakpoint. Do not use font-baseline-aligned menu/close glyphs. Hide secondary decorative product marks below the hub introduction on mobile; keep desktop artwork unchanged.
- The training menu retains the product training home plus five modules. Do not add a duplicate training-system home destination: that remains in the header Home control.
- Portal uses a short introduction and two-column category cards. The category has a short title/photo header and full-width product cards, arrow beside name, no redundant action row.
- Category-card photographs, availability labels and copy occupy separate normal-flow rows on mobile. Availability belongs below the image, never over the product; retain the same title alignment for categories without live training.
- Suppress the desktop category-card hover inset border on mobile so tapping does not leave a yellow selection box. Keep `:focus-visible` for keyboard access. The mobile gallery owns its viewer; hide the inactive desktop `.lightbox` entirely on mobile, including its controls.
- Use the shared `icons.css` SVG arrow for category/product entries, topic cards and outbound review labels. Do not use a Unicode arrow or a text/emoji variation selector: physical iPhones can substitute a colored emoji. Keep decorative icons `aria-hidden` and the whole card clickable.
- Product home shows a complete subject image, title, introduction, and five full-width topic cards. Do not crop an isolated product just to fill a phone screen.
- Core starts on the complete product photograph and a readable text list, without hotspots. Selecting a story through the list, contents or Previous/Next automatically zooms and positions the photograph at that story's existing focus preset, above the complete explanation. No right-side/fullscreen explanation panel and no nested article scroll.
- Use the existing single original master/composite. MM3A retains its front/rear composite. Grid lines remain behind the photograph. Do not create mobile dots, numbered markers or leader lines. Removing hotspots must not remove automatic focus or any story's content.
- The Full product / Overview action resets the photograph to its complete view. The restore action below the image appears only while a story is selected. Desktop hotspots, labels and dragging remain unchanged.
- Fixed bottom navigation offers Previous / Contents / Next beside the language control. First previous returns to Overview; final next returns to the training menu. Other pages retain the language control alone. Reserve bottom space on pages and dialogs so the last paragraph remains reachable.
- Positioning and reviews stack their complete hero image and title, then full-width cards. Package flows image → contents → warranty → service. Gallery uses two columns, one below 360px.
- Body text is 16px with approximately 1.6 line height; normal auxiliary copy is at least 13px. Feature titles are 28px, hub titles 32–40px. Compact brand/category tags may be smaller; no tiny instructional or evidence text.

## Touch, history and saved reading

- Swiping vertically over an inline image scrolls the page. Core photographs and evidence images have no manual drag, enlarge button or tap-to-fullscreen action; browser accessibility zoom is not disabled. Evidence images and their carousel remain fully readable inline.
- The HD gallery retains its original-image viewer: zoom/reset, pan when zoomed, and previous/next. At fit scale horizontal swipe switches images; at zoom it pans. Close or browser Back returns to the unchanged gallery and scroll position.
- The contents sheet includes Overview and every story. Modal background is inert; focus is trapped and restored. Escape/Back closes one overlay rather than changing the underlying training section.
- Save `{section, feature, language, scrollY}` locally under `moondropTrainingReading:v1`. Homepage and product home offer an explicit Continue reading action. Do not force restore, mark lessons complete, or send progress elsewhere. Blocked storage must not prevent reading.
- Existing access control remains unchanged. Never add a test credential or bypass to site code. QA uses isolated browser fixtures only.

## Performance and acceptance

- `node scripts/test-mobile-focus.mjs` runs browser-free checks of the existing product camera functions, selection delegation and mobile/desktop attribute restoration. It does not replace rendered or touch-device QA.
- `build-mobile-previews.mjs` makes ≤800px WebP previews from original gallery/catalog images. The site-root map uses root-relative keys. Original files are unchanged; full-size viewers must not point at thumbnails.
- Run `qa-mobile.mjs --full` at 320×568, 360×800, 390×844, 430×932, 844×390 and 768×1024 in both languages. Inspect actual screenshots, not only overflow assertions.
- Run `qa-mobile-interactions.mjs` for every product/language: every story-list selection, automatic zoom/position and overview reset, inline evidence/carousel, previous/next/contents, gallery viewer gestures, section/home/category return, language switching and reading restore. Verify that no mobile hotspots or core enlargement actions remain. Use actual screen coordinates for sticky header touch tests: Playwright locator scrolling can otherwise alter the very reading position being tested.
- Browser QA requires permitted access. The existing WebKit runner uses a loopback-only read-only server for its file-navigation limitation; Chrome tests the offline local-file package. Neither is an alternate route around an explicit browser URL/security denial: stop browser testing and report that gate as unverified when denied.
- Check keyboard/auth-dialog reduced-height layout and storage refusal. Cross-engine simulation is not a claim of testing physical iPhones or Android phones. Record device availability and any unverified device-specific behavior explicitly.
- Run `qa-mobile-keyboard.mjs` for Enter/Space activation, visible focus, modal Tab cycling and Escape restoration. Exclude hidden previous/next controls when testing a single-image viewer.
- Regress desktop at 1920, 1440, 1366 and 1024px. Verify content-data files and source-image assets are unchanged. Local preview, push, deployment and live verification remain separate milestones.
