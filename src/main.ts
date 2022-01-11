import Console from "./console/Console.svelte";
import { coloredStringsTag as ct } from "./console/ColoredText";

const inputHandler = (input: string) => {};

const commandHandler = (command: string, ...args: string[]) => {
  command = command.toLowerCase();

  switch (command) {
    case "":
      break;

    case "ping":
    case "ping!":
      consoleEl.append(ct`green${"pong!"}`);

      break;

    case "clear":
    case "clr":
      consoleEl.clear();

      break;

    default:
      consoleEl.append(ct`red${command} black${": command not found!"}`);
  }
};

const consoleEl = new Console({
  target: document.getElementById("webConsole")!,
  props: {
    promptString: "~$ ",
    maxLines: 50,
    inputHandler,
    commandHandler,
  },
});

consoleEl.set(ct`blue${"Web Console"}`, ct`orange${"Using Svelte!"}`);

export default console;
