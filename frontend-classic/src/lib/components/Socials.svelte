<script lang="ts">
  import LinkButton from "./LinkButton.svelte";
  import { SOCIALS } from "$lib/utilities/config";
  import socialIcons from "$lib/utilities/socialIcons";

  export let centered: boolean | undefined = undefined;
</script>

<div class="flex-wrap justify-center gap-1" class:flex={centered}>
  {#each SOCIALS as social (social.name)}
    {#if social.active}
      <LinkButton
        href={social.href}
        class="p-2 hover:rotate-6 sm:p-1 space-x-2"
        title={social.linkTitle}>
        {@html socialIcons[social.name]}
      </LinkButton>
    {/if}
  {/each}
</div>
