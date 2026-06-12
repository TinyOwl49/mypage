# Project Instructions

## Overview
このプロジェクトは、SvelteKit を使用して GitHub Pages で公開するための静的なホームページです。

## Tech Stack
- **Framework**: SvelteKit 5
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4)
- **Package Manager**: pnpm
- **Adapter**: `@sveltejs/adapter-static`
- **Markdown Parser**: mdsvex

## Markdown Parser Configuration
- **Library**: `mdsvex` (v0.12.7)
- **Extensions**: `.svx`, `.md`
- **Highlighter**: `shiki` (using `github-dark-dimmed` theme)
- **Math**: `remark-math@3.0.0` & `rehype-katex-svelte` mdsvexはremark-mathのv3以前を使用しているため、v3.0.0を指定しています。
- **Current Setup**: `svelte.config.js` にて `shiki` を使用したカスタムハイライターと、数学記号表示のための KaTeX プラグインが設定されています。Svelte の構文衝突（`{}`）を避けるためのカスタムエスケーププラグインを導入しています。
- **File Location**: `articles/` ディレクトリ内の Markdown ファイルが `src/routes/blog/[slug]/` などで動的に読み込まれる構成です。

## Development Workflow
- **Dependencies**: 全てのパッケージ管理には `pnpm` を使用してください。
- **Build**: `pnpm run build` を実行すると `build/` ディレクトリに静的ファイルが出力されます。
- **Lint/Check**: `pnpm run check` で型チェックを実行してください。

## Deployment
- **Target**: GitHub Pages
- **Automation**: GitHub Actions (`.github/workflows/deploy.yml`) により、`main` ブランチへのプッシュで自動デプロイされます。
- **Configuration**:
  - 全ページをプリレンダリングするため、`src/routes/+layout.ts` で `export const prerender = true` が設定されています。
  - GitHub Pages の仕様に合わせ、`trailingSlash = 'always'` が設定されています。

## Directory Structure
- `src/routes/`: ページとルーティング。
- `src/lib/`: コンポーネントやユーティリティ関数。
- `static/`: 画像や favicon などの静的アセット。
- `log/`: 実装記録や Todo 管理。
- `articles`: 記事のmarkdownファイル置き場。
