<script lang="ts">
	import { resolve } from "$app/paths";

	type Props = {
		url: string;
		title?: string;
	};

	// 外部から受け取るURL
	let { url, title }: Props = $props();

	let ogpData: any | null = $state(null);
	let loading = $state(true);
	let error = $state(false);

	// URLが変更されるたびにAPIを叩いてOGPを取得する
	async function fetchOgp(targetUrl: string) {
		loading = true;
		error = false;
		ogpData = null;

		try {
			const endpoint = resolve("/api/ogp");
			const res = await fetch(
				`${endpoint}?url=${encodeURIComponent(targetUrl)}`,
			);
			if (!res.ok) throw new Error("Fetch failed");

			const data = await res.json();
			if (data.error) throw new Error(data.error);

			ogpData = data;
		} catch (e) {
			console.error(e);
			error = true;
		} finally {
			loading = false;
		}
	}

	// URL propsが変化した際に再実行するリアクティブステートメント
	$effect(() => {
		if (url) {
			fetchOgp(url);
		}
	});
</script>

{#if loading}
	<div class="embed-link skeleton">読み込み中...</div>
{:else if error}
	<!-- エラー時は通常のテキストリンクとしてフォールバック -->
	<a
		href={url}
		target="_blank"
		rel="noopener noreferrer"
		class="embed-link fallback"
	>
		{title || url}
	</a>
{:else if ogpData}
	<a
		href={ogpData.url}
		target="_blank"
		rel="noopener noreferrer"
		class="embed-link card"
	>
		{#if ogpData.image}
			<div class="card__image">
				<img src={ogpData.image} alt={ogpData.title} />
			</div>
		{/if}
		<div class="card__content">
			<div class="card__main">
				<h3 class="card__title">{ogpData.title}</h3>
				{#if ogpData.description}
					<p class="card__description">
						{ogpData.description}
					</p>
				{/if}
			</div>
			<span class="card__domain"
				>{new URL(ogpData.url).hostname}</span
			>
		</div>
	</a>
{/if}

<style lang="scss">
	.embed-link {
		display: block;
		text-decoration: none;
		font-family: sans-serif;
		margin: 1.5rem 0;

		&.skeleton {
			padding: 2rem;
			text-align: center;
			padding: 2rem;
			background-color: #f3f4f6;
			border-radius: 8px;
			color: #9ca3af;
		}

		&.fallback {
			text-decoration: underline;
		}
	}

	.card {
		display: flex;
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		transition: background-color 0.2s ease;
		height: 120px;

		&:hover {
			background-color: rgba(255, 255, 255, 0.05);
		}

		&__image {
			flex-shrink: 0;
			width: 220px;
			height: 100%;
			background-color: white;
			border-radius: 8px 0 0 8px;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				display: block;
				border-radius: 8px 0 0 8px;
			}
		}

		&__content {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 10px 14px;
			overflow: hidden;
			flex: 1;
			min-width: 0;
		}

		&__main {
			display: flex;
			flex-direction: column;
			gap: 4px;
			overflow: hidden;
		}

		&__title {
			margin: 0;
			font-size: 0.95rem;
			line-height: 1.35;
			font-weight: bold;
			color: var(--primary-color);
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&__description {
			margin: 0;
			font-size: 0.8rem;
			line-height: 1.4;
			color: var(--secondary-color);

			display: -webkit-box;
			line-clamp: 2;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		&__domain {
			font-size: 0.75rem;
			color: #9ca3af;
			margin-top: 4px;
		}
	}

	// スマホ表示用のレスポンシブ対応
	@media (max-width: 600px) {
		.card {
			flex-direction: column;
			height: auto;

			&__image {
				width: 100%;
				height: 150px;
				border-right: none;
			}
		}
	}
</style>
