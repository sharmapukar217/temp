<script lang="ts">
  import { page } from "$app/stores";

  import { searchBlog } from "./lib";
  import { SITE } from "$lib/utilities/config";
  import Main from "$lib/components/Main.svelte";
  import Card from "$lib/components/Card.svelte";
  import Meta from "$lib/components/Meta.svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import SubscribeForm from "$lib/components/SubscribeForm.svelte";

  const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
  };

  const handleInput = debounce((ev: any) => {
    query = "";
    const value = ev.target.value;

    if (value.trim().length > 1) {
      query = value;
      searchBlog({ query }).then((result) => {
        data.searchResults = result;
      });
    }
  });

  export let data;

  $: query = $page.url.searchParams.get("query");
  $: searchResults = data.searchResults ?? [];
</script>

<Meta title={query ? `Search results for \`${query}\`` : "Search for the blogs"} />

<Header activeNav="search" />
<Main pageTitle="Search" pageDesc="Search any article ...">
  <form method="GET" action="/search" id="search-form">
    <label class="relative block">
      <span class="absolute inset-y-0 left-0 flex items-center pl-2 opacity-75">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" />
        </svg>
      </span>
      <div class="inline-flex items-center space-x-3 w-full">
        <input
          class="block w-full rounded border border-skin-fill
        border-opacity-40 bg-skin-fill py-3 pl-10
        pr-3 placeholder:italic placeholder:text-opacity-75
        focus:border-skin-accent focus:outline-none"
          placeholder="Search for anything..."
          type="search"
          name="query"
          value={query}
          autocomplete="off"
          on:input={handleInput} />
        <button class="text-sm font-medium">Search</button>
      </div>
    </label>
  </form>

  {#if query}
    <div class="mt-8">
      Found {searchResults.length}
      {searchResults.length === 1 ? " result" : " results"}{" "}
      for '{query}'
    </div>
  {/if}

  {#if searchResults?.length}
    <ul>
      {#each data.searchResults as result (result.id)}
        <Card href="/posts/{result.attributes.slug}" data={result.attributes} noDivide={false} />
      {/each}
    </ul>
  {/if}
</Main>
<SubscribeForm noDivide={searchResults?.length} />
<Footer />
