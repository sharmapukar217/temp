<script lang="ts">
  import Datetime from "$lib/components/Datetime.svelte";
  import { PUBLIC_STRAPI_BASE_URL } from "$env/static/public";

  export let data;
</script>

<div class="flex flex-col">
  <div class="blog-post w-full h-[400px] mb-2 flex rounded-md relative ">
    {#if data.featured} 
      <span class="absolute top-5 right-8 inline-flex items-center py-1 px-1.5 text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-green-100 text-green-800">Featured</span>
    {/if}
    
    {#if data.cover_image?.data}
    {@const src = PUBLIC_STRAPI_BASE_URL + data.cover_image.data.attributes.url}
    {#if data.cover_image.data.attributes.mime.startsWith("image")}
      <img class="rounded-md w-full h-full" {src} alt={data.cover_image.data.attributes.name} />
      {:else}
      <video class="rounded-md" {src} />
    {/if}
    {/if}
  </div>
  <Datetime datetime={data.publishedAt} size="sm" class="mt-1" />
  <div class="line-clamp-2 mt-2">
    <a href="/posts/{data.slug}" class="text-xl font-semibold">{data.title}
    {#if data.subtitle}: 
      {data.subtitle}
    {/if}
    </a>
  </div>
  <div class="line-clamp-2 prose text-ellipsis w-[90%] mt-1">
    {#if data.description}
      <h2 class="font-light text-sm text-gray-500">{data.description}</h2>
    {/if}
  </div>
</div>

<style>

  @media screen and (max-width: 600px){
    .blog-post{
      height: 300px !important;
    }
  }
  
</style>