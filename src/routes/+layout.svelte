<script lang="ts">
    import { page } from "$app/state";
    import { resolve } from "$app/paths";
    import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "#lib";
    import "../app.scss";
    import "katex/dist/katex.min.css";

    let { children } = $props();

    // 記事・日報ページではサムネイル画像をOGP画像として使う
    const ogImage = $derived(
        page.data?.post?.thumbnail
            ? new URL(page.data.post.thumbnail, SITE_URL).href
            : DEFAULT_OG_IMAGE,
    );
    const canonicalUrl = $derived(`${SITE_URL}${page.url.pathname}`);
</script>

<svelte:head>
    <!-- TODO: faviconを変える -->
    <link rel="icon" href={DEFAULT_OG_IMAGE} />
    <link rel="canonical" href={canonicalUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={SITE_NAME} />
    <meta property="og:image" content={ogImage} />
    <meta name="twitter:image" content={ogImage} />
    <meta property="og:url" content={canonicalUrl} />
    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

{@render children()}

<footer>
    <a href={resolve("/")}>ホームに戻る？</a>
    <span>
        &copy; {new Date().getFullYear()} nekofukurouinu's mypage . All rights reserved.
    </span>
</footer>

<style lang="scss">
    footer {
        display: flex;
        justify-content: center;
        margin-top: 4rem;
        color: var(--secondary-color);
        font-size: 0.8rem;
        gap: 1rem;
    }
</style>
