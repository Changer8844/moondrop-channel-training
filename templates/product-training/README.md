# MOONDROP Product Training Page Template

SPACE TRAVEL 2 is the visual and interaction reference. Every product core-selling-points page must preserve the same training flow while changing only product content, imagery, hotspot coordinates, crop values, and bilingual copy.

## Required initial state

- Enter on Overview, never on the first feature.
- Keep the desktop view in three columns: feature list, complete product view, and right-side guidance.
- Highlight the Overview button.
- Show the complete product and all six hotspots.
- Keep the thin progress indicator decorative and on its first step.
- Open a feature only after the user selects a hotspot or a feature-list item.

## Required focused state

- Keep the left feature list available for direct switching.
- A hotspot click must always win over drag capture, so another hotspot can refocus the product immediately after zooming.
- Keep the center image draggable within its crop bounds.
- Replace the right-side guidance with the selected feature detail.
- The detail close button returns to the product training menu, matching SPACE TRAVEL 2.
- The Overview button restores the complete product, all hotspots, the right guidance, and the first progress step.

## Fixed visual measurements

- Desktop columns: `minmax(236px, 272px) minmax(520px, 1fr) minmax(332px, 390px)`.
- Hotspots: `36px × 36px`; labels begin `38px` from the hotspot center.
- Composed feature stages retain `clamp(190px, 20vh, 240px)`. Original image/poster slides instead load shared `feature-media.css`: full column width and natural height. Never squeeze a portrait graphic into that fixed landscape frame.
- Package and after-sales desktop columns: both the package row and warranty row use `minmax(0, 1.05fr) minmax(340px, .95fr)`. This keeps the package image restrained and aligns the upper package-copy column with the lower after-sales-copy column.
- English hub-card wrapping: section buttons use one unrestricted `minmax(0, 1fr)` text column, with the arrow absolutely positioned so it does not steal line width. Titles and subtitles must use the full card width, normal word breaking, and `text-wrap: pretty`; do not add `ch`-based caps that create isolated final words when space remains.
- Empty-state wrapping: the right-side guidance heading and body use the full available panel width with normal word breaking and `text-wrap: pretty`. Do not author `<br>` tags in empty-state copy or add `ch`/pixel caps that force early wrapping while horizontal space remains.
- Section-board wrapping: short English headings, labels, and one-sentence instructions should use their available column before wrapping. Do not add a narrow `ch`/pixel cap merely for decoration; reserve readable line-length caps for genuinely long paragraphs.
- Media-review boards use `media-reviews.template.html` and the shared `media-reviews.css`; product pages must link that stylesheet after their page-level styles and must not redefine `.review-intro`, `.review-grid`, or review-card typography locally. This keeps the hero at `220px`, gives copy `60%` of the row, reserves `42%` for a complete right-aligned product image, and applies one font size, weight, tracking, line height, and natural wrapping rule to every product. Only the approved product image and its crop variables may vary.
- Media-review hero copy is exactly `真实评测，一键直达` / `Real reviews, one click away`. It uses available horizontal space before wrapping; never insert `<br>` or balance it into an early second line.
- Review-card titles keep normal word boundaries, slightly compact tracking, and `text-wrap: pretty`; do not balance a title into two lines when it can fit naturally on one.
- Photographic review heroes use shared `data-review-image-mode="photo"` to fit the actual photo box and soften its edges into black. When enlarging a right-aligned product, anchor the transform at `right center` (or a verified vertical focal point), not at the center of the entire wide frame. Confirm both product ends remain visible.
- Transparent source padding is not product width. The `cutout` mode preserves the source file and permits a verified `--review-product-shift` to align the visible subject. SPACE TRAVEL 2 has alpha bounds `(1069,707)-(2797,1861)` in a 3840×2472 image; at 1.8×, compensate its 27.1615% right padding with `calc(48.891% - 16px)`. Verify that visible bounds stay inside the frame at every viewport.
- Product-specific copy may change, but these measurements and the Overview-first interaction may not.

## Product positioning: shared runtime template

All product pages load `positioning.js` and `positioning.css` after local page styles. Call `MoondropPositioning.render` with localized comparison data and approved imagery. Never copy the renderer or redefine its layout in a product page.

- Header: only `产品定位` / `Product Positioning`, with the same 68px header and 1440px content boundary.
- Hero: black canvas, 230px minimum height, common bilingual headline and one-line guidance. Copy uses 68% of the inner width with natural wrapping; title size, weight and spacing come from the shared CSS.
- Imagery: complete product on the right, blended into black. Only a source image, scale and transform origin may vary by product. A lifestyle campaign may use the explicit campaign crop mode; never apply that crop to an isolated product image without checking the complete product.
- Cards: two equal desktop columns, 10px gap, 24px padding; shared title, customer prompt, answer and proof styles. Prompts/proof render only when supplied by the product data. Keep every existing comparison, including an odd final card; do not invent product claims to fill a slot.
- Existing product-specific positioning summaries remain in content data; the visible introductory layout uses the shared sales-comparison heading. PILL/RAYS comparison descriptions are preserved unchanged.
- QA: compare computed typography and grid measurements for all four products in both languages at 1920, 1440, 1366 and 1024px; inspect actual hero screenshots for clipping and background seams. Static audit alone is not acceptance.

## Required structure

Use the shared `data-*` markers from `core-selling-points.template.html`. Run the audit after every product-page change:

```sh
node scripts/audit-product-template.mjs
```

The audit checks every live product page and fails when a page auto-opens a feature, lacks the three-column template markers, omits Overview, the product stage, the guidance/detail panel, or the progress indicator, or locally drifts from the shared media-review board.

## Frontline copy rules

### Image and interaction acceptance

- Use supplied original photographs or official source graphics. Do not regenerate product photography; change only placement, scale, or layout crop. Keep the source file intact. If the user explicitly requests a background edit, save a separate derivative, document the source and edit, and inspect product details before using it; original gallery/download assets remain unchanged.
- Category-card photographs fill the full frame without added side strips (`cover` with a verified product-safe crop). Product overview canvases must match the photograph edge colour; clamp focused pan/drag to image bounds and check again after resizing.
- Dark homepage and review-hero imagery must blend into the surrounding black canvas without a grey/white rectangle. Check full product visibility and background seams at all four desktop sizes, not only the source image.
- On every feature change, reset the actual `.panel-content` scroll container to `scrollTop = 0` after revealing it, so the heading and close control remain discoverable. The outer `.detail-panel` is not the scrolling element. Test this after scrolling a previous feature to its image.
- Package and warranty rows use the same column origin: no outer padding or gap on `.support-copy--warranty`; apply matching padding inside `.support-warranty-summary` and `.support-exclusions` instead.
- Tall official graphics display at full column width with natural height in the existing detail scroll area, and remain clickable for full-size viewing. Check every language and carousel frame for letterboxing, distortion and cropped text. A small inline preview is not sufficient reading access.
- Audit draft products with `node scripts/audit-product-template.mjs --product=pudding`. The audit reads the local JavaScript files referenced by each page, not only `content.js`.

- Visible copy must directly help a salesperson explain a product fact, customer benefit, demonstration, comparison, package item, warranty period, or after-sales answer.
- Never turn the production brief into page copy. Do not explain how the page is organized, how many dimensions it covers, what the training system is trying to achieve, or how a visual helps staff complete the page.
- Remove duplicate generic headings before adding hierarchy. A support page should name the package contents and warranty facts instead of repeating abstract phrases such as “what the customer receives.”
- Keep every claim source-led and product-specific in both Chinese and English.
- The audit scans each live product page and its local JavaScript data for known production-note phrases.
