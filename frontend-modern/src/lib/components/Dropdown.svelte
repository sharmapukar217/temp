<script>
    import { onMount } from 'svelte';
    import { scale } from 'svelte/transition';
    
    let show = false; // menu state
    let menu = null; // menu wrapper DOM reference
  
    onMount(() => {
      const handleOutsideClick = (event) => {
        if (show && !menu.contains(event.target)) {
          show = false;
        }
      };
  
      const handleEscape = (event) => {
        if (show && event.key === 'Escape') {
          show = false;
        }
      };

      // add events when element is added to the DOM
      document.addEventListener('click', handleOutsideClick, false);
      document.addEventListener('keyup', handleEscape, false);
  
      // remove events when element is removed from the DOM
      return () => {
        document.removeEventListener('click', handleOutsideClick, false);
        document.removeEventListener('keyup', handleEscape, false);
      };
    });

  </script>
  
  <div class="relative" bind:this={menu}>
    <div>
      <button
        on:click={() => (show = !show)}
        class="max-md:underline ml-auto underline-offset-4 inline-flex items-center px-2 rounded-md menu focus:outline-none focus:shadow-solid"
      >
        Sort by
      </button>
  
      {#if show}
        <div
          in:scale={{ duration: 100, start: 0.95 }}
          out:scale={{ duration: 75, start: 0.95 }}
          class="origin-top-right absolute right-0 w-48 py-2 mt-1 bg-white rounded shadow-lg z-[100]"
        >
          <a
            href="/sort/newest"
            class="block px-4 py-2 hover:bg-black hover:text-white"
          >Recent</a>
          <a
            href="/sort/oldest"
            class="block px-4 py-2 hover:bg-black hover:text-white"
          >Oldest</a>
        </div>
      {/if}
    </div>
  </div>