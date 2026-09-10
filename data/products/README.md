# Adding a product to the Products page

To list a new product on `/products`, **add one new JSON file here** —
don't edit `app/products/page.js`. The page automatically reads every
`.json` file in this folder at build time, sorted by `order`.

## File shape

Create `data/products/<your-product-slug>.json`:

```json
{
  "order": 4,
  "name": "Your Product Name",
  "badge": "🎯 Short Category Badge",
  "tagline": "A product of Marvlosphere Technologies",
  "description": "One paragraph describing what it does and who it's for.",
  "url": "https://your-product.com",
  "ctaLabel": "Visit Your Product",
  "chips": ["Short tag one", "Short tag two", "Short tag three"],
  "features": [
    { "title": "Feature name", "body": "One or two sentences on what it does and why it matters." }
  ],
  "audience": [
    { "label": "Who it's for", "desc": "One sentence on the value to them." }
  ]
}
```

- `order` — controls display order (lower = higher up the page). Pick a
  number higher than whatever's already in this folder.
- `badge` — small pill shown above the product name (emoji + short label).
- `chips` — optional row of small tags under the description.
- `features` — at least one; rendered as a checklist next to the hero panel.
- `audience` — optional; if present, renders a 3-column "who it serves"
  row below the card. Omit entirely if you don't have this content yet.

This is a real product listing, distinct from `/projects` (which is for
academic/technical prototypes, not commercial products) — only add
something here if it's a live, deployed product.

## Why this structure

Multiple people/AI sessions add products independently over time. If the
product list lived as hardcoded JSX inside `page.js`, two contributors
editing that same file around the same time would conflict or silently
overwrite each other. Each contributor adding their own new file instead
means there's nothing to conflict on — git handles concurrent new files
fine.
