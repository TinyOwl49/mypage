<script lang="ts">
	import { asset, resolve } from "$app/paths";
	import type { Diary } from "$lib/diary";
	import { formatDate } from "$lib/date";

	type Props = {
		diary: Diary;
		small?: boolean;
	};
	let { diary, small }: Props = $props();
</script>

<div class="diary-card" class:small>
	{#if diary.thumbnail}
		<img
			class="thumbnail"
			class:small
			src={asset(diary.thumbnail as any)}
			alt={diary.title}
		/>
	{:else}
		<div class="thumbnail thumbnail--empty" class:small aria-hidden="true"></div>
	{/if}
	<a
		class="link"
		href={resolve(`/diary/[slug]`, { slug: diary.slug })}
	>
		<p class="meta">
			{formatDate(new Date(diary.date)) || ""}
		</p>
		<h2 class="title">
			{diary.title}
		</h2>
		<p class="description" class:small>
			{diary.description}
		</p>
	</a>
</div>

<style lang="scss">
	a.link {
		color: var(--primary-color);
		text-decoration: none;
	}

	.diary-card {
		padding: 10px 20px;
		border: 1px solid var(--border-color);
		border-radius: 5px;
		display: flex;

		&:hover {
			background-color: var(--hover-background-color);
		}

		&.small {
			padding: 5px 10px;

			.title {
				font-size: 1.05rem;
			}

			.description {
				font-size: 0.8rem;
			}
		}
	}

	.title {
		font-size: 1.4rem;
		margin: 0.2rem 0;
	}

	.thumbnail {
		object-fit: cover;
		border-radius: 5px;
		flex-shrink: 0;

		width: 120px;
		height: 120px;
		margin: auto 15px auto 0;
		&.small {
			width: 80px;
			height: 80px;
		}
	}

	// サムネイル未設定時のプレースホルダー（No Image の代わり）
	.thumbnail--empty {
		background-color: rgba(0, 0, 0, 0.18);
	}

	.description {
		margin: 0.5rem 0;
	}

	.meta {
		font-size: 0.8rem;
		color: var(--secondary-color);
		margin: 0;
	}
</style>
