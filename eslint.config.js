import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: { globals: { ...globals.browser, process: "readonly" } },
    rules: {
      "no-undef": 0,
    },
  },
  pluginJs.configs.recommended,
];
