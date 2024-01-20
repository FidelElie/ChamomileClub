import { Command } from "commander";
import fs from "fs";
import path from "path";
import { rimrafSync } from "rimraf";

import { findRootDir } from "./utilities";

type ProgramConfig = {
  node?: true;
  build?: true;
  all?: true;
  cache?: true;
};

type FolderIdentifiers = "node_modules" | ".turbo" | "dist" | ".expo";

const parseProgram = (config: ProgramConfig, rootDir: string) => {
  const folderPathsToDelete = determineFolderPaths(config, rootDir);

  for (const path of folderPathsToDelete) {
    console.log(`Cleaning ${path}`);
    rimrafSync(path);
  }
};

const determineFolderPaths = (config: ProgramConfig, rootDir: string) => {
  const { all, build, cache, node } = config;

  // Defaults to cleaning node module folders
  if (!Object.keys(config).length) {
    return findFolders(rootDir, "node_modules");
  }

  return [
    all || build ? findFolders(rootDir, "dist") : [],
    all || cache
      ? findFolders(rootDir, ".turbo").concat(findFolders(rootDir, ".expo"))
      : [],
    all || node ? findFolders(rootDir, "node_modules") : [],
  ].flat();
};

const findFolders = (
  dirPath: string,
  identifier: FolderIdentifiers,
): string[] => {
  if (!fs.lstatSync(dirPath).isDirectory()) {
    throw new Error("Valid directory path required");
  }

  const contents = fs.readdirSync(dirPath);

  const directories = contents.filter(
    (content) =>
      fs.lstatSync(path.join(dirPath, content)).isDirectory()
      && content !== "node_modules",
  );

  const modulesPath = contents.includes(identifier)
    ? [path.join(dirPath, identifier)]
    : [];

  const nodeModulesInSubDirectories = directories.map((dirName) =>
    findFolders(path.join(dirPath, dirName), identifier)
  );

  return [modulesPath, ...nodeModulesInSubDirectories].flat();
};

const program = new Command();

program
  .name("clean")
  .description("Clean different folders throughout the monorepo")
  .version("1.0.0");

program
  .option("-n, --node", "clean node module folders")
  .option("-b, --build", "clean build folders")
  .option("-c, --cache", "clean cache folder e.g .turbo")
  .option("-a, --all", "clean all supported folder types");

program.parse();

const options = program.opts() satisfies ProgramConfig;
const rootDir = path.resolve(findRootDir());

parseProgram(options, rootDir);
