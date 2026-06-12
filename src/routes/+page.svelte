<script lang="ts">
	import { getAllArticles } from "$lib/article";
	import ArticleCard from "$lib/components/ArticleCard.svelte";
	const { articles } = getAllArticles();
</script>

<div class="bg-gray-50 flex flex-col items-center p-4">
	<main class="flex flex-col items-start gap-8 mt-8 w-full max-w-2xl">
		<div class="max-w-2xl w-full rounded-lg p-6">
			<h1 class="text-xl font-bold mb-1">
				このサイトについて
			</h1>
			<p class="text-gray-700">
				猫梟犬と申します。数学と物理と計算機が好きな大学生です。
				このサイトは、私が学んだことや考えたことを忘れないように残しておく場所です。
			</p>
		</div>

		<div class="max-w-2xl w-full rounded-lg p-6">
			<h2 class="text-xl font-semibold mb-1">記事一覧</h2>
			<nav class="flex flex-col gap-2">
				{#each articles as article}
					<ArticleCard {...article} />
				{:else}
					<p class="text-gray-500">
						記事がありません。
					</p>
				{/each}
			</nav>
		</div>
	</main>
</div>
