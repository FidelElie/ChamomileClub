import fs from "fs";
import path from "path";

export function findRootDir(maximumDepth = 3) {
  let currentDir = __dirname;
  let currentDepth = 0;

  while (!fs.existsSync(path.join(currentDir, ".git")) && currentDepth <= maximumDepth) {
    currentDir = path.join(currentDir, "..");
    currentDepth += 1;
  }

  return currentDir;
}
