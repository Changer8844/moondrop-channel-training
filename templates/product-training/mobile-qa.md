# Mobile local acceptance record

Date: 2026-09-06. Scope: portal and MM3A, PILL, PUDDING, SPACE TRAVEL 2, RAYS; Chinese and English. The user has now authorized publishing the current mobile version to GitHub, followed by an attempt to inspect the public deployment. Publication is not evidence of visual acceptance.

## Implemented

- Shared mobile CSS/runtime and small product adapters; existing product content and original image files are unchanged.
- Short portal/category screens, full-card product entry, image-above-text product reading, bottom previous/contents/next navigation.
- Mobile core images automatically focus on the selected story without hotspots or manual enlargement controls; Overview restores the product. Inline evidence and image carousels remain. The HD gallery retains its original-image viewer. Language-preserving navigation, optional local Continue reading and existing access control remain.
- 72 catalog/gallery WebP previews: 1,238,944 bytes compared with 160,341,371 source bytes. Original full-size files still open in the viewer. This comparison concerns the preview set, not a measured page-load time.

## Latest interaction revision · 2026-09-06

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
