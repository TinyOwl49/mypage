<script>
    import { asset } from "$app/paths";
</script>

<svelte:head>
    <title>About Me</title>
    <meta name="description" content="自己紹介！" />
    <meta name="og:title" content="About Me" />
    <meta name="og:description" content="自己紹介！" />
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
</main>

<style lang="scss">
    main {
        margin: 0 auto;
        width: 100%;
        padding: 20px 0;
    }

    .profile {
        display: flex;
        flex-direction: columns;
        gap: 1rem;
        margin-bottom: 5rem;

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
</style>
