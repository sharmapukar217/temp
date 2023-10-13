<script lang="ts">
  import Header from "$lib/components/Header.svelte";
  import Markdown from "svelte-markdown";
  import Image from "$lib/components/Image.svelte";
    import Blockquote from "$lib/components/Blockquote.svelte";

  export let data;
</script>

<Header activeNav="about" />

<main id="main-content" class="mx-auto min-h-screen w-full max-w-3xl px-4 py-6 pt-12">
  {#if data.about}
  <article id="article" class="prose mx-auto mt-8 max-w-3xl">
    <!-- <hr /> -->

    <Markdown 
      source={data.about.attributes.content} 
      renderers={{ image: Image, blockquote: Blockquote }}/>
    />
  </article>
  
  {/if}
</main>

