# MOONDROP Channel Training

Open `index.html` directly in a desktop browser. The site uses only local files and can be shared as one complete folder.

## Channel access

The homepage remains visible before sign-in, while product categories and direct product-page URLs require the shared channel password. Access is verified locally in the browser and remembered for 12 hours.

This is a lightweight access gate for a static offline/GitHub Pages site. It discourages casual access but is not a substitute for server-side accounts or private hosting.

## Access statistics

Cloudflare Web Analytics runs only on the HTTPS production host `changer8844.github.io` under `/moondrop-channel-training/`. Local previews, offline files and other projects do not load its script. The shared `analytics.js` uses `spa: false`, so History API and hash changes within a loaded page do not create extra page views. Full page loads still count, including language changes on the homepage and legacy products that reload the page; CHU III changes language in place.

View visits, page views and product paths in Cloudflare's Web Analytics dashboard. Query parameters are not collected, so language and section breakdowns are not available. Visits are not a count of distinct people or completed courses.

Each entry page includes the shared loader once before `</body>`. New product pages should use `../../analytics.js?v=20261007-cloudflare`. Run `node scripts/qa-analytics.mjs` to check entry coverage and production-only loading.

## Add a product

1. Start from `templates/product-training/core-selling-points.template.html` and follow the template contract in `templates/product-training/README.md`.
2. Create `products/<product-slug>/index.html` with its local assets.
3. Add one product record to `catalog.js` with the matching `categoryId`.
4. Run `node scripts/audit-product-template.mjs` before setting `status` to `live`.

Only products marked `live` appear in the category showroom.
