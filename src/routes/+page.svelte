<script lang="ts">
	import { asset, resolve } from "$app/paths";
	import ArticleList from "$lib/components/ArticleList.svelte";
	import NightStars from "$lib/components/NightStars.svelte";
</script>

<svelte:head>
	<title>fukuneko mypage</title>
	<meta name="description" content="猫梟犬のマイページです" />
</svelte:head>

<NightStars />
<main>
	<div class="me">
		<img
			class="me__icon"
			src={asset("/imgs/icon.jpg")}
			alt="猫梟犬のアイコン"
		/>
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
			<ArticleList small />
			<span><a href={resolve("/blog")}> → 一覧 </a></span>
		</div>
		<div class="split-vertical-line"></div>
		<div class="creation">
			<h2 class="text-center">最近作ったもの</h2>
			<div class="creation__list">
				<a
					href="https://tinyowl49.github.io/sound-sphere/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<div class="creation__list_item">
						<img
							class="creation__list__img"
							width="80"
							src={asset(
								"/imgs/creation/sound_sphere.gif",
							)}
							alt="sound_sphere"
						/>
						<div
							class="creation__list__description"
						>
							<i>Sound Sphere</i>
							<p>
								曲の形を表現します
							</p>
						</div>
					</div>
				</a>
			</div>
			<hr />
			<h2 class="text-center">最近のフォト</h2>
			<div class="creation__list">
				<a href={resolve("/photo/")}>
					<div class="creation__list_item">
						<img
							class="creation__list__img creation__photo"
							width="140"
							src={asset(
								"/imgs/photo/soradane3.gif",
							)}
							alt="最近の写真"
						/>
					</div>
				</a>
			</div>
		</div>
	</div>
</main>

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
		margin: 0 20px 30px 20px;
		width: $article-width;
	}

	.creation {
		width: calc(100% - #{$article-width});

		&__list {
			display: flex;
			flex-direction: column;
			gap: 10px;
			margin: 0 15px;
		}

		&__list a {
			text-decoration: none;
		}

		&__list_item {
			display: flex;
			gap: 20px;
		}

		&__list__img {
			border-radius: 10px;
			border: 1px solid var(--border-color);
		}

		&__list__img:hover {
			transform: scale(1.1);
			transition: transform 0.3s ease-in-out;
		}

		&__list__description {
			p {
				font-size: 0.8rem;
				color: var(--primary-color);
			}
		}

		&__photo {
			margin: 0 auto 20px auto;
		}
	}

	.split-vertical-line {
		width: 2px;
		background-color: var(--border-color);
	}

	.text-center {
		text-align: center;
	}

	@media (max-width: 640px) {
		main {
			width: 100%;
			border-radius: 20px;
		}

		.me {
			gap: 15px;
			margin: 20px 15px;

			&__icon {
				width: 80px;
				height: 80px;
			}

			&__title {
				font-size: 1.5rem;
			}
		}

		.content {
			flex-direction: column;
		}

		.article {
			width: auto;
			margin: 0 15px 20px 15px;
		}

		.creation {
			width: auto;

			&__list {
				margin: 0;
			}
		}

		.split-vertical-line {
			width: auto;
			height: 2px;
			margin: 0 15px 20px 15px;
		}
	}
</style>
