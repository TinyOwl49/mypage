<script lang="ts">
	import { formatDate } from "$lib/date";
	import { resolve } from "$app/paths";

	let { data } = $props();
	const post = $derived(data.post);
	const ContentComponent = $derived(post.content);
</script>

<svelte:head>
	<title>{post.title}</title>
	<meta name="description" content={post.description} />
</svelte:head>

<main>
	<article>
		<div class="head">
			<h1 class="head__title">{post.title}</h1>
			<div class="head__info">
				<p class="head__meta">
					最終更新：{formatDate(
						new Date(post.date),
					)}
				</p>
				{#if post.tags && post.tags.length > 0}
					<div class="head__tags">
						{#each post.tags as tag}
							<a
								class="head__link"
								href={resolve(
									"/tag/[tag]",
									{
										tag: tag,
									},
								)}>{tag}</a
							>
						{/each}
					</div>
				{/if}
			</div>
		</div>
		<div class="prose article-content">
			<ContentComponent />
		</div>
	</article>
</main>

<style lang="scss">
	main {
		width: 55%;
		margin: 0 auto;
	}

	.article-content {
		font-size: 1.03rem;
	}

	.head {
		margin-bottom: 10vh;
		&__title {
			text-align: center;
			font-size: 2rem;
			margin-bottom: 2rem;
		}
		&__meta {
			font-size: 1rem;
			color: var(--secondary-color);
			margin: 0.2rem 0;
		}
		&__tags {
			display: flex;
			gap: 0.7rem;
		}
		&__link {
			color: var(--link-color);
		}
	}
</style>
