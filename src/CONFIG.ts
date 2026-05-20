import { bool, cleanEnv, str } from "envalid";

import { nodeEnvOption } from "./consts/general";

export const CONFIG = cleanEnv(process.env, {
  LOG_LEVEL: str({ default: "info" }),
  LOG_PRETTY: bool({ default: false }),
  NODE_ENV: str({
    choices: nodeEnvOption
  })
});
