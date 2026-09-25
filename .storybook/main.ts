import type { StorybookConfig } from "@storybook/marko-vite";

export default {
  stories: ["../src/**/*.stories.@(js|ts)"],
  addons: ["@storybook/addon-a11y"],
  framework: {
    name: "@storybook/marko-vite",
    options: {},
  },
} satisfies StorybookConfig;
