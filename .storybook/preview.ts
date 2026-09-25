import type { Preview } from "@storybook/marko";
import "../src/styles/theme.css";

export default {
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  globalTypes: {
    theme: {
      description: "Theme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  loaders: [
    async ({ globals }) => {
      document.documentElement.dataset.theme = globals.theme;
      return {};
    },
  ],
} satisfies Preview;
