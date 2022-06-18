import adapter from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";
import fs from "fs";

const pkg = fs.readFileSync('./package.json', {encoding: "utf-8"})

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      scss: {
        prependData: '@use "src/variables.scss" as *;',
      },
    //   replace: [
    //     [/process\.env\.PACKAGE_JSON/g, JSON.stringify(pkg)]
    //   ]
    }),
  ],

  kit: {
    adapter: adapter(),
    files: {
        hooks: "src/hooks"
    },
    vite: {
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@use "src/variables.scss" as *;',
          },
        },
      },
    },
  },
};

export default config;
