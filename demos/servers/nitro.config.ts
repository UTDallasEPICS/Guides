import { defineNitroConfig } from "nitropack/config";

// https://nitro.build/config
export default defineNitroConfig({
  compatibilityDate: "2025-01-01",
  typescript: {
    strict: true,
  },
});
