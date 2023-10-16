/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de"],
  },
  fallbackLng: {
    default: ["en"],
    "de-CH": ["fr"],
  },
  nonExplicitSupportedLngs: true,
  // de, fr and en will be loaded as fallback languages for de-CH
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : "/locales",
  ns: ["common"],
  interpolation: {
    prefix: "{",
    suffix: "}",
  },
  localeStructure: "{lng}/{ns}",

  debug: process.env.NODE_ENV === "development",
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
