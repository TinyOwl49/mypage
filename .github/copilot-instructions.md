# Copilot Instructions for mypage

## Overview

This is a static homepage built with **SvelteKit 5**, **TypeScript**, **Tailwind CSS v4**, and **mdsvex** for Markdown-based blogging. It deploys to GitHub Pages automatically via GitHub Actions.

## Commands

### Development
```bash
pnpm run dev                 # Start dev server (hot reload)
pnpm run check               # Type check entire project
pnpm run check:watch         # Type check in watch mode
```

### Building & Previewing
```bash
pnpm run build               # Production build → build/ directory
pnpm run preview             # Preview production build locally
```

**Note:** No test suite is configured. Focus on type checking and manual testing.

## Architecture

### Core Structure

- **`src/routes/`** - SvelteKit pages and layouts
  - `+layout.ts` - Global config: `prerender = true`, `trailingSlash = 'always'`
  - `blog/[slug]/` - Dynamic blog post routes powered by article.ts
- **`src/lib/`** - Shared utilities and components
  - `article.ts` - Functions for loading articles: `getArticleBySlug()`, `getAllArticles()`
  - `components/` - Reusable Svelte components
  - `assets/`, `date.ts`, `index.ts` - Helper modules
- **`articles/`** - Markdown source files for blog posts
  - Articles use `.md` extension with frontmatter metadata
- **`static/`** - Static assets (images, favicon, etc.)

### Markdown & Code Highlighting

- **Parser:** mdsvex with extensions `.svx`, `.md`
- **Highlighter:** Shiki with `github-dark-dimmed` theme
- **Math:** remark-math + rehype-katex (KaTeX for LaTeX rendering)
- **Note:** Custom escape plugin handles Svelte `{}` syntax conflicts in markdown (see `svelte.config.js`)

### Deployment

- **Target:** GitHub Pages
- **Trigger:** Push to `main` branch
- **Workflow:** `.github/workflows/deploy.yml` runs `pnpm install && pnpm run build`
- **Output:** Contents of `build/` directory deployed automatically

## Key Conventions

### Article Metadata Structure

Articles in `articles/*.md` must include frontmatter metadata (parsed by mdsvex):

```yaml
---
title: "Post Title"
description: "Brief description"
date: "2026-05-01"
tags: ["tag1", "tag2"]
thumbnail: "/image-path.jpg"
---
```

The `getArticleBySlug()` and `getAllArticles()` functions expect these fields. The `Article` type in `lib/article.ts` defines the contract.

### Dynamic Article Loading

- Articles are loaded using `import.meta.glob()` in `article.ts`
- File names (without `.md`) become the article slug for URL routing
- Files starting with `_` are excluded from `getAllArticles()`
- Articles are sorted by date (newest first)

### TypeScript & Type Safety

- Strict mode enabled (`strict: true` in `tsconfig.json`)
- All components should use TypeScript
- Use `any` sparingly; prefer proper typing (see `Article` type for the pattern)

### Styling

- Tailwind CSS v4 with `@tailwindcss/typography` plugin
- Configure via `tailwind.config.js` (auto-generated)
- Use Tailwind utilities; avoid writing custom CSS where possible

### SvelteKit Runes Mode

- Runes mode is enforced in `svelte.config.js` (forces `$state`, `$props`, etc.)
- Modern Svelte 5 syntax required; legacy `export let` won't work

## File Locations & Patterns

| Purpose | Location | Pattern |
|---------|----------|---------|
| Routes | `src/routes/**/*.svelte` | SvelteKit page files |
| Components | `src/lib/components/` | `*.svelte` files |
| Utilities | `src/lib/*.ts` | TypeScript modules |
| Blog articles | `articles/` | `*.md` files with frontmatter |
| Static files | `static/` | Images, favicon, etc. |
| Workflows | `.github/workflows/` | GitHub Actions YAML |

## Common Tasks

### Add a New Blog Post

1. Create `articles/my-post.md` with metadata and content
2. Restart dev server or let hot reload pick it up
3. Access at `/blog/my-post/`

### Add a Reusable Component

1. Create `src/lib/components/MyComponent.svelte`
2. Import and use in routes: `import MyComponent from '$lib/components/MyComponent.svelte'`

### Verify Type Safety

```bash
pnpm run check               # One-time check
pnpm run check:watch        # Continuous checking during development
```

### Test Blog Rendering Locally

```bash
pnpm run build
pnpm run preview            # Browse to http://localhost:4173
```

### Add Table of Contents to Articles

Articles automatically display a Table of Contents (TOC) if they have h2 or h3 headings. The `TableOfContents` component:
- Automatically extracts all h2 and h3 headings from the article
- Generates smooth-scrolling links to each heading
- Displays as a styled box at the top of article content
- Handles ID generation for headings automatically on the client side

The component is already included in the blog post layout (`src/routes/blog/[slug]/+page.svelte`), so no additional setup is needed.

## Important Notes

- **No test framework:** Rely on `pnpm run check` for safety
- **Global prerendering:** All routes are prerendered to static HTML (no SSR)
- **Trailing slashes:** URLs end with `/` (e.g., `/blog/my-post/`)
- **pnpm required:** Use pnpm, not npm or yarn (see `.npmrc`)
- **TableOfContents:** Client-side component that works with mdsvex-rendered markdown headings
