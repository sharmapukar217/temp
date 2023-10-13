<script lang="ts">
  import "../styles/global.css";
  import nProgress from "nprogress";
  import { navigating } from "$app/stores";
  import { SITE } from "$lib/utilities/config";
  import Meta from "$lib/components/Meta.svelte";
  import ThemeScript from "$lib/components/ThemeScript.svelte";
  import ServiceWorker from "$lib/components/ServiceWorker.svelte";

  // show page progress bar
  $: $navigating ? nProgress.start() : nProgress.done();
</script>

<Meta
  title="Hyperce"
  openGraph={{
    title: SITE.name,
    url: SITE.website,
    description: SITE.description,
    images: [
      {
        alt: `${SITE.name} logo`,
        url: `${SITE.website}/logo.svg`
      }
    ],
    site_name: SITE.name
  }}
  twitter={{
    handle: "@handle",
    title: SITE.name,
    cardType: "summary",
    site: SITE.website,
    description: SITE.description,
    image: `${SITE.website}/logo.svg`,
    imageAlt: `${SITE.name} logo`
  }}
  facebook={{}}
  additionalMetaTags={{}} />
<ThemeScript />
<!-- <ServiceWorker /> -->
<slot />
