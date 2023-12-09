import path from "path";

import husky = require("husky");

process.chdir(path.resolve(__dirname, "../../.."));

const IS_CI_ENVIRONMENT = process.env.CI !== undefined;

/** Has to use require or husky becomes undefined */
if (!IS_CI_ENVIRONMENT) {
  husky.install();
}
