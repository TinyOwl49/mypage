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
    <div class="me">
        <img
            class="me__icon"
            src={asset("/imgs/icon.jpg")}
            alt="猫梟犬のアイコン"
        />
        <div>
            <h1 class="me__title">猫梟犬</h1>
            <p class="me__description">
                日本の大学生です。数学, 物理, コンピュータが好きです。<br />
            </p>
            <a class="me__to-about" href={resolve("/about")}>→ About Me</a>
        </div>
    </div>

    <div class="content">
        <div class="diary">
            <h2>最近の日記</h2>
            <DiaryCard diary={latestDiary} small />
        </div>
        <div class="article">
            <h2>ブログ記事</h2>
            <ArticleList />
            <span><a href={resolve("/blog")}> → 一覧 </a></span>
        </div>
    </div>
</main>

<style lang="scss">
    main {
        width: 70%;
        margin: 0 auto;
    }

    .me {
        display: flex;
        align-items: center;
        gap: 25px;
        margin: 4rem 25px;
        padding: 0;

        &__title {
            font-family: "Mochiy Pop One", sans-serif;
            font-size: 2rem;
            margin: 0;
        }
        &__description {
            margin: 5px 0;
        }
        &__icon {
            width: 130px;
            height: 130px;
            border-radius: 50%;
        }
        &__to-about {
            text-decoration: none;
            color: var(--moon-color);
        }
    }

    $article-width: 65%;
    .article, .diary {
        margin: 0 20px 30px 20px;
        width: $article-width;
    }

    @media (max-width: 640px) {
        main {
            width: 100%;
            border-radius: 20px;
        }
        .me {
            gap: 15px;
            margin: 20px 15px;

            &__icon {
                width: 80px;
                height: 80px;
            }
            &__title {
                font-size: 1.5rem;
            }
        }
        .content {
            flex-direction: column;
        }
        .article {
            width: auto;
            margin: 0 15px 20px 15px;
        }
    }
</style>
