import type { StorybookConfig } from "@storybook/marko-vite";

export default {
  stories: ["../.storybook/Welcome.mdx", "../src/**/*.stories.@(js|ts)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/marko-vite",
    options: {},
  },
} satisfies StorybookConfig;
