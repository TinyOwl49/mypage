import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteSitemap } from 'svelte-sitemap/vite'; // <-- Add svelte-sitemap vite plugin

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		svelteSitemap({
			domain: 'https://github.com/TinyOwl49/mypage'
		})
	]
});
