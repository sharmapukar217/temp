import { writable } from "svelte/store"

// currently viewing post id
export const currentPostID = writable(0);