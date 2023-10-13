import { SITE } from "$lib/utilities/config";

export async function load({ url, locals }) {
  const page = parseInt(url.searchParams.get("page") ?? "1");

  const posts = await locals.strapi.get("/api/blogs", {
    sort: ["publishedAt:desc"],
    pagination: { pageSize: SITE.postPerPage, page },
    fields: ["title", "subtitle", "description", "slug", "publishedAt"],
    populate: {
      creator: { fields: ["username"] }
    }
  });

  return {
    posts: posts.result?.data,
    pagination: posts.result?.meta?.pagination
  };
}
