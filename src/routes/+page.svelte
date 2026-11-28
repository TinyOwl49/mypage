<script lang="ts">
    import { asset, resolve } from "$app/paths";
    import { SITE_DESCRIPTION, SITE_NAME } from "#lib";
    import ArticleList from "#lib/components/ArticleList.svelte";
    import DiaryCard from "#lib/components/DiaryCard.svelte";
    import PopUpText from "#lib/components/PopUpText.svelte";
    import ZoomableImage from "#lib/components/ZoomableImage.svelte";

    let { data } = $props();
    let latestDiary = $derived(data.latestDiary);
</script>

<!-- TODO: 隠しページ -->
<!-- 特定の画像をクリックすると開ける。転移時にマリオ 64 の波みたいなエフェクトとワープ BGM が流れる -->

<svelte:head>
    <title>nyanowl</title>
    <meta name="description" content="nyanowl.meです" />
    <meta name="og:title" content={SITE_NAME} />
    <meta name="og:description" content={SITE_DESCRIPTION} />
</svelte:head>

<main>
    <div class="profile">
        <img
            class="profile__icon"
            src={asset("imgs/icon.jpg")}
            alt="アイコン"
        />
        <div class="profile__side">
            <div>
                <p class="profile__description">
                    数学, 物理, コンピュータが好きです。 専攻は情報科学です。<br
                    />
                    お絵描きとつくるを頑張りたいです。
                </p>
            </div>
            <div class="linklist">
                <a
                    href="https://misskey.io/@tinyowl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="linklist__item"
                >
                    <img
                        src={asset("logo/misskey.png")}
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
                        src={asset("logo/pixiv.png")}
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
                    好きな動画 2
                </a>
            </div>
        </div>
    </div>
    <div class="drawing">
        <img
            src="https://img.nyanowl.me/diary/2026/11/shimauma_modoki-98e54cc5.webp"
            alt="サバンナシマシマオオナメクジ"
        />
        <img
            src="https://img.nyanowl.me/diary/2026/11/Dhole-e72afbba.webp"
            alt="お昼寝ドール"
        />
        <img
            src="https://img.nyanowl.me/diary/2026/11/kaban_cute-5909dffb.webp"
            alt="生まれたばかりのかばんちゃん"
        />
        <img
            src=" https://img.nyanowl.me/diary/2026/11/omg_kemono-b31820c2.webp"
            alt="おーまいがー"
        />
        <img
            src="https://img.nyanowl.me/diary/2026/10/sa-baru-b3c70701.webp"
            alt="サーバル 例の顔"
        />
        <img
            src="https://img.nyanowl.me/diary/araisan-847f16cc.webp"
            alt="どこかに迷い込んでしまったアライさん"
        />
    </div>

    <div class="content">
        <div class="article">
            <ArticleList small />
            <span><a href={resolve("/blog")}> → 一覧 </a></span>
        </div>
        <div class="side">
            <div class="diary">
                <h2>最近の日記</h2>
                <DiaryCard diary={latestDiary} small />
            </div>
            <span>
                <a
                    href={resolve("/diary")}
                    style="position: relative; left: 10px; top: 2px;"
                    >日記 一覧</a
                >
            </span>
            <div class="now-playing">
                <PopUpText
                    text="Now　聴いてる♫"
                    style="margin: 10px 0; color: skyblue; font-weight: bold;"
                />
                {@html `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/track/7lrxDKr8QXLOzh5IKQ04eS?utm_source=generator&si=b94f212a8b504193" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`}
            </div>
        </div>
        <div class="gallery">
            <img
                src="https://img.nyanowl.me/diary/2026/11/kemono_loop-2c72eabc.webp"
                width="250px"
                alt="くるくるサーバル"
            />

            <div>
                <div class="corner-b">
                    <a href="https://dic.pixiv.net/a/B%E6%A1%88">
                        <img
                            src="https://img.nyanowl.me/diary/2026/11/B-71071a43.webp"
                            alt="B案"
                        />
                    </a>
                </div>
                <p class="congratiration-b">おめでとう！</p>
            </div>
        </div>
    </div>

    <div class="picture">
        <ZoomableImage
            src="https://img.nyanowl.me/diary/2026/11/image9-b7eae6d4.webp"
            height="250px"
            alt="森"
        />
        <ZoomableImage
            src="https://img.nyanowl.me/diary/2026/10/1-d2dd2fe3.webp"
            height="250px"
            alt="ブロッコリー"
        />
        <ZoomableImage
            src="https://img.nyanowl.me/diary/2026/10/名称未設定-f69d1ab9.webp"
            height="250px"
            alt="最近の思い出"
        />
        <ZoomableImage
            src="https://img.nyanowl.me/diary/2026/10/screen1-2d70ca6e.webp"
            height="250px"
            alt="風景"
        />
        <ZoomableImage
            src="https://img.nyanowl.me/diary/2026/10/p5js_create-ea6f0f0b.webp"
            height="250px"
            alt="風景2"
        />
        <ZoomableImage
            src="https://img.nyanowl.me/diary/2026/11/soradane3-eed22b9e.webp"
            height="250px"
            alt="空だね"
        />
    </div>
</main>

<style lang="scss">
    .profile {
        display: flex;
        flex-direction: columns;
        gap: 1rem;
        margin: 2rem;

        &__side {
            display: block;
        }
        &__icon {
            max-width: 150px;
            border-radius: 5px;
        }
        &__description {
            margin: 0.5rem 0 0 0;
            font-size: 1rem;
            color: var(--text-color);
        }
    }

    .linklist {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        margin: 1rem 0;

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

        font-size: 0.7rem;
    }

    .drawing,
    .picture {
        display: flex;
        justify-items: flex-start;
        overflow: auto;
        margin: 20px auto;
    }

    .drawing > img {
        height: 300px;
    }

    .corner-b {
        border: 10px ridge darkorchid;
        width: 150px;
        margin: 0 auto;
    }

    .corner-b > a > img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .congratiration-b {
        color: purple;
        font-size: 0.9rem;
        font-weight: bold;
        text-align: center;
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

    .content {
        display: flex;
        justify-content: space-around;
        margin-top: 3rem;
    }

    $article-width: 45%;
    .article {
        width: $article-width;
    }

    .side {
        display: block;
    }

    .gallery {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2rem;
    }

    .now-playing {
        margin: 20px 0;
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
