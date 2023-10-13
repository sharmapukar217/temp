<script lang="ts">
  import Hr from "./Hr.svelte";
  import Socials from "./Socials.svelte";
  export let noMarginTop: boolean = false;
</script>

<footer class="w-full" class:mt-auto={noMarginTop}>
  <Hr noPadding />
  <div class="flex flex-col items-center justify-between py-6 sm:fex-row-reverse sm:py-4">
    <Socials centered />
    <div class="my-2 flex flex-col items-center whitespace-nowrap sm:flex-row">
      <span>Copyright &#169; {new Date().getFullYear()}</span>
      <span class="hidden sm:inline-flex">&nbsp;|&nbsp;</span>
      <span>All rights reserved.</span>
    </div>
  </div>
</footer>
