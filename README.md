# MOONDROP Channel Training

Open `index.html` directly in a desktop browser. The site uses only local files and can be shared as one complete folder.

## Channel access

The homepage remains visible before sign-in, while product categories and direct product-page URLs require the shared channel password. Access is verified locally in the browser and remembered for 12 hours.

This is a lightweight access gate for a static offline/GitHub Pages site. It discourages casual access but is not a substitute for server-side accounts or private hosting.

## Add a product

1. Start from `templates/product-training/core-selling-points.template.html` and follow the template contract in `templates/product-training/README.md`.
2. Create `products/<product-slug>/index.html` with its local assets.
3. Add one product record to `catalog.js` with the matching `categoryId`.
4. Run `node scripts/audit-product-template.mjs` before setting `status` to `live`.

Only products marked `live` appear in the category showroom.
