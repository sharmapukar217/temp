import { SITE } from "$lib/utilities/config";

export async function load({ url, locals }) {
  const page = parseInt(url.searchParams.get("page") ?? "1");

  try {
    const posts = await locals.strapi.get(`/api/blogs`, {
      fields: ["title", "subtitle", "description", "slug", "publishedAt", "featured"],
      pagination: { pageSize: SITE.postPerPage, page },
      sort: ["publishedAt:desc"],
      populate: {
        cover: true,
        creator: { fields: ["username"] },
        cover_image: { fields: ["url", "mime", "name"]}
      }
    });

    return {
      success: true,
      posts: posts.data,
      pagination: posts?.meta?.pagination
    };
    
  } catch (error) {
    return { success: false, message: JSON.stringify(error)}
  }
}
