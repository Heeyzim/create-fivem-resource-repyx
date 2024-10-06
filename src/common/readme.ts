import { readFileSync, writeFileSync } from "fs";
import { CliForm } from "types";

export const transformReadme = (path: string, options: CliForm) => {
  const readme = readFileSync(path, { encoding: "utf-8" });

  let transformedReadme = readme.replace("<res>", options.resourceName);

  // Remove <description> tag
  transformedReadme = transformedReadme.replace("<description>", "");

  if (!options.hasClientSide) {
    transformedReadme = transformedReadme.replace(
      "**Client** - `./client/src/client.ts`",
      ""
    );
  }

  if (!options.hasServerSide) {
    transformedReadme = transformedReadme.replace(
      "**Server** - `./server/src/server.ts`",
      ""
    );
  }

  if (!options.hasNui) {
    transformedReadme = transformedReadme.replace(
      "**Web** - `./web/src/main.ts`",
      ""
    );
  }

  writeFileSync(path, transformedReadme);
};
