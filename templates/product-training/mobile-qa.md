# Mobile acceptance record

Date: 2026-09-06. Scope: portal and MM3A, PILL, PUDDING, SPACE TRAVEL 2, RAYS; Chinese and English. The user has now authorized publishing the current mobile version to GitHub, followed by an attempt to inspect the public deployment. Publication is not evidence of visual acceptance.

## Latest public-browser verification · 2026-09-06–07

This section supersedes the older pending-browser gates below. The existing, user-authenticated public Chrome tab was used through the permitted browser controls. Local-file access remained denied; no alternate browser runner, auth fixture, loopback server or direct CDP workaround was used.

- Published UI: `87cd8834f2fac54dde07968436941c6ee5da998d`; GitHub Pages run `34062070806` completed successfully. The browser loaded `mobile-training.js?v=1.0.4` and `mobile-training.css?v=1.0.8`.
- 804 distinct current layout states passed after targeted corrections: 5 products × 2 languages × 12 states (hub, core overview, six stories, positioning, support, reviews, gallery) × 6 sizes = 720; portal plus six categories × 2 languages × 6 sizes = 84. Sizes: 320×568, 360×800, 390×844, 430×932, 844×390, 768×1024. The session recorded 912 measurements including retries; only the latest per route/language/story/size counted. Zero remaining measured failures or pending inline-image loads.
- Checks included horizontal and text overflow, instructional text size, broken images, separate image/detail flow, story-specific automatic focus and overview reset, hidden mobile hotspots, usable navigation targets, one bottom language control and status labels outside category photographs. Browser screenshots of representative hubs, stories, galleries, portal and menus were also visually inspected; the 804 count is a DOM/layout-state count, not 804 manually reviewed screenshots or physical-phone taps.
- RAYS: visual inspection caught a misnamed packaging photo in the wearing story/gallery. Replaced those two references with the existing 1460×877 real wearing photo, `assets/campaign/rays-wearing.jpg` (about 50 KB, used directly). Original files were not overwritten. Corrected bilingual story and full-size gallery image were loaded and inspected on the public site.
- Latest requests: removed the duplicate system-home action from the shared training menu; kept product-home plus five modules. Menu, Back, Home and Close use centered 26px SVG canvases in 44px circles. Lock icon increased from 14px to 30px in the unchanged 44px circle. Measured center offsets were zero. Verified the icon-only access label remains hidden at all mobile widths.
- Portal regression exposed two issues and they were fixed: desktop-specific category heading sizes overriding mobile sizing, and the access label spilling beyond its icon button at tablet widths. All six categories were rechecked in both languages at all six sizes after the fix.
- Actual actions exercised story progression, contents selection, overview reset, language changes and section navigation across all products. The PILL gallery original viewer was opened, zoomed to 2.5×, switched to English, advanced to the next original and closed with browser Back; language and gallery route were retained. RAYS corrected gallery original was opened. Home/category/product entry and the category Close button were operated. These do not replace the historical gesture/keyboard coverage below.
- Desktop spot regression at 1024×768, 1366×768, 1440×900 and 1920×1080 retained header language switching, hid the mobile footer and showed no horizontal overflow; MM3A's fully loaded desktop hub was visually inspected. Earlier broader desktop reports remain historical evidence, not newly rerun coverage.
- Source checks passed: shared icon checks, mobile navigation/handler ownership, 30-story focus and overview unit checks, and all-five-product template audit.
- Limit: no connected physical iPhone or Android was available. This is public Chrome responsive-browser verification, not a claim of current physical-device or fresh WebKit testing. The user's iPhone screenshots remain the evidence for the reported icon issues.

## Implemented

- Shared mobile CSS/runtime and small product adapters preserve training content and originals, except the evidence-backed RAYS wearing-photo reference/caption correction recorded above.
- Short portal/category screens, full-card product entry, image-above-text product reading, bottom previous/contents/next navigation.
- Mobile core images automatically focus on the selected story without hotspots or manual enlargement controls; Overview restores the product. Inline evidence and image carousels remain. The HD gallery retains its original-image viewer. Language-preserving navigation, optional local Continue reading and existing access control remain.
- 72 catalog/gallery WebP previews: 1,238,944 bytes compared with 160,341,371 source bytes. Original full-size files still open in the viewer. This comparison concerns the preview set, not a measured page-load time.

## Current navigation follow-up · 2026-09-06

This section supersedes the earlier access-blocked status below for the public site only. Local preview access remains denied; no bypass was used. The user logged into the permitted public GitHub Pages tab.

- Revision `29de1ba` was pushed, and Pages run `34053185921` completed successfully for that exact revision.
- Public Chrome mobile checks: 21 recorded navigation states across the portal and all five products, covering widths 320, 390 and 430 (not a full cross-product/width matrix). No page/button horizontal overflow; exactly one visible, non-inert language control in the fixed bottom bar; 48 observed Back/Home/Close SVG instances had zero horizontal/vertical center offset within their 44px circles.
- Visually inspected category Close/Home, the 320px RAYS hub/core bottom navigation, and the original-image viewer. All five products' English menus were opened, switched to Chinese from the footer, and closed; language and product routes remained correct.
- RAYS: category → product → core, language change within Contents, close, gallery opening, image next, gallery language change/close, and Home → system homepage were operated. At 1440×900 the original language button returned to the header, the mobile footer disappeared, and no horizontal overflow appeared.
- MM3A: positioning, support, reviews and gallery each retained one usable footer with no horizontal overflow at 390×844.
- Browser inspection found a low-contrast inactive language label in the light category overlay; the follow-up style raises it to `#aebbb3`. The gallery dialog's accessible label now also follows language changes. These two small follow-ups require their deployment/live spot check separately from the recorded `29de1ba` checks.
- Source tests passed: UI icons, mobile focus/overview/callback checks, mobile language node/handler ownership and desktop restoration, and the five-product template audit.
- These are focused regression checks for navigation, not fresh full visual acceptance of every story/section at every size or a physical-iPhone test.

## Earlier interaction revision · 2026-09-06

- User clarification: remove mobile dots/manual enlargement, but retain automatic zoom and positioning when a selling point is selected. Applied in the shared mobile runtime/styles; no product copy, original assets or desktop camera implementation changed.
- `node scripts/test-mobile-focus.mjs`: passed for all five products and thirty stories, with six simulated stage widths (320/360/390/430/768/844), 180 focus checks and 180 overview resets. Shared selection delegation and desktop accessibility-label restoration passed. Additional Chinese/English callback checks execute the actual mount/menu functions with element/event doubles: all six contents actions, next/previous boundaries, full-product restoration, core image click suppression, unsuppressed evidence-carousel controls, gallery routing, and restored desktop click/drag/labels passed. These are source-function unit checks with stubbed dimensions/events, not browser renders or real taps.
- `node scripts/audit-product-template.mjs`: passed for all five products. Browser QA scripts and the mobile contract now check no hotspots/manual core enlargement, automatic focus, overview reset, inline evidence and the retained gallery viewer.
- The channel-training skill's `audit_training_site.py <site-root> --product-slug mm3a` passed with zero errors/warnings. It scans the site's HTML/local references and checks the named product's structural tokens. Product content/view-data and tracked original assets have no Git diff; this source check does not prove their on-screen rendering.
- Fresh visual/touch verification is **not complete**: access to the user's local preview remains explicitly rejected by browser security policy, including the last attempt after they enabled full CDP. No alternative browser, raw CDP, local-server or other route was attempted around that denial. The prior results below are historical evidence for the earlier interactive version, not acceptance of this revision.

### Completion audit of the current revision

| Requirement | Current evidence | Gate |
| --- | --- | --- |
| Retain all content and approved imagery | No diff in product content/view-data or tracked original assets; local-reference audit passed | Source retention verified; rendered retention awaits fresh preview |
| Consistent mobile core interaction across five products and both languages | Shared runtime/styles; 30-story focus/overview unit checks and bilingual callback checks | Logic verified; real taps await fresh preview |
| Suitable layout, typography, cropping and whitespace at all agreed phone/tablet sizes | Current CSS contract plus historical, pre-revision browser reports | Not yet verified for this revision |
| Inline evidence, gallery, navigation, saved reading and language flows | New core/gallery callback checks; historical full-flow reports | Full current-browser flow remains unverified |
| Desktop behavior preserved | Mobile-scoped CSS, unchanged desktop camera functions, click/drag/label restoration checks | Source/logic verified; affected rendered pages await recheck |
| Visual acceptance after the interaction change | No new browser evidence is available after the interaction change; the user separately authorized publication before online inspection | Publication authorized; visual acceptance still pending |

## Previously verified locally · before the latest interaction revision

| Check | Evidence | Result |
| --- | --- | --- |
| Chromium mobile layouts, all products/languages/sections/stories at 320×568, 360×800, 390×844, 430×932, 844×390, 768×1024 | `/private/tmp/moondrop-mobile-final/report.json` | 756 states, no failures |
| WebKit mobile layout matrix at 320, 390 and 844 landscape | `/private/tmp/moondrop-mobile-webkit-final/report.json` | 378 states, no failures |
| Final compact landscape/hotspot recheck, Chromium, all products and stories at 320/390/844 | `/private/tmp/moondrop-core-layout-accepted/report.json` | 210 states, no failures |
| Final compact landscape/hotspot recheck, WebKit, same scope | `/private/tmp/moondrop-webkit-core-final-current/report.json` | 210 states, no failures |
| Final Chromium interactions | `/private/tmp/moondrop-mobile-interactions-final-current/report.json` | 32 cases, no failures |
| WebKit interactions | `/private/tmp/moondrop-webkit-interactions-accepted/report.json` | 32 cases, no failures |
| Keyboard activation, visible focus, modal focus trapping and restoration; all products/languages | `/private/tmp/moondrop-mobile-keyboard-final.json` | 10 cases, no failures |
| Desktop MM3A, full feature/media flows | `/private/tmp/moondrop-mobile-desktop-mm3a/report.json` | 133 states, no failures |
| Desktop PUDDING / SPACE TRAVEL 2 section layouts | `/private/tmp/moondrop-mobile-desktop-pudding/report.json`, `/private/tmp/moondrop-mobile-desktop-st2/report.json` | 40 states each, no failures |
| Portal categories and MM3A entry/return | `/private/tmp/moondrop-catalog-qa/report.json` | 30 states, no failures |

The prior layout reports tested content overflow, missing images, view stacking and the then-present hotspot touch-target collisions; screenshots were also inspected. Prior interaction cases exercised every story, proof/gallery original, contents, previous/next, section/category return, language and saved-reading restoration. Chromium also verified touch swipe/pan/pinch and inline vertical scrolling. WebKit checked taps, double tap and zoom controls, not physical iPhone gesture behavior. Those hotspot/core-viewer cases are superseded by the revised contract above.

The isolated test contexts provide a temporary access fixture only in browser memory; no credentials, auth bypass or authentication-source changes are shipped. Storage-refusal and reduced-height login keyboard layouts were checked. Chrome tests the local-file package with the network disabled; WebKit uses a read-only loopback server and blocks external requests because this runner rejects file URLs. This is not an offline-download/service-worker feature for the hosted website.

## Desktop baseline and remaining limits

- A broader 504-state desktop regression identified only five pre-existing truncated English rail labels at 1024px in PILL/RAYS, repeated across core states. A read-only comparison with Git HEAD showed identical strings and widths in baseline/current. This mobile task does not alter those existing desktop ellipsis rules.
- No physical iPhone or Android phone is connected. Device-specific Safari/Chrome behavior, browser chrome and real virtual keyboards remain unverified. Emulation and WebKit-engine tests must not be described as physical-device testing.
- Device availability was rechecked: enabled tools expose no phone-control target; USB inventory reports no iOS/Android device; `adb` and `idevice_id` are unavailable, and Xcode's `devicectl` is unavailable. These are recorded test limits, not a requirement for the user to perform the local-preview checks.
- Latest user direction: inspect and test the local preview they opened. The existing Chrome preview tab was found, but selecting it was explicitly rejected by the browser URL security policy. No alternate browser, proxy URL or direct browser-control workaround was used. Existing screenshots and completed test reports were reviewed read-only; this does not constitute a fresh interactive pass in that user-opened tab. That pass needs the browser access restriction resolved.
- The latest explicit publishing instruction authorizes GitHub publication, then a normal attempt to inspect the public deployment. If browser policy also rejects that public URL, stop that access attempt; do not bypass it. Commit, push, deployment status and browser verification must be reported separately.

## Reuse

Follow `mobile-layout.md` for new product adapters. Rebuild previews only when catalog/gallery source choices change. Perform a full first pass, then targeted checks for changed components; do not rerun unrelated product research or redraw original products.
