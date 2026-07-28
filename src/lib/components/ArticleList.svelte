<script lang="ts">
	import { getAllArticles } from "$lib/article";
	import ArticleCard from "$lib/components/ArticleCard.svelte";

	type Props = {
		showTags?: boolean;
		small?: boolean;
	};
	let { showTags, small }: Props = $props();

	const { articles } = getAllArticles();
</script>

<div class="article-list">
	{#each articles as art}
		<ArticleCard article={art} {showTags} {small} />
	{/each}
</div>

<style lang="scss">
	.article-list {
		display: flex;
		flex-direction: column;
		width: 100%;

		@if small {
			gap: 0.5rem;
		}
		else {
			gap: 1rem;
		}
	}
</style>
