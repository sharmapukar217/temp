<script lang="ts">
  import { clsx } from "clsx";

  export let noPadding: boolean | undefined = undefined;
  export let ariaHidden: boolean | undefined = undefined;
</script>

<div
  class={clsx("max-w-3xl mx-auto", {
    "px-0": noPadding,
    "px-4": !noPadding
  })}>
  <hr class="border-skin-line" aria-hidden={ariaHidden} />
</div>
