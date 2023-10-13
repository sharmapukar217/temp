export async function load({ url, locals, params }) {
  const page = parseInt(url.searchParams.get("page") ?? "1");

  const posts = await locals.strapi.get("/api/blogs", {
    sort: ["publishedAt:desc"],
    filters: { tags: { $containsi: params.tag } },
    fields: ["title", "subtitle", "description", "slug", "publishedAt"]
  });

  return {
    posts: posts.result?.data
  };
}
