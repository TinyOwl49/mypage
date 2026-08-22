<script lang="ts">
	import { asset } from "$app/paths";
	import NightStars from "$lib/components/NightStars.svelte";
	import ZoomableImage from "$lib/components/ZoomableImage.svelte";

	type Photo = {
		src: string;
		alt: string;
		caption: string;
	};

	const photos: Photo[] = [
		{
			src: asset("/imgs/photo/soto.webp"),
			alt: "外",
			caption: "すごく心細かった時に撮った",
		},
		{
			src: asset("/imgs/photo/sakura.webp"),
			alt: "桜",
			caption: "お花見をした時の記憶",
		},

		{
			src: asset("/imgs/photo/gosyoku_numa.webp"),
			alt: "五色沼",
			caption: "福島県の五色沼湖沼群に行ったとき",
		},
		{
			src: asset("/imgs/photo/aijisai0.webp"),
			alt: "紫陽花",
			caption: "梅雨の紫陽花",
		},
		{
			src: asset("/imgs/photo/zaou2.webp"),
			alt: "蔵王",
			caption: "蔵王のお釜",
		},
		{
			src: asset("/imgs/photo/zaou1.webp"),
			alt: "蔵王",
			caption: "雲抜けした蔵王での朝日",
		},
		{
			src: asset("/imgs/photo/cloud.webp"),
			alt: "雲",
			caption: "夏の雲",
		},
		{
			src: asset("/imgs/photo/flower.webp"),
			alt: "オオイヌノフグリ",
			caption: "オオイヌノフグリ",
		},
		{
			src: asset("/imgs/photo/ryouri.webp"),
			alt: "料理",
			caption: "高級そうな料理",
		},
		{
			src: asset("/imgs/photo/tanabata.webp"),
			alt: "七夕",
			caption: "仙台の七夕祭りで発見した研一",
		},
		{
			src: asset("/imgs/photo/poster.webp"),
			alt: "ポスター",
			caption: "ゴミ捨て場のポスター。色違い",
		},
		{
			src: asset("/imgs/photo/hanabi 22.02.17.gif"),
			alt: "線香花火",
			caption: "線香花火のようす",
		},
		{
			src: asset("/imgs/photo/yukidaruma.webp"),
			alt: "雪だるま",
			caption: "雪だるま作った",
		},
		{
			src: asset("/imgs/photo/matsushima.webp"),
			alt: "東松島",
			caption: "東松島の砂浜でみた夕日",
		},
		{
			src: asset("/imgs/photo/bijutukan1.webp"),
			alt: "美術館",
			caption: "仙台市美術館 「アリスの庭」",
		},
		{
			src: asset("/imgs/photo/bijutukan2.webp"),
			alt: "美術館2",
			caption: "仙台市美術館 「アリスの庭」２",
		},
		{
			src: asset("/imgs/photo/ajisai.webp"),
			alt: "紫陽花",
			caption: "夕方の紫陽花",
		},
		{
			src: asset("/imgs/photo/soradane3.gif"),
			alt: "空",
			caption: "空と電柱",
		},
	];

	const perPage = 4;
	const pageCount = Math.max(1, Math.ceil(photos.length / perPage));

	let page = $state(pageCount - 1);

	const currentPhotos = $derived(
		photos.slice(page * perPage, page * perPage + perPage),
	);

	function prevPage() {
		page = Math.max(0, page - 1);
	}
	function nextPage() {
		page = Math.min(pageCount - 1, page + 1);
	}
</script>

<NightStars />
<div class="book">
	<button
		class="book__arrow book__arrow--prev"
		onclick={prevPage}
		disabled={page === 0}
		aria-label="前のページ"
	>
		‹
	</button>

	<div class="gallery">
		{#each currentPhotos as photo, i (page + "-" + i)}
			<div class="gallery__item">
				<ZoomableImage
					src={photo.src}
					alt={photo.alt}
					openwidth={700}
				/>
				<p class="gallery__item__caption">
					{photo.caption}
				</p>
			</div>
		{/each}
	</div>

	<button
		class="book__arrow book__arrow--next"
		onclick={nextPage}
		disabled={page >= pageCount - 1}
		aria-label="次のページ"
	>
		›
	</button>
</div>

{#if pageCount > 1}
	<p class="page-indicator">{page + 1} / {pageCount}</p>
{/if}

<style lang="scss">
	.book {
		position: relative;
		width: var(--main-width);
		margin: 3rem auto 0;
		min-height: 80vh;
	}

	@media (max-width: 640px) {
		.book {
			width: 100%;
			min-height: auto;
		}
	}

	.book__arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 2.75rem;
		height: 2.75rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		line-height: 1;
		color: var(--background-color);
		background: var(--primary-color);
		border: none;
		border-radius: 50%;
		cursor: pointer;
		z-index: 2;
		transition:
			transform 0.2s ease,
			opacity 0.2s ease,
			background 0.2s ease;
	}

	.book__arrow--prev {
		left: -1.375rem;
	}

	.book__arrow--next {
		right: -1.375rem;
	}

	.book__arrow:hover:not(:disabled) {
		background: var(--link-color);
		transform: translateY(-50%) scale(1.08);
	}

	.book__arrow:disabled {
		opacity: 0.3;
		cursor: default;
		box-shadow: none;
	}

	.page-indicator {
		margin: 0.75rem 0 0;
		text-align: center;
		color: var(--secondary-color);
		font-size: 0.85rem;
	}

	.gallery {
		position: relative;
		box-sizing: border-box;
		width: 100%;
		height: 65vh;
		padding: 3rem 3.5rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 3.5rem;
		row-gap: 2.5rem;
		background-color: #d4deff;
		background-image: repeating-linear-gradient(
			to bottom,
			transparent 0,
			transparent 1.9rem,
			rgba(80, 60, 40, 0.08) 1.9rem,
			rgba(80, 60, 40, 0.08) calc(1.9rem + 1px)
		);
		border-radius: 6px;
	}

	.gallery::before {
		content: "";
		position: absolute;
		top: 0;
		bottom: 0;
		left: 50%;
		width: 3.5rem;
		transform: translateX(-50%);
		background: linear-gradient(
			to right,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.14) 38%,
			rgba(0, 0, 0, 0.2) 50%,
			rgba(0, 0, 0, 0.14) 62%,
			rgba(0, 0, 0, 0) 100%
		);
		pointer-events: none;
	}

	@media (max-width: 640px) {
		.gallery {
			grid-template-columns: 1fr;
			height: auto;
			min-height: 50vh;
			padding: 2.5rem 1.5rem;
		}
		.gallery::before {
			display: none;
		}
		.book__arrow--prev {
			left: -0.75rem;
		}
		.book__arrow--next {
			right: -0.75rem;
		}
	}

	// ページの1行 = 写真＋キャプション。
	// 4枚1組で「左ページ1行目→左ページ2行目→右ページ1行目→右ページ2行目」の順に
	// 並ぶよう、grid-column / grid-row で表示位置を明示的に指定する
	.gallery__item {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.gallery__item:nth-child(4n + 1) {
		grid-column: 1;
		grid-row: 1;
	}
	.gallery__item:nth-child(4n + 2) {
		grid-column: 1;
		grid-row: 2;
	}
	.gallery__item:nth-child(4n + 3) {
		grid-column: 2;
		grid-row: 1;
	}
	.gallery__item:nth-child(4n) {
		grid-column: 2;
		grid-row: 2;
	}

	// 各ページの2行目はキャプションを左、写真を右に入れ替える
	.gallery__item:nth-child(4n + 2),
	.gallery__item:nth-child(4n) {
		flex-direction: row-reverse;
	}

	// 貼り付けた写真が少しずつ傾いているように、ページ内の順番で角度を変える
	.gallery__item:nth-child(4n + 1) {
		--tilt: -3deg;
	}
	.gallery__item:nth-child(4n + 2) {
		--tilt: 2.5deg;
	}
	.gallery__item:nth-child(4n + 3) {
		--tilt: -2deg;
	}
	.gallery__item:nth-child(4n) {
		--tilt: 3.5deg;
	}

	.gallery__item > :global(div) {
		position: relative;
		flex: 0 0 160px;
		max-width: 160px;
		max-height: 200px;
		background: #fffdf7;
		padding: 0.75rem 0.75rem 2.25rem;
		border-radius: 2px;
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.2),
			0 5px 18px rgba(0, 0, 0, 0.35);
		transform: rotate(var(--tilt));
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease;
	}

	.gallery__item__caption {
		flex: 1 1 auto;
		min-width: 0;
		margin: 0;
		color: #4a3f2a;
		font-family: "Yomogi", cursive;
		font-weight: 600;
		font-size: 0.9rem;
		line-height: 1.7;
	}

	.gallery__item > :global(div::before) {
		content: "";
		position: absolute;
		top: -0.65rem;
		left: 50%;
		width: 3.5rem;
		height: 1.2rem;
		background: rgba(255, 241, 184, 0.55);
		border: 1px solid rgba(255, 255, 255, 0.4);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
		transform: translateX(-50%) rotate(-4deg);
	}

	.gallery__item > :global(div:hover) {
		transform: rotate(0deg) scale(1.06) translateY(-6px);
		box-shadow:
			0 4px 10px rgba(0, 0, 0, 0.25),
			0 5px 20px rgba(0, 0, 0, 0.35);
		z-index: 1;
	}

	.gallery__item > :global(div a) {
		display: block;
	}

	.gallery__item > :global(div img) {
		display: block;
		width: 100%;
		height: auto;
	}

	// :nth-child(4n+1)などの個別指定は詳細度が高く、上のモバイル用メディアクエリの
	// .gallery__item { grid-column / grid-row / flex-direction } を上書きしてしまうため、
	// ここで同等の詳細度(:nth-child(n))を使って1カラム縦積みを確実に効かせる
	@media (max-width: 640px) {
		.gallery__item:nth-child(n) {
			grid-column: 1;
			grid-row: auto;
			flex-direction: column;
			align-items: flex-start;
		}

		// flex-directionをcolumnにすると、flex-basis(160px)の意味が
		// 「幅」から「高さ」に変わり枠が縦に間延びしてしまうため、
		// 縦積み用に幅基準のサイズ指定へ切り替える
		.gallery__item > :global(div) {
			flex: 0 0 auto;
			width: 200px;
			max-width: 100%;
			max-height: none;
		}
	}
</style>
