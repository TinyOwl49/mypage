<script lang="ts">
	import { formatDate } from "$lib/date";

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
				<article class="border-b border-gray-200 pb-6">
					<h2 class="text-xl font-semibold mb-2">
						<a
							href="/blog/{article.slug}/"
							class="text-blue-600 hover:underline"
						>
							{article.title}
						</a>
					</h2>
					<p class="text-gray-600 mb-3">
						{article.description}
					</p>
					<div class="flex items-center justify-between">
						<time class="text-sm text-gray-500">
							{formatDate(new Date(article.date))}
						</time>
						{#if article.tags && article.tags.length > 0}
							<div class="flex flex-wrap gap-2">
								{#each article.tags as t}
									<a
										href="/blog/tags/{encodeURIComponent(t)}/"
										class="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
									>
										#{t}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				</article>
			{/each}
		</div>

		<footer class="mt-12 pt-8 border-t border-gray-200">
			<a href="/" class="text-blue-500 hover:underline">
				← ホームに戻る
			</a>
		</footer>
	</div>
</div>
