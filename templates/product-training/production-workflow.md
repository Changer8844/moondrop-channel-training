# Source-led product onboarding

Use the accepted local site as the baseline. Do not interpret a new model as permission to redesign or re-audit every old model.

## One intake, one content/asset map

Read all supplied slides including embedded review links. Inspect the original photographs once as a contact sheet, then view the selected files at useful detail. Record claim, source slide, bilingual story, image role and unresolved questions before layout. Reuse that map instead of repeatedly extracting the same deck.

Preserve originals. Prefer supplied dark photographs or actual alpha assets for black heroes. Check alpha bounds, not just canvas size. Do not generate a substitute product photograph. A package photo showing only some contents must say so; do not use a watermarked web image or invent a complete family photo. Isolated products need a complete-subject crop; campaign images may use intentional cropping.

## Reusable behavior, not per-product styling

- Use the shared positioning renderer, media-review CSS and natural-size feature-media CSS. Preserve their typography, image-side placement and content widths.
- Keep the same column origins for package and after-sales copy. Use available English text width; no authored breaks or decorative narrow caps.
- Category product cards use the shared `app.js` renderer: image, availability, product name with an arrow on its right, then product type. No separate visible training-action row, divider or reserved footer height. The entire card remains a link with a localized accessible action name; do not recreate this per product.
- New optional-hotspot pages declare `data-hotspot-policy="optional"` and keep **all** features in the list and progress sequence. `hotspot: false` suppresses only the physical marker; it must not filter the feature out of the training data. Guard marker creation, translation and focus handling. Such a story keeps the overview image and uses real rear/internal photos in its explanation. Legacy ST2's package record remains in its separate support board; do not change old routing as a side effect.
- Derive progress from story count. If all-story overview navigation is requested, one marker must open each story; internal/system functions need an explicit feature-guide label, not a fictional button. Use optional markers only when that behavior is agreed, never silently remove navigation the user expects.
- The grid is a background layer, not a photographic overlay. Keep it below the original photo and outside the moving photo rig. Assert stacking order and inspect zoom/pan views; opaque product photos are allowed to hide the background.
- Separate benefits from operations: first connection is an instruction within the relevant story, not a core advantage. Compare the complete source slide deck and relevant company-PDF page before freezing topics.
- Match evidence semantically. PEQ needs the manufacturer's actual tuning illustration/interface, not an arbitrary circuit board. Response and distortion need their respective source charts and measurement context. Gallery selection emphasizes original products and scenes; a pad detail or bare board may serve instruction without belonging in the gallery.
- For exactly two verified reviews, set `data-review-count="2"` on the shared review grid. Display two equal columns on desktop and one on mobile. Never fill missing cards with unrelated/Chinese material when English reviews are requested.
- Photo stages may follow the source aspect ratio to avoid artificial gutters. Preserve complete subjects in Overview and bound pan at every zoom and viewport.

## Targeted acceptance

Run the content/resource audit and template audit once, then `scripts/qa-product.mjs --product=<slug> --out=<private-output>`. The script uses the bundled Node/Playwright runtime and an isolated local-only access fixture. It never changes the site authentication. Use `--sections=reviews,comparison --boards-only` for impacted-board regression on older products. Add `--sizes=1024x768` to repeat one affected viewport. `--smoke` is diagnostic only, not full acceptance.

Inspect the resulting screenshots in both languages at 1920×1080, 1440×900, 1366×768 and 1024×768. Machine checks are not visual approval. After a correction, repeat only affected states unless shared structure changed. Explicitly check the category-to-product entry and browser Back; a direct product URL is not a discoverable catalogue entry.

## Tool and release preflight

Resolve bundled runtime paths once. Make one public read-only network health check if needed. HTTP 000 / connection failures are different from authentication errors, API rate limits, and a missing source URL. AnySearch 3.1.1 can hide transport stderr, so inspect a sanitized connection class before suggesting a key or reinstall. Do not print proxy values, keys or login artifacts.

Before a separately approved publish, check the Git helper executable exists and use the existing authorized account. Do not preserve references to disposable temporary executables in a new workflow. Report local QA, push, Pages build and live content checks separately. Local preview approval does not authorize a push.

## PUDDING retrospective

That cycle included new-product content, legacy shared-layout work, repeated image/background decisions, review selection and packaging replacements, broad overlapping QA passes, and a stale Git helper path. There was no phase timer, so no reliable per-phase duration or percentage can be claimed. Reduce repeated work by freezing evidence and asset roles first, making shared rules executable, reusing a parameterized QA driver and limiting rechecks to affected pages. Record stage timestamps in the private delivery log for the next comparison.
