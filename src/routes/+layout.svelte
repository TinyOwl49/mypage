<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import "katex/dist/katex.min.css";
	import { resolve } from "$app/paths";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="bg-gray-50 min-h-screen p-4 flex flex-col">
	<header class="max-w-2xl w-full float-left">
		<a
			class="text-left text-2xl font-bold text-gray-800"
			href={resolve("/")}
		>
			猫
		</a>
	</header>
	{@render children()}
	<footer
		class="flex flex-col items-center p-4 mt-8 text-gray-400 text-sm"
	>
		&copy; {new Date().getFullYear()} tinyowl49's mypage . All rights
		reserved.
	</footer>
</div>
