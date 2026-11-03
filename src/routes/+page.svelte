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
    <div class="profile">
        <img
            class="profile__icon"
            src={asset("/imgs/icon.jpg")}
            alt="猫梟犬のアイコン"
        />
        <div class="profile__side">
            <div>
                <h1 class="profile__title">猫梟犬</h1>
                <p class="profile__description">
                    大学生です。 数学, 物理, コンピュータが好きです。
                    専攻は情報科学です。<br />
                    お絵描きとプログラミングを頑張りたいです。
                </p>
            </div>
            <div class="linklist">
                <a
                    href="https://x.com/kasumi_fukurou"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="linklist__item"
                >
                    <img
                        src={asset("/logo/twitter-logo-2429.svg")}
                        alt="Twitter"
                        class="linklist__icon"
                        width="50px"
                        height="50px"
                    />
                </a>
                <a
                    href="https://misskey.io/@tinyowl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="linklist__item"
                >
                    <img
                        src={asset("/logo/misskey.png")}
                        alt="Misskey"
                        class="linklist__icon"
                        width="50px"
                        height="50px"
                    />
                </a>
                <a
                    href="https://www.pixiv.net/users/84645869"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="linklist__item"
                >
                    <img
                        src={asset("/logo/pixiv.png")}
                        alt="Pixiv"
                        class="linklist__icon"
                        style="border-radius: 5px;"
                        width="42px"
                        height="42px"
                    />
                </a>
            </div>
            <div class="favorite">
                <a
                    href="https://music.youtube.com/playlist?list=PLMxJNfstQlp6tqqNx1p1GzT9-iPB3EaHJ"
                    >好きな曲</a
                >
                <a
                    href="https://www.youtube.com/watch?v=0b75cl4-qRE&list=PLMxJNfstQlp5dxeH_ORbG2CCRVGQcbe0S"
                >
                    好きな動画
                </a>
                <a href="https://www.nicovideo.jp/mylist/79417707">
                    好きな動画2
                </a>
            </div>
        </div>
    </div>

    <div class="drawing">
        <img
            src="https://img.nyanowl.me/diary/araisan-847f16cc.webp"
            alt="araisan"
        />
        <img
            src="https://img.nyanowl.me/diary/2026/10/sa-baru-b3c70701.webp"
            alt="sa-baru"
        />
        <img
            src="https://img.nyanowl.me/diary/2026/10/birthday-5e374cf8.webp"
            alt="birthday"
        />
    </div>

    <div class="content">
        <div class="article">
            <ArticleList />
            <span><a href={resolve("/blog")}> → 一覧 </a></span>
        </div>
        <div class="side">
            <img class="photo" src="/imgs/sky.webp" alt="空の写真" />
            <div class="diary">
                <h2>最近の日記</h2>
                <DiaryCard diary={latestDiary} small />
            </div>
            <a href={resolve("/diary")} style="position: relative; left: 30px; bottom: 20px;">日記 一覧</a>
        </div>
    </div>
</main>

<style lang="scss">
    .profile {
        display: flex;
        flex-direction: columns;
        gap: 1rem;
        margin-bottom: 2rem;

        &__side {
            display: block;
        }
        &__icon {
            max-width: 120px;
        }
        &__title {
            font-size: 1.8rem;
        }
        &__description {
            margin: 0.5rem 0 0 0;
            font-size: 1.2rem;
            color: var(--text-color);
        }
    }

    .linklist {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        margin: 2rem 0;

        &__item {
            display: inline-block;
        }
        &__icon {
            display: block;
            animation:
                fly-in 1.4s cubic-bezier(0.22, 0.68, 0.35, 1) both,
                hover-bob 2.6s ease-in-out 1.4s infinite;
        }
        &__item:hover &__icon {
            animation:
                fly-in 1.4s cubic-bezier(0.22, 0.68, 0.35, 1) both,
                flap 0.5s ease-in-out infinite;
        }
    }

    .favorite {
        display: flex;
        gap: 1rem;
    }

    .drawing {
        display: flex;
        justify-items: flex-start;
        overflow: auto;
    }

    .drawing > img {
        height: 400px;
    }

    @keyframes fly-in {
        80% {
            transform: translate(4px, -3px) rotate(-3deg) scale(0.98);
        }
        100% {
            opacity: 1;
            transform: translate(0, 0) rotate(0deg) scale(1);
        }
    }

    @keyframes hover-bob {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-4px);
        }
    }

    @keyframes flap {
        0%,
        100% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-6px) rotate(-8deg);
        }
    }

    $article-width: 65%;
    .article,
    .diary {
        margin: 0 20px 30px 20px;
        width: $article-width;
    }
    .content {
        display: flex;
        margin-top: 3rem;
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
