<script>
	import ArticleList from "$lib/components/ArticleList.svelte";
</script>

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
