<script lang="ts">
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";
	import { flip } from "svelte/animate";

	const text = ["ねこねこにゃにゃにゃ♪", "にゃにゃにゃんにゃん♫"];

	let currentIndex = $state(-1);
	let currentLine = $state(0);
	let currentText = $state<string[]>([]);

	onMount(() => {
		let interval: ReturnType<typeof setInterval>;

		// Wait 1200ms for Threlte Canvas rendering / shader compilation to stabilize before typing starts
		const startTimeout = setTimeout(() => {
			tick();
			interval = setInterval(tick, 250);
		}, 1200);

		function tick() {
			if (currentIndex === -1) {
				currentIndex = 0;
			} else {
				// Move to the next index/line when reaching the end of the current line's text
				if (
					currentIndex ===
					text[currentLine].length - 1
				) {
					// Erase any remaining extra characters from the previous line all at once
					currentText = currentText.slice(
						0,
						text[currentLine].length,
					);
					currentLine =
						(currentLine + 1) % text.length;
					currentIndex = 0;
				} else {
					currentIndex += 1;
				}
			}

			// Update the character at the new currentIndex
			const targetChar = text[currentLine][currentIndex];
			if (currentIndex >= currentText.length) {
				currentText = [...currentText, targetChar];
			} else {
				currentText[currentIndex] = targetChar;
			}
		}

		// Clear both timers on component destroy to prevent memory leaks
		return () => {
			clearTimeout(startTimeout);
			if (interval) clearInterval(interval);
		};
	});
</script>

<p class="nya">
	{#each currentText as char, index (index)}
		<span class="char-wrapper" animate:flip={{ duration: 400 }}>
			{#if index === currentIndex}
				<span
					class="active-glow"
					in:fly={{
						y: 20,
						duration: 80,
						delay: 50,
					}}
				>
					{char}
				</span>
			{:else}
				<span class="normal-char">{char}</span>
			{/if}
		</span>
	{/each}
</p>

<style lang="scss">
	.nya {
		font-size: 2rem;
		font-weight: bold;
		text-align: center;
		margin-top: 2rem;
		color: #f297f1;
		white-space: pre-wrap; /* Preserve spaces and wrap correctly */
font-family: "Hannotate SC";
	}

	.char-wrapper {
		display: inline-block;
		min-width: 0.5em; /* Ensure spaces have a visible width */
		text-align: center;
	}

	.active-glow {
		display: inline-block;
		text-shadow:
			0 0 4px #fff,
			0 0 10px currentColor,
			0 0 20px currentColor,
			0 0 30px currentColor,
			0 0 40px currentColor;
		transform: scale(1.2) translateY(-2px);
		filter: brightness(1.2);
	}

	.normal-char {
		display: inline-block;
	}
</style>
