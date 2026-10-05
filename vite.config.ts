import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteSitemap } from 'svelte-sitemap/vite'; 

export default defineConfig({
	plugins: [
		sveltekit(),
		svelteSitemap({
			domain: 'https://nyanowl.me',
			outDir: '.vercel/output/static'
		})
	],

});
