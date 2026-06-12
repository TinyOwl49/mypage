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
			<h1 class="text-2xl font-semibold text-gray-900 mb-2">
				{post.title}
			</h1>
			<time class="text-gray-500"
				>{formatDate(new Date(post.date))}</time
			>
		</header>

		<div class="markdown-body">
			<TableOfContents />
			<ContentComponent />
		</div>

		<footer class="mt-12 pt-8 border-t border-gray-200 not-prose">
			<a href="/" class="text-blue-500 hover:underline"
				>← ホームに戻る</a
			>
		</footer>
	</article>
</div>
