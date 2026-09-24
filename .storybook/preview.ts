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
  },
} satisfies Preview;
