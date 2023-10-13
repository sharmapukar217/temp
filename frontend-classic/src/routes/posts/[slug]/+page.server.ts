export async function load({ params, locals }) {
  const { result, error: e } = await locals.strapi.get(`/api/slugify/slugs/blog/${params.slug}`, {
    populate: {
      cover_image: { fields: ["url", "mime", "name"]},
      creator: { fields: ["username"] }
    }
  });

  if (e) throw (e.status, { message: e.message });
  return { post: result.data };
}
