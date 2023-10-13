<script lang="ts">
  import { PUBLIC_STRAPI_BASE_URL } from "$env/static/public";

  import Markdown from "svelte-markdown";
  import { SITE } from "$lib/utilities/config";
  import Meta from "$lib/components/Meta.svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Datetime from "$lib/components/Datetime.svelte";
  import Image from "$lib/components/Image.svelte";

  export let data;
  $: post = data?.post?.attributes;
</script>

<Meta
  title={post.title}
  description={post.description}
  openGraph={{
    title: SITE.name,
    url: SITE.website,
    site_name: SITE.name,
    description: SITE.description,
    images: [
      {
        alt: `${SITE.name} logo`,
        url: `${SITE.website}/logo.svg`
      }
    ],
    article: {
      tags: [post.tags],
      authors: [post.authors],
      publishedTime: post.publishedAt
    }
  }} />

<Header />
<div class="mx-auto flex w-full max-w-3xl justify-start px-2">
  <a
    href="/posts"
    class="focus-outline mb-2 mt-8 flex hover:opacity-75"
    on:click|preventDefault={() => history.back()}>
    <svg xmlns="http://www.w3.org/2000/svg">
      <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
    </svg>
    <span>Go back</span>
  </a>
</div>
<main id="main-content" class="mx-auto w-full max-w-3xl px-4 pb-12">
  <h1 class="text-2xl font-semibold text-skin-accent">{post.title}</h1>
  <Datetime datetime={post.publishedAt} size="lg" class="my-2" />
  {#if post.creator?.data}
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-5 h-5 ml-0.5">
        <path
          fill-rule="evenodd"
          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
          clip-rule="evenodd" />
      </svg>
      <button class="hover:underline decoration-dashed underline-offset-4 decoration-skin-accent"
        >@{post.creator.data.attributes.username}</button>
    </div>
  {/if}

  {#if post.cover_image?.data}
    {@const src = PUBLIC_STRAPI_BASE_URL + post.cover_image.data.attributes.url}
    {#if post.cover_image.data.attributes.mime.startsWith("image")}
      <figure class="my-3 mt-5 text-center">
        <img {src} alt={post.cover_image.data.attributes.alternativeText} />
      </figure>
    {/if}
  {/if}

  <article id="article" class="prose mx-auto mt-8 max-w-3xl">
    <Markdown source={post.content}  renderers={{ image: Image }}/>/>
  </article>

  {#if post.tags}
    <ul class="my-8">
      {#each data.post.attributes.tags as tag (tag)}
        <!-- <Tag name={tag} size="sm" /> -->
      {/each}
    </ul>
  {/if}
</main>
<Footer />
