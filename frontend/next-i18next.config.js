const path = require("path");

module.exports = {
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  localePath: path.resolve("./public/static/locales"),
};