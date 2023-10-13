<script lang="ts">
  import { page } from "$app/stores";

  // Remove current url path and remove trailing slash if exists
  const currentUrlPath = $page.url.pathname.replace(/\/+$/, "");

  // Get url array from path
  // eg: /tags/tailwindcss => ['tags', 'tailwindcss']
  const breadcrumbList = currentUrlPath.split("/").slice(1);

  // run reactively based on page change
  $: {
    const pageNumber = $page.url.searchParams.get("page") ?? "1";

    // if breadcrumb is Home > Posts > 1 <etc>
    // replace Posts with Posts (page number)
    if (breadcrumbList[0] === "posts") {
      breadcrumbList[1] = `Posts (page ${pageNumber})`;
    }
  }
</script>

<nav class="breadcrumb" aria-label="breadcrumb">
  <ul>
    <li>
      <a href="/">Home</a>
      <span aria-hidden="true">&#62;</span>
    </li>
    {#each breadcrumbList as breadcrumb, index}
      {#if index + 1 === breadcrumbList.length}
        <li>
          <span aria-current="page" class={index > 0 ? "lowercase" : "capitalize"}>
            {breadcrumb}
          </span>
        </li>
      {:else}
        <li>
          <a href="/{breadcrumb}">{breadcrumb}</a>
          <span aria-hidden="true">&#62;</span>
        </li>
      {/if}
    {/each}
  </ul>
</nav>

<style type="text/postcss">
  .breadcrumb {
    @apply mx-auto mb-1 mt-8 w-full max-w-3xl px-4;
  }
  .breadcrumb ul li {
    @apply inline;
  }
  .breadcrumb ul li a {
    @apply capitalize opacity-70;
  }
  .breadcrumb ul li span {
    @apply opacity-70;
  }
  .breadcrumb ul li:not(:last-child) a:hover {
    @apply opacity-100;
  }
</style>
