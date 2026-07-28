<script lang="ts">
	import { resolve } from "$app/paths";
	import favicon from "$lib/assets/favicon.svg";
	import "../app.scss";
	import "katex/dist/katex.min.css";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<div class="header-links">
		<a href={resolve("/")}>Home</a>
		<a href={resolve("/about/")}>About</a>
		<a href={resolve("/blog/")}>Blog</a>
		<a href={resolve("/test/")}>Test</a>
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
		color: var(--primary-color);
		font-size: 1.2rem;
		font-weight: bold;
		text-decoration: none;
	}
	footer {
		display: flex;
		justify-content: center;
		margin-top: 4rem;
		color: var(--secondary-color);
		font-size: 0.8rem;
	}
</style>
