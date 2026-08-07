import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-vercel';
import { createHighlighter } from 'shiki';
import rehypeKatexSvelte from 'rehype-katex-svelte';
import remarkMath from 'remark-math';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const highlighter = await createHighlighter({
	themes: ['tokyo-night'],
	langs: ['javascript', 'typescript', 'python', 'bash', 'css', 'html', 'json', 'yaml', 'markdown']
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
				highlighter: async (code, lang = 'text') => {
					const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'tokyo-night' }));
					return `{@html \`${html}\` }`;
				}
			}
		})
	],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
