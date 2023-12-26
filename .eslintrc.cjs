module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "next/core-web-vitals",
  ],
  ignorePatterns: [
    "dist",
    ".eslintrc.cjs",
    "/src/@core",
    "/src/@fake-db",
    "/src/configs",
    "/src/iconify-bundle",
    "/src/layouts",
    "/src/pages/account-setting",
    "/src/pages/acl",
    "/src/pages/apps",
    "/src/pages/charts",
    "/src/pages/chat",
    "/src/pages/components",
    "/src/pages/dashboards",
    "/src/pages/forms",
    "/src/pages/pages",
    "/src/pages/tables",
    "/src/pages/terms",
    "/src/pages/ticket",
    "/src/pages/ui",
    "/src/pages/user",
    "/src/types",
    "/src/views/ui",
    "/src/views/table",
    "/src/views/pages",
    "/src/views/forms",
    "/src/views/terms",
    "/src/views/charts",
    "/src/views/apps",
    "/src/views/components",
    "/src/views/dashboards",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "@tanstack/query"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@tanstack/query/exhaustive-deps": "error",
    "@tanstack/query/no-rest-destructuring": "warn",
    "@tanstack/query/stable-query-client": "error",
    "@next/next/no-img-element": "off",
    "@next/next/no-page-custom-font": "off",
    "@typescript-eslint/ban-ts-comment": "off",
  },
};
