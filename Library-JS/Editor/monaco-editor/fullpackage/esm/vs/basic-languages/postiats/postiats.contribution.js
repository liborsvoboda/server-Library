/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.42.0-dev-20230906(e7d7a5b072e74702a912a4c855a3bda21a7757e7)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/postiats/postiats.contribution.ts
import { registerLanguage } from "../_.contribution.js";
registerLanguage({
  id: "postiats",
  extensions: [".dats", ".sats", ".hats"],
  aliases: ["ATS", "ATS/Postiats"],
  loader: () => {
    if (false) {
      return new Promise((resolve, reject) => {
        __require(["vs/basic-languages/postiats/postiats"], resolve, reject);
      });
    } else {
      return import("./postiats.js");
    }
  }
});
