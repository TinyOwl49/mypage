<script lang="ts">
	import { Canvas } from "@threlte/core";
	import MinecraftBlock from "./MinecraftBlock.svelte";

	// Svelte 5 states for interactivity
	let rotationSpeed = $state(1.0);
	let wireframe = $state(false);
	let lightIntensity = $state(1.5);
	let spinSpeed = $state(0.0);
	let isHovered = $state(false);

	// Decay the spin speed boost smoothly over time
	$effect(() => {
		let animationFrame: number;
		const decay = () => {
			if (spinSpeed > 0.02) {
				spinSpeed *= 0.96; // 4% decay per frame
				animationFrame = requestAnimationFrame(decay);
			} else {
				spinSpeed = 0.0;
			}
		};
		if (spinSpeed > 0) {
			animationFrame = requestAnimationFrame(decay);
		}
		return () => {
			if (animationFrame)
				cancelAnimationFrame(animationFrame);
		};
	});
</script>

<div class="minecraft-container" class:hovered={isHovered}>
	<!-- 3D Canvas Container -->
	<div
		role="img"
		aria-label="3D Interactive Minecraft Grass Block"
		onmouseenter={() => (isHovered = true)}
		onmouseleave={() => (isHovered = false)}
	>
		<Canvas>
			<MinecraftBlock
				{rotationSpeed}
				{wireframe}
				{lightIntensity}
				{spinSpeed}
			/>
		</Canvas>
	</div>
</div>
