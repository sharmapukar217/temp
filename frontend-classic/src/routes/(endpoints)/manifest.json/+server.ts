import { json } from "@sveltejs/kit";
import { SITE } from "$lib/utilities/config";
import type { RequestEvent } from "@sveltejs/kit";
import { BYPASS_TOKEN } from "$env/static/private";

export const config = {
  isr: { expiration: 60, allowQuery: ["search"], bypassToken: BYPASS_TOKEN }
};

export async function GET({ setHeaders }: RequestEvent) {
  // enable caching response, as it is static once generated
  setHeaders({ "Cache-Control": "public, max-age=31536000, immutable" });
  return json({
    start_url: "/",
    name: SITE.name,
    display: "standalone",
    description: SITE.description
  });
}
