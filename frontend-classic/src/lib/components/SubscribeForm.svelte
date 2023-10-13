<script lang="ts">
  import Hr from "./Hr.svelte";
  export let noDivide = false;
</script>

<div class="my-8 sm:text-center">
  {#if !noDivide}
  <Hr />
  {/if}
  <div class="my-4 max-w-md sm:mx-auto px-4">
    <p class="text-lg">
      Subscribe to get all the latest blogs, news &amp; notices straight from the hyperce team.
    </p>
  </div>
  <section class="mt-2 max-w-sm sm:mx-auto">
    <h2 class="sr-only">Sign up for our newsletter</h2>
    <form class="flex flex-wrap -mx-2">
      <div class="px-2 grow-[9999] basis-64 mt-3">
        <div class="group relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-full absolute inset-y-0 left-3 fill-skin-accent pointer-events-none">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
          </svg>

          <input
            name="email"
            type="email"
            autocomplete="off"
            aria-label="Email address"
            class="rounded border border-skin-fill
        border-opacity-40 bg-skin-fill py-2 pl-12
        pr-3 placeholder:italic placeholder:text-opacity-75
        focus:border-skin-accent focus:outline-none w-full"
            placeholder="Subscribe via email" />
        </div>
      </div>
      <div class="px-2 grow flex mt-3">
        <button
          type="submit"
          class="bg-skin-accent flex-auto shadow text-white rounded-md text-sm border-y border-transparent py-2 font-semibold px-3 opacity-90 hover:opacity-100"
          >Subscribe</button>
      </div>
    </form>
  </section>
</div>
