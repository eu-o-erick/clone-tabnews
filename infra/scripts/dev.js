const { spawn } = require("child_process");

function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    const cmd = spawn(command, args, { stdio: "inherit" });

    cmd.on("error", (err) => {
      console.error(`Erro ao executar o comando ${command}:`, err);
      reject(err);
    });

    cmd.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Comando ${command} falhou com código ${code}`));
      } else {
        resolve();
      }
    });
  });
}

async function runDev() {
  try {
    await runCommand("npm", ["run", "services:up"]);

    await runCommand("npm", ["run", "services:wait:database"]);

    await runCommand("npm", ["run", "migrations:up"]);

    await runCommand("next", ["dev"]);
  } catch (error) {
    console.error(
      "Erro durante o desenvolvimento, executando services:stop...",
      error,
    );
  }
}

process.on("SIGINT", async () => {
  await runCommand("npm", ["run", "services:stop"]);
  process.exit();
});

runDev();
