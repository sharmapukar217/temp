<script lang="ts">
  import { clsx } from "clsx";

  let className: string | undefined = undefined;

  export let size: "sm" | "lg";
  export { className as class };
  export let datetime: string | Date;

  const dt = new Date(datetime);

  const date = dt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  const time = dt.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
</script>

<div class={clsx("flex items-center space-x-1 opacity-80 -ml-1", className)}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class={`${size === "sm" ? "scale-90" : "scale-100"} inline-block h-6 w-6`}
    aria-hidden="true">
    <path d="M7 11h2v2H7zm0 4h2v2H7zm4-4h2v2h-2zm0 4h2v2h-2zm4-4h2v2h-2zm0 4h2v2h-2z" />
    <path
      d="M5 22h14c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2h-2V2h-2v2H9V2H7v2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2zM19 8l.001 12H5V8h14z" />
  </svg>
  <span class="sr-only">Posted on:</span>
  <span class={`${size === "sm" ? "text-sm" : "text-base"}`}>
    {date}
    <span aria-hidden="true"> | </span>
    <span class="sr-only">&nbsp;at&nbsp;</span>
    {time}
  </span>
</div>
