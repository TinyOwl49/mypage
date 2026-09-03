import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { createHighlighter } from 'shiki';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkMath from 'remark-math';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import orgLang from './src/lib/shiki/org.tmLanguage.json' with { type: 'json' };

const highlighter = await createHighlighter({
	themes: ['tokyo-night'],
	langs: ['javascript', 'typescript', 'python', 'bash', 'css', 'html', 'json', 'yaml', 'markdown', 'lisp', 'haskell', orgLang]
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
	},
	kit: {
		adapter: adapter({
			runtime: 'nodejs22.x'
		})
	},
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.svx', '.md'],
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeKatexSvelte],
			highlight: {
				// `meta` は ```lang のフェンス行で言語名の後ろに書いた文字列。
				//   ```ts title="src/foo.ts"      (title= / filename= / file=)
				//   ```ts:src/foo.ts
				highlighter: async (code, lang = 'text', meta) => {
					let filename = null;

					if (lang && lang.includes(':')) {
						const [realLang, ...rest] = lang.split(':');
						lang = realLang || 'text';
						filename = rest.join(':') || null;
					}

					if (!filename && meta) {
						const m =
							meta.match(/(?:title|filename|file)\s*=\s*"([^"]+)"/) ||
							meta.match(/(?:title|filename|file)\s*=\s*(\S+)/);
						if (m) filename = m[1];
					}

					lang = lang || 'text';

					const escapeHtml = (s) =>
						s
							.replace(/&/g, '&amp;')
							.replace(/</g, '&lt;')
							.replace(/>/g, '&gt;')
							.replace(/"/g, '&quot;');

					const highlighted = highlighter.codeToHtml(code, { lang, theme: 'tokyo-night' });
					const inner = filename
						? `<div class="code-block"><div class="code-block__filename">${escapeHtml(
								filename
							)}</div>${highlighted}</div>`
						: highlighted;

					const html = escapeSvelte(inner).replace(/\\/g, '\\\\');
					return `{@html \`${html}\` }`;
				}
			}
		})
	],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
