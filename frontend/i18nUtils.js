import fs from "fs";
import path from "path";

export const getAllNamespaces = () => {
  const localesPath = path.resolve("./public/static/locales");
  const namespaces = [];

  fs.readdirSync(localesPath).forEach(locale => {
    const files = fs.readdirSync(path.join(localesPath, locale));
    files.forEach(file => {
      const namespace = file.replace(".json", "");
      if (!namespaces.includes(namespace)) {
        namespaces.push(namespace);
      }
    });
  });

  return namespaces;
};
