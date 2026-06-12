<script lang="ts">
	import type { Article } from "$lib/article";
	import { formatDate } from "$lib/date";
	let article: Article = $props();
</script>

<div class="bg-white rounded-lg p-4 shadow-md">
	<a href={`/blog/${article.slug}`}>
		<img
			src={article.thumbnail}
			alt={article.title}
			class="w-full h-48 object-cover rounded-md mb-4"
		/>
		<div class="px-2">
			<h2 class="text-xl font-semibold mb-2">
				{article.title}
			</h2>
			<p class="text-sm text-gray-500 mb-2">
				{formatDate(new Date(article.date))}
			</p>
			<p class="text-gray-600 mb-4">{article?.description}</p>
		</div>
	</a>
</div>
