import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {files: ["src/**/*.{js,mjs,cjs,ts}"]},
  { ignores: [".sst/", "sst.config.ts"]},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];