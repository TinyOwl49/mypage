<script>
	import ArticleList from "$lib/components/ArticleList.svelte";
</script>

<svelte:head>
	<title>記事一覧</title>
	<meta name="description" content="" />
	<meta name="og:title" content="記事一覧" />
	<meta name="og:description" content="" />
</svelte:head>

<main>
	<div class="head-title">
		<h1>記事一覧</h1>
		<hr />
	</div>
	<ArticleList showTags />
</main>

<style lang="scss">
	main {
		width: var(--main-width);
		margin: 0 auto;
	}

	.head-title {
		text-align: center;
		margin-bottom: 2rem;

		h1 {
			font-size: 2rem;
			margin-bottom: 0.5rem;
		}

		hr {
			width: 30%;
			margin: 0 auto;
			border: 1px solid var(--border-color);
		}
	}
</style>
