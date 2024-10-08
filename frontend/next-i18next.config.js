const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
    localeDetection: true,
  },
  localePath: path.resolve("./public/static/locales"),
  react: { useSuspense: false },
};
