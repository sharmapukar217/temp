import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    serviceWorker: {
      register: false
    }
  },
  vitePlugin: {
    inspector: {
      holdMode: true,
      toggleKeyCombo: "control-shift"
    }
  }
};

export default config;
