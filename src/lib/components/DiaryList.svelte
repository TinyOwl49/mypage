<script lang="ts">
	import { getAllDiary } from "$lib/diary";
	import DiaryCard from "$lib/components/DiaryCard.svelte";

	type Props = {
		small?: boolean;
	};
	let { small }: Props = $props();

	const { diaries } = getAllDiary();
</script>

<div class="nippo-list">
	{#each diaries as diary}
		<DiaryCard {diary} {small} />
	{/each}
</div>

<style lang="scss">
	.nippo-list {
		display: flex;
		flex-direction: column;
		width: 100%;

		@if small {
			gap: 0.5rem;
		} @else {
			gap: 1rem;
		}
	}
</style>
