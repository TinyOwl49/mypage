<script lang="ts">
	import { resolve } from "$app/paths";
	import ArticleList from "$lib/components/ArticleList.svelte";
	import Minecraft from "$lib/components/Minecraft.svelte";
	import NightStars from "$lib/components/NightStars.svelte";
</script>

<svelte:head>
	<title>fukuneko mypage</title>
	<meta name="description" content="猫梟犬のマイページです" />
</svelte:head>

<main>
	<div class="me">
		<img class="me__icon" src="imgs/icon.jpg" alt="icon" />
		<div>
			<h1 class="me__title">猫梟犬</h1>
			<p class="me__description">
				日本の大学生です。数学, 物理,
				コンピュータが好きです。<br />
			</p>
			<a class="me__to-about" href={resolve("/about")}
				>→ About Me</a
			>
		</div>
	</div>
	<hr style="margin-bottom: 0;" />

	<div class="content">
		<div class="article">
			<h2 class="text-center">ブログ記事</h2>
			<div></div>
			<ArticleList small />
		</div>
		<div class="split-vertical-line"></div>
		<div class="other">
			<h2 class="text-center">Hello</h2>
			<Minecraft />
		</div>
	</div>
	<div></div>
</main>
<NightStars />

<style lang="scss">
	main {
		width: var(--main-width);
		margin: 0 auto;
		border: 2px solid var(--border-color);
		border-radius: 50px;
		background-color: var(--background-color);
	}

	.me {
		display: flex;
		align-items: center;
		gap: 25px;
		width: 100%;
		margin: 20px 25px;

		&__title {
			font-family: "Mochiy Pop One", sans-serif;
			font-size: 2rem;
			margin: 0;
		}

		&__description {
			margin: 5px 0;
		}

		&__icon {
			width: 130px;
			height: 130px;
			border-radius: 50%;
		}

		&__to-about {
			text-decoration: none;
			color: var(--moon-color);
		}
	}

	.content {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	$article-width: 65%;
	.article {
		margin: 0 15px 30px 15px;
		width: $article-width;
	}

	.other {
		width: calc(100% - #{$article-width});
		margin: 0 15px;
	}

	.split-vertical-line {
		width: 2px;
		background-color: var(--border-color);
	}

	.text-center {
		text-align: center;
	}
</style>
