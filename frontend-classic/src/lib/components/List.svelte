<script lang="ts">
  import Card from "./Card.svelte";
  import Datetime from "./Datetime.svelte";

  export let data: any;
  export let href: string;
  export let secHeading: boolean = false;
</script>

<div class="relative group">
  <div
    class="absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl group-hover:bg-slate-50/20 dark:group-hover:bg-slate-800/20 pointer-events-none group-hover:shadow" />

  <div
    class="hidden absolute top-3 bottom-0 right-full mr-7 md:mr-[3.25rem] w-px bg-skin-accent sm:block" />
  <svg
    viewBox="0 0 9 9"
    class="hidden absolute right-full mr-6 top-2 text-skin-accent md:mr-12 w-[calc(0.5rem+1px)] h-[calc(0.5rem+1px)] overflow-visible sm:block"
    ><circle
      cx="4.5"
      cy="4.5"
      r="4.5"
      stroke="currentColor"
      class="fill-white dark:fill-slate-900"
      stroke-width="2" /></svg>

  <Card as="div" {data} {href} {secHeading} />
</div>
