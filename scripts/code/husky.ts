import husky = require("husky");

import { findRootDir } from "./utilities";

process.chdir(findRootDir());

const IS_CI_ENVIRONMENT = process.env.CI !== undefined;

/** Has to use require or husky becomes undefined */
if (!IS_CI_ENVIRONMENT) { husky.install(); }
