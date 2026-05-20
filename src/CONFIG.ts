import { bool, cleanEnv, str, num } from "envalid";

import { nodeEnvOption } from "./consts/general";
import { loadLocalEnv } from "./utils/env";
loadLocalEnv();

export const CONFIG = cleanEnv(process.env, {
  LOG_LEVEL: str({ default: "info" }),
  LOG_PRETTY: bool({ default: false }),
  NODE_ENV: str({
    choices: nodeEnvOption
  }),
  PORT: num({ default: 8080 })
});
