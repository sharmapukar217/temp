export async function load({ locals }) {
  const tags = new Set<string>();

  const data = await locals.strapi.get("/api/blogs", {
    fields: ["tags"]
  });

  if (data.result?.data) {
    data.result.data.forEach((d) => {
      d.attributes.tags?.forEach((tag) => tags.add(tag));
    });
  }

  return { tags: Array.from(tags) };
}
