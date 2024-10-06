import { cpSync, mkdirSync, rmSync } from "fs";
import { join } from "path";
import simpleGit from "simple-git";
import { CliForm } from "types";

const repoUrl = "https://github.com/heeyzim/fivem-resource-templates";
const rawRepoUrl =
  "https://raw.githubusercontent.com/heeyzim/fivem-resource-templates/main";

const getInternalTemplatePath = (options: CliForm) => {
  let templateFolderName = "typescript-";

  if (options.hasNui) {
    templateFolderName += "nui-react";
  } else {
    templateFolderName += "vanilla";
  }

  return templateFolderName;
};

export const cloneTemplate = async (options: CliForm, resourcePath: string) => {
  const tmpPath = join(resourcePath, "tmp");
  mkdirSync(tmpPath);

  await simpleGit().clone(repoUrl, tmpPath, { "--depth": 1 });

  const templatePath = getInternalTemplatePath(options);
  cpSync(join(tmpPath, templatePath), resourcePath, { recursive: true });

  rmSync(tmpPath, { recursive: true });

  return templatePath;
};

export const getRawTemplateFile = (templatePath: string, filePath: string) => {
  return `${rawRepoUrl}/${templatePath}/${filePath}`;
};
