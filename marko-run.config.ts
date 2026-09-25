import { defineConfig } from "@marko/run/vite";
import nodeAdapter from "@marko/run-adapter-node";

export default defineConfig({
  adapter: nodeAdapter(),
});
