<script lang="ts">
  import { page } from "$app/stores";
  import Meta from "$lib/components/Meta.svelte";
  import Card from "$lib/components/Card.svelte";
  import Main from "$lib/components/Main.svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  export let data;
  $: tag = $page.params.tag;
</script>

<Meta title="Tag: #{tag}" />

<Header activeNav="tags" />
<Main pageTitle="Tag: #{tag}">
  {#if data.posts?.length}
    <p class="mb-6 mt-2 italic">All the posts &amp; articles with the `#{tag}`</p>
    <ul>
      {#each data.posts as post (post.attributes.slug)}
        <Card href="/posts/{post.attributes.slug}" data={post.attributes} />
      {/each}
    </ul>
  {:else}
    <p class="text-sm font-medium mt-2">No posts found with `#{tag}`</p>
  {/if}
</Main>
<Footer />
