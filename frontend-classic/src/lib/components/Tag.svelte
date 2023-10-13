<script lang="ts">
  import clsx from "clsx";

  type Size = "sm" | "lg";

  export let name: string;
  export let size: Size | undefined = undefined;
</script>

<li
  class={clsx("inline-block", {
    "my-1 underline-offset-4": size === "sm",
    "my-3 mx-1 underline-offset-8": size === "lg"
  })}>
  <a
    href="/tags/{name}"
    class={clsx(
      "relative underline decoration-dashed hover:-top-0.5 hover:text-skin-accent focus-visible:p-1 pr-2 group",
      {
        "text-sm": size === "sm",
        "text-lg": size === "lg"
      }
    )}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={clsx("-mr-5 h-6 w-6 scale-95 text-skin-base opacity-80 group-hover:fill-skin-accent", {
        "scale-75": size === "sm",
        "scale-110": size === "lg"
      })}
      ><path
        d="M16.018 3.815 15.232 8h-4.966l.716-3.815-1.964-.37L8.232 8H4v2h3.857l-.751 4H3v2h3.731l-.714 3.805 1.965.369L8.766 16h4.966l-.714 3.805 1.965.369.783-4.174H20v-2h-3.859l.751-4H21V8h-3.733l.716-3.815-1.965-.37zM14.106 14H9.141l.751-4h4.966l-.752 4z" />
    </svg>
    &nbsp;<span>{name.toLowerCase()}</span>
  </a>
</li>
