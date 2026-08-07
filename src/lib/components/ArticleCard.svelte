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

<div class="article-card" class:small>
	<img
		class="thumbnail"
		class:small
		src={asset(article.thumbnail as any)}
		alt={article.title}
	/>
	<div>
		<a
			class="link"
			href={resolve(`/blog/[slug]`, { slug: article.slug })}
		>
			<p class="meta">
				{formatDate(new Date(article.date)) || ""}
			</p>
			<h2 class="title">
				{article.title}
			</h2>
			<p class="description" class:small>
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
		display: flex;

		&:hover {
			background-color: var(--hover-background-color);
		}

		&.small {
			padding: 5px 10px;

			.title {
				font-size: 1.05rem;
			}

			.description {
				font-size: 0.8rem;
			}
		}
	}

	.title {
		font-size: 1.4rem;
		margin: 0.2rem 0;
	}

	.thumbnail {
		object-fit: cover;
		margin-right: 1rem;
		border-radius: 5px;

		width: 120px;
		height: 120px;
		margin: auto 15px auto 0;
		&.small {
			width: 80px;
			height: 80px;
		}
	}

	.description {
		margin: 0.5rem 0;
	}

	.meta {
		font-size: 0.8rem;
		color: var(--secondary-color);
		margin: 0;
	}

	.tags {
		display: flex;
		gap: 0.7rem;
	}

	.tag {
		display: inline-block;
	}
</style>
