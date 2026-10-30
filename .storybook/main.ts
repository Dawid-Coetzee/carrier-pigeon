import type { StorybookConfig } from "@storybook/nextjs-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "@storybook/addon-styling-webpack"
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {}
  },
  viteFinal: async (config) => {
    config.plugins ??= [];
    config.plugins.push(tailwindcss());
    return config;
  },
  staticDirs: ["../public"]
};
export default config;