<script lang="ts">
	import type { Article } from "$lib/article";
	import { formatDate } from "$lib/date";

	type Props = {
		article: Article;
		showTags?: boolean;
	};
	let { article, showTags }: Props = $props();
</script>

<div class="rounded-lg p-4">
	<div class="flex flex-row">
		<a href={`/blog/${article.slug}`}>
			<img
				src={article.thumbnail}
				alt={article.title}
				class="w-32 h-32 object-cover rounded-lg mr-4"
			/>
		</a>
		<div class="px-2">
			<h2 class="text-xl font-semibold mb-2">
				{article.title}
			</h2>
			<p class="text-sm text-gray-500 mb-2">
				{formatDate(new Date(article.date))}
			</p>
			<p class="text-gray-600 mb-4">
				{article?.description}
			</p>
			{#if showTags && article.tags && article.tags.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each article.tags as t}
						<a
							href="/blog/tags/{encodeURIComponent(
								t,
							)}/"
							class="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
						>
							#{t}
						</a>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>
