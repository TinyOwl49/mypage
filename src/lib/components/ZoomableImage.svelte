<script lang="ts">
	import { onMount } from "svelte";
	import PhotoSwipeLightbox from "photoswipe/lightbox";
	import "photoswipe/style.css"; // PhotoSwipeの基本スタイル

	type Props = {
		galleryElement: HTMLElement;
		src: string;
		alt: string;
		width: number;
		height: number;
	};

	// 巨大な画像を滑らかにズームするため、画像の実際のピクセル数を指定します
	let { galleryElement, src, alt, width, height }: Props = $props();

	onMount(() => {
		// Lightboxの初期化
		const lightbox = new PhotoSwipeLightbox({
			gallery: galleryElement,
			children: "a",
			// 動的インポート（必要なときだけコアモジュールを読み込み、ページの初期表示を軽くする）
			pswpModule: () => import("photoswipe"),
		});

		lightbox.init();

		// コンポーネント破棄時にメモリリークを防ぐ
		return () => {
			lightbox.destroy();
		};
	});
</script>

<div bind:this={galleryElement} class="w-full">
	<a
		href={src}
		data-pswp-width={width}
		data-pswp-height={height}
		target="_blank"
		rel="noreferrer"
		class="block cursor-zoom-in overflow-hidden rounded-xl transition duration-200 hover:opacity-80"
	>
		<img
			{src}
			{alt}
			class="w-full h-auto object-cover mt-3 mb-3"
			loading="lazy"
		/>
	</a>
</div>
