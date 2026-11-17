<script lang="ts">
    import { formatDate } from "#lib/date.ts";
    import { asset, resolve } from "$app/paths";

    let { data } = $props();
    const post = $derived(data.post);
    const next = $derived(data.next);
    const previous = $derived(data.previous);
    const ContentComponent = $derived(post.content);
</script>

<svelte:head>
    <title>{post.title}</title>
    <meta name="description" content={post.description} />
    <meta name="og:title" content={post.title} />
    <meta name="og:description" content={post.description} />
</svelte:head>

<main>
    <article>
        <div class="head">
            {#if post.thumbnail}
                <img
                    class="head__thumbnail"
                    src={post.thumbnail}
                    alt={post.title}
                />
            {/if}
            <h1 class="head__title">{post.title}</h1>
            <p class="head__description">
                {post.description}
            </p>
            <p class="head__meta">
                {formatDate(new Date(post.date))}
            </p>
        </div>
        <div class="prose article-content">
            <ContentComponent />
        </div>
    </article>

    <div class="goto">
        {#if previous}
            <a href={resolve("/diary/[slug]", { slug: previous })}>前の日記</a>
        {:else}
            <span>前の日記</span>
        {/if}
        {#if next}
            <a href={resolve("/diary/[slug]", { slug: next })}>次の日記</a>
        {:else}
            <span>次の日記</span>
        {/if}
    </div>
</main>

<style lang="scss">
    main {
        width: 55%;
        margin: 0 auto;
    }

    .article-content {
        font-size: 1.2rem;

        :global(p > img) {
            max-width: 100%;
            height: auto;
        }
    }

    .head {
        margin-bottom: 10vh;
        &__title {
            text-align: center;
            font-size: 2rem;
            margin-bottom: 2rem;
        }
        &__description {
            text-align: center;
            font-size: 1.1rem;
        }
        &__meta {
            text-align: center;
            font-size: 0.9rem;
            color: var(--secondary-color);
            margin: 0.2rem 0;
        }
        &__thumbnail {
            display: block;
            margin: 0 auto;
            max-width: 100%;
            max-height: 50vh;
            border-radius: 5px;
        }
    }

    .goto {
        display: flex;
        margin-top: 4rem;
        justify-content: space-around;
    }

    .goto > span {
        color: var(--secondary-color);
    }

    @media (max-width: 640px) {
        main {
            width: 100%;
        }

        .head {
            margin-bottom: 3rem;
            &__title {
                font-size: 1.5rem;
                margin-bottom: 1.2rem;
            }
        }
    }
</style>
