<script lang="ts">
  import Markdown from "svelte-markdown";
  import { SITE } from "$lib/utilities/config";
  import Main from "$lib/components/Main.svelte";
  import Meta from "$lib/components/Meta.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import SubscribeForm from "$lib/components/SubscribeForm.svelte";

  export let data;
</script>

<Meta title="About us" />

<Header activeNav="about" />
<Main pageTitle="About">
  <section id="about" class="p-0 mx-0 my-2 prose prose-img:border-0">
    <Markdown source={data.content} />
  </section>
</Main>

<SubscribeForm />
<Footer />
