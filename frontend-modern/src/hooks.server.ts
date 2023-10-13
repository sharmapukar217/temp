import type { Handle } from "@sveltejs/kit";
import { strapi } from "$lib/utilities/strapi";

export const handle: Handle = ({ resolve, event }) => {
  // set sveltekit fetch function
  strapi.fetch = event.fetch;

  // set access token if available
  const token = event.cookies.get("access_token");
  if (token) strapi.setToken(token);

  // set strapi to event.locals so that
  // it can be accessed inside load functions
  event.locals.strapi = strapi;

  // return response
  return resolve(event);
};
