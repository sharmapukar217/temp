import { strapi } from "$lib/utilities/strapi";

type Fetch = typeof fetch;
type SearchBlogArgs = { fetch?: Fetch; query?: string | null };

export async function searchBlog({ fetch, query }: SearchBlogArgs) {
  if (!query) return [];
  const { result } = await strapi.get("/api/blogs", {
    filters: {
      $or: [
        { tags: { $containsi: query } },
        { title: { $containsi: query } },
        { subtitle: { $containsi: query } }
      ]
    },
    fields: ["title", "subtitle", "description", "slug", "publishedAt"]
  });

  return result?.data ?? [];
}
