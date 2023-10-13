<script>
    import { PUBLIC_STRAPI_BASE_URL } from "$env/static/public";

  export let href = "";
  export let title = undefined;
  export let text = "";
</script>

<img
  src={PUBLIC_STRAPI_BASE_URL + href}
  {title}
  alt={text}
/>