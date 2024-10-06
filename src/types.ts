export type CliForm = {
  resourceName: string;
  runtime: "lua" | "js";
  hasClientSide: boolean;
  hasServerSide: boolean;
  rootResourcesFolderPath?: string;
  hasNui?: boolean;
};

export type CliFormJs = CliForm & {
  runtime: "js";
  rootResourcesFolderPath: string;
};

type CliFormClient = CliForm & {
  hasClientSide: true;
  hasNui: boolean;
};

type CliFormClientNui = CliFormClient & {
  hasClientSide: true;
  hasNui: true;
};
