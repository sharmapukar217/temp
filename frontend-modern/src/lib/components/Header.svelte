<script lang="ts">
  import { clsx } from "clsx";
  import { clickAway } from "$lib/utilities/actions";

  type ActiveNav = "home" | "about" | "services" | "contact" | "search";

  let navExpanded = false;
  export let activeNav: ActiveNav;
</script>

<header
  class="bg-white flex flex-col md:flex-row px-4 py-5 mb-4"
  id="header"
  use:clickAway={() => (navExpanded = false)}>
  <a
    id="skip-to-content"
    class="absolute -top-full left-16 z-50 bg-primary px-3 py-2 text-white transition-all focus:top-4"
    href="#main-content">Skip to content</a>

  <div class="inline-flex items-center">
    <a href="/" class="md:hidden"><img src="/logo.svg" alt="" /></a>

    <button
      class="ml-auto md:hidden   px-2 py-1"
      on:click={() => (navExpanded = !navExpanded)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
      </svg>
    </button>
  </div>

  <nav
    class={clsx("flex-col md:flex md:flex-row w-full relative", {
      flex: navExpanded,
      hidden: !navExpanded
    })}>
    <div
      class="md:absolute mt-2 w-full inline-flex flex-col md:flex-row items-center justify-center md:space-x-8 max-sm:mb-2 max-md:space-y-1">
      <a
        href="/"
        class={clsx("text-md max-md:w-full px-2 py-1  hover:bg-white", {
          active: activeNav === "home"
        })}>Home</a>
      <a
        href="/about"
        class={clsx("text-md max-md:w-full px-2 py-1  ", {
          active: activeNav === "about"
        })}>About</a>
      <a href="/" class="max-md:hidden"><img src="/logo.svg" alt="" /></a>
      <a
        href="/services"
        class={clsx("text-md max-md:w-full text-left px-2 py-1  ", {
          active: activeNav === "services"
        })}>Services</a>
      <a
        href="/contact"
        class={clsx("text-md max-md:w-full  px-2 py-1  ", {
          active: activeNav === "contact"
        })}>Contact</a>
    </div>
    
    <div class="max-md:w-full inline-flex items-center space-x-5 mx-auto md:mr-0 z-10 hidden">
      <a
        href="/search"
        class={clsx(
          "text-md font-medium px-2 py-1  text-center  max-md:w-full inline-flex justify-center items-center",
          {
            active: activeNav === "search"
          }
        )}>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
          <path
            d="M19.023 16.977a35.13 35.13 0 0 1-1.367-1.384c-.372-.378-.596-.653-.596-.653l-2.8-1.337A6.962 6.962 0 0 0 16 9c0-3.859-3.14-7-7-7S2 5.141 2 9s3.14 7 7 7c1.763 0 3.37-.66 4.603-1.739l1.337 2.8s.275.224.653.596c.387.363.896.854 1.384 1.367l1.358 1.392.604.646 2.121-2.121-.646-.604c-.379-.372-.885-.866-1.391-1.36zM9 14c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5z" />
        </svg>
      </a>
      <button
        aria-label="auto"
        aria-live="polite"
        class="px-2 py-1  text-center  max-md:w-full inline-flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6">
          <path
            d="M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z" />
        </svg>
      </button>
    </div>
    <hr class="my-1" />
  </nav>
</header>

<style type="text/postcss">
  .active {
    @apply border-b-2 border-black;
  }
</style>
