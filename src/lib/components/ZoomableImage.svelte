<script lang="ts">
	import { onMount } from "svelte";
	import PhotoSwipeLightbox from "photoswipe/lightbox";
	import "photoswipe/style.css";
	import type { HTMLImgAttributes } from "svelte/elements";

	type Props = HTMLImgAttributes & {
		src: string;
		alt: string;
		openwidth?: number;
		openheight?: number;
	};
	let { src, alt, openwidth, openheight, ...restProps }: Props = $props();

	let naturalWidth = $state(0);
	let naturalHeight = $state(0);

	const pswpWidth = $derived(
		openwidth ??
			(openheight && naturalHeight
				? Math.round((openheight * naturalWidth) / naturalHeight)
				: naturalWidth || 1920),
	);
	const pswpHeight = $derived(
		openheight ??
			(openwidth && naturalWidth
				? Math.round((openwidth * naturalHeight) / naturalWidth)
				: naturalHeight || 1080),
	);

	let galleryElement: HTMLDivElement | undefined = undefined;

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

<div bind:this={galleryElement} class="w-full my-6">
	<a
		href={src}
		data-pswp-width={pswpWidth}
		data-pswp-height={pswpHeight}
		target="_blank"
		rel="noopener noreferrer"
		class="block cursor-zoom-in overflow-hidden rounded-xl shadow-lg transition duration-200 hover:opacity-80"
	>
		<img
			{src}
			{alt}
			bind:naturalWidth
			bind:naturalHeight
			class="w-full h-auto object-cover"
			loading="lazy"
			{...restProps}
		/>
	</a>
</div>
