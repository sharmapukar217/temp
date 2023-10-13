<script lang="ts">
  import { onMount } from 'svelte';
  import Tag from "$lib/components/Tag.svelte";
  import Meta from "$lib/components/Meta.svelte";
  import Main from "$lib/components/Main.svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  export let data;
</script>

<Meta title="Tags" description="All the tags used in the blog posts..." />

<Header activeNav="tags" />
<Main pageTitle="Tags">
  {#if data.tags.length}
    <p class="mb-6 mt-2 italic">All the tags used in the blog posts...</p>
    <ul>
      {#each data.tags as tag}
        <Tag name={tag} size="lg" />
      {/each}
    </ul>
  {:else}
    <p class="text-sm font-medium mt-2">No tags found to show!</p>
  {/if}
</Main>
<Footer />
