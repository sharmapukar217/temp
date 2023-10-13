<script lang="ts">
  import { clsx } from "clsx";

  let className: string | undefined = undefined;

  export let href: string;
  export { className as class };
  export let title: string | undefined = undefined;
  export let ariaLabel: string | undefined = undefined;
  export let disabled: boolean | undefined = undefined;
</script>

<a
  {title}
  aria-label={ariaLabel}
  href={disabled ? "#" : href}
  tabindex={disabled ? -1 : 0}
  class={clsx("group inline-block hover:text-skin-accent", className)}
  aria-disabled={disabled}>
  <slot />
</a>
