<script lang="ts">
  import { SITE } from "$lib/utilities/config";
  import { MetaTags, type MetaTagsProps } from "svelte-meta-tags";

  interface $$Props extends MetaTagsProps {}
</script>

<MetaTags titleTemplate="%s | {SITE.name}" description={SITE.description} {...$$props} />
