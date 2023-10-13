<script lang="ts">
  import Hr from "./Hr.svelte";
  import Datetime from "./Datetime.svelte";
  import { PUBLIC_STRAPI_BASE_URL } from "$env/static/public";

  export let data: any;
  export let href: string;
  export let as: string = "li";
  export let noDivide: boolean = true;
  export let secHeading: boolean = false;
</script>

<svelte:element this={as} class="my-6">
  <a
    {href}
    class="inline-block text-lg font-medium text-skin-accent decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0">
    {#if secHeading}
      <h2 class="text-lg font-medium decoration-dashed hover:underline line-clamp-2">
        {data.title}
        {#if data.subtitle}: {data.subtitle} {/if}
      </h2>
    {:else}
      <h3 class="text-lg font-medium decoration-dashed hover:underline line-clamp-2">
        {data?.title}
        {#if data.subtitle}: {data.subtitle} {/if}
      </h3>
    {/if}
  </a>
  <div class="mb-2">
    <Datetime size="sm" datetime={data?.publishedAt} />

    {#if data.creator?.data}
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
          >@{data.creator.data.attributes.username}</button>
      </div>
    {/if}
  </div>

  <div class="w-full line-clamp-3">
    {#if data.description}
      <div class="line-clamp-3 mt-1.5">
        <p>{data.description}</p>
      </div>
    {:else}
      <p class="font-medium text-sm">No description provided...</p>
    {/if}
  </div>
</svelte:element>
{#if !noDivide}
  <Hr noPadding />
{/if}
