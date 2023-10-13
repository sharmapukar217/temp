// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      strapi: import("$lib/utilities/strapi");
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
