import { mdsvex, escapeSvelte } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { createHighlighter } from 'shiki';
import rehypeKatexSvelte from "rehype-katex-svelte";
import remarkMath from 'remark-math';

const highlighter = await createHighlighter({
	themes: ['github-dark-dimmed'],
	langs: ['javascript', 'typescript', 'python', 'bash', 'css', 'html', 'json', 'yaml', 'markdown']
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => filename.split(/[/\\]/).includes('node_modules') ? undefined : true
	},
	kit: { 
		adapter: adapter(),
		paths: {
			base: '/mypage'
		}
	},
	preprocess: [
		mdsvex({
			extensions: ['.svx', '.md'],
			remarkPlugins: [remarkMath],
			rehypePlugins: [rehypeKatexSvelte],
			highlight: {
				highlighter: async (code, lang = 'text') => {
					const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'github-dark-dimmed' }));
					return `{@html \`${html}\` }`;
				}
			}
		})
	],
	extensions: ['.svelte', '.svx', '.md']
};

export default config;
