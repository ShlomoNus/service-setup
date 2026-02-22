import { spawnSync } from "node:child_process";

type Action = "up" | "down" | "restart" | "logs" | "ps";

const action = process.argv[2] as Action | undefined;

const allowed: readonly Action[] = ["up", "down", "restart", "logs", "ps"] as const;

if (!action || !allowed.includes(action)) {
  console.error(`Unknown action: ${action ?? "(missing)"}`);
  console.error(`Use one of: ${allowed.join(", ")}`);
  process.exit(1);
}

function tryRun(cmd: string, args: string[]): boolean {
  const res = spawnSync(cmd, args, { stdio: "inherit" });
  return res.status === 0;
}

/**
 * Prefer `docker compose ...` (plugin). Fallback to `docker-compose ...`.
 * Works the same on Windows and WSL as long as Docker is available.
 */
function runCompose(composeArgs: string[]): void {
  // 1) docker compose ...
  if (tryRun("docker", ["compose", ...composeArgs])) return;

  // 2) docker-compose ...
  if (tryRun("docker-compose", composeArgs)) return;

  console.error(
    "Failed to run Docker Compose.\n" +
      "- Ensure Docker Desktop is running (Windows)\n" +
      "- Ensure WSL integration is enabled (if running inside WSL)\n" +
      "- Ensure `docker` is on PATH\n" +
      "- Ensure your compose file is named docker-compose.yml",
  );
  process.exit(1);
}

switch (action) {
  case "up":
    runCompose(["up", "-d"]);
    break;
  case "down":
    runCompose(["down"]);
    break;
  case "restart":
    // deterministic restart: down then up
    runCompose(["down"]);
    runCompose(["up", "-d"]);
    break;
  case "logs":
    runCompose(["logs", "-f", "--tail", "200"]);
    break;
  case "ps":
    runCompose(["ps"]);
    break;
}
