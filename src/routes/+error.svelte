<script lang="ts">
    import { page } from "$app/state";
</script>

<main>
    <img class="icon" src="/imgs/omg.webp" alt="hello" />
    <h1>{page.status}</h1>
    <p>{page.error?.message || "ページが見つかりません"}</p>
</main>

<style>
    main {
        margin: 0 auto;
        width: 60%;
    }

    .icon {
        width: 100%
    }
</style>
