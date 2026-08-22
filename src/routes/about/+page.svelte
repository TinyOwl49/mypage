<script>
	import { asset } from "$app/paths";
	import NightStars from "$lib/components/NightStars.svelte";

	const mysutekiItems = [
		{
			src: "/imgs/mysuteki/sa-baru_chan.gif",
			alt: "サーバルちゃん",
			href: "https://kemono-friends.jp/",
		},
		{
			src: "/imgs/mysuteki/gawrgura.jpg",
			alt: "Gawr Gura",
			href: "https://www.youtube.com/@GawrGura",
		},
		{
			src: "/imgs/mysuteki/ninomae_inanis.jpg",
			alt: "Ninomae Inanis",
			href: "https://www.youtube.com/channel/UCMwGHR0BTZuLsmjY_NT5Pwg",
		},
		{
			src: "/imgs/mysuteki/minecraft.jpg",
			alt: "Minecraft",
		},
		{
			src: "/imgs/mysuteki/neovim.svg",
			alt: "Neovim",

			href: "https://neovim.io/",
		},
		{
			src: "/imgs/mysuteki/omori.jpg",
			alt: "OMORI",
			href: "https://store.steampowered.com/app/1150690/OMORI/?l=japanese",
		},
		{
			src: "/imgs/mysuteki/oneshot.jpg",
			alt: "OneShot",
			href: "https://store.steampowered.com/app/420530/OneShot/?l=japanese",
		},
	];
</script>

<NightStars />

<main>
	<div class="profile">
		<img
			class="profile__icon"
			src={asset("/imgs/icon.jpg")}
			alt="猫梟犬のアイコン"
		/>
		<div>
			<h1 class="profile__title">猫梟犬</h1>
			<p class="profile__description">
				東北大学の学生です。 数学, 物理,
				コンピュータが好きです。 専攻は情報工学です。<br
				/>
			</p>
		</div>
	</div>
	<div class="linklist">
		<a
			href="https://x.com/kasumi_fukurou"
			target="_blank"
			rel="noopener noreferrer"
			class="linklist__item"
		>
			<img
				src={asset("/logo/twitter-logo-2429.svg")}
				alt="Twitter"
				class="linklist__icon"
			/>
		</a>
		<a
			href="https://misskey.io/@tinyowl"
			target="_blank"
			rel="noopener noreferrer"
			class="linklist__item"
		>
			<img
				src={asset("/logo/misskey.png")}
				alt="Misskey"
				class="linklist__icon"
			/>
		</a>
	</div>

	<div>
		<h2>好き</h2>
		<div class="mysuteki">
			<div class="mysuteki__track">
				{#each [...mysutekiItems, ...mysutekiItems] as item}
					<div class="mysuteki__item">
						{#if item.href}
							<a
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									src={asset(
										item.src,
									)}
									alt={item.alt}
									class="mysuteki__icon"
								/>
							</a>
						{:else}
							<img
								src={asset(
									item.src,
								)}
								alt={item.alt}
								class="mysuteki__icon"
							/>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</main>

<style lang="scss">
	main {
		margin: 0 auto;
		text-align: center;
	}

	.profile {
		&__icon {
			max-width: 400px;
		}

		&__title {
			font-size: 1.5rem;
			margin: 0;
		}

		&__description {
			margin: 0.5rem 0 0 0;
			font-size: 1rem;
			color: var(--text-color);
		}
	}

	.linklist {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2rem;

		&__item {
			display: inline-block;
		}

		&__icon {
			display: block;
			width: 50px;
			height: 50px;
			animation:
				fly-in 1.4s cubic-bezier(0.22, 0.68, 0.35, 1)
					both,
				hover-bob 2.6s ease-in-out 1.4s infinite;
		}
		&__item:hover &__icon {
			animation:
				fly-in 1.4s cubic-bezier(0.22, 0.68, 0.35, 1)
					both,
				flap 0.5s ease-in-out infinite;
		}
	}

	@keyframes fly-in {
		80% {
			transform: translate(4px, -3px) rotate(-3deg)
				scale(0.98);
		}
		100% {
			opacity: 1;
			transform: translate(0, 0) rotate(0deg) scale(1);
		}
	}

	@keyframes hover-bob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-4px);
		}
	}

	@keyframes flap {
		0%,
		100% {
			transform: translateY(0) rotate(0deg);
		}
		50% {
			transform: translateY(-6px) rotate(-8deg);
		}
	}

	.mysuteki {
		overflow: hidden;
		width: 70%;
		margin: 0 auto;
		&__track {
			display: flex;
			width: max-content;
			gap: 2rem;
			padding: 0.5rem 0;
			animation: marquee 30s linear infinite;
		}

		&__item {
			flex: 0 0 auto;
		}

		&__icon {
			display: block;
			height: 250px;
			object-fit: cover;
			border-radius: 8px;
		}
	}

	@media (max-width: 640px) {
		.mysuteki {
			width: 90%;
			&__icon {
				height: 150px;
			}
		}
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.linklist__icon,
		.linklist__item:hover .linklist__icon,
		.mysuteki__track {
			animation: none;
		}
	}
</style>
