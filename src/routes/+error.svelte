<script lang="ts">
    import { page } from "$app/state";

    let imageList = [
        "/imgs/omg_kemono.webp",
        "/imgs/heshi.webp"
    ]

    const randindex = Math.floor(Math.random() * imageList.length);
    let image = imageList[randindex];
</script>

<main>
    <img class="icon" src={image} alt="hello" />
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
