<script lang="ts">
	import { Canvas } from "@threlte/core";
	import TestView from "./TestView.svelte";
	import TransitionText from "./TransitionText.svelte";
	import Minecraft from "$lib/components/Minecraft.svelte";
	import NightStars from "$lib/components/NightStars.svelte";
	import NightStars2 from "$lib/components/NightStars2.svelte";
	import EmbedLink from "$lib/components/EmbedLink.svelte";

	// Svelte 5 state for controlling the number of spheres
	let sphereCount = $state(10);

	function addSphere() {
		if (sphereCount < 30) {
			sphereCount++;
		}
	}

	function removeSphere() {
		if (sphereCount > 1) {
			sphereCount--;
		}
	}
</script>

<NightStars2 />
<div class="test-container">
	<div>
		<EmbedLink url="https://www.pixiv.net/artworks/61282267" />
	</div>

	<div class="minecraft-section">
		<Minecraft />
	</div>

	<div class="lyrics-section">
		<TransitionText />
	</div>

	<div class="lolentz-section">
		<Canvas>
			<TestView count={sphereCount} />
		</Canvas>
	</div>

	<div class="construction">
		<img
			class="neon-text"
			src="../imgs/keibi.png"
			alt="工事中"
			height="100"
			width="100"
		/>
		<div class="neon-container">
			<h1 class="neon-text">只今工事中のようです</h1>
		</div>
	</div>
</div>

<style lang="scss">
	.test-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		gap: 4rem;
	}

	.minecraft-section {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.lyrics-section {
		margin-top: 2rem;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.construction {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		margin-bottom: 5rem;
	}

	.neon-text {
		font-family: "Arial Black", sans-serif; /* 太めのフォントがおすすめ */
		font-size: 2rem;
		color: #fff; /* 文字の芯の部分は白っぽくする */

		/* アニメーションの適用 (flickerという名前のアニメーションを無限ループ) */
		animation: flicker 4s infinite alternate;
	}

	@keyframes flicker {
		/* 正常に光っている状態 */
		0%,
		18%,
		22%,
		25%,
		53%,
		57%,
		100% {
			color: #e0ffff; /* 薄い水色 */
			text-shadow:
				0 0 5px #fff,
				0 0 10px #fff,
				0 0 20px #00aaff,
				/* ここから青色の光の広がり */ 0 0 40px #00aaff,
				0 0 80px #00aaff,
				0 0 90px #00aaff,
				0 0 100px #00aaff;
		}

		/* 一瞬消えかかる状態（チカッとする部分） */
		20%,
		24%,
		55% {
			color: #1a3344; /* 文字色を暗くする */
			text-shadow: none; /* 光を完全に消す */
		}
	}

	.yoshi {
		border-radius: 20px;
	}

	.neon-container {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
	}
</style>
