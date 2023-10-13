import { searchBlog } from "./lib";

export async function load({ url, locals, fetch }) {
  const query = url.searchParams.get("query");
  return { searchResults: searchBlog({ query, fetch }) };
}
