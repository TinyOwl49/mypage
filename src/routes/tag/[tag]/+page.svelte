<script lang="ts">
	import { resolve } from "$app/paths";
	import ArticleCard from "$lib/components/ArticleCard.svelte";

	let { data } = $props();
	const tag = $derived(data.tag);
	const articles = $derived(data.articles);
</script>

<svelte:head>
	<title>{tag}の記事一覧 | fukuneko's mypage</title>
	<meta name="description" content={`tag: ${tag}`} />
</svelte:head>

<main>
	<h1>タグ: {tag}</h1>
	<div class="article-list">
		{#each articles as art}
			<ArticleCard article={art} showTags />
		{/each}
	</div>
</main>

<style lang="scss">
	main {
		width: var(--main-width);
		margin: 0 auto;
	}

	.article-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
