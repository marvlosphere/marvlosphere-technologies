# Adding a project to the Projects page

To list a new project on `/projects`, **add one new JSON file here** —
don't edit `app/projects/page.js`. The page automatically reads every
`.json` file in this folder at build time.

## File shape

Create `data/projects/<your-project-slug>.json`:

```json
{
  "name": "Your Project Name",
  "tag": "Short category label",
  "emoji": "🚀",
  "color": "#2563eb",
  "description": "One or two sentences describing what it does and why it matters.",
  "url": "https://your-deployed-app.vercel.app"
}
```

- `name` — the project's display title.
- `tag` — a short category shown above the title (e.g. "Simulation", "Analytics", "Design tool").
- `emoji` — a single emoji used as the card's icon.
- `color` — a hex color used to tint the icon background and the "Open app" link. Pick something that doesn't clash with the existing cards (currently used: `#2563eb`, `#0d9488`, `#d97706`, `#9333ea`).
- `description` — shown in the card body.
- `url` — the live, deployed URL the card links to.

## Why this structure

Multiple people/AI sessions add projects independently over time. If the
project list lived as a hardcoded array inside `page.js`, two contributors
editing that same file around the same time would conflict or silently
overwrite each other. Each contributor adding their own new file instead
means there's nothing to conflict on — git handles concurrent new files
fine.

## Filename

Use a short kebab-case slug matching your project (e.g.
`interactive-dashboard.json`). The filename itself isn't shown anywhere,
it just needs to be unique.
