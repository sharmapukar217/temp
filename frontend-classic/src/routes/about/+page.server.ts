// import { BYPASS_TOKEN } from "$env/static/private";

// export const config = {
//   isr: { expiration: 60, allowQuery: ["search"], bypassToken: BYPASS_TOKEN }
// };

export async function load({ locals }) {
  const { result } = await locals.strapi.get("/api/about", {});

  const content = result?.data?.attributes?.content;
  return { content };
}
