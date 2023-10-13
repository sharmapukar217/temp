<script lang="ts">
  import { PUBLIC_STRAPI_BASE_URL } from "$env/static/public";
  import { SITE } from "$lib/utilities/config";
  import Meta from "$lib/components/Meta.svelte";
  import Markdown from "svelte-markdown";
  import Datetime from "$lib/components/Datetime.svelte";
  import Image from "$lib/components/Image.svelte";
  import Form from "$lib/components/Form.svelte";
  import Avatar from "$lib/components/Avatar.svelte";
  import { dateFormatter } from "$lib/utilities/helper.js";
  import Blockquote from "$lib/components/Blockquote.svelte";

  export let data;
  $: post = data.post?.attributes;
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


<div class="mx-auto inline-flex w-full max-w-3xl justify-start px-2 md:mt-6">
  <a
    href="/"
    class="focus-outline mb-2 mt-8 hover:opacity-75 inline-flex items-center"
    on:click|preventDefault={() => history.back()}>
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
      <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
    </svg>
    <span>Go back</span>
  </a>
</div>

<main id="main-content" class="mx-auto w-full max-w-3xl mt-4 pb-1 px-4 pb-12">
  <h1 class="text-2xl font-semibold text-skin-accent">{post.title}</h1>
  
  <div class="flex flex-row gap-x-5">
    <Datetime datetime={post.publishedAt} size="lg" class="mt-2" />
    {#if post.creator?.data}
      <div class="inline-flex items-center space-x-2 -mx-1">
        <button class="underline mt-2 decoration-dashed underline-offset-4 decoration-skin-accent"
          >@{post.creator.data.attributes.username}</button>
      </div>
    {/if}
  </div>

  <div class="mt-8">
    {#if post?.cover_image?.data}
    {@const src = PUBLIC_STRAPI_BASE_URL + post.cover_image.data.attributes.url}
    {#if post.cover_image.data.attributes.mime.startsWith("image")}
      <img class="rounded-md w-full h-full" {src} alt={post.cover_image.data.attributes.name} />
      {:else}
      <!-- svelte-ignore a11y-media-has-caption -->
      <video class="rounded-md" {src} />
    {/if}
  {/if}
  </div>

  <article id="article" class="prose mx-auto mt-8 max-w-3xl">
    <!-- <hr /> -->

    <Markdown 
    source={post.content} 
    renderers={{ image: Image, blockquote: Blockquote }}/>

  </article>

  {#if post.tags}
  <strong class="me-2">Tags:</strong>
    <ul class="my-8 inline-flex items-center space-x-1">
      {#each data.post.attributes.tags as tag, index (tag)}
        <li class="text-gray-600">
          {#if index === data.post.attributes.tags.length - 1}
            {tag}
            {:else}
            {tag},
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</main>

<main id="form-content" class="mx-auto w-full max-w-3xl pb-12">
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 lg:py-16 mx-auto max-w-screen-md">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-left text-gray-900 dark:text-white">Post a comment</h2>
        <p class="mb-8 lg:mb-16 font-light text-left text-gray-500 dark:text-gray-400 sm:text-xl">Comment down your thoughts about this blog!</p>
        
        <Form />
    </div>
  </section>
</main>

<main id="list-comments" class="mx-auto w-full max-w-3xl px-5 pb-12">
  {#if true}
  {@const comments_data = post.comments.data}
  <label class="text-2xl font-bold" for="comments">{comments_data.length} {comments_data.length > 1 ? "Comments" : "Comment"}</label>
  {/if}
  <div id="comments">
  {#each post.comments.data as comment (comment)}
    {@const data = comment.attributes}
    <div class="comment pb-10 mt-10 border-b">
      <div class="top flex flex-row gap-x-4 mb-5">
        <div class="left">
          <Avatar fullName={data.full_name} />
        </div>
        <div class="right">
          <span class="font-bold mb-1 text-lg">{data.full_name}</span><br />
          <span class="text-neutral-500 text-sm">{dateFormatter(data.publishedAt)}</span>
        </div>
      </div>
      <div class="bottom">
        <p class="text-zinc-800">{data.description}</p>
      </div>
    </div>
  {/each}
  </div>
</main>