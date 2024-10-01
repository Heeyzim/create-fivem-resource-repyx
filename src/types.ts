export type CliForm = {
  resourceName: string;
  runtime: "lua" | "js";
  hasClientSide: boolean;
  hasServerSide: boolean;
  isTypescript?: boolean;
  rootResourcesFolderPath?: string;
  hasNui?: boolean;
};

export type CliFormJs = CliForm & {
  runtime: "js";
  rootResourcesFolderPath: string;
  isTypescript: boolean;
};

type CliFormClient = CliForm & {
  hasClientSide: true;
  hasNui: boolean;
};

type CliFormClientNui = CliFormClient & {
  hasClientSide: true;
  hasNui: true;
};
