<script lang="ts">
  import Breadcrumbs from "./Breadcrumbs.svelte";

  export let pageTitle: string;
  export let pageDesc: string | undefined = undefined;
</script>

<Breadcrumbs />
<main id="main-content" class="mx-auto w-full max-w-3xl px-4 pb-12">
  <h1 class="text-2xl font-semibold sm:text-3xl">{pageTitle}</h1>
  {#if pageDesc}
    <p class="mb-6 mt-2 italic">{pageDesc}</p>
  {/if}
  <slot />
</main>
