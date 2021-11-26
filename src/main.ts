import { ConsoleUI } from "./ConsoleUI";

const webConsoleEl = document.getElementById("webConsole")!;
const webConsole = new ConsoleUI(webConsoleEl, 50);

webConsole.append({
  parts: [
    {
      text: ":^)",
      color: "brown",
    },
  ],
});
