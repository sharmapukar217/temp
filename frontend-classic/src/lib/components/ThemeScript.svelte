<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { theme } from "$lib/utilities/stores";

  const media = "(prefers-color-scheme: dark)";

  // prettier-ignore
  const themeScript = `<${"script"}>!function() {window.t=localStorage.getItem("theme");var t=window.t||"${$theme}";var r=document.documentElement;var th=t;if(th==="system"){th=window.matchMedia("${media}").matches?"dark":"light"};r.style.setProperty("color-scheme", th);r.setAttribute("data-theme", th);}()</${"script"}>`;

  // to update the `theme` store as fast as possible
  $: if (browser && (window as any).t) theme.set((window as any).t);

  const handleChange = (e: any) => {
    const mode = e.matches ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.style.setProperty("color-scheme", mode);
  };

  onMount(() => {
    const darkScheme = window.matchMedia(media);

    const unsubscribe = theme.subscribe(($theme) => {
      if ($theme === "system") {
        darkScheme.addEventListener("change", handleChange);
      } else {
        handleChange({ matches: $theme === "dark" });
        darkScheme.removeEventListener("change", handleChange);
      }
    });

    return unsubscribe;
  });
</script>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html themeScript}
</svelte:head>
