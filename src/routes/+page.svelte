<script lang="ts">
    import { asset, resolve } from "$app/paths";
    import { SITE_DESCRIPTION, SITE_NAME } from "$lib";
    import ArticleList from "$lib/components/ArticleList.svelte";
    import DiaryCard from "$lib/components/DiaryCard.svelte";

    let { data } = $props();
    let latestDiary = $derived(data.latestDiary);
</script>

<svelte:head>
    <title>fukuneko mypage</title>
    <meta name="description" content="猫梟犬のマイページです" />
    <meta name="og:title" content={SITE_NAME} />
    <meta name="og:description" content={SITE_DESCRIPTION} />
</svelte:head>

<main>
    <div class="content">
        <div class="article">
            <h2>ブログ記事</h2>
            <ArticleList />
            <span><a href={resolve("/blog")}> → 一覧 </a></span>
        </div>
        <div class="side">
            <img class="photo" src="/imgs/omg.webp" alt="空の写真" />
            <div class="diary">
                <h2>最近の日記</h2>
                <DiaryCard diary={latestDiary} small />
            </div>
        </div>
    </div>
</main>

<style lang="scss">
    $article-width: 65%;
    .article,
    .diary {
        margin: 0 20px 30px 20px;
        width: $article-width;
    }
    .content {
        display: flex;
    }

    .photo {
        position: relative;
        right: 50px;
        max-width: 500px;
        margin: 0;
    }

    @media (max-width: 640px) {
        main {
            width: 100%;
            border-radius: 20px;
        }
        .content {
            display: flex;
            flex-direction: column;
        }
        .article {
            width: auto;
            margin: 0 15px 20px 15px;
        }
    }
</style>
