<script lang="ts">
	import { resolve } from "$app/paths";
	import ArticleCard from "$lib/components/ArticleCard.svelte";

	let { data } = $props();
	const tag = $derived(data.tag);
	const articles = $derived(data.articles);
</script>

<div class="flex flex-col items-center">
	<div class="w-full max-w-4xl p-4 md:p-8">
		<h1 class="text-3xl font-bold text-gray-900 mb-2">
			タグ: {tag}
		</h1>
		<p class="text-gray-500 mb-8">
			{articles.length} 件の記事
		</p>

		<div class="space-y-6">
			{#each articles as article}
				<ArticleCard {article} />
			{/each}
		</div>

		<footer class="mt-12 pt-8 border-t border-gray-200">
			<a href={resolve('/')} class="text-blue-500 hover:underline">
				← ホームに戻る
			</a>
		</footer>
	</div>
</div>
