<script>
    let textList = $state("こんにちは、世界".split(""));
</script>

<div class="pop">
    {#each textList as text, i}
        <span style={"--i:" + i}>{text}</span>
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
