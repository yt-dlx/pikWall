const { exec } = require("child_process");
const os = require("os");
const commands = {
  "server:build": {
    command: "python index_0.py",
    cwd: "server"
  },
  "client:make": {
    command: "yarn",
    cwd: "client"
  },
  "client:dev": {
    command: "yarn dev",
    cwd: "client"
  },
  "client:start": {
    command: "yarn start",
    cwd: "client"
  },
  "client:build": {
    command: "yarn build",
    cwd: "client"
  }
};
const command = process.argv[2];
if (commands[command]) {
  const { command: cmd, cwd } = commands[command];
  const fullCommand = os.platform() === "win32" ? `cd ${cwd} && ${cmd}` : `cd ${cwd} && ${cmd}`;
  exec(fullCommand, { shell: os.platform() === "win32" ? "cmd.exe" : "/bin/bash" }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
  });
} else {
  console.error("Unknown command");
}
