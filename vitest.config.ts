import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["tests/**/*.spec.ts", "modules/**/exercise/**/*.spec.ts"],
    watchExclude: ["**/dist/**", "**/node_modules/**"],
    coverage: {
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage",
    },
  },
});
