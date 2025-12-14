import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    cli: "src/cli.ts",
    index: "src/index.ts",
  },
  format: ["cjs"],
  dts: true,
  clean: true,
  outDir: "dist",
});
