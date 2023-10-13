<svelte:window bind:innerWidth  />

<script lang="ts">
  import Skeleton from 'svelte-skeleton/Skeleton.svelte'

  // importing components and libs
  import Card from "$lib/components/Card.svelte";
  import Header from "$lib/components/Header.svelte";
  import { SITE } from "$lib/utilities/config.js";
  import { addQueryParamsToURL } from "$lib/utilities/helper.js";
  import { paginate, PaginationNav } from 'svelte-paginate'
  import { fade } from 'svelte/transition';
  import Dropdown from '$lib/components/Dropdown.svelte';

  export let data;
  
  let pageSize = SITE.postPerPage;
  $: currentPage = data.pagination?.page;
  $: paginatedItems = paginate({ items: data.posts, pageSize, currentPage: 1 })

  let isLoading = true;
  $: innerWidth = 0;
  $: contentWidth = innerWidth <= 767 ? innerWidth/1.165 : innerWidth / 2.5;

  // update loading value
  (async () => {
    await new Promise((resolve) => {if (data) resolve(true)});
    isLoading = false;
  })()
</script>

<div class="px-8 md:px-20 py-4 pt-8 md:py-8">
  <div class="inline-flex items-center w-full px-4">
    <p class="text-gray-600">{data.pagination?.total} {data.pagination?.total > 1 ? "Articles": "Article"}</p>

    <div class="inline-flex items-center ml-auto space-x-8">

      <button class="max-md:hidden inline-flex items-center hover:bg-gray-100 px-2 rounded-md">
        <span class="font-medium">Filter</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 ml-1">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
        </svg>
      </button>
      
      <Dropdown />
    </div>
  </div>
  <hr class="my-2 md:hidden" />
  <button class="md:hidden inline-flex items-center">
    <span class="font-medium">Filter</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-5 h-5 ml-1">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
    </svg>
  </button>
</div>

<div class="px-8 md:px-24">
  {#if isLoading}
    <div transition:fade="{{delay: 200, duration: 200}}" class="grid grid-cols-1 w-full gap-14 mb-12 md:grid-cols-2">
    {#each [1, 2, 3, 4] as _ (_)}
        <Skeleton height="410" width="{contentWidth}">
          <rect width="{contentWidth}" height="350" x="0" y="0" rx="12" ry="12" />
          <rect width="{contentWidth}" height="15" x="0" y="365" rx="5" ry="5" />
          <rect width="{contentWidth}" height="15" x="0" y="390" rx="5" ry="5" />
        </Skeleton>
    {/each}
    </div>

    {:else} 

    <div transition:fade="{{delay: 200, duration: 200}}" class="grid grid-cols-1 w-full gap-14 mb-12 md:grid-cols-2">
      {#each paginatedItems as post (post)}
        <Card data={post.attributes} />
      {/each}
    </div>
    
  {/if}
</div>

<div class="px-8 md:px-20 py-4 pt-8 md:py-8 pagination-container">
  <PaginationNav
    totalItems="{data.pagination?.total}"
    pageSize="{pageSize}"
    currentPage="{currentPage}"
    limit="{1}"
    showStepOptions="{false}"
    on:setPage="{(e) => {
      addQueryParamsToURL({page: e.detail.page})
    }}"
  />
</div>