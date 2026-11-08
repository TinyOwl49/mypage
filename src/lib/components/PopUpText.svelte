<script lang="ts">
    import type { HTMLAttributes } from "svelte/elements";
    type Props = HTMLAttributes<HTMLDivElement> & {
        text: string;
    };

    let { text, ...restProps }: Props = $props();
    let textList = $derived(text.split(""));
</script>

<div class="pop" {...restProps}>
    {#each textList as t, i}
        <span style={"--i:" + i}>{t}</span>
    {/each}
</div>

<style>
    .pop span {
        display: inline-block;
        opacity: 0;
        animation: pop-loop 3s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
        animation-delay: calc(var(--i) * 0.08s);
    }

    @keyframes pop-loop {
        0% {
            opacity: 0;
            transform: translateY(1em);
        }
        15% {
            opacity: 1;
            transform: translateY(0);
        }
        80% {
            opacity: 1;
            transform: translateY(0);
        }
        95%,
        100% {
            opacity: 0;
            transform: translateY(0);
        }
    }

    @keyframes pop-up {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>
