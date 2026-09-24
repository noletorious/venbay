import type { StorybookConfig } from "@storybook/marko-vite";

export default {
  stories: ["../src/**/*.stories.@(js|ts)"],
  framework: {
    name: "@storybook/marko-vite",
    options: {},
  },
} satisfies StorybookConfig;
