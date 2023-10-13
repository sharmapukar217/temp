import RSS from "rss";
import { SITE } from "$lib/utilities/config";

export async function GET({ locals }) {
  const feed = new RSS({
    title: SITE.name,
    generator: "hyperce",
    site_url: SITE.website,
    language: SITE.language,
    description: SITE.description,
    feed_url: `${SITE.website}/rss.xml`
  });

  const blogs = await locals.strapi.get("/api/blogs", {
    populate: {
      creator: { fields: ["username", "name"] }
    }
  });

  if (blogs.result?.data) {
    blogs.result.data.map((data) => {
      feed.item({
        title: "posts",
        date: data.attributes.publishedAt,
        url: `${SITE.website}/posts/${data.attributes.slug}`,
        description: data.attributes.description,
        author: data.attributes.creator?.data?.name
      });
    });
  }

  return new Response(feed.xml({ indent: true }), {
    status: 200,
    headers: {
      "Cache-Control": "max-age=0, s-maxage=600",
      "Content-Type": "application/xml"
    }
  });
}
