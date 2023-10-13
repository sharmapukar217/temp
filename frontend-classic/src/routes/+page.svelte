<script lang="ts">
  import { SOCIALS } from "$lib/utilities/config";

  import Hr from "$lib/components/Hr.svelte";
  import Meta from "$lib/components/Meta.svelte";
  import List from "$lib/components/List.svelte";
  import Card from "$lib/components/Card.svelte";
  import Main from "$lib/components/Main.svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Socials from "$lib/components/Socials.svelte";
  import LinkButton from "$lib/components/LinkButton.svelte";
  import SubscribeForm from "$lib/components/SubscribeForm.svelte";

  export let data;
</script>

<Meta title="Homepage" />
<Header />
<main id="main-content">
  <section class="pb-6 pt-8" id="hero">
    <h1 class="my-4 inline-block text-3xl font-bold sm:my-8 sm:text-5xl">Hello👋</h1>
    <a class="mb-6 ml-2" target="_blank" href="/rss.xml" aria-label="rss feed" title="RSS Feed">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mb-2 h-6 w-6 scale-110 fill-skin-accent sm:mb-3 sm:scale-125"
        ><path d="M19 20.001C19 11.729 12.271 5 4 5v2c7.168 0 13 5.832 13 13.001h2z" /><path
          d="M12 20.001h2C14 14.486 9.514 10 4 10v2c4.411 0 8 3.589 8 8.001z" /><circle
          cx="6"
          cy="18"
          r="2" />
      </svg>
    </a>

    <p class="my-2">Read our blog &amp; posts or check out us on:</p>
    <div class="mt-4 flex flex-col sm:flex-row sm:items-center">
      <Socials />
    </div>
  </section>

  <Hr />

  {#if data.featuredPosts?.length}
    <section class="pb-6 pt-12" id="featured">
      <h2
        class="text-2xl font-semibold tracking-wide decoration-skin-accent underline decoration-wavy decoration-2 underline-offset-4">
        Featured
      </h2>
      <ul>
        {#each data.featuredPosts as post (post.attributes.slug)}
          <Card href="/posts/{post.attributes.slug}" data={post.attributes} secHeading={false} noDivide={false} />
        {/each}
      </ul>
    </section>
  {/if}

  <section id="recent-posts" class="relative mt-3">
    <h2
      class="text-2xl font-semibold tracking-wide decoration-skin-accent underline decoration-wavy decoration-2 underline-offset-4">
      Recent Posts
    </h2>
    {#if data.recentPosts?.length}
      <ul>
        {#each data.recentPosts as post (post.attributes.slug)}
          <List href="/posts/{post.attributes.slug}" data={post.attributes} secHeading={false} />
        {/each}
      </ul>
      <div class="my-8 text-center">
        <LinkButton href="/posts">
          All Posts
          <svg xmlns="http://www.w3.org/2000/svg"
            ><path
              d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z" />
          </svg>
        </LinkButton>
      </div>
    {:else}
      <div class="pt-4 pb-8">
        <p>No posts to show :-)</p>
      </div>
    {/if}
  </section>
</main>

<SubscribeForm />
<Footer />
