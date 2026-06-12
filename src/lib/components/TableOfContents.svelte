<script lang="ts">
	import { onMount } from "svelte";

	type Heading = {
		id: string;
		text: string;
		level: number;
	};

	let headings: Heading[] = $state([]);

	onMount(() => {
		// Extract headings from the markdown content
		const articleElement = document.querySelector("article");
		if (!articleElement) return;

		// Find all h2 and h3 headings in the article, skip the main h1 title
		const headingElements = Array.from(
			articleElement.querySelectorAll("h2, h3"),
		) as HTMLElement[];
		console.log("Found heading elements:", headingElements);

		headings = headingElements
			.map((el, index) => {
				const text = el.textContent || "";

				// Use existing ID or generate one
				let id = el.id;
				if (!id && text) {
					id = `heading-${index}`;
					el.id = id; // Set the ID on the element for linking
				}

				return {
					id,
					text,
					level: parseInt(el.tagName[1]),
				};
			})
			.filter((h) => h.text.length > 0);
	});

	function scrollToHeading(id: string) {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
		}
	}
</script>

{#if headings.length > 0}
	<nav class="toc bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
		<h2 class="text-lg font-semibold mb-4 text-gray-900">目次</h2>
		<ul class="space-y-2 text-sm">
			{#each headings as heading (heading.id)}
				<li
					style="margin-left: {(heading.level -
						2) *
						1.5}rem;"
				>
					<button
						onclick={() =>
							scrollToHeading(
								heading.id,
							)}
						class="text-blue-600 hover:text-blue-800 hover:underline text-left w-full"
					>
						{heading.text}
					</button>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	:global(.toc) {
		background-color: rgb(249, 250, 251);
		border-color: rgb(229, 231, 235);
	}

	:global(.toc h2) {
		color: rgb(17, 24, 39);
		font-weight: 600;
	}

	:global(.toc button:hover) {
		text-decoration: underline;
	}
</style>
