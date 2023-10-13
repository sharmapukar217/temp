<script lang="ts">
  import { clsx } from "clsx";
  import { page } from "$app/stores";
  import { SITE } from "$lib/utilities/config";
  import Meta from "$lib/components/Meta.svelte";
  import Card from "$lib/components/Card.svelte";
  import Main from "$lib/components/Main.svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import LinkButton from "$lib/components/LinkButton.svelte";

  let totalPages = 10;

  export let data;

  $: totalPages = data.pagination?.pageCount ?? 0;
  $: pageNum = parseInt($page.url.searchParams.get("page") ?? "1");

  $: prev = pageNum > 1 ? "" : "disabled";
  $: next = pageNum < totalPages ? "" : "disabled";
</script>

<Meta title="Blogs" />
<Header activeNav="posts" />
<Main pageTitle="Posts">
  {#if data.posts?.length}
    <p class="mb-6 mt-2 italic">All the posts &amp; articles we have posted so far...</p>
    <ul>
      {#each data.posts as post (post.attributes.slug)}
        <Card href="/posts/{post.attributes.slug}" data={post.attributes} noDivide={false} />
      {/each}
    </ul>
  {:else}
    <p class="text-sm font-medium mt-2">No posts found to show!</p>
  {/if}
</Main>

{#if totalPages > 1}
  <nav class="mb-8 mt-auto flex justify-center" aria-label="Pagination" id="posts-pagination">
    <LinkButton
      disabled={prev === "disabled"}
      href={`/posts${pageNum - 1 !== 1 ? "?page=" + (pageNum - 1) : ""}`}
      class="mr-4 select-none {prev}"
      ariaLabel="Previous">
      <svg xmlns="http://www.w3.org/2000/svg" class="{prev}-svg">
        <path
          d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z" />
      </svg>
      Prev
    </LinkButton>
    <LinkButton
      disabled={next === "disabled"}
      href={`/posts?page=${pageNum + 1}`}
      class="ml-4 select-none {next}"
      ariaLabel="Next">
      Next
      <svg xmlns="http://www.w3.org/2000/svg" class="{next}-svg">
        <path
          d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z" />
      </svg>
    </LinkButton>
  </nav>
{/if}

<Footer noMarginTop={totalPages > 1} />
