# Khubi Brahmbhatt — Portfolio

A product design portfolio: five core pages (Work, About, Résumé, Contact) plus six case studies, two of which
embed fully interactive prototypes rebuilt in React (a Wells Fargo budgeting flow with live arithmetic, and an
internal code-search tool with mode switching and a generated dependency map).

Built with React, TypeScript, Vite, and React Router. No backend — a static single-page app.

## Development

```bash
npm install
npm run dev       # start the dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Structure

- `src/pages/` — Home (work index), About, Résumé, Contact
- `src/case-studies/` — the six case study pages, each built on the shared `CaseStudyLayout` component
- `src/components/` — shared layout and UI pieces (nav, case study shell, evidence chips, scaled screen mounts)
- `src/figma/` — screens materialized from the original Figma files (Cars24 Refer & Earn)
- `public/assets/` — images, logos, and reference screenshots

## Deployment

Static output from `npm run build` (the `dist/` folder) can be deployed to any static host — Vercel, Netlify,
GitHub Pages, etc.
