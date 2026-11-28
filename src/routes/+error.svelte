<script lang="ts">
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";
    import { page } from "$app/state";

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === "Enter" && !e.isComposing) {
            goto(resolve("/"));
        }
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="blue-screen">
    <div class="blue-screen__title">nyanowl</div>
    <p></p>
    <span class="blue-screen__text">
        An error has occurred. To continue: <br />
        Press Enter to return to Home, or<br />
        Press
        <span class="whitefill">全部壊すボタン</span> to restart your computer.
        If you do this, you will lose any unsaved information in all open
        applications.
        <br /><br />
        Error code: {page.status} - {page.error?.message || "Page Not found"}
    </span>
</div>

<style lang="scss">
    :global(body:has(.blue-screen)) {
        background-color: mediumblue;
        height: 100vh;
    }

    .blue-screen {
        color: #eee;
        font-family: var(--retro-font);
        height: 80vh;
        padding: 20px 18%;
        overflow-wrap: break-word;
        padding-top: 20vh;

        &__title {
            font-size: 1.4rem;
            font-weight: bold;
            background-color: #aaa;
            color: mediumblue;
            width: 100px;
            text-align: center;
            margin: 0 auto;
        }

        &__text {
            font-size: 1.4rem;
            width: 60%;
            margin: 0 auto;
        }
    }

    .whitefill {
        background-color: #eee;
        color: #eee;
    }
</style>
