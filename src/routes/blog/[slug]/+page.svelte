<script lang="ts">
	import { formatDate } from "$lib/date";
	import TableOfContents from "$lib/components/TableOfContents.svelte";

	let { data } = $props();
	const post = $derived(data.post);
	const ContentComponent = $derived(post.content);
</script>

<div class="flex flex-col items-center">
	<article
		class="w-full max-w-4xl p-4 md:p-8 prose prose-slate prose-pre:bg-transparent prose-pre:p-0"
	>
		<header class="mb-8 not-prose">
			<h1 class="text-3xl text-gray-900 mb-2">
				{post.title}
			</h1>
			<div class="flex flex-col gap-2">
				<time class="text-gray-500"
					>{formatDate(new Date(post.date))}</time
				>
				{#if post.tags && post.tags.length > 0}
					<div class="flex flex-wrap gap-2">
						{#each post.tags as tag}
							<a
								href="/blog/tags/{encodeURIComponent(tag)}/"
								class="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
							>
								#{tag}
							</a>
						{/each}
					</div>
				{/if}
			</div>
			<hr class="my-6 border-gray-200" />
		</header>

		<div class="markdown-body">
			<!-- <TableOfContents /> -->
			<ContentComponent />
		</div>

		<footer class="mt-12 pt-8 border-t border-gray-200 not-prose">
			<a href="/" class="text-blue-500 hover:underline"
				>← ホームに戻る</a
			>
		</footer>
	</article>
</div>
