<script lang="ts">
	import { onMount } from "svelte";

	let canvas: HTMLCanvasElement;

	type Star = {
		x: number;
		y: number;
		size: number;
		opacity: number;
		fadeDir: number; // 透明度の変化の向き (1 or -1)
	};

	onMount(() => {
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		// 画面サイズに合わせてキャンバスをリサイズ
		const resize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};
		window.addEventListener("resize", resize);
		resize();

		// 星の初期データを生成
		const starCount = 400;
		const stars: Star[] = Array.from({ length: starCount }).map(
			() => ({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				size: Math.floor(Math.random() * 2) + 1, // 1〜3pxの四角
				opacity: Math.random(),
				fadeDir: Math.random() > 0.5 ? 1 : -1,
			}),
		);

		let animationFrameId: number;

		// 描画ループ
		const draw = () => {
			ctx.fillStyle = "#0f1e2e";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			stars.forEach((star) => {
				// 星を描画
				ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
				ctx.fillRect(
					star.x,
					star.y,
					star.size,
					star.size,
				);

				// チカチカさせる（瞬き）
				star.opacity += 0.01 * star.fadeDir;
				if (star.opacity >= 1) {
					star.opacity = 1;
					star.fadeDir = -1; // 暗くなり始める
				} else if (star.opacity <= 0.1) {
					star.opacity = 0.1;
					star.fadeDir = 1; // 明るくなり始める
				}

				star.x -= 0.1;
				if (star.x < 0) {
					star.x = canvas.width;
					star.y = Math.random() * canvas.height;
				}
			});

			animationFrameId = requestAnimationFrame(draw);
		};

		draw();

		return () => {
			window.removeEventListener("resize", resize);
			cancelAnimationFrame(animationFrameId);
		};
	});
</script>

<div class="night-sky">
	<canvas bind:this={canvas} class="minecraft-sky"></canvas>
</div>

<style>
	.minecraft-sky {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1; /* 背景として最背面に配置 */
		pointer-events: none;
		/* ドット絵感を強調 */
		image-rendering: pixelated;
	}

	.night-sky {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		z-index: -1;
		pointer-events: none;
	}
</style>
