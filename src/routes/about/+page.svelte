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
        <div>
            <h1 class="profile__title">猫梟犬</h1>
            <p class="profile__description">
                大学生です。 数学, 物理, コンピュータが好きです。
                専攻は情報科学です。<br />
            </p>
        </div>
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
</main>

<style lang="scss">
    main {
        margin: 0 auto;
        text-align: center;
    }

    .profile {
        &__icon {
            max-width: 400px;
        }
        &__title {
            font-size: 1.5rem;
            margin: 0;
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
        justify-content: center;
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
