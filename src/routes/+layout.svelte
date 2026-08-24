<script lang="ts">
	import { page } from "$app/state";
	import { resolve } from "$app/paths";
	import favicon from "$lib/assets/favicon.svg";
	import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "$lib";
	import "../app.scss";
	import "katex/dist/katex.min.css";

	let { children } = $props();
</script>

<svelte:head>
	// TODO: faviconを変える
	<link rel="icon" href={DEFAULT_OG_IMAGE} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:image" content={DEFAULT_OG_IMAGE} />
	<meta property="og:url" content={`${SITE_URL}${page.url.pathname}`} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<header>
	<div class="header-links">
		<a
			href={resolve("/")}
			class:active={page.url.pathname === resolve("/")}
			>Home</a
		>
		<a
			href={resolve("/about/")}
			class:active={page.url.pathname.startsWith(
				resolve("/about/"),
			)}>About</a
		>
		<a
			href={resolve("/blog/")}
			class:active={page.url.pathname.startsWith(
				resolve("/blog/"),
			)}>Blog</a
		>
		<a
			href={resolve("/photo/")}
			class:active={page.url.pathname.startsWith(
				resolve("/photo/"),
			)}>Photo</a
		>
	</div>
</header>

{@render children()}

<footer>
	&copy; {new Date().getFullYear()} nekofuku's mypage . All rights reserved.
</footer>

<style lang="scss">
	header {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-bottom: 4rem;
	}
	.header-links {
		display: flex;
		width: var(--main-width);
		gap: 3rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border-color);
	}
	a {
		color: var(--secondary-color);
		font-size: 1.2rem;
		font-weight: bold;
		text-decoration: none;
		transition: color 0.2s ease-in-out;

		&:hover {
			color: var(--primary-color);
		}

		&.active {
			color: var(--primary-color);
		}
	}
	footer {
		display: flex;
		justify-content: center;
		margin-top: 4rem;
		color: var(--secondary-color);
		font-size: 0.8rem;
	}

	@media (max-width: 640px) {
		header {
			margin-bottom: 2.5rem;
		}
		.header-links {
			width: 100%;
			justify-content: space-between;
			gap: 1rem;
		}
		a {
			font-size: 1rem;
		}
	}
</style>
