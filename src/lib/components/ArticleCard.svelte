<script lang="ts">
	import { asset, resolve } from "$app/paths";
	import type { Article } from "$lib/article";
	import { formatDate } from "$lib/date";

	type Props = {
		article: Article;
		showTags?: boolean;
		small?: boolean;
	};
	let { article, showTags, small }: Props = $props();
</script>

<div class="article-card">
	<a class="link" href={resolve(`/blog/[slug]`, { slug: article.slug })}>
		{#if small}
			<h2 class="title title-small">
				{article.title}
			</h2>
		{:else}
			<h2 class="title">
				{article.title}
			</h2>
		{/if}
		<p class="meta">
			{formatDate(new Date(article.date)) || ""}
		</p>
		<p class="description">
			{article.description}
		</p>
	</a>
	{#if showTags && article.tags && article.tags.length > 0}
		<div class="tags">
			{#each article?.tags as tag}
				<a
					class="tag"
					href={resolve("/tag/[tag]", {
						tag: tag,
					})}>{tag}</a
				>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	a.link {
		color: var(--primary-color);
		text-decoration: none;
	}

	.article-card {
		padding: 10px 20px;
		border: 1px solid var(--border-color);
		border-radius: 5px;

		&:hover {
			background-color: var(--hover-background-color);
		}
	}

	.title {
		font-size: 1.5rem;
		margin: 0.5rem 0;
	}

	.title-small {
		font-size: 1.2rem;
		margin: 0.5rem 0;
	}

	.description {
		font-size: 1rem;
		margin: 0.5rem 0;
	}
	.meta {
		font-size: 0.8rem;
		color: var(--secondary-color);
		margin: 0.5rem 0;
	}

	.tags {
		display: flex;
		gap: 0.7rem;
	}

	.tag {
		display: inline-block;
	}
</style>
