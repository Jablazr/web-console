import Console from "./Console.svelte";

const console = new Console({
  target: document.getElementById("webConsole")!,
});

export default console;
