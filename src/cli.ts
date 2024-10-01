import chalk from "chalk";
import { program as commander } from "commander";
import { mkdirSync } from "fs";
import { join } from "path";

import { CliFormJs } from "types";
import { displayCliForm } from "./form";
import { cloneTemplate } from "./git";

import { setupJsTemplate } from "./setup-js-template";

import packageJson from "../package.json";

export const createFivemResource = async () => {
  console.log("\nRepyx FiveM Resource Boilerplate CLI\n");

  let options = await displayCliForm();

  const resourcePath = join(
    options.rootResourcesFolderPath ?? process.cwd(),
    options.resourceName
  );

  console.log(chalk.dim(`\nScaffolding resource in ${resourcePath}...`));

  mkdirSync(resourcePath);

  const templateFolder = await cloneTemplate(options, resourcePath);
  await setupJsTemplate(resourcePath, templateFolder, options as CliFormJs);
};

const parseArguments = (program = commander) => {
  program
    .version(packageJson.version, "-v, --version", "output the current version")
    .description("Repyx FiveM resource boilerplate CLI")
    .action(createFivemResource);

  program.parse(process.argv);
};

export default parseArguments;
