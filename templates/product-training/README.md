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
- Feature media stage: `clamp(190px, 20vh, 240px)`.
- Product-specific copy may change, but these measurements and the Overview-first interaction may not.

## Required structure

Use the shared `data-*` markers from `core-selling-points.template.html`. Run the audit after every product-page change:

```sh
node scripts/audit-product-template.mjs
```

The audit checks every live product page and fails when a page auto-opens a feature, lacks the three-column template markers, or omits Overview, the product stage, the guidance/detail panel, or the progress indicator.
