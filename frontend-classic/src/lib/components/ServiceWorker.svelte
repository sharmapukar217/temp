<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { Workbox } from "workbox-window";
  import { dev, browser } from "$app/environment";

  let updateAvailable = false;

  const handleMessage = (e: any) => {
    if (e.data?.command === "navigate") {
      goto(e.data.url || "/");
    }
  };

  onMount(() => {
    const wb = new Workbox("/service-worker.js", {
      type: dev ? "module" : "classic"
    });

    wb.addEventListener("activated", (event) => {
      if (!event.isUpdate) {
        
      }
    });

    wb.addEventListener("controlling", () => {
      window.location.reload();
    });

    wb.addEventListener("waiting", (event) => {
      updateAvailable = true;
    });

    wb.register();

    navigator.serviceWorker?.addEventListener("message", handleMessage);
    return () => {
      navigator.serviceWorker?.removeEventListener("message", handleMessage);
    };
  });
</script>

{#if updateAvailable}
  


<div class="absolute mx-auto left-0 right-0
 z-10 bottom-2.5 w-full max-w-xs p-3 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400 border dark:border-gray-600">
    <div class="flex">
        <div class="ml-3 text-sm font-normal">
            <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Update available</span>
            <div class="mb-2 text-sm font-normal">A new version is available.</div> 
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <button class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-skin-accent opacity-90 hover:opacity-100 rounded-lg">Update</button>
                </div>
                <div>
                    <button class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700">Not now</button> 
                </div>
            </div>    
        </div>
        <button type="button" class="ml-auto -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-interactive" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    </div>
</div>


{/if}