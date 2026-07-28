<script>
	import NightStars from "$lib/components/NightStars.svelte";
</script>

<NightStars />

<main>
	<h1>Suteki Gallery</h1>
	<div class="gallery">
		<a href="https://kemono-friends.jp/">
			<img
				src="../imgs/sa-baru_chan.gif"
				alt="みんみ...(けものフレンズ5話より)"
				aria-label="みんみ...(けものフレンズ5話より)"
			/>
		</a>
		<a href="https://www.minecraft.net/ja-jp">
			<img
				src="../imgs/minecraft.jpg"
				alt="Minecraft"
				aria-label="Minecraft"
			/>
		</a>
		<a href="https://neovim.io/">
			<img
				src="../imgs/neovim.svg"
				alt="Neovim"
				aria-label="Neovim"
			/>
		</a>
		<a href="https://rust-lang.org/ja/">
			<img
				src="../imgs/rust.png"
				alt="Rust"
				aria-label="Rust"
			/>
		</a>

		<a
			href="https://store.steampowered.com/app/1150690/OMORI/?l=japanese"
		>
			<img
				src="../imgs/omori.jpg"
				alt="OMORI"
				aria-label="OMORI"
			/>
		</a>
		<a
			href="https://store.steampowered.com/app/420530/OneShot/?l=japanese"
		>
			<img
				src="../imgs/oneshot.jpg"
				alt="OneShot"
				aria-label="OneShot"
			/>
		</a>
		<a href="https://hololive.hololivepro.com/talents/gawr-gura/">
			<img
				src="../imgs/gawrgura.jpg"
				alt="Gawr Gura"
				aria-label="Gawr Gura"
			/>
		</a>
	</div>
</main>

<style lang="scss">
	main {
		margin: 0 auto;
		text-align: center;
		width: 80%;
	}

	.gallery {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1.5rem;
	}

	.gallery img {
		border-radius: 8px;
		height: 150px;
	}
</style>
