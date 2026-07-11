import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/sbsn/",
  },
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "node-server",
    baseURL: "/sbsn/",
  },
});
