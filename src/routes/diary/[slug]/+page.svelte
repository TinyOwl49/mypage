<script lang="ts">
	import { formatDate } from "$lib/date";

	let { data } = $props();
	const post = $derived(data.post);
	const ContentComponent = $derived(post.content);
</script>

<svelte:head>
	<title>{post.title}</title>
	<meta name="description" content={post.description} />
	<meta name="og:title" content={post.title} />
	<meta name="og:description" content={post.description} />
</svelte:head>

<main>
	<article>
		<div class="head">
			<h1 class="head__title">{post.title}</h1>
			<p class="head__meta">
				{formatDate(new Date(post.date))}
			</p>
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

		:global(p > img) {
			max-width: 100%;
			height: auto;
		}
	}

	.head {
		margin-bottom: 10vh;
		&__title {
			text-align: center;
			font-size: 2rem;
			margin-bottom: 2rem;
		}
		&__meta {
			text-align: center;
			font-size: 1rem;
			color: var(--secondary-color);
			margin: 0.2rem 0;
		}
	}

	@media (max-width: 640px) {
		main {
			width: 100%;
		}

		.head {
			margin-bottom: 3rem;
			&__title {
				font-size: 1.5rem;
				margin-bottom: 1.2rem;
			}
		}
	}
</style>
