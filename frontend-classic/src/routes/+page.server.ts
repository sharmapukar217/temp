export async function load({ locals }) {
  const featuredPosts = await locals.strapi.get("/api/blogs", {
    fields: ["title", "subtitle", "description", "slug", "publishedAt"],
    filters: { featured: { $eq: true } },
    sort: ["publishedAt:desc"],
    populate: {
      creator: { fields: ["username"] }
    }
  });

  const recentPosts = await locals.strapi.get("/api/blogs", {
    sort: ["publishedAt:desc"],
    pagination: { pageSize: 4 },
    fields: ["title", "subtitle", "description", "slug", "publishedAt"],
    populate: {
      creator: { fields: ["username"] }
    }
  });

  return {
    featuredPosts: featuredPosts.result?.data,
    recentPosts: recentPosts.result?.data
  };
}
