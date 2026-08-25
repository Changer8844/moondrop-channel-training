# MOONDROP Channel Training

Open `index.html` directly in a desktop browser. The site uses only local files and can be shared as one complete folder.

## Channel access

The homepage remains visible before sign-in, while product categories and direct product-page URLs require the shared channel password. Access is verified locally in the browser and remembered for 12 hours.

This is a lightweight access gate for a static offline/GitHub Pages site. It discourages casual access but is not a substitute for server-side accounts or private hosting.

## Add a product

1. Create `products/<product-slug>/index.html` with its local assets.
2. Add one product record to `catalog.js` with the matching `categoryId`.
3. Set `status` to `live` when the training page is ready.

Only products marked `live` appear in the category showroom.
