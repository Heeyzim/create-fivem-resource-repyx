import chalk from "chalk";
import { existsSync } from "fs";
import { join } from "path";
import prompts from "prompts";

import { CliForm } from "./types";
import { getRootResourcesFolderPath } from "./utils";

const cancel = () => {
  console.log(chalk.red("✖"), "Operation canceled!");
  process.exit(0);
};

export const displayCliForm = async () => {
  let options = {};

  const { resourceName } = await prompts(
    {
      type: "text",
      name: "resourceName",
      initial: "my-resource",
      message: "Resource name:",
      // Check if the resource directory already exists
      validate: (value: string) => {
        const resourcePath = join(process.cwd(), value);

        return existsSync(resourcePath)
          ? `Resource directory "${value}" already exists!`
          : true;
      },
    },
    { onCancel: cancel }
  );
  options = { ...options, resourceName };

  options = { ...options };

    let rootResourcesFolderPath = getRootResourcesFolderPath(process.cwd());

    if (!rootResourcesFolderPath) {
      console.warn(chalk.yellow("\nCouldn't find the resources folder\n"));

      const response = await prompts(
        {
          type: "text",
          name: "rootResourcesFolderPath",
          message: "'Resources' folder path:",
          initial: process.cwd(),
          validate: (value: string) =>
            existsSync(value) || "Path doesn't exist",
        },
        { onCancel: cancel }
      );

      rootResourcesFolderPath = response.rootResourcesFolderPath;
    }

    const { isTypescript } = await prompts(
      {
        type: "toggle",
        name: "isTypescript",
        message: "Add TypeScript?",
        initial: true,
        active: "Yes",
        inactive: "No",
      },
      { onCancel: cancel }
    );
    options = { ...options, rootResourcesFolderPath, isTypescript };
  

  const { hasClientSide } = await prompts(
    {
      type: "toggle",
      name: "hasClientSide",
      message: "Add client-side?",
      initial: true,
      active: "Yes",
      inactive: "No",
    },
    { onCancel: cancel }
  );
  options = { ...options, hasClientSide };

  const { hasServerSide } = await prompts(
    {
      type: "toggle",
      name: "hasServerSide",
      message: "Add server-side?",
      initial: true,
      active: "Yes",
      inactive: "No",
    },
    { onCancel: cancel }
  );
  options = { ...options, hasServerSide };

  if (hasClientSide) {
    const { hasNui } = await prompts(
      {
        type: "toggle",
        name: "hasNui",
        message: "Add NUI?",
        initial: true,
        active: "Yes",
        inactive: "No",
      },
      { onCancel: cancel }
    );
    options = { ...options, hasNui };
  }

  return options as CliForm;
};
