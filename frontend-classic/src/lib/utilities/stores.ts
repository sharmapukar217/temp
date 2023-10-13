import { writable } from "svelte/store";

type Theme = "light" | "dark" | "system";

const THEMES = ["light", "dark", "system"];

function createStore() {
  const { set, update, subscribe } = writable<Theme>("system");

  function s(theme?: Theme) {
    update(function (t) {
      // set the provided theme or
      // keep switching to next theme
      const newTheme = theme ?? ((THEMES[THEMES.indexOf(t) + 1] ?? "light") as Theme);
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }

  return { subscribe, set, switch: s };
}

export const theme = createStore();
